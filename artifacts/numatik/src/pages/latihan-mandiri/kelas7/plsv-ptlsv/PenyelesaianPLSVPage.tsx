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
  const { t } = useTranslation();
  return (
    <div className="space-y-5">

      {/* A — cara perkalian/pembagian kedua ruas */}
      <div className="space-y-3">
        <p className="font-body text-sm text-white/90 leading-relaxed">
          <Trans
            i18nKey="practice.plsvPtlsv.penyelesaianPLSV.q5.qA.instruction"
            components={{ a: <span className="text-sky-300 font-semibold" /> }}
          />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
          {[
            { n: "38", expr: "3x = 18" },
            { n: "39", expr: "5y = -25" },
            { n: "40", expr: "-4z = -20" },
            { n: "41", expr: "-\\dfrac{2}{3}m = -\\dfrac{4}{9}" },
            { n: "42", expr: "-3b = -\\dfrac{1}{4}" },
            { n: "43", expr: "\\dfrac{1}{3}c = \\dfrac{3}{4}" },
            { n: "44", expr: "\\dfrac{q}{5} = -2" },
            { n: "45", expr: "-\\dfrac{q}{5} = 3" },
          ].map(({ n, expr }, index) => (
            <div key={n} className="flex items-center gap-2.5 bg-sky-500/5 border border-sky-500/10 rounded-lg px-3 py-2.5">
              <SubLabel letter={String.fromCharCode(97 + index)} color="bg-sky-500/25 text-sky-300 border border-sky-400/35" />
              <M math={expr} />
            </div>
          ))}
        </div>
      </div>

      {/* B — penyelesaian campuran */}
      <div className="space-y-3">
        <p className="font-body text-sm text-white/90 leading-relaxed">
          {t('practice.plsvPtlsv.penyelesaianPLSV.q5.qB.instruction')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
          {[
            { n: "46", expr: "5a + 4 = 39" },
            { n: "47", expr: "4a - 7 = 13" },
            { n: "48", expr: "9x - 9 = -27" },
            { n: "49", expr: "7x + 5 = -30" },
            { n: "50", expr: "3x - \\dfrac{1}{3} = \\dfrac{3}{4}" },
            { n: "51", expr: "4p = 18 + 7p" },
            { n: "52", expr: "6p - 9 = 8p + 15" },
            { n: "53", expr: "10 - 3y = 5y - 6" },
            { n: "54", expr: "5(y - 4) = 13y + 8" },
            { n: "55", expr: "6(y + 3) = 10y - 14" },
          ].map(({ n, expr }, index) => (
            <div key={n} className="flex items-center gap-2.5 bg-sky-500/5 border border-sky-500/10 rounded-lg px-3 py-2.5">
              <SubLabel letter={String.fromCharCode(97 + index)} color="bg-sky-500/25 text-sky-300 border border-sky-400/35" />
              <span className="overflow-x-auto"><M math={expr} /></span>
            </div>
          ))}
        </div>
      </div>

      {/* C — uji nilai */}
      <div className="space-y-2.5">
        <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-xl px-4 py-3 space-y-2">
          <p className="font-body text-sm text-white/90 leading-relaxed">
            <span className="text-indigo-300 font-semibold">a.</span>{" "}
            {t('practice.plsvPtlsv.penyelesaianPLSV.q5.ujiNilai.introPre')}<M math="8x + 4 = 10x + 12" />{t('practice.plsvPtlsv.penyelesaianPLSV.q5.ujiNilai.introPost')}
          </p>
          <div className="flex flex-wrap gap-2 pl-4">
            {[{ l: "a", expr: "x + 6" }, { l: "b", expr: "3x - 7" }].map(({ l, expr }) => (
              <div key={l} className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-lg px-3 py-2">
                <SubLabel letter={l} color="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30" />
                <M math={expr} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-xl px-4 py-3 space-y-2">
          <p className="font-body text-sm text-white/90 leading-relaxed">
            <span className="text-indigo-300 font-semibold">b.</span>{" "}
            {t('practice.plsvPtlsv.penyelesaianPLSV.q5.ujiNilai.introPre')}<M math="3(3y + 4) = 6y - 9" />{t('practice.plsvPtlsv.penyelesaianPLSV.q5.ujiNilai.introPost')}
          </p>
          <div className="flex flex-wrap gap-2 pl-4">
            {[{ l: "a", expr: "3y - 5" }, { l: "b", expr: "y^2 + 2" }].map(({ l, expr }) => (
              <div key={l} className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-lg px-3 py-2">
                <SubLabel letter={l} color="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30" />
                <M math={expr} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* D — persamaan distributif */}
      <div className="space-y-3">
        <p className="font-body text-sm text-white/90 leading-relaxed">
          {t('practice.plsvPtlsv.penyelesaianPLSV.q5.qD.instruction')}
        </p>
        <div className="space-y-2 pl-1">
          {[
            { n: "58", expr: "3(p + 4) + (2p - 5) = 10" },
            { n: "59", expr: "4(1 - p) + 5(p - 3) = -6" },
            { n: "60", expr: "5(x - 2) - 3(x - 2) = 10" },
            { n: "61", expr: "5x + 2(x - 3) - (4 - 3x) = 0" },
            { n: "62", expr: "7p - 5(2p - 4) = 4(3p - 2)" },
            { n: "63", expr: "4(3p + 2) - 9p + 8 = 2(4p - 6)" },
            { n: "64", expr: "4(3x - 2) - 3(x + 2) = x - 4" },
            { n: "65", expr: "9y - 4(3y - 2) = 5(y - 2) + 16" },
            { n: "66", expr: "6(2y + 3) - (12y - 14) = 8 - 5y" },
            { n: "67", expr: "7x - 5(3x - 2) = 4(3x - 2)" },
          ].map(({ n, expr }, index) => (
            <div key={n} className="flex items-center gap-2.5 bg-sky-500/5 border border-sky-500/10 rounded-lg px-3 py-2.5">
              <SubLabel letter={String.fromCharCode(97 + index)} color="bg-sky-500/25 text-sky-300 border border-sky-400/35" />
              <span className="overflow-x-auto"><M math={expr} /></span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

/* ── Soal 6 ── Persamaan Pecahan dengan KPK ───────────── */
const SoalEnam = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-5">

      {/* A — KPK sederhana */}
      <div className="space-y-3">
        <p className="font-body text-sm text-white/90 leading-relaxed">
          <Trans
            i18nKey="practice.plsvPtlsv.penyelesaianPLSV.q6.qA.instruction"
            components={{ a: <span className="text-fuchsia-300 font-semibold" /> }}
          />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
          {[
            { n: "69", expr: "\\tfrac{1}{3}m + 5 = 11" },
            { n: "70", expr: "\\tfrac{1}{4}n - 3 = 7" },
            { n: "71", expr: "\\tfrac{1}{5}p + \\tfrac{3}{4} = 8" },
            { n: "72", expr: "\\tfrac{5}{6}a - \\tfrac{1}{3}a = 3" },
            { n: "73", expr: "\\dfrac{z}{3} = \\dfrac{z}{5} - 8" },
            { n: "74", expr: "\\dfrac{2}{k} - \\dfrac{1}{3} = \\dfrac{1}{4},\\; k \\ne 0" },
            { n: "75", expr: "\\dfrac{5}{k} + 3 = \\dfrac{11}{3},\\; k \\ne 0" },
            { n: "76", expr: "\\dfrac{9}{q} - \\dfrac{5}{3q} = \\dfrac{17}{9},\\; q \\ne 0" },
            { n: "77", expr: "\\dfrac{r}{3} - \\dfrac{r}{4} = \\dfrac{2 - r}{12}" },
            { n: "78", expr: "4{,}5s - 2{,}8 = 8{,}2" },
          ].map(({ n, expr }, index) => (
            <div key={n} className="flex items-center gap-2.5 bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-lg px-3 py-2.5">
              <SubLabel letter={String.fromCharCode(97 + index)} color="bg-fuchsia-500/25 text-fuchsia-300 border border-fuchsia-400/35" />
              <span className="overflow-x-auto"><M math={expr} /></span>
            </div>
          ))}
        </div>
      </div>

      {/* B — persamaan pecahan kompleks */}
      <div className="space-y-3">
        <p className="font-body text-sm text-white/90 leading-relaxed">
          {t('practice.plsvPtlsv.penyelesaianPLSV.q3.instruction')}
        </p>
        <div className="space-y-2 pl-1">
          {[
            { n: "79", expr: "\\tfrac{1}{3}(6x - 9) = \\tfrac{1}{2}x + 4\\tfrac{1}{2}" },
            { n: "80", expr: "\\tfrac{1}{4}(4x + 8) + \\tfrac{1}{2}(x - 3) = 3\\tfrac{1}{4}" },
            { n: "81", expr: "\\tfrac{2}{3}(x + 9) - \\tfrac{3}{4}\\!\\left(\\tfrac{8}{3} - x\\right) = \\tfrac{3}{4}" },
            { n: "82", expr: "\\tfrac{1}{3}(6x - 4) + \\tfrac{2}{3}(3 - x) = \\tfrac{2}{3}x" },
            { n: "83", expr: "\\dfrac{p + 5}{3} - \\dfrac{3p - 12}{6} = \\dfrac{1}{2}" },
            { n: "84", expr: "\\dfrac{6 - p}{2} - \\dfrac{p + 2}{4} = \\dfrac{5}{8}" },
            { n: "85", expr: "\\dfrac{p + 6}{3} + \\dfrac{3 - 4p}{5} = \\dfrac{p - 4}{15}" },
            { n: "86", expr: "\\dfrac{5p + 1}{3} + \\dfrac{3p + 2}{4} = \\dfrac{6p + 3}{4}" },
            { n: "87", expr: "\\dfrac{3p - 2}{4} - \\dfrac{5p + 4}{6} = \\dfrac{4p + 1}{12}" },
            { n: "88", expr: "\\dfrac{3x}{x + 5} + \\dfrac{2}{3} = \\dfrac{8}{x + 5},\\; x \\ne -5" },
            { n: "89", expr: "\\dfrac{5x}{x - 4} - \\dfrac{3}{4} = \\dfrac{4x}{x - 4} - \\dfrac{1}{3},\\; x \\ne 4" },
          ].map(({ n, expr }, index) => (
            <div key={n} className="flex items-center gap-2.5 bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-lg px-3 py-2.5">
              <SubLabel letter={String.fromCharCode(97 + index)} color="bg-fuchsia-500/25 text-fuchsia-300 border border-fuchsia-400/35" />
              <span className="overflow-x-auto"><M math={expr} /></span>
            </div>
          ))}
        </div>
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
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 font-body">{t('practice.plsvPtlsv.penyelesaianPLSV.badge')}</span>
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
