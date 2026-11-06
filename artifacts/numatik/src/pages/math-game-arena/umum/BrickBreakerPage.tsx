import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import { playPopSound } from "@/hooks/useAudio";
import { useGuruQuiz, type GuruQuestion } from "@/hooks/useGuruQuiz";
import GuruQuizOverlay from "@/components/GuruQuizOverlay";
import MathGameIntro from "@/components/MathGameIntro";

interface BrickBreakerProps {
  topicLabel?: string;
  backPath?: string;
  homePath?: string;
  quizQuestions?: GuruQuestion[];
}

const CW = 420;
const CH = 600;

const PADDLE_Y = CH - 38;
const PADDLE_H = 14;
const PADDLE_W_BASE = 96;
const BALL_R = 9;
const BALL_SPEED_BASE = 230;

// ── Difficulty escalation ────────────────────────────────────────────────────
// Every DIFFICULTY_INTERVAL seconds of active play, the game escalates one
// notch (Normal → Hard → Very Hard) and ball speed increases by `mult`.
const DIFFICULTY_INTERVAL = 60;
const DIFFICULTY_LEVELS: { name: string; mult: number; color: string; glow: string }[] = [
  { name: "NORMAL",    mult: 1.00, color: "#5eead4", glow: "#22d3ee" },
  { name: "HARD",      mult: 1.30, color: "#fbbf24", glow: "#f59e0b" },
  { name: "VERY HARD", mult: 1.65, color: "#ef4444", glow: "#dc2626" },
];

const BRICK_COLS = 7;
const BRICK_ROWS = 5;
const BRICK_PAD = 5;
const BRICK_START_X = 12;
const BRICK_START_Y = 60;
const BRICK_W = (CW - BRICK_START_X * 2 - BRICK_PAD * (BRICK_COLS - 1)) / BRICK_COLS;
const BRICK_H = 26;

// ── Brick color palette ──────────────────────────────────────────────────────
const ROW_COLORS = [
  { fill: "#ff5e87", glow: "#ff5e87" },
  { fill: "#ff9040", glow: "#ff9040" },
  { fill: "#ffc94a", glow: "#ffc94a" },
  { fill: "#72f572", glow: "#72f572" },
  { fill: "#5ec8ff", glow: "#5ec8ff" },
];

interface Brick {
  col: number; row: number;
  x: number; y: number;
  color: typeof ROW_COLORS[0];
  alive: boolean;
  hits: number;     // number of times this brick has been hit by the ball
  cracked: boolean; // becomes true after first hit (visual crack)
  hitT: number;     // hit pop animation
  hitCooldown: number; // seconds remaining where the brick can't be re-hit
  sparkles: Sparkle[];
}

interface Sparkle { x: number; y: number; vx: number; vy: number; alpha: number; r: number; color: string }
interface FloatText { x: number; y: number; txt: string; alpha: number; vy: number; good: boolean }
// Flame particle for the ball's burning trail
interface Trail { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; r: number }

type Phase = "idle" | "ready" | "playing" | "dead";

