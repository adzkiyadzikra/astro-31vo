import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/* ── Hardcoded ID strings (no i18n needed for TKA page) ── */

const SenilaiRingkasan = (
  <div className="mt-5 space-y-4">

    {/* ── Ringkasan Intisari: Perbandingan Senilai ── */}
    <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4">
        <svg className="w-5 h-5 text-green-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        <span className="font-body font-semibold text-white">Perbandingan Senilai</span>
      </div>
      <div className="px-5 pb-5 space-y-4">
        <p className="font-body text-sm text-white/80 leading-relaxed">
          Pada perbandingan senilai, rasio antara dua besaran selalu konstan (tetap). Sehingga ketika salah satu berubah, yang lain berubah secara proporsional.
        </p>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-4">
          <p className="font-body text-sm font-semibold text-green-300">Rumus Perbandingan Senilai:</p>
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm border-collapse text-center">
              <thead>
                <tr className="bg-green-600/30">
                  <th className="px-4 py-2 text-green-200 border border-green-500/40 font-bold"><InlineMath math="V_1" /></th>
                  <th className="px-4 py-2 text-green-200 border border-green-500/40 font-bold"><InlineMath math="V_2" /></th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="bg-slate-800/40">
                    <td className="px-4 py-2 border border-green-500/30 font-bold text-white"><InlineMath math="a" /></td>
                    <td className="px-4 py-2 border border-green-500/30 font-bold text-white"><InlineMath math="b" /></td>
                </tr>
                <tr>
                    <td className="px-4 py-2 border border-green-500/30 font-bold text-white"><InlineMath math="c" /></td>
                    <td className="px-4 py-2 border border-green-500/30 font-bold text-white"><InlineMath math="d" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-5 flex flex-col items-center gap-4">
            <p className="font-body text-xs text-white/50">Kali silang (cross multiplication):</p>
            <div className="relative w-full max-w-sm" style={{ height: 140 }}>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 140" preserveAspectRatio="none">
                <line x1="75" y1="35" x2="225" y2="105" stroke="#facc15" strokeWidth="2.5" strokeDasharray="6 3" />
                <line x1="225" y1="35" x2="75" y2="105" stroke="#fb923c" strokeWidth="2.5" strokeDasharray="6 3" />
                <circle cx="150" cy="70" r="5" fill="#ffffff" fillOpacity="0.15" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
              </svg>
              <div className="absolute flex flex-col items-center gap-1" style={{ left: '10%', top: 8 }}>
                <div className="bg-green-600/40 border-2 border-green-400/70 rounded-lg px-5 py-3 text-center shadow-lg shadow-green-900/30">
                  <span className="font-body font-bold text-white text-base"><InlineMath math="a" /></span>
                </div>
                <span className="font-body text-[10px] text-green-300 font-semibold">V₁ · A</span>
              </div>
              <div className="absolute flex flex-col items-center gap-1" style={{ right: '10%', top: 8 }}>
                <div className="bg-green-600/40 border-2 border-green-400/70 rounded-lg px-5 py-3 text-center shadow-lg shadow-green-900/30">
                  <span className="font-body font-bold text-white text-base"><InlineMath math="b" /></span>
                </div>
                <span className="font-body text-[10px] text-green-300 font-semibold">V₂ · A</span>
              </div>
              <div className="absolute flex flex-col items-center gap-1" style={{ left: '10%', bottom: 8 }}>
                <span className="font-body text-[10px] text-blue-300 font-semibold">V₁ · B</span>
                <div className="bg-blue-600/40 border-2 border-blue-400/70 rounded-lg px-5 py-3 text-center shadow-lg shadow-blue-900/30">
                  <span className="font-body font-bold text-white text-base"><InlineMath math="c" /></span>
                </div>
              </div>
              <div className="absolute flex flex-col items-center gap-1" style={{ right: '10%', bottom: 8 }}>
                <span className="font-body text-[10px] text-blue-300 font-semibold">V₂ · B</span>
                <div className="bg-blue-600/40 border-2 border-blue-400/70 rounded-lg px-5 py-3 text-center shadow-lg shadow-blue-900/30">
                  <span className="font-body font-bold text-white text-base"><InlineMath math="d" /></span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 text-[10px] font-body">
                <span className="flex items-center gap-1"><span className="inline-block w-5 border-t-2 border-dashed border-yellow-400"></span><span className="text-yellow-300">a × d</span></span>
                <span className="flex items-center gap-1"><span className="inline-block w-5 border-t-2 border-dashed border-orange-400"></span><span className="text-orange-300">c × b</span></span>
            </div>
            <div className="w-full border-t border-white/10 pt-3 text-center">
              <BlockMath math="ad = cb" />
            </div>
          </div>
          <p className="font-body text-xs text-white/60">
            Di mana <InlineMath math="a" /> dan <InlineMath math="b" /> adalah dua besaran yang bergerak searah (senilai).
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-body text-sm border-collapse">
            <thead>
              <tr className="bg-green-500/20">
                <th className="px-3 py-2 text-green-300 text-left border border-green-500/30">Besaran A (naik ↑)</th>
                <th className="px-3 py-2 text-green-300 text-left border border-green-500/30">Besaran B (naik ↑)</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border border-green-500/20"><td className="px-3 py-2">Jumlah barang dibeli</td><td className="px-3 py-2">Total harga</td></tr>
              <tr className="border border-green-500/20 bg-slate-800/30"><td className="px-3 py-2">Lama bekerja (jam)</td><td className="px-3 py-2">Jumlah produk yang dibuat</td></tr>
              <tr className="border border-green-500/20"><td className="px-3 py-2">Jumlah bahan bakar</td><td className="px-3 py-2">Jarak yang ditempuh</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* ── Ringkasan Intisari: Perbandingan Berbalik Nilai ── */}
    <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4">
        <svg className="w-5 h-5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        <span className="font-body font-semibold text-white">Perbandingan Berbalik Nilai</span>
      </div>
      <div className="px-5 pb-5 space-y-4">
        <p className="font-body text-sm text-white/80 leading-relaxed">
          Pada perbandingan berbalik nilai, hasil kali kedua besaran selalu konstan. Artinya, saat satu naik dua kali lipat, yang lain turun menjadi setengahnya.
        </p>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 space-y-4">
          <p className="font-body text-sm font-semibold text-red-300">Rumus Perbandingan Berbalik Nilai:</p>
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm border-collapse text-center">
              <thead>
                <tr className="bg-red-600/30">
                  <th className="px-4 py-2 text-red-200 border border-red-500/40 font-bold"><InlineMath math="V_1" /></th>
                  <th className="px-4 py-2 text-red-200 border border-red-500/40 font-bold"><InlineMath math="V_2" /></th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="bg-slate-800/40">
                    <td className="px-4 py-2 border border-red-500/30 font-bold text-white"><InlineMath math="a" /></td>
                    <td className="px-4 py-2 border border-red-500/30 font-bold text-white"><InlineMath math="b" /></td>
                </tr>
                <tr>
                    <td className="px-4 py-2 border border-red-500/30 font-bold text-white"><InlineMath math="c" /></td>
                    <td className="px-4 py-2 border border-red-500/30 font-bold text-white"><InlineMath math="d" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-4 flex flex-col items-center gap-3">
            <p className="font-body text-xs text-white/50">Kali sejajar (tiap baris dikalikan sejajar):</p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <div className="flex items-center gap-2">
                <div className="bg-green-600/40 border-2 border-green-400/70 rounded-lg px-5 py-3 text-center flex-1 shadow-lg shadow-green-900/30">
                  <span className="font-body font-bold text-white text-base"><InlineMath math="a" /></span>
                </div>
                <div className="flex-1 border-t-4 border-dashed border-yellow-400 relative flex items-center justify-center">
                  <span className="absolute font-body text-[9px] text-yellow-300 -top-3">sejajar</span>
                </div>
                <div className="bg-green-600/40 border-2 border-green-400/70 rounded-lg px-5 py-3 text-center flex-1 shadow-lg shadow-green-900/30">
                  <span className="font-body font-bold text-white text-base"><InlineMath math="b" /></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-blue-600/40 border-2 border-blue-400/70 rounded-lg px-5 py-3 text-center flex-1 shadow-lg shadow-blue-900/30">
                  <span className="font-body font-bold text-white text-base"><InlineMath math="c" /></span>
                </div>
                <div className="flex-1 border-t-4 border-dashed border-yellow-400 relative flex items-center justify-center">
                  <span className="absolute font-body text-[9px] text-yellow-300 -top-3">sejajar</span>
                </div>
                <div className="bg-blue-600/40 border-2 border-blue-400/70 rounded-lg px-5 py-3 text-center flex-1 shadow-lg shadow-blue-900/30">
                  <span className="font-body font-bold text-white text-base"><InlineMath math="d" /></span>
                </div>
              </div>
            </div>
            <div className="w-full border-t border-white/10 pt-3 text-center">
              <BlockMath math="ab = cd" />
            </div>
          </div>
          <p className="font-body text-xs text-white/60">
            Besaran A dikalikan sejajar, Besaran B dikalikan sejajar — hasilnya selalu sama (konstan).
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-body text-sm border-collapse">
            <thead>
              <tr className="bg-red-500/20">
                <th className="px-3 py-2 text-red-300 text-left border border-red-500/30">Besaran A (naik ↑)</th>
                <th className="px-3 py-2 text-red-300 text-left border border-red-500/30">Besaran B (turun ↓)</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border border-red-500/20"><td className="px-3 py-2">Jumlah pekerja</td><td className="px-3 py-2">Waktu penyelesaian proyek</td></tr>
              <tr className="border border-red-500/20 bg-slate-800/30"><td className="px-3 py-2">Kecepatan kendaraan</td><td className="px-3 py-2">Waktu tempuh perjalanan</td></tr>
              <tr className="border border-red-500/20"><td className="px-3 py-2">Jumlah hewan ternak</td><td className="px-3 py-2">Durasi persediaan pakan</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* ── Kasus Khusus: Proyek yang Terhenti ── */}
    <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4">
        <svg className="w-5 h-5 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        <span className="font-body font-semibold text-white">Kasus Khusus: Proyek yang Terhenti</span>
      </div>
      <div className="px-5 pb-5 space-y-4">
        <p className="font-body text-sm text-white/80 leading-relaxed">
          Soal tingkat lanjut sering menggabungkan berbalik nilai dengan konsep sisa pekerjaan. Strategi penyelesaiannya adalah menghitung &ldquo;satuan kerja&rdquo; total lalu menggunakan sisanya.
        </p>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 space-y-2">
          <p className="font-body text-sm font-semibold text-orange-300 mb-2">Langkah Strategis:</p>
          <div className="font-body text-sm text-white/80 space-y-1">
            <p><strong className="text-orange-300">① Hitung total beban kerja:</strong> jumlah pekerja awal × total hari rencana</p>
            <p><strong className="text-orange-300">② Hitung pekerjaan yang sudah selesai:</strong> pekerja awal × hari yang sudah berjalan</p>
            <p><strong className="text-orange-300">③ Cari sisa beban kerja:</strong> total − yang sudah selesai</p>
            <p><strong className="text-orange-300">④ Hitung sisa waktu tersedia:</strong> total hari − hari sudah berjalan − hari libur</p>
            <p><strong className="text-orange-300">⑤ Pekerja yang dibutuhkan:</strong> sisa beban ÷ sisa waktu</p>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="font-body text-sm text-white/60 text-xs">Contoh singkat: Proyek 20 hari oleh 15 pekerja. Setelah 8 hari, libur 4 hari. Berapa tambahan pekerja?</p>
          <div className="mt-2 space-y-1 font-body text-sm text-white/80">
            <p>Total beban = <InlineMath math="20 \times 15 = 300" /> satuan</p>
            <p>Selesai = <InlineMath math="8 \times 15 = 120" /> satuan → Sisa = <InlineMath math="300 - 120 = 180" /></p>
            <p>Sisa waktu = <InlineMath math="20 - 8 - 4 = 8" /> hari</p>
            <p>Pekerja dibutuhkan = <InlineMath math="180 \div 8 = 22{,}5 \approx 23" /> orang</p>
            <p className="text-orange-300 font-semibold">Tambahan = <InlineMath math="23 - 15 = 8" /> orang</p>
          </div>
        </div>
      </div>
    </div>

  </div>
);

