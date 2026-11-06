import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import { playPopSound } from "@/hooks/useAudio";
import { useGuruQuiz } from "@/hooks/useGuruQuiz";
import GuruQuizOverlay from "@/components/GuruQuizOverlay";

// ── Canvas dimensions ──────────────────────────────────────────────────────
const CW = 380;
const CH = 620;
const BALL_R = 10;
const GRAVITY = 780;
const FLIPPER_LEN = 72;
const FLIPPER_W = 12;
const FLIPPER_Y = CH - 70;
const FLIPPER_L_X = 64;
const FLIPPER_R_X = CW - 64;
const FLIPPER_REST_ANGLE = 0.48;   // radians down
const FLIPPER_UP_ANGLE  = -0.44;

// ── Math ──────────────────────────────────────────────────────────────────
interface MQ { q: string; ans: number }
function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
const makeQ = (): MQ => {
  const t = ~~(Math.random() * 8);
  switch (t) {
    case 0: { const a = 2 + ~~(Math.random() * 10), b = 2 + ~~(Math.random() * 10); return { q: `${a} × ${b}`, ans: a * b }; }
    case 1: { const a = 10 + ~~(Math.random() * 80), b = 10 + ~~(Math.random() * 70); return { q: `${a} + ${b}`, ans: a + b }; }
    case 2: { const b = 5 + ~~(Math.random() * 40), a = b + 5 + ~~(Math.random() * 50); return { q: `${a} − ${b}`, ans: a - b }; }
    case 3: { const b = 2 + ~~(Math.random() * 9), a = b * (2 + ~~(Math.random() * 9)); return { q: `${a} ÷ ${b}`, ans: a / b }; }
    case 4: { const sq = [4,9,16,25,36,49,64,81,100][~~(Math.random() * 9)]; return { q: `√${sq}`, ans: Math.round(Math.sqrt(sq)) }; }
    case 5: { const a = 2 + ~~(Math.random() * 9); return { q: `${a}²`, ans: a * a }; }
    case 6: { const a = 2 + ~~(Math.random() * 9), b = 2 + ~~(Math.random() * 9); return { q: `KPK(${a},${b})`, ans: (a * b) / gcd(a, b) }; }
    default: { const a = 10 + ~~(Math.random() * 40), b = 2 + ~~(Math.random() * 8); return { q: `${a} mod ${b}`, ans: a % b }; }
  }
};
const makeWrong = (ans: number, used: Set<number>): number => {
  let v: number, tries = 0;
  do {
    const d = 1 + ~~(Math.random() * 15);
    v = ans + (Math.random() < 0.5 ? d : -d);
    tries++;
  } while ((used.has(v) || v < 0) && tries < 100);
  return v < 0 ? ans + 1 + ~~(Math.random() * 8) : v;
};

// ── Bumper layout ─────────────────────────────────────────────────────────
const BUMPER_R = 28;
const BUMPER_COUNT = 6;
const BUMPER_POSITIONS: [number, number][] = [
  [CW / 2,        200],
  [CW / 2 - 100,  270],
  [CW / 2 + 100,  270],
  [CW / 2,        340],
  [CW / 2 - 100,  155],
  [CW / 2 + 100,  155],
];
const BUMPER_COLORS = ["#5ec8ff","#ff5e87","#72f572","#ffc94a","#bf7fff","#ff9040"];

interface Bumper {
  x: number; y: number; r: number;
  value: number; correct: boolean;
  color: string;
  hitT: number;   // flash timer on hit
  pulseT: number;
}

// ── Slingshots (side bumpers) ──────────────────────────────────────────────
const SLING_L = { x1: 42, y1: 390, x2: 42, y2: 480, w: 10 };
const SLING_R = { x1: CW - 42, y1: 390, x2: CW - 42, y2: 480, w: 10 };

// ── Guide rails (inner wall guides) ───────────────────────────────────────
interface Wall { x1: number; y1: number; x2: number; y2: number }
const STATIC_WALLS: Wall[] = [
  // Left outer wall
  { x1: 28, y1: 100, x2: 28, y2: 530 },
  // Right outer wall
  { x1: CW - 28, y1: 100, x2: CW - 28, y2: 530 },
  // Top left diagonal guide
  { x1: 28, y1: 100, x2: 110, y2: 50 },
  // Top right diagonal guide
  { x1: CW - 28, y1: 100, x2: CW - 110, y2: 50 },
  // Top wall
  { x1: 110, y1: 50, x2: CW - 110, y2: 50 },
  // Left inner guide (below flipper)
  { x1: 28, y1: 530, x2: FLIPPER_L_X - FLIPPER_LEN * 0.5, y2: FLIPPER_Y + 8 },
  // Right inner guide (below flipper)
  { x1: CW - 28, y1: 530, x2: FLIPPER_R_X + FLIPPER_LEN * 0.5, y2: FLIPPER_Y + 8 },
];

