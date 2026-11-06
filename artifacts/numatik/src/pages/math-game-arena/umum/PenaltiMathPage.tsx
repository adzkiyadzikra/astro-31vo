import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { ArrowLeft, RotateCcw, Trophy, Goal as GoalIcon, Target as TargetIcon } from "lucide-react";

type Phase = "idle" | "aiming" | "kicking" | "result" | "gameover";
type ZoneId = 0 | 1 | 2;

interface MQ { q: string; ans: number; }

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

const makeQ = (level: number): MQ => {
  const t = Math.floor(Math.random() * (level >= 3 ? 8 : 5));
  switch (t) {
    case 0: { const a = 5 + Math.floor(Math.random() * (10 + level * 5)); const b = 2 + Math.floor(Math.random() * (8 + level * 2)); return { q: `${a} × ${b}`, ans: a * b }; }
    case 1: { const a = 20 + Math.floor(Math.random() * (50 + level * 30)); const b = 15 + Math.floor(Math.random() * (40 + level * 20)); return { q: `${a} + ${b}`, ans: a + b }; }
    case 2: { const b = 10 + Math.floor(Math.random() * (30 + level * 10)); const a = b + 10 + Math.floor(Math.random() * (40 + level * 15)); return { q: `${a} − ${b}`, ans: a - b }; }
    case 3: { const b = 2 + Math.floor(Math.random() * (6 + level)); const k = 2 + Math.floor(Math.random() * (8 + level)); return { q: `${a(b, k)} ÷ ${b}`, ans: k }; }
    case 4: { const sqList = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225]; const sq = sqList[Math.floor(Math.random() * sqList.length)]; return { q: `√${sq}`, ans: Math.round(Math.sqrt(sq)) }; }
    case 5: { const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; const a = bases[Math.floor(Math.random() * bases.length)]; return { q: `${a}²`, ans: a * a }; }
    case 6: { const a = 2 + Math.floor(Math.random() * 10); const b = 2 + Math.floor(Math.random() * 10); return { q: `KPK(${a},${b})`, ans: (a * b) / gcd(a, b) }; }
    default: { const a = 2 + Math.floor(Math.random() * 9); const b = 2 + Math.floor(Math.random() * 9); return { q: `${a}² − ${b}`, ans: a * a - b }; }
  }
};

// helper to keep tsc happy in case 3 above
function a(b: number, k: number) { return b * k; }

const makeWrong = (ans: number, used: Set<number>): number => {
  let v = 0; let tries = 0;
  do {
    const d = 1 + Math.floor(Math.random() * Math.max(5, Math.floor(ans * 0.2)));
    v = ans + (Math.random() < 0.5 ? d : -d);
    tries++;
  } while ((used.has(v) || v < 0) && tries < 80);
  return v < 0 ? ans + 1 + Math.floor(Math.random() * 10) : v;
};

interface Confetti { x: number; y: number; vx: number; vy: number; rot: number; vr: number; color: string; alpha: number; size: number; }

const COLORS = ["#22d3ee", "#f472b6", "#a78bfa", "#facc15", "#34d399", "#fb7185", "#60a5fa"];

