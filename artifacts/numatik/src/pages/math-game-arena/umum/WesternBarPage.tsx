import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import { playPopSound } from "@/hooks/useAudio";
import { useGuruQuiz } from "@/hooks/useGuruQuiz";
import GuruQuizOverlay from "@/components/GuruQuizOverlay";

const CW = 440;
const CH = 600;

// Target slots across the bar
const SLOT_COUNT = 5;
const BAR_Y = CH - 130; // top of bar counter
const TARGET_W = 62;
const TARGET_H = 72;
const TARGET_SPACING = (CW - TARGET_W) / (SLOT_COUNT - 1);

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

// Target types: bottle, can, star
const TARGET_TYPES = ["bottle", "can", "star"] as const;
type TargetType = typeof TARGET_TYPES[number];

const TARGET_COLORS = [
  "#5ec8ff", "#72f572", "#ffc94a", "#ff9040", "#bf7fff",
];

interface Target {
  slot: number;
  x: number;
  y: number;        // current Y (rises up from BAR_Y)
  targetY: number;  // destination Y when visible
  value: number;
  correct: boolean;
  type: TargetType;
  color: string;
  state: "rising" | "visible" | "falling" | "dead" | "shot";
  stateT: number;   // time in current state
  visibleFor: number; // seconds to stay up
  wobble: number;
  shotT: number;    // shot animation timer
  shards: Shard[];
}

interface Shard {
  x: number; y: number; vx: number; vy: number;
  alpha: number; r: number; color: string; angle: number; spin: number;
}

interface FloatText { x: number; y: number; txt: string; alpha: number; vy: number; good: boolean }
interface Crosshair { x: number; y: number; alpha: number }
interface MuzzleFlash { x: number; y: number; alpha: number; size: number }

type Phase = "idle" | "playing" | "dead";

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
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

const WesternBarPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const phaseRef = useRef<Phase>("idle");
  const guruQuiz = useGuruQuiz(phaseRef);
  const targetsRef = useRef<Target[]>([]);
  const floatTextsRef = useRef<FloatText[]>([]);
  const crosshairsRef = useRef<Crosshair[]>([]);
  const muzzlesRef = useRef<MuzzleFlash[]>([]);
  const bgDustRef = useRef<{ x: number; y: number; r: number; alpha: number; vx: number; vy: number }[]>([]);

  const currentQRef = useRef<MQ>(makeQ());
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const bestRef = useRef(0);
  const levelRef = useRef(1);
  const timerRef = useRef(60);
  const timerAccRef = useRef(0);
  const comboRef = useRef(0);
  const shakeRef = useRef(0);
  const spawnAccRef = useRef(0);
  const spawnIntervalRef = useRef(2.2);
  const slotsOccupiedRef = useRef<Set<number>>(new Set());
  const correctSpawnedRef = useRef(false);

  const [, forceRender] = useState(0);
  const rerender = useCallback(() => forceRender(n => n + 1), []);

  const spawnTarget = useCallback((slot: number, value: number, isCorrect: boolean, q: MQ) => {
    const type = TARGET_TYPES[~~(Math.random() * TARGET_TYPES.length)];
    const color = TARGET_COLORS[slot % TARGET_COLORS.length];
    const cx = TARGET_W / 2 + slot * TARGET_SPACING;
    const visibleFor = Math.max(1.4, 3.2 - levelRef.current * 0.18);
    targetsRef.current.push({
      slot,
      x: cx,
      y: BAR_Y,
      targetY: BAR_Y - TARGET_H - 10 - ~~(Math.random() * 20),
      value,
      correct: isCorrect,
      type,
      color,
      state: "rising",
      stateT: 0,
      visibleFor,
      wobble: Math.random() * Math.PI * 2,
      shotT: 0,
      shards: [],
    });
    slotsOccupiedRef.current.add(slot);
  }, []);

  const spawnWave = useCallback((q: MQ) => {
    const used = new Set<number>([q.ans]);
    const values: number[] = [q.ans];
    const count = Math.min(3 + levelRef.current, SLOT_COUNT);
    while (values.length < count) {
      const w = makeWrong(q.ans, used);
      used.add(w);
      values.push(w);
    }
    for (let i = values.length - 1; i > 0; i--) {
      const j = ~~(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    const freeSlots = Array.from({ length: SLOT_COUNT }, (_, i) => i).filter(s => !slotsOccupiedRef.current.has(s));
    if (freeSlots.length === 0) return;
    const toSpawn = Math.min(values.length, freeSlots.length);
    let correctIndex = -1;
    for (let i = 0; i < toSpawn; i++) {
      if (values[i] === q.ans) { correctIndex = i; break; }
    }
    // Ensure correct is spawned
    if (correctIndex === -1) {
      const randomIdx = ~~(Math.random() * toSpawn);
      values[randomIdx] = q.ans;
    }
    const slots = freeSlots.sort(() => Math.random() - 0.5).slice(0, toSpawn);
    for (let i = 0; i < toSpawn; i++) {
      const isCorrect = values[i] === q.ans;
      if (isCorrect) correctSpawnedRef.current = true;
      spawnTarget(slots[i], values[i], isCorrect, q);
    }
  }, [spawnTarget]);

  const spawnBgDust = useCallback(() => {
    bgDustRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * CW, y: Math.random() * CH,
      r: 1 + Math.random() * 3,
      alpha: 0.05 + Math.random() * 0.15,
      vx: (Math.random() - 0.5) * 12,
      vy: -3 - Math.random() * 8,
    }));
  }, []);

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    timerRef.current = 60;
    timerAccRef.current = 0;
    comboRef.current = 0;
    shakeRef.current = 0;
    spawnAccRef.current = 0;
    spawnIntervalRef.current = 2.2;
    slotsOccupiedRef.current = new Set();
    correctSpawnedRef.current = false;
    targetsRef.current = [];
    floatTextsRef.current = [];
    crosshairsRef.current = [];
    muzzlesRef.current = [];
    phaseRef.current = "playing";
    const q = makeQ();
    currentQRef.current = q;
    spawnBgDust();
    spawnWave(q);
    rerender();
  }, [spawnWave, spawnBgDust, rerender]);

  const shootAt = useCallback((gx: number, gy: number) => {
    const targets = targetsRef.current;
    let hit = false;
    for (const t of targets) {
      if (t.state !== "visible" && t.state !== "rising") continue;
      const tx = t.x - TARGET_W / 2;
      const ty = t.y - TARGET_H;
      if (gx >= tx - 6 && gx <= tx + TARGET_W + 6 && gy >= ty - 6 && gy <= ty + TARGET_H + 6) {
        hit = true;
        crosshairsRef.current.push({ x: gx, y: gy, alpha: 1 });
        muzzlesRef.current.push({ x: gx, y: gy, alpha: 1, size: 22 });

        if (t.correct) {
          playPopSound();
          comboRef.current++;
          const pts = 20 * comboRef.current * levelRef.current;
          scoreRef.current += pts;
          if (scoreRef.current > bestRef.current) bestRef.current = scoreRef.current;
          timerRef.current = Math.min(timerRef.current + 5, 60);
          floatTextsRef.current.push({ x: t.x, y: t.y - TARGET_H, txt: `+${pts}${comboRef.current > 1 ? ` 🔥×${comboRef.current}` : ""}`, alpha: 1, vy: -70, good: true });
          t.state = "shot";
          t.shotT = 0;
          t.shards = Array.from({ length: 16 }, (_, i) => {
            const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.3;
            const spd = 60 + Math.random() * 140;
            return { x: t.x, y: t.y - TARGET_H / 2, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 40, alpha: 1, r: 3 + Math.random() * 5, color: t.color, angle: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 8 };
          });
          levelRef.current = Math.floor(scoreRef.current / 200) + 1;
          spawnIntervalRef.current = Math.max(0.9, 2.2 - levelRef.current * 0.15);
          // Immediately prepare a new question
          const q = makeQ();
          currentQRef.current = q;
          correctSpawnedRef.current = false;
          slotsOccupiedRef.current.delete(t.slot);
          spawnWave(q);
          rerender();
        } else {
          playPopSound();
          comboRef.current = 0;
          livesRef.current--;
          shakeRef.current = 0.5;
          t.state = "shot";
          t.shotT = 0;
          floatTextsRef.current.push({ x: t.x, y: t.y - TARGET_H, txt: "✗ Salah!", alpha: 1, vy: -55, good: false });
          t.shards = Array.from({ length: 8 }, (_, i) => {
            const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
            const spd = 40 + Math.random() * 80;
            return { x: t.x, y: t.y - TARGET_H / 2, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 20, alpha: 1, r: 2 + Math.random() * 3, color: "#ff5e87", angle: 0, spin: (Math.random() - 0.5) * 4 };
          });
          if (livesRef.current <= 0) { phaseRef.current = "dead"; rerender(); }
        }
        break;
      }
    }
    if (!hit) {
      crosshairsRef.current.push({ x: gx, y: gy, alpha: 0.5 });
    }
  }, [spawnWave, rerender]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let cx: number, cy: number;
    if ("touches" in e) {
      const touch = (e as React.TouchEvent).changedTouches[0] || (e as React.TouchEvent).touches[0];
      cx = touch.clientX - rect.left;
      cy = touch.clientY - rect.top;
    } else {
      cx = (e as React.MouseEvent).clientX - rect.left;
      cy = (e as React.MouseEvent).clientY - rect.top;
    }
    const gx = cx * (CW / rect.width);
    const gy = cy * (CH / rect.height);

    if (phaseRef.current === "idle" || phaseRef.current === "dead") { startGame(); return; }
    if (phaseRef.current === "playing") shootAt(gx, gy);
  }, [startGame, shootAt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    spawnBgDust();

    const loop = (ts: number) => {
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;
      if (guruQuiz.isPausedRef.current) { rafRef.current = requestAnimationFrame(loop); return; }

      const phase = phaseRef.current;

      if (phase === "playing") {
        timerAccRef.current += dt;
        if (timerAccRef.current >= 1) {
          timerAccRef.current -= 1;
          timerRef.current--;
          if (timerRef.current <= 0) { timerRef.current = 0; phaseRef.current = "dead"; rerender(); }
        }
        if (shakeRef.current > 0) shakeRef.current = Math.max(0, shakeRef.current - dt * 2.5);

        // Spawn new targets
        spawnAccRef.current += dt;
        if (spawnAccRef.current >= spawnIntervalRef.current) {
          spawnAccRef.current = 0;
          const q = currentQRef.current;
          if (!correctSpawnedRef.current) {
            const freeSlots = Array.from({ length: SLOT_COUNT }, (_, i) => i).filter(s => !slotsOccupiedRef.current.has(s));
            if (freeSlots.length > 0) {
              const slot = freeSlots[~~(Math.random() * freeSlots.length)];
              spawnTarget(slot, q.ans, true, q);
              correctSpawnedRef.current = true;
            }
          } else {
            const freeSlots = Array.from({ length: SLOT_COUNT }, (_, i) => i).filter(s => !slotsOccupiedRef.current.has(s));
            if (freeSlots.length > 0 && Math.random() < 0.65) {
              const slot = freeSlots[~~(Math.random() * freeSlots.length)];
              const used2 = new Set<number>([q.ans]);
              const w = makeWrong(q.ans, used2);
              spawnTarget(slot, w, false, q);
            }
          }
        }

        // Update targets
        for (const t of targetsRef.current) {
          t.stateT += dt;
          t.wobble += dt * 2.4;
          for (const s of t.shards) {
            s.x += s.vx * dt; s.y += s.vy * dt;
            s.vy += 280 * dt;
            s.alpha -= dt * 2.2;
            s.angle += s.spin * dt;
          }
          t.shards = t.shards.filter(s => s.alpha > 0);

          if (t.state === "rising") {
            t.y += (t.targetY + TARGET_H - t.y) * Math.min(1, dt * 8);
            if (Math.abs(t.y - (t.targetY + TARGET_H)) < 2) { t.y = t.targetY + TARGET_H; t.state = "visible"; t.stateT = 0; }
          } else if (t.state === "visible") {
            if (t.stateT >= t.visibleFor) { t.state = "falling"; t.stateT = 0; if (t.correct) { comboRef.current = 0; } }
          } else if (t.state === "falling") {
            t.y += (BAR_Y - t.y) * Math.min(1, dt * 9);
            if (Math.abs(t.y - BAR_Y) < 3) {
              t.y = BAR_Y;
              t.state = "dead";
              slotsOccupiedRef.current.delete(t.slot);
              if (t.correct) {
                // Correct target escaped
                livesRef.current--;
                floatTextsRef.current.push({ x: t.x, y: BAR_Y - 30, txt: "⚠ Kabur!", alpha: 1, vy: -50, good: false });
                if (livesRef.current <= 0) { phaseRef.current = "dead"; rerender(); }
                // Respawn same question with correct answer
                correctSpawnedRef.current = false;
              }
            }
          } else if (t.state === "shot") {
            t.shotT += dt;
            t.y += dt * 120;
          }
        }
        targetsRef.current = targetsRef.current.filter(t => t.state !== "dead" && (t.state !== "shot" || t.shards.length > 0 || t.shotT < 0.5));

        // Dust particles
        for (const d of bgDustRef.current) {
          d.x += d.vx * dt; d.y += d.vy * dt;
          d.alpha -= dt * 0.08;
          if (d.y < -10 || d.alpha <= 0) {
            d.x = Math.random() * CW; d.y = CH + 5;
            d.alpha = 0.05 + Math.random() * 0.15;
            d.vx = (Math.random() - 0.5) * 12;
            d.vy = -3 - Math.random() * 8;
          }
        }

        // Crosshairs & muzzles
        for (const c of crosshairsRef.current) c.alpha -= dt * 3.5;
        crosshairsRef.current = crosshairsRef.current.filter(c => c.alpha > 0);
        for (const m of muzzlesRef.current) { m.alpha -= dt * 5; m.size += dt * 40; }
        muzzlesRef.current = muzzlesRef.current.filter(m => m.alpha > 0);

        for (const f of floatTextsRef.current) { f.y += f.vy * dt; f.alpha -= dt * 1.4; }
        floatTextsRef.current = floatTextsRef.current.filter(f => f.alpha > 0);
      }

      // ── Draw ──────────────────────────────────────────────────────────
      const sx = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 12 : 0;
      const sy = shakeRef.current > 0 ? (Math.random() - 0.5) * shakeRef.current * 5 : 0;
      ctx.save();
      ctx.translate(sx, sy);

      // Sky background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CH * 0.65);
      skyGrad.addColorStop(0, "#1a0d00");
      skyGrad.addColorStop(0.4, "#3d1e00");
      skyGrad.addColorStop(1, "#7a4010");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, CW, CH);

      // Stars in sky
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "#ffe8b0";
      for (let i = 0; i < 40; i++) {
        const sx2 = ((i * 137.5) % CW);
        const sy2 = ((i * 61.3) % (CH * 0.45));
        const r = 0.5 + (i % 3) * 0.5;
        ctx.beginPath(); ctx.arc(sx2, sy2, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Moon
      ctx.shadowBlur = 30; ctx.shadowColor = "#ffe8a0";
      ctx.fillStyle = "#ffe8a0";
      ctx.beginPath(); ctx.arc(CW - 70, 60, 26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#3d1e00";
      ctx.beginPath(); ctx.arc(CW - 60, 54, 22, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;

      // Desert ground below bar
      const groundGrad = ctx.createLinearGradient(0, BAR_Y, 0, CH);
      groundGrad.addColorStop(0, "#5c2d0a");
      groundGrad.addColorStop(1, "#3a1a03");
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, BAR_Y, CW, CH - BAR_Y);

      // Distant mountains / mesas
      ctx.fillStyle = "#2d1200";
      ctx.beginPath();
      ctx.moveTo(0, BAR_Y - 20);
      ctx.lineTo(40, BAR_Y - 90); ctx.lineTo(90, BAR_Y - 45);
      ctx.lineTo(160, BAR_Y - 110); ctx.lineTo(220, BAR_Y - 55);
      ctx.lineTo(290, BAR_Y - 130); ctx.lineTo(350, BAR_Y - 70);
      ctx.lineTo(420, BAR_Y - 100); ctx.lineTo(440, BAR_Y - 30);
      ctx.lineTo(440, BAR_Y); ctx.lineTo(0, BAR_Y);
      ctx.fill();

      // Cactus left
      drawCactus(ctx, 28, BAR_Y - 10);
      // Cactus right
      drawCactus(ctx, CW - 40, BAR_Y - 10);

      // Dust particles
      for (const d of bgDustRef.current) {
        ctx.globalAlpha = Math.max(0, d.alpha);
        ctx.fillStyle = "#d4a060";
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Bar counter top
      ctx.shadowBlur = 8; ctx.shadowColor = "#8b4a1a";
      const barTop = ctx.createLinearGradient(0, BAR_Y, 0, BAR_Y + 22);
      barTop.addColorStop(0, "#c07840");
      barTop.addColorStop(0.3, "#8b4a1a");
      barTop.addColorStop(1, "#5c2d0a");
      ctx.fillStyle = barTop;
      roundRect(ctx, 0, BAR_Y, CW, 22, 4);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Bar wood planks
      ctx.fillStyle = "#7a3a10";
      for (let i = 1; i < 5; i++) {
        ctx.fillRect(0, BAR_Y + 22 + i * (CH - BAR_Y - 22) / 5 - 1, CW, 2);
      }

      // Bar highlight line
      ctx.strokeStyle = "#e0a060";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;
      ctx.beginPath(); ctx.moveTo(0, BAR_Y + 3); ctx.lineTo(CW, BAR_Y + 3); ctx.stroke();
      ctx.globalAlpha = 1;

      // Slot markers
      for (let i = 0; i < SLOT_COUNT; i++) {
        const slotX = TARGET_W / 2 + i * TARGET_SPACING;
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        roundRect(ctx, slotX - TARGET_W / 2 + 4, BAR_Y + 4, TARGET_W - 8, 8, 3);
        ctx.fill();
      }

      // HUD bar
      const hudGrad = ctx.createLinearGradient(0, 0, CW, 0);
      hudGrad.addColorStop(0, "rgba(20,8,0,0.95)");
      hudGrad.addColorStop(1, "rgba(40,12,0,0.95)");
      ctx.fillStyle = hudGrad;
      ctx.fillRect(0, 0, CW, 118);

      // HUD border
      ctx.strokeStyle = "#8b4a1a";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 118); ctx.lineTo(CW, 118); ctx.stroke();

      if (phase === "playing") {
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 11px 'Orbitron', monospace";
        ctx.fillStyle = "#d4a060";
        ctx.shadowBlur = 0;
        ctx.fillText("Tembak target dengan jawaban BENAR! 🤠", CW / 2, 16);

        ctx.shadowBlur = 22; ctx.shadowColor = "#ffc94a";
        ctx.fillStyle = "#ffc94a";
        ctx.font = "bold 30px 'Orbitron', monospace";
        ctx.fillText(currentQRef.current.q, CW / 2, 55);
        ctx.shadowBlur = 0;

        ctx.textAlign = "left";
        ctx.font = "bold 12px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a"; ctx.shadowBlur = 8; ctx.shadowColor = "#ffc94a";
        ctx.fillText(`⭐ ${scoreRef.current}`, 10, 88);

        ctx.textAlign = "right";
        ctx.fillStyle = "#ff5e87"; ctx.shadowColor = "#ff5e87";
        ctx.fillText(`❤️ ${"♥".repeat(Math.max(0, livesRef.current))}`, CW - 10, 88);

        ctx.textAlign = "center";
        ctx.font = "bold 10px 'Orbitron', monospace";
        ctx.fillStyle = "#d4a060";
        ctx.fillText(`LEVEL ${levelRef.current}`, CW / 2, 88);
        ctx.shadowBlur = 0;

        const tFrac = timerRef.current / 60;
        const tCol = `hsl(${tFrac * 120}, 100%, 55%)`;
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect(0, 112, CW, 6);
        ctx.fillStyle = tCol; ctx.shadowBlur = 8; ctx.shadowColor = tCol;
        ctx.fillRect(0, 112, CW * tFrac, 6);
        ctx.shadowBlur = 0;
      }

      // ── Draw Targets ──────────────────────────────────────────────────
      for (const t of targetsRef.current) {
        // Shards
        for (const s of t.shards) {
          ctx.globalAlpha = Math.max(0, s.alpha);
          ctx.fillStyle = s.color;
          ctx.shadowBlur = 6; ctx.shadowColor = s.color;
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.angle);
          roundRect(ctx, -s.r, -s.r, s.r * 2, s.r * 2, 2);
          ctx.fill();
          ctx.restore();
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;

        if (t.state === "dead" || t.state === "shot") continue;

        const drawX = t.x - TARGET_W / 2;
        const drawY = t.y - TARGET_H;
        const wobbleX = Math.sin(t.wobble) * (t.state === "visible" ? 2 : 0);

        ctx.save();
        ctx.translate(wobbleX, 0);

        if (t.type === "bottle") {
          drawBottle(ctx, drawX, drawY, TARGET_W, TARGET_H, t.color, t.correct, t.value, ts);
        } else if (t.type === "can") {
          drawCan(ctx, drawX, drawY, TARGET_W, TARGET_H, t.color, t.correct, t.value, ts);
        } else {
          drawStar(ctx, drawX, drawY, TARGET_W, TARGET_H, t.color, t.correct, t.value, ts);
        }

        ctx.restore();
      }

      // Muzzle flashes
      for (const m of muzzlesRef.current) {
        ctx.globalAlpha = Math.max(0, m.alpha);
        ctx.strokeStyle = "#ffea00";
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20; ctx.shadowColor = "#ffea00";
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          ctx.beginPath();
          ctx.moveTo(m.x + Math.cos(a) * m.size * 0.3, m.y + Math.sin(a) * m.size * 0.3);
          ctx.lineTo(m.x + Math.cos(a) * m.size, m.y + Math.sin(a) * m.size);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // Crosshairs
      for (const c of crosshairsRef.current) {
        ctx.globalAlpha = Math.max(0, c.alpha);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1.5;
        const r = 14;
        ctx.shadowBlur = 8; ctx.shadowColor = "#fff";
        ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(c.x - r - 5, c.y); ctx.lineTo(c.x + r + 5, c.y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(c.x, c.y - r - 5); ctx.lineTo(c.x, c.y + r + 5); ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // Float texts
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

      // Overlay screens
      if (phase === "idle") {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 28px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a";
        ctx.shadowBlur = 28; ctx.shadowColor = "#ffc94a";
        ctx.fillText("🤠 WESTERN BAR", CW / 2, CH / 2 - 65);
        ctx.shadowBlur = 0;
        ctx.font = "bold 13px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fillText("Tembak target dengan jawaban BENAR!", CW / 2, CH / 2 - 15);
        ctx.font = "bold 11px 'Orbitron', monospace";
        ctx.fillStyle = "rgba(255,220,150,0.6)";
        ctx.fillText("Target kabur = hilang nyawa!", CW / 2, CH / 2 + 15);
        ctx.font = "bold 14px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a";
        ctx.shadowBlur = 14; ctx.shadowColor = "#ffc94a";
        ctx.fillText("[ Klik untuk Mulai ]", CW / 2, CH / 2 + 58);
        ctx.shadowBlur = 0;
        if (bestRef.current > 0) {
          ctx.font = "bold 11px 'Orbitron', monospace";
          ctx.fillStyle = "rgba(255,255,255,0.4)";
          ctx.fillText(`Rekor: ${bestRef.current}`, CW / 2, CH / 2 + 90);
        }
      }

      if (phase === "dead") {
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, CW, CH);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 26px 'Orbitron', monospace";
        ctx.fillStyle = "#ff5e87";
        ctx.shadowBlur = 26; ctx.shadowColor = "#ff5e87";
        ctx.fillText("GAME OVER, COWBOY!", CW / 2, CH / 2 - 55);
        ctx.shadowBlur = 0;
        ctx.font = "bold 20px 'Orbitron', monospace";
        ctx.fillStyle = "#ffc94a"; ctx.shadowBlur = 14; ctx.shadowColor = "#ffc94a";
        ctx.fillText(`Skor: ${scoreRef.current}`, CW / 2, CH / 2 - 10);
        ctx.shadowBlur = 0;
        if (bestRef.current > 0) {
          ctx.font = "bold 12px 'Orbitron', monospace";
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
  }, [spawnBgDust, rerender, spawnTarget]);

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
          <span className="font-display text-sm text-accent">🤠 Western Bar</span>
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
          onClick={handleCanvasClick}
          onTouchStart={(e) => { e.preventDefault(); handleCanvasClick(e); }}
          className="rounded-2xl border border-white/10 shadow-2xl cursor-crosshair"
          style={{ maxWidth: "96vw", maxHeight: "calc(100dvh - 90px)", aspectRatio: `${CW}/${CH}` }}
        />
        <p className="text-white/30 text-xs font-body text-center max-w-xs">
          Tembak target yang menampilkan jawaban benar! Jangan sampai target kabur!
        </p>
      <GuruQuizOverlay {...guruQuiz} />
      </div>
    </div>
  );
};

// ── Drawing helpers ──────────────────────────────────────────────────────────

function drawBottle(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, correct: boolean, value: number, ts: number) {
  const cx = x + w / 2;
  const pulse = correct ? 0.8 + 0.2 * Math.sin(ts / 300) : 1;

  ctx.shadowBlur = correct ? 22 * pulse : 10;
  ctx.shadowColor = correct ? "#ffc94a" : color;

  // Bottle shape
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, lightenColor(color, 0.3));
  grad.addColorStop(0.5, color);
  grad.addColorStop(1, darkenColor(color, 0.35));
  ctx.fillStyle = grad;

  // Neck
  ctx.beginPath();
  ctx.moveTo(cx - 8, y + h * 0.12);
  ctx.lineTo(cx - 10, y + h * 0.4);
  ctx.lineTo(cx - 18, y + h * 0.42);
  ctx.lineTo(cx - 18, y + h);
  ctx.lineTo(cx + 18, y + h);
  ctx.lineTo(cx + 18, y + h * 0.42);
  ctx.lineTo(cx + 10, y + h * 0.4);
  ctx.lineTo(cx + 8, y + h * 0.12);
  ctx.closePath();
  ctx.fill();

  // Cap
  ctx.fillStyle = correct ? "#ffc94a" : "#888";
  ctx.beginPath();
  roundRect(ctx, cx - 7, y, 14, h * 0.14, 3);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Shine
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.beginPath();
  ctx.ellipse(cx - 5, y + h * 0.6, 4, h * 0.12, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Correct indicator
  if (correct) {
    ctx.strokeStyle = "#ffc94a";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 14; ctx.shadowColor = "#ffc94a";
    ctx.beginPath();
    roundRect(ctx, x + 1, y + 1, w - 2, h - 2, 6);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Value text
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = `bold ${value > 99 ? 12 : 14}px 'Orbitron', monospace`;
  ctx.fillStyle = "#fff";
  ctx.shadowBlur = 5; ctx.shadowColor = "#000";
  ctx.fillText(String(value), cx, y + h * 0.68);
  ctx.shadowBlur = 0;
}

function drawCan(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, correct: boolean, value: number, ts: number) {
  const cx = x + w / 2;
  const pulse = correct ? 0.8 + 0.2 * Math.sin(ts / 280) : 1;

  ctx.shadowBlur = correct ? 22 * pulse : 10;
  ctx.shadowColor = correct ? "#ffc94a" : color;

  const grad = ctx.createLinearGradient(x + 6, y, x + w - 6, y);
  grad.addColorStop(0, darkenColor(color, 0.3));
  grad.addColorStop(0.3, lightenColor(color, 0.4));
  grad.addColorStop(0.7, color);
  grad.addColorStop(1, darkenColor(color, 0.3));
  ctx.fillStyle = grad;
  roundRect(ctx, cx - 18, y + h * 0.1, 36, h * 0.82, 5);
  ctx.fill();

  // Top/bottom caps
  ctx.fillStyle = darkenColor(color, 0.2);
  roundRect(ctx, cx - 18, y + h * 0.06, 36, h * 0.1, 3);
  ctx.fill();
  roundRect(ctx, cx - 18, y + h * 0.86, 36, h * 0.1, 3);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Stripe
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(cx - 18, y + h * 0.35, 36, h * 0.18);

  if (correct) {
    ctx.strokeStyle = "#ffc94a";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 14; ctx.shadowColor = "#ffc94a";
    roundRect(ctx, cx - 19, y + h * 0.09, 38, h * 0.84, 5);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = `bold ${value > 99 ? 12 : 14}px 'Orbitron', monospace`;
  ctx.fillStyle = "#fff";
  ctx.shadowBlur = 5; ctx.shadowColor = "#000";
  ctx.fillText(String(value), cx, y + h * 0.5);
  ctx.shadowBlur = 0;
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, correct: boolean, value: number, ts: number) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = Math.min(w, h) / 2 - 4;
  const pulse = correct ? 0.8 + 0.2 * Math.sin(ts / 250) : 1;

  ctx.shadowBlur = correct ? 28 * pulse : 12;
  ctx.shadowColor = correct ? "#ffc94a" : color;

  ctx.fillStyle = correct ? "#ffc94a" : color;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + (ts / 2000) * (correct ? 1 : 0);
    const aInner = a + Math.PI / 5;
    if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    else ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.lineTo(cx + Math.cos(aInner) * r * 0.42, cy + Math.sin(aInner) * r * 0.42);
  }
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = `bold ${value > 99 ? 11 : 13}px 'Orbitron', monospace`;
  ctx.fillStyle = correct ? "#000" : "#fff";
  ctx.shadowBlur = 4; ctx.shadowColor = correct ? "transparent" : "#000";
  ctx.fillText(String(value), cx, cy);
  ctx.shadowBlur = 0;
}

function drawCactus(ctx: CanvasRenderingContext2D, cx: number, baseY: number) {
  ctx.fillStyle = "#1a5c20";
  ctx.shadowBlur = 5; ctx.shadowColor = "#1a5c20";
  // Trunk
  roundRect(ctx, cx - 5, baseY - 55, 10, 55, 4);
  ctx.fill();
  // Left arm
  roundRect(ctx, cx - 20, baseY - 38, 15, 8, 3);
  ctx.fill();
  roundRect(ctx, cx - 22, baseY - 50, 8, 18, 3);
  ctx.fill();
  // Right arm
  roundRect(ctx, cx + 5, baseY - 28, 15, 8, 3);
  ctx.fill();
  roundRect(ctx, cx + 14, baseY - 42, 8, 20, 3);
  ctx.fill();
  ctx.shadowBlur = 0;
}

function lightenColor(color: string, amt: number): string {
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgb(${Math.min(255, r + amt * 200)},${Math.min(255, g + amt * 200)},${Math.min(255, b + amt * 200)})`;
  }
  return color;
}
function darkenColor(color: string, amt: number): string {
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgb(${Math.max(0, r - amt * 200)},${Math.max(0, g - amt * 200)},${Math.max(0, b - amt * 200)})`;
  }
  return color;
}

export default WesternBarPage;
