import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import { playPopSound } from "@/hooks/useAudio";
import { useGuruQuiz } from "@/hooks/useGuruQuiz";
import GuruQuizOverlay from "@/components/GuruQuizOverlay";

// ── Canvas dims ───────────────────────────────────────────────────────────────
const CW = 420;
const CH = 580;

// ── Math questions ────────────────────────────────────────────────────────────
interface MQ { q: string; ans: number }
const makeQ = (): MQ => {
  const t = Math.floor(Math.random() * 8);
  switch (t) {
    case 0: { const a = 2 + Math.floor(Math.random() * 10), b = 2 + Math.floor(Math.random() * 10); return { q: `${a} × ${b}`, ans: a * b }; }
    case 1: { const a = 10 + Math.floor(Math.random() * 90), b = 10 + Math.floor(Math.random() * 90); return { q: `${a} + ${b}`, ans: a + b }; }
    case 2: { const b = 5 + Math.floor(Math.random() * 45), a = b + 5 + Math.floor(Math.random() * 50); return { q: `${a} − ${b}`, ans: a - b }; }
    case 3: { const b = 2 + Math.floor(Math.random() * 9), a = b * (2 + Math.floor(Math.random() * 9)); return { q: `${a} ÷ ${b}`, ans: a / b }; }
    case 4: { const sqList = [4,9,16,25,36,49,64,81,100,121,144]; const sq = sqList[Math.floor(Math.random() * sqList.length)]; return { q: `√${sq}`, ans: Math.round(Math.sqrt(sq)) }; }
    case 5: { const bases = [2,3,4,5,6,7,8,9,10]; const a = bases[Math.floor(Math.random() * bases.length)]; return { q: `${a}²`, ans: a * a }; }
    case 6: { const a = 2 + Math.floor(Math.random() * 9), b = 2 + Math.floor(Math.random() * 9); return { q: `KPK(${a},${b})`, ans: (a * b) / gcd(a, b) }; }
    default: { const a = 1 + Math.floor(Math.random() * 15), b = 1 + Math.floor(Math.random() * 15); return { q: `${a}² + ${b}`, ans: a * a + b }; }
  }
};
function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

const makeWrong = (ans: number, used: Set<number>): number => {
  let v: number, tries = 0;
  do {
    const d = 1 + Math.floor(Math.random() * 15);
    v = ans + (Math.random() < 0.5 ? d : -d);
    tries++;
  } while ((used.has(v) || v < 0) && tries < 100);
  return v < 0 ? ans + 1 + Math.floor(Math.random() * 10) : v;
};

// ── Bubble neon colors ────────────────────────────────────────────────────────
const BUBBLE_COLORS = [
  { fill: "rgba(255, 80, 120, 0.25)", stroke: "#ff5078", glow: "#ff5078" },
  { fill: "rgba(80, 200, 255, 0.25)", stroke: "#50c8ff", glow: "#50c8ff" },
  { fill: "rgba(130, 255, 130, 0.25)", stroke: "#82ff82", glow: "#82ff82" },
  { fill: "rgba(255, 200, 60, 0.25)", stroke: "#ffc83c", glow: "#ffc83c" },
  { fill: "rgba(200, 80, 255, 0.25)", stroke: "#c850ff", glow: "#c850ff" },
  { fill: "rgba(255, 150, 50, 0.25)", stroke: "#ff9632", glow: "#ff9632" },
  { fill: "rgba(0, 230, 210, 0.25)", stroke: "#00e6d2", glow: "#00e6d2" },
];

interface Bubble {
  id: number;
  x: number;
  y: number;
  vy: number;
  vx: number;
  r: number;
  value: number;
  correct: boolean;
  color: typeof BUBBLE_COLORS[0];
  wobble: number;
  wobbleSpd: number;
  alpha: number;
  popping: boolean;
  popAnim: number;
  shimmer: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number;
  color: string;
  r: number;
}

interface FloatText {
  x: number; y: number;
  txt: string;
  alpha: number;
  vy: number;
  good: boolean;
}

interface BgBubble {
  x: number; y: number; r: number; vy: number; alpha: number; color: string; t: number;
}

type Phase = "idle" | "playing" | "dead";

let _bid = 0;

const BubblePopPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const phaseRef = useRef<Phase>("idle");
  const guruQuiz = useGuruQuiz(phaseRef);
  const bubblesRef = useRef<Bubble[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatTextsRef = useRef<FloatText[]>([]);
  const bgBubblesRef = useRef<BgBubble[]>([]);
  const currentQRef = useRef<MQ>(makeQ());
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const bestRef = useRef(0);
  const levelRef = useRef(1);
  const timerRef = useRef(30);
  const timerAccRef = useRef(0);
  const spawnAccRef = useRef(0);
  const comboRef = useRef(0);
  const shakeRef = useRef(0);
  const rainbowHueRef = useRef(0);

  const [, forceRender] = useState(0);
  const rerender = useCallback(() => forceRender(n => n + 1), []);

  // ── helpers ────────────────────────────────────────────────────────────────
  const spawnBubbles = useCallback((q: MQ) => {
    const count = Math.min(3 + Math.floor(levelRef.current / 2), 6);
    const used = new Set<number>([q.ans]);
    const values: number[] = [q.ans];
    while (values.length < count) {
      const w = makeWrong(q.ans, used);
      used.add(w);
      values.push(w);
    }
    // shuffle
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    const spacing = CW / (count + 1);
    bubblesRef.current = values.map((val, idx) => {
      const col = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
      const r = 36 + Math.random() * 12;
      return {
        id: _bid++,
        x: spacing * (idx + 1) + (Math.random() - 0.5) * 20,
        y: CH + r + Math.random() * 40,
        vy: -(55 + Math.random() * 30 + levelRef.current * 4),
        vx: (Math.random() - 0.5) * 20,
        r,
        value: val,
        correct: val === q.ans,
        color: col,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpd: 1.5 + Math.random() * 1.5,
        alpha: 1,
        popping: false,
        popAnim: 0,
        shimmer: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  const spawnBgBubbles = useCallback(() => {
    bgBubblesRef.current = Array.from({ length: 18 }, () => ({
      x: Math.random() * CW,
      y: CH + Math.random() * 100,
      r: 6 + Math.random() * 18,
      vy: -(10 + Math.random() * 20),
      alpha: 0.08 + Math.random() * 0.12,
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)].glow,
      t: Math.random() * Math.PI * 2,
    }));
  }, []);

  const spawnParticles = useCallback((x: number, y: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 80 + Math.random() * 160;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        r: 3 + Math.random() * 5,
      });
    }
  }, []);

  const startGame = useCallback(() => {
    phaseRef.current = "playing";
    scoreRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    timerRef.current = 30;
    timerAccRef.current = 0;
    spawnAccRef.current = 0;
    comboRef.current = 0;
    shakeRef.current = 0;
    particlesRef.current = [];
    floatTextsRef.current = [];
    bubblesRef.current = [];
    const q = makeQ();
    currentQRef.current = q;
    spawnBubbles(q);
    spawnBgBubbles();
    rerender();
  }, [spawnBubbles, spawnBgBubbles, rerender]);

  // ── click handler ──────────────────────────────────────────────────────────
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CW / rect.width;
    const scaleY = CH / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;

    const bubbles = bubblesRef.current;
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      if (b.popping) continue;
      const dx = cx - b.x, dy = cy - b.y;
      if (Math.sqrt(dx * dx + dy * dy) < b.r + 6) {
        playPopSound();
        if (b.correct) {
          comboRef.current++;
          const pts = 10 * comboRef.current;
          scoreRef.current += pts;
          if (scoreRef.current > bestRef.current) bestRef.current = scoreRef.current;
          spawnParticles(b.x, b.y, b.color.glow, 20);
          floatTextsRef.current.push({ x: b.x, y: b.y, txt: `+${pts}${comboRef.current > 1 ? ` 🔥×${comboRef.current}` : ""}`, alpha: 1, vy: -80, good: true });
          // pop all bubbles then spawn next
          bubblesRef.current.forEach(bb => { bb.popping = true; bb.popAnim = 0; });
          timerRef.current = Math.min(timerRef.current + 5, 30);
          levelRef.current = Math.floor(scoreRef.current / 80) + 1;
          setTimeout(() => {
            const nq = makeQ();
            currentQRef.current = nq;
            spawnBubbles(nq);
          }, 400);
        } else {
          comboRef.current = 0;
          livesRef.current--;
          shakeRef.current = 0.4;
          spawnParticles(b.x, b.y, "#ff3333", 12);
          floatTextsRef.current.push({ x: b.x, y: b.y, txt: "✗ Salah!", alpha: 1, vy: -70, good: false });
          b.popping = true;
          b.popAnim = 0;
          if (livesRef.current <= 0) {
            phaseRef.current = "dead";
            rerender();
          }
        }
        break;
      }
    }
  }, [spawnBubbles, spawnParticles, rerender]);

  // ── draw ───────────────────────────────────────────────────────────────────
  const drawBubble = (ctx: CanvasRenderingContext2D, b: Bubble, dt: number) => {
    if (b.popping) {
      const progress = b.popAnim;
      const scale = 1 + progress * 0.6;
      const alpha = 1 - progress;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(b.x, b.y);
      ctx.scale(scale, scale);
      ctx.shadowBlur = 30;
      ctx.shadowColor = b.color.glow;
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = b.color.stroke;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
      return;
    }

    const wobX = Math.sin(b.wobble) * 6;
    ctx.save();
    ctx.translate(b.x + wobX, b.y);

    // glow
    ctx.shadowBlur = 28;
    ctx.shadowColor = b.color.glow;

    // body
    const grad = ctx.createRadialGradient(-b.r * 0.3, -b.r * 0.3, b.r * 0.05, 0, 0, b.r);
    grad.addColorStop(0, "rgba(255,255,255,0.45)");
    grad.addColorStop(0.4, b.color.fill);
    grad.addColorStop(1, b.color.fill.replace("0.25", "0.5"));
    ctx.beginPath();
    ctx.arc(0, 0, b.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = b.color.stroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // shimmer highlight
    const shimX = -b.r * 0.38 + Math.sin(b.shimmer) * 4;
    const shimY = -b.r * 0.38 + Math.cos(b.shimmer) * 4;
    ctx.shadowBlur = 0;
    const hGrad = ctx.createRadialGradient(shimX, shimY, 1, shimX, shimY, b.r * 0.4);
    hGrad.addColorStop(0, "rgba(255,255,255,0.7)");
    hGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.ellipse(shimX, shimY, b.r * 0.38, b.r * 0.24, -0.5, 0, Math.PI * 2);
    ctx.fillStyle = hGrad;
    ctx.fill();

    // number text
    ctx.shadowBlur = 12;
    ctx.shadowColor = b.color.glow;
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${b.r > 44 ? 20 : 17}px 'Orbitron', monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(b.value), 0, 0);

    ctx.restore();
    void dt;
  };

  // ── game loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    spawnBgBubbles();

    const loop = (ts: number) => {
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;
      if (guruQuiz.isPausedRef.current) { rafRef.current = requestAnimationFrame(loop); return; }
      rainbowHueRef.current = (rainbowHueRef.current + dt * 30) % 360;

      // ── update bg bubbles ───────────────────────────────────────────────
      const bgB = bgBubblesRef.current;
      for (const b of bgB) {
        b.y += b.vy * dt;
        b.t += dt * 0.8;
        b.x += Math.sin(b.t) * 0.6;
        if (b.y + b.r < 0) {
          b.y = CH + b.r;
          b.x = Math.random() * CW;
        }
      }

      if (phaseRef.current === "playing") {
        // timer
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

        // shake
        if (shakeRef.current > 0) shakeRef.current = Math.max(0, shakeRef.current - dt * 2);

        // update bubbles
        const bubbles = bubblesRef.current;
        for (const b of bubbles) {
          if (b.popping) {
            b.popAnim = Math.min(b.popAnim + dt * 3.5, 1);
          } else {
            b.y += b.vy * dt;
            b.x += b.vx * dt;
            b.wobble += b.wobbleSpd * dt;
            b.shimmer += 2 * dt;
            // bounce off walls
            if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx); }
            if (b.x + b.r > CW) { b.x = CW - b.r; b.vx = -Math.abs(b.vx); }
            // if bubble escapes top
            if (b.y + b.r < 0 && !b.popping) {
              if (b.correct) {
                comboRef.current = 0;
                livesRef.current--;
                shakeRef.current = 0.4;
                floatTextsRef.current.push({ x: CW / 2, y: 80, txt: "💨 Kabur!", alpha: 1, vy: -60, good: false });
                if (livesRef.current <= 0) { phaseRef.current = "dead"; rerender(); }
                const nq = makeQ();
                currentQRef.current = nq;
                spawnBubbles(nq);
              } else {
                b.alpha = 0;
              }
            }
          }
        }
        bubblesRef.current = bubbles.filter(b => !(b.popping && b.popAnim >= 1) && b.alpha > 0);
      }

      // update particles
      const parts = particlesRef.current;
      for (const p of parts) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 200 * dt;
        p.alpha -= dt * 2.2;
        p.r *= 0.97;
      }
      particlesRef.current = parts.filter(p => p.alpha > 0);

      // update float texts
      const fts = floatTextsRef.current;
      for (const f of fts) {
        f.y += f.vy * dt;
        f.alpha -= dt * 1.4;
      }
      floatTextsRef.current = fts.filter(f => f.alpha > 0);

      // ── draw ────────────────────────────────────────────────────────────
      const sx = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 14 : 0;
      const sy = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 6 : 0;

      ctx.save();
      ctx.translate(sx, sy);

      // bg gradient rainbow
      const h = rainbowHueRef.current;
      const bgGrad = ctx.createLinearGradient(0, 0, CW, CH);
      bgGrad.addColorStop(0, `hsl(${h}, 70%, 8%)`);
      bgGrad.addColorStop(0.5, `hsl(${(h + 60) % 360}, 60%, 10%)`);
      bgGrad.addColorStop(1, `hsl(${(h + 120) % 360}, 65%, 8%)`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CW, CH);

      // bg decoration bubbles
      for (const b of bgBubblesRef.current) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = b.color;
        ctx.globalAlpha = b.alpha;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // top bar
      const barGrad = ctx.createLinearGradient(0, 0, CW, 0);
      barGrad.addColorStop(0, "rgba(20, 20, 40, 0.92)");
      barGrad.addColorStop(1, "rgba(30, 10, 50, 0.92)");
      ctx.fillStyle = barGrad;
      ctx.fillRect(0, 0, CW, 90);

      // question
      ctx.shadowBlur = 24;
      ctx.shadowColor = `hsl(${(h + 180) % 360}, 100%, 70%)`;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 15px 'Orbitron', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Pilih jawaban yang BENAR! 🫧", CW / 2, 18);

      ctx.shadowBlur = 30;
      ctx.shadowColor = `hsl(${h}, 100%, 70%)`;
      ctx.fillStyle = `hsl(${h}, 100%, 80%)`;
      ctx.font = "bold 30px 'Orbitron', monospace";
      ctx.fillText(currentQRef.current.q, CW / 2, 55);
      ctx.shadowBlur = 0;

      // score, lives, timer on sides
      ctx.textAlign = "left";
      ctx.font = "bold 13px 'Orbitron', monospace";
      ctx.fillStyle = "#ffc83c";
      ctx.shadowColor = "#ffc83c";
      ctx.shadowBlur = 10;
      ctx.fillText(`⭐ ${scoreRef.current}`, 10, 80);

      ctx.textAlign = "right";
      ctx.fillStyle = "#ff5078";
      ctx.shadowColor = "#ff5078";
      ctx.fillText(`❤️ ${"♥".repeat(livesRef.current)}`, CW - 10, 80);
      ctx.shadowBlur = 0;

      // timer bar
      const timerFrac = timerRef.current / 30;
      const timerH = `hsl(${timerFrac * 120}, 100%, 55%)`;
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(0, 90, CW, 6);
      ctx.fillStyle = timerH;
      ctx.shadowBlur = 8;
      ctx.shadowColor = timerH;
      ctx.fillRect(0, 90, CW * timerFrac, 6);
      ctx.shadowBlur = 0;

      // level badge
      ctx.textAlign = "center";
      ctx.font = "bold 11px 'Orbitron', monospace";
      ctx.fillStyle = `hsl(${(h + 60) % 360}, 100%, 75%)`;
      ctx.fillText(`LEVEL ${levelRef.current}`, CW / 2, 84);

      // bubbles
      for (const b of bubblesRef.current) {
        drawBubble(ctx, b, dt);
      }

      // particles
      for (const p of particlesRef.current) {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // float texts
      for (const f of floatTextsRef.current) {
        ctx.globalAlpha = Math.max(0, f.alpha);
        ctx.font = `bold 18px 'Orbitron', monospace`;
        ctx.textAlign = "center";
        ctx.shadowBlur = 14;
        ctx.shadowColor = f.good ? "#82ff82" : "#ff5078";
        ctx.fillStyle = f.good ? "#82ff82" : "#ff5555";
        ctx.fillText(f.txt, f.x, f.y);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // idle overlay
      if (phaseRef.current === "idle") {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "bold 11px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${h}, 100%, 75%)`;
        ctx.shadowBlur = 16;
        ctx.shadowColor = `hsl(${h}, 100%, 60%)`;
        ctx.fillText("MATH SPACE × NUMATIK AI", CW / 2, CH / 2 - 120);

        ctx.font = "bold 34px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${(h + 60) % 360}, 100%, 80%)`;
        ctx.shadowColor = `hsl(${(h + 60) % 360}, 100%, 60%)`;
        ctx.shadowBlur = 30;
        ctx.fillText("🫧 POP SOAL!", CW / 2, CH / 2 - 70);

        ctx.font = "13px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.shadowBlur = 0;
        const lines = [
          "Gelembung warna-warni naik ke atas!",
          "Klik gelembung dengan jawaban BENAR!",
          "Combo = poin berlipat ganda! 🔥",
          "Waktu habis atau salah 3x → Game Over",
        ];
        lines.forEach((l, i) => {
          ctx.fillText(l, CW / 2, CH / 2 - 10 + i * 22);
        });

        ctx.font = "bold 17px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${h}, 100%, 80%)`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsl(${h}, 100%, 60%)`;
        const pulse = 0.85 + 0.15 * Math.sin(ts / 300);
        ctx.globalAlpha = pulse;
        ctx.fillText("[ KLIK UNTUK MULAI ]", CW / 2, CH / 2 + 95);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      // dead overlay
      if (phaseRef.current === "dead") {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "bold 32px 'Orbitron', monospace";
        ctx.fillStyle = "#ff5078";
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#ff5078";
        ctx.fillText("GAME OVER", CW / 2, CH / 2 - 85);

        ctx.font = "bold 20px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc83c";
        ctx.shadowColor = "#ffc83c";
        ctx.shadowBlur = 16;
        ctx.fillText(`Skor: ${scoreRef.current}`, CW / 2, CH / 2 - 35);

        ctx.font = "bold 16px 'Orbitron', monospace";
        ctx.fillStyle = "#82ff82";
        ctx.shadowColor = "#82ff82";
        ctx.shadowBlur = 12;
        ctx.fillText(`Rekor: ${bestRef.current}`, CW / 2, CH / 2 + 5);

        ctx.font = "13px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.shadowBlur = 0;
        ctx.fillText("Kamu hebat! Terus berlatih! 🌟", CW / 2, CH / 2 + 45);

        ctx.font = "bold 15px 'Orbitron', monospace";
        ctx.fillStyle = `hsl(${h}, 100%, 80%)`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `hsl(${h}, 100%, 60%)`;
        const pulse2 = 0.85 + 0.15 * Math.sin(ts / 300);
        ctx.globalAlpha = pulse2;
        ctx.fillText("[ KLIK UNTUK MAIN LAGI ]", CW / 2, CH / 2 + 95);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [spawnBgBubbles, spawnBubbles, rerender]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (phaseRef.current === "idle") {
      startGame();
      return;
    }
    if (phaseRef.current === "dead") {
      startGame();
      return;
    }
    handleCanvasClick(e);
  }, [startGame, handleCanvasClick]);

  const score = scoreRef.current;
  const lives = livesRef.current;
  const phase = phaseRef.current;

  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden ${
        isLight ? "gradient-snow" : "gradient-space"
      }`}
      style={{ height: '100dvh' }}
    >
      {isLight ? <Snowfall /> : <Starfield />}

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-2 pt-7 pb-4">
        {/* header */}
        <div className="flex items-center justify-between w-full mb-3 px-1">
          <button
            onClick={() => { playPopSound(); navigate('/ruang-untuk-guru/numatik-game'); }}
            className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all text-sm"
            title="Menu Utama"
          >
            🏠
          </button>
          <div className="text-center">
            <span className="font-display text-lg text-white text-glow-cyan">🫧 POP SOAL!</span>
            <div className="text-xs font-mono text-yellow-400">🏆 {bestRef.current}</div>
          </div>
          <button
            onClick={() => { playPopSound(); navigate(-1); }}
            className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all font-bold"
            title="Keluar"
          >
            ✕
          </button>
        </div>

        {/* canvas */}
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          onClick={handleClick}
          style={{
            width: "auto",
            maxWidth: "96vw",
            maxHeight: "calc(100dvh - 100px)",
            aspectRatio: `${CW}/${CH}`,
            borderRadius: 16,
            cursor: "crosshair",
            boxShadow: "0 0 40px rgba(130, 255, 200, 0.2), 0 0 80px rgba(80, 130, 255, 0.1)",
            border: "1.5px solid rgba(255,255,255,0.1)",
            display: "block",
          }}
        />

        {/* hint */}
        {phase === "playing" && (
          <div className="mt-3 text-xs text-white/40 font-mono text-center">
            ⭐ {score} poin &nbsp;|&nbsp; ❤️ {lives} nyawa &nbsp;|&nbsp; Level {levelRef.current}
          </div>
        )}
      <GuruQuizOverlay {...guruQuiz} />
      </div>
    </div>
  );
};

export default BubblePopPage;
