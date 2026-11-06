import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import { playPopSound } from "@/hooks/useAudio";
import { useGuruQuiz } from "@/hooks/useGuruQuiz";
import GuruQuizOverlay from "@/components/GuruQuizOverlay";

const CW = 420;
const CH = 580;
const BALL_COUNT = 6;
const BALL_R = 32;

interface MQ { q: string; ans: number }
function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

const makeQ = (): MQ => {
  const t = ~~(Math.random() * 8);
  switch (t) {
    case 0: { const a = 2 + ~~(Math.random() * 10), b = 2 + ~~(Math.random() * 10); return { q: `${a} × ${b}`, ans: a * b }; }
    case 1: { const a = 10 + ~~(Math.random() * 80), b = 10 + ~~(Math.random() * 80); return { q: `${a} + ${b}`, ans: a + b }; }
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

const BALL_COLORS = [
  { fill: "#ff5e87", glow: "#ff5e87" },
  { fill: "#5ec8ff", glow: "#5ec8ff" },
  { fill: "#72f572", glow: "#72f572" },
  { fill: "#ffc94a", glow: "#ffc94a" },
  { fill: "#bf7fff", glow: "#bf7fff" },
  { fill: "#ff9040", glow: "#ff9040" },
];

interface Ball {
  x: number; y: number; vx: number; vy: number;
  value: number; correct: boolean;
  color: typeof BALL_COLORS[0];
  pulse: number;
  wobble: number;
  popT: number;
  wrongT: number;
  trail: { x: number; y: number; alpha: number }[];
}

interface FloatText { x: number; y: number; txt: string; alpha: number; vy: number; good: boolean }
interface Particle { x: number; y: number; vx: number; vy: number; alpha: number; r: number; color: string }

type Phase = "idle" | "playing" | "dead";

const BounceMathPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const phaseRef = useRef<Phase>("idle");
  const guruQuiz = useGuruQuiz(phaseRef);
  const ballsRef = useRef<Ball[]>([]);
  const floatTextsRef = useRef<FloatText[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const bgStarsRef = useRef<{ x: number; y: number; r: number; alpha: number; t: number }[]>([]);

  const currentQRef = useRef<MQ>(makeQ());
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const bestRef = useRef(0);
  const levelRef = useRef(1);
  const timerRef = useRef(60);
  const timerAccRef = useRef(0);
  const comboRef = useRef(0);
  const hueRef = useRef(0);
  const shakeRef = useRef(0);
  const bgStarsTRef = useRef(0);

  const [, forceRender] = useState(0);
  const rerender = useCallback(() => forceRender(n => n + 1), []);

  const makeBalls = useCallback((q: MQ) => {
    const used = new Set<number>([q.ans]);
    const values: number[] = [q.ans];
    while (values.length < BALL_COUNT) {
      const w = makeWrong(q.ans, used);
      used.add(w);
      values.push(w);
    }
    for (let i = values.length - 1; i > 0; i--) {
      const j = ~~(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }

    const balls: Ball[] = [];
    const speed = 110 + levelRef.current * 18;
    for (let i = 0; i < BALL_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / BALL_COUNT + Math.random() * 0.3;
      const spd = speed * (0.75 + Math.random() * 0.5);
      let bx: number, by: number;
      let attempts = 0;
      do {
        bx = BALL_R + 20 + Math.random() * (CW - BALL_R * 2 - 40);
        by = 130 + Math.random() * (CH - 130 - BALL_R - 20);
        attempts++;
      } while (attempts < 50 && balls.some(b => Math.hypot(b.x - bx, b.y - by) < BALL_R * 2.2));

      balls.push({
        x: bx, y: by,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        value: values[i],
        correct: values[i] === q.ans,
        color: BALL_COLORS[i % BALL_COLORS.length],
        pulse: Math.random() * Math.PI * 2,
        wobble: 0,
        popT: 0,
        wrongT: 0,
        trail: [],
      });
    }
    ballsRef.current = balls;
  }, []);

  const spawnBgStars = useCallback(() => {
    bgStarsRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * CW, y: Math.random() * CH,
      r: 0.6 + Math.random() * 1.6,
      alpha: 0.15 + Math.random() * 0.5,
      t: Math.random() * Math.PI * 2,
    }));
  }, []);

  const spawnParticles = (x: number, y: number, color: string, count = 20) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const spd = 60 + Math.random() * 180;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        alpha: 1,
        r: 3 + Math.random() * 5,
        color,
      });
    }
  };

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    timerRef.current = 60;
    timerAccRef.current = 0;
    comboRef.current = 0;
    shakeRef.current = 0;
    floatTextsRef.current = [];
    particlesRef.current = [];
    phaseRef.current = "playing";
    const q = makeQ();
    currentQRef.current = q;
    makeBalls(q);
    spawnBgStars();
    rerender();
  }, [makeBalls, spawnBgStars, rerender]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let cx: number, cy: number;
    if ("touches" in e) {
      cx = (e.touches[0]?.clientX ?? (e as React.TouchEvent).changedTouches[0].clientX) - rect.left;
      cy = (e.touches[0]?.clientY ?? (e as React.TouchEvent).changedTouches[0].clientY) - rect.top;
    } else {
      cx = (e as React.MouseEvent).clientX - rect.left;
      cy = (e as React.MouseEvent).clientY - rect.top;
    }
    const scaleX = CW / rect.width;
    const scaleY = CH / rect.height;
    const gx = cx * scaleX;
    const gy = cy * scaleY;

    if (phaseRef.current === "idle" || phaseRef.current === "dead") { startGame(); return; }

    const balls = ballsRef.current;
    for (const b of balls) {
      if (Math.hypot(b.x - gx, b.y - gy) < BALL_R + 4) {
        if (b.correct) {
          playPopSound();
          comboRef.current++;
          const pts = 15 * comboRef.current * levelRef.current;
          scoreRef.current += pts;
          if (scoreRef.current > bestRef.current) bestRef.current = scoreRef.current;
          timerRef.current = Math.min(timerRef.current + 6, 60);
          spawnParticles(b.x, b.y, b.color.glow, 24);
          floatTextsRef.current.push({
            x: b.x, y: b.y - BALL_R,
            txt: `+${pts}${comboRef.current > 1 ? ` 🔥×${comboRef.current}` : ""}`,
            alpha: 1, vy: -80, good: true,
          });
          levelRef.current = Math.floor(scoreRef.current / 200) + 1;
          const q = makeQ();
          currentQRef.current = q;
          makeBalls(q);
          rerender();
        } else {
          playPopSound();
          comboRef.current = 0;
          livesRef.current--;
          shakeRef.current = 0.55;
          b.wrongT = 0.6;
          floatTextsRef.current.push({
            x: b.x, y: b.y - BALL_R,
            txt: "✗ Salah!", alpha: 1, vy: -60, good: false,
          });
          if (livesRef.current <= 0) {
            phaseRef.current = "dead";
            rerender();
          }
        }
        break;
      }
    }
  }, [startGame, makeBalls, rerender]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    spawnBgStars();

    const loop = (ts: number) => {
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;
      if (guruQuiz.isPausedRef.current) { rafRef.current = requestAnimationFrame(loop); return; }
      hueRef.current = (hueRef.current + dt * 18) % 360;
      bgStarsTRef.current += dt;

      const phase = phaseRef.current;

      if (phase === "playing") {
        timerAccRef.current += dt;
        if (timerAccRef.current >= 1) {
          timerAccRef.current -= 1;
          timerRef.current--;
          if (timerRef.current <= 0) {
            timerRef.current = 0;
            phaseRef.current = "dead";
            rerender();
          }
        }
        if (shakeRef.current > 0) shakeRef.current = Math.max(0, shakeRef.current - dt * 2.5);

        const balls = ballsRef.current;
        for (const b of balls) {
          b.pulse += dt * 3.2;
          if (b.wrongT > 0) b.wrongT = Math.max(0, b.wrongT - dt * 2.5);

          b.x += b.vx * dt;
          b.y += b.vy * dt;

          if (b.x - BALL_R < 0) { b.x = BALL_R; b.vx = Math.abs(b.vx); }
          if (b.x + BALL_R > CW) { b.x = CW - BALL_R; b.vx = -Math.abs(b.vx); }
          if (b.y - BALL_R < 130) { b.y = 130 + BALL_R; b.vy = Math.abs(b.vy); }
          if (b.y + BALL_R > CH) { b.y = CH - BALL_R; b.vy = -Math.abs(b.vy); }

          b.trail.push({ x: b.x, y: b.y, alpha: 0.45 });
          if (b.trail.length > 12) b.trail.shift();
          for (const tr of b.trail) tr.alpha -= dt * 3.5;
          b.trail = b.trail.filter(tr => tr.alpha > 0);

          // ball-ball collision
          for (const b2 of balls) {
            if (b2 === b) continue;
            const dx = b2.x - b.x, dy = b2.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < BALL_R * 2 && dist > 0) {
              const nx = dx / dist, ny = dy / dist;
              const relV = (b.vx - b2.vx) * nx + (b.vy - b2.vy) * ny;
              if (relV > 0) {
                b.vx -= relV * nx; b.vy -= relV * ny;
                b2.vx += relV * nx; b2.vy += relV * ny;
              }
              const overlap = BALL_R * 2 - dist;
              b.x -= nx * overlap * 0.5; b.y -= ny * overlap * 0.5;
              b2.x += nx * overlap * 0.5; b2.y += ny * overlap * 0.5;
            }
          }
        }

        for (const p of particlesRef.current) {
          p.x += p.vx * dt; p.y += p.vy * dt;
          p.vy += 200 * dt;
          p.alpha -= dt * 2;
          p.r *= 0.97;
        }
        particlesRef.current = particlesRef.current.filter(p => p.alpha > 0);

        for (const f of floatTextsRef.current) { f.y += f.vy * dt; f.alpha -= dt * 1.5; }
        floatTextsRef.current = floatTextsRef.current.filter(f => f.alpha > 0);
      }

      // ── Draw ──────────────────────────────────────────────────────────
      const hue = hueRef.current;
      const sx = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 14 : 0;
      const sy = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 6 : 0;
      ctx.save();
      ctx.translate(sx, sy);

      // Background
      const bg = ctx.createLinearGradient(0, 0, CW, CH);
      bg.addColorStop(0, `hsl(${hue}, 60%, 5%)`);
      bg.addColorStop(0.5, `hsl(${(hue + 80) % 360}, 55%, 7%)`);
      bg.addColorStop(1, `hsl(${(hue + 160) % 360}, 60%, 5%)`);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, CW, CH);

      // Stars
      for (const s of bgStarsRef.current) {
        s.t += dt * 1.2;
        ctx.globalAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.t));
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Grid
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`;
      ctx.lineWidth = 1;
      for (let x = 0; x < CW; x += 42) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CH); ctx.stroke(); }
      for (let y = 0; y < CH; y += 42) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CW, y); ctx.stroke(); }
      ctx.globalAlpha = 1;

      // HUD
      const hudGrad = ctx.createLinearGradient(0, 0, CW, 0);
      hudGrad.addColorStop(0, "rgba(3,3,18,0.94)");
      hudGrad.addColorStop(1, "rgba(8,2,28,0.94)");
      ctx.fillStyle = hudGrad;
      ctx.fillRect(0, 0, CW, 118);

      if (phase === "playing") {
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 11px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.shadowBlur = 0;
        ctx.fillText("Klik bola dengan jawaban BENAR! 🎱", CW / 2, 16);

        ctx.shadowBlur = 28; ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
        ctx.fillStyle = `hsl(${hue}, 100%, 84%)`;
        ctx.font = "bold 32px 'Orbitron', monospace";
        ctx.fillText(currentQRef.current.q, CW / 2, 56);
        ctx.shadowBlur = 0;

        ctx.textAlign = "left";
        ctx.font = "bold 12px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a"; ctx.shadowBlur = 10; ctx.shadowColor = "#ffc94a";
        ctx.fillText(`⭐ ${scoreRef.current}`, 10, 88);

        ctx.textAlign = "right";
        ctx.fillStyle = "#ff5e87"; ctx.shadowColor = "#ff5e87";
        ctx.fillText(`❤️ ${"♥".repeat(Math.max(0, livesRef.current))}`, CW - 10, 88);

        ctx.textAlign = "center";
        ctx.font = "bold 10px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${(hue + 60) % 360}, 100%, 75%)`;
        ctx.fillText(`LVL ${levelRef.current}`, CW / 2, 88);
        ctx.shadowBlur = 0;

        const tFrac = timerRef.current / 60;
        const tCol = `hsl(${tFrac * 120}, 100%, 55%)`;
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.fillRect(0, 112, CW, 6);
        ctx.fillStyle = tCol; ctx.shadowBlur = 8; ctx.shadowColor = tCol;
        ctx.fillRect(0, 112, CW * tFrac, 6);
        ctx.shadowBlur = 0;
      }

      // Balls
      for (const b of ballsRef.current) {
        const isWrong = b.wrongT > 0;
        const pulse = 0.75 + 0.25 * Math.sin(b.pulse);

        // Trail
        for (let ti = 0; ti < b.trail.length; ti++) {
          const tr = b.trail[ti];
          const trAlpha = tr.alpha * (ti / b.trail.length) * 0.5;
          ctx.globalAlpha = Math.max(0, trAlpha);
          ctx.fillStyle = b.color.fill;
          const r = BALL_R * (ti / b.trail.length) * 0.6;
          ctx.beginPath(); ctx.arc(tr.x, tr.y, r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Glow
        const glowColor = isWrong ? "#ff3333" : (b.correct ? `hsl(${hue}, 100%, 70%)` : b.color.glow);
        ctx.shadowBlur = (b.correct ? 30 : 16) * pulse;
        ctx.shadowColor = glowColor;

        // Body gradient
        const grad = ctx.createRadialGradient(b.x - BALL_R * 0.3, b.y - BALL_R * 0.3, BALL_R * 0.1, b.x, b.y, BALL_R);
        const fillColor = isWrong ? "#ff3333" : (b.correct ? `hsl(${hue}, 100%, 65%)` : b.color.fill);
        grad.addColorStop(0, lightenHex(fillColor, 0.45));
        grad.addColorStop(0.6, fillColor);
        grad.addColorStop(1, darkenHex(fillColor, 0.4));
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Shine
        ctx.fillStyle = "rgba(255,255,255,0.28)";
        ctx.beginPath();
        ctx.ellipse(b.x - BALL_R * 0.3, b.y - BALL_R * 0.3, BALL_R * 0.38, BALL_R * 0.22, -0.6, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = b.correct ? `hsl(${hue}, 100%, 90%)` : "rgba(255,255,255,0.3)";
        ctx.lineWidth = b.correct ? 2.5 : 1.5;
        ctx.beginPath(); ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2); ctx.stroke();

        // Number text
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = `bold ${b.value > 99 ? 13 : 16}px 'Orbitron', monospace`;
        ctx.fillStyle = isWrong ? "#fff" : (b.correct ? "#fff" : "#fff");
        ctx.shadowBlur = 6; ctx.shadowColor = "#000";
        ctx.fillText(String(b.value), b.x, b.y);
        ctx.shadowBlur = 0;
      }

      // Particles
      for (const p of particlesRef.current) {
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8; ctx.shadowColor = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // Float texts
      for (const f of floatTextsRef.current) {
        ctx.globalAlpha = Math.max(0, f.alpha);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = `bold 16px 'Orbitron', monospace`;
        ctx.fillStyle = f.good ? "#ffc94a" : "#ff5e87";
        ctx.shadowBlur = 12; ctx.shadowColor = f.good ? "#ffc94a" : "#ff5e87";
        ctx.fillText(f.txt, f.x, f.y);
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // Overlay screens
      if (phase === "idle") {
        ctx.fillStyle = "rgba(0,0,0,0.68)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 30px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${hue}, 100%, 78%)`;
        ctx.shadowBlur = 30; ctx.shadowColor = `hsl(${hue}, 100%, 78%)`;
        ctx.fillText("🎱 BOUNCE MATH", CW / 2, CH / 2 - 60);
        ctx.shadowBlur = 0;
        ctx.font = "bold 13px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fillText("Klik bola jawaban yang BENAR!", CW / 2, CH / 2 - 10);
        ctx.font = "bold 11px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fillText("Bola-bola memantul → pilih yang tepat", CW / 2, CH / 2 + 20);
        ctx.font = "bold 14px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a";
        ctx.shadowBlur = 15; ctx.shadowColor = "#ffc94a";
        ctx.fillText("[ Klik untuk Mulai ]", CW / 2, CH / 2 + 60);
        ctx.shadowBlur = 0;
        if (bestRef.current > 0) {
          ctx.font = "bold 11px 'Orbitron', monospace";
          ctx.fillStyle = "rgba(255,255,255,0.4)";
          ctx.fillText(`Rekor: ${bestRef.current}`, CW / 2, CH / 2 + 90);
        }
      }

      if (phase === "dead") {
        ctx.fillStyle = "rgba(0,0,0,0.72)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 28px 'Orbitron', monospace";
        ctx.fillStyle = "#ff5e87";
        ctx.shadowBlur = 28; ctx.shadowColor = "#ff5e87";
        ctx.fillText("GAME OVER", CW / 2, CH / 2 - 55);
        ctx.shadowBlur = 0;
        ctx.font = "bold 20px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a"; ctx.shadowBlur = 14; ctx.shadowColor = "#ffc94a";
        ctx.fillText(`Skor: ${scoreRef.current}`, CW / 2, CH / 2 - 10);
        ctx.shadowBlur = 0;
        if (bestRef.current > 0) {
          ctx.font = "bold 13px 'Orbitron', monospace";
          ctx.fillStyle = "rgba(255,255,255,0.55)";
          ctx.fillText(`Rekor Terbaik: ${bestRef.current}`, CW / 2, CH / 2 + 22);
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
  }, [spawnBgStars, rerender]);

  return (
    <div className={`relative flex flex-col items-center overflow-hidden ${isLight ? "gradient-snow" : "gradient-space"}`} style={{ height: '100dvh' }}>
      {isLight ? <Snowfall /> : <Starfield />}
      <div className="relative z-10 flex flex-col items-center gap-2 pt-5 pb-2 h-full justify-center">
        <div className="shrink-0 flex items-center justify-between w-full max-w-sm px-1">
          <button
            onClick={() => { playPopSound(); navigate('/ruang-untuk-guru/numatik-game'); }}
            className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all text-sm"
            title="Menu Utama"
          >
            🏠
          </button>
          <span className="font-display text-sm text-accent">🎱 Bounce Math</span>
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
          onTouchStart={(e) => { e.preventDefault(); handleClick(e); }}
          className="rounded-2xl border border-white/10 shadow-2xl cursor-pointer"
          style={{ maxWidth: "96vw", maxHeight: "calc(100dvh - 90px)", aspectRatio: `${CW}/${CH}` }}
        />
        <p className="text-white/30 text-xs font-body text-center max-w-xs">
          Klik bola yang menampilkan jawaban benar dari soal di atas!
        </p>
      <GuruQuizOverlay {...guruQuiz} />
      </div>
    </div>
  );
};

function lightenHex(color: string, amt: number): string {
  if (color.startsWith("hsl")) {
    const m = color.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
    if (m) return `hsl(${m[1]}, ${m[2]}%, ${Math.min(100, parseFloat(m[3]) + amt * 60)}%)`;
  }
  return color;
}
function darkenHex(color: string, amt: number): string {
  if (color.startsWith("hsl")) {
    const m = color.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
    if (m) return `hsl(${m[1]}, ${m[2]}%, ${Math.max(0, parseFloat(m[3]) - amt * 60)}%)`;
  }
  return color;
}

export default BounceMathPage;