const BertingkatRingkasan = (
  <div className="mt-5 space-y-4">

    {/* ── Rumus Proporsi yang Dicari ── */}
    <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4">
        <svg className="w-5 h-5 text-green-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        <span className="font-body font-semibold text-white">Rumus Proporsi yang Dicari</span>
      </div>
      <div className="px-5 pb-5 space-y-3">
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
          <div className="bg-slate-900/50 rounded p-3">
            <BlockMath math="\text{Nilai}_x = \frac{\text{rasio}_x}{\text{jumlah/selisih rasio}} \times \text{jumlah/selisih yang diketahui}" />
          </div>
          <div className="grid grid-cols-2 gap-2 font-body text-xs text-white/70">
            <div className="bg-slate-800/50 rounded p-2">
              <p className="text-green-300 font-semibold mb-1">Jika diketahui JUMLAH:</p>
              <p>Gunakan jumlah seluruh angka rasio sebagai pembagi.</p>
            </div>
            <div className="bg-slate-800/50 rounded p-2">
              <p className="text-yellow-300 font-semibold mb-1">Jika diketahui SELISIH:</p>
              <p>Gunakan selisih dua angka rasio yang bersangkutan sebagai pembagi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ── Langkah-Langkah Penyelesaian ── */}
    <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4">
        <svg className="w-5 h-5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        <span className="font-body font-semibold text-white">Langkah-Langkah Penyelesaian</span>
      </div>
      <div className="px-5 pb-5 space-y-4">
        <p className="font-body text-sm text-white/80 leading-relaxed">
          Perbandingan bertingkat <span className="text-white/50">(compound ratio)</span> adalah perbandingan yang menggabungkan dua perbandingan terpisah melalui satu variabel perantara yang sama.
        </p>
        <p className="font-body text-sm text-white/70">
          Contoh: <InlineMath math="A : B = 2 : 3" /> dan <InlineMath math="B : C = 4 : 5" /><br />
          Karena B menjadi perantara, keduanya digabung menjadi <InlineMath math="A : B : C = 8 : 12 : 15" />
        </p>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="space-y-3 font-body text-sm text-white/80">
            {[
              { h: "Temukan variabel perantara", b: "variabel yang muncul di kedua perbandingan." },
              { h: "Cari KPK", b: "dari angka variabel perantara di kedua perbandingan." },
              { h: "Kalikan", b: "masing-masing perbandingan sehingga nilai perantara menjadi sama (= KPK)." },
              { h: "Gabungkan", b: "menjadi satu rasio A : B : C." },
              { h: "Gunakan", b: "jumlah/selisih angka rasio untuk mencari nilai yang ditanyakan." },
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-cyan-300 font-bold shrink-0">{i + 1}.</span>
                <p><strong className="text-cyan-300">{step.h}</strong> — {step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  </div>
);

const materiSections: MateriSection[] = [
  {
    heading: "A. Pengertian Perbandingan",
    content: `Perbandingan adalah suatu cara untuk membandingkan dua besaran yang sejenis, baik secara nilai maupun jumlah.\n\nContoh:\nJika tinggi Ani adalah 150 cm dan tinggi Daryl 165 cm, maka perbandingan tinggi Ani dan Daryl adalah:\n$150 : 165 = 10 : 11$ (dibagi 15)\n\nUntuk menyederhanakan perbandingan, bagi kedua suku dengan FPB (Faktor Persekutuan Besar) dari kedua bilangan tersebut.`,
  },
  {
    heading: "B. Jenis-Jenis Perbandingan",
    content: ``,
    jsxAfter: SenilaiRingkasan,
  },
  {
    heading: "C. Proporsi dan Perbandingan Bertingkat",
    content: ``,
    jsxAfter: BertingkatRingkasan,
  },
  {
    heading: "C. Skala",
    content: `Skala (S) merupakan perbandingan antara jarak/ukuran pada peta atau denah (Jp) dengan jarak/ukuran sebenarnya (Js).\n\n$S = \\frac{J_p}{J_s}$`,
  },
  {
    heading: "D. Menentukan Luas sebenarnya dan Luas pada peta",
    content: `Jika skala pada peta adalah $\\frac{1}{k}$ maka:\n\n- Mencari luas sebenarnya (Ls)\n$L_s = \\text{Luas Peta} \\times k^2$\n\n- Mencari Luas Peta (Lp)\n$L_p = \\frac{\\text{Luas Sebenarnya}}{k^2}$`,
  },
];

const DenahKebunQ11 = (
  <svg
    viewBox="0 0 360 300"
    role="img"
    aria-label="Denah kebun berbentuk persegi panjang berskala 1 banding 200, berukuran 7 cm kali 4,5 cm pada denah"
    className="mx-auto my-3 h-auto w-full max-w-2xl rounded-xl border border-border bg-background p-3 text-foreground"
  >
    <defs>
      <marker id="q11-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
      </marker>
    </defs>

    <rect x="14" y="14" width="332" height="272" rx="16" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.16" />
    <text x="180" y="42" textAnchor="middle" fontSize="17" fontWeight="700" fill="currentColor">DENAH</text>
    <text x="180" y="64" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.65">skala 1 : 200</text>

    <rect x="76" y="105" width="208" height="126" rx="4" fill="#38bdf8" fillOpacity="0.18" stroke="#0284c7" strokeWidth="3" />
    <text x="180" y="166" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">KEBUN</text>
    <text x="180" y="186" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.72">pada denah</text>

    <line x1="76" y1="88" x2="284" y2="88" stroke="#f59e0b" strokeWidth="2" markerStart="url(#q11-arrow)" markerEnd="url(#q11-arrow)" />
    <text x="180" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#f59e0b">7 cm</text>
    <line x1="58" y1="105" x2="58" y2="231" stroke="#f59e0b" strokeWidth="2" markerStart="url(#q11-arrow)" markerEnd="url(#q11-arrow)" />
    <text x="43" y="171" textAnchor="middle" fontSize="14" fontWeight="700" fill="#f59e0b" transform="rotate(-90 43 171)">4,5 cm</text>

  </svg>
);

const latihanDasar: LatihanSoal[] = [
  /* ── Soal 1–20: PG biasa (1,4,7,10,13,16,19) · PGK (2,5,8,11,14,17,20) · PGKBS (3,6,9,12,15,18) ── */
  { no: 1, type: "pg" as const, soal: "Sebuah toko menjual beberapa jenis kue. Untuk membuat 12 loyang kue bolu diperlukan 3 kg mentega. Mentega yang diperlukan untuk membuat 20 loyang kue bolu adalah ...", options: ["A. 4 kg", "B. 5 kg", "C. 6 kg", "D. 8 kg"], jawaban: "B", pembahasan: "Perbandingan senilai: loyang bertambah → mentega bertambah\n$\\frac{12}{20} = \\frac{3}{x}$\n$12x = 60$\n$x = 5$ kg → Jawaban B" },
  { no: 2, type: "pgk" as const, soal: "Sebuah pekerjaan dapat diselesaikan oleh 50 orang dalam waktu 8 bulan.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Hubungan antara jumlah pekerja dan waktu merupakan perbandingan berbalik nilai.", "Jika pekerjaan ingin diselesaikan dalam 5 bulan, total pekerja yang dibutuhkan adalah 80 orang.", "Tambahan pekerja yang diperlukan agar pekerjaan selesai dalam 5 bulan adalah 20 orang.", "Jika pekerjaan dikerjakan oleh 100 orang, akan selesai dalam 5 bulan."], options: ["A. 1 saja", "B. 1 dan 2", "C. 2 dan 3", "D. 1, 2, 3, dan 4"], jawaban: "B", pembahasan: "Perbandingan berbalik nilai: pekerja lebih banyak → waktu lebih singkat.\n(1) Jenisnya berbalik nilai → BENAR\n(2) $50 \\times 8 = x \\times 5 \\Rightarrow x = 80$ orang → BENAR\n(3) Tambahan $= 80 - 50 = 30$ orang (bukan 20) → SALAH\n(4) $100 \\times 5 = 500 \\neq 400$ → SALAH\nJawaban B" },
  { no: 3, type: "pgkbs" as const, soal: "Jarak kota A ke kota B ditempuh oleh mobil dengan kecepatan rata-rata 60 km/jam dalam waktu 3 jam 30 menit.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", pernyataan: ["Jarak kota A ke kota B adalah 210 km.", "Jika kecepatan ditingkatkan menjadi 90 km/jam, waktu tempuhnya adalah 2 jam 20 menit.", "Selisih waktu antara kecepatan 60 km/jam dan 90 km/jam adalah 1 jam 20 menit."], jawabanBS: ["B", "B", "S"], pembahasan: "Jarak $= 60 \\times 3{,}5 = 210$ km\n(1) Jarak $= 210$ km → BENAR\n(2) Waktu baru $= \\frac{210}{90} = \\frac{7}{3}$ jam $= 2$ jam $20$ menit → BENAR\n(3) Selisih $= 3$ jam $30$ menit $-$ 2 jam $20$ menit $= 1$ jam $10$ menit (bukan 1 jam 20 menit) → SALAH" },
  { no: 4, type: "pg" as const, soal: "Pembangunan sebuah jembatan direncanakan selesai dalam waktu 132 hari oleh 24 pekerja. Sebelum pekerjaan dimulai ditambah 8 orang pekerja. Waktu untuk menyelesaikan pembangunan jembatan tersebut adalah ...", options: ["A. 99 hari", "B. 108 hari", "C. 126 hari", "D. 129 hari"], jawaban: "A", pembahasan: "Perbandingan berbalik nilai:\n$24 \\times 132 = (24+8) \\times t$\n$3168 = 32t$\n$t = 99$ hari → Jawaban A" },
  { no: 5, type: "pgk" as const, soal: "Sebuah rumah direncanakan dibangun selama 40 hari oleh 12 pekerja. Setelah berjalan 20 hari, pekerjaan berhenti selama 4 hari. Batas waktu pembangunan tetap 40 hari.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Berat badan A adalah 16 kg.", "Pekerjaan yang telah diselesaikan selama 20 hari pertama adalah 240 satuan.", "Sisa waktu yang tersedia setelah berhenti adalah 16 hari.", "Tambahan pekerja yang dibutuhkan agar proyek selesai tepat waktu adalah 3 orang."], options: ["A. 1 dan 2", "B. 2 dan 3", "C. 1, 2, dan 3", "D. 1, 2, 3, dan 4"], jawaban: "D", pembahasan: "(1) Total $= 12 \\times 40 = 480$ satuan → BENAR\n(2) Selesai $= 12 \\times 20 = 240$ satuan → BENAR\n(3) Sisa waktu $= 40 - 20 - 4 = 16$ hari → BENAR\n(4) Pekerja dibutuhkan $= \\frac{240}{16} = 15$ orang; tambahan $= 15 - 12 = 3$ orang → BENAR\nJawaban D" },
  { no: 6, type: "pgkbs" as const, soal: "Perbandingan berat badan A : B : C adalah 2 : 3 : 5. Selisih berat badan A dan C adalah 24 kg.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", pernyataan: ["Nilai satu satuan dalam perbandingan adalah 8.", "Berat badan B adalah 18 kg.", "Jumlah berat badan A, B, dan C adalah 80 kg."], jawabanBS: ["B", "S", "B"], pembahasan: "Selisih $C - A = (5-2)k = 3k = 24 \\Rightarrow k = 8$\n$A = 16$, $B = 24$, $C = 40$\n(1) $k = 8$ → BENAR\n(2) $B = 3 \\times 8 = 24$ kg (bukan 18 kg) → SALAH\n(3) Jumlah $= (2+3+5) \\times 8 = 80$ kg → BENAR" },
  { no: 7, type: "pg" as const, soal: "Perbandingan nilai A dan B adalah 2 : 3, sedangkan perbandingan nilai B dan C adalah 1 : 2. Jumlah nilai mereka bertiga adalah 176, maka selisih nilai A dan C adalah ...", options: ["A. 48", "B. 64", "C. 68", "D. 72"], jawaban: "B", pembahasan: "A:B $= 2:3$, B:C $= 1:2$\nSamakan B: A:B:C $= 2:3:6$\n$11k = 176 \\Rightarrow k = 16$\nSelisih A dan C $= (6-2) \\times 16 = 64$ → Jawaban B" },
  { no: 8, type: "pgk" as const, soal: "Perbandingan uang Ali dan Daryl adalah 2 : 3, sedangkan perbandingan uang Daryl dan Citra adalah 4 : 5. Uang Ali adalah Rp30.000,00.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Perbandingan uang Ali : Daryl : Citra setelah disamakan adalah $8 : 12 : 15$.", "Jumlah tabungan ketiganya adalah Rp131.250,00.", "Uang Citra adalah $\\text{Rp}\\,56.250{,}00$.", "Jumlah uang Daryl dan Citra adalah $\\text{Rp}\\,95.000{,}00$."], options: ["A. 1 dan 2", "B. 2 dan 3", "C. 1, 2, dan 3", "D. 1, 2, 3, dan 4"], jawaban: "C", pembahasan: "Ali:Daryl $= 2:3 = 8:12$; Daryl:Citra $= 4:5 = 12:15$\nAli:Daryl:Citra $= 8:12:15$\n$8k = 30.000 \\Rightarrow k = 3.750$\n(1) Rasio gabungan $8:12:15$ → BENAR\n(2) Daryl $= 12 \\times 3.750 = \\text{Rp}45.000$ → BENAR\n(3) Citra $= 15 \\times 3.750 = \\text{Rp}56.250$ → BENAR\n(4) Daryl + Citra $= 45.000 + 56.250 = \\text{Rp}101.250$ (bukan Rp95.000) → SALAH\nJawaban C" },
  { no: 9, type: "pgkbs" as const, soal: "Perbandingan jumlah tabungan Narda dan Rizki adalah 3 : 4, sedangkan perbandingan tabungan Narda dan Lutfi adalah 5 : 2. Jumlah tabungan mereka bertiga adalah Rp8.200.000,00.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", pernyataan: ["Perbandingan gabungan N : R : L adalah $3 : 4 : 2$.", "Nilai satu satuan (k) dalam perbandingan adalah Rp200.000,00.", "Selisih tabungan Rizki dan Lutfi adalah Rp2.800.000,00."], jawabanBS: ["S", "B", "B"], pembahasan: "N:R $= 3:4 = 15:20$; N:L $= 5:2 = 15:6$\nN:R:L $= 15:20:6$ (bukan $3:4:2$)\n(1) N:R:L yang benar adalah $15:20:6$ → SALAH\n$41k = 8.200.000 \\Rightarrow k = 200.000$\n(2) $k = \\text{Rp}200.000$ → BENAR\n(3) Rizki $= 4.000.000$; Lutfi $= 1.200.000$; selisih $= \\text{Rp}2.800.000$ → BENAR" },
  { no: 10, type: "pg" as const, soal: "Jarak dua kota pada peta adalah 20 cm. Jika skala peta 1 : 600.000, jarak dua kota sebenarnya adalah ...", options: ["A. 1.200 km", "B. 120 km", "C. 30 km", "D. 12 km"], jawaban: "B", pembahasan: "Skala $1 : 600.000$\nJarak sebenarnya $= 20 \\times 600.000 = 12.000.000$ cm $= 120$ km → Jawaban B" },
  { no: 11, type: "pgk" as const, soal: "Sebuah denah kebun dibuat dengan skala $1 : 500$. Ukuran kebun pada denah adalah $10\\text{ cm} \\times 8\\text{ cm}$.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Panjang kebun sebenarnya adalah 50 m.", "Lebar kebun sebenarnya adalah 40 m.", "Luas kebun sebenarnya adalah 2.000 m².", "Keliling kebun sebenarnya adalah 100 m."], options: ["A. 1 dan 2", "B. 1, 2, dan 3", "C. 2, 3, dan 4", "D. 1, 2, 3, dan 4"], jawaban: "B", pembahasan: "Skala $1:500 \\Rightarrow$ setiap 1 cm pada denah $= 500$ cm $= 5$ m sebenarnya.\n(1) Panjang $= 10 \\times 500 = 5.000$ cm $= 50$ m → BENAR\n(2) Lebar $= 8 \\times 500 = 4.000$ cm $= 40$ m → BENAR\n(3) Luas $= 50 \\times 40 = 2.000$ m² → BENAR\n(4) Keliling $= 2 \\times (50+40) = 180$ m (bukan 100 m) → SALAH\nJawaban B" },
  { no: 12, type: "pgkbs" as const, soal: "Pada denah skala 1 : 200 terdapat gambar kebun berbentuk persegi panjang dengan ukuran 7 cm × 4,5 cm.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", gambar: DenahKebunQ11, pernyataan: ["Panjang kebun sebenarnya adalah 14 m.", "Lebar kebun sebenarnya adalah 4,5 m.", "Luas kebun sebenarnya adalah 126 m²."], jawabanBS: ["B", "S", "B"], pembahasan: "Skala $1:200$:\nPanjang $= 7 \\times 200 = 1.400$ cm $= 14$ m\nLebar $= 4{,}5 \\times 200 = 900$ cm $= 9$ m\n(1) Panjang $= 14$ m → BENAR\n(2) Lebar $= 9$ m (bukan 4,5 m; itu ukuran di denah, bukan sebenarnya) → SALAH\n(3) Luas $= 14 \\times 9 = 126$ m² → BENAR" },
  { no: 13, type: "pg" as const, soal: "Perhatikan denah sebuah rumah berikut!\n[IMAGE:https://drive.google.com/thumbnail?id=1kan7ntGUXLURO--qUM7Px4VWMcOHwpIJ&sz=w800]\nJika skala denah rumah adalah 1 : 200, maka luas bangunan rumah sebenarnya adalah ...", options: ["A. 46 $m^2$", "B. 92 $m^2$", "C. 184 $m^2$", "D. 368 $m^2$"], jawaban: "C", pembahasan: "Skala $1:200$\nLuas sebenarnya $=$ Luas denah $\\times (200)^2 = 46 \\times 40.000 = 1.840.000$ cm² $= 184$ m² → Jawaban C" },
  { no: 14, type: "pgk" as const, soal: "Denah sebuah gedung dibuat dengan skala $1 : 300$. Luas denah adalah $125\\text{ cm}^2$.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Skala $1:300$ berarti setiap $1\\text{ cm}^2$ pada denah mewakili $90.000\\text{ cm}^2$ luas sebenarnya.", "Luas gedung sebenarnya adalah $11.250.000\\text{ cm}^2$.", "Luas gedung sebenarnya adalah $1.125\\text{ m}^2$.", "Jika skala diubah menjadi $1:600$, luas sebenarnya untuk denah yang sama menjadi $2.250\\text{ m}^2$."], options: ["A. 1 saja", "B. 1 dan 2", "C. 1, 2, dan 3", "D. 1, 2, 3, dan 4"], jawaban: "C", pembahasan: "(1) $300^2 = 90.000$ → BENAR\n(2) Luas $= 125 \\times 90.000 = 11.250.000$ cm² → BENAR\n(3) $11.250.000$ cm² $= 1.125$ m² → BENAR\n(4) Skala $1:600$: Luas $= 125 \\times 360.000 = 45.000.000$ cm² $= 4.500$ m² (bukan $2.250$ m²) → SALAH\nJawaban C" },
  { no: 15, type: "pgkbs" as const, soal: "Diketahui denah sebuah rumah digambar dengan skala 1 : 30. Ukuran kamar mandi yang berbentuk persegi panjang pada denah adalah 5 cm × 7 cm.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", pernyataan: ["Panjang kamar mandi sebenarnya adalah 1,5 m.", "Lebar kamar mandi sebenarnya adalah 2,1 m.", "Luas kamar mandi sebenarnya adalah 10,5 m²."], jawabanBS: ["B", "B", "S"], pembahasan: "Skala $1:30$:\nPanjang $= 5 \\times 30 = 150$ cm $= 1{,}5$ m\nLebar $= 7 \\times 30 = 210$ cm $= 2{,}1$ m\n(1) Panjang $= 1{,}5$ m → BENAR\n(2) Lebar $= 2{,}1$ m → BENAR\n(3) Luas $= 1{,}5 \\times 2{,}1 = 3{,}15$ m² (bukan 10,5 m²) → SALAH" },
  { no: 16, type: "pg" as const, soal: "Arda dapat menyelesaikan suatu pekerjaan selama 4 jam. Daryl dapat menyelesaikan pekerjaan yang sama dalam waktu 6 jam. Jika pekerjaan tersebut dikerjakan Arda dan Daryl bersama-sama, maka pekerjaan tersebut akan selesai dalam waktu ...", options: ["A. 1 jam 4 menit", "B. 1 jam 24 menit", "C. 2 jam 4 menit", "D. 2 jam 24 menit"], jawaban: "D", pembahasan: "Arda $= \\frac{1}{4}$ pekerjaan/jam; Daryl $= \\frac{1}{6}$ pekerjaan/jam\nBersama $= \\frac{1}{4} + \\frac{1}{6} = \\frac{5}{12}$ pekerjaan/jam\nWaktu $= \\frac{12}{5}$ jam $= 2$ jam $24$ menit → Jawaban D" },
  { no: 17, type: "pgk" as const, soal: "Pompa air \"A\" dapat mengisi kolam dalam 3 jam, pompa \"B\" dalam 4 jam, dan pompa \"C\" dalam 6 jam.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Kecepatan pengisian pompa A adalah $\\frac{1}{3}$ bagian kolam per jam.", "Kecepatan pengisian gabungan ketiga pompa adalah $\\frac{3}{4}$ bagian kolam per jam.", "Waktu yang diperlukan jika ketiga pompa digunakan bersama adalah 1 jam 20 menit.", "Jika hanya pompa A dan B yang digunakan bersama, kolam akan penuh dalam 1 jam 42 menit."], options: ["A. 1 dan 2", "B. 2 dan 3", "C. 1, 2, dan 3", "D. 1, 2, 3, dan 4"], jawaban: "C", pembahasan: "(1) Pompa A $= \\frac{1}{3}$ bagian/jam → BENAR\n(2) Gabungan $= \\frac{1}{3}+\\frac{1}{4}+\\frac{1}{6} = \\frac{4+3+2}{12} = \\frac{9}{12} = \\frac{3}{4}$ bagian/jam → BENAR\n(3) Waktu $= \\frac{4}{3}$ jam $= 1$ jam $20$ menit → BENAR\n(4) Pompa A+B $= \\frac{1}{3}+\\frac{1}{4} = \\frac{7}{12}$ bagian/jam; waktu $= \\frac{12}{7} \\approx 1$ jam $43$ menit (bukan 1 jam 42 menit) → SALAH\nJawaban C" },
  { no: 18, type: "pgkbs" as const, soal: "Suatu pekerjaan jika dikerjakan oleh 3 orang tenaga profesional akan selesai dalam waktu 10 hari, sedangkan jika dikerjakan oleh 8 orang tenaga nonprofesional akan selesai dalam waktu 9 hari.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", pernyataan: ["Kemampuan kerja 1 tenaga profesional per hari adalah $\\frac{1}{30}$ pekerjaan.", "Kemampuan kerja 1 tenaga nonprofesional per hari adalah $\\frac{1}{72}$ pekerjaan.", "Jika dikerjakan oleh 5 tenaga profesional dan 6 nonprofesional, pekerjaan selesai dalam 5 hari."], jawabanBS: ["B", "B", "S"], pembahasan: "(1) $\\frac{1}{3 \\times 10} = \\frac{1}{30}$ → BENAR\n(2) $\\frac{1}{8 \\times 9} = \\frac{1}{72}$ → BENAR\n(3) Gabungan $= \\frac{5}{30}+\\frac{6}{72} = \\frac{1}{6}+\\frac{1}{12} = \\frac{1}{4}$ per hari; waktu $= 4$ hari (bukan 5 hari) → SALAH" },
  { no: 19, type: "pg" as const, soal: "Sebuah perusahaan konstruksi mengerahkan 12 pekerja untuk menyelesaikan 2 unit rumah dalam waktu 30 hari. Jika perusahaan tersebut ingin menyelesaikan 3 unit rumah serupa dalam waktu 24 hari, berapa banyak pekerja yang harus mereka kerahkan?", options: ["A. 23 pekerja", "B. 22 pekerja", "C. 18 pekerja", "D. 15 pekerja"], jawaban: "A", pembahasan: "Kapasitas: $12 \\times 30 = 360$ orang·hari untuk 2 unit\n1 unit $= 180$ orang·hari\n3 unit $= 540$ orang·hari\nDalam 24 hari: $\\frac{540}{24} = 22{,}5 \\approx 23$ pekerja → Jawaban A" },
  { no: 20, type: "pgk" as const, soal: "Seorang peternak memiliki 40 ekor sapi yang dapat menghabiskan 60 karung pakan dalam waktu 15 hari. Peternak menjual 10 ekor sapi sehingga tersisa 30 ekor dan memiliki 45 karung pakan.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Konsumsi pakan per ekor sapi per hari adalah $\\frac{1}{10}$ karung.", "Setelah 10 ekor sapi dijual, konsumsi pakan per hari menjadi 3 karung.", "Dengan 30 ekor sapi dan 45 karung pakan, persediaan akan habis dalam 15 hari.", "Jika peternak memiliki 54 karung pakan untuk 30 sapi, pakan akan habis dalam 18 hari."], options: ["A. 1 dan 2", "B. 1, 2, dan 3", "C. 2, 3, dan 4", "D. 1, 2, 3, dan 4"], jawaban: "D", pembahasan: "(1) $\\frac{60}{40 \\times 15} = \\frac{1}{10}$ karung/ekor/hari → BENAR\n(2) $30 \\times \\frac{1}{10} = 3$ karung/hari → BENAR\n(3) $\\frac{45}{3} = 15$ hari → BENAR\n(4) $\\frac{54}{3} = 18$ hari → BENAR\nJawaban D" },

  /* ── Modul Pemantapan 2026–2027 ── */
  { no: 21, soal: "Sebuah monumen dipotret dengan skala pengecilan $\\frac{1}{50}$ kali. Jika tinggi monumen sebenarnya adalah $15\\text{ m}$, berapa cm tinggi monumen pada foto tersebut?", options: ["A. $10\\text{ cm}$", "B. $15\\text{ cm}$", "C. $25\\text{ cm}$", "D. $30\\text{ cm}$"], jawaban: "D", pembahasan: "Tinggi sebenarnya $= 15\\text{ m} = 1.500\\text{ cm}$\nTinggi pada foto $=$ Tinggi sebenarnya $\\times$ Skala\n$= 1.500\\text{ cm} \\times \\frac{1}{50} = 30\\text{ cm}$ → Jawaban D" },
  { no: 22, soal: "Sebuah peta wilayah memiliki skala $1 : 600.000$. Farhan mengendarai sepeda motor dari kota P ke kota Q dengan kecepatan rata-rata $50\\text{ km/jam}$ dan membutuhkan waktu $3\\text{ jam}$. Jarak antara kota P dan kota Q pada peta tersebut adalah ....", options: ["A. $15\\text{ cm}$", "B. $20\\text{ cm}$", "C. $25\\text{ cm}$", "D. $30\\text{ cm}$"], jawaban: "C", pembahasan: "Jarak Sebenarnya (JS):\n$\\text{JS} = 50\\text{ km/jam} \\times 3\\text{ jam} = 150\\text{ km} = 15.000.000\\text{ cm}$\nJarak pada Peta (JP):\n$\\text{JP} = 15.000.000 \\times \\frac{1}{600.000} = 25\\text{ cm}$ → Jawaban C" },
  { no: 23, type: "pgkbs" as const, soal: "Diketahui perbandingan tiga buah bilangan $x, y,$ dan $z$ adalah $2 : 3 : 5$ dan nilai $z - x = 15$.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", pernyataan: ["Nilai bilangan $y$ adalah 15.", "Nilai bilangan $z$ adalah 25.", "Hasil penjumlahan $x + y + z$ adalah 50."], jawabanBS: ["B", "B", "B"], pembahasan: "Selisih perbandingan $z$ dan $x = 5 - 2 = 3$ unit.\nNilai 1 unit $= \\frac{15}{3} = 5$.\n$x = 2 \\times 5 = 10$, $y = 3 \\times 5 = 15$, $z = 5 \\times 5 = 25$\n$x + y + z = 10 + 15 + 25 = 50$\n(1) $y = 15$ → BENAR\n(2) $z = 25$ → BENAR\n(3) $x + y + z = 50$ → BENAR" },
  { no: 24, type: "pgk" as const, soal: "Perbandingan uang tabungan Rian dan Deni untuk membeli perlengkapan sekolah adalah $3 : 5$. Selisih uang tabungan mereka berdua adalah $\\text{Rp90.000,00}$.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Uang tabungan Rian adalah $\\text{Rp135.000,00}$.", "Uang tabungan Deni adalah $\\text{Rp225.000,00}$.", "Jika Deni membayar dengan 3 lembar uang seratus ribuan, uang kembaliannya sebesar $\\text{Rp65.000,00}$.", "Jumlah uang tabungan Rian dan Deni seluruhnya adalah $\\text{Rp360.000,00}$."], options: ["A. 1 dan 2", "B. 2 dan 4", "C. 1, 2, dan 4", "D. 1, 2, 3, dan 4"], jawaban: "C", pembahasan: "Selisih rasio $= 5 - 3 = 2$ unit.\nNilai 1 unit $= \\frac{\\text{Rp90.000}}{2} = \\text{Rp45.000,00}$\nRian $= 3 \\times \\text{Rp45.000} = \\text{Rp135.000,00}$ → (1) BENAR\nDeni $= 5 \\times \\text{Rp45.000} = \\text{Rp225.000,00}$ → (2) BENAR\nKembalian Deni $= \\text{Rp300.000} - \\text{Rp225.000} = \\text{Rp75.000,00}$ (bukan Rp65.000) → (3) SALAH\nJumlah total $= \\text{Rp135.000} + \\text{Rp225.000} = \\text{Rp360.000,00}$ → (4) BENAR\nJawaban C" },
  { no: 25, soal: "Pak Hendra merencanakan pengerjaan renovasi toko yang dikerjakan oleh $12\\text{ pekerja}$ selesai dalam waktu $30\\text{ hari}$. Jika Pak Hendra menginginkan renovasi tersebut selesai lebih cepat dalam waktu $20\\text{ hari}$, banyak pekerja tambahan yang diperlukan adalah ....", options: ["A. $4\\text{ orang}$", "B. $6\\text{ orang}$", "C. $18\\text{ orang}$", "D. $24\\text{ orang}$"], jawaban: "B", pembahasan: "Perbandingan Berbalik Nilai:\n$\\frac{12}{x} = \\frac{20}{30} \\implies 20x = 360 \\implies x = 18\\text{ pekerja}$\nPekerja tambahan $= 18 - 12 = 6\\text{ orang}$ → Jawaban B" },
  { no: 26, type: "pgk" as const, soal: "Pak Heru adalah seorang arsitek. Ia membuat denah rancangan sebuah aula gedung beserta lahan parkirnya pada kertas gambar berukuran $40\\text{ cm} \\times 25\\text{ cm}$. Diketahui ukuran panjang dan lebar lahan aula sebenarnya berturut-turut adalah $16\\text{ m}$ dan $10\\text{ m}$.\n\nSkala yang MUNGKIN digunakan Pak Heru adalah ...", pernyataan: ["$1 : 30$", "$1 : 40$", "$1 : 50$", "$1 : 60$"], options: ["A. 1 saja", "B. 1 dan 2", "C. 2, 3, dan 4", "D. 1, 2, 3, dan 4"], jawaban: "C", pembahasan: "Panjang lahan $= 16\\text{ m} = 1.600\\text{ cm}$, Lebar $= 10\\text{ m} = 1.000\\text{ cm}$. Kertas $= 40\\text{ cm} \\times 25\\text{ cm}$.\nSkala minimum agar muat: $\\frac{1.600}{40} = 40$ dan $\\frac{1.000}{25} = 40$, jadi penyebut skala $\\geq 40$.\n(1) $1:30$ → penyebut $< 40$, tidak muat → TIDAK\n(2) $1:40$ → pas muat → BISA\n(3) $1:50$ → gambar lebih kecil → BISA\n(4) $1:60$ → gambar lebih kecil → BISA\nJawaban C" },
  { no: 27, type: "pgkbs" as const, soal: "Perbandingan banyak kelereng Andi dan Daryl adalah $2 : 3$. Sementara itu, perbandingan banyak kelereng Daryl dan Candra adalah $4 : 5$. Diketahui selisih kelereng antara anak yang memiliki kelereng terbanyak dan tersedikit adalah $14\\text{ buah}$.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", pernyataan: ["Banyak kelereng Daryl adalah 24 buah.", "Perbandingan banyak kelereng Andi dan Candra adalah $8 : 15$.", "Jumlah kelereng mereka bertiga seluruhnya adalah 70 buah."], jawabanBS: ["B", "B", "B"], pembahasan: "Penggabungan Rasio:\nAndi : Daryl $= 2:3 = 8:12$\nDaryl : Candra $= 4:5 = 12:15$\nAndi : Daryl : Candra $= 8:12:15$\nSelisih Andi (8) dan Candra (15) $= 7$ unit $= 14$ buah → 1 unit $= 2$ buah\nAndi $= 16$, Daryl $= 24$, Candra $= 30$, Total $= 70$\n(1) Daryl $= 24$ → BENAR\n(2) Andi : Candra $= 8:15$ → BENAR\n(3) Total $= 70$ → BENAR" },
  { no: 28, soal: "Sebuah kendaraan membutuhkan $20\\text{ liter}$ bensin untuk menempuh jarak $300\\text{ km}$. Jika tangki kendaraan tersebut terisi $32\\text{ liter}$ bensin, jarak maksimum yang dapat ditempuh adalah ....", options: ["A. $420\\text{ km}$", "B. $450\\text{ km}$", "C. $480\\text{ km}$", "D. $520\\text{ km}$"], jawaban: "C", pembahasan: "Perbandingan Senilai:\n$\\frac{20}{32} = \\frac{300}{x} \\implies 20x = 9.600 \\implies x = 480\\text{ km}$ → Jawaban C" },
  { no: 29, soal: "Persediaan pakan ternak cukup untuk $40\\text{ ekor}$ sapi selama $18\\text{ hari}$. Jika peternak menambah $5\\text{ ekor}$ sapi lagi, persediaan pakan tersebut akan habis dalam ....", options: ["A. $12\\text{ hari}$", "B. $14\\text{ hari}$", "C. $16\\text{ hari}$", "D. $20\\text{ hari}$"], jawaban: "C", pembahasan: "Total sapi $= 40 + 5 = 45\\text{ ekor}$.\nPerbandingan Berbalik Nilai:\n$\\frac{40}{45} = \\frac{x}{18} \\implies 45x = 720 \\implies x = 16\\text{ hari}$ → Jawaban C" },
  { no: 30, soal: "Ibu membeli pupuk tanaman seberat $30\\text{ kg}$ yang dikemas dalam $6\\text{ kantong}$. Laju perubahan antara berat pupuk terhadap banyaknya kantong pupuk yang tepat adalah ....", options: ["A. $\\frac{10\\text{ kg}}{3\\text{ kantong}}$", "B. $\\frac{15\\text{ kg}}{2\\text{ kantong}}$", "C. $\\frac{5\\text{ kg}}{1\\text{ kantong}}$", "D. $\\frac{20\\text{ kg}}{4\\text{ kantong}}$"], jawaban: "C", pembahasan: "Laju perubahan satuan $= \\frac{30\\text{ kg}}{6\\text{ kantong}} = \\frac{5\\text{ kg}}{1\\text{ kantong}}$ (5 kg/kantong) → Jawaban C" },
  { no: 31, soal: "Seorang perenang dapat menempuh jarak $200\\text{ meter}$ dalam waktu $20\\text{ detik}$. Laju perubahan satuan kecepatan perenang tersebut adalah ....", options: ["A. $8\\text{ m/detik}$", "B. $10\\text{ m/detik}$", "C. $12\\text{ m/detik}$", "D. $15\\text{ m/detik}$"], jawaban: "B", pembahasan: "Kecepatan (Laju) $= \\frac{\\text{Jarak}}{\\text{Waktu}} = \\frac{200\\text{ m}}{20\\text{ detik}} = 10\\text{ m/detik}$ → Jawaban B" },
  { no: 32, type: "pgk" as const, soal: "Tiga jenis barang ditimbang menggunakan alat berbeda. Sepaket buku ditimbang digital menunjukkan hasil $800\\text{ gram}$. Kotak pensil ditimbang jarum menunjukkan angka $1\\text{ kg}$. Tas sekolah ditimbang seimbang terhadap beban $2\\text{ kg}$.\n\nPernyataan yang BENAR adalah ...", pernyataan: ["Perbandingan berat buku dan kotak pensil adalah $4 : 5$.", "Perbandingan berat buku dan tas adalah $2 : 5$.", "Perbandingan berat ketiga jenis barang tersebut berturut-turut adalah $4 : 5 : 10$.", "Perbandingan berat tas dan kotak pensil adalah $2 : 1$."], options: ["A. 1 saja", "B. 1 dan 2", "C. 2 dan 3", "D. 1, 2, 3, dan 4"], jawaban: "D", pembahasan: "Konversi ke gram: Buku $= 800\\text{ g}$, Kotak pensil $= 1.000\\text{ g}$, Tas $= 2.000\\text{ g}$\n(1) Buku : Kotak Pensil $= 800:1.000 = 4:5$ → BENAR\n(2) Buku : Tas $= 800:2.000 = 2:5$ → BENAR\n(3) Buku : Kotak Pensil : Tas $= 800:1.000:2.000 = 4:5:10$ → BENAR\n(4) Tas : Kotak Pensil $= 2.000:1.000 = 2:1$ → BENAR\nJawaban D" },
  { no: 33, type: "pgkbs" as const, soal: "Perhatikan informasi peta pulau dengan skala $1 : 500.000$ berikut!\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!", pernyataan: ["Jika jarak Kota A ke B pada peta $12\\text{ cm}$, jarak sebenarnya adalah $60\\text{ km}$.", "Jika jarak Kota B ke C pada peta $20\\text{ cm}$, jarak sebenarnya adalah $100\\text{ km}$.", "Jika jarak sebenarnya dua kota adalah $150\\text{ km}$, jarak pada petanya adalah $25\\text{ cm}$."], jawabanBS: ["B", "B", "S"], pembahasan: "Skala $1:500.000 \\implies 1\\text{ cm}$ peta $= 5\\text{ km}$ sebenarnya.\n(1) $12\\text{ cm} \\times 5 = 60\\text{ km}$ → BENAR\n(2) $20\\text{ cm} \\times 5 = 100\\text{ km}$ → BENAR\n(3) $\\frac{150\\text{ km}}{5\\text{ km/cm}} = 30\\text{ cm}$ (bukan $25\\text{ cm}$) → SALAH" },
  { no: 34, soal: "Untuk membuat $15\\text{ porsi}$ makanan dibutuhkan $6\\text{ kg}$ beras. Jika warung makan memiliki persediaan $10\\text{ kg}$ beras dan akan digunakan seluruhnya, banyak porsi makanan yang dapat dibuat adalah ....", options: ["A. $20\\text{ porsi}$", "B. $25\\text{ porsi}$", "C. $30\\text{ porsi}$", "D. $35\\text{ porsi}$"], jawaban: "B", pembahasan: "Perbandingan Senilai:\n$\\frac{15}{x} = \\frac{6}{10} \\implies 6x = 150 \\implies x = 25\\text{ porsi}$ → Jawaban B" },
  { no: 35, soal: "Kontraktor memprediksi pembuatan jembatan selesai dalam $40\\text{ hari}$ dengan $15\\text{ pekerja}$. Setelah $10\\text{ hari}$ bekerja, proyek terhenti selama $6\\text{ hari}$ akibat kendala cuaca. Jika proyek harus selesai tepat sesuai jadwal semula, berapa tambahan pekerja yang dibutuhkan?", options: ["A. $3\\text{ orang}$", "B. $4\\text{ orang}$", "C. $5\\text{ orang}$", "D. $6\\text{ orang}$"], jawaban: "B", pembahasan: "Sisa waktu ideal $= 40 - 10 = 30\\text{ hari}$.\nSisa waktu nyata $= 30 - 6 = 24\\text{ hari}$.\nBeban kerja tersisa $= 30 \\times 15 = 450\\text{ hari-orang}$.\nPekerja yang diperlukan $= \\frac{450}{24} = 18{,}75$ orang. Karena jumlah pekerja harus bilangan bulat dan seluruh pekerjaan harus selesai, dibulatkan ke atas menjadi 19 orang.\nTambahan $= 19 - 15 = 4\\text{ orang}$ → Jawaban B" },
];

