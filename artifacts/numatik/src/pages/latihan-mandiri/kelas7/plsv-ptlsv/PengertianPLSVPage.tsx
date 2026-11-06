import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
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

/* ── Soal 1 ── Identifikasi PLSV ──────────────────────── */
const SoalSatu = () => {
  const { t } = useTranslation();
  const items = [
    { l: "a", expr: "3n + 5 = 14" },
    { l: "b", expr: "9m - 2m = 21" },
    { l: "c", expr: "4b - 7 = 2b" },
    { l: "d", expr: "8 - 3pq = 20" },
    { l: "e", expr: "5cd + c = 11" },
    { l: "f", expr: "3 + \\dfrac{y}{4} = -5" },
    { l: "g", expr: "5n - \\dfrac{9}{n} = 18" },
    { l: "h", expr: "2x^2 + 3 = 11" },
    { l: "i", expr: "6n(n - 3) = 7" },
    { l: "j", expr: "5m - 4 = 3 + 2m" },
  ];
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPLSV.q1.instruction"
          components={{ a: <span className="text-amber-300 font-semibold" /> }}
        />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
        {items.map(({ l, expr }) => (
          <div key={l} className="flex items-center gap-2.5 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2.5">
            <SubLabel letter={l} color="bg-amber-500/30 text-amber-300 border border-amber-400/40" />
            <M math={expr} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Soal 2 ── Persamaan atau Kesamaan? ───────────────── */
const SoalDua = () => {
  const { t } = useTranslation();
  const items = [
    { l: "a", expr: "8m + 5 = 3m" },
    { l: "b", expr: "6n - 2n = 4n" },
    { l: "c", expr: "5(y - 3) = 5y - 15" },
    { l: "d", expr: "\\dfrac{3x}{9} - \\dfrac{x}{3} = 0" },
    { l: "e", expr: "4(a + 1) = 18 - a" },
  ];
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPLSV.q2.instruction"
          components={{
            a: <span className="text-yellow-300 font-semibold" />,
            b: <span className="text-lime-300 font-semibold" />,
          }}
        />
      </p>
      <div className="space-y-2 pl-1">
        {items.map(({ l, expr }) => (
          <div key={l} className="flex items-center gap-2.5 bg-yellow-500/5 border border-yellow-500/10 rounded-lg px-3 py-2.5">
            <SubLabel letter={l} color="bg-yellow-500/20 text-yellow-300 border border-yellow-400/30" />
            <span className="flex-1 overflow-x-auto"><M math={expr} /></span>
            <span className="ml-auto text-white/20 text-[11px] font-body shrink-0">{t('practice.plsvPtlsv.pengertianPLSV.q2.itemHint')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PengertianPLSVCards = ({ numberOffset = 0 }: { numberOffset?: number }) => {
  const { t } = useTranslation();
  const cards = [
    {
      num: 1, tag: t('practice.plsvPtlsv.pengertianPLSV.tags.q1'),
      tagColor: "bg-amber-500/20 text-amber-300 border-amber-400/40",
      gradient: "from-amber-900/50 to-yellow-900/30", border: "border-amber-500/25",
      bar: "from-amber-400 to-yellow-500", numBg: "bg-amber-500/30 text-amber-200",
      custom: <SoalSatu />,
    },
    {
      num: 2, tag: t('practice.plsvPtlsv.pengertianPLSV.tags.q2'),
      tagColor: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
      gradient: "from-yellow-900/40 to-lime-900/25", border: "border-yellow-500/25",
      bar: "from-yellow-400 to-lime-500", numBg: "bg-yellow-500/30 text-yellow-200",
      custom: <SoalDua />,
    },
  ];

  return (
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
                {c.num + numberOffset}
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
  );
};

/* ── Page ─────────────────────────────────────────────── */
const PengertianPLSVPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden plsv-ptlsv-practice-route">
      <Starfield />
      <PageNavigation />

      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-400/30 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl">⚖️</span>
          </div>
          <h1
            className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(251,191,36,0.5)' }}
          >
            {t('practice.plsvPtlsv.pengertianPLSV.title1')}
          </h1>
          <h1
            className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(251,191,36,0.5)' }}
          >
            {t('practice.plsvPtlsv.pengertianPLSV.title2')}
          </h1>
          <p className="text-white/40 text-xs text-center font-body mt-2">Kelas 7 · PLSV & PtLSV · {t('practice.breadcrumb')}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 font-body">
              {t('practice.plsvPtlsv.pengertianPLSV.badge')}
            </span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-400 font-body">✦ Kelas 7</span>
          </div>
        </div>

        {/* ── Cards ── */}
        <PengertianPLSVCards />

        {/* ── Back button ── */}
        <div className="mt-10 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/plsv-ptlsv"); }}
            className="text-sm text-white/30 hover:text-amber-400 transition-colors cursor-pointer font-body"
          >
            {t('practice.backTo')} PLSV & PtLSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengertianPLSVPage;