// ── Particle ──────────────────────────────────────────────────────────────
interface Particle { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number }
interface FloatText { x: number; y: number; txt: string; alpha: number; vy: number; good: boolean }
interface Trail { x: number; y: number; alpha: number }

type Phase = "idle" | "launch" | "playing" | "dead";

// ── Helpers ───────────────────────────────────────────────────────────────
function reflectOffLine(
  bx: number, by: number, bvx: number, bvy: number,
  x1: number, y1: number, x2: number, y2: number,
  restitution = 0.65
): { vx: number; vy: number; hit: boolean } {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return { vx: bvx, vy: bvy, hit: false };
  const nx = -dy / len, ny = dx / len; // normal
  // Closest point on segment
  const t = Math.max(0, Math.min(1, ((bx - x1) * dx + (by - y1) * dy) / (len * len)));
  const cx = x1 + t * dx, cy = y1 + t * dy;
  const distSq = (bx - cx) ** 2 + (by - cy) ** 2;
  if (distSq > (BALL_R + 2) ** 2) return { vx: bvx, vy: bvy, hit: false };
  // Check approaching
  const dot = bvx * nx + bvy * ny;
  if (dot >= 0) return { vx: bvx, vy: bvy, hit: false };
  const newVx = bvx - (1 + restitution) * dot * nx;
  const newVy = bvy - (1 + restitution) * dot * ny;
  return { vx: newVx, vy: newVy, hit: true };
}

function dotProduct(ax: number, ay: number, bx: number, by: number) { return ax * bx + ay * by; }

const PinballMathPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const phaseRef = useRef<Phase>("idle");
  const guruQuiz = useGuruQuiz(phaseRef);
  const bumpersRef = useRef<Bumper[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatTextsRef = useRef<FloatText[]>([]);
  const trailRef = useRef<Trail[]>([]);
  const bgStarsRef = useRef<{ x: number; y: number; r: number; alpha: number; t: number }[]>([]);

  const ballRef = useRef({ x: CW / 2, y: CH - 130, vx: 0, vy: 0 });
  const flipLAngleRef = useRef(FLIPPER_REST_ANGLE);
  const flipRAngleRef = useRef(-FLIPPER_REST_ANGLE);
  const flipLDownRef = useRef(false);
  const flipRDownRef = useRef(false);

  const currentQRef = useRef<MQ>(makeQ());
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const bestRef = useRef(0);
  const levelRef = useRef(1);
  const hueRef = useRef(0);
  const shakeRef = useRef(0);
  const launchChargeRef = useRef(0); // 0-1
  const launchingRef = useRef(false);

  const [, forceRender] = useState(0);
  const rerender = useCallback(() => forceRender(n => n + 1), []);

  // ── Build bumpers ─────────────────────────────────────────────────────
  const buildBumpers = useCallback((q: MQ) => {
    const used = new Set<number>([q.ans]);
    const values: number[] = [q.ans];
    while (values.length < BUMPER_COUNT) {
      const w = makeWrong(q.ans, used);
      used.add(w);
      values.push(w);
    }
    for (let i = values.length - 1; i > 0; i--) {
      const j = ~~(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    bumpersRef.current = BUMPER_POSITIONS.map(([x, y], i) => ({
      x, y, r: BUMPER_R,
      value: values[i],
      correct: values[i] === q.ans,
      color: BUMPER_COLORS[i % BUMPER_COLORS.length],
      hitT: 0,
      pulseT: Math.random() * Math.PI * 2,
    }));
  }, []);

  const resetBall = useCallback(() => {
    ballRef.current = { x: CW / 2, y: CH - 130, vx: 0, vy: 0 };
    launchChargeRef.current = 0;
    launchingRef.current = false;
    phaseRef.current = "launch";
    rerender();
  }, [rerender]);

  const spawnParticles = (x: number, y: number, color: string, count = 18) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const spd = 70 + Math.random() * 200;
      particlesRef.current.push({
        x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 60,
        r: 3 + Math.random() * 5, color, alpha: 1,
      });
    }
  };

  const spawnBgStars = useCallback(() => {
    bgStarsRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * CW, y: Math.random() * CH,
      r: 0.6 + Math.random() * 1.5,
      alpha: 0.15 + Math.random() * 0.5,
      t: Math.random() * Math.PI * 2,
    }));
  }, []);

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    shakeRef.current = 0;
    particlesRef.current = [];
    floatTextsRef.current = [];
    trailRef.current = [];
    flipLAngleRef.current = FLIPPER_REST_ANGLE;
    flipRAngleRef.current = -FLIPPER_REST_ANGLE;
    const q = makeQ();
    currentQRef.current = q;
    buildBumpers(q);
    spawnBgStars();
    resetBall();
  }, [buildBumpers, spawnBgStars, resetBall]);

  // ── Input handlers ────────────────────────────────────────────────────
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft"  || e.key === "z" || e.key === "Z") flipLDownRef.current = true;
      if (e.key === "ArrowRight" || e.key === "x" || e.key === "X" || e.key === "/") flipRDownRef.current = true;
      if ((e.key === " " || e.key === "ArrowUp") && phaseRef.current === "launch") launchingRef.current = true;
      e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft"  || e.key === "z" || e.key === "Z") flipLDownRef.current = false;
      if (e.key === "ArrowRight" || e.key === "x" || e.key === "X" || e.key === "/") flipRDownRef.current = false;
      if ((e.key === " " || e.key === "ArrowUp") && phaseRef.current === "launch") {
        launchingRef.current = false;
        // Release launches ball
        const charge = launchChargeRef.current;
        const spd = 250 + charge * 550;
        ballRef.current.vy = -spd;
        ballRef.current.vx = (Math.random() - 0.5) * 80;
        phaseRef.current = "playing";
        launchChargeRef.current = 0;
        rerender();
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [rerender]);

  // ── Main loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    spawnBgStars();

    const loop = (ts: number) => {
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;
      if (guruQuiz.isPausedRef.current) { rafRef.current = requestAnimationFrame(loop); return; }
      hueRef.current = (hueRef.current + dt * 20) % 360;
      const hue = hueRef.current;

      const phase = phaseRef.current;

      // ── Update flippers ──────────────────────────────────────────────
      const flipSpeed = 18;
      if (flipLDownRef.current) {
        flipLAngleRef.current = Math.max(FLIPPER_UP_ANGLE, flipLAngleRef.current - flipSpeed * dt);
      } else {
        flipLAngleRef.current = Math.min(FLIPPER_REST_ANGLE, flipLAngleRef.current + flipSpeed * dt);
      }
      if (flipRDownRef.current) {
        flipRAngleRef.current = Math.min(-FLIPPER_UP_ANGLE, flipRAngleRef.current + flipSpeed * dt);
      } else {
        flipRAngleRef.current = Math.max(-FLIPPER_REST_ANGLE, flipRAngleRef.current - flipSpeed * dt);
      }

      // ── Launch charge ────────────────────────────────────────────────
      if (phase === "launch" && launchingRef.current) {
        launchChargeRef.current = Math.min(1, launchChargeRef.current + dt * 1.4);
      }

      // ── Physics ──────────────────────────────────────────────────────
      if (phase === "playing") {
        if (shakeRef.current > 0) shakeRef.current = Math.max(0, shakeRef.current - dt * 2.5);

        const ball = ballRef.current;
        ball.vy += GRAVITY * dt;
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;

        // Speed cap
        const spd = Math.sqrt(ball.vx ** 2 + ball.vy ** 2);
        const maxSpd = 900 + levelRef.current * 60;
        if (spd > maxSpd) { ball.vx *= maxSpd / spd; ball.vy *= maxSpd / spd; }

        // Trail
        trailRef.current.push({ x: ball.x, y: ball.y, alpha: 0.5 });
        if (trailRef.current.length > 14) trailRef.current.shift();
        for (const tr of trailRef.current) tr.alpha -= dt * 4;
        trailRef.current = trailRef.current.filter(tr => tr.alpha > 0);

        // ── Wall collisions ────────────────────────────────────────────
        for (const w of STATIC_WALLS) {
          const res = reflectOffLine(ball.x, ball.y, ball.vx, ball.vy, w.x1, w.y1, w.x2, w.y2, 0.6);
          if (res.hit) { ball.vx = res.vx; ball.vy = res.vy; }
        }

        // ── Top wall ──────────────────────────────────────────────────
        if (ball.y - BALL_R < 50) { ball.y = 50 + BALL_R; ball.vy = Math.abs(ball.vy) * 0.65; }

        // ── Slingshots ────────────────────────────────────────────────
        for (const sling of [SLING_L, SLING_R]) {
          const res = reflectOffLine(ball.x, ball.y, ball.vx, ball.vy, sling.x1, sling.y1, sling.x2, sling.y2, 1.1);
          if (res.hit) {
            ball.vx = res.vx; ball.vy = res.vy;
            playPopSound();
            spawnParticles(ball.x, ball.y, "#ffffff", 8);
          }
        }

        // ── Bumper collisions ─────────────────────────────────────────
        for (const b of bumpersRef.current) {
          const dx = ball.x - b.x, dy = ball.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = BALL_R + b.r;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist, ny = dy / dist;
            // Push out
            ball.x = b.x + nx * (minDist + 1);
            ball.y = b.y + ny * (minDist + 1);
            // Reflect with boost
            const dot = ball.vx * nx + ball.vy * ny;
            const boostFactor = b.correct ? 1.2 : 0.85;
            ball.vx = (ball.vx - 2 * dot * nx) * boostFactor;
            ball.vy = (ball.vy - 2 * dot * ny) * boostFactor - (b.correct ? 40 : 0);
            b.hitT = 0.45;
            playPopSound();

            if (b.correct) {
              const pts = 50 * levelRef.current;
              scoreRef.current += pts;
              if (scoreRef.current > bestRef.current) bestRef.current = scoreRef.current;
              levelRef.current = Math.floor(scoreRef.current / 300) + 1;
              spawnParticles(b.x, b.y, b.color, 26);
              floatTextsRef.current.push({ x: b.x, y: b.y - b.r, txt: `+${pts} ✓`, alpha: 1, vy: -80, good: true });
              // New question after short delay
              setTimeout(() => {
                const q = makeQ();
                currentQRef.current = q;
                buildBumpers(q);
                rerender();
              }, 400);
            } else {
              spawnParticles(b.x, b.y, b.color, 8);
              floatTextsRef.current.push({ x: b.x, y: b.y - b.r, txt: "✗", alpha: 1, vy: -55, good: false });
            }
          }
        }

        // ── Flipper collisions ────────────────────────────────────────
        // Left flipper
        {
          const angle = flipLAngleRef.current;
          const tipX = FLIPPER_L_X + Math.cos(angle) * FLIPPER_LEN;
          const tipY = FLIPPER_Y + Math.sin(angle) * FLIPPER_LEN;
          const res = reflectOffLine(ball.x, ball.y, ball.vx, ball.vy, FLIPPER_L_X, FLIPPER_Y, tipX, tipY, 0.7);
          if (res.hit) {
            ball.vx = res.vx; ball.vy = res.vy;
            // Extra upward kick if flipper moving up
            if (flipLDownRef.current) ball.vy -= 180;
            playPopSound();
          }
        }
        // Right flipper
        {
          const angle = flipRAngleRef.current;
          const tipX = FLIPPER_R_X + Math.cos(Math.PI - Math.abs(angle)) * -FLIPPER_LEN;
          const tipY = FLIPPER_Y + Math.sin(Math.abs(angle)) * FLIPPER_LEN;
          const res = reflectOffLine(ball.x, ball.y, ball.vx, ball.vy, FLIPPER_R_X, FLIPPER_Y, tipX, tipY, 0.7);
          if (res.hit) {
            ball.vx = res.vx; ball.vy = res.vy;
            if (flipRDownRef.current) ball.vy -= 180;
            playPopSound();
          }
        }

        // ── Ball lost ─────────────────────────────────────────────────
        if (ball.y - BALL_R > CH) {
          livesRef.current--;
          shakeRef.current = 0.55;
          floatTextsRef.current.push({ x: CW / 2, y: CH - 100, txt: "💨 Bola Jatuh!", alpha: 1, vy: -50, good: false });
          if (livesRef.current <= 0) { phaseRef.current = "dead"; rerender(); }
          else { resetBall(); }
        }

        // Update particles
        for (const p of particlesRef.current) {
          p.x += p.vx * dt; p.y += p.vy * dt;
          p.vy += 260 * dt;
          p.alpha -= dt * 2;
          p.r *= 0.97;
        }
        particlesRef.current = particlesRef.current.filter(p => p.alpha > 0);

        // Update float texts
        for (const f of floatTextsRef.current) { f.y += f.vy * dt; f.alpha -= dt * 1.6; }
        floatTextsRef.current = floatTextsRef.current.filter(f => f.alpha > 0);
      }

      // Update bumper pulse
      for (const b of bumpersRef.current) {
        b.pulseT += dt * (b.correct ? 3.5 : 2.2);
        if (b.hitT > 0) b.hitT = Math.max(0, b.hitT - dt * 2.8);
      }

      // ── Draw ──────────────────────────────────────────────────────────
      const sx = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 14 : 0;
      const sy = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 6 : 0;
      ctx.save();
      ctx.translate(sx, sy);

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, CH);
      bgGrad.addColorStop(0, `hsl(${hue}, 55%, 5%)`);
      bgGrad.addColorStop(0.5, `hsl(${(hue + 90) % 360}, 50%, 7%)`);
      bgGrad.addColorStop(1, `hsl(${(hue + 180) % 360}, 55%, 5%)`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CW, CH);

      // Stars
      for (const s of bgStarsRef.current) {
        s.t += dt * 1.1;
        ctx.globalAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.t));
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Grid
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = `hsl(${hue}, 100%, 65%)`;
      ctx.lineWidth = 1;
      for (let x = 0; x < CW; x += 38) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CH); ctx.stroke(); }
      for (let y = 0; y < CH; y += 38) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CW, y); ctx.stroke(); }
      ctx.globalAlpha = 1;

      // ── HUD ─────────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(0,0,0,0.82)";
      ctx.fillRect(0, 0, CW, 50);
      ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.font = "bold 12px 'Orbitron', monospace";
      ctx.fillStyle = "#ffc94a"; ctx.shadowBlur = 8; ctx.shadowColor = "#ffc94a";
      ctx.fillText(`⭐ ${scoreRef.current}`, 10, 26);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ff5e87"; ctx.shadowColor = "#ff5e87";
      ctx.fillText(`❤️ ${"♥".repeat(Math.max(0, livesRef.current))}`, CW - 10, 26);
      ctx.textAlign = "center";
      ctx.font = "bold 10px 'Orbitron', monospace";
      ctx.fillStyle = `hsl(${(hue + 60) % 360}, 100%, 75%)`;
      ctx.shadowColor = `hsl(${(hue + 60) % 360}, 100%, 75%)`;
      ctx.fillText(`LVL ${levelRef.current}`, CW / 2, 26);
      ctx.shadowBlur = 0;

      // ── Question banner ──────────────────────────────────────────────
      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fillRect(20, 52, CW - 40, 44);
      ctx.strokeStyle = `hsl(${hue}, 100%, 55%)`;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(20, 52, CW - 40, 44);
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = "bold 10px 'Orbitron', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillText("Pantulkan bola ke bumper jawaban BENAR!", CW / 2, 62);
      ctx.font = "bold 24px 'Orbitron', monospace";
      ctx.fillStyle = `hsl(${hue}, 100%, 82%)`;
      ctx.shadowBlur = 20; ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.fillText(currentQRef.current.q, CW / 2, 82);
      ctx.shadowBlur = 0;

      // ── Static walls ─────────────────────────────────────────────────
      for (const w of STATIC_WALLS) {
        ctx.strokeStyle = `hsl(${(hue + 120) % 360}, 80%, 55%)`;
        ctx.lineWidth = 5;
        ctx.shadowBlur = 10; ctx.shadowColor = `hsl(${(hue + 120) % 360}, 80%, 55%)`;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(w.x1, w.y1); ctx.lineTo(w.x2, w.y2); ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ── Slingshots ────────────────────────────────────────────────────
      for (const sling of [SLING_L, SLING_R]) {
        ctx.strokeStyle = "#ff9040";
        ctx.lineWidth = 6;
        ctx.shadowBlur = 12; ctx.shadowColor = "#ff9040";
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(sling.x1, sling.y1); ctx.lineTo(sling.x2, sling.y2); ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ── Bumpers ────────────────────────────────────────────────────────
      for (const b of bumpersRef.current) {
        const pulse = 0.8 + 0.2 * Math.sin(b.pulseT);
        const isHit = b.hitT > 0;

        // Outer glow
        ctx.shadowBlur = (b.correct ? 35 : 16) * pulse * (isHit ? 2 : 1);
        ctx.shadowColor = isHit ? "#ffffff" : (b.correct ? `hsl(${hue}, 100%, 70%)` : b.color);

        // Body
        const grad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.05, b.x, b.y, b.r);
        const fillC = isHit ? "#ffffff" : (b.correct ? `hsl(${hue}, 100%, 62%)` : b.color);
        grad.addColorStop(0, lightenC(fillC));
        grad.addColorStop(0.6, fillC);
        grad.addColorStop(1, darkenC(fillC));
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r * (isHit ? 1.12 : 1), 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Ring
        ctx.strokeStyle = b.correct ? `hsl(${hue}, 100%, 88%)` : "rgba(255,255,255,0.35)";
        ctx.lineWidth = b.correct ? 2.5 : 1.5;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r * (isHit ? 1.12 : 1), 0, Math.PI * 2); ctx.stroke();

        // Correct star indicator
        if (b.correct) {
          ctx.strokeStyle = `hsl(${hue}, 100%, 92%)`;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 10; ctx.shadowColor = `hsl(${hue}, 100%, 88%)`;
          ctx.beginPath(); ctx.arc(b.x, b.y, b.r + 6 * pulse, 0, Math.PI * 2); ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Shine
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.beginPath(); ctx.ellipse(b.x - b.r * 0.32, b.y - b.r * 0.32, b.r * 0.32, b.r * 0.18, -0.5, 0, Math.PI * 2); ctx.fill();

        // Number
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = `bold ${b.value > 99 ? 11 : 13}px 'Orbitron', monospace`;
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 5; ctx.shadowColor = "#000";
        ctx.fillText(String(b.value), b.x, b.y);
        ctx.shadowBlur = 0;
      }

      // ── Flippers ──────────────────────────────────────────────────────
      // Left flipper
      {
        const angle = flipLAngleRef.current;
        const tipX = FLIPPER_L_X + Math.cos(angle) * FLIPPER_LEN;
        const tipY = FLIPPER_Y + Math.sin(angle) * FLIPPER_LEN;
        const col = flipLDownRef.current ? "#72f572" : "#5ec8ff";
        ctx.strokeStyle = col;
        ctx.lineWidth = FLIPPER_W;
        ctx.lineCap = "round";
        ctx.shadowBlur = 16; ctx.shadowColor = col;
        ctx.beginPath(); ctx.moveTo(FLIPPER_L_X, FLIPPER_Y); ctx.lineTo(tipX, tipY); ctx.stroke();
        ctx.shadowBlur = 0;
        // Pivot dot
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(FLIPPER_L_X, FLIPPER_Y, 5, 0, Math.PI * 2); ctx.fill();
      }
      // Right flipper
      {
        const angle = flipRAngleRef.current;
        const tipX = FLIPPER_R_X + Math.cos(Math.PI - Math.abs(angle)) * -FLIPPER_LEN;
        const tipY = FLIPPER_Y + Math.sin(Math.abs(angle)) * FLIPPER_LEN;
        const col = flipRDownRef.current ? "#72f572" : "#5ec8ff";
        ctx.strokeStyle = col;
        ctx.lineWidth = FLIPPER_W;
        ctx.lineCap = "round";
        ctx.shadowBlur = 16; ctx.shadowColor = col;
        ctx.beginPath(); ctx.moveTo(FLIPPER_R_X, FLIPPER_Y); ctx.lineTo(tipX, tipY); ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(FLIPPER_R_X, FLIPPER_Y, 5, 0, Math.PI * 2); ctx.fill();
      }

      // ── Ball trail ────────────────────────────────────────────────────
      for (let ti = 0; ti < trailRef.current.length; ti++) {
        const tr = trailRef.current[ti];
        ctx.globalAlpha = Math.max(0, tr.alpha * (ti / trailRef.current.length) * 0.5);
        ctx.fillStyle = `hsl(${hue}, 100%, 65%)`;
        const r = BALL_R * (ti / trailRef.current.length) * 0.7;
        ctx.beginPath(); ctx.arc(tr.x, tr.y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ── Ball ─────────────────────────────────────────────────────────
      if (phase !== "idle") {
        const ball = ballRef.current;
        const ballGrad = ctx.createRadialGradient(ball.x - BALL_R * 0.3, ball.y - BALL_R * 0.3, BALL_R * 0.05, ball.x, ball.y, BALL_R);
        ballGrad.addColorStop(0, "#ffffff");
        ballGrad.addColorStop(0.4, `hsl(${hue}, 100%, 78%)`);
        ballGrad.addColorStop(1, `hsl(${hue}, 100%, 42%)`);
        ctx.shadowBlur = 22; ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
        ctx.fillStyle = ballGrad;
        ctx.beginPath(); ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Launch charge bar
        if (phase === "launch") {
          const charge = launchChargeRef.current;
          // Arrow indicator
          ctx.fillStyle = `rgba(255,255,255,0.5)`;
          ctx.font = "14px 'Orbitron', monospace";
          ctx.textAlign = "center";
          ctx.fillText("Hold SPACE ↑", CW / 2, CH - 28);
          // Power bar
          ctx.fillStyle = "rgba(255,255,255,0.1)";
          ctx.fillRect(60, CH - 18, CW - 120, 8);
          const barColor = `hsl(${120 - charge * 120}, 100%, 55%)`;
          ctx.fillStyle = barColor; ctx.shadowBlur = 8; ctx.shadowColor = barColor;
          ctx.fillRect(60, CH - 18, (CW - 120) * charge, 8);
          ctx.shadowBlur = 0;
        }
      }

      // ── Particles ─────────────────────────────────────────────────────
      for (const p of particlesRef.current) {
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8; ctx.shadowColor = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // ── Float texts ───────────────────────────────────────────────────
      for (const f of floatTextsRef.current) {
        ctx.globalAlpha = Math.max(0, f.alpha);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 15px 'Orbitron', monospace";
        ctx.fillStyle = f.good ? "#ffc94a" : "#ff5e87";
        ctx.shadowBlur = 12; ctx.shadowColor = f.good ? "#ffc94a" : "#ff5e87";
        ctx.fillText(f.txt, f.x, f.y);
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // ── Controls hint ─────────────────────────────────────────────────
      if (phase === "playing" || phase === "launch") {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, CH - 40, CW, 40);
        ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.font = "bold 9px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fillText("Z / ← = Flipper Kiri", 12, CH - 22);
        ctx.textAlign = "right";
        ctx.fillText("X / → = Flipper Kanan", CW - 12, CH - 22);
      }

      // ── Idle overlay ─────────────────────────────────────────────────
      if (phase === "idle") {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 28px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${hue}, 100%, 78%)`;
        ctx.shadowBlur = 30; ctx.shadowColor = `hsl(${hue}, 100%, 78%)`;
        ctx.fillText("🎰 PINBALL MATH", CW / 2, CH / 2 - 70);
        ctx.shadowBlur = 0;
        ctx.font = "bold 12px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.82)";
        ctx.fillText("Pantulkan bola ke bumper benar!", CW / 2, CH / 2 - 22);
        ctx.font = "bold 11px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText("Z/← = kiri  |  X/→ = kanan", CW / 2, CH / 2 + 8);
        ctx.fillText("SPACE = tahan & lepas untuk launch", CW / 2, CH / 2 + 28);
        ctx.font = "bold 14px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a"; ctx.shadowBlur = 14; ctx.shadowColor = "#ffc94a";
        ctx.fillText("[ Klik untuk Mulai ]", CW / 2, CH / 2 + 70);
        ctx.shadowBlur = 0;
        if (bestRef.current > 0) {
          ctx.font = "bold 10px 'Orbitron', monospace";
          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.fillText(`Rekor: ${bestRef.current}`, CW / 2, CH / 2 + 100);
        }
      }

      // ── Dead overlay ─────────────────────────────────────────────────
      if (phase === "dead") {
        ctx.fillStyle = "rgba(0,0,0,0.74)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 26px 'Orbitron', monospace";
        ctx.fillStyle = "#ff5e87"; ctx.shadowBlur = 26; ctx.shadowColor = "#ff5e87";
        ctx.fillText("GAME OVER", CW / 2, CH / 2 - 55);
        ctx.shadowBlur = 0;
        ctx.font = "bold 20px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a"; ctx.shadowBlur = 14; ctx.shadowColor = "#ffc94a";
        ctx.fillText(`Skor: ${scoreRef.current}`, CW / 2, CH / 2 - 10);
        ctx.shadowBlur = 0;
        if (bestRef.current > 0) {
          ctx.font = "bold 12px 'Orbitron', monospace";
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.fillText(`Rekor: ${bestRef.current}`, CW / 2, CH / 2 + 22);
        }
        ctx.font = "bold 14px 'Orbitron', monospace";
        ctx.fillStyle = "#72f572"; ctx.shadowBlur = 14; ctx.shadowColor = "#72f572";
        ctx.fillText("[ Klik untuk Main Lagi ]", CW / 2, CH / 2 + 60);
        ctx.shadowBlur = 0;
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [spawnBgStars, buildBumpers, resetBall, rerender]);

  // ── Touch controls ────────────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (phaseRef.current === "idle" || phaseRef.current === "dead") { startGame(); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < e.touches.length; i++) {
      const tx = (e.touches[i].clientX - rect.left) * (CW / rect.width);
      if (phaseRef.current === "launch") {
        launchingRef.current = true;
      } else {
        if (tx < CW / 2) flipLDownRef.current = true;
        else flipRDownRef.current = true;
      }
    }
  }, [startGame]);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (phaseRef.current === "launch" && launchingRef.current) {
      launchingRef.current = false;
      const charge = launchChargeRef.current;
      const spd = 250 + charge * 550;
      ballRef.current.vy = -spd;
      ballRef.current.vx = (Math.random() - 0.5) * 80;
      phaseRef.current = "playing";
      launchChargeRef.current = 0;
      rerender();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (e.touches.length === 0) {
      flipLDownRef.current = false;
      flipRDownRef.current = false;
    } else {
      let hasLeft = false, hasRight = false;
      for (let i = 0; i < e.touches.length; i++) {
        const tx = (e.touches[i].clientX - rect.left) * (CW / rect.width);
        if (tx < CW / 2) hasLeft = true; else hasRight = true;
      }
      flipLDownRef.current = hasLeft;
      flipRDownRef.current = hasRight;
    }
  }, [rerender]);

  const handleClick = useCallback(() => {
    if (phaseRef.current === "idle" || phaseRef.current === "dead") startGame();
  }, [startGame]);

  return (
    <div className={`relative flex flex-col items-center overflow-hidden ${isLight ? "gradient-snow" : "gradient-space"}`} style={{ height: '100dvh' }}>
      {isLight ? <Snowfall /> : <Starfield />}
      <div className="relative z-10 flex flex-col items-center gap-4 py-6">
        <div className="flex items-center justify-between w-full max-w-sm px-1 mb-1">
          <button
            onClick={() => { playPopSound(); navigate('/ruang-untuk-guru/numatik-game'); }}
            className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all text-sm"
            title="Menu Utama"
          >
            🏠
          </button>
          <span className="font-display text-sm text-accent">🎰 Pinball Math</span>
          <button
            onClick={() => { playPopSound(); navigate(-1); }}
            className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all font-bold"
            title="Keluar"
          >
            ✕
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={e => e.preventDefault()}
          className="rounded-2xl border border-white/10 shadow-2xl cursor-pointer"
          style={{ maxWidth: "96vw", maxHeight: "calc(100dvh - 90px)", aspectRatio: `${CW}/${CH}` }}
        />
        <p className="text-white/30 text-xs font-body text-center max-w-xs">
          Tahan SPACE untuk isi daya, lepas untuk launch! Z/← flipper kiri, X/→ flipper kanan.
        </p>
      <GuruQuizOverlay {...guruQuiz} />
      </div>
    </div>
  );
};

function lightenC(color: string): string {
  if (color.startsWith("hsl")) {
    const m = color.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
    if (m) return `hsl(${m[1]}, ${m[2]}%, ${Math.min(100, parseFloat(m[3]) + 28)}%)`;
  }
  if (color.startsWith("#")) {
    const r = Math.min(255, parseInt(color.slice(1, 3), 16) + 70);
    const g = Math.min(255, parseInt(color.slice(3, 5), 16) + 70);
    const b = Math.min(255, parseInt(color.slice(5, 7), 16) + 70);
    return `rgb(${r},${g},${b})`;
  }
  return color;
}
function darkenC(color: string): string {
  if (color.startsWith("hsl")) {
    const m = color.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
    if (m) return `hsl(${m[1]}, ${m[2]}%, ${Math.max(0, parseFloat(m[3]) - 24)}%)`;
  }
  if (color.startsWith("#")) {
    const r = Math.max(0, parseInt(color.slice(1, 3), 16) - 50);
    const g = Math.max(0, parseInt(color.slice(3, 5), 16) - 50);
    const b = Math.max(0, parseInt(color.slice(5, 7), 16) - 50);
    return `rgb(${r},${g},${b})`;
  }
  return color;
}

export default PinballMathPage;
