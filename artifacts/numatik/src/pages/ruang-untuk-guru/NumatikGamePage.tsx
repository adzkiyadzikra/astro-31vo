import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Layers,
  Zap,
  Cuboid,
  Rocket,
  Worm,
  Crosshair,
  Swords,
  Plane,
  Circle,
  Target,
  Disc,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const games = [
  {
    label: "Turtle Run Math",
    emoji: "🐢",
    path: "/math-game-arena/umum/dino-run",
    desc: "Loncat dan tiarap hindari rintangan! Jawab soal untuk bonus skor!",
    icon: <Zap className="w-7 h-7 text-green-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Flappy Rocket",
    emoji: "🚀",
    path: "/math-game-arena/umum/flappy-rocket",
    desc: "Terbangkan roket melewati gerbang neon! Gerbang emas = soal bonus!",
    icon: <Rocket className="w-7 h-7 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Shoot Tank",
    emoji: "💥",
    path: "/math-game-arena/umum/tembak-tank",
    desc: "Arahkan meriam dan hancurkan target dengan jawaban matematika!",
    icon: <Swords className="w-7 h-7 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Space Impact Math",
    emoji: "🛩️",
    path: "/math-game-arena/umum/space-impact",
    desc: "Tembak alien yang membawa jawaban benar, kumpulkan power-up!",
    icon: <Plane className="w-7 h-7 text-cyan-300 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Meteor Pantul NUMATIK",
    emoji: "🛸☄️",
    path: "/math-game-arena/umum/pecah-jawaban",
    desc: "Pantulkan meteor untuk menghancurkan kristal jawaban benar!",
    icon: <Disc className="w-7 h-7 text-red-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Tetris Numatik",
    emoji: "🧩",
    path: "/math-game-arena/umum/tetris",
    desc: "Susun blok warna-warni, kumpulkan skor tertinggi dan naiki level!",
    icon: <Layers className="w-7 h-7 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Snake Matematika",
    emoji: "🐍",
    path: "/math-game-arena/umum/snake-math",
    desc: "Arahkan ular ke jawaban yang benar! Salah → memendek, benar → makin panjang!",
    icon: <Worm className="w-7 h-7 text-lime-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Numatik Strike",
    emoji: "",
    path: "/math-game-arena/umum/numatik-strike",
    desc: "Siap beraksi? Masuki arena 3D, bidik jitu, dan hadapi para teroris!",
    icon: (
      <span className="relative inline-flex w-7 h-7 shrink-0 text-cyan-300 group-hover:scale-110 transition-transform">
        <Cuboid className="absolute inset-0 w-7 h-7" />
        <Crosshair className="absolute left-1/2 top-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 text-white" />
      </span>
    ),
  },
  {
    label: "NUMATIK WORLD",
    emoji: "🌈",
    path: "/math-game-arena/umum/numatik-world",
    desc: "Jelajahi pulau 3D, lompat, kumpulkan kristal, dan jawab soal matematika!",
    icon: <Sparkles className="w-7 h-7 text-amber-300 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Galaksi Tempur",
    emoji: "🌌",
    path: "/math-game-arena/umum/asteroid-blaster",
    desc: "Tembak pesawat musuh dan jawablah pertanyaan matematika yang muncul",
    icon: <Crosshair className="w-7 h-7 text-violet-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Zum Math",
    emoji: "🔮",
    path: "/math-game-arena/umum/zuma-math",
    desc: "Tembak bola ke rantai untuk membuat kluster dan jawab soal!",
    icon: <Circle className="w-7 h-7 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
  {
    label: "Spider Math",
    emoji: "👾",
    path: "/math-game-arena/umum/pacman-math",
    desc: "Telan pelet jawaban benar, hindari hantu, dan kuasai labirin!",
    icon: <Target className="w-7 h-7 text-yellow-400 shrink-0 group-hover:scale-110 transition-transform" />,
  },
];

const NumatikGamePage = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    playPopSound();
    navigate(path);
  };

  return (
    <div className="relative min-h-screen gradient-space overflow-x-hidden text-white">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-14">

        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100 mb-4">
            <GraduationCap className="w-4 h-4" />
            Ruang untuk Guru
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary text-glow-cyan leading-tight">
            NUMATIK GAME
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/70 max-w-2xl mx-auto font-body">
            Koleksi lengkap game matematika interaktif NUMATIK. Gunakan sebagai media pembelajaran yang menyenangkan dan memotivasi siswa di kelas!
          </p>
        </div>

        <div className="rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/8 to-violet-500/10 p-5 mb-8 backdrop-blur text-center">
          <p className="text-sm text-white/65 font-body">
            <span className="text-cyan-300 font-bold">{games.length} game</span> tersedia &mdash; klik untuk langsung bermain bersama siswa
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {games.map((game, i) => (
            <button
              key={game.path}
              onClick={() => handleClick(game.path)}
              className="group relative bg-card/80 backdrop-blur border border-border rounded-xl p-4
                hover:border-primary/60 hover:box-glow-cyan transition-all duration-300
                cursor-pointer text-left animate-slide-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-center gap-2 mb-2">
                {game.icon}
                {game.emoji && <span className="text-xl">{game.emoji}</span>}
              </div>
              <h3 className="font-display text-[11px] sm:text-xs font-bold text-foreground mb-1 leading-tight">
                {game.label}
              </h3>
              <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2">
                {game.desc}
              </p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => { playPopSound(); navigate("/ruang-untuk-guru"); }}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Ruang untuk Guru
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumatikGamePage;