const soalDihapus = new Set([4, 19, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]);

const formatPembahasan = (soal: LatihanSoal) => {
  const answer = soal.jawaban
    ? `Pilihan ${soal.jawaban}`
    : soal.jawabanBS
      ? soal.jawabanBS.map((value, index) => `(${index + 1}) ${value}`).join(", ")
      : "Sesuai hasil perhitungan";
  const lowerText = (soal.pembahasan ?? "").toLowerCase();
  const concept =
    lowerText.includes("perbandingan senilai")
      ? "Untuk perbandingan senilai, susun tabel V₁ | V₂ dengan baris a, b lalu c, d. Gunakan kali silang: ad = cb."
      : lowerText.includes("perbandingan berbalik")
        ? "Untuk perbandingan berbalik nilai, susun tabel V₁ | V₂ dengan baris a, b lalu c, d. Gunakan kali sejajar: ab = cd."
        : "Tentukan informasi yang diketahui, pilih hubungan besaran yang tepat, lalu hitung secara berurutan.";
  return `Jawaban: ${answer}\n\nKonsep dan Trik: ${concept}\n\nStep by Step Penyelesaian:\n${soal.pembahasan ?? "Kerjakan dengan menggunakan informasi pada soal."}`;
};

const latihanPerbandingan = latihanDasar
  .filter((soal) => !soalDihapus.has(soal.no))
  .map((soal, index) => ({
    ...soal,
    no: index + 1,
    pembahasan: formatPembahasan(soal),
  }));

