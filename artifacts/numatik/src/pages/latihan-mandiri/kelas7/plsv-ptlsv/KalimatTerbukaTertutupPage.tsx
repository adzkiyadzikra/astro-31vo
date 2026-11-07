import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { InlineMath } from "react-katex";
import { PengertianPLSVCards } from "./PengertianPLSVPage";
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

/* ── Soal 1 ── Tabel Kalimat ──────────────────────────── */
const SoalSatu = () => {
  const { t } = useTranslation();
  const rows = [
    { l: "a", terbuka: <span>□ + 5 = 13</span> },
    { l: "b", terbuka: <span>▽ ÷ 6 = 4</span> },
    { l: "c", terbuka: <span><M math="y" /> {t('practice.plsvPtlsv.kalimatTerbukaTertutup.q1.rowDSuffix')}</span> },
    { l: "d", terbuka: <span><M math="(-x)^3 = -27" /></span> },
    { l: "e", terbuka: <span><M math="p \times p < 15" /></span> },
  ];

  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        {t('practice.plsvPtlsv.kalimatTerbukaTertutup.q1.instruction')}
      </p>
      <div className="overflow-x-auto rounded-xl border border-orange-500/20">
        <table className="w-full text-xs font-body">
          <thead>
            <tr className="bg-orange-500/20">
              <th className="px-2 py-2 text-orange-300 font-bold text-left w-6"> </th>
              <th className="px-3 py-2 text-orange-300 font-bold text-left">{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q1.colOpen')}</th>
              <th className="px-3 py-2 text-orange-300 font-bold text-left">{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q1.colTrue')}</th>
              <th className="px-3 py-2 text-orange-300 font-bold text-left">{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q1.colFalse')}</th>
              <th className="px-3 py-2 text-orange-300 font-bold text-left">{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q1.colVar')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.l} className={i % 2 === 0 ? "bg-orange-500/5" : "bg-transparent"}>
                <td className="px-2 py-2.5 text-orange-400 font-bold">{r.l}.</td>
                <td className="px-3 py-2.5 text-white/85">{r.terbuka}</td>
                <td className="px-3 py-2.5">
                  <div className="h-5 border-b border-dashed border-orange-400/20 min-w-[80px]" />
                </td>
                <td className="px-3 py-2.5">
                  <div className="h-5 border-b border-dashed border-orange-400/20 min-w-[80px]" />
                </td>
                <td className="px-3 py-2.5">
                  <div className="h-5 border-b border-dashed border-orange-400/20 min-w-[80px]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ── Soal 2 ── Identifikasi kalimat ───────────────────── */
const SoalDua = () => {
  const { t } = useTranslation();
  const items = [
    { l: "a", text: <span><M math="n" /> {t('practice.plsvPtlsv.kalimatTerbukaTertutup.q2.itemA')}</span> },
    { l: "b", text: <span>{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q2.itemB')}</span> },
    { l: "c", text: <span>{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q2.itemC')}</span> },
    { l: "d", text: <span><M math="6 \times 7 = 45" /></span> },
    { l: "e", text: <span><M math="p" /> {t('practice.plsvPtlsv.kalimatTerbukaTertutup.q2.itemG')}</span> },
  ];
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.kalimatTerbukaTertutup.q2.instruction"
          components={{
            a: <span className="text-amber-300 font-semibold" />,
            b: <span className="text-emerald-300 font-semibold" />,
            c: <span className="text-rose-300 font-semibold" />,
          }}
        />
      </p>
      <div className="space-y-2 pl-1">
        {items.map(({ l, text }) => (
          <div key={l} className="flex items-start gap-2.5 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2.5">
            <SubLabel letter={l} color="bg-amber-500/20 text-amber-300 border border-amber-400/30" />
            <p className="font-body text-sm text-white/80 leading-relaxed pt-0.5">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Soal 3 ── Tentukan pengganti variabel ────────────── */
const SoalTiga = () => {
  const { t } = useTranslation();
  const items = [
    { l: "a", text: <span>{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q3.itemAPre')}<M math="n" />{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q3.itemASuffix')}</span> },
    { l: "b", text: <span><M math="y" /> {t('practice.plsvPtlsv.kalimatTerbukaTertutup.q3.itemBSuffix')}</span> },
    { l: "c", text: <span><M math="z" /> {t('practice.plsvPtlsv.kalimatTerbukaTertutup.q3.itemCSuffix')}</span> },
    { l: "d", text: <span><M math="p" /> {t('practice.plsvPtlsv.kalimatTerbukaTertutup.q3.itemDSuffix')}</span> },
    { l: "e", text: <span><M math="q \times 5 = 40" />{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q3.itemEMid')}<M math="q" />{t('practice.plsvPtlsv.kalimatTerbukaTertutup.q3.itemESuffix')}</span> },
  ];
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        {t('practice.plsvPtlsv.kalimatTerbukaTertutup.q3.instruction')}
      </p>
      <div className="space-y-2 pl-1">
        {items.map(({ l, text }) => (
          <div key={l} className="flex items-start gap-2.5 bg-yellow-500/5 border border-yellow-500/10 rounded-lg px-3 py-2.5">
            <SubLabel letter={l} color="bg-yellow-500/20 text-yellow-300 border border-yellow-400/30" />
            <p className="font-body text-sm text-white/80 leading-relaxed pt-0.5">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────── */
const KalimatTerbukaTertutupPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  /* ── Card config (inside component so t() is available) ── */
  const cards = [
    {
      num: 1, tag: t('practice.plsvPtlsv.kalimatTerbukaTertutup.tags.q1'),
      tagColor: "bg-orange-500/20 text-orange-300 border-orange-400/40",
      gradient: "from-orange-900/50 to-amber-900/30", border: "border-orange-500/25",
      bar: "from-orange-400 to-amber-500", numBg: "bg-orange-500/30 text-orange-200",
      custom: <SoalSatu />,
    },
    {
      num: 2, tag: t('practice.plsvPtlsv.kalimatTerbukaTertutup.tags.q2'),
      tagColor: "bg-amber-500/20 text-amber-300 border-amber-400/40",
      gradient: "from-amber-900/40 to-yellow-900/25", border: "border-amber-500/25",
      bar: "from-amber-400 to-yellow-500", numBg: "bg-amber-500/30 text-amber-200",
      custom: <SoalDua />,
    },
    {
      num: 3, tag: t('practice.plsvPtlsv.kalimatTerbukaTertutup.tags.q3'),
      tagColor: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
      gradient: "from-yellow-900/40 to-lime-900/25", border: "border-yellow-500/25",
      bar: "from-yellow-400 to-lime-500", numBg: "bg-yellow-500/30 text-yellow-200",
      custom: <SoalTiga />,
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden plsv-ptlsv-practice-route">
      <Starfield />
      <PageNavigation />

      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-400/30 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl">💬</span>
          </div>
          <h1
            className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(251,146,60,0.5)' }}
          >
            {t('practice.plsvPtlsv.kalimatTerbukaTertutup.title')}
          </h1>
          <p className="text-white/40 text-xs text-center font-body mt-1">Kelas 7 · PLSV & PtLSV · {t('practice.breadcrumb')}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 font-body">
              {t('practice.plsvPtlsv.kalimatTerbukaTertutup.badge')}
            </span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-400 font-body">✦ Kelas 7</span>
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

        <section className="mt-10">
          <h2 className="font-display text-lg md:text-xl font-bold text-white text-center mb-2">
            {t('practice.plsvPtlsv.pengertianPLSV.title1')} {t('practice.plsvPtlsv.pengertianPLSV.title2')}
          </h2>
          <p className="text-white/40 text-xs text-center font-body mb-5">
            {t('practice.plsvPtlsv.pengertianPLSV.badge')}
          </p>
          <PengertianPLSVCards numberOffset={cards.length} />
        </section>

        {/* ── Back button ── */}
        <div className="mt-10 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/plsv-ptlsv"); }}
            className="text-sm text-white/30 hover:text-orange-400 transition-colors cursor-pointer font-body"
          >
            {t('practice.backTo')} PLSV & PtLSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default KalimatTerbukaTertutupPage;