const BrickBreakerPage = ({
  topicLabel,
  backPath,
  homePath,
  quizQuestions,
}: BrickBreakerProps = {}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const DEFAULT_HOME = "/ruang-untuk-guru/numatik-game";
  const resolvedBackPath = backPath ?? null;
  const resolvedHomePath = homePath ?? DEFAULT_HOME;

  const phaseRef = useRef<Phase>("idle");
  const guruQuiz = useGuruQuiz(phaseRef, "playing", 25_000, quizQuestions);
  const bricksRef = useRef<Brick[]>([]);
  const floatTextsRef = useRef<FloatText[]>([]);
  const trailRef = useRef<Trail[]>([]);

  const ballRef = useRef({ x: CW / 2, y: PADDLE_Y - BALL_R - 2, vx: 0, vy: 0, launched: false });
  const paddleRef = useRef({ x: CW / 2, w: PADDLE_W_BASE, powerT: 0 });
  const mouseTRef = useRef(CW / 2);
  // On-screen control buttons (left side)
  const holdLeftRef = useRef(false);
  const holdRightRef = useRef(false);
  const BUTTON_SPEED = 360; // px / second (in canvas coordinates)

  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const bestRef = useRef(0);
  const levelRef = useRef(1);
  const timerRef = useRef(90);
  const timerAccRef = useRef(0);
  const comboRef = useRef(0);
  const shakeRef = useRef(0);
  const hueRef = useRef(0);
  const bgStarsRef = useRef<{ x: number; y: number; r: number; alpha: number; t: number }[]>([]);

  // Difficulty escalation state
  const gameTimeRef = useRef(0);          // seconds of active play since startGame
  const difficultyRef = useRef(0);        // 0=Normal, 1=Hard, 2=Very Hard
  const modeBannerRef = useRef<{ idx: number; t: number } | null>(null); // visible banner


  const [, forceRender] = useState(0);
  const rerender = useCallback(() => forceRender(n => n + 1), []);

  // ── Build brick grid (color-only, no math) ────────────────────────────────
  const buildBricks = useCallback(() => {
    const bricks: Brick[] = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks.push({
          col, row,
          x: BRICK_START_X + col * (BRICK_W + BRICK_PAD),
          y: BRICK_START_Y + row * (BRICK_H + BRICK_PAD),
          color: ROW_COLORS[row % ROW_COLORS.length],
          alive: true,
          hits: 0,
          cracked: false,
          hitT: 0,
          hitCooldown: 0,
          sparkles: [],
        });
      }
    }
    bricksRef.current = bricks;
  }, []);

  const resetBall = useCallback(() => {
    const px = paddleRef.current.x;
    ballRef.current = { x: px, y: PADDLE_Y - BALL_R - 2, vx: 0, vy: 0, launched: false };
    phaseRef.current = "ready";
  }, []);

  const launchBall = useCallback(() => {
    const baseSpeed = BALL_SPEED_BASE + levelRef.current * 18;
    const speed = baseSpeed * DIFFICULTY_LEVELS[difficultyRef.current].mult;
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
    ballRef.current.vx = Math.cos(angle) * speed;
    ballRef.current.vy = Math.sin(angle) * speed;
    ballRef.current.launched = true;
    phaseRef.current = "playing";
  }, []);

  const spawnBgStars = useCallback(() => {
    bgStarsRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * CW, y: Math.random() * CH,
      r: 0.8 + Math.random() * 1.8,
      alpha: 0.2 + Math.random() * 0.6,
      t: Math.random() * Math.PI * 2,
    }));
  }, []);

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    timerRef.current = 90;
    timerAccRef.current = 0;
    comboRef.current = 0;
    shakeRef.current = 0;
    gameTimeRef.current = 0;
    difficultyRef.current = 0;
    modeBannerRef.current = null;
    floatTextsRef.current = [];
    trailRef.current = [];
    paddleRef.current = { x: CW / 2, w: PADDLE_W_BASE, powerT: 0 };
    mouseTRef.current = CW / 2;
    buildBricks();
    spawnBgStars();
    resetBall();
    rerender();
  }, [buildBricks, resetBall, spawnBgStars, rerender]);

  const addSparkles = (b: Brick) => {
    const count = 18;
    b.sparkles = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const spd = 80 + Math.random() * 180;
      return {
        x: b.x + BRICK_W / 2, y: b.y + BRICK_H / 2,
        vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
        alpha: 1, r: 3 + Math.random() * 5, color: b.color.glow,
      };
    });
  };

  // ── Input ─────────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseTRef.current = (e.clientX - rect.left) * (CW / rect.width);
  }, []);

  const handleClick = useCallback(() => {
    if (phaseRef.current === "idle") { startGame(); return; }
    if (phaseRef.current === "dead") { startGame(); return; }
    if (phaseRef.current === "ready") { launchBall(); return; }
  }, [startGame, launchBall]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseTRef.current = (e.touches[0].clientX - rect.left) * (CW / rect.width);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseTRef.current = (e.touches[0].clientX - rect.left) * (CW / rect.width);
    if (phaseRef.current === "idle") { startGame(); return; }
    if (phaseRef.current === "dead") { startGame(); return; }
    if (phaseRef.current === "ready") { launchBall(); return; }
  }, [startGame, launchBall]);

  // ── Main loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    spawnBgStars();

    const loop = (ts: number) => {
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;
      if (guruQuiz.isPausedRef.current) { rafRef.current = requestAnimationFrame(loop); return; }
      hueRef.current = (hueRef.current + dt * 22) % 360;
      const hue = hueRef.current;

      const phase = phaseRef.current;

      // ── Update paddle ──────────────────────────────────────────────────
      const paddle = paddleRef.current;
      // Button hold: nudge target X smoothly while a control button is pressed.
      if (holdLeftRef.current) mouseTRef.current -= BUTTON_SPEED * dt;
      if (holdRightRef.current) mouseTRef.current += BUTTON_SPEED * dt;
      mouseTRef.current = Math.max(paddle.w / 2, Math.min(CW - paddle.w / 2, mouseTRef.current));
      const targetX = mouseTRef.current;
      paddle.x += (targetX - paddle.x) * Math.min(1, dt * 18);
      if (paddle.powerT > 0) paddle.powerT = Math.max(0, paddle.powerT - dt);

      // ── Timer & update ─────────────────────────────────────────────────
      if (phase === "playing") {
        timerAccRef.current += dt;
        // Track active play time for difficulty escalation
        gameTimeRef.current += dt;
        const targetDifficulty = Math.min(
          DIFFICULTY_LEVELS.length - 1,
          Math.floor(gameTimeRef.current / DIFFICULTY_INTERVAL)
        );
        if (targetDifficulty > difficultyRef.current) {
          difficultyRef.current = targetDifficulty;
          modeBannerRef.current = { idx: targetDifficulty, t: 2.6 };
          shakeRef.current = Math.max(shakeRef.current, 0.6);
          playPopSound();
        }
        if (modeBannerRef.current) {
          modeBannerRef.current.t -= dt;
          if (modeBannerRef.current.t <= 0) modeBannerRef.current = null;
        }
        if (timerAccRef.current >= 1) {
          timerAccRef.current -= 1;
          timerRef.current--;
          if (timerRef.current <= 0) { timerRef.current = 0; phaseRef.current = "dead"; rerender(); }
        }
        if (shakeRef.current > 0) shakeRef.current = Math.max(0, shakeRef.current - dt * 2.5);

        // ── Ball physics ───────────────────────────────────────────────
        const ball = ballRef.current;
        if (ball.launched) {
          const spd = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
          const targetSpd = (BALL_SPEED_BASE + levelRef.current * 18) * DIFFICULTY_LEVELS[difficultyRef.current].mult;
          if (spd < targetSpd * 0.95) {
            ball.vx *= targetSpd / spd;
            ball.vy *= targetSpd / spd;
          }

          ball.x += ball.vx * dt;
          ball.y += ball.vy * dt;

          // wall bounce
          if (ball.x - BALL_R < 0) { ball.x = BALL_R; ball.vx = Math.abs(ball.vx); }
          if (ball.x + BALL_R > CW) { ball.x = CW - BALL_R; ball.vx = -Math.abs(ball.vx); }
          if (ball.y - BALL_R < 0) { ball.y = BALL_R; ball.vy = Math.abs(ball.vy); }

          // ── Fire trail ── spawn flame particles trailing behind the ball
          // Direction *opposite* to motion (so flames stream behind it).
          const speed = Math.hypot(ball.vx, ball.vy);
          if (speed > 1) {
            const dirX = -ball.vx / speed;
            const dirY = -ball.vy / speed;
            // emit 3 fresh flame particles per frame
            for (let k = 0; k < 3; k++) {
              const spread = 0.6;
              const ang = Math.atan2(dirY, dirX) + (Math.random() - 0.5) * spread;
              const sp = 30 + Math.random() * 70;
              const offsetT = k * 0.35; // slight stagger so the tail looks long
              trailRef.current.push({
                x: ball.x + dirX * (BALL_R * 0.6) + (Math.random() - 0.5) * 4,
                y: ball.y + dirY * (BALL_R * 0.6) + (Math.random() - 0.5) * 4,
                vx: Math.cos(ang) * sp + ball.vx * 0.15,
                vy: Math.sin(ang) * sp + ball.vy * 0.15 - 30, // buoyancy: flames rise
                life: 0.55 - offsetT * 0.05,
                maxLife: 0.55 - offsetT * 0.05,
                r: BALL_R * (0.85 + Math.random() * 0.45),
              });
            }
          }
          // hard cap so the array doesn't grow without bound
          if (trailRef.current.length > 220) {
            trailRef.current.splice(0, trailRef.current.length - 220);
          }
          // tick existing flame particles: drift, rise, shrink, cool down
          for (const t of trailRef.current) {
            t.x += t.vx * dt;
            t.y += t.vy * dt;
            t.vy -= 90 * dt;       // continued upward acceleration (heat rises)
            t.vx *= 0.94;          // air drag
            t.life -= dt;
            t.r *= 0.965;          // shrink as it cools
          }
          trailRef.current = trailRef.current.filter(t => t.life > 0 && t.r > 0.5);

          // paddle collision
          const halfW = paddle.w / 2;
          if (
            ball.y + BALL_R >= PADDLE_Y - PADDLE_H / 2 &&
            ball.y + BALL_R <= PADDLE_Y + PADDLE_H / 2 + 4 &&
            ball.x >= paddle.x - halfW - BALL_R &&
            ball.x <= paddle.x + halfW + BALL_R &&
            ball.vy > 0
          ) {
            const rel = (ball.x - paddle.x) / halfW; // -1 to 1
            const angle = rel * (Math.PI / 3);        // ±60°
            const spd2 = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
            ball.vx = Math.sin(angle) * spd2;
            ball.vy = -Math.abs(Math.cos(angle) * spd2);
            ball.y = PADDLE_Y - PADDLE_H / 2 - BALL_R;
            playPopSound();
          }

          // ball lost
          if (ball.y - BALL_R > CH) {
            comboRef.current = 0;
            livesRef.current--;
            shakeRef.current = 0.5;
            floatTextsRef.current.push({ x: CW / 2, y: CH - 80, txt: "💨 Bola Jatuh!", alpha: 1, vy: -60, good: false });
            if (livesRef.current <= 0) {
              phaseRef.current = "dead";
              rerender();
            } else {
              resetBall();
            }
          }

          // ── Brick collisions ─────────────────────────────────────────
          for (const b of bricksRef.current) {
            if (!b.alive) continue;
            const bx = b.x, by = b.y, bw = BRICK_W, bh = BRICK_H;
            // AABB with ball
            const nearX = Math.max(bx, Math.min(ball.x, bx + bw));
            const nearY = Math.max(by, Math.min(ball.y, by + bh));
            const dx = ball.x - nearX, dy = ball.y - nearY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < BALL_R) {
              // determine bounce axis & push ball outside the brick
              const overlapX = ball.x < bx ? ball.x - bx : ball.x > bx + bw ? ball.x - (bx + bw) : 0;
              const overlapY = ball.y < by ? ball.y - by : ball.y > by + bh ? ball.y - (by + bh) : 0;
              if (Math.abs(overlapX) > Math.abs(overlapY)) {
                ball.vx = -ball.vx;
                ball.x += overlapX > 0 ? (BALL_R - Math.abs(dx)) : -(BALL_R - Math.abs(dx));
              } else {
                ball.vy = -ball.vy;
                ball.y += overlapY > 0 ? (BALL_R - Math.abs(dy)) : -(BALL_R - Math.abs(dy));
              }

              // Skip the hit-counter logic if this brick was just hit a moment
              // ago (avoids the ball registering 2 hits across consecutive frames
              // while still inside the brick).
              if (b.hitCooldown > 0) {
                break;
              }

              b.hits++;
              b.hitT = 1;
              b.hitCooldown = 0.18;
              playPopSound();

              if (b.hits < 2) {
                // First hit — brick cracks but stays alive.
                b.cracked = true;
                floatTextsRef.current.push({
                  x: b.x + BRICK_W / 2, y: b.y,
                  txt: "💥", alpha: 1, vy: -70, good: true,
                });
              } else {
                // Second hit — brick opens / breaks.
                comboRef.current++;
                const pts = 10 * comboRef.current * levelRef.current;
                scoreRef.current += pts;
                if (scoreRef.current > bestRef.current) bestRef.current = scoreRef.current;
                addSparkles(b);
                b.alive = false;
                levelRef.current = Math.floor(scoreRef.current / 200) + 1;
                timerRef.current = Math.min(timerRef.current + 2, 90);
                paddle.w = Math.min(PADDLE_W_BASE + 18, 140);
                paddle.powerT = 2.5;
                floatTextsRef.current.push({
                  x: b.x + BRICK_W / 2, y: b.y,
                  txt: `+${pts}${comboRef.current > 1 ? ` 🔥×${comboRef.current}` : ""}`,
                  alpha: 1, vy: -90, good: true,
                });
                // If every brick is cleared, give a bonus and rebuild a fresh wall.
                const remaining = bricksRef.current.filter(br => br.alive).length;
                if (remaining === 0) {
                  scoreRef.current += 200;
                  timerRef.current = Math.min(timerRef.current + 15, 90);
                  floatTextsRef.current.push({
                    x: CW / 2, y: CH / 2,
                    txt: "💎 BONUS LANTAI BERSIH +200!",
                    alpha: 1, vy: -50, good: true,
                  });
                  setTimeout(() => {
                    if (phaseRef.current !== "playing" && phaseRef.current !== "ready") return;
                    buildBricks();
                    rerender();
                  }, 600);
                }
              }
              break;
            }
          }
        } else {
          // ball follows paddle when not launched
          const ball = ballRef.current;
          ball.x = paddle.x;
          ball.y = PADDLE_Y - BALL_R - PADDLE_H / 2 - 2;
        }
      }

      // ── Update bricks ──────────────────────────────────────────────────
      for (const b of bricksRef.current) {
        if (b.hitT > 0) b.hitT = Math.max(0, b.hitT - dt * 3);
        if (b.hitCooldown > 0) b.hitCooldown = Math.max(0, b.hitCooldown - dt);
        for (const s of b.sparkles) {
          s.x += s.vx * dt; s.y += s.vy * dt;
          s.vy += 200 * dt;
          s.alpha -= dt * 2.2;
          s.r *= 0.97;
        }
        b.sparkles = b.sparkles.filter(s => s.alpha > 0);
      }

      // ── Update float texts ─────────────────────────────────────────────
      for (const f of floatTextsRef.current) { f.y += f.vy * dt; f.alpha -= dt * 1.4; }
      floatTextsRef.current = floatTextsRef.current.filter(f => f.alpha > 0);

      // ── Draw ──────────────────────────────────────────────────────────
      const sx = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 12 : 0;
      const sy = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 5 : 0;
      ctx.save();
      ctx.translate(sx, sy);

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, CW, CH);
      bgGrad.addColorStop(0, `hsl(${hue}, 60%, 6%)`);
      bgGrad.addColorStop(0.5, `hsl(${(hue + 70) % 360}, 55%, 8%)`);
      bgGrad.addColorStop(1, `hsl(${(hue + 140) % 360}, 60%, 6%)`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CW, CH);

      // Background stars
      for (const s of bgStarsRef.current) {
        s.t += dt * 1.2;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.t));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Neon grid lines (decorative)
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`;
      ctx.lineWidth = 1;
      for (let x = 0; x < CW; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CH); ctx.stroke();
      }
      for (let y = 0; y < CH; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CW, y); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // HUD bar (compact — no math question, just stats)
      const HUD_H = 44;
      const barGrad = ctx.createLinearGradient(0, 0, CW, 0);
      barGrad.addColorStop(0, "rgba(5,5,20,0.92)");
      barGrad.addColorStop(1, "rgba(10,3,30,0.92)");
      ctx.fillStyle = barGrad;
      ctx.fillRect(0, 0, CW, HUD_H);

      if (phase === "playing" || phase === "ready") {
        ctx.textBaseline = "middle";
        ctx.font = "bold 13px 'Orbitron', monospace";

        ctx.textAlign = "left";
        ctx.fillStyle = "#ffc94a"; ctx.shadowBlur = 10; ctx.shadowColor = "#ffc94a";
        ctx.fillText(`⭐ ${scoreRef.current}`, 10, 18);

        // Center: LEVEL + current difficulty mode
        const diff = DIFFICULTY_LEVELS[difficultyRef.current];
        ctx.textAlign = "center";
        ctx.font = "bold 12px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${(hue + 60) % 360}, 100%, 75%)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsl(${(hue + 60) % 360}, 100%, 60%)`;
        ctx.fillText(`LEVEL ${levelRef.current}`, CW / 2, 11);
        ctx.font = "bold 11px 'Orbitron', monospace";
        ctx.fillStyle = diff.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = diff.glow;
        ctx.fillText(`⚡ ${diff.name}`, CW / 2, 27);

        ctx.textAlign = "right";
        ctx.font = "bold 13px 'Orbitron', monospace";
        ctx.fillStyle = "#ff5e87"; ctx.shadowColor = "#ff5e87";
        ctx.fillText(`❤️ ${"♥".repeat(Math.max(0, livesRef.current))}`, CW - 10, 18);
        ctx.shadowBlur = 0;

        // Timer bar
        const tFrac = Math.max(0, Math.min(1, timerRef.current / 90));
        const tCol = `hsl(${tFrac * 120}, 100%, 55%)`;
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.fillRect(0, HUD_H - 5, CW, 5);
        ctx.fillStyle = tCol; ctx.shadowBlur = 8; ctx.shadowColor = tCol;
        ctx.fillRect(0, HUD_H - 5, CW * tFrac, 5);
        ctx.shadowBlur = 0;

        // Difficulty progress tick on the timer bar (next mode bump position)
        if (difficultyRef.current < DIFFICULTY_LEVELS.length - 1) {
          const nextAt = (difficultyRef.current + 1) * DIFFICULTY_INTERVAL;
          const progress = Math.max(0, Math.min(1,
            (gameTimeRef.current - difficultyRef.current * DIFFICULTY_INTERVAL) / DIFFICULTY_INTERVAL
          ));
          const next = DIFFICULTY_LEVELS[difficultyRef.current + 1];
          ctx.fillStyle = "rgba(255,255,255,0.05)";
          ctx.fillRect(0, HUD_H - 9, CW, 3);
          ctx.fillStyle = next.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = next.glow;
          ctx.fillRect(0, HUD_H - 9, CW * progress, 3);
          ctx.shadowBlur = 0;
          // tiny next-mode label
          ctx.font = "8px 'Orbitron', monospace";
          ctx.fillStyle = "rgba(255,255,255,0.45)";
          ctx.textAlign = "right";
          ctx.fillText(`NEXT: ${next.name} in ${Math.max(0, Math.ceil(nextAt - gameTimeRef.current))}s`, CW - 4, HUD_H - 13);
        }
      }

      // ── Bricks ──────────────────────────────────────────────────────────
      for (const b of bricksRef.current) {
        if (!b.alive && b.sparkles.length === 0) continue;

        // Sparkles (even after brick dies)
        for (const s of b.sparkles) {
          ctx.globalAlpha = Math.max(0, s.alpha);
          ctx.fillStyle = s.color;
          ctx.shadowBlur = 10; ctx.shadowColor = s.color;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;

        if (!b.alive) continue;

        // hit pop scale animation
        const scale = 1 + b.hitT * 0.08;
        const cx2 = b.x + BRICK_W / 2, cy2 = b.y + BRICK_H / 2;

        // Deterministic seeded random for this crystal (stable per cell)
        const seed = (b.col * 73 + b.row * 137 + 19) | 0;
        const rndA = (i: number) => {
          const v = Math.sin(seed * 9301 + i * 49297) * 233280;
          return v - Math.floor(v);
        };

        // ── Build a faceted crystal silhouette ───────────────────────────
        // Hexagonal-ish gem with subtle per-asteroid variation, slow
        // rotation gives a gentle "floating crystal" feel.
        const halfBW = BRICK_W * 0.48;
        const halfBH = BRICK_H * 0.48;
        const rotation = (rndA(3) - 0.5) * 0.6 + Math.sin(ts / 2400 + seed) * 0.04;
        const N = 8;
        const points: { x: number; y: number }[] = [];
        for (let i = 0; i < N; i++) {
          const a = (i / N) * Math.PI * 2 + rotation;
          const jitter = 0.92 + rndA(i + 11) * 0.16;
          points.push({
            x: Math.cos(a) * halfBW * jitter,
            y: Math.sin(a) * halfBH * jitter,
          });
        }

        ctx.save();
        ctx.translate(cx2, cy2);
        ctx.scale(scale, scale);

        // Crystal silhouette path (sharp facet edges — lines, not curves)
        const tracePath = () => {
          ctx.beginPath();
          for (let i = 0; i < points.length; i++) {
            const p = points[i];
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.closePath();
        };

        // ── Outer halo glow (soft colored aura around the gem) ──────────
        ctx.save();
        const haloPulse = 0.85 + 0.15 * Math.sin(ts / 600 + seed);
        const haloR = Math.max(halfBW, halfBH) * 1.55 * haloPulse;
        const halo = ctx.createRadialGradient(0, 0, halfBW * 0.4, 0, 0, haloR);
        halo.addColorStop(0,   hexToRgba(b.color.glow, 0.55));
        halo.addColorStop(0.45, hexToRgba(b.color.glow, 0.20));
        halo.addColorStop(1,   hexToRgba(b.color.glow, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(0, 0, haloR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // ── Drop shadow under the gem ───────────────────────────────────
        ctx.save();
        ctx.shadowBlur = 14 + b.hitT * 16;
        ctx.shadowColor = hexToRgba(b.color.glow, 0.85);
        ctx.shadowOffsetY = 3;

        // Vibrant gem body — bright color with deep saturated core
        const bodyGrad = ctx.createRadialGradient(
          -halfBW * 0.30, -halfBH * 0.45, halfBW * 0.05,
          0, 0, Math.max(halfBW, halfBH) * 1.25
        );
        bodyGrad.addColorStop(0,    "#ffffff");
        bodyGrad.addColorStop(0.18, mixColor("#ffffff", b.color.fill, 0.55));
        bodyGrad.addColorStop(0.55, b.color.fill);
        bodyGrad.addColorStop(1,    mixColor(b.color.fill, "#1a0030", 0.80));
        ctx.fillStyle = bodyGrad;
        tracePath();
        ctx.fill();
        ctx.restore();

        // ── Inner facets (clipped to crystal silhouette) ────────────────
        ctx.save();
        tracePath();
        ctx.clip();

        // Lit facets — connect adjacent vertices to the centre, then fill
        // each triangle with a slight shading variation. This produces the
        // gem-like faceted look.
        for (let i = 0; i < points.length; i++) {
          const p1 = points[i];
          const p2 = points[(i + 1) % points.length];
          const cxF = (p1.x + p2.x) / 3;
          const cyF = (p1.y + p2.y) / 3;
          // Brighter on facets pointing toward the upper-left light
          const dirLight = (-cxF - cyF) / (halfBW + halfBH);
          const lit = Math.max(0, Math.min(1, dirLight * 0.8 + 0.5));

          const facetGrad = ctx.createLinearGradient(0, 0, cxF, cyF);
          facetGrad.addColorStop(0, `rgba(255,255,255,${0.20 * lit})`);
          facetGrad.addColorStop(1, `rgba(0,0,0,${0.18 * (1 - lit)})`);
          ctx.fillStyle = facetGrad;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();
          ctx.fill();

          // Crisp facet edge from center to vertex
          ctx.strokeStyle = `rgba(255,255,255,${0.18 * lit + 0.05})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }

        // Bright specular wedge on the upper-left
        const sparkleGrad = ctx.createRadialGradient(
          -halfBW * 0.45, -halfBH * 0.55, 0,
          -halfBW * 0.45, -halfBH * 0.55, halfBW * 0.85
        );
        sparkleGrad.addColorStop(0,   "rgba(255,255,255,0.85)");
        sparkleGrad.addColorStop(0.45, "rgba(255,255,255,0.20)");
        sparkleGrad.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = sparkleGrad;
        ctx.fillRect(-BRICK_W, -BRICK_H, BRICK_W * 2, BRICK_H * 2);

        // Twinkling 4-point sparkle stars on the surface
        const twinkleT = ts / 1000;
        const sparkles: [number, number, number, number][] = [
          [-halfBW * 0.40, -halfBH * 0.45, 0.0, 1.6],
          [ halfBW * 0.30, -halfBH * 0.15, 1.3, 1.0],
          [-halfBW * 0.10,  halfBH * 0.30, 2.1, 1.2],
        ];
        for (const [sx, sy, phase2, sz] of sparkles) {
          const a = 0.55 + 0.45 * Math.sin(twinkleT * 3 + phase2 + seed * 0.1);
          if (a < 0.05) continue;
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.beginPath();
          ctx.moveTo(0, -sz * 2.2);
          ctx.lineTo(sz * 0.5, 0);
          ctx.lineTo(0, sz * 2.2);
          ctx.lineTo(-sz * 0.5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-sz * 2.2, 0);
          ctx.lineTo(0, sz * 0.5);
          ctx.lineTo(sz * 2.2, 0);
          ctx.lineTo(0, -sz * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // ── Cracked overlay after first hit ─────────────────────────────
        // Inner light leaks out as a brighter, prismatic glow.
        if (b.cracked) {
          ctx.save();
          ctx.shadowBlur = 14;
          ctx.shadowColor = hexToRgba(b.color.glow, 0.95);

          ctx.strokeStyle = "rgba(255,255,255,0.85)";
          ctx.lineWidth = 1.1;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(-halfBW * 0.55, -halfBH * 0.40);
          ctx.lineTo(-halfBW * 0.20, -halfBH * 0.10);
          ctx.lineTo( halfBW * 0.05,  halfBH * 0.10);
          ctx.lineTo(-halfBW * 0.20,  halfBH * 0.45);
          ctx.lineTo( halfBW * 0.10,  halfBH * 0.65);
          ctx.moveTo( halfBW * 0.05,  halfBH * 0.10);
          ctx.lineTo( halfBW * 0.35, -halfBH * 0.05);
          ctx.lineTo( halfBW * 0.60,  halfBH * 0.35);
          ctx.stroke();

          // Bright spark at each crack junction
          ctx.fillStyle = "rgba(255,255,255,0.95)";
          ctx.beginPath();
          ctx.arc( halfBW * 0.05, halfBH * 0.10, 1.6, 0, Math.PI * 2);
          ctx.arc(-halfBW * 0.20, -halfBH * 0.10, 1.2, 0, Math.PI * 2);
          ctx.arc( halfBW * 0.35, -halfBH * 0.05, 1.0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();

        // ── Crisp colored facet outline ─────────────────────────────────
        ctx.strokeStyle = mixColor(b.color.fill, "#ffffff", 0.55);
        ctx.lineWidth = 1.1;
        ctx.shadowBlur = 8;
        ctx.shadowColor = hexToRgba(b.color.glow, 0.9);
        tracePath();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // ── Fire trail ───────────────────────────────────────────────────────
      // Use additive blending so overlapping flames build to white-hot cores.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const t of trailRef.current) {
        // ratio: 1 = freshly spawned (hot), 0 = about to die (cool smoke)
        const ratio = Math.max(0, Math.min(1, t.life / t.maxLife));

        // Compute flame color (r,g,b) by interpolating along a hot→cool ramp:
        //   ratio 1.00 → white-hot         (255, 250, 210)
        //   ratio 0.70 → bright yellow     (255, 220,  80)
        //   ratio 0.45 → vivid orange      (255, 130,   0)
        //   ratio 0.20 → deep red          (220,  30,   0)
        //   ratio 0.00 → dark smoke        ( 30,  15,  10)
        let r: number, g: number, b: number;
        if (ratio > 0.7) {
          const k = (ratio - 0.7) / 0.3;       // 0..1 from yellow → white
          r = 255;
          g = Math.round(220 + 30 * k);
          b = Math.round(80 + 130 * k);
        } else if (ratio > 0.45) {
          const k = (ratio - 0.45) / 0.25;     // orange → yellow
          r = 255;
          g = Math.round(130 + 90 * k);
          b = Math.round(0 + 80 * k);
        } else if (ratio > 0.2) {
          const k = (ratio - 0.2) / 0.25;      // red → orange
          r = Math.round(220 + 35 * k);
          g = Math.round(30 + 100 * k);
          b = 0;
        } else {
          const k = ratio / 0.2;               // smoke → red
          r = Math.round(30 + 190 * k);
          g = Math.round(15 + 15 * k);
          b = Math.round(10 - 10 * k);
        }

        // Soft glow halo per particle
        const glowR = t.r * (1.2 + ratio * 0.7);
        const coreA = Math.min(1, ratio * 1.1 + 0.05);
        const midA = coreA * 0.55;
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, glowR);
        grad.addColorStop(0,    `rgba(${r},${g},${b},${coreA})`);
        grad.addColorStop(0.45, `rgba(${r},${g},${b},${midA})`);
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, glowR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // ── Ball (burning fireball) ───────────────────────────────────────
      if (phase === "playing" || phase === "ready") {
        const ball = ballRef.current;

        // Soft warm contact shadow on the floor (under the ball)
        ctx.save();
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = "rgba(40,0,0,0.6)";
        ctx.beginPath();
        ctx.ellipse(ball.x, ball.y + BALL_R + 1, BALL_R * 0.9, BALL_R * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Outer flickering aura (additive) — uses time for shimmer
        const tSec = ts / 1000;
        const flicker = 0.85 + Math.sin(tSec * 22) * 0.08 + Math.sin(tSec * 47) * 0.06;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const auraR = BALL_R * (2.4 * flicker);
        const aura = ctx.createRadialGradient(ball.x, ball.y, BALL_R * 0.4, ball.x, ball.y, auraR);
        aura.addColorStop(0,   "rgba(255,230,140,0.85)");
        aura.addColorStop(0.35, "rgba(255,140,30,0.55)");
        aura.addColorStop(0.7, "rgba(255,60,0,0.25)");
        aura.addColorStop(1,   "rgba(255,40,0,0)");
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, auraR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Drop-shadow glow under the sphere
        ctx.shadowBlur = 28;
        ctx.shadowColor = "rgba(255,140,30,0.95)";

        // Meteor body — molten rocky core wrapped in fire
        const ballGrad = ctx.createRadialGradient(
          ball.x - BALL_R * 0.25, ball.y - BALL_R * 0.25, BALL_R * 0.05,
          ball.x, ball.y, BALL_R
        );
        ballGrad.addColorStop(0,    "#fffbe8");
        ballGrad.addColorStop(0.20, "#ffd06a");
        ballGrad.addColorStop(0.45, "#ff8a30");
        ballGrad.addColorStop(0.72, "#c43108");
        ballGrad.addColorStop(1,    "#3a0a02");  // dark rocky rim
        ctx.fillStyle = ballGrad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Rocky surface specks — small dark spots embedded in the meteor
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = "rgba(20,5,0,0.55)";
        const speckPositions: [number, number, number][] = [
          [0.20, 0.10, 1.4],
          [-0.15, 0.35, 1.2],
          [0.40, -0.20, 1.0],
          [-0.30, -0.10, 0.9],
          [0.10, 0.45, 0.8],
        ];
        for (const [dx, dy, sr] of speckPositions) {
          ctx.beginPath();
          ctx.arc(ball.x + BALL_R * dx, ball.y + BALL_R * dy, sr, 0, Math.PI * 2);
          ctx.fill();
        }
        // Faint glowing fissures on the surface
        ctx.strokeStyle = "rgba(255,180,60,0.55)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(ball.x - BALL_R * 0.55, ball.y + BALL_R * 0.05);
        ctx.lineTo(ball.x - BALL_R * 0.10, ball.y + BALL_R * 0.30);
        ctx.lineTo(ball.x + BALL_R * 0.30, ball.y + BALL_R * 0.55);
        ctx.stroke();
        ctx.restore();

        // White-hot specular spot
        ctx.fillStyle = "rgba(255,255,240,0.9)";
        ctx.beginPath();
        ctx.ellipse(ball.x - BALL_R * 0.35, ball.y - BALL_R * 0.4, BALL_R * 0.28, BALL_R * 0.2, -0.5, 0, Math.PI * 2);
        ctx.fill();

        // Tiny bright pinpoint
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.arc(ball.x - BALL_R * 0.45, ball.y - BALL_R * 0.5, BALL_R * 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Bottom rim ember glow (ambient bounce light)
        ctx.strokeStyle = "rgba(255,180,60,0.6)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_R - 0.5, Math.PI * 0.15, Math.PI * 0.85);
        ctx.stroke();
      }

      // ── Paddle (sleek spaceship / alat luar angkasa) ──────────────────
      if (phase === "playing" || phase === "ready") {
        const paddle = paddleRef.current;
        const isPowered = paddle.powerT > 0;
        const pHue = isPowered ? (hue + 40) % 360 : 195; // cyan ship by default, shifts when powered
        const cxS = paddle.x;
        const cyS = PADDLE_Y;
        const halfW = paddle.w / 2;
        const noseY = cyS - PADDLE_H / 2 - 7;   // pointed bow extends above
        const tailY = cyS + PADDLE_H / 2;       // engines exit at tail
        const wingY = cyS + 1;

        // ── Hover shadow under the ship ────────────────────────────────
        ctx.save();
        ctx.globalAlpha = 0.32;
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.beginPath();
        ctx.ellipse(cxS, tailY + 5, halfW * 0.95, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // ── Twin engine thruster flames ─────────────────────────────────
        const fT = ts / 1000;
        const flameLen = 11 + Math.sin(fT * 14) * 2.5 + (isPowered ? 7 : 0);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        for (const offX of [-halfW * 0.45, halfW * 0.45]) {
          const fx = cxS + offX;
          const fy = tailY + flameLen * 0.45;
          const grd = ctx.createRadialGradient(fx, fy, 0, fx, fy, flameLen);
          grd.addColorStop(0,   "rgba(255,255,220,0.95)");
          grd.addColorStop(0.35, `hsla(${pHue}, 100%, 70%, 0.75)`);
          grd.addColorStop(1,   `hsla(${pHue}, 100%, 50%, 0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.ellipse(fx, fy, 4.2, flameLen, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Helper: trace the spaceship hull silhouette
        const traceShip = () => {
          ctx.beginPath();
          ctx.moveTo(cxS, noseY);
          ctx.quadraticCurveTo(cxS + halfW * 0.42, noseY + 4, cxS + halfW * 0.55, wingY);
          ctx.lineTo(cxS + halfW, wingY + 2);                   // right wing tip
          ctx.lineTo(cxS + halfW * 0.92, tailY);
          ctx.lineTo(cxS + halfW * 0.55, tailY);                // right engine block
          ctx.lineTo(cxS + halfW * 0.35, tailY - 1);
          ctx.lineTo(cxS - halfW * 0.35, tailY - 1);
          ctx.lineTo(cxS - halfW * 0.55, tailY);                // left engine block
          ctx.lineTo(cxS - halfW * 0.92, tailY);
          ctx.lineTo(cxS - halfW, wingY + 2);                   // left wing tip
          ctx.lineTo(cxS - halfW * 0.55, wingY);
          ctx.quadraticCurveTo(cxS - halfW * 0.42, noseY + 4, cxS, noseY);
          ctx.closePath();
        };

        // ── Hull glow ───────────────────────────────────────────────────
        ctx.shadowBlur = isPowered ? 26 : 14;
        ctx.shadowColor = `hsl(${pHue}, 100%, 60%)`;

        // Hull body — chrome blue/cyan with vertical gradient
        const hullGrad = ctx.createLinearGradient(0, noseY, 0, tailY);
        hullGrad.addColorStop(0,    `hsl(${pHue}, 50%, 92%)`);
        hullGrad.addColorStop(0.35, `hsl(${pHue}, 70%, 65%)`);
        hullGrad.addColorStop(0.7,  `hsl(${pHue}, 80%, 38%)`);
        hullGrad.addColorStop(1,    `hsl(${pHue}, 85%, 22%)`);
        ctx.fillStyle = hullGrad;
        traceShip();
        ctx.fill();
        ctx.shadowBlur = 0;

        // ── Side darkening (volumetric edge falloff) ───────────────────
        ctx.save();
        traceShip();
        ctx.clip();
        const sideGrad = ctx.createLinearGradient(cxS - halfW, 0, cxS + halfW, 0);
        sideGrad.addColorStop(0,    "rgba(0,0,0,0.45)");
        sideGrad.addColorStop(0.18, "rgba(0,0,0,0)");
        sideGrad.addColorStop(0.82, "rgba(0,0,0,0)");
        sideGrad.addColorStop(1,    "rgba(0,0,0,0.45)");
        ctx.fillStyle = sideGrad;
        ctx.fillRect(cxS - halfW - 4, noseY - 4, paddle.w + 8, (tailY - noseY) + 8);

        // Centerline highlight strip down the spine
        const spineGrad = ctx.createLinearGradient(0, noseY, 0, tailY);
        spineGrad.addColorStop(0, "rgba(255,255,255,0.85)");
        spineGrad.addColorStop(0.6, "rgba(255,255,255,0.15)");
        spineGrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = spineGrad;
        ctx.beginPath();
        ctx.moveTo(cxS, noseY);
        ctx.quadraticCurveTo(cxS + 3.5, cyS, cxS + 1.5, tailY - 1);
        ctx.lineTo(cxS - 1.5, tailY - 1);
        ctx.quadraticCurveTo(cxS - 3.5, cyS, cxS, noseY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // ── Cockpit dome (glowing canopy) ──────────────────────────────
        const cockpitR = PADDLE_H * 0.7;
        const ckGrad = ctx.createRadialGradient(cxS - 1.5, cyS - 2, 1, cxS, cyS - 1, cockpitR);
        ckGrad.addColorStop(0,   "rgba(230,255,255,0.95)");
        ckGrad.addColorStop(0.45, `hsla(${(pHue + 25) % 360}, 100%, 75%, 0.85)`);
        ckGrad.addColorStop(1,   `hsla(${pHue}, 100%, 28%, 0.95)`);
        ctx.fillStyle = ckGrad;
        ctx.beginPath();
        ctx.ellipse(cxS, cyS - 1, cockpitR * 0.85, cockpitR * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
        // Cockpit reflection glint
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.ellipse(cxS - cockpitR * 0.35, cyS - cockpitR * 0.35, cockpitR * 0.18, cockpitR * 0.1, -0.5, 0, Math.PI * 2);
        ctx.fill();

        // ── Wing tip navigation lights (blink red ⇄ green) ─────────────
        const blink = (Math.sin(ts / 200) + 1) * 0.5;
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(255,40,40,0.95)";
        ctx.fillStyle = `rgba(255,90,90,${0.45 + blink * 0.55})`;
        ctx.beginPath();
        ctx.arc(cxS - halfW + 2, wingY + 2, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "rgba(40,255,80,0.95)";
        ctx.fillStyle = `rgba(120,255,140,${0.45 + (1 - blink) * 0.55})`;
        ctx.beginPath();
        ctx.arc(cxS + halfW - 2, wingY + 2, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // ── Hull outline ───────────────────────────────────────────────
        ctx.strokeStyle = `hsla(${pHue}, 90%, 14%, 0.85)`;
        ctx.lineWidth = 1;
        traceShip();
        ctx.stroke();
      }

      // ── Float texts ─────────────────────────────────────────────────────
      for (const f of floatTextsRef.current) {
        ctx.globalAlpha = Math.max(0, f.alpha);
        ctx.font = "bold 18px 'Orbitron', monospace";
        ctx.textAlign = "center";
        ctx.shadowBlur = 14;
        ctx.shadowColor = f.good ? "#72f572" : "#ff5e87";
        ctx.fillStyle = f.good ? "#72f572" : "#ff5555";
        ctx.fillText(f.txt, f.x, f.y);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // ── Mode-change banner (Normal → Hard → Very Hard) ──────────────────
      if (modeBannerRef.current) {
        const mb = modeBannerRef.current;
        const m = DIFFICULTY_LEVELS[mb.idx];
        // Animate: slide-in (first 0.3s) → hold → fade-out (last 0.6s)
        const totalT = 2.6;
        const elapsed = totalT - mb.t;
        const slideIn = Math.min(1, elapsed / 0.3);
        const fadeOut = Math.min(1, mb.t / 0.6);
        const a = Math.min(slideIn, fadeOut);
        const yC = CH / 2 - 30;

        ctx.save();
        ctx.globalAlpha = a;
        // Backdrop band
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, yC - 60, CW, 120);
        // Color top/bottom strip
        ctx.fillStyle = m.color;
        ctx.shadowBlur = 18; ctx.shadowColor = m.glow;
        ctx.fillRect(0, yC - 60, CW, 3);
        ctx.fillRect(0, yC + 57, CW, 3);

        // Subtitle
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 12px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.shadowBlur = 8; ctx.shadowColor = m.glow;
        ctx.fillText("⚡ MODE BARU ⚡", CW / 2, yC - 28);

        // Big mode name with pulsing glow
        const pulse = 1 + 0.06 * Math.sin(ts / 90);
        ctx.font = `bold ${Math.round(34 * pulse)}px 'Orbitron', monospace`;
        ctx.fillStyle = m.color;
        ctx.shadowBlur = 28; ctx.shadowColor = m.glow;
        ctx.fillText(m.name, CW / 2, yC + 4);

        // Speed multiplier callout
        ctx.font = "bold 12px 'Orbitron', monospace";
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 6; ctx.shadowColor = m.glow;
        ctx.fillText(`KECEPATAN ×${m.mult.toFixed(2)}`, CW / 2, yC + 38);
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // ── Ready hint ──────────────────────────────────────────────────────
      if (phase === "ready") {
        const pulse = 0.75 + 0.25 * Math.sin(ts / 350);
        ctx.globalAlpha = pulse;
        ctx.font = "bold 14px 'Orbitron', monospace";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
        ctx.shadowBlur = 16; ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.fillText("[ KLIK / TAP UNTUK LEMPAR BOLA ]", CW / 2, PADDLE_Y - 30);
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      }

      // ── Idle overlay ──────────────────────────────────────────────────────
      if (phase === "idle") {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";

        ctx.font = "bold 11px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${hue}, 100%, 75%)`;
        ctx.shadowBlur = 14; ctx.shadowColor = `hsl(${hue}, 100%, 55%)`;
        ctx.fillText("MATH ARENA × NUMATIK AI", CW / 2, CH / 2 - 130);

        ctx.font = "bold 24px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${(hue + 60) % 360}, 100%, 80%)`;
        ctx.shadowBlur = 32; ctx.shadowColor = `hsl(${(hue + 60) % 360}, 100%, 60%)`;
        ctx.fillText("☄️ METEOR PANTUL NUMATIK", CW / 2, CH / 2 - 72);

        ctx.font = "13px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.shadowBlur = 0;
        [
          "Kemudikan pesawat dengan mouse / sentuhan!",
          "Pantulkan meteor untuk hancurkan asteroid 🌑",
          "Setiap asteroid pecah setelah 2× kena meteor",
          "Tiap 25 detik muncul Soal NUMATIK 🤖",
          "Tiap 60 detik: NORMAL → HARD → VERY HARD ⚡",
          "Combo = poin berlipat! 🔥",
        ].forEach((l, i) => ctx.fillText(l, CW / 2, CH / 2 - 8 + i * 20));

        ctx.font = "bold 17px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
        ctx.shadowBlur = 20; ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        const pulse = 0.82 + 0.18 * Math.sin(ts / 310);
        ctx.globalAlpha = pulse;
        ctx.fillText("[ KLIK UNTUK MULAI ]", CW / 2, CH / 2 + 108);
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      }

      // ── Dead overlay ──────────────────────────────────────────────────────
      if (phase === "dead") {
        ctx.fillStyle = "rgba(0,0,0,0.68)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";

        ctx.font = "bold 32px 'Orbitron', monospace";
        ctx.fillStyle = "#ff5e87"; ctx.shadowBlur = 30; ctx.shadowColor = "#ff5e87";
        ctx.fillText("GAME OVER", CW / 2, CH / 2 - 90);

        ctx.font = "bold 20px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a"; ctx.shadowColor = "#ffc94a"; ctx.shadowBlur = 16;
        ctx.fillText(`Skor: ${scoreRef.current}`, CW / 2, CH / 2 - 38);

        ctx.font = "bold 16px 'Orbitron', monospace";
        ctx.fillStyle = "#72f572"; ctx.shadowColor = "#72f572"; ctx.shadowBlur = 12;
        ctx.fillText(`Rekor: ${bestRef.current}`, CW / 2, CH / 2 + 4);

        ctx.font = "13px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.shadowBlur = 0;
        ctx.fillText("Kamu luar biasa! Terus berlatih! 🌟", CW / 2, CH / 2 + 44);

        ctx.font = "bold 15px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
        ctx.shadowBlur = 18; ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        const p2 = 0.82 + 0.18 * Math.sin(ts / 310);
        ctx.globalAlpha = p2;
        ctx.fillText("[ KLIK UNTUK MAIN LAGI ]", CW / 2, CH / 2 + 95);
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [buildBricks, resetBall, spawnBgStars, rerender]);

  const isIdle = phaseRef.current === "idle";

  return (
    <div className={`relative flex flex-col items-center overflow-hidden ${isLight ? "gradient-snow" : "gradient-space"}`} style={{ height: '100dvh' }}>
      {/* ── IDLE SCREEN ── */}
      {isIdle && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <style>{`
            @keyframes mp-floatA  { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
            @keyframes mp-floatB  { 0%,100%{transform:translateY(-5px)} 50%{transform:translateY(7px)} }
            @keyframes mp-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            @keyframes mp-bounce  { 0%,100%{transform:translateY(0) scale(1)} 40%{transform:translateY(-14px) scale(1.07)} 60%{transform:translateY(-10px) scale(1.04)} }
            @keyframes mp-pulse   { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
            @keyframes mp-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
            @keyframes mp-scanY   { 0%{transform:translateY(-120%)} 100%{transform:translateY(220%)} }
            @keyframes mp-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
            @keyframes mp-crack   { 0%,80%{opacity:0} 85%,100%{opacity:1} }
            @keyframes mp-rimSpin { from{stroke-dashoffset:0} to{stroke-dashoffset:-60} }
            .mp-fa  { animation:mp-floatA 3.2s ease-in-out infinite }
            .mp-fb  { animation:mp-floatB 3.8s ease-in-out infinite }
            .mp-bou { animation:mp-bounce 1.6s ease-in-out infinite }
            .mp-pul { animation:mp-pulse  2.4s ease-in-out infinite }
            .mp-title-shine { background:linear-gradient(90deg,#fb923c,#f97316,#a855f7,#ec4899,#fb923c,#f97316);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:mp-shimmer 3.5s linear infinite }
            .mp-btn { animation:mp-breathe 2.8s ease-in-out infinite }
            .mp-scroll { height:100%;overflow-y:auto;scrollbar-width:none;display:flex;flex-direction:column }
            .mp-wrap  { flex:1;display:flex;flex-direction:column;justify-content:space-evenly;padding:0.5rem 1rem;width:100% }
            .mp-main  { display:flex;flex-direction:column;gap:0.75rem }
            .mp-left  { display:flex;flex-direction:column;gap:0.5rem }
            .mp-right { display:flex;flex-direction:column;gap:0.5rem }
            @media(orientation:landscape){
              .mp-wrap  { justify-content:space-evenly;padding:0.35rem 1.75rem;max-width:860px;margin:0 auto;width:100% }
              .mp-main  { flex-direction:row;align-items:stretch;gap:2rem }
              .mp-left  { flex:1;justify-content:center;gap:0.6rem }
              .mp-right { flex:1;justify-content:center;gap:0.6rem }
            }
          `}</style>

          {/* Deep space background — warm purple/orange */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 15%, rgba(80,20,120,1) 0%, rgba(10,2,30,1) 60%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 10% 55%, rgba(250,100,0,0.12) 0%, transparent 55%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 90% 30%, rgba(168,85,247,0.12) 0%, transparent 55%)" }} />
          <div className="absolute inset-x-0 h-[1px] pointer-events-none" style={{ background: "linear-gradient(to right,transparent,rgba(251,146,60,0.3),transparent)", animation: "mp-scanY 6s linear infinite" }} />

          <div className="mp-scroll relative z-10">
            <div className="mp-wrap">

              {/* ── HEADER ── */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-between w-full mb-1">
                  <button onClick={() => { playPopSound(); resolvedBackPath ? navigate(resolvedBackPath) : navigate(-1); }}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-display font-bold text-xs shadow-[0_0_15px_rgba(251,146,60,0.5)] hover:opacity-90 transition-opacity cursor-pointer">
                    <span className="text-base leading-none">←</span><span>Kembali</span>
                  </button>
                  <div className="text-[7px] tracking-[5px] text-orange-400/60 uppercase font-bold">⬡ MATH GAME ARENA ⬡</div>
                  <button onClick={() => { playPopSound(); navigate(resolvedHomePath); }}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-display font-bold text-xs shadow-[0_0_15px_rgba(251,146,60,0.5)] hover:opacity-90 transition-opacity cursor-pointer">
                    <span className="text-base leading-none">🏠</span><span>Home</span>
                  </button>
                </div>
                <div className="mp-title-shine font-display font-black leading-none" style={{ fontSize: "clamp(1.4rem,4.5vw,2rem)" }}>METEOR PANTUL NUMATIK</div>
                <div className="mx-auto mt-0.5 h-0.5 w-36 rounded-full" style={{ background: "linear-gradient(to right,transparent,#fb923c,#a855f7,transparent)" }} />
                <p className="text-orange-300/60 text-[8px] tracking-widest uppercase mt-0.5">☄️ Pantul · Hancur · Skor ☄️</p>
                {topicLabel && <p className="text-purple-300/70 text-[9px] tracking-wider mt-0.5 font-bold">✦ {topicLabel} ✦</p>}
                {bestRef.current > 0 && <p className="text-yellow-300/80 text-[8px] font-bold mt-0.5">🏆 Rekor Tertinggi: {bestRef.current}</p>}
              </div>

              {/* ── MAIN BODY ── */}
              <div className="mp-main">

                {/* ── LEFT — game objects visual ── */}
                <div className="mp-left">

                  {/* UFO + VS + Bricks */}
                  <div className="flex items-center justify-center gap-3 w-full">

                    {/* Player UFO paddle */}
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="text-[7px] text-orange-300/70 font-bold tracking-wider uppercase">PESAWATMU</div>
                      <div className="relative">
                        <div className="absolute inset-0 pointer-events-none rounded-full" style={{ background:"radial-gradient(circle,rgba(251,146,60,0.25) 0%,transparent 70%)", transform:"scale(2.2)" }} />
                        <svg viewBox="0 0 80 52" className="mp-fa relative z-10" style={{ width:72, filter:"drop-shadow(0 0 8px #fb923c) drop-shadow(0 0 20px #a855f7)" }}>
                          <defs>
                            <radialGradient id="mp-ufo-dome" cx="40%" cy="30%" r="60%">
                              <stop offset="0%" stopColor="rgba(220,200,255,0.98)"/>
                              <stop offset="50%" stopColor="rgba(180,140,255,0.8)"/>
                              <stop offset="100%" stopColor="#7c3aed99"/>
                            </radialGradient>
                            <linearGradient id="mp-ufo-disc" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f97316"/>
                              <stop offset="40%" stopColor="#fb923c"/>
                              <stop offset="100%" stopColor="#c2410c"/>
                            </linearGradient>
                            <radialGradient id="mp-ufo-glow" cx="50%" cy="100%" r="50%">
                              <stop offset="0%" stopColor="rgba(251,146,60,0.7)"/>
                              <stop offset="100%" stopColor="rgba(251,146,60,0)"/>
                            </radialGradient>
                          </defs>
                          {/* Antenna */}
                          <line x1="40" y1="10" x2="40" y2="2" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="40" cy="1.5" r="2.5" fill="#fbbf24"/>
                          <circle cx="40" cy="1.5" r="1.2" fill="white"/>
                          {/* Dome */}
                          <path d="M24,22 Q40,4 56,22 Z" fill="url(#mp-ufo-dome)" stroke="rgba(200,180,255,0.4)" strokeWidth="0.8"/>
                          <ellipse cx="35" cy="16" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.5)" transform="rotate(-20,35,16)"/>
                          {/* Main disc body */}
                          <ellipse cx="40" cy="28" rx="36" ry="11" fill="url(#mp-ufo-disc)" stroke="#c2410c55" strokeWidth="0.8"/>
                          {/* Rim ring */}
                          <ellipse cx="40" cy="28" rx="37" ry="7" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6 3"/>
                          {/* Rim lights */}
                          {[0,1,2,3,4,5,6].map(i => {
                            const a = (i/7)*Math.PI*2;
                            const cols=["#ff6b6b","#fbbf24","#4ade80","#60a5fa","#c084fc","#fb923c","#f472b6"];
                            return <circle key={i} cx={40+Math.cos(a)*32} cy={28+Math.sin(a)*6.5} r="3" fill={cols[i]} style={{filter:`drop-shadow(0 0 3px ${cols[i]})`}}/>;
                          })}
                          {/* Undercarriage glow */}
                          <ellipse cx="40" cy="36" rx="22" ry="6" fill="url(#mp-ufo-glow)"/>
                          {/* Landing feet */}
                          <line x1="25" y1="36" x2="22" y2="44" stroke="#fb923c" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="22" cy="45" r="2.5" fill="#fbbf24"/>
                          <line x1="40" y1="37" x2="40" y2="46" stroke="#fb923c" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="40" cy="47" r="2.5" fill="#fbbf24"/>
                          <line x1="55" y1="36" x2="58" y2="44" stroke="#fb923c" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="58" cy="45" r="2.5" fill="#fbbf24"/>
                          {/* Thruster jets */}
                          <ellipse cx="28" cy="39" rx="3" ry="5" fill="rgba(255,200,50,0.5)" style={{filter:"blur(1px)"}}/>
                          <ellipse cx="52" cy="39" rx="3" ry="5" fill="rgba(255,200,50,0.5)" style={{filter:"blur(1px)"}}/>
                        </svg>
                      </div>
                      <div className="w-1.5 h-4 rounded-full" style={{ background:"linear-gradient(to bottom,rgba(251,146,60,0.8),transparent)" }} />
                      <div className="text-[8px] font-bold text-orange-400">KAMU</div>
                    </div>

                    {/* Meteor bouncing ball */}
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="text-[7px] text-amber-300/70 font-bold tracking-wider uppercase">METEOR</div>
                      <div className="mp-bou" style={{ filter:"drop-shadow(0 0 10px #f97316) drop-shadow(0 0 22px #ef4444)" }}>
                        <svg viewBox="0 0 54 54" style={{ width:50 }}>
                          <defs>
                            <radialGradient id="mp-meteor-body" cx="35%" cy="30%" r="65%">
                              <stop offset="0%" stopColor="#fef08a"/>
                              <stop offset="30%" stopColor="#fb923c"/>
                              <stop offset="70%" stopColor="#ef4444"/>
                              <stop offset="100%" stopColor="#7f1d1d"/>
                            </radialGradient>
                            <radialGradient id="mp-meteor-corona" cx="50%" cy="50%" r="50%">
                              <stop offset="60%" stopColor="rgba(251,146,60,0)"/>
                              <stop offset="100%" stopColor="rgba(251,146,60,0.45)"/>
                            </radialGradient>
                          </defs>
                          {/* Corona glow */}
                          <circle cx="27" cy="27" r="26" fill="url(#mp-meteor-corona)"/>
                          {/* Flame spikes around */}
                          {[30,75,120,165,210,255,300,345].map((deg,i) => {
                            const r1=19, r2=26+i%3*3, rad=deg*Math.PI/180;
                            return <line key={deg} x1={27+Math.cos(rad)*r1} y1={27+Math.sin(rad)*r1} x2={27+Math.cos(rad)*r2} y2={27+Math.sin(rad)*r2} stroke={i%2===0?"#fbbf24":"#f97316"} strokeWidth={i%3===0?2:1.2} strokeLinecap="round" opacity="0.8"/>;
                          })}
                          {/* Main body */}
                          <circle cx="27" cy="27" r="18" fill="url(#mp-meteor-body)"/>
                          {/* Cute face — left winking eye */}
                          <path d="M20,22 Q22,20 24,22" stroke="#7f1d1d" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                          {/* Right eye open & happy */}
                          <ellipse cx="34" cy="22" rx="3" ry="3.5" fill="#7f1d1d"/>
                          <ellipse cx="33" cy="21" rx="1.2" ry="1.2" fill="rgba(255,255,255,0.6)"/>
                          {/* Big cute smile */}
                          <path d="M19,30 Q27,38 35,30" stroke="#7f1d1d" strokeWidth="2" fill="none" strokeLinecap="round"/>
                          {/* Little rosy cheeks */}
                          <ellipse cx="18" cy="28" rx="3.5" ry="2.5" fill="rgba(255,100,100,0.4)"/>
                          <ellipse cx="36" cy="28" rx="3.5" ry="2.5" fill="rgba(255,100,100,0.4)"/>
                          {/* Shine highlight */}
                          <ellipse cx="21" cy="20" rx="4" ry="2.5" fill="rgba(255,255,255,0.45)" transform="rotate(-25,21,20)"/>
                          {/* Little horns */}
                          <path d="M17,12 L14,5 L20,10 Z" fill="#f97316" stroke="#ef4444" strokeWidth="0.5"/>
                          <path d="M37,12 L40,5 L34,10 Z" fill="#f97316" stroke="#ef4444" strokeWidth="0.5"/>
                        </svg>
                      </div>
                      <div className="text-[8px] font-bold text-amber-400">☄️ BOLA API</div>
                    </div>

                    <div className="flex flex-col items-center shrink-0">
                      <div className="text-lg font-black text-white/20">VS</div>
                    </div>

                    {/* Asteroid bricks grid */}
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="text-[7px] text-white/40 font-bold tracking-wider uppercase mb-0.5">ASTEROID</div>
                      <div className="flex flex-col gap-1">
                        {[
                          { color:"#ff5e87", glow:"#ff5e87", label:"PINK",  crack:false },
                          { color:"#ff9040", glow:"#ff9040", label:"ORANYE",crack:true  },
                          { color:"#ffc94a", glow:"#ffc94a", label:"KUNING",crack:false },
                          { color:"#72f572", glow:"#72f572", label:"HIJAU", crack:true  },
                          { color:"#5ec8ff", glow:"#5ec8ff", label:"BIRU",  crack:false },
                        ].map((row,ri) => (
                          <div key={ri} className="flex gap-1 mp-fb" style={{ animationDelay:`${ri*0.3}s` }}>
                            {[0,1,2].map(ci => (
                              <div key={ci} className="relative rounded flex items-center justify-center"
                                style={{ width:24,height:12, background:row.color+"22", border:`1px solid ${row.color}66`, boxShadow:`0 0 6px ${row.glow}44` }}>
                                <div className="w-full h-full rounded" style={{ background:`linear-gradient(135deg,${row.color}88 0%,${row.color}33 100%)` }}/>
                                {/* Crack on some bricks */}
                                {row.crack && ci===1 && (
                                  <svg viewBox="0 0 24 12" className="absolute inset-0 w-full h-full">
                                    <path d="M11,1 L9,5 L13,6 L10,11" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="text-[6px] font-bold text-white/30 mt-0.5">2× untuk hancur</div>
                    </div>

                  </div>

                  {/* Difficulty badges row */}
                  <div>
                    <div className="w-full h-px my-1" style={{ background:"linear-gradient(to right,transparent,rgba(168,85,247,0.3),transparent)" }} />
                    <div className="text-[7px] text-white/35 tracking-widest uppercase mb-1.5 font-bold text-center">⚡ Tingkat Kesulitan</div>
                    <div className="grid grid-cols-3 gap-1.5 w-full">
                      {[
                        { label:"NORMAL",    color:"#5eead4", icon:"🌱", desc:"60 detik" },
                        { label:"HARD",      color:"#fbbf24", icon:"🔥", desc:"+60 detik" },
                        { label:"VERY HARD", color:"#ef4444", icon:"💀", desc:"+60 detik" },
                      ].map(d => (
                        <div key={d.label} className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 px-1 border"
                          style={{ borderColor:d.color+"44", background:d.color+"0f", boxShadow:`0 0 8px ${d.color}30` }}>
                          <span className="text-sm leading-none">{d.icon}</span>
                          <span className="text-[6px] font-black" style={{ color:d.color }}>{d.label}</span>
                          <span className="text-[5px] text-white/30 text-center leading-tight">{d.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* ── RIGHT — instructions + button ── */}
                <div className="mp-right">
                  <div>
                    <div className="w-full h-px mb-1.5" style={{ background:"linear-gradient(to right,transparent,rgba(251,146,60,0.3),transparent)" }} />
                    <div className="text-[7px] text-white/35 tracking-widest uppercase mb-1.5 font-bold text-center">📖 Cara Bermain</div>
                    <div className="space-y-1.5 px-1">
                      {[
                        { icon:"🛸", text:"Gerakkan pesawat dengan mouse atau sentuh layar untuk memantulkan meteor" },
                        { icon:"☄️", text:"Meteor memantul ke atas — hancurkan semua asteroid di atas layar" },
                        { icon:"💥", text:"Tiap asteroid butuh 2× terkena meteor untuk hancur" },
                        { icon:"📝", text:"Tiap 25 detik muncul soal guru — jawab benar = +20 poin bonus" },
                        { icon:"🔥", text:"Bangun combo dari memecah asteroid berturut-turut untuk poin berlipat!" },
                      ].map((item,i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-xs shrink-0 mt-0.5">{item.icon}</span>
                          <span className="text-[8px] text-white/55 leading-tight">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1 mt-2">
                    <button onClick={startGame}
                      className="mp-btn relative overflow-hidden font-display font-black text-white text-lg px-8 py-3 rounded-2xl cursor-pointer hover:scale-110 active:scale-95 w-full"
                      style={{
                        background:"linear-gradient(135deg,#f97316 0%,#fb923c 40%,#a855f7 100%)",
                        boxShadow:"0 0 30px rgba(249,115,22,0.85),0 0 60px rgba(168,85,247,0.35),0 4px 16px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.25)",
                      }}>
                      <span className="relative z-10 tracking-wide">🛸 LUNCURKAN METEOR</span>
                    </button>
                    <div className="text-[7px] text-white/20 text-center">
                      Mouse / Sentuh layar untuk menggerakkan pesawat
                    </div>
                  </div>
                </div>

              </div>{/* mp-main */}
            </div>{/* mp-wrap */}
          </div>{/* mp-scroll */}
        </div>
      )}

      {isLight ? <Snowfall /> : <Starfield />}

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-lg px-4 pt-4 pb-1 shrink-0 gap-2">
        <button
          onClick={() => { playPopSound(); resolvedBackPath ? navigate(resolvedBackPath) : navigate(-1); }}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-display font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(0,200,255,0.4)] hover:opacity-90 transition-opacity cursor-pointer"
          title="Kembali ke pilihan game"
        >
          <span className="text-base leading-none">←</span>
          <span className="hidden sm:inline">Kembali</span>
        </button>
        <span className="font-display text-sm text-accent text-center flex-1">🛸☄️ Meteor Pantul NUMATIK</span>
        <button
          onClick={() => { playPopSound(); navigate(resolvedHomePath); }}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-display font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(0,200,255,0.4)] hover:opacity-90 transition-opacity cursor-pointer"
          title="Menu Utama"
        >
          <span className="text-base leading-none">🏠</span>
          <span className="hidden sm:inline">Home</span>
        </button>
      </div>

      {/* Countdown chip: reserve a fixed slot so the canvas size doesn't jump */}
      <div className="relative z-10 h-9 flex items-center justify-center w-full px-3 shrink-0">
        {guruQuiz.isCountdownActive && (
          <div className="rounded-xl border border-cyan-400/60 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 px-3 py-1 flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(34,211,238,0.45)]">
            <img
              src="/numatik-ai-avatar.png"
              alt="NUMATIK"
              className="h-5 w-5 rounded-full object-cover ring-1 ring-cyan-300/70"
            />
            <span className="font-display text-[11px] sm:text-xs font-bold text-cyan-200 tracking-wide drop-shadow-[0_0_6px_rgba(34,211,238,0.55)]">
              SOAL NUMATIK ke-{guruQuiz.questionNumber + 1}/{guruQuiz.totalQuestions} dalam
            </span>
            <span
              className={`font-display text-sm sm:text-base font-black tabular-nums drop-shadow-[0_0_8px_rgba(34,211,238,0.85)] ${
                guruQuiz.secondsUntilNext <= 5 ? "text-red-300 animate-pulse" : "text-cyan-100"
              }`}
            >
              {guruQuiz.secondsUntilNext}s
            </span>
          </div>
        )}
      </div>

      {/* Canvas area — always in DOM so the animation loop can start on mount */}
      <div className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center px-2 pb-2">
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          style={{
            cursor: "none",
            borderRadius: 20,
            boxShadow: "0 0 40px rgba(130,80,255,0.45), 0 0 80px rgba(80,0,200,0.2)",
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "100%",
            aspectRatio: `${CW} / ${CH}`,
            objectFit: "contain",
            touchAction: "none",
          }}
        />
      </div>

      {/* On-screen control buttons — fixed at bottom-left for one-hand play */}
      {(phaseRef.current === "playing" || phaseRef.current === "ready") && (
        <div
          className="absolute z-20 bottom-3 left-3 flex items-center gap-2 select-none"
          style={{ touchAction: "none" }}
        >
          <button
            type="button"
            aria-label="Geser kiri"
            onPointerDown={(e) => { e.preventDefault(); (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId); holdLeftRef.current = true; }}
            onPointerUp={(e) => { holdLeftRef.current = false; try { (e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId); } catch {} }}
            onPointerCancel={() => { holdLeftRef.current = false; }}
            onPointerLeave={() => { holdLeftRef.current = false; }}
            onContextMenu={(e) => e.preventDefault()}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-md border-2 border-white/40 shadow-[0_4px_20px_rgba(130,80,255,0.5),inset_0_1px_0_rgba(255,255,255,0.5)] active:scale-95 active:from-white/50 active:to-white/20 transition-transform flex items-center justify-center text-white text-3xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            ◀
          </button>
          <button
            type="button"
            aria-label="Geser kanan"
            onPointerDown={(e) => { e.preventDefault(); (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId); holdRightRef.current = true; }}
            onPointerUp={(e) => { holdRightRef.current = false; try { (e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId); } catch {} }}
            onPointerCancel={() => { holdRightRef.current = false; }}
            onPointerLeave={() => { holdRightRef.current = false; }}
            onContextMenu={(e) => e.preventDefault()}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-md border-2 border-white/40 shadow-[0_4px_20px_rgba(130,80,255,0.5),inset_0_1px_0_rgba(255,255,255,0.5)] active:scale-95 active:from-white/50 active:to-white/20 transition-transform flex items-center justify-center text-white text-3xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            ▶
          </button>
        </div>
      )}

      <GuruQuizOverlay {...guruQuiz} />
    </div>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Parse a hex color like "#ff5e87" into [r,g,b]
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

// Build a `rgba(...)` string from a hex color and alpha [0..1]
function hexToRgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Linearly mix two hex colors. t = 0 returns base, t = 1 returns tint.
function mixColor(base: string, tint: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(base);
  const [r2, g2, b2] = hexToRgb(tint);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

export default BrickBreakerPage;