const PenaltiMathPage = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => Number(localStorage.getItem("penalti-math-best-streak") || 0));
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("penalti-math-highscore") || 0));
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState<MQ>(() => makeQ(1));
  const [options, setOptions] = useState<number[]>([0, 0, 0]);
  const [correctZone, setCorrectZone] = useState<ZoneId>(0);
  const [pickedZone, setPickedZone] = useState<ZoneId | null>(null);
  const [keeperZone, setKeeperZone] = useState<ZoneId | null>(null);
  const [resultText, setResultText] = useState<{ title: string; sub: string; good: boolean } | null>(null);

  const ballRef = useRef<HTMLDivElement>(null);
  const keeperRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<Confetti[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  const TOTAL_SHOTS = 8;

  // Build a fresh question + 3 options
  const newQuestion = useCallback((lv: number) => {
    const q = makeQ(lv);
    const used = new Set<number>([q.ans]);
    const w1 = makeWrong(q.ans, used); used.add(w1);
    const w2 = makeWrong(q.ans, used); used.add(w2);
    const correct: ZoneId = Math.floor(Math.random() * 3) as ZoneId;
    const opts = [0, 0, 0];
    let wi = 0;
    const wrongs = [w1, w2];
    for (let i = 0; i < 3; i++) {
      if (i === correct) opts[i] = q.ans;
      else { opts[i] = wrongs[wi++]; }
    }
    setQuestion(q);
    setOptions(opts);
    setCorrectZone(correct);
    setPickedZone(null);
    setKeeperZone(null);
    setResultText(null);
  }, []);

  const startGame = () => {
    playPopSound();
    setScore(0);
    setShots(0);
    setStreak(0);
    setLevel(1);
    setPhase("aiming");
    newQuestion(1);
  };

  const handleKick = (zone: ZoneId) => {
    if (phase !== "aiming") return;
    playPopSound();
    setPickedZone(zone);
    setPhase("kicking");

    // Keeper choice — bias to make game fair: if too easy, increase block chance
    // Smarter keeper at higher level
    const blockChance = Math.min(0.55, 0.2 + level * 0.05);
    let keeperPick: ZoneId;
    if (Math.random() < blockChance) {
      keeperPick = zone; // dives same direction
    } else {
      const others: ZoneId[] = ([0, 1, 2] as ZoneId[]).filter((z) => z !== zone) as ZoneId[];
      keeperPick = others[Math.floor(Math.random() * others.length)];
    }

    // Animate after a tiny delay so React mounts the picked state
    requestAnimationFrame(() => {
      setKeeperZone(keeperPick);
    });

    setTimeout(() => {
      const isCorrect = zone === correctZone;
      const blocked = keeperPick === zone;
      const goal = isCorrect && !blocked;

      let newScore = score;
      let newStreak = streak;
      if (goal) {
        newScore = score + 100 + streak * 10;
        newStreak = streak + 1;
        spawnConfetti();
      } else {
        newStreak = 0;
      }
      const newShots = shots + 1;
      setScore(newScore);
      setStreak(newStreak);
      setShots(newShots);

      if (newStreak > bestStreak) { setBestStreak(newStreak); localStorage.setItem("penalti-math-best-streak", String(newStreak)); }

      let title = ""; let sub = ""; let good = false;
      if (goal) { title = "GOOOLLL!"; sub = `Mantap! +${100 + (newStreak - 1) * 10} poin`; good = true; }
      else if (!isCorrect) { title = "Jawaban Salah"; sub = `Yang benar: ${question.q} = ${question.ans}`; good = false; }
      else { title = "DITEPIS KIPER!"; sub = "Jawabanmu benar, tapi kiper menebak arah!"; good = false; }

      setResultText({ title, sub, good });
      setPhase("result");

      // Check end
      if (newShots >= TOTAL_SHOTS) {
        setTimeout(() => {
          if (newScore > highScore) { setHighScore(newScore); localStorage.setItem("penalti-math-highscore", String(newScore)); }
          setPhase("gameover");
        }, 1500);
      } else {
        // Level up after every 3 shots
        const newLevel = Math.min(5, Math.floor(newShots / 3) + 1);
        setLevel(newLevel);
        setTimeout(() => {
          setPhase("aiming");
          newQuestion(newLevel);
        }, 1500);
      }
    }, 850);
  };

  // Confetti animation
  const spawnConfetti = () => {
    const c = canvasRef.current;
    if (!c) return;
    const w = c.width;
    for (let i = 0; i < 80; i++) {
      confettiRef.current.push({
        x: w / 2 + (Math.random() - 0.5) * 120,
        y: 80 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 6,
        vy: -3 - Math.random() * 4,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        size: 4 + Math.random() * 6,
      });
    }
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const arr = confettiRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.vy += 0.18;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.alpha -= 0.008;
        if (p.alpha <= 0 || p.y > c.height + 20) { arr.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "aiming") return;
      if (e.key === "1" || e.key === "ArrowLeft") handleKick(0);
      else if (e.key === "2" || e.key === "ArrowUp") handleKick(1);
      else if (e.key === "3" || e.key === "ArrowRight") handleKick(2);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, handleKick]);

  // Ball position (relative to field) based on phase
  const ballStyle = useMemo<React.CSSProperties>(() => {
    if (phase === "kicking" || phase === "result") {
      const targets: Record<ZoneId, { left: string; top: string }> = {
        0: { left: "18%", top: "18%" },
        1: { left: "50%", top: "12%" },
        2: { left: "82%", top: "18%" },
      };
      const z = pickedZone ?? 1;
      return {
        left: targets[z].left,
        top: targets[z].top,
        transform: "translate(-50%, -50%) scale(0.7)",
        transition: "left 0.7s cubic-bezier(.5,.1,.9,.6), top 0.7s cubic-bezier(.4,.1,.6,1.4), transform 0.7s ease",
      };
    }
    return {
      left: "50%",
      top: "85%",
      transform: "translate(-50%, -50%) scale(1)",
      transition: "left 0.4s ease, top 0.4s ease, transform 0.4s ease",
    };
  }, [phase, pickedZone]);

  const keeperStyle = useMemo<React.CSSProperties>(() => {
    const positions: Record<ZoneId, string> = { 0: "30%", 1: "50%", 2: "70%" };
    const z = keeperZone;
    if (z === null) {
      return {
        left: "50%",
        top: "30%",
        transform: "translate(-50%, -50%)",
        transition: "left 0.4s ease, top 0.4s ease, transform 0.4s ease",
      };
    }
    return {
      left: positions[z],
      top: z === 1 ? "26%" : "30%",
      transform: `translate(-50%, -50%) ${z === 0 ? "rotate(-25deg)" : z === 2 ? "rotate(25deg)" : ""}`,
      transition: "left 0.4s ease, top 0.4s ease, transform 0.4s ease",
    };
  }, [keeperZone]);

  const zoneLabels = ["KIRI", "TENGAH", "KANAN"];

  return (
    <div className="relative min-h-screen gradient-space overflow-hidden text-white">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/numatik-game" />

      <div className="relative z-10 max-w-md mx-auto px-3 pt-20 pb-12">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-100 mb-2">
            <GoalIcon className="w-3 h-3" /> Penalty Shootout
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-emerald-300 leading-tight" style={{ textShadow: "0 0 20px rgba(52,211,153,0.6)" }}>
            TENDANGAN PENALTI MATH
          </h1>
          <p className="text-white/55 text-[11px] mt-1 font-body">Pilih sudut dengan jawaban benar untuk mencetak gol!</p>
        </div>

        {/* HUD */}
        <div className="grid grid-cols-4 gap-2 mb-3 text-center">
          <div className="bg-black/40 border border-white/10 rounded-lg py-1.5">
            <div className="text-[9px] text-white/50 uppercase">Skor</div>
            <div className="text-emerald-300 font-bold text-sm">{score}</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg py-1.5">
            <div className="text-[9px] text-white/50 uppercase">Tendangan</div>
            <div className="text-cyan-300 font-bold text-sm">{shots}/{TOTAL_SHOTS}</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg py-1.5">
            <div className="text-[9px] text-white/50 uppercase">Streak</div>
            <div className="text-amber-300 font-bold text-sm">🔥{streak}</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg py-1.5">
            <div className="text-[9px] text-white/50 uppercase">Level</div>
            <div className="text-fuchsia-300 font-bold text-sm">{level}</div>
          </div>
        </div>

        {/* Field */}
        <div className="relative w-full overflow-hidden rounded-2xl border-2 border-white/20" style={{ aspectRatio: "9 / 14" }}>
          {/* Sky / stadium */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, #0f172a 0%, #1e293b 28%, #166534 38%, #16a34a 100%)"
          }} />
          {/* Stadium lights glow */}
          <div className="absolute top-0 left-1/4 w-32 h-12 bg-yellow-200/15 blur-2xl rounded-full" />
          <div className="absolute top-0 right-1/4 w-32 h-12 bg-yellow-200/15 blur-2xl rounded-full" />

          {/* Goal posts */}
          <div className="absolute" style={{ top: "8%", left: "10%", right: "10%", height: "30%" }}>
            {/* Net background */}
            <div className="absolute inset-0 rounded-t-md overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.07)",
                backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 14px)`,
                border: "4px solid #ffffff",
                borderBottom: "none",
                boxShadow: "0 0 24px rgba(255,255,255,0.2)",
              }}
            />
            {/* Three target zones */}
            {[0, 1, 2].map((z) => {
              const pos = ["8%", "36%", "64%"][z];
              const isCorrect = z === correctZone && phase === "result";
              const isPicked = pickedZone === z;
              const isWrong = phase === "result" && z !== correctZone && isPicked;
              return (
                <button
                  key={z}
                  disabled={phase !== "aiming"}
                  onClick={() => handleKick(z as ZoneId)}
                  className={`absolute flex flex-col items-center justify-center transition-all duration-200 ${phase === "aiming" ? "hover:scale-105 cursor-pointer" : "cursor-default"}`}
                  style={{
                    left: pos,
                    top: "8%",
                    width: "28%",
                    height: "60%",
                    background: isCorrect
                      ? "rgba(34,197,94,0.35)"
                      : isWrong
                      ? "rgba(239,68,68,0.35)"
                      : isPicked
                      ? "rgba(59,130,246,0.30)"
                      : phase === "aiming"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.03)",
                    border: `2px ${isCorrect || isWrong || isPicked ? "solid" : "dashed"} ${isCorrect ? "#22c55e" : isWrong ? "#ef4444" : isPicked ? "#60a5fa" : "rgba(255,255,255,0.35)"}`,
                    borderRadius: "8px",
                    boxShadow: isCorrect ? "0 0 20px rgba(34,197,94,0.8)" : isWrong ? "0 0 20px rgba(239,68,68,0.6)" : "none",
                  }}
                >
                  <span className="font-display text-base sm:text-xl font-bold text-white" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>
                    {options[z]}
                  </span>
                  <span className="text-[9px] text-white/70 mt-0.5 uppercase tracking-wider">
                    {zoneLabels[z]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Penalty spot */}
          <div className="absolute w-3 h-3 rounded-full bg-white" style={{ left: "50%", top: "85%", transform: "translate(-50%, -50%)" }} />
          {/* Penalty arc */}
          <div className="absolute" style={{ left: "30%", right: "30%", top: "62%", height: "12%", borderTop: "2px solid rgba(255,255,255,0.5)", borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />

          {/* Goalkeeper */}
          <div ref={keeperRef} className="absolute" style={keeperStyle}>
            <div className="relative" style={{ width: 44, height: 56 }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-5 h-5 rounded-full" style={{ background: "#fde68a", border: "2px solid #1e293b" }} />
              <div className="absolute left-1/2 top-4 -translate-x-1/2 w-7 h-9 rounded" style={{ background: "linear-gradient(to bottom, #f97316, #c2410c)", border: "2px solid #1e293b" }} />
              <div className="absolute left-0 top-6 w-2 h-7 rounded" style={{ background: "#f97316", border: "2px solid #1e293b" }} />
              <div className="absolute right-0 top-6 w-2 h-7 rounded" style={{ background: "#f97316", border: "2px solid #1e293b" }} />
            </div>
          </div>

          {/* Ball */}
          <div ref={ballRef} className="absolute" style={ballStyle}>
            <div className="relative w-7 h-7 rounded-full shadow-xl" style={{
              background: "radial-gradient(circle at 30% 30%, #ffffff 0%, #e2e8f0 60%, #94a3b8 100%)",
              border: "1.5px solid #1e293b",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5), inset -2px -3px 6px rgba(0,0,0,0.2)",
            }}>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700">⬢</div>
            </div>
          </div>

          {/* Confetti canvas overlay */}
          <canvas ref={canvasRef} width={400} height={620} className="absolute inset-0 pointer-events-none w-full h-full" />

          {/* Question banner */}
          {phase !== "idle" && phase !== "gameover" && (
            <div className="absolute left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur border border-white/20 rounded-xl px-4 py-2 text-center" style={{ top: "47%" }}>
              <div className="text-[9px] uppercase tracking-widest text-white/50 mb-0.5">Soal</div>
              <div className="text-white font-display text-xl font-bold">{question.q}</div>
            </div>
          )}

          {/* Result toast */}
          {resultText && phase === "result" && (
            <div className="absolute left-1/2 -translate-x-1/2 z-10 animate-slide-up" style={{ top: "70%" }}>
              <div className={`px-5 py-3 rounded-xl border-2 backdrop-blur text-center ${
                resultText.good
                  ? "bg-emerald-500/30 border-emerald-300 text-emerald-50"
                  : "bg-rose-500/30 border-rose-300 text-rose-50"
              }`}>
                <div className="font-display text-xl font-black tracking-wider">{resultText.title}</div>
                <div className="text-xs mt-1 opacity-90">{resultText.sub}</div>
              </div>
            </div>
          )}

          {/* Idle overlay */}
          {phase === "idle" && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur flex flex-col items-center justify-center px-6 text-center">
              <GoalIcon className="w-12 h-12 text-emerald-300 mb-3" />
              <h2 className="font-display text-xl font-bold text-emerald-200 mb-2">Siap Menendang?</h2>
              <p className="text-white/70 text-xs mb-4 leading-relaxed">
                Hitung soalnya, lalu pilih sudut gawang dengan jawaban benar.
                Awas kiper tebak arah!
              </p>
              <ul className="text-white/60 text-[11px] mb-4 space-y-0.5">
                <li>🎯 8 tendangan, level naik tiap 3 tendangan</li>
                <li>🔥 Streak = bonus poin</li>
                <li>⌨️ Bisa pakai tombol ◀ ▲ ▶ atau 1 / 2 / 3</li>
              </ul>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-display font-bold text-sm shadow-lg transition-transform hover:scale-105"
              >
                MULAI TENDANGAN
              </button>
            </div>
          )}

          {/* Game over overlay */}
          {phase === "gameover" && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur flex flex-col items-center justify-center px-6 text-center">
              <Trophy className="w-12 h-12 text-amber-300 mb-3" />
              <h2 className="font-display text-2xl font-bold text-amber-200 mb-1">Pertandingan Selesai!</h2>
              <p className="text-white/70 text-xs mb-4">Cek hasil tendangan kamu di bawah</p>
              <div className="grid grid-cols-2 gap-3 mb-5 w-full max-w-xs">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-[10px] text-white/50">Skor Akhir</div>
                  <div className="text-emerald-300 text-2xl font-bold">{score}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-[10px] text-white/50">Streak Terbaik</div>
                  <div className="text-amber-300 text-2xl font-bold">🔥{bestStreak}</div>
                </div>
                <div className="col-span-2 bg-white/10 rounded-lg p-3">
                  <div className="text-[10px] text-white/50">Skor Tertinggi</div>
                  <div className="text-cyan-300 text-2xl font-bold">{Math.max(score, highScore)}</div>
                </div>
              </div>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-display font-bold text-sm shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> MAIN LAGI
              </button>
            </div>
          )}
        </div>

        {/* Hint */}
        {phase === "aiming" && (
          <div className="mt-3 text-center text-white/55 text-[11px] font-body flex items-center justify-center gap-1">
            <TargetIcon className="w-3 h-3" /> Tap salah satu sudut gawang!
          </div>
        )}

        {/* Bottom nav */}
        <div className="mt-5 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/ruang-untuk-guru/numatik-game"); }}
            className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-emerald-300 transition-colors font-body"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Numatik Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenaltiMathPage;
