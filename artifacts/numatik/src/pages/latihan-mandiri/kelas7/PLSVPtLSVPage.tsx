import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { MessageSquare, Wrench, FileText, ArrowLeftRight, SlidersHorizontal, BookOpen, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const subtopics = [
  { label: "KALIMAT TERBUKA, TERTUTUP (PERNYATAAN) DAN PENGERTIAN PERSAMAAN LINEAR SATU VARIABEL", path: "/latihan-mandiri/kelas-7/plsv-ptlsv/kalimat-terbuka", soal: 5, icon: MessageSquare, gradient: "from-orange-900/40 to-amber-900/30", border: "border-orange-500/30", badge: "bg-orange-500/20 text-orange-300 border-orange-400/40", iconBg: "bg-orange-500/20", iconColor: "text-orange-400", leftBar: "from-orange-400 to-amber-500", desc: "Kalimat terbuka dan tertutup, pengertian PLSV, kesamaan, dan pernyataan ekuivalen" },
  { label: "PENYELESAIAN PERSAMAAN LINEAR SATU VARIABEL", path: "/latihan-mandiri/kelas-7/plsv-ptlsv/penyelesaian-plsv", soal: 61, icon: Wrench, gradient: "from-yellow-900/40 to-lime-900/30", lightGradient: "from-yellow-50/90 to-lime-50/70", border: "border-yellow-500/30", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40", iconBg: "bg-yellow-500/20", iconColor: "text-yellow-400", leftBar: "from-yellow-400 to-lime-500", desc: "Menyelesaikan persamaan linear satu variabel dengan operasi invers, substitusi, verifikasi jawaban" },
  { label: "MODEL MATEMATIKA DAN PENERAPAN PERSAMAAN PADA SOAL CERITA", path: "/latihan-mandiri/kelas-7/plsv-ptlsv/model-matematika-plsv", soal: 13, icon: FileText, gradient: "from-lime-900/40 to-green-900/30", lightGradient: "from-lime-50/90 to-green-50/70", border: "border-lime-500/30", badge: "bg-lime-500/20 text-lime-300 border-lime-400/40", iconBg: "bg-lime-500/20", iconColor: "text-lime-400", leftBar: "from-lime-400 to-green-500", desc: "Merancang model matematika dari soal cerita, menyelesaikan & menafsirkan" },
  { label: "PENGERTIAN KETIDAKSAMAAN, PERTIDAKSAMAAN LINEAR SATU VARIABEL", path: "/latihan-mandiri/kelas-7/plsv-ptlsv/pengertian-ptlsv", soal: 40, icon: ArrowLeftRight, gradient: "from-red-900/40 to-rose-900/30", border: "border-red-500/30", badge: "bg-red-500/20 text-red-300 border-red-400/40", iconBg: "bg-red-500/20", iconColor: "text-red-400", leftBar: "from-red-400 to-rose-500", desc: "Simbol <, >, ≤, ≥, pengertian pertidaksamaan linear satu variabel, notasi himpunan penyelesaian" },
  { label: "PENYELESAIAN PERTIDAKSAMAAN LINEAR SATU VARIABEL", path: "/latihan-mandiri/kelas-7/plsv-ptlsv/penyelesaian-ptlsv", soal: 75, icon: SlidersHorizontal, gradient: "from-rose-900/40 to-pink-900/30", border: "border-rose-500/30", badge: "bg-rose-500/20 text-rose-300 border-rose-400/40", iconBg: "bg-rose-500/20", iconColor: "text-rose-400", leftBar: "from-rose-400 to-pink-500", desc: "Menyelesaikan pertidaksamaan linear satu variabel, aturan perkalian negatif membalik tanda, garis bilangan" },
  { label: "MODEL MATEMATIKA DAN PENERAPAN PERTIDAKSAMAAN PADA SOAL CERITA", path: "/latihan-mandiri/kelas-7/plsv-ptlsv/model-matematika-ptlsv", soal: 22, icon: BookOpen, gradient: "from-pink-900/40 to-fuchsia-900/30", border: "border-pink-500/30", badge: "bg-pink-500/20 text-pink-300 border-pink-400/40", iconBg: "bg-pink-500/20", iconColor: "text-pink-400", leftBar: "from-pink-400 to-fuchsia-500", desc: "Soal cerita pertidaksamaan linear satu variabel, model matematika, menafsirkan solusi dalam konteks nyata" },
];

const PLSVPtLSVPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();
  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 border-2 border-orange-400/40 flex items-center justify-center mb-4">
            <span className="text-3xl">⚖️</span>
          </div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-orange-300 text-center mb-1" style={{ textShadow: '0 0 24px rgba(251,146,60,0.7)' }}>PERSAMAAN DAN PERTIDAKSAMAAN LINEAR SATU VARIABEL</h1>
          <p className="text-white/50 text-xs text-center font-body mb-1">Kelas 7 · {t('practice.breadcrumb')}</p>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-2 mt-2">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-white/70 text-xs font-body">280 {t('practice.suffixSoalTotal')} · UN / TKA / ANBK</span>
            <span className="text-yellow-400 text-sm">⭐</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 animate-slide-up">
          {subtopics.map((s, i) => {
            const Icon = s.icon;
            return (
              <button key={s.label} onClick={() => { playPopSound(); navigate(s.path); }}
                className="group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.01] animate-slide-up"
                style={{ animationDelay: `${i * 0.07}s` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${!isDark && s.lightGradient ? s.lightGradient : s.gradient} backdrop-blur`} />
                <div className={`absolute inset-0 border ${s.border} rounded-2xl group-hover:border-opacity-60 transition-colors`} />
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${s.leftBar} rounded-l-2xl`} />
                <div className="relative px-5 py-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${s.iconBg} border ${s.border} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-display text-sm font-bold text-white block mb-1">{s.label}</span>
                    <p className="text-white/40 text-xs font-body">{s.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${s.badge}`}>{s.soal} {t('practice.suffixSoal')}</span>
                    <ChevronRight className={`w-4 h-4 ${s.iconColor} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2">{t('practice.enrichmentNote')}</p>
          <p className="text-white/60 text-xs font-body leading-relaxed">Soal-soal PLSV & PtLSV dari pengenalan konsep hingga soal cerita kontekstual HOTS, sesuai kisi-kisi UN, TKA, dan ANBK Kelas 7.</p>
        </div>
        <div className="mt-6 text-center">
          <button onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7"); }} className="text-sm text-muted-foreground hover:text-orange-400 transition-colors cursor-pointer font-body">{t('practice.backToGrade7')}</button>
        </div>
      </div>
    </div>
  );
};
export default PLSVPtLSVPage;
