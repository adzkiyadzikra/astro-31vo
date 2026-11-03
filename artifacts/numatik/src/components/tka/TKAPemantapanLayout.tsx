import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, CheckCircle2, XCircle, Lightbulb, ArrowLeft, BookMarked, PenLine } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { playPopSound } from "@/hooks/useAudio";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { AsyncImage } from '@/components/ui/async-image';

export interface MateriSection {
  heading: string;
  content?: string;
  renderContent?: () => React.ReactNode;
  jsx?: React.ReactNode;
  jsxAfter?: React.ReactNode;
}

export interface LatihanSoal {
  no: number;
  displayNo?: number;
  /** "pg" = pilihan ganda | "pgk" = pilih semua pernyataan benar | "pgkbs" = tentukan Benar/Salah */
  type?: "pg" | "pgk" | "pgkbs";
  soal: string;
  /** PG & PGK: opsi A-D (combo untuk PGK) */
  options?: string[];
  /** PG & PGK: override JSX untuk opsi berupa grafik/diagram (index sejajar dengan `options`) */
  optionsJsx?: React.ReactNode[];
  /** PG & PGK: huruf jawaban benar (A/B/C/D) */
  jawaban?: string;
  /** PGK: indeks pernyataan benar (0-based); jumlah pernyataan dapat disesuaikan per soal */
  jawabanPGK?: number[];
  /** Pernyataan untuk PGK atau PGKBS; jumlahnya mengikuti bentuk soal */
  pernyataan?: string[];
  /** PGKBS: array ["B"|"S"] untuk tiap pernyataan */
  jawabanBS?: ("B" | "S")[];
  pembahasan?: string;
  /** Optional diagram/image to show below the soal text */
  gambar?: React.ReactNode;
  /** Reduce vertical whitespace around a diagram inserted within the question text. */
  diagramTight?: boolean;
  /** Render this question's fallback diagram before its statement list. */
  diagramBeforeStatements?: boolean;
  /** Optional source label displayed on exercise questions. */
  sourceLabel?: string;
  /** Optional table or visual to show inside the example-question explanation. */
  pembahasanDiagram?: React.ReactNode;
  /** Key for a reusable question diagram supplied by the module page. */
  soalSvg?: string;
}

interface Props {
  title: string;
  backPath?: string;
  materiSections: MateriSection[];
  latihanDasar: LatihanSoal[];
  contohSoal?: LatihanSoal[];
  soalSvgMap?: Record<string, React.ReactNode>;
  optionSvgMap?: Record<string, React.ReactNode>;
  gambarMap?: Record<number, React.ReactNode>;
  showImageSourceLinks?: boolean;
  imageScale?: "default" | "half" | "responsiveHalf";
  imageScaleExceptQuestionNo?: number;
  /** Render fallback question diagrams before any statement list. */
  diagramBeforeStatements?: boolean;
  /** Show a text correctness result as soon as a student answers. */
  showImmediateAnswerFeedback?: boolean;
  /** Render a separate Tips section inside each expanded explanation. */
  showPembahasanTips?: boolean;
}

const getGoogleDriveFileId = (value: string) => {
  try {
    const url = new URL(value.trim());
    if (!/(^|\.)drive\.google\.com$|(^|\.)docs\.google\.com$/i.test(url.hostname)) return null;
    const pathId = url.pathname.match(/\/file\/d\/([^/]+)/i)?.[1];
    return pathId ?? url.searchParams.get("id");
  } catch {
    return null;
  }
};

const normalizeImageUrl = (value: string) => {
  const trimmed = value.trim();
  const driveId = getGoogleDriveFileId(trimmed);
  return driveId ? `https://drive.google.com/uc?export=view&id=${encodeURIComponent(driveId)}` : trimmed;
};

const isImageUrl = (value: string) => {
  const trimmed = value.trim();
  if (!/^https?:\/\//i.test(trimmed)) return false;
  return Boolean(getGoogleDriveFileId(trimmed))
    || /\.(png|jpe?g|webp|gif|svg)(?:[?#].*)?$/i.test(trimmed)
    || /blob\.vusercontent\.net|images\.|image\.|imgur\.com|cloudinary\.com|unsplash\.com|googleusercontent\.com/i.test(trimmed);
};

type ImageScale = NonNullable<Props["imageScale"]>;

const renderQuestionImage = (source: string, soalNo: number, imageScale: ImageScale = "default") => {
  const imageUrl = normalizeImageUrl(source);
  const isHalf = imageScale !== "default";
  const isResponsiveHalf = imageScale === "responsiveHalf";
  const imageWrapperClass = isResponsiveHalf
    ? "tka-responsive-image-half"
    : isHalf
      ? "max-w-[50%]"
      : "max-w-xl";
  const imageHeightClass = isResponsiveHalf
    ? "tka-responsive-image-half-content"
    : isHalf
      ? "max-h-[210px]"
      : "max-h-[420px]";
  return (
    <div className={`mx-auto w-full ${imageWrapperClass}`}>
      <a
        href={imageUrl}
        target="_blank"
        rel="noreferrer"
        className="block rounded-xl transition-transform hover:scale-[1.01]"
        title={`Buka preview gambar soal ${soalNo}`}
      >
        <AsyncImage
          src={imageUrl}
          alt={`Gambar soal ${soalNo}`}
          wrapperClassName="rounded-xl"
          className={`${imageHeightClass} w-full rounded-xl object-contain bg-white p-2`}
          showSkeleton
        />
      </a>
      <a
        href={imageUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-1 block text-center text-[10px] text-cyan-300/80 underline underline-offset-2 hover:text-cyan-200"
      >
        Preview / buka link gambar
      </a>
    </div>
  );
};

const renderWithLatex = (text: string, imageScale: ImageScale = "default") => {
  const trimmed = text.trim();
  if (isImageUrl(trimmed)) {
    const imageWrapperClass = imageScale === "responsiveHalf"
      ? "my-3 mx-auto tka-responsive-image-half rounded-xl"
      : imageScale === "half"
        ? "my-3 mx-auto w-1/2 max-w-xl rounded-xl"
        : "my-3 mx-auto max-w-xl rounded-xl";
    const imageClass = imageScale === "responsiveHalf"
      ? "tka-responsive-image-half-content w-full object-contain rounded-xl bg-white p-2"
      : imageScale === "half"
        ? "max-h-[210px] w-full object-contain rounded-xl bg-white p-2"
        : "max-h-[420px] w-full object-contain rounded-xl bg-white p-2";
    return (
      <AsyncImage
        src={normalizeImageUrl(trimmed)}
        alt="Gambar materi atau soal"
        wrapperClassName={imageWrapperClass}
        className={imageClass}
        showSkeleton
      />
    );
  }

  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      return (
        <span key={index} className="my-1 block max-w-full overflow-x-auto">
          <InlineMath math={part.slice(2, -2)} />
        </span>
      );
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return <InlineMath key={index} math={part.slice(1, -1)} />;
    }
    return <span key={index}>{part}</span>;
  });
};

const getPembahasanPart = (text: string, heading: string, nextHeadings: string[]) => {
  const headingPattern = [heading, ...nextHeadings].map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const match = text.match(new RegExp(`(?:^|\\n)${heading}:\\s*([\\s\\S]*?)(?=\\n(?:${headingPattern}):|$)`, "i"));
  return match?.[1]?.trim() ?? "";
};

const SECTION_COLORS = [
  { bg: "from-indigo-500/20 to-indigo-600/10", border: "border-indigo-400/50", badge: "bg-indigo-500/30 text-indigo-200 border-indigo-400/40", dot: "bg-indigo-400" },
  { bg: "from-violet-500/20 to-violet-600/10", border: "border-violet-400/50", badge: "bg-violet-500/30 text-violet-200 border-violet-400/40", dot: "bg-violet-400" },
  { bg: "from-purple-500/20 to-purple-600/10", border: "border-purple-400/50", badge: "bg-purple-500/30 text-purple-200 border-purple-400/40", dot: "bg-purple-400" },
  { bg: "from-fuchsia-500/20 to-fuchsia-600/10", border: "border-fuchsia-400/50", badge: "bg-fuchsia-500/30 text-fuchsia-200 border-fuchsia-400/40", dot: "bg-fuchsia-400" },
  { bg: "from-sky-500/20 to-sky-600/10", border: "border-sky-400/50", badge: "bg-sky-500/30 text-sky-200 border-sky-400/40", dot: "bg-sky-400" },
  { bg: "from-teal-500/20 to-teal-600/10", border: "border-teal-400/50", badge: "bg-teal-500/30 text-teal-200 border-teal-400/40", dot: "bg-teal-400" },
  { bg: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-400/50", badge: "bg-emerald-500/30 text-emerald-200 border-emerald-400/40", dot: "bg-emerald-400" },
];

const optionLetters = ['A', 'B', 'C', 'D', 'E'];

const normalizeStatementText = (value: string) =>
  value.replace(/^\s*(?:(?:\(\d+\)|\d+[.)])|(?:\([ivx]+\)|[ivx]+[.)]))\s*/i, "");

