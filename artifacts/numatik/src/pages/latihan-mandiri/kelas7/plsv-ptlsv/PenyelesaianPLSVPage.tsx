import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

/* ── Reusable atoms ───────────────────────────────────── */
const SubLabel = ({ letter, color }: { letter: string; color: string }) => (
  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 ${color}`}>
    {letter}
  </span>
);

const Tag = ({ label, color }: { label: string; color: string }) => (
  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border font-body uppercase tracking-wider ${color}`}>
    {label}
  </span>
);

const M = ({ math }: { math: string }) => (
  <span className="inline-block"><InlineMath math={math} /></span>
);

const getLetterLabel = (index: number) => {
  let value = index + 1;
  let label = "";

  while (value > 0) {
    value -= 1;
    label = String.fromCharCode(97 + (value % 26)) + label;
    value = Math.floor(value / 26);
  }

  return label;
};

/* ── Soal 1 ── Penyelesaian Persamaan ─────────────────── */
const SoalDua = () => {
  const { t } = useTranslation();
  const items = [
    { n: "13", expr: "x + 9 = 17" },
    { n: "14", expr: "x + 4 = -10" },
    { n: "15", expr: "x + 18 = 7" },
    { n: "16", expr: "x - 8 = 11" },
    { n: "18", expr: "y - 25 = -16" },
    { n: "19", expr: "4y = 3y - 21" },
    { n: "21", expr: "8y + 15 = 7y" },
    { n: "23", expr: "10p + 8 = 9p + 5" },
    { n: "32", expr: "3(5x - 6) = 2(7x - 8) + 2" },
    { n: "37", expr: "3(3x - 5) = 2(4x - 7) + 6" },
  ];
  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        Tentukan penyelesaian dari persamaan-persamaan berikut!
      </p>
      <div className="space-y-2 pl-1">
        {items.map(({ n, expr }, index) => (
          <div key={n} className="flex items-center gap-2.5 bg-yellow-500/5 border border-yellow-500/10 rounded-lg px-3 py-2.5">
            <SubLabel letter={String.fromCharCode(97 + index)} color="bg-yellow-500/20 text-yellow-300 border border-yellow-400/30" />
            <span className="overflow-x-auto"><M math={expr} /></span>
          </div>
        ))}
      </div>

    </div>
  );
};