import type { LatihanSoal as LS } from "@/components/tka/TKAPemantapanLayout";

const contohSoal: LS[] = [
  {
    no: 101,
    type: "pgkbs",
    soal: "Sebuah botol minuman sirup berkapasitas 500 mL dibuat dari campuran 350 mL air, 100 mL sirup konsentrat, dan sisanya adalah es batu. Kakak ingin membuat minuman sirup tersebut dalam wadah besar berukuran 2 liter.\n\nBerdasarkan informasi di atas, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    pernyataan: [
      "Kebutuhan air untuk membuat 2 liter minuman sirup tersebut adalah $1.400\\text{ mL}$.",
      "Kebutuhan sirup konsentrat untuk membuat 2 liter minuman sirup adalah $300\\text{ mL}$.",
      "Kebutuhan es batu untuk membuat 2 liter minuman sirup tersebut adalah $200\\text{ mL}$.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Komposisi 1 botol (500 mL): Air = 350 mL, Sirup = 100 mL, Es batu = 500 − (350 + 100) = 50 mL\nSkala penggandaan: 2.000 mL ÷ 500 mL = 4 kali\n(1) Air = 4 × 350 = 1.400 mL → BENAR\n(2) Sirup = 4 × 100 = 400 mL (bukan 300 mL) → SALAH\n(3) Es batu = 4 × 50 = 200 mL → BENAR",
  },
  {
    no: 102,
    type: "pgkbs",
    soal: "Sisca membeli jepit rambut sebanyak 1 lusin dengan harga total Rp36.000,00.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    pernyataan: [
      "Laju perubahan antara total harga dan jumlah jepit rambut adalah Rp36.000,00 per 12 buah.",
      "Laju perubahan satuan harga per buah jepit rambut adalah Rp3.000,00/buah.",
      "Laju perubahan antara total harga dan jumlah jepit rambut setara dengan Rp60.000,00 per 18 buah.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Data: 1 lusin = 12 buah, harga = Rp36.000,00\n(1) Laju perubahan = Rp36.000 per 12 buah → BENAR\n(2) Harga satuan = Rp36.000 ÷ 12 = Rp3.000,00/buah → BENAR\n(3) Untuk 18 buah: harga = 18 × Rp3.000 = Rp54.000,00 (bukan Rp60.000,00) → SALAH",
  },
  {
    no: 103,
    type: "pgkbs",
    soal: "Pak Ahmad merencanakan pembangunan gedung olahraga dengan ukuran asli 40 m × 50 m. Sebelum membangun, ia menggambar cetak biru (blueprint) gedung tersebut dengan ukuran 10 cm × 12,5 cm.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    pernyataan: [
      "Skala yang digunakan oleh Pak Ahmad pada blueprint tersebut adalah $1 : 400$.",
      "Ukuran gedung sebenarnya $500$ kali lebih besar daripada ukuran pada blueprint.",
      "Perbandingan luas cetak biru dengan luas gedung sebenarnya adalah $1 : 160.000$.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Ukuran sebenarnya: 40 m = 4.000 cm, 50 m = 5.000 cm.\n(1) Skala = 10 cm ÷ 4.000 cm = 1 : 400 → BENAR.\n(2) Skala 1:400 berarti 400 kali lebih besar (bukan 500 kali) → SALAH.\n(3) Luas blueprint = 10 × 12,5 = 125 cm². Luas sebenarnya = 4.000 × 5.000 = 20.000.000 cm². Perbandingan = 125 : 20.000.000 = 1 : 160.000 → BENAR.",
  },
  {
    no: 104,
    type: "pgkbs",
    soal: "Sebuah UMKM konveksi sanggup memproduksi 200 potong baju dalam waktu satu minggu menggunakan 10 orang pekerja. Pada minggu ini, sebanyak 2 orang pekerja tidak masuk karena izin sakit.\n\nBerdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    pernyataan: [
      "Total baju yang berhasil diproduksi pada minggu ini adalah 160 potong.",
      "Pada minggu ini, rata-rata produksi baju oleh satu orang pekerja adalah 2,8 potong per hari.",
      "Agar total produksi tetap 200 potong baju, setiap pekerja yang hadir harus menyelesaikan 25 potong baju pada minggu ini.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Pekerja aktif = 10 − 2 = 8 orang. Kapasitas per pekerja = 200 ÷ 10 = 20 baju/minggu.\n(1) Produksi 8 pekerja = 8 × 20 = 160 potong → BENAR\n(2) 1 minggu = 7 hari. Produksi 1 pekerja per hari = 20 ÷ 7 ≈ 2,85 ≈ 2,8 potong/hari → BENAR\n(3) Agar tetap 200 potong dengan 8 pekerja: beban per pekerja = 200 ÷ 8 = 25 potong → BENAR",
  },
  {
    no: 105,
    type: "pg",
    soal: "Untuk merenovasi sebuah ruang kelas, dibutuhkan 10 pekerja selama 20 hari. Jika renovasi tersebut ditargetkan selesai dalam waktu 8 hari, berapa banyak pekerja yang dibutuhkan untuk menyelesaikan pekerjaan tersebut tepat waktu?",
    options: ["A. 22 pekerja", "B. 25 pekerja", "C. 28 pekerja", "D. 30 pekerja"],
    jawaban: "B",
    pembahasan: "Konsep: Perbandingan Berbalik Nilai (waktu lebih singkat → pekerja lebih banyak).\nFormulasi: $\\frac{\\text{Pekerja}_1}{\\text{Pekerja}_2} = \\frac{\\text{Waktu}_2}{\\text{Waktu}_1}$\nPerhitungan: $\\frac{10}{x} = \\frac{8}{20}$\n$8x = 200$\n$x = 25$ pekerja → Jawaban B",
  },
];

const latihanPerbandinganTampil = latihanDasar
  .filter((soal) => !new Set([12, 13]).has(soal.no))
  .map((soal, index) => ({ ...soal, displayNo: index + 1 }));

const PerbandinganPage = () => (
  <TKAPemantapanLayout
    title="PERBANDINGAN"
    materiSections={materiSections}
    latihanDasar={latihanPerbandinganTampil}
    contohSoal={contohSoal}
  />
);

export default PerbandinganPage;