const romanToIndex = (value: string) => {
  const romanValues: Record<string, number> = { i: 0, ii: 1, iii: 2, iv: 3, v: 4 };
  return romanValues[value.toLowerCase()];
};

/**
 * Older TKA datasets stored PG Kompleks keys as a regular answer letter
 * (for example, "C" for "C. (1), (2), dan (3)") even though the displayed
 * content is a set of statements. Keep those datasets usable as checkbox
 * questions without requiring every page to duplicate its answer key.
 */
const getPgkCorrectIndices = (soal: LatihanSoal) => {
  if (soal.jawabanPGK?.length) return soal.jawabanPGK;
  if (soal.type !== "pgk" || !soal.pernyataan?.length) return [];

  const answerText = soal.jawaban?.trim() ?? "";
  const answerLetter = answerText.match(/^[A-E](?=[.)\s]|$)/i)?.[0]?.toUpperCase();
  const answerOption = answerLetter
    ? soal.options?.find((option) => new RegExp(`^${answerLetter}[.)]\\s*`, "i").test(option))
    : undefined;
  const source = answerOption ?? answerText;

  if (/semua|keempat|seluruh/i.test(source)) {
    return soal.pernyataan.map((_, index) => index);
  }

  const indices = new Set<number>();
  for (const match of source.matchAll(/\(\s*(\d+|[ivx]+)\s*\)/gi)) {
    const value = /^\d+$/.test(match[1]) ? Number(match[1]) - 1 : romanToIndex(match[1]);
    if (typeof value === "number" && value >= 0 && value < soal.pernyataan.length) indices.add(value);
  }

  if (indices.size === 0) {
    for (const match of source.matchAll(/(?:pernyataan|statement)\s*(?:ke[-\s]*)?(\d+)/gi)) {
      const value = Number(match[1]) - 1;
      if (value >= 0 && value < soal.pernyataan.length) indices.add(value);
    }
  }

  // Some older options omit parentheses: "B. 1 dan 2" or
  // "C. 1, 2, dan 4". The option contains only statement numbers, so
  // collecting its standalone numbers is safe and keeps those checkboxes
  // interactive as well.
  if (indices.size === 0) {
    for (const match of source.matchAll(/\b(\d+)\b/g)) {
      const value = Number(match[1]) - 1;
      if (value >= 0 && value < soal.pernyataan.length) indices.add(value);
    }
  }

  return [...indices].sort((a, b) => a - b);
};

/* ── Type badge config ── */
const TYPE_BADGE: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pg: {
    label: "PG",
    color: "text-violet-300",
    bg: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.35)",
  },
  pgk: {
    label: "PG Kompleks",
    color: "text-amber-300",
    bg: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.35)",
  },
  pgkbs: {
    label: "PG Benar-Salah",
    color: "text-cyan-300",
    bg: "rgba(6,182,212,0.15)",
    border: "rgba(6,182,212,0.35)",
  },
};