/* ── Soal 5 ── Perkalian/Pembagian + Distribusi + Cerita ─ */
const SoalLima = () => {
  const items: { expr: string }[] = [
    { expr: "3x = 18" },
    { expr: "-4z = -20" },
    { expr: "-\\dfrac{2}{3}m = -\\dfrac{4}{9}" },
    { expr: "-3b = -\\dfrac{1}{4}" },
    { expr: "\\dfrac{q}{5} = -2" },
    { expr: "9x - 9 = -27" },
    { expr: "7x + 5 = -30" },
    { expr: "6p - 9 = 8p + 15" },
    { expr: "10 - 3y = 5y - 6" },
    { expr: "5(y - 4) = 13y + 8" },
    { expr: "6(y + 3) = 10y - 14" },
    { expr: "4(1 - p) + 5(p - 3) = -6" },
    { expr: "4(3p + 2) - 9p + 8 = 2(4p - 6)" },
    { expr: "9y - 4(3y - 2) = 5(y - 2) + 16" },
  ];

  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        Tentukan penyelesaian dari persamaan-persamaan berikut!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
        {items.map(({ expr }, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 bg-sky-500/5 border border-sky-500/10 rounded-lg px-3 py-2.5"
          >
            <SubLabel
              letter={getLetterLabel(index)}
              color="bg-sky-500/25 text-sky-300 border border-sky-400/35"
            />
            <span className="overflow-x-auto"><M math={expr} /></span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Soal 6 ── Persamaan Pecahan dengan KPK ───────────── */
const SoalEnam = () => {
  const { t } = useTranslation();
  const items = [
    { n: "69", expr: "\\tfrac{1}{3}m + 5 = 11" },
    { n: "70", expr: "\\tfrac{1}{4}n - 3 = 7" },
    { n: "71", expr: "\\tfrac{1}{5}p + \\tfrac{3}{4} = 8" },
    { n: "78", expr: "4{,}5s - 2{,}8 = 8{,}2" },
    { n: "79", expr: "\\tfrac{1}{3}(6x - 9) = \\tfrac{1}{2}x + 4\\tfrac{1}{2}" },
    { n: "81", expr: "\\tfrac{2}{3}(x + 9) - \\tfrac{3}{4}\\!\\left(\\tfrac{8}{3} - x\\right) = \\tfrac{3}{4}" },
    { n: "83", expr: "\\dfrac{p + 5}{3} - \\dfrac{3p - 12}{6} = \\dfrac{1}{2}" },
    { n: "90", expr: "\\dfrac{q + 3}{5} - \\dfrac{3q - 5}{2} = \\dfrac{1}{2}" },
  ];

  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        Tentukan penyelesaian dari persamaan-persamaan berikut!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
        {items.map(({ n, expr }, index) => (
          <div key={n} className="flex items-center gap-2.5 bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-lg px-3 py-2.5">
            <SubLabel
              letter={getLetterLabel(index)}
              color="bg-fuchsia-500/25 text-fuchsia-300 border border-fuchsia-400/35"
            />
            <span className="overflow-x-auto"><M math={expr} /></span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────── */
const PenyelesaianPLSVPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  /* ── Card config (inside component so t() is available) ── */
  const cards = [
    {
      num: 1, tag: t('practice.plsvPtlsv.penyelesaianPLSV.tags.q2'),
      tagColor: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
      gradient: "from-yellow-900/40 to-lime-900/25", border: "border-yellow-500/25",
      bar: "from-yellow-400 to-lime-500", numBg: "bg-yellow-500/30 text-yellow-200",
      custom: (
        <SoalDua />
      ),
    },
    {
      num: 2, tag: t('practice.plsvPtlsv.penyelesaianPLSV.tags.q5'),
      tagColor: "bg-sky-500/20 text-sky-300 border-sky-400/40",
      gradient: "from-sky-900/40 to-indigo-900/25", border: "border-sky-500/25",
      bar: "from-sky-400 to-indigo-500", numBg: "bg-sky-500/30 text-sky-200",
      custom: <SoalLima />,
    },
    {
      num: 3, tag: t('practice.plsvPtlsv.penyelesaianPLSV.tags.q6'),
      tagColor: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40",
      gradient: "from-fuchsia-900/40 to-pink-900/25", border: "border-fuchsia-500/25",
      bar: "from-fuchsia-400 to-pink-500", numBg: "bg-fuchsia-500/30 text-fuchsia-200",
      custom: <SoalEnam />,
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden plsv-ptlsv-practice-route">
      <Starfield />
      <PageNavigation />

      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-lime-500/10 border border-yellow-400/30 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl">🔧</span>
          </div>
          <h1
            className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(234,179,8,0.5)' }}
          >
            {t('practice.plsvPtlsv.penyelesaianPLSV.title1')}
          </h1>
          <h1
            className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(234,179,8,0.5)' }}
          >
            {t('practice.plsvPtlsv.penyelesaianPLSV.title2')}
          </h1>
          <p className="text-white/40 text-xs text-center font-body mt-2">Kelas 7 · PLSV & PtLSV · {t('practice.breadcrumb')}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-400 font-body">✦ Kelas 7</span>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="flex flex-col gap-4">
          {cards.map((c, i) => (
            <div
              key={c.num}
              className="relative rounded-2xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} backdrop-blur`} />
              <div className={`absolute inset-0 border ${c.border} rounded-2xl`} />
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${c.bar} rounded-l-2xl`} />

              <div className="relative px-5 py-4 pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-body shrink-0 ${c.numBg}`}>
                    {c.num}
                  </span>
                  <Tag label={c.tag} color={c.tagColor} />
                </div>
                <div className="pl-1">
                  {c.custom}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Back button ── */}
        <div className="mt-10 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/plsv-ptlsv"); }}
            className="text-sm text-white/30 hover:text-yellow-400 transition-colors cursor-pointer font-body"
          >
            {t('practice.backTo')} PLSV & PtLSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenyelesaianPLSVPage;