const TKAPemantapanLayout = ({ title, backPath = "/tka/modul-pemantapan", materiSections, latihanDasar, contohSoal, soalSvgMap, optionSvgMap, gambarMap, showImageSourceLinks = true, imageScale = "default", imageScaleExceptQuestionNo, diagramBeforeStatements = false, showImmediateAnswerFeedback = false, showPembahasanTips = false }: Props) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLightTheme = theme !== "dark" && theme !== "ocean";
  const [activeTab, setActiveTab] = useState<"materi" | "contoh" | "dasar">("dasar");
  /* PG & PGK: stores selected letter (A/B/C/D) per soal.no */
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  /* PGK modern: stores selected statement indices per soal.no */
  const [pgkAnswers, setPgkAnswers] = useState<Record<number, number[]>>({});
  /* PGKBS: stores ["B"|"S"|null, ...] per soal.no */
  const [pgkbsAnswers, setPgkbsAnswers] = useState<Record<number, ("B" | "S" | null)[]>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());
  /* Contoh soal interactive state (separate from latihan) */
  const [selectedContohAnswers, setSelectedContohAnswers] = useState<Record<number, string>>({});
  const [pgkContohAnswers, setPgkContohAnswers] = useState<Record<number, number[]>>({});
  const [pgkbsContohAnswers, setPgkbsContohAnswers] = useState<Record<number, ("B" | "S" | null)[]>>({});

  const handleSelectAnswer = (soalNo: number, letter: string) => {
    if (revealedAnswers.has(soalNo)) return;
    playPopSound();
    setSelectedAnswers(prev => ({ ...prev, [soalNo]: letter }));
  };

  const handleSelectBS = (soalNo: number, idx: number, val: "B" | "S", count: number) => {
    if (revealedAnswers.has(soalNo)) return;
    playPopSound();
    setPgkbsAnswers(prev => {
      const current: ("B" | "S" | null)[] = prev[soalNo] ? [...prev[soalNo]] : Array(count).fill(null);
      current[idx] = val;
      return { ...prev, [soalNo]: current };
    });
  };

  const handleSelectPGK = (soalNo: number, idx: number) => {
    if (revealedAnswers.has(soalNo)) return;
    playPopSound();
    setPgkAnswers(prev => {
      const current = prev[soalNo] ?? [];
      const next = current.includes(idx)
        ? current.filter(item => item !== idx)
        : [...current, idx].sort((a, b) => a - b);
      return { ...prev, [soalNo]: next };
    });
  };

  const handleReveal = (soalNo: number) => {
    playPopSound();
    setRevealedAnswers(prev => {
      const next = new Set(prev);
      next.add(soalNo);
      return next;
    });
  };

  const handleHide = (soalNo: number) => {
    playPopSound();
    setRevealedAnswers(prev => {
      const next = new Set(prev);
      next.delete(soalNo);
      return next;
    });
    setSelectedAnswers(prev => {
      const next = { ...prev };
      delete next[soalNo];
      return next;
    });
    setPgkbsAnswers(prev => {
      const next = { ...prev };
      delete next[soalNo];
      return next;
    });
    setPgkAnswers(prev => {
      const next = { ...prev };
      delete next[soalNo];
      return next;
    });
  };

  const handleClosePembahasan = (soalNo: number) => {
    playPopSound();
    setRevealedAnswers(prev => {
      const next = new Set(prev);
      next.delete(soalNo);
      return next;
    });
  };

  const isCorrectForSoal = (s: LatihanSoal): boolean => {
    const hasAnyAnswer = s.type === "pgkbs"
      ? (pgkbsAnswers[s.no] ?? []).some(answer => answer !== null)
      : s.type === "pgk" && s.pernyataan
        ? (pgkAnswers[s.no] ?? []).length > 0
        : selectedAnswers[s.no] !== undefined;
    if (!hasAnyAnswer && !revealedAnswers.has(s.no)) return false;
    if (s.type === "pgkbs") {
      return (s.jawabanBS?.every((ans, i) => pgkbsAnswers[s.no]?.[i] === ans) ?? false);
    }
    if (s.type === "pgk" && s.pernyataan) {
      const correctIndices = getPgkCorrectIndices(s);
      const selected = pgkAnswers[s.no] ?? [];
      return selected.length === correctIndices.length
        && selected.every(index => correctIndices.includes(index));
    }
    return selectedAnswers[s.no] === s.jawaban;
  };

  const correctCount = latihanDasar.filter(isCorrectForSoal).length;
  const answeredCount = latihanDasar.filter((s) => {
    if (s.type === "pgkbs") return (pgkbsAnswers[s.no] ?? []).some(answer => answer !== null);
    if (s.type === "pgk" && s.pernyataan) return (pgkAnswers[s.no] ?? []).length > 0;
    return selectedAnswers[s.no] !== undefined;
  }).length;
  const conceptTip = title.toLowerCase().includes("rasional")
    ? "Samakan bentuk bilangan terlebih dahulu (pecahan, desimal, atau persen), lalu gunakan operasi dan urutan pengerjaan yang sesuai."
    : "Kenali konsep utama pada soal, tuliskan informasi yang diketahui, lalu pilih operasi atau rumus yang sesuai.";
  const contentRenderer = (text: string) => renderWithLatex(text, imageScale);

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden tka-pemantapan"
      style={isLightTheme ? { background: "var(--bg-primary)" } : { background: "linear-gradient(160deg, #0f0c29 0%, #141428 40%, #1a0a2e 70%, #0d1117 100%)" }}>
      <Starfield />
      <PageNavigation prevPath={backPath} />

      <div className="tka-pemantapan-content relative z-10 min-w-0 max-w-3xl w-full px-4 pt-8 pb-14">

        {/* ── Header: shared Bilangan Bulat design ── */}
        <div className="relative mb-6">
          {theme === "dark" && <div className="absolute inset-0 rounded-2xl blur-2xl opacity-30" style={{ background: "radial-gradient(ellipse at 50% 0%, #6366f1 0%, transparent 70%)" }} />}
          <div className="tka-pemantapan-header relative rounded-2xl overflow-hidden border" style={{ background: isLightTheme ? "linear-gradient(to right, #2196f3, #00bcd4)" : "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 50%, rgba(15,12,41,0.9) 100%)", borderColor: isLightTheme ? "rgba(33,150,243,0.4)" : "rgba(99,102,241,0.3)" }}>
            {theme === "dark" && <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)" }} />}
            <div className="px-6 py-6 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: isLightTheme ? "rgba(255,255,255,0.2)" : "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2))", border: isLightTheme ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(167,139,250,0.35)" }}>
                  <BookMarked className="w-[18px] h-[18px] text-white" />
                </div>
                <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: isLightTheme ? "#fff" : "rgba(167,139,250,0.7)" }}>MODUL PEMANTAPAN TKA MATEMATIKA</span>
              </div>
              <h1 className="font-display text-xl md:text-2xl font-bold mb-1 leading-tight" style={{ color: "#ffffff", textShadow: isLightTheme ? "0 1px 4px rgba(0,0,0,0.3)" : "0 0 40px rgba(167,139,250,0.5)" }}>{title}</h1>
              <p className="font-body text-[11px] mb-4" style={{ color: isLightTheme ? "rgba(255,255,255,0.95)" : "rgba(167,139,250,0.5)" }}>Matematika Kelas 7 SMP/MTs · TA 2026–2027</p>
              <div className="flex gap-2 flex-wrap justify-center mb-3">
                {[{ label: "📘 Ringkasan Materi" }, ...(contohSoal?.length ? [{ label: "📚 Contoh Soal" }] : []), { label: "✏️ Latihan Soal" }].map((item) => <span key={item.label} className="text-[10px] font-body px-3 py-1.5 rounded-lg border font-bold" style={{ background: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>{item.label}</span>)}
              </div>
              <div className="flex gap-2 flex-wrap justify-center">{Object.values(TYPE_BADGE).map(b => <span key={b.label} className="text-[9px] font-body px-2.5 py-0.5 rounded-full border font-semibold" style={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>{b.label}</span>)}</div>
            </div>
            <div className="px-6 py-3 flex items-center justify-center gap-2 border-t" style={{ borderColor: isLightTheme ? "rgba(255,255,255,0.35)" : "rgba(167,139,250,0.2)", background: isLightTheme ? "rgba(0,0,0,0.12)" : "rgba(99,102,241,0.08)" }}>
              <PenLine className="w-3.5 h-3.5 shrink-0" style={{ color: isLightTheme ? "rgba(255,255,255,0.85)" : "#a5b4fc" }} /><span className="font-body text-sm font-semibold tracking-wide" style={{ color: isLightTheme ? "#fff" : "#c4b5fd" }}>oleh Irawan Sutiawan, M.Pd</span>
            </div>
          </div>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl"
          style={isLightTheme ? { background: "var(--bg-secondary)", border: "1px solid var(--border)" } : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {([
            { key: "materi" as const, label: "📘 Ringkasan Materi" },
            ...(contohSoal && contohSoal.length > 0 ? [{ key: "contoh" as const, label: "📚 Contoh Soal" }] : []),
            { key: "dasar" as const, label: "✏️ Latihan Soal" },
          ] as { key: "materi" | "contoh" | "dasar"; label: string }[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => { playPopSound(); setActiveTab(tab.key); }}
              className="flex-1 font-display text-xs py-2.5 px-3 rounded-lg cursor-pointer transition-all duration-200 font-bold"
              style={activeTab === tab.key ? (isLightTheme ? {
                background: "linear-gradient(to right, #2196f3, #00bcd4)",
                color: "#ffffff",
                boxShadow: "0 2px 12px rgba(33,150,243,0.3)",
                border: "1px solid rgba(33,150,243,0.4)",
              } : {
                background: "linear-gradient(135deg, rgba(99,102,241,0.6), rgba(139,92,246,0.4))",
                color: "var(--text-primary)",
                boxShadow: "0 2px 12px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                border: "1px solid rgba(167,139,250,0.4)",
              }) : {
                color: "var(--text-secondary)",
                background: "transparent",
                border: "1px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── MATERI TAB ── */}
        {activeTab === "materi" && (
          <div className="space-y-3 animate-slide-up">
            {materiSections.map((section, idx) => {
              const color = SECTION_COLORS[idx % SECTION_COLORS.length];
              const headingText = section.heading.replace(/^[A-Z]\.\s*/, '');
              return (
                <div key={idx} className={`relative rounded-2xl overflow-hidden border ${color.border}`}
                  style={isLightTheme ? {
                    background: "#f0f4ff",
                    border: `1px solid rgba(33,150,243,0.25)`,
                    boxShadow: "0 4px 12px rgba(33,150,243,0.08)",
                  } : {
                    background: `linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(15,12,41,0.95) 100%)`,
                    boxShadow: "0 4px 24px rgba(99,102,241,0.12)",
                  }}>

                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ background: `linear-gradient(to bottom, #6366f1, #8b5cf6)` }} />

                  <div className="w-full flex items-center gap-3 px-5 py-4 text-left pl-6">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${color.badge}`}>
                      {section.heading.match(/^([A-Z])\.\s*/)?.[1] ?? String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`font-display text-sm font-bold flex-1 leading-snug ${isLightTheme ? "text-slate-900" : "text-white/90"}`}>
                      {contentRenderer(headingText)}
                    </span>
                  </div>

                  <div className="px-6 pb-5 pt-1 border-t border-white/5">
                    {section.jsx && <div className="mb-3">{section.jsx}</div>}
                    {section.renderContent ? section.renderContent() : (
                    <div className={`font-body text-sm leading-relaxed space-y-0.5 ${isLightTheme ? "text-slate-700" : "text-white/80"}`}>
                      {(section.content ?? "").split('\n').map((line, i) => {
                        const trimmed = line.trim();
                        const imgMatch = trimmed.match(/^\[IMAGE:([^|]+)(?:\|(\w+))?\]$/);
                        if (imgMatch) {
                          const sizeClass = imgMatch[2] === 'small'
                            ? (imageScale === "responsiveHalf"
                              ? 'tka-responsive-image-small'
                              : imageScale === "half" ? 'max-w-[80px]' : 'max-w-[160px]')
                            : (imageScale === "responsiveHalf"
                              ? 'tka-responsive-image-half'
                              : imageScale === "half" ? 'max-w-[192px]' : 'max-w-sm');
                          return (
                            <div key={i} className="my-3 flex justify-center">
                              <div className={`${sizeClass} w-full`}>
                                {showImageSourceLinks ? (
                                  <a
                                    href={normalizeImageUrl(imgMatch[1])}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block rounded-xl shadow-lg transition-transform hover:scale-[1.01]"
                                    title="Buka gambar sumber"
                                  >
                                    <AsyncImage src={normalizeImageUrl(imgMatch[1])} alt="Gambar materi" wrapperClassName="rounded-xl" className={`${imageScale === "responsiveHalf" ? "tka-responsive-image-half-content" : imageScale === "half" ? "max-h-[210px]" : "max-h-[420px]"} w-full rounded-xl object-contain bg-white p-2`} />
                                  </a>
                                ) : (
                                  <AsyncImage src={normalizeImageUrl(imgMatch[1])} alt="Gambar materi" wrapperClassName="rounded-xl" className={`${imageScale === "responsiveHalf" ? "tka-responsive-image-half-content" : imageScale === "half" ? "max-h-[210px]" : "max-h-[420px]"} w-full rounded-xl object-contain bg-white p-2`} />
                                )}
                                {showImageSourceLinks && (
                                  <a
                                    href={normalizeImageUrl(imgMatch[1])}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-1 block text-center text-[10px] text-cyan-300/80 underline underline-offset-2 hover:text-cyan-200"
                                  >
                                    Buka link gambar
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        }
                        const centerMatch = trimmed.match(/^\[CENTER:(.+)\]$/);
                        if (centerMatch) return <div key={i} className="text-center font-semibold mb-1">{centerMatch[1]}</div>;
                        const subheadingMatch = trimmed.match(/^\[SUBHEADING:(.+)\]$/);
                        if (subheadingMatch) return <div key={i} className={`font-semibold mt-3 mb-1 ${isLightTheme ? "text-amber-800" : "text-amber-300"}`}>{contentRenderer(subheadingMatch[1])}</div>;
                        const blockMathMatch = trimmed.match(/^\[BLOCKMATH:(.+)\]$/);
                        if (blockMathMatch) return (
                          <div key={i} className="flex justify-start my-3 pl-2 overflow-x-auto">
                            <BlockMath math={`\\begin{aligned}${blockMathMatch[1]}\\end{aligned}`} />
                          </div>
                        );
                        const formulaBoxMatch = trimmed.match(/^\[FORMULABOX:([^|]+)\|(.+)\]$/);
                        if (formulaBoxMatch) {
                          return (
                            <div key={i} className="my-3">
                              <div
                                className="overflow-hidden rounded-2xl border shadow-sm"
                                style={isLightTheme ? {
                                  borderColor: "rgba(217,119,6,0.28)",
                                  background: "linear-gradient(135deg, rgba(255,251,235,0.95), rgba(255,247,237,0.8))",
                                  boxShadow: "0 5px 16px rgba(180,83,9,0.08)",
                                } : {
                                  borderColor: "rgba(251,191,36,0.25)",
                                  background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(120,53,15,0.08))",
                                  boxShadow: "0 5px 18px rgba(245,158,11,0.08)",
                                }}
                              >
                                <div className="flex items-center gap-2.5 border-b px-4 py-2.5"
                                  style={{ borderColor: isLightTheme ? "rgba(217,119,6,0.16)" : "rgba(251,191,36,0.14)" }}>
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                      background: isLightTheme ? "rgba(217,119,6,0.12)" : "rgba(251,191,36,0.14)",
                                      color: isLightTheme ? "#b45309" : "#fbbf24",
                                    }}>
                                    <Lightbulb className="h-4 w-4" />
                                  </span>
                                  <div className={`text-xs font-extrabold uppercase tracking-[0.12em] ${isLightTheme ? "text-amber-900" : "text-amber-200"}`}>
                                    {formulaBoxMatch[1]}
                                  </div>
                                </div>
                                <div className="space-y-2 px-4 py-3">
                                  {formulaBoxMatch[2].split('|').map((formula, formulaIndex) => (
                                    <div
                                      key={formulaIndex}
                                      className={`overflow-x-auto rounded-xl px-3 py-2 text-center text-base font-semibold ${isLightTheme ? "bg-white/80 text-gray-900" : "bg-slate-950/35 text-white"}`}
                                    >
                                      {contentRenderer(formula)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        }
                        if (trimmed.startsWith('$') && trimmed.endsWith('$') && trimmed.length > 2) {
                          return (
                            <div key={i} className="my-4 relative">
                              <div className="absolute inset-0 rounded-xl blur-sm opacity-20"
                                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }} />
                              <div className="relative px-5 py-4 rounded-xl text-center border"
                                style={{
                                  background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.06))",
                                  borderColor: "rgba(245,158,11,0.35)",
                                }}>
                                <div className="flex items-center justify-center gap-1.5 mb-2">
                                  <div className="h-px flex-1 max-w-[40px]"
                                    style={{ background: "rgba(245,158,11,0.4)" }} />
                                  <span className="text-[9px] font-bold tracking-widest uppercase"
                                    style={{ color: isLightTheme ? "#111827" : "#fbbf24" }}>⭐ Rumus Penting</span>
                                  <div className="h-px flex-1 max-w-[40px]"
                                    style={{ background: "rgba(245,158,11,0.4)" }} />
                                </div>
                                <span
                                  className={`text-base font-bold ${isLightTheme ? "text-gray-900" : "text-white"}`}
                                >
                                  {contentRenderer(trimmed)}
                                </span>
                              </div>
                            </div>
                          );
                        }
                        if (trimmed === '') return <div key={i} className="h-1.5" />;
                        return <div key={i}>{contentRenderer(line)}</div>;
                      })}
                    </div>
                    )}
                    {section.jsxAfter && <div className="mt-3">{section.jsxAfter}</div>}
                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* ── CONTOH SOAL TAB ── */}
        {activeTab === "contoh" && contohSoal && (
          <div className="animate-slide-up">
            {/* Info banner */}
            <div className="mb-4 px-4 py-3 rounded-xl flex items-center gap-2.5"
              style={isLightTheme
                ? { background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.25)" }
                : { background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)" }}>
              <Lightbulb className="w-4 h-4 shrink-0 text-emerald-400" />
              <p className="font-body text-xs leading-relaxed" style={{ color: isLightTheme ? "#065f46" : "rgba(255,255,255,0.6)" }}>
                Soal-soal berikut disertai <span className="font-semibold" style={{ color: isLightTheme ? "#059669" : "#6ee7b7" }}>pembahasan lengkap</span> yang selalu ditampilkan.
              </p>
            </div>

            <div className="space-y-4">
              {contohSoal.map((soal) => {
                const type = soal.type ?? "pg";
                const soalImageScale = soal.no === imageScaleExceptQuestionNo ? "default" : imageScale;
                const selected = selectedContohAnswers[soal.no];
                const bsArr = pgkbsContohAnswers[soal.no] ?? Array(soal.pernyataan?.length ?? 3).fill(null);
                const typeBadge = TYPE_BADGE[type];
                const correctContohPGK = getPgkCorrectIndices(soal);
                const pgkAnswerLabel = type === "pgk" && correctContohPGK.length > 0
                  ? correctContohPGK.map(index => `(${index + 1})`).join(", ")
                  : "";
                const diagram = soal.gambar
                  ?? (soal.soalSvg && soalSvgMap?.[soal.soalSvg])
                  ?? (typeof gambarMap?.[soal.no] === "string"
                    ? renderQuestionImage(gambarMap[soal.no] as string, soal.no, soalImageScale)
                    : gambarMap?.[soal.no]);
                const hasInlineVisual = soal.soal.split('\n').some((line) =>
                  line.trim() === "[DIAGRAM]" || /^\[IMAGE:[^|]+(?:\|\w+)?\]$/.test(line.trim())
                );

                return (
                  <div key={soal.no} className="relative min-w-0 rounded-2xl overflow-hidden"
                    style={isLightTheme ? {
                      background: "var(--bg-card)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    } : {
                      background: "linear-gradient(135deg, rgba(20,20,40,0.95) 0%, rgba(15,10,30,0.98) 100%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    }}>

                    {/* ── Question header: number + type badge + soal text ── */}
                    <div className="flex items-start gap-3 px-5 pt-4 pb-2">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-display mt-0.5"
                        style={{
                          background: "linear-gradient(135deg, rgba(16,185,129,0.4), rgba(5,150,105,0.2))",
                          border: "1px solid rgba(52,211,153,0.3)",
                          color: "#6ee7b7",
                        }}>
                        {soal.no}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className={`inline-block text-[9px] font-bold font-display px-2 py-0.5 rounded-full mb-1.5 ${typeBadge.color}`}
                          style={{ background: typeBadge.bg, border: `1px solid ${typeBadge.border}` }}>
                          {typeBadge.label}
                        </span>
                        <div className="font-body text-sm leading-relaxed" style={{ color: isLightTheme ? "var(--text-primary)" : "rgba(255,255,255,0.9)" }}>
                          {soal.soal.split('\n').map((line, lineIdx) => (
                            <Fragment key={lineIdx}>
                              {lineIdx > 0 && <br />}
                              {line.trim() === "[DIAGRAM]" ? (
                                <div className={`my-2 min-w-0 max-w-full overflow-x-auto ${imageScale === "responsiveHalf" ? "tka-responsive-diagram" : imageScale === "half" ? "w-1/2 mx-auto" : ""}`}>{diagram}</div>
                              ) : contentRenderer(line)}
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ── Optional diagram/image, placed after the statements ── */}
                    {!hasInlineVisual && diagram && (
                      <div className="px-5 pb-2 min-w-0 max-w-full overflow-x-auto">
                        <div className={`min-w-0 max-w-full ${imageScale === "responsiveHalf" ? "tka-responsive-diagram" : imageScale === "half" ? "w-1/2 mx-auto" : ""}`}>{diagram}</div>
                      </div>
                    )}

                    {/* ── PGK: checkbox statement list ── */}
                    {type === "pgk" && soal.pernyataan && (
                      <div className="px-5 pb-2 space-y-1.5 ml-11 min-w-0">
                        {soal.pernyataan.map((p, pi) => (
                          <div key={pi} className="flex items-start gap-2 min-w-0 text-xs font-body leading-relaxed"
                            style={{ color: isLightTheme ? "var(--text-secondary)" : "rgba(255,255,255,0.8)" }}>
                            <span aria-hidden="true" className="flex-shrink-0 w-5 h-5 aspect-square rounded-[3px] border flex items-center justify-center text-[10px] font-bold font-display mt-0.5"
                              style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.45)", color: "#fcd34d" }}>
                            </span>
                            <span className="min-w-0">{contentRenderer(normalizeStatementText(p))}</span>
                          </div>
                        ))}
                        <p className="text-[11px] font-body text-amber-300/60 mt-2 italic">
                          Pernyataan yang <span className="font-bold not-italic text-amber-300/80">BENAR</span> adalah ...
                        </p>
                      </div>
                    )}

                    {/* ── PG & PGK: options (correct always highlighted green) ── */}
                    {type === "pg" && soal.options && soal.options.length > 0 && (
                      <div className="px-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {soal.options.map((opt, j) => {
                          const letter = optionLetters[j];
                          const isSelected = selected === letter;
                          const isThisCorrect = letter === soal.jawaban;

                          let optStyle: React.CSSProperties;
                          if (isThisCorrect) {
                            optStyle = isLightTheme
                              ? { background: "#dcfce7", border: "1px solid rgba(34,197,94,0.5)", color: "#15803d" }
                              : { background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.5)", color: "#86efac" };
                          } else if (isSelected && !isThisCorrect) {
                            optStyle = isLightTheme
                              ? { background: "#fef2f2", border: "1px solid rgba(239,68,68,0.4)", color: "#dc2626" }
                              : { background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.4)", color: "#fca5a5" };
                          } else {
                            optStyle = isLightTheme
                              ? { background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)" }
                              : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" };
                          }

                          return (
                            <button
                              key={j}
                              onClick={() => {
                                if (!selected) {
                                  playPopSound();
                                  setSelectedContohAnswers(prev => ({ ...prev, [soal.no]: letter }));
                                }
                              }}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 text-xs font-body"
                              style={{ ...optStyle, cursor: selected ? "default" : "pointer" }}
                            >
                              <span className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold font-display"
                                style={{
                                  background: isThisCorrect ? "rgba(34,197,94,0.3)" : isSelected && !isThisCorrect ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)",
                                  color: "inherit",
                                }}>
                                {letter}
                              </span>
                              <span className="leading-snug">{optionSvgMap?.[opt] ?? contentRenderer(opt.replace(/^[A-E]\.\s*/, ''))}</span>
                              {isThisCorrect && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-auto text-green-400" />}
                              {isSelected && !isThisCorrect && <XCircle className="w-3.5 h-3.5 shrink-0 ml-auto text-red-400" />}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* ── PGKBS: pernyataan B/S table (always shows key) ── */}
                    {type === "pgkbs" && soal.pernyataan && (
                      <div className="px-5 pb-3 ml-11">
                        <div className="rounded-xl overflow-hidden border"
                          style={{ borderColor: "rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.04)" }}>
                          <div className="grid grid-cols-[1fr_auto_auto] gap-0 border-b"
                            style={{ borderColor: "rgba(6,182,212,0.15)" }}>
                            <div className="px-3 py-1.5 text-[9px] font-bold font-display tracking-widest uppercase text-cyan-400/60">Pernyataan</div>
                            <div className="w-14 text-center py-1.5 text-[9px] font-bold font-display tracking-widest uppercase text-emerald-400/60">Benar</div>
                            <div className="w-14 text-center py-1.5 text-[9px] font-bold font-display tracking-widest uppercase text-rose-400/60">Salah</div>
                          </div>
                          {soal.pernyataan.map((p, pi) => {
                            const correctAns = soal.jawabanBS?.[pi];
                            const userAns = bsArr[pi];
                            return (
                              <div key={pi}
                                className={`grid grid-cols-[1fr_auto_auto] gap-0 ${pi < soal.pernyataan!.length - 1 ? "border-b" : ""}`}
                                style={{ borderColor: "rgba(6,182,212,0.1)" }}>
                                <div className="px-3 py-2.5 flex items-center gap-2 min-w-0">
                                  <span className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold font-display"
                                    style={{ background: "rgba(6,182,212,0.15)", color: "#67e8f9" }}>
                                    {pi + 1}
                                  </span>
                                  <span className="font-body text-xs leading-snug flex-1 min-w-0"
                                    style={{ color: isLightTheme ? "var(--text-secondary)" : "rgba(255,255,255,0.8)" }}>
                                    {contentRenderer(p)}
                                  </span>
                                </div>
                                {(["B", "S"] as const).map(choice => {
                                  const isCorrectChoice = correctAns === choice;
                                  const isUserChoice = userAns === choice;
                                  return (
                                    <div key={choice} className="w-14 flex items-center justify-center py-2">
                                      <button
                                        onClick={() => {
                                          if (userAns === null || userAns === undefined) {
                                            playPopSound();
                                            setPgkbsContohAnswers(prev => {
                                              const cur: ("B" | "S" | null)[] = prev[soal.no] ? [...prev[soal.no]] : Array(soal.pernyataan!.length).fill(null);
                                              cur[pi] = choice;
                                              return { ...prev, [soal.no]: cur };
                                            });
                                          }
                                        }}
                                        className="w-8 h-7 rounded-lg text-[10px] font-bold font-display transition-all duration-150"
                                        style={
                                          isCorrectChoice
                                            ? { background: choice === "B" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)", border: `1px solid ${choice === "B" ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.6)"}`, color: choice === "B" ? "#86efac" : "#fca5a5" }
                                            : isUserChoice && !isCorrectChoice
                                              ? { background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", color: "#fca5a5", cursor: "default" }
                                              : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)", cursor: userAns != null ? "default" : "pointer" }
                                        }>
                                        {choice}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                          {/* Answer key row */}
                          <div className="px-3 py-2 border-t flex items-center gap-2"
                            style={{ borderColor: "rgba(6,182,212,0.15)", background: "rgba(6,182,212,0.06)" }}>
                            <span className="text-[9px] font-body text-cyan-400/60">Kunci:</span>
                            {soal.jawabanBS?.map((ans, i) => (
                              <span key={i} className="text-[10px] font-bold font-display px-2 py-0.5 rounded-md"
                                style={{
                                  background: ans === "B" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                                  color: ans === "B" ? "#86efac" : "#fca5a5",
                                  border: `1px solid ${ans === "B" ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
                                }}>
                                ({i + 1}) {ans}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── Pembahasan: selalu ditampilkan pada Contoh Soal ── */}
                    {soal.pembahasan && (
                      <div className="mx-4 mb-4 space-y-2.5">
                        {(soal.jawaban || soal.jawabanBS || pgkAnswerLabel) && (
                          <div className={`rounded-xl px-4 py-3 flex items-center gap-3 border ${isLightTheme ? "bg-green-50 border-green-300" : "bg-gradient-to-r from-green-900/60 to-emerald-900/30 border-green-500/60"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base border ${isLightTheme ? "bg-green-100 border-green-300" : "bg-green-500/20 border-green-400/40"}`}>
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                              <p className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 ${isLightTheme ? "text-green-600" : "text-green-400"}`}>① Jawaban</p>
                              <div className={`font-bold text-xs leading-snug ${isLightTheme ? "text-green-800" : "text-green-200"}`}>
                                {soal.jawaban
                                  ? <>
                                      {soal.jawaban}
                                      {type === "pgk" && pgkAnswerLabel && !soal.jawaban.toLowerCase().includes("pernyataan") && (
                                        <span className="font-normal"> — pernyataan {pgkAnswerLabel} benar</span>
                                      )}
                                    </>
                                  : type === "pgk" && pgkAnswerLabel
                                    ? <>Pernyataan {pgkAnswerLabel} benar</>
                                    : soal.jawabanBS?.map((ans, i) => <span key={i} className="mr-2">({i + 1}) {ans}</span>)}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={`rounded-xl px-4 py-3 border ${isLightTheme ? "bg-violet-50 border-violet-300" : "bg-gradient-to-r from-violet-900/50 to-purple-900/25 border-violet-500/50"}`}>
                          <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${isLightTheme ? "text-violet-600" : "text-violet-300"}`}>
                            <Lightbulb className="w-3.5 h-3.5" /> ② Konsep &amp; Trik
                          </p>
                          <p className={`text-xs leading-relaxed ${isLightTheme ? "text-violet-900" : "text-white/80"}`}>
                            {conceptTip}
                          </p>
                        </div>
                        <div className={`rounded-xl px-4 py-3 border ${isLightTheme ? "bg-cyan-50 border-cyan-300" : "bg-gradient-to-r from-cyan-900/40 to-sky-900/20 border-cyan-500/40"}`}>
                          <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${isLightTheme ? "text-cyan-600" : "text-cyan-300"}`}>
                            <PenLine className="w-3.5 h-3.5" /> ③ Step by Step Penyelesaian
                          </p>
                          <div className={`text-xs leading-relaxed whitespace-pre-wrap ${isLightTheme ? "text-cyan-900" : "text-white/80"}`}>
                            {soal.pembahasan.split('\n').map((line, i) => (
                              <span key={i}>{i > 0 && <br />}{contentRenderer(line)}</span>
                            ))}
                          </div>
                          {soal.pembahasanDiagram && (
                            <div className="mt-4 overflow-x-auto">
                              {soal.pembahasanDiagram}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── LATIHAN TAB ── */}
        {activeTab === "dasar" && (
          <div className="animate-slide-up">

            {/* Score summary */}
            {answeredCount > 0 && (
              <div className="mb-4 px-4 py-3 rounded-xl flex items-center gap-3"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}>
                <div className="text-2xl font-display font-bold" style={{ color: isLightTheme ? "var(--text-primary)" : "#ffffff" }}>
                  {correctCount}<span className="text-sm" style={{ color: isLightTheme ? "var(--text-secondary)" : "rgba(255,255,255,0.4)" }}>/{answeredCount}</span>
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs" style={{ color: isLightTheme ? "var(--text-secondary)" : "rgba(255,255,255,0.6)" }}>Soal terjawab benar</p>
                  <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0}%`,
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      }} />
                  </div>
                </div>
                <span className="font-display text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: "rgba(139,92,246,0.2)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}>
                  {answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%
                </span>
              </div>
            )}

            <div className="space-y-4">
              {latihanDasar.map((soal) => {
                const type = soal.type ?? "pg";
                const soalImageScale = soal.no === imageScaleExceptQuestionNo ? "default" : imageScale;
                const diagramBeforeStatementsForQuestion = soal.diagramBeforeStatements ?? diagramBeforeStatements;
                const selected = selectedAnswers[soal.no];
                const selectedPGK = pgkAnswers[soal.no] ?? [];
                const correctPGK = getPgkCorrectIndices(soal);
                const isRevealed = revealedAnswers.has(soal.no);
                const bsArr = pgkbsAnswers[soal.no] ?? Array(soal.pernyataan?.length ?? 3).fill(null);
                const bsAllAnswered = type === "pgkbs"
                  ? bsArr.length === (soal.pernyataan?.length ?? 3) && bsArr.every(a => a !== null)
                  : false;
                const hasAnswered = type === "pgkbs"
                  ? bsAllAnswered
                  : type === "pgk" && soal.pernyataan
                    ? selectedPGK.length > 0
                    : !!selected;
                const hasAnyAnswer = type === "pgkbs"
                  ? bsArr.some(answer => answer !== null)
                  : hasAnswered;
                const isCorrect = type === "pgkbs"
                  ? (soal.jawabanBS?.every((ans, i) => bsArr[i] === ans) ?? false)
                  : type === "pgk" && soal.pernyataan
                    ? selectedPGK.length === correctPGK.length
                      && selectedPGK.every(index => correctPGK.includes(index))
                  : selected === soal.jawaban;
                const typeBadge = TYPE_BADGE[type];
                const pgkAnswerLabel = type === "pgk" && correctPGK.length > 0
                  ? correctPGK.map(index => `(${index + 1})`).join(", ")
                  : "";
                const conceptPembahasan = soal.pembahasan
                  ? getPembahasanPart(soal.pembahasan, "Konsep & Trik", ["Step-by-Step Penyelesaian", "Tips", "Kesimpulan"])
                  : "";
                const stepsPembahasan = soal.pembahasan
                  ? getPembahasanPart(soal.pembahasan, "Step-by-Step Penyelesaian", ["Tips", "Kesimpulan"])
                  : "";
                const tipsPembahasan = soal.pembahasan
                  ? getPembahasanPart(soal.pembahasan, "Tips", ["Kesimpulan"])
                  : "";
                const correctOptionText = soal.jawaban
                  ? soal.options?.[optionLetters.indexOf(soal.jawaban)]?.replace(/^[A-E]\.\s*/, "")
                  : undefined;
                const diagram = soal.gambar
                  ?? (soal.soalSvg && soalSvgMap?.[soal.soalSvg])
                  ?? (typeof gambarMap?.[soal.no] === "string"
                    ? renderQuestionImage(gambarMap[soal.no] as string, soal.no, soalImageScale)
                    : gambarMap?.[soal.no]);
                const hasInlineVisual = soal.soal.split('\n').some((line) =>
                  line.trim() === "[DIAGRAM]" || /^\[IMAGE:[^|]+(?:\|\w+)?\]$/.test(line.trim())
                );
                let diagramInserted = false;

                return (
                  <div key={soal.no} className="relative min-w-0 rounded-2xl overflow-hidden"
                    style={isLightTheme ? {
                      background: "var(--bg-card)",
                      border: isRevealed
                        ? isCorrect ? "1px solid rgba(34,197,94,0.45)" : "1px solid rgba(239,68,68,0.45)"
                        : hasAnswered ? "1px solid rgba(33,150,243,0.45)" : "1px solid rgba(0,0,0,0.08)",
                    } : {
                      background: "linear-gradient(135deg, rgba(20,20,40,0.95) 0%, rgba(15,10,30,0.98) 100%)",
                      border: isRevealed
                        ? isCorrect ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(239,68,68,0.4)"
                        : hasAnswered ? "1px solid rgba(99,102,241,0.45)" : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: isRevealed
                        ? isCorrect ? "0 4px 20px rgba(34,197,94,0.1)" : "0 4px 20px rgba(239,68,68,0.1)"
                        : "0 4px 20px rgba(0,0,0,0.3)",
                    }}>

                    {/* ── Question header: number + type badge + soal text ── */}
                    <div className="flex items-start gap-3 px-5 pt-4 pb-2">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-display mt-0.5"
                        style={{
                          background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2))",
                          border: "1px solid rgba(167,139,250,0.3)",
                          color: "#a5b4fc",
                        }}>
                        {soal.displayNo ?? soal.no}
                      </span>
                      <div className="flex-1 min-w-0">
                        {/* Type badge */}
                        <span className={`inline-block text-[9px] font-bold font-display px-2 py-0.5 rounded-full mb-1.5 ${typeBadge.color}`}
                          style={{ background: typeBadge.bg, border: `1px solid ${typeBadge.border}` }}>
                          {typeBadge.label}
                        </span>
                        {soal.sourceLabel && (
                          <span className="ml-1 inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[9px] font-bold font-display text-cyan-200">
                            {soal.sourceLabel}
                          </span>
                        )}
                        {/* Soal text */}
                        <div
                          className="font-body text-sm leading-relaxed"
                          style={{ color: isLightTheme ? "var(--text-primary)" : "rgba(255,255,255,0.9)" }}
                        >
                          {soal.soal.split('\n').map((line, lineIdx) => {
                            const trimmedLine = line.trim();
                            const imgMatch = trimmedLine.match(/^\[IMAGE:([^|]+)(?:\|(\w+))?\]$/);
                            if (imgMatch) {
                              // An explicit visual in the question takes precedence over
                              // a fallback visual supplied through soalSvg/gambarMap.
                              diagramInserted = true;
                             const sizeClass = imgMatch[2] === 'small'
                             ? (soalImageScale === "responsiveHalf"
                              ? 'tka-responsive-image-small'
                               : soalImageScale === "half" ? 'max-w-[80px]' : 'max-w-[160px]')
                             : (soalImageScale === "responsiveHalf"
                              ? 'tka-responsive-image-half'
                               : soalImageScale === "half" ? 'max-w-[192px]' : 'max-w-sm w-full');
                              return (
                                <div key={lineIdx} className="my-2 flex justify-center">
                                   <AsyncImage src={normalizeImageUrl(imgMatch[1])} alt={`Soal ${soal.no}`} wrapperClassName={`${sizeClass} rounded-xl`} className={`${soalImageScale === "responsiveHalf" ? "tka-responsive-image-half-content" : soalImageScale === "half" ? "max-h-[210px]" : ""} w-full rounded-xl object-contain`} />
                                </div>
                              );
                            }
                            if (trimmedLine === "[DIAGRAM]" && diagram) {
                              diagramInserted = true;
                              return (
                                <div key={lineIdx} className="my-2 min-w-0 max-w-full overflow-x-auto">
                                  {diagram}
                                </div>
                              );
                            }
                            return (
                              <Fragment key={lineIdx}>
                                {lineIdx > 0 && !(soal.diagramTight && lineIdx === 1) && <br />}
                                {contentRenderer(line)}
                                {!hasInlineVisual && !diagramInserted && diagram && /berikut/i.test(line) && (
                                  (() => {
                                    diagramInserted = true;
                                   return <div className={`${soal.diagramTight ? "my-0" : "my-2"} min-w-0 max-w-full overflow-x-auto ${soalImageScale === "responsiveHalf" ? "tka-responsive-diagram" : soalImageScale === "half" ? "w-1/2 mx-auto" : ""}`}>{diagram}</div>;
                                  })()
                                )}
                              </Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {diagramBeforeStatementsForQuestion && !diagramInserted && diagram && (
                      <div className="px-5 pb-2 min-w-0 max-w-full overflow-x-auto">
                        <div className={`min-w-0 max-w-full ${soalImageScale === "responsiveHalf" ? "tka-responsive-diagram" : soalImageScale === "half" ? "w-1/2 mx-auto" : ""}`}>{diagram}</div>
                      </div>
                    )}

                    {/* ── PGK: checkbox statement list ── */}
                    {(type === "pgk") && soal.pernyataan && (
                      <div className="px-5 pb-2 space-y-1.5 ml-11 min-w-0">
                        <div
                          className="rounded-lg px-3 py-2 mb-2 text-[11px] font-body leading-relaxed"
                          style={{
                            color: isLightTheme ? "#92400e" : "rgba(253,230,138,0.9)",
                            background: isLightTheme ? "#fffbeb" : "rgba(245,158,11,0.08)",
                            border: isLightTheme ? "1px solid #fcd34d" : "1px solid rgba(245,158,11,0.25)",
                          }}
                        >
                          Pilih semua box pernyataan yang benar. Jawaban PG Kompleks dapat lebih dari satu.
                        </div>
                        {soal.pernyataan.map((p, pi) => {
                          const isSelectedPGK = selectedPGK.includes(pi);
                          const isCorrectPGK = correctPGK.includes(pi);
                          // Evaluate a clicked statement immediately, while keeping
                          // the full explanation behind the separate reveal button.
                          const isEvaluatedPGK = isRevealed || isSelectedPGK;
                          return (
                          <button
                            key={pi}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => handleSelectPGK(soal.no, pi)}
                            className="w-full min-w-0 flex items-start gap-2 text-left text-xs font-body leading-relaxed rounded-lg px-2 py-1 transition-colors"
                            style={{
                              background: isRevealed
                                ? isCorrectPGK ? "rgba(34,197,94,0.12)" : isSelectedPGK ? "rgba(239,68,68,0.12)" : "transparent"
                                : isSelectedPGK
                                  ? isCorrectPGK ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)"
                                  : "transparent",
                              cursor: !isRevealed ? "pointer" : "default",
                              color: isLightTheme ? "var(--text-primary)" : "rgba(255,255,255,0.8)",
                            }}
                          >
                            <span aria-hidden="true" className="flex-shrink-0 w-5 h-5 aspect-square rounded-[3px] border flex items-center justify-center text-[10px] font-bold font-display mt-0.5"
                              style={{
                                background: isSelectedPGK
                                  ? isEvaluatedPGK
                                    ? isCorrectPGK ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"
                                    : "rgba(245,158,11,0.35)"
                                  : "rgba(245,158,11,0.08)",
                                borderColor: isEvaluatedPGK && isCorrectPGK ? "rgba(34,197,94,0.6)" : isEvaluatedPGK && isSelectedPGK ? "rgba(239,68,68,0.6)" : "rgba(245,158,11,0.45)",
                                color: isEvaluatedPGK && isCorrectPGK ? "#86efac" : isEvaluatedPGK && isSelectedPGK ? "#fca5a5" : "#fcd34d",
                              }}>
                              {isSelectedPGK ? (isEvaluatedPGK && !isCorrectPGK ? "✗" : "✓") : ""}
                            </span>
                            <span className="min-w-0">{contentRenderer(normalizeStatementText(p))}</span>
                            {isEvaluatedPGK && (isCorrectPGK
                              ? <CheckCircle2 className="w-3.5 h-3.5 ml-auto shrink-0 text-green-400" />
                              : isSelectedPGK
                                ? <XCircle className="w-3.5 h-3.5 ml-auto shrink-0 text-red-400" />
                                : null)}
                          </button>
                          );
                        })}
                        <p className="text-[11px] font-body text-amber-300/60 mt-2 italic">
                          <>Pilih <span className="font-bold not-italic text-amber-300/80">semua pernyataan yang benar</span> (jawaban lebih dari satu).</>
                        </p>
                        {showImmediateAnswerFeedback && selectedPGK.length > 0 && (
                          <div
                            role="status"
                            className={`mt-2 rounded-lg px-3 py-2 text-xs font-semibold ${isCorrect ? "text-green-700 bg-green-100 border border-green-300" : "text-amber-800 bg-amber-50 border border-amber-300"}`}
                          >
                            {isCorrect
                              ? "Benar! Semua pernyataan yang tepat sudah dipilih."
                              : "Belum tepat. Pernyataan yang dipilih ditandai benar atau salah; pilih semua pernyataan yang benar."}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── Optional diagram/image, placed after the statements ── */}
                    {!diagramBeforeStatementsForQuestion && !diagramInserted && diagram && (
                      <div className="px-5 pb-2 min-w-0 max-w-full overflow-x-auto">
                         <div className={`min-w-0 max-w-full ${soalImageScale === "responsiveHalf" ? "tka-responsive-diagram" : soalImageScale === "half" ? "w-1/2 mx-auto" : ""}`}>{diagram}</div>
                      </div>
                    )}

                    {/* ── PG & PGK: A-D combo options grid ── */}
                    {type === "pg" && soal.options && soal.options.length > 0 && (
                      <div className={`px-5 pb-3 grid gap-2 ${soal.optionsJsx ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
                        {soal.options.map((opt, j) => {
                          const letter = optionLetters[j];
                          const isSelected = selected === letter;
                          const isThisCorrect = letter === soal.jawaban;

                          const isEvaluated = isRevealed || !!selected;
                          const isCorrectChoiceVisible = isRevealed || (isSelected && isThisCorrect);
                          let optStyle: React.CSSProperties = isLightTheme ? {
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            color: "var(--text-primary)",
                          } : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.7)",
                          };
                          if (isEvaluated) {
                            if (isCorrectChoiceVisible && isThisCorrect) {
                              optStyle = isLightTheme ? {
                                background: "#dcfce7", border: "1px solid rgba(34,197,94,0.5)", color: "#15803d",
                              } : {
                                background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.5)", color: "#86efac",
                              };
                            } else if (isSelected && !isThisCorrect) {
                              optStyle = isLightTheme ? {
                                background: "#fef2f2", border: "1px solid rgba(239,68,68,0.4)", color: "#dc2626",
                              } : {
                                background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.4)", color: "#fca5a5",
                              };
                            }
                          } else if (isSelected) {
                            optStyle = isLightTheme ? {
                              background: "#eff6ff", border: "1px solid rgba(33,150,243,0.5)", color: "#1d4ed8",
                            } : {
                              background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.6)", color: "#c7d2fe",
                            };
                          }

                          return (
                            <button
                              key={j}
                              type="button"
                              aria-pressed={isSelected}
                              aria-label={`Pilih jawaban ${letter}`}
                              onClick={() => handleSelectAnswer(soal.no, letter)}
                              disabled={isRevealed}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 text-xs font-body"
                              style={{ ...optStyle, cursor: isRevealed ? "default" : "pointer" }}
                            >
                              <span className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold font-display"
                                style={{
                                  background: isRevealed && isThisCorrect
                                    ? "rgba(34,197,94,0.3)"
                                    : isRevealed && isSelected && !isThisCorrect
                                      ? "rgba(239,68,68,0.3)"
                                      : isSelected ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)",
                                  color: "inherit",
                                }}>
                                {letter}
                              </span>
                             {soal.optionsJsx?.[j] ? (
                                <div className="flex-1 flex flex-col items-center">{soal.optionsJsx[j]}</div>
                              ) : (() => {
                                const pipeIdx = opt.indexOf('|');
                                const isImg = pipeIdx !== -1 && (opt[pipeIdx + 1] === '/' || opt.slice(pipeIdx + 1, pipeIdx + 5) === 'http');
                                if (isImg) {
                                  return <AsyncImage src={normalizeImageUrl(opt.slice(pipeIdx + 1))} alt={`Pilihan ${letter}`} wrapperClassName={`${imageScale === "responsiveHalf" ? "tka-responsive-option-image" : imageScale === "half" ? "max-w-[70px]" : "max-w-[140px]"} w-full`} className="w-full rounded bg-white p-1 object-contain" />;
                                }
                                return <span className="leading-snug">{optionSvgMap?.[opt] ?? contentRenderer(opt.replace(/^[A-E]\.\s*/, ''))}</span>;
                              })()}
                              {isCorrectChoiceVisible && isThisCorrect && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-auto text-green-400" />}
                              {isEvaluated && isSelected && !isThisCorrect && <XCircle className="w-3.5 h-3.5 shrink-0 ml-auto text-red-400" />}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* ── PGKBS: pernyataan + B/S buttons ── */}
                    {type === "pgkbs" && soal.pernyataan && (
                      <div className="px-5 pb-3 ml-11">
                        <div className="rounded-xl overflow-hidden border"
                          style={{ borderColor: "rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.04)" }}>
                          {/* Header row */}
                          <div className="grid grid-cols-[1fr_auto_auto] gap-0 border-b"
                            style={{ borderColor: "rgba(6,182,212,0.15)" }}>
                            <div className="px-3 py-1.5 text-[9px] font-bold font-display tracking-widest uppercase text-cyan-400/60">Pernyataan</div>
                            <div className="w-14 text-center py-1.5 text-[9px] font-bold font-display tracking-widest uppercase text-emerald-400/60">Benar</div>
                            <div className="w-14 text-center py-1.5 text-[9px] font-bold font-display tracking-widest uppercase text-rose-400/60">Salah</div>
                          </div>
                          {/* Pernyataan rows */}
                          {soal.pernyataan.map((p, pi) => {
                            const userAns = bsArr[pi];
                            const correctAns = soal.jawabanBS?.[pi];
                             const rowEvaluated = isRevealed || (userAns !== null && userAns !== undefined);
                            const rowCorrect = rowEvaluated && userAns === correctAns;
                            const rowWrong = rowEvaluated && userAns !== correctAns;

                            return (
                              <div key={pi}
                                className={`grid grid-cols-[1fr_auto_auto] gap-0 ${pi < soal.pernyataan!.length - 1 ? "border-b" : ""}`}
                                style={{
                                  borderColor: "rgba(6,182,212,0.1)",
                                  background: rowEvaluated
                                    ? rowCorrect ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)"
                                    : "transparent",
                                }}>
                                {/* Statement text */}
                                <div className="px-3 py-2.5 flex items-center gap-2 min-w-0">
                                  <span className="flex-shrink-0 w-4.5 h-4.5 rounded flex items-center justify-center text-[9px] font-bold font-display"
                                    style={{ background: "rgba(6,182,212,0.15)", color: "#67e8f9" }}>
                                    {pi + 1}
                                  </span>
                                  <span
                                    className="font-body text-xs leading-snug flex-1 min-w-0"
                                    style={{ color: isLightTheme ? "var(--text-primary)" : "rgba(255,255,255,0.8)" }}
                                  >
                                    {contentRenderer(p)}
                                  </span>
                                  {rowEvaluated && (
                                    <span className="flex items-center gap-1 shrink-0">
                                      {rowCorrect
                                        ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                        : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                                      {showImmediateAnswerFeedback && (
                                        <span className={`text-[10px] font-semibold ${rowCorrect ? "text-green-400" : "text-red-400"}`}>
                                          {rowCorrect ? "Benar" : "Salah"}
                                        </span>
                                      )}
                                    </span>
                                  )}
                                </div>
                                {/* Benar button */}
                                <div className="w-14 flex items-center justify-center py-2">
                                  <button
                                    type="button"
                                    aria-label={`Pilih Benar untuk pernyataan ${pi + 1}`}
                                    aria-pressed={userAns === "B"}
                                    disabled={isRevealed}
                                    onClick={() => handleSelectBS(soal.no, pi, "B", soal.pernyataan!.length)}
                                    className="w-8 h-7 rounded-lg text-[10px] font-bold font-display transition-all duration-150"
                                    style={
                                      isRevealed
                                        ? correctAns === "B"
                                          ? { background: "rgba(34,197,94,0.3)", border: "1px solid rgba(34,197,94,0.6)", color: "#86efac", cursor: "default" }
                                          : userAns === "B"
                                            ? { background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", color: "#fca5a5", cursor: "default" }
                                            : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", cursor: "default" }
                                        : userAns === "B"
                                          ? { background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.5)", color: "#86efac", cursor: "pointer" }
                                          : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)", cursor: "pointer" }
                                    }>
                                    B
                                  </button>
                                </div>
                                {/* Salah button */}
                                <div className="w-14 flex items-center justify-center py-2">
                                  <button
                                    type="button"
                                    aria-label={`Pilih Salah untuk pernyataan ${pi + 1}`}
                                    aria-pressed={userAns === "S"}
                                    disabled={isRevealed}
                                    onClick={() => handleSelectBS(soal.no, pi, "S", soal.pernyataan!.length)}
                                    className="w-8 h-7 rounded-lg text-[10px] font-bold font-display transition-all duration-150"
                                    style={
                                      isRevealed
                                        ? correctAns === "S"
                                          ? { background: "rgba(239,68,68,0.3)", border: "1px solid rgba(239,68,68,0.6)", color: "#fca5a5", cursor: "default" }
                                          : userAns === "S"
                                            ? { background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", color: "#fca5a5", cursor: "default" }
                                            : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", cursor: "default" }
                                        : userAns === "S"
                                          ? { background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.5)", color: "#fca5a5", cursor: "pointer" }
                                          : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)", cursor: "pointer" }
                                    }>
                                    S
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                          {/* PGKBS reveal answer row */}
                          {isRevealed && soal.jawabanBS && (
                            <div className="px-3 py-2 border-t flex items-center gap-2"
                              style={{ borderColor: "rgba(6,182,212,0.15)", background: "rgba(6,182,212,0.06)" }}>
                              <span className="text-[9px] font-body text-cyan-400/60">Kunci:</span>
                              {soal.jawabanBS.map((ans, i) => (
                                <span key={i} className="text-[10px] font-bold font-display px-2 py-0.5 rounded-md"
                                  style={{
                                    background: ans === "B" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                                    color: ans === "B" ? "#86efac" : "#fca5a5",
                                    border: `1px solid ${ans === "B" ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
                                  }}>
                                  ({i + 1}) {ans}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {showImmediateAnswerFeedback && type === "pg" && selected && (
                      <div
                        role="status"
                        className={`mx-5 mb-3 rounded-lg px-3 py-2 text-xs font-semibold ${isCorrect ? "text-green-700 bg-green-100 border border-green-300" : "text-red-700 bg-red-50 border border-red-300"}`}
                      >
                        {isCorrect
                          ? "Benar! Jawabanmu tepat."
                          : <>Belum tepat. Jawaban yang benar: {soal.jawaban}{correctOptionText ? <> — {contentRenderer(correctOptionText)}</> : null}.</>}
                      </div>
                    )}

                    {/* ── Action row: every latihan question with a pembahasan gets a visible toggle ── */}
                    {soal.pembahasan && <div className="px-5 pb-4 flex flex-col gap-2">
                      <button
                        onClick={() => isRevealed ? handleClosePembahasan(soal.no) : handleReveal(soal.no)}
                        className="mt-1 w-full py-2 rounded-lg text-xs font-body font-semibold transition-all border cursor-pointer"
                        style={isLightTheme ? {
                          borderColor: "#fbbf24",
                          color: "#b45309",
                          background: "#ffffff",
                        } : {
                          borderColor: "rgba(245,158,11,0.4)",
                          color: "#fcd34d",
                          background: "rgba(245,158,11,0.08)",
                        }}
                      >
                        {isRevealed ? "▲ Tutup Pembahasan" : "▼ Lihat Pembahasan"}
                      </button>
                      {isRevealed && hasAnswered && (
                        <div className="flex items-center justify-center gap-2">
                          {isCorrect ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 font-display">
                              <CheckCircle2 className="w-4 h-4" /> Semua Benar!
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-red-400 font-display">
                              <XCircle className="w-4 h-4" /> Ada yang Salah
                            </span>
                          )}
                        </div>
                      )}
                    </div>}

                    {/* ── Pembahasan ── */}
                    {isRevealed && soal.pembahasan && (
                      <div className="mx-4 mb-4 space-y-2.5 animate-slide-up">
                        {(soal.jawaban || soal.jawabanBS || pgkAnswerLabel) && (
                          <div className={`rounded-xl px-4 py-3 flex items-center gap-3 border ${isLightTheme ? "bg-green-50 border-green-300" : "bg-gradient-to-r from-green-900/60 to-emerald-900/30 border-green-500/60"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base border ${isLightTheme ? "bg-green-100 border-green-300" : "bg-green-500/20 border-green-400/40"}`}>
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                              <p className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 ${isLightTheme ? "text-green-600" : "text-green-400"}`}>① Jawaban</p>
                              <div className={`font-bold text-xs leading-snug ${isLightTheme ? "text-green-800" : "text-green-200"}`}>
                                {soal.jawaban
                                  ? <>{soal.jawaban}{correctOptionText ? <> — {contentRenderer(correctOptionText)}</> : null}</>
                                  : soal.jawabanBS
                                    ? soal.jawabanBS.map((ans, i) => <span key={i} className="mr-2">({i + 1}) {ans === "B" ? "Benar" : "Salah"}</span>)
                                    : <>Pernyataan benar: {pgkAnswerLabel}</>}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={`rounded-xl px-4 py-3 border ${isLightTheme ? "bg-violet-50 border-violet-300" : "bg-gradient-to-r from-violet-900/50 to-purple-900/25 border-violet-500/50"}`}>
                          <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${isLightTheme ? "text-violet-600" : "text-violet-300"}`}>
                            <Lightbulb className="w-3.5 h-3.5" /> ② Konsep &amp; Trik
                          </p>
                           <p className={`text-xs leading-relaxed whitespace-pre-wrap ${isLightTheme ? "text-violet-900" : "text-white/80"}`}>
                              {contentRenderer(conceptPembahasan || conceptTip)}
                           </p>
                        </div>
                        <div className={`rounded-xl px-4 py-3 border ${isLightTheme ? "bg-cyan-50 border-cyan-300" : "bg-gradient-to-r from-cyan-900/40 to-sky-900/20 border-cyan-500/40"}`}>
                          <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${isLightTheme ? "text-cyan-600" : "text-cyan-300"}`}>
                            <PenLine className="w-3.5 h-3.5" /> ③ Step by Step Penyelesaian
                          </p>
                          <div className={`text-xs leading-relaxed whitespace-pre-wrap ${isLightTheme ? "text-cyan-900" : "text-white/80"}`}>
                             {(stepsPembahasan || soal.pembahasan || '').split('\n').map((line, i) => (
                              <span key={i}>{i > 0 && <br />}{contentRenderer(line)}</span>
                            ))}
                          </div>
                          {soal.pembahasanDiagram && (
                            <div className="mt-4 overflow-x-auto">
                              {soal.pembahasanDiagram}
                            </div>
                          )}
                        </div>
                        {showPembahasanTips && tipsPembahasan && (
                          <div className={`rounded-xl px-4 py-3 border ${isLightTheme ? "bg-amber-50 border-amber-300" : "bg-gradient-to-r from-amber-900/40 to-yellow-900/20 border-amber-500/40"}`}>
                            <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${isLightTheme ? "text-amber-700" : "text-amber-300"}`}>
                              <Lightbulb className="w-3.5 h-3.5" /> ④ Tips &amp; Trik
                            </p>
                            <div className={`text-xs leading-relaxed whitespace-pre-wrap ${isLightTheme ? "text-amber-900" : "text-white/80"}`}>
                              {tipsPembahasan.split("\n").map((line, i) => (
                                <span key={i}>{i > 0 && <br />}{contentRenderer(line)}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Back button ── */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => { playPopSound(); navigate(backPath); }}
            className="group flex items-center gap-2 font-body text-sm text-white/30 hover:text-violet-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            ← Kembali ke Modul Pemantapan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TKAPemantapanLayout;
