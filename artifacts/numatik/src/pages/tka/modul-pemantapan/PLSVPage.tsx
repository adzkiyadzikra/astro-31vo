import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { BlockMath, InlineMath } from "react-katex";

const materiSections: MateriSection[] = [
  { heading: "A. Persamaan Linear Satu Variabel (PLSV)", content: `Persamaan linear satu variabel adalah kalimat matematika terbuka yang hanya memuat satu variabel dan berpangkat satu.\n\nBentuk umum: $ax + b = 0$, dengan $a \\neq 0$, $x$ variabel, $a$ koefisien, $b$ konstanta.\n\nSifat-sifat kesetaraan persamaan:\n1. Kedua ruas ditambah/dikurang bilangan yang sama.\n2. Kedua ruas dikali/dibagi bilangan yang sama (bukan nol).` },
  { heading: "B. Pertidaksamaan Linear Satu Variabel (PtLSV)", content: `PtLSV adalah kalimat matematika terbuka yang menggunakan tanda ketidaksamaan: $<$, $>$, $\\leq$, $\\geq$.\n\nBentuk umum: $ax + b < 0$, $ax + b > 0$, $ax + b \\leq 0$, $ax + b \\geq 0$, dengan $a \\neq 0$.\n\nHimpunan penyelesaian PtLSV dapat digambarkan pada garis bilangan.\n\nPerhatikan: jika kedua ruas dikalikan atau dibagi dengan bilangan negatif, tanda ketidaksamaan harus dibalik.` },
  {
    heading: "C. Metode Penyelesaian",
    content: `Langkah-langkah menyelesaikan PLSV/PtLSV:\n1. Kumpulkan suku yang memuat variabel di ruas kiri.\n2. Kumpulkan konstanta di ruas kanan.\n3. Sederhanakan hingga bentuk $ax = b$ atau $ax$ (tanda) $b$.\n4. Bagi kedua ruas dengan koefisien $a$.\n5. Untuk PtLSV: perhatikan arah tanda ketidaksamaan bila mengalikan/membagi bilangan negatif.`,
    jsxAfter: (
      <div className="mt-4 space-y-4">
        {/* ── Aturan Pembalikan Tanda ── */}
        <div className="rounded-xl overflow-hidden border border-rose-500/40"
          style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.12), rgba(15,12,41,0.95))" }}>
          <div className="px-4 py-3 flex items-center gap-2 border-b border-rose-500/20"
            style={{ background: "rgba(244,63,94,0.15)" }}>
            <span className="text-base">⚠️</span>
            <span className="font-display text-xs font-bold text-rose-300 tracking-wide uppercase">
              Aturan Penting — Pembalikan Tanda Pertidaksamaan
            </span>
          </div>
          <div className="px-4 py-3">
            <p className="font-body text-sm text-white/80 leading-relaxed mb-3">
              Jika kedua ruas pertidaksamaan <strong className="text-rose-300">dikalikan</strong> atau{" "}
              <strong className="text-rose-300">dibagi</strong> dengan bilangan{" "}
              <strong className="text-rose-300">NEGATIF</strong>, maka tanda pertidaksamaan harus{" "}
              <strong className="text-yellow-300">DIBALIK</strong>.
            </p>

            {/* Symbol flip table */}
            <div className="rounded-xl overflow-hidden border border-white/10 mb-3">
              <div className="grid grid-cols-3 border-b border-white/10 text-center"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="py-2 text-[10px] font-bold font-display text-white/50 uppercase tracking-widest">Tanda Asal</div>
                <div className="py-2 text-[10px] font-bold font-display text-yellow-400/70 uppercase tracking-widest border-x border-white/10">Perubahan</div>
                <div className="py-2 text-[10px] font-bold font-display text-white/50 uppercase tracking-widest">Tanda Baru</div>
              </div>
              {[
                { from: "<", arrow: "→", to: ">" },
                { from: ">", arrow: "→", to: "<" },
                { from: "\\leq", arrow: "→", to: "\\geq" },
                { from: "\\geq", arrow: "→", to: "\\leq" },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-3 text-center items-center ${i < 3 ? "border-b border-white/8" : ""}`}
                  style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                  <div className="py-3 text-lg font-bold text-sky-300">
                    <InlineMath math={row.from} />
                  </div>
                  <div className="py-3 border-x border-white/10">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-yellow-300"
                      style={{ background: "rgba(234,179,8,0.18)", border: "1px solid rgba(234,179,8,0.35)" }}>
                      ×(−)
                    </span>
                  </div>
                  <div className="py-3 text-lg font-bold text-rose-300">
                    <InlineMath math={row.to} />
                  </div>
                </div>
              ))}
            </div>

            {/* Example */}
            <div className="rounded-xl border border-emerald-500/30 overflow-hidden"
              style={{ background: "rgba(16,185,129,0.07)" }}>
              <div className="px-4 py-2 border-b border-emerald-500/20 flex items-center gap-2">
                <span className="text-xs font-bold font-display text-emerald-400">📌 Contoh Penerapan</span>
              </div>
              <div className="px-4 py-3 space-y-2 font-body text-sm text-white/80">
                <p>Selesaikan: <InlineMath math="-2x \geq 24" /></p>
                <div className="bg-slate-900/60 rounded-lg p-3 text-center space-y-1">
                  <BlockMath math="-2x \geq 24" />
                  <p className="text-xs text-yellow-300/80 font-body">
                    ÷ (−2) kedua ruas → tanda <InlineMath math="\geq" /> berubah menjadi <InlineMath math="\leq" />
                  </p>
                  <BlockMath math="x \leq -12" />
                </div>
                <p className="text-xs text-white/50">
                  Jika dibagi <strong className="text-rose-300">+2</strong> (positif): tanda tetap.{" "}
                  Jika dibagi <strong className="text-rose-300">−2</strong> (negatif): tanda <strong className="text-yellow-300">dibalik</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  { heading: "D. Memodelkan Masalah", content: `Soal cerita dapat dimodelkan ke dalam PLSV/PtLSV:\n1. Tetapkan variabel untuk besaran yang dicari.\n2. Ubah kalimat soal menjadi kalimat matematika.\n3. Selesaikan persamaan atau pertidaksamaan.\n4. Periksa jawaban dengan mensubstitusi kembali.` },
];

const contohSoal: LatihanSoal[] = [
  {
    no: 1,
    type: "pg",
    soal: "Apabila $x$ merupakan penyelesaian dari persamaan $4x - 5 = 2x + 11$, berapakah nilai dari $x + 4$?",
    options: ["A. $2$", "B. $8$", "C. $12$", "D. $15$"],
    jawaban: "C",
    pembahasan: "Kelompokkan suku berpangkat/bervariabel dan konstanta pada ruas yang berbeda:\n$4x - 5 = 2x + 11$\n$4x - 2x = 11 + 5$\n$2x = 16$\nKalikan kedua ruas dengan $\\frac{1}{2}$ untuk mendapatkan nilai $x$:\n$x = 8$\nTentukan nilai $x + 4$:\n$x + 4 = 8 + 4 = 12$\nJawaban: C",
  },
  {
    no: 2,
    type: "pg",
    soal: "Tentukan himpunan penyelesaian dari pertidaksamaan $6x - 4 \\ge 20 + 8x$, di mana $x$ adalah anggota bilangan bulat!",
    options: [
      "A. $\\{\\dots, -15, -14, -13\\}$",
      "B. $\\{\\dots, -14, -13, -12\\}$",
      "C. $\\{\\dots, -14, -13, -12, -11\\}$",
      "D. $\\{-11, -10, -9, \\dots\\}$",
    ],
    jawaban: "A",
    pembahasan: "Pindahkan variabel ke ruas kiri dan konstanta ke ruas kanan:\n$6x - 4 \\ge 20 + 8x$\n$6x - 8x \\ge 20 + 4$\n$-2x \\ge 24$\nBagi kedua ruas dengan $-2$ (ingat: tanda pertidaksamaan akan berbalik jika dibagi/dikalikan bilangan negatif):\n$x \\le -12$\nAnggota himpunan penyelesaian untuk $x \\le -12$ adalah $\\{\\dots, -15, -14, -13, -12\\}$.\nJawaban: A",
  },
  {
    no: 3,
    type: "pgkbs",
    soal: "Sebuah kebun berbentuk persegi panjang memiliki ukuran panjang $(4x + 3)\\text{ cm}$ dan lebar $(2x - 1)\\text{ cm}$. Jika keliling kebun tersebut diketahui $76\\text{ cm}$, beri tanda centang ($\\checkmark$) pada pernyataan yang bernilai benar!",
    pernyataan: [
      "Panjang kebun tersebut adalah $27\\text{ cm}$.",
      "Lebar kebun tersebut adalah $11\\text{ cm}$.",
      "Selisih antara panjang dan lebar kebun adalah $16\\text{ cm}$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Mencari nilai $x$ melalui rumus keliling:\n$K = 2 \\times (p + l)$\n$76 = 2 \\times \\big((4x + 3) + (2x - 1)\\big)$\n$76 = 2 \\times (6x + 2)$\n$76 = 12x + 4$\n$12x = 72 \\implies x = 6$\nPanjang: $p = 4(6) + 3 = 27\\text{ cm}$ → BENAR.\nLebar: $l = 2(6) - 1 = 11\\text{ cm}$ → BENAR.\nSelisih: $p - l = 27 - 11 = 16\\text{ cm}$ → BENAR.\nJadi ketiga pernyataan BENAR.",
  },
  {
    no: 4,
    type: "pgkbs",
    soal: "Pak Budi mempunyai sebidang tanah berbentuk belah ketupat dengan panjang diagonal masing-masing $(2x + 6)\\text{ meter}$ dan $(4x - 10)\\text{ meter}$. Jika kedua diagonal tersebut sama panjang, tanah itu dibagi menjadi 4 bagian sama besar. Tentukan apakah pernyataan berikut Benar atau Salah!",
    pernyataan: [
      "Panjang diagonal tanah tersebut adalah $22\\text{ meter}$.",
      "Luas seluruh tanah tersebut adalah $242\\text{ m}^2$.",
      "Luas setiap bagian tanah yang telah dibagi adalah $121\\text{ m}^2$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Karena kedua diagonal sama panjang:\n$2x + 6 = 4x - 10$\n$2x = 16 \\implies x = 8$\nPanjang masing-masing diagonal adalah $2(8) + 6 = 22\\text{ m}$ → Pernyataan (1) BENAR.\n\nLuas belah ketupat:\n$L = \\frac{1}{2}d_1d_2 = \\frac{1}{2}\\times22\\times22 = 242\\text{ m}^2$ → Pernyataan (2) BENAR.\n\nKarena tanah dibagi menjadi 4 bagian sama besar, luas tiap bagian adalah $\\frac{242}{4}=60{,}5\\text{ m}^2$, bukan $121\\text{ m}^2$ → Pernyataan (3) SALAH.",
  },
  {
    no: 5,
    type: "pg",
    soal: "Tentukan himpunan penyelesaian dari pertidaksamaan $\\dfrac{1}{3}x - 3 > \\dfrac{3}{5}x + 5$!",
    options: ["A. $x < -30$", "B. $x < -20$", "C. $x > -30$", "D. $x > -20$"],
    jawaban: "A",
    pembahasan: "Kelompokkan variabel dan konstanta:\n$\\frac{1}{3}x - \\frac{3}{5}x > 5 + 3$\nSamakan penyebut ruas kiri:\n$\\left(\\frac{5 - 9}{15}\\right)x > 8$\n$-\\frac{4}{15}x > 8$\nKalikan kedua ruas dengan $-\\frac{15}{4}$ (tanda pertidaksamaan dibalik):\n$x < 8 \\times \\left(-\\frac{15}{4}\\right)$\n$x < -30$\nJawaban: A",
  },
];

const latihanDasar: LatihanSoal[] = [
  // ── No. 1 — PG ──────────────────────────────────────────────────────────────
  {
    no: 1, type: "pg",
    soal: "Jika $p$ merupakan penyelesaian dari $6(2x + 5) = 3(3x - 2) + 6$, maka nilai $p + 2$ adalah ...",
    options: ["A. $-4$", "B. $-6$", "C. $-8$", "D. $-10$"],
    jawaban: "C",
    pembahasan: "Uraikan kedua ruas:\n$12x + 30 = 9x - 6 + 6$\n$12x + 30 = 9x$\n$3x = -30$\n$x = p = -10$\n$p + 2 = -10 + 2 = -8$ → Jawaban C",
  },

  // ── No. 2 — PGK ─────────────────────────────────────────────────────────────
  {
    no: 2, type: "pgk",
    soal: "Perhatikan pertidaksamaan $6x - 4 \\geq 20 + 8x$. Pernyataan-pernyataan berikut berkaitan dengan penyelesaiannya.",
    pernyataan: [
      "Setelah pengelompokan suku, diperoleh $-2x \\geq 24$.",
      "Ketika membagi kedua ruas dengan $-2$, tanda pertidaksamaan harus dibalik menjadi $x \\geq -12$.",
      "Nilai $x = -12$ memenuhi pertidaksamaan tersebut.",
      "Nilai $x = -11$ termasuk dalam himpunan penyelesaian.",
    ],
    options: [
      "A. 1 dan 3",
      "B. 1 dan 4",
      "C. 2 dan 4",
      "D. 1, 2, dan 3",
    ],
    jawaban: "A",
    pembahasan: "Langkah penyelesaian:\n$6x - 4 \\geq 20 + 8x$\n$6x - 8x \\geq 20 + 4$\n$-2x \\geq 24$ → Pernyataan (1) BENAR.\n\nBagi dengan $-2$ (negatif), tanda harus dibalik sehingga diperoleh $x \\leq -12$, bukan $x \\geq -12$ → Pernyataan (2) SALAH.\n\nCek $x=-12$: $6(-12)-4=-76$ dan $20+8(-12)=-76$, sehingga memenuhi → Pernyataan (3) BENAR.\nCek $x=-11$: karena $-11>-12$, nilai ini tidak memenuhi $x\\leq-12$ → Pernyataan (4) SALAH.\n\nPernyataan yang benar adalah 1 dan 3 → Jawaban A",
  },

  // ── No. 3 — PGKBS ───────────────────────────────────────────────────────────
  {
    no: 3, type: "pg",
    soal: "TKA Matematika 2026 — Diketahui pertidaksamaan $3x+17\\leq7-2x$. Manakah garis bilangan yang menunjukkan himpunan penyelesaian dari pertidaksamaan tersebut?",
    options: ["[IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-REd3lrUoBOoghHUZa7mx7r3sG60Cvb.png]", "[IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-v9ksG7Vz3P0I0bldNBS6meA3Sxx6MU.png]", "[IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1wWLkU09NSWKe1LSyPj527qPECL286.png]", "[IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-850rs5dv9p436Ji1DNBbDXdkOtCN5B.png]"],
    jawaban: "A",
    pembahasan: "$3x+17\\leq7-2x \\Rightarrow 5x\\leq-10 \\Rightarrow x\\leq-2$. Jadi garis bilangan menggunakan titik penuh di $-2$ dan arsiran ke kiri: jawaban A.",
  },

  // ── No. 4 — PG ──────────────────────────────────────────────────────────────
  {
    no: 4, type: "pg",
    soal: "Persamaan $5(2x - 3) + 4 = 2(3x + 1) - (-3)$ mempunyai penyelesaian $n$. Nilai dari $3n + 5$ adalah ...",
    options: ["A. $4$", "B. $7$", "C. $13$", "D. $17$"],
    jawaban: "D",
    pembahasan: "$10x - 15 + 4 = 6x + 2 + 3$\n$10x - 11 = 6x + 5$\n$4x = 16 \\Rightarrow x = n = 4$\n$3n + 5 = 12 + 5 = 17$ → Jawaban D",
  },

  // ── No. 5 — PGK ─────────────────────────────────────────────────────────────
  {
    no: 5, type: "pgk",
    soal: "Diberikan persamaan $\\dfrac{1}{2}(x - 6) = 2 + 3x$. Pernyataan-pernyataan di bawah ini berkaitan dengan penyelesaiannya.",
    pernyataan: [
      "Mengalikan kedua ruas dengan 2 menghasilkan $x - 6 = 4 + 6x$.",
      "Koefisien $x$ setelah pengelompokan suku adalah $-5$.",
      "Penyelesaian persamaan adalah $x = -3$.",
      "Nilai $x + 5 = -7$ untuk nilai $x$ yang diperoleh.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 1 dan 4",
      "C. 1, 2, dan 3",
      "D. 2, 3, dan 4",
    ],
    jawaban: "A",
    pembahasan: "Kalikan kedua ruas dengan 2:\n$x - 6 = 4 + 6x$ → Pernyataan (1) BENAR.\n\nKelompokkan suku:\n$x-6x=4+6 \\Rightarrow -5x=10$, sehingga koefisien $x$ adalah $-5$ → Pernyataan (2) BENAR.\n\nDari $-5x=10$ diperoleh $x=-2$, bukan $x=-3$ → Pernyataan (3) SALAH.\nUntuk $x=-2$, $x+5=3$, bukan $-7$ → Pernyataan (4) SALAH.\n\nPernyataan yang benar adalah 1 dan 2 → Jawaban A",
  },

  // ── No. 6 — PGKBS ───────────────────────────────────────────────────────────
  {
    no: 6, type: "pgkbs",
    soal: "Diketahui persamaan $\\dfrac{4x + 5}{2x + 1} = \\dfrac{16}{5}$. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Dengan perkalian silang diperoleh $5(4x + 5) = 16(2x + 1)$.",
      "Penyelesaian persamaan tersebut adalah $x = \\dfrac{3}{4}$.",
      "Nilai $4x + 5 = 7$ untuk nilai $x$ yang diperoleh.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Perkalian silang: $5(4x+5) = 16(2x+1)$ → Pernyataan (1) BENAR\n$20x + 25 = 32x + 16$\n$-12x = -9 \\Rightarrow x = \\dfrac{3}{4}$ → Pernyataan (2) BENAR\nUji: $4 \\times \\frac{3}{4} + 5 = 3 + 5 = 8 \\neq 7$ → Pernyataan (3) SALAH",
  },

  // ── No. 7 — PG ──────────────────────────────────────────────────────────────
  {
    no: 7, type: "pg",
    soal: "Jika $\\dfrac{4}{x - 3} = \\dfrac{2}{x + 1}$, maka nilai $x$ yang memenuhi adalah ...",
    options: ["A. $-5$", "B. $-4$", "C. $-2$", "D. $5$"],
    jawaban: "A",
    pembahasan: "Perkalian silang:\n$4(x + 1) = 2(x - 3)$\n$4x + 4 = 2x - 6$\n$2x = -10 \\Rightarrow x = -5$ → Jawaban A",
  },

  // ── No. 8 — PGK ─────────────────────────────────────────────────────────────
  {
    no: 8, type: "pgk",
    soal: "Perhatikan persamaan $\\dfrac{x + 3}{2} - \\dfrac{x - 1}{4} = 3$. Pernyataan-pernyataan berikut berkaitan dengan penyelesaiannya.",
    pernyataan: [
      "KPK dari penyebut 2 dan 4 pada persamaan tersebut adalah 4.",
      "Setelah mengalikan dengan KPK, diperoleh $2(x + 3) - (x - 1) = 8$.",
      "Penyelesaian persamaan tersebut adalah $x = 4$.",
      "Nilai $\\dfrac{x - 1}{4}$ untuk nilai $x$ yang diperoleh adalah 1.",
    ],
    options: [
      "A. 1 dan 4",
      "B. 2 dan 4",
      "C. 1, 2, dan 3",
      "D. 2, 3, dan 4",
    ],
    jawaban: "A",
    pembahasan: "KPK(2,4)=4 → Pernyataan (1) BENAR.\n\nSetelah kedua ruas dikalikan 4, diperoleh $2(x+3)-(x-1)=12$, bukan $8$ → Pernyataan (2) SALAH.\n\nSederhanakan persamaan yang benar:\n$2x+6-x+1=12 \\Rightarrow x+7=12 \\Rightarrow x=5$, bukan $4$ → Pernyataan (3) SALAH.\n\nUntuk $x=5$, $\\frac{x-1}{4}=\\frac{4}{4}=1$ → Pernyataan (4) BENAR.\n\nPernyataan yang benar adalah 1 dan 4 → Jawaban A",
  },

  // ── No. 9 — PGKBS ───────────────────────────────────────────────────────────
  {
    no: 9, type: "pgkbs",
    soal: "Diketahui pertidaksamaan $3(2x + 4) \\leq 2(x - 2)$, dengan $x$ bilangan bulat. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Penyelesaian pertidaksamaan adalah $x \\leq -4$.",
      "Nilai $x = -3$ memenuhi pertidaksamaan tersebut.",
      "Himpunan penyelesaian untuk bilangan bulat adalah $\\{\\ldots, -6, -5, -4\\}$.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "$6x + 12 \\leq 2x - 4$\n$4x \\leq -16 \\Rightarrow x \\leq -4$ → Pernyataan (1) BENAR\nUji $x = -3$: $-3 > -4$, tidak memenuhi → Pernyataan (2) SALAH\nHP bilangan bulat: $\\{\\ldots, -6, -5, -4\\}$ → Pernyataan (3) BENAR",
  },

  // ── No. 10 — PG ─────────────────────────────────────────────────────────────
  {
    no: 10, type: "pg",
    soal: "Himpunan penyelesaian dari $2x - 3 \\geq 21 + 4x$ dengan $x$ bilangan bulat adalah ...",
    options: [
      "A. $\\{-12, -11, -10, \\ldots\\}$",
      "B. $\\{\\ldots, -14, -13, -12\\}$",
      "C. $\\{-11, -10, -9, \\ldots\\}$",
      "D. $\\{\\ldots, -13, -12, -11\\}$",
    ],
    jawaban: "B",
    pembahasan: "$2x - 3 \\geq 21 + 4x$\n$2x - 4x \\geq 21 + 3$\n$-2x \\geq 24$\nBagi dengan $-2$ (tanda dibalik): $x \\leq -12$\nHP bilangan bulat: $\\{\\ldots, -14, -13, -12\\}$ → Jawaban B",
  },

  // ── No. 11 — PGK ────────────────────────────────────────────────────────────
  {
    no: 11, type: "pgk",
    soal: "Harga sebuah buku Rp4.000,00 lebihnya dari harga bolpoin. Carrisa membeli dua buah buku dan sebuah bolpoin seharga Rp26.000,00. Pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Jika harga bolpoin $x$ rupiah, maka harga buku $(x + 4.000)$ rupiah.",
      "Model matematika yang tepat adalah $3x + 8.000 = 26.000$.",
      "Harga bolpoin adalah Rp7.000,00.",
      "Harga buku adalah Rp12.000,00.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 2 dan 4",
      "C. 1, 2, dan 3",
      "D. 1, 3, dan 4",
    ],
    jawaban: "A",
    pembahasan: "Harga buku $=x+4.000$ → Pernyataan (1) BENAR.\n\nModel pembelian:\n$2(x+4.000)+x=26.000 \\Rightarrow 3x+8.000=26.000$ → Pernyataan (2) BENAR.\n\n$3x=18.000 \\Rightarrow x=6.000$, sehingga harga bolpoin Rp6.000,00, bukan Rp7.000,00 → Pernyataan (3) SALAH.\nHarga buku $=6.000+4.000=10.000$, bukan Rp12.000,00 → Pernyataan (4) SALAH.\n\nPernyataan yang benar adalah 1 dan 2 → Jawaban A",
  },

  // ── No. 12 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 12, type: "pgkbs",
    soal: "Umur ayah $p$ tahun dan ayah 6 tahun lebih tua dari paman. Jika jumlah umur paman dan ayah adalah 38 tahun, tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Model matematika yang tepat adalah $2p - 6 = 38$.",
      "Umur ayah adalah 22 tahun.",
      "Umur paman adalah 10 tahun.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Umur paman $= p - 6$\n$p + (p - 6) = 38 \\Rightarrow 2p - 6 = 38$ → Pernyataan (1) BENAR\n$2p = 44 \\Rightarrow p = 22$ → Pernyataan (2) BENAR\nUmur paman $= 22 - 6 = 16 \\neq 10$ → Pernyataan (3) SALAH",
  },

  // ── No. 13 — PG ─────────────────────────────────────────────────────────────
  {
    no: 13, type: "pg",
    soal: "Besar uang Rohayah sama dengan tiga kali dari Rp5.000,00 lebihnya dari uang Danu, kemudian dikurangi Rp10.000,00. Jika uang Danu dimisalkan $p$, maka uang Rohayah dapat dinyatakan sebagai ...",
    options: [
      "A. $3(p - 5.000) - 10.000$",
      "B. $3(p + 5.000) - 10.000$",
      "C. $3p - 5.000 - 10.000$",
      "D. $3p + 5.000 - 10.000$",
    ],
    jawaban: "B",
    pembahasan: "Rp5.000 lebihnya dari uang Danu $= p + 5.000$\nTiga kali dari itu $= 3(p + 5.000)$\nDikurangi Rp10.000 $= 3(p + 5.000) - 10.000$ → Jawaban B",
  },

  // ── No. 14 — PGK ────────────────────────────────────────────────────────────
  {
    no: 14, type: "pgk",
    soal: "Jumlah tiga bilangan ganjil berurutan adalah 45. Pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Jika bilangan terkecil adalah $n$, maka persamaannya adalah $3n = 45$.",
      "Bilangan tengah dari ketiga bilangan tersebut adalah 15.",
      "Tiga bilangan ganjil berurutan tersebut adalah 13, 15, dan 17.",
      "Jumlah bilangan terbesar dan terkecil adalah 32.",
    ],
    options: [
      "A. 1 dan 4",
      "B. 2 dan 4",
      "C. 2 dan 3",
      "D. 1, 2, dan 3",
    ],
    jawaban: "C",
    pembahasan: "Misalkan bilangan tengah adalah $n$. Karena bilangan-bilangannya ganjil berurutan, ketiganya dapat ditulis sebagai $(n-2), n, (n+2)$.\nJumlahnya $3n=45 \\Rightarrow n=15$.\n\nPernyataan (1) SALAH karena jika $n$ menyatakan bilangan terkecil, jumlahnya bukan $3n$; bentuknya harus $n+(n+2)+(n+4)=45$.\nPernyataan (2) BENAR karena bilangan tengah adalah $15$.\nPernyataan (3) BENAR karena bilangannya $13,15,17$.\nPernyataan (4) SALAH karena $17+13=30$, bukan $32$.\n\nPernyataan yang benar adalah 2 dan 3 → Jawaban C",
  },

  // ── No. 15 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 15, type: "pgkbs",
    soal: "Sebuah taman berbentuk persegi panjang dengan panjang $(2x + 5)$ m dan lebar $(3x - 2)$ m. Kelilingnya adalah 46 m. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Nilai $x$ yang memenuhi adalah $x = 4$.",
      "Panjang taman adalah 13 m.",
      "Luas taman adalah 140 m².",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "$2[(2x+5)+(3x-2)] = 46$\n$2(5x+3) = 46 \\Rightarrow 5x+3 = 23 \\Rightarrow 5x = 20 \\Rightarrow x = 4$ → Pernyataan (1) BENAR\nPanjang $= 2(4)+5 = 13$ m → Pernyataan (2) BENAR\nLebar $= 3(4)-2 = 10$ m; Luas $= 13 \\times 10 = 130 \\neq 140$ m² → Pernyataan (3) SALAH",
  },

  // ── No. 16 — PG ─────────────────────────────────────────────────────────────
  {
    no: 16, type: "pg",
    soal: "Diketahui taman berbentuk persegi panjang dengan panjang $(2x - 6)$ cm dan lebar $x$ cm. Jika kelilingnya tidak lebih dari 48 cm, maka lebar taman $l$ yang mungkin adalah ...",
    options: [
      "A. $0 < l \\leq 10$",
      "B. $0 < l \\leq 12$",
      "C. $3 < l \\leq 10$",
      "D. $3 < l \\leq 12$",
    ],
    jawaban: "C",
    pembahasan: "$2[(2x-6)+x] \\leq 48$\n$2(3x-6) \\leq 48 \\Rightarrow 3x-6 \\leq 24 \\Rightarrow x \\leq 10$\nSyarat: panjang $> 0 \\Rightarrow 2x-6 > 0 \\Rightarrow x > 3$\nJadi $3 < x \\leq 10$, sehingga $3 < l \\leq 10$ → Jawaban C",
  },

  // ── No. 17 — PGK ────────────────────────────────────────────────────────────
  {
    no: 17, type: "pgk",
    soal: "Kebun Pak Hartono berbentuk persegi panjang. Panjang dan lebarnya berturut-turut dinyatakan sebagai $(4x - 10)$ meter dan $(3x - 5)$ meter. Jika keliling kebun $110$ meter, pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Persamaan yang terbentuk adalah $2\\big((4x - 10) + (3x - 5)\\big)=110$.",
      "Nilai $x$ yang memenuhi adalah $x = 11$.",
      "Panjang kebun Pak Hartono adalah $30$ meter.",
      "Lebar kebun Pak Hartono adalah $20$ meter.",
    ],
    options: [
      "A. 1 dan 4",
      "B. 1 dan 3",
      "C. 2, 3, dan 4",
      "D. 1, 2, dan 3",
    ],
    jawaban: "B",
    pembahasan: "Gunakan rumus keliling persegi panjang:\n$2\\big((4x - 10)+(3x - 5)\\big)=110$\n$2(7x-15)=110$\n$14x-30=110 \\Rightarrow 14x=140 \\Rightarrow x=10$.\nJadi, pernyataan (1) BENAR, sedangkan pernyataan (2) SALAH karena nilai $x$ adalah $10$, bukan $11$.\n\nPanjang $=4(10)-10=30$ meter → Pernyataan (3) BENAR.\nLebar $=3(10)-5=25$ meter, bukan $20$ meter → Pernyataan (4) SALAH.\n\nPernyataan yang benar adalah 1 dan 3 → Jawaban B",
  },

  // ── No. 18 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 18, type: "pgkbs",
    soal: "Perbandingan panjang dan lebar sebuah persegi panjang adalah $7 : 4$. Jika kelilingnya 66 cm, tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Nilai pembanding $k$ yang memenuhi adalah $k = 3$.",
      "Panjang persegi panjang tersebut adalah 21 cm.",
      "Luas persegi panjang tersebut adalah 198 cm².",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Misalkan panjang $= 7k$, lebar $= 4k$\n$2(7k + 4k) = 66 \\Rightarrow 22k = 66 \\Rightarrow k = 3$ → Pernyataan (1) BENAR\nPanjang $= 7(3) = 21$ cm → Pernyataan (2) BENAR\nLebar $= 4(3) = 12$ cm; Luas $= 21 \\times 12 = 252 \\neq 198$ cm² → Pernyataan (3) SALAH",
  },

  // ── No. 19 — PG ─────────────────────────────────────────────────────────────
  {
    no: 19, type: "pg",
    soal: "Syarat seseorang dapat mengikuti suatu lomba adalah apabila umurnya tidak kurang dari 17 tahun. Jika umur Ali 18 tahun, Ani 15 tahun, Alex 16 tahun, dan Ahmad 19 tahun, berapa orang di antara mereka yang sudah boleh mengikuti lomba?",
    options: ["A. 1 orang", "B. 2 orang", "C. 3 orang", "D. 4 orang"],
    jawaban: "B",
    pembahasan: "Syarat: umur $\\geq 17$ tahun\nAli $= 18 \\geq 17$ ✓\nAni $= 15 < 17$ ✗\nAlex $= 16 < 17$ ✗\nAhmad $= 19 \\geq 17$ ✓\nYang boleh ikut: 2 orang (Ali dan Ahmad) → Jawaban B",
  },

  // ── No. 20 — PGK ────────────────────────────────────────────────────────────
  {
    no: 20, type: "pgk",
    soal: "Taman bunga berbentuk persegi panjang dengan panjang $(8x + 2)$ meter dan lebar $(6x - 16)$ meter. Jika kelilingnya tidak kurang dari 140 meter, pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Pertidaksamaan yang terbentuk adalah $28x - 28 \\geq 140$.",
      "Nilai $x$ yang memenuhi adalah $x \\geq 6$.",
      "Panjang taman $(p)$ yang memenuhi adalah $p \\leq 50$ meter.",
      "Lebar taman $(6x - 16)$ untuk nilai $x = 6$ adalah 22 meter.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 1 dan 3",
      "C. 1, 2, dan 4",
      "D. 1, 2, dan 3",
    ],
    jawaban: "A",
    pembahasan: "$2[(8x+2)+(6x-16)] \\geq 140$\n$2(14x-14) \\geq 140 \\Rightarrow 28x - 28 \\geq 140$ → Pernyataan (1) BENAR.\n\n$28x \\geq 168 \\Rightarrow x \\geq 6$ → Pernyataan (2) BENAR.\n\nKarena $x\\geq6$, panjang $p=8x+2\\geq8(6)+2=50$ meter, bukan $p\\leq50$ → Pernyataan (3) SALAH.\nLebar saat $x=6$ adalah $6(6)-16=20$, bukan $22$ meter → Pernyataan (4) SALAH.\n\nPernyataan yang benar adalah 1 dan 2 → Jawaban A",
  },

  // ── No. 21 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 21, type: "pgkbs",
    soal: "Diketahui segitiga dengan alas 10 cm dan tinggi $(x - 4)$ cm. Jika luas segitiga tidak kurang dari $(2x - 2)$ cm², tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Rumus luas segitiga tersebut dapat dinyatakan sebagai $5(x - 4)$ cm².",
      "Pertidaksamaan yang terbentuk adalah $5x - 20 \\geq 2x - 2$.",
      "Nilai minimum $x$ yang memenuhi semua syarat adalah $x = 4$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Luas $= \\frac{1}{2} \\times 10 \\times (x-4) = 5(x-4)$ → Pernyataan (1) BENAR\n$5(x-4) \\geq 2x-2 \\Rightarrow 5x-20 \\geq 2x-2$ → Pernyataan (2) BENAR\n$3x \\geq 18 \\Rightarrow x \\geq 6$; juga syarat tinggi $> 0 \\Rightarrow x > 4$; gabungan: $x \\geq 6$\nNilai minimum adalah 6, bukan 4 → Pernyataan (3) SALAH",
  },

  // ── No. 23 — PGK ────────────────────────────────────────────────────────────
  {
    no: 23, type: "pgk",
    soal: "Perhatikan pertidaksamaan $\\dfrac{1}{2}(2x - 6) \\geq \\dfrac{1}{3}(x - 4)$. Pernyataan-pernyataan berikut berkaitan dengan penyelesaiannya.",
    pernyataan: [
      "Penyederhanaan ruas kiri menghasilkan $x - 2$.",
      "Mengalikan kedua ruas dengan 3 menghasilkan $3(x - 3) \\geq x - 4$.",
      "Penyelesaian pertidaksamaan adalah $x \\geq \\dfrac{5}{2}$.",
      "Nilai $x = 2$ (bilangan bulat) memenuhi pertidaksamaan tersebut.",
    ],
    options: [
      "A. 1 dan 4",
      "B. 2 dan 4",
      "C. 2 dan 3",
      "D. 1, 2, dan 3",
    ],
    jawaban: "C",
    pembahasan: "$\\frac{1}{2}(2x-6)=x-3$, bukan $x-2$ → Pernyataan (1) SALAH.\n\nKalikan kedua ruas dengan 3:\n$3(x-3)\\geq x-4$ → Pernyataan (2) BENAR.\n\n$3x-9\\geq x-4 \\Rightarrow 2x\\geq5 \\Rightarrow x\\geq\\frac{5}{2}$ → Pernyataan (3) BENAR.\n\nUntuk $x=2$, ruas kiri $=-2$ sedangkan ruas kanan $=-\\frac{2}{3}$, sehingga $-2\\not\\geq-\\frac{2}{3}$ → Pernyataan (4) SALAH.\n\nPernyataan yang benar adalah 2 dan 3 → Jawaban C",
  },

  // ── No. 24 — PG ─────────────────────────────────────────────────────────────
  {
    no: 24, type: "pg",
    soal: "Jika $x$ adalah penyelesaian dari $\\dfrac{3}{5}x - 5 = \\dfrac{1}{5}x + 7$, maka nilai dari $x - 4$ adalah ...",
    options: ["A. $18$", "B. $26$", "C. $30$", "D. $34$"],
    jawaban: "B",
    pembahasan: "Kelompokkan suku-suku sejenis:\n$\\dfrac{3}{5}x - \\dfrac{1}{5}x = 7 + 5$\n$\\dfrac{2}{5}x = 12$\n$x = 30$\n$x - 4 = 30 - 4 = 26$ → Jawaban B",
  },

  // ── No. 25 — PGK ────────────────────────────────────────────────────────────
  {
    no: 25, type: "pgk",
    soal: "Diberikan persamaan $9x - 4 = 5x + 12$. Pernyataan-pernyataan berikut berkaitan dengan penyelesaian dan nilai-nilai turunannya.",
    pernyataan: [
      "Nilai $x$ yang memenuhi persamaan tersebut adalah $x = 4$.",
      "Nilai $x + 7 = 12$ untuk penyelesaian yang diperoleh.",
      "Nilai $2x - 3 = 5$ untuk penyelesaian yang diperoleh.",
      "Nilai $x^2 - 5 = 9$ untuk penyelesaian yang diperoleh.",
    ],
    options: [
      "A. 1 dan 4",
      "B. 2 dan 4",
      "C. 1 dan 3",
      "D. 1, 2, dan 3",
    ],
    jawaban: "C",
    pembahasan: "$9x - 4 = 5x + 12 \\Rightarrow 4x = 16 \\Rightarrow x = 4$ → Pernyataan (1) BENAR.\n\n$x+7=4+7=11$, bukan $12$ → Pernyataan (2) SALAH.\n$2x-3=8-3=5$ → Pernyataan (3) BENAR.\n$x^2-5=16-5=11$, bukan $9$ → Pernyataan (4) SALAH.\n\nPernyataan yang benar adalah 1 dan 3 → Jawaban C",
  },

  // ── No. 26 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 26, type: "pgkbs",
    soal: "Sebuah segitiga siku-siku memiliki kaki terpendek $a$ cm. Kaki lainnya 5 cm lebih panjang dari kaki terpendek, dan sisi miringnya 10 cm lebih panjang dari kaki terpendek. Keliling segitiga tersebut 60 cm. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Panjang kaki terpendek segitiga tersebut adalah 15 cm.",
      "Panjang sisi miring (hipotenusa) segitiga tersebut adalah 30 cm.",
      "Luas segitiga tersebut adalah 150 cm².",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Misalkan kaki terpendek $= a$, kaki lain $= a+5$, hipotenusa $= a+10$\n$a + (a+5) + (a+10) = 3a + 15 = 60 \\Rightarrow a = 15$ → Pernyataan (1) BENAR\nHipotenusa $= 15 + 10 = 25$ cm, bukan 30 cm → Pernyataan (2) SALAH\nCek Pythagoras: $15^2 + 20^2 = 225 + 400 = 625 = 25^2$ ✓\nLuas $= \\frac{1}{2} \\times 15 \\times 20 = 150$ cm² → Pernyataan (3) BENAR",
  },

  // ── No. 27 — PG ─────────────────────────────────────────────────────────────
  {
    no: 27, type: "pg",
    soal: "Doni membeli 5 kg apel dan 3 kg jeruk seharga Rp87.000,00. Harga 1 kg apel Rp3.000,00 lebih mahal dari harga 1 kg jeruk. Harga 1 kg jeruk adalah ...",
    options: ["A. Rp6.000,00", "B. Rp9.000,00", "C. Rp12.000,00", "D. Rp15.000,00"],
    jawaban: "B",
    pembahasan: "Misalkan harga jeruk $= x$, maka harga apel $= x + 3.000$\n$5(x + 3.000) + 3x = 87.000$\n$8x + 15.000 = 87.000$\n$8x = 72.000 \\Rightarrow x = 9.000$\nHarga 1 kg jeruk = Rp9.000,00 → Jawaban B",
  },

  // ── No. 28 — PGK ────────────────────────────────────────────────────────────
  {
    no: 28, type: "pgk",
    soal: "Perhatikan pertidaksamaan $\\dfrac{1}{4}(3x - 8) \\leq \\dfrac{1}{2}(x + 2)$. Pernyataan-pernyataan berikut berkaitan dengan penyelesaiannya.",
    pernyataan: [
      "Mengalikan kedua ruas dengan 4 menghasilkan $3x - 8 \\leq 2(x + 2)$.",
      "Penyelesaian pertidaksamaan adalah $x \\geq 12$.",
      "Nilai $x = 13$ memenuhi pertidaksamaan tersebut.",
      "Himpunan penyelesaian untuk bilangan bulat adalah $\\{\\ldots, 10, 11, 12\\}$.",
    ],
    options: [
      "A. 1 dan 4",
      "B. 2 dan 4",
      "C. 1 dan 3",
      "D. 1, 2, dan 3",
    ],
    jawaban: "A",
    pembahasan: "Kalikan dengan 4:\n$3x-8\\leq2(x+2)$ → Pernyataan (1) BENAR.\n\n$3x-8\\leq2x+4 \\Rightarrow x\\leq12$, bukan $x\\geq12$ → Pernyataan (2) SALAH.\nUntuk $x=13$, diperoleh $13\\leq12$ yang salah, sehingga $x=13$ tidak memenuhi → Pernyataan (3) SALAH.\n\nHimpunan penyelesaian bilangan bulat adalah $\\{\\ldots,10,11,12\\}$ → Pernyataan (4) BENAR.\n\nPernyataan yang benar adalah 1 dan 4 → Jawaban A",
  },

  // ── No. 29 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 29, type: "pgkbs",
    soal: "Diketahui persamaan $\\dfrac{1}{3}(x + 9) = \\dfrac{2}{5}x - 1$. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Mengalikan kedua ruas dengan 15 menghasilkan $5(x + 9) = 6x - 15$.",
      "Penyelesaian persamaan tersebut adalah $x = 60$.",
      "Nilai $x - 10 = 40$ untuk penyelesaian yang diperoleh.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Kalikan kedua ruas dengan 15:\n$5(x+9) = 6x - 15$ → Pernyataan (1) BENAR\n$5x + 45 = 6x - 15 \\Rightarrow x = 60$ → Pernyataan (2) BENAR\n$x - 10 = 60 - 10 = 50 \\neq 40$ → Pernyataan (3) SALAH",
  },

  // ── No. 30 — PG ─────────────────────────────────────────────────────────────
  {
    no: 30, type: "pg",
    soal: "Pak Dika mempunyai sejumlah uang. Seperempat bagian dipakai membayar tagihan listrik, kemudian sepertiga dari sisa uang dibelanjakan kebutuhan dapur. Jika uang yang tersisa adalah Rp150.000,00, maka uang Pak Dika mula-mula adalah ...",
    options: ["A. Rp200.000,00", "B. Rp240.000,00", "C. Rp300.000,00", "D. Rp360.000,00"],
    jawaban: "C",
    pembahasan: "Misalkan uang mula-mula $= T$\nListrik $= \\frac{T}{4}$; sisa $= \\frac{3T}{4}$\nDapur $= \\frac{1}{3} \\times \\frac{3T}{4} = \\frac{T}{4}$\nSisa akhir $= \\frac{3T}{4} - \\frac{T}{4} = \\frac{T}{2} = 150.000$\n$T = 300.000$ → Jawaban C",
  },

  // ── No. 31 — PGK ────────────────────────────────────────────────────────────
  {
    no: 31, type: "pgk",
    soal: "Riko memiliki 5 bilangan ganjil berurutan dengan jumlah 65. Sari memiliki 5 bilangan genap berurutan dengan jumlah 5 lebih banyak dari jumlah bilangan Riko. Pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Bilangan tengah dari kelima bilangan ganjil berurutan milik Riko adalah 15.",
      "Jumlah seluruh bilangan milik Sari adalah 70.",
      "Selisih bilangan terkecil milik Sari dan terkecil milik Riko adalah 2.",
      "Bilangan terbesar milik Sari adalah 18.",
    ],
    options: [
      "A. 1 dan 4",
      "B. 2 dan 4",
      "C. 1, 2, dan 4",
      "D. 1, 2, dan 3",
    ],
    jawaban: "B",
    pembahasan: "Untuk lima bilangan ganjil berurutan, bilangan tengah adalah rata-ratanya:\n$5n=65 \\Rightarrow n=13$. Jadi pernyataan (1) SALAH karena bilangan tengahnya $13$, bukan $15$.\n\nJumlah bilangan Sari $=65+5=70$ → Pernyataan (2) BENAR. Bilangan genap berurutannya adalah $10,12,14,16,18$.\n\nBilangan terkecil Sari $10$ dan terkecil Riko $9$, sehingga selisihnya $1$, bukan $2$ → Pernyataan (3) SALAH.\nBilangan terbesar Sari adalah $18$ → Pernyataan (4) BENAR.\n\nPernyataan yang benar adalah 2 dan 4 → Jawaban B",
  },

  // ── No. 32 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 32, type: "pgkbs",
    soal: "Diberikan persamaan $\\dfrac{3x + 2}{x + 4} = 2$. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Perkalian silang menghasilkan $3x + 2 = 2(x + 4)$.",
      "Penyelesaian persamaan tersebut adalah $x = 6$.",
      "Nilai $3x + 2$ untuk nilai $x$ yang diperoleh adalah 24.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Perkalian silang: $3x + 2 = 2(x + 4)$ → Pernyataan (1) BENAR\n$3x + 2 = 2x + 8 \\Rightarrow x = 6$ → Pernyataan (2) BENAR\n$3(6) + 2 = 20 \\neq 24$ → Pernyataan (3) SALAH",
  },

  // ── No. 33 — PG ────────────────────────���────────────────────────────────────
  {
    no: 33, type: "pg",
    soal: "Penyelesaian dari pertidaksamaan $\\dfrac{x + 3}{2} > \\dfrac{2x - 1}{3}$ adalah ...",
    options: ["A. $x > 3$", "B. $x < 3$", "C. $x > 11$", "D. $x < 11$"],
    jawaban: "D",
    pembahasan: "Kalikan dengan KPK(2, 3) = 6:\n$3(x + 3) > 2(2x - 1)$\n$3x + 9 > 4x - 2$\n$-x > -11$\nBagi dengan $-1$ (tanda dibalik): $x < 11$ → Jawaban D",
  },

  // ── No. 34 — PGK ────────────────────────────────────────────────────────────
  {
    no: 34, type: "pgk",
    soal: "Umur kakak $k$ tahun, sedangkan kakak 8 tahun lebih tua dari adik. Jumlah umur keduanya adalah 48 tahun. Pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Model matematika dari situasi tersebut adalah $2k + 8 = 48$.",
      "Umur kakak saat ini adalah 28 tahun.",
      "Umur adik saat ini adalah 20 tahun.",
      "Empat tahun yang lalu, umur kakak adalah 26 tahun.",
    ],
    options: [
      "A. 1 dan 4",
      "B. 2 dan 4",
      "C. 2 dan 3",
      "D. 1, 2, dan 3",
    ],
    jawaban: "C",
    pembahasan: "Umur adik $=k-8$, sehingga model yang benar adalah $k+(k-8)=48 \\Rightarrow 2k-8=48$, bukan $2k+8=48$ → Pernyataan (1) SALAH.\n\n$2k=56 \\Rightarrow k=28$ → Pernyataan (2) BENAR.\nUmur adik $=28-8=20$ tahun → Pernyataan (3) BENAR.\nEmpat tahun lalu umur kakak $=28-4=24$, bukan $26$ → Pernyataan (4) SALAH.\n\nPernyataan yang benar adalah 2 dan 3 → Jawaban C",
  },

  // ── No. 35 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 35, type: "pgkbs",
    soal: "Sebuah tali dengan panjang $(5n + 3)$ cm dipotong menjadi dua bagian. Bagian pertama sepanjang $(2n - 1)$ cm. Panjang total tali adalah 53 cm. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Nilai $n$ yang memenuhi adalah $n = 10$.",
      "Panjang bagian pertama tali adalah 19 cm.",
      "Panjang bagian kedua tali adalah 30 cm.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "$5n + 3 = 53 \\Rightarrow 5n = 50 \\Rightarrow n = 10$ → Pernyataan (1) BENAR\nBagian pertama $= 2(10) - 1 = 19$ cm → Pernyataan (2) BENAR\nBagian kedua $= 53 - 19 = 34$ cm, bukan 30 cm → Pernyataan (3) SALAH",
  },

  // ── No. 36 — PG ─────────────────────────────────────────────────────────────
  {
    no: 36, type: "pg",
    soal: "Diketahui $4(3x - 2) = 2(5x + 1) - 4$. Nilai dari $3x + 2$ adalah ...",
    options: ["A. $5$", "B. $7$", "C. $11$", "D. $14$"],
    jawaban: "C",
    pembahasan: "$12x - 8 = 10x + 2 - 4$\n$12x - 8 = 10x - 2$\n$2x = 6 \\Rightarrow x = 3$\n$3x + 2 = 9 + 2 = 11$ → Jawaban C",
  },

  // ── No. 38 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 38, type: "pgkbs",
    soal: "Suatu persegi panjang memiliki ukuran panjang $(4x + 1)$ cm dan lebar $(x + 4)$ cm. Kelilingnya adalah 70 cm. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Nilai $x$ yang memenuhi adalah $x = 6$.",
      "Panjang persegi panjang tersebut adalah 25 cm.",
      "Luas persegi panjang tersebut adalah 300 cm².",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "$2[(4x+1)+(x+4)] = 70$\n$2(5x+5) = 70 \\Rightarrow 5x+5 = 35 \\Rightarrow x = 6$ → Pernyataan (1) BENAR\nPanjang $= 4(6)+1 = 25$ cm → Pernyataan (2) BENAR\nLebar $= 6+4 = 10$ cm; Luas $= 25 \\times 10 = 250$ cm², bukan 300 cm² → Pernyataan (3) SALAH",
  },
];

const StudioMusikGraph = () => {
  const plot = { left: 78, top: 38, width: 610, height: 296 };
  const xMax = 14;
  const yMax = 90;
  const x = (value: number) => plot.left + (value / xMax) * plot.width;
  const y = (value: number) => plot.top + plot.height - (value / yMax) * plot.height;
  const xTicks = [0, 2, 4, 6, 8, 10, 12, 14];
  const yTicks = [0, 15, 30, 45, 60, 75, 90];

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-cyan-400/30 bg-slate-950/90 p-2 sm:p-3">
      <svg
        viewBox="0 0 760 430"
        role="img"
        aria-labelledby="studio-musik-graph-title studio-musik-graph-desc"
        className="h-auto w-full"
      >
        <title id="studio-musik-graph-title">Grafik biaya sewa studio musik</title>
        <desc id="studio-musik-graph-desc">
          Grafik y sama dengan 5.000d ditambah 15.000, dengan batas anggaran 80.000 rupiah pada durasi maksimum 13 jam.
        </desc>

        <rect x="0" y="0" width="760" height="430" rx="12" fill="#0f172a" />
        <text x="380" y="24" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="700">
          Grafik Biaya Sewa Studio Musik
        </text>
        <text x="380" y="414" textAnchor="middle" fill="#94a3b8" fontSize="13">
          d (durasi sewa dalam jam)
        </text>
        <text
          x="18"
          y="188"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="13"
          transform="rotate(-90 18 188)"
        >
          y (ribu rupiah)
        </text>

        {/* Area durasi yang masih sesuai anggaran: 0 ≤ d ≤ 13. */}
        <rect
          x={x(0)}
          y={plot.top}
          width={x(13) - x(0)}
          height={plot.height}
          fill="#06b6d4"
          fillOpacity="0.07"
        />

        {yTicks.map((tick) => (
          <g key={`y-${tick}`}>
            <line
              x1={plot.left}
              y1={y(tick)}
              x2={plot.left + plot.width}
              y2={y(tick)}
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray={tick === 0 ? undefined : "4 5"}
            />
            <text x={plot.left - 12} y={y(tick) + 4} textAnchor="end" fill="#94a3b8" fontSize="11">
              {tick}
            </text>
          </g>
        ))}

        {xTicks.map((tick) => (
          <g key={`x-${tick}`}>
            <line
              x1={x(tick)}
              y1={plot.top}
              x2={x(tick)}
              y2={plot.top + plot.height}
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray={tick === 0 ? undefined : "4 5"}
            />
            <text x={x(tick)} y={plot.top + plot.height + 20} textAnchor="middle" fill="#94a3b8" fontSize="11">
              {tick}
            </text>
          </g>
        ))}

        <line
          x1={plot.left}
          y1={plot.top + plot.height}
          x2={plot.left + plot.width}
          y2={plot.top + plot.height}
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        <line
          x1={plot.left}
          y1={plot.top}
          x2={plot.left}
          y2={plot.top + plot.height}
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />

        {/* Garis fungsi, dibedakan antara bagian yang terjangkau dan lanjutan garis. */}
        <line
          x1={x(0)}
          y1={y(15)}
          x2={x(14)}
          y2={y(85)}
          stroke="#64748b"
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <line
          x1={x(0)}
          y1={y(15)}
          x2={x(13)}
          y2={y(80)}
          stroke="#22d3ee"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Garis batas anggaran y = 80. */}
        <line
          x1={plot.left}
          y1={y(80)}
          x2={plot.left + plot.width}
          y2={y(80)}
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <rect x={x(8.3)} y={y(80) - 25} width="156" height="21" rx="5" fill="#451a03" fillOpacity="0.9" />
        <text x={x(8.5)} y={y(80) - 10} fill="#fbbf24" fontSize="11" fontWeight="700">
          Batas anggaran: 80
        </text>

        <circle cx={x(0)} cy={y(15)} r="5" fill="#22d3ee" stroke="#ecfeff" strokeWidth="2" />
        <text x={x(0) + 10} y={y(15) - 10} fill="#67e8f9" fontSize="11">
          (0, 15)
        </text>

        <circle cx={x(10)} cy={y(65)} r="6" fill="#34d399" stroke="#ecfdf5" strokeWidth="2" />
        <rect x={x(10) - 45} y={y(65) - 37} width="90" height="21" rx="5" fill="#064e3b" fillOpacity="0.95" />
        <text x={x(10)} y={y(65) - 22} textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="700">
          (10, 65)
        </text>

        <circle cx={x(13)} cy={y(80)} r="7" fill="#a78bfa" stroke="#f5f3ff" strokeWidth="2" />

        <g transform="translate(98 58)">
          <line x1="0" y1="0" x2="28" y2="0" stroke="#22d3ee" strokeWidth="4" />
          <text x="36" y="4" fill="#cbd5e1" fontSize="11">Bagian sesuai anggaran</text>
          <line x1="0" y1="20" x2="28" y2="20" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8 6" />
          <text x="36" y="24" fill="#cbd5e1" fontSize="11">Batas Rp80.000</text>
        </g>
      </svg>
    </div>
  );
};

const tambahanPLSV: LatihanSoal[] = [
  // ── Soal tambahan 1 — PG ────────────────────────────────────────────────────
  {
    no: 6, type: "pg",
    soal: "Sebuah usaha percetakan spanduk menentukan harga layanan berdasarkan fungsi keuntungan harian $F(x)=15x-300$ (dalam ribuan rupiah), dengan $x$ menyatakan luas spanduk yang dicetak dalam meter persegi ($m^2$). Jika pemilik percetakan menginginkan keuntungan harian berada di rentang Rp450.000,00 sampai Rp1.200.000,00, maka rentang luas spanduk ($x$) yang harus dicetak sehari adalah ...",
    options: [
      "A. $40 \\leq x \\leq 90$",
      "B. $50 \\leq x \\leq 100$",
      "C. $50 \\leq x \\leq 110$",
      "D. $60 \\leq x \\leq 100$",
    ],
    jawaban: "B",
    pembahasan: "Karena $F(x)$ dinyatakan dalam ribuan rupiah, rentang keuntungan tersebut adalah $450 \\leq F(x) \\leq 1.200$.\n$450 \\leq 15x - 300 \\leq 1.200$\n$750 \\leq 15x \\leq 1.500$\n$50 \\leq x \\leq 100$\nJadi, luas spanduk yang harus dicetak berada pada rentang $50 \\leq x \\leq 100$ $m^2$ → Jawaban B",
  },

  // ── Soal tambahan 2 — PG ────────────────────────────────────────────────────
  {
    no: 7, type: "pg",
    soal: "Suatu katering makanan menghitung pendapatan bersih harian $P(n)$ (dalam ribuan rupiah) berdasarkan jumlah porsi $n$ yang terjual melalui rumus fungsi $P(n)=10n-150$. Jika pengelola menargetkan pendapatan bersih minimal Rp350.000,00 dan maksimal Rp750.000,00 per hari, tentukan daerah asal ($n$) atau rentang porsi makanan yang harus terjual!",
    options: [
      "A. $40 \\leq n \\leq 80$",
      "B. $50 \\leq n \\leq 90$",
      "C. $50 \\leq n \\leq 100$",
      "D. $60 \\leq n \\leq 90$",
    ],
    jawaban: "B",
    pembahasan: "Karena $P(n)$ dinyatakan dalam ribuan rupiah, target pendapatan menjadi:\n$350 \\leq 10n - 150 \\leq 750$\n$500 \\leq 10n \\leq 900$\n$50 \\leq n \\leq 90$\nJadi, jumlah porsi yang harus terjual adalah $50 \\leq n \\leq 90$ porsi → Jawaban B",
  },

  // ── Soal tambahan 3 — PGKBS ──────────────────────────────────────────────────
  {
    no: 8, type: "pgkbs",
    soal: "Jasa kurir Express menerapkan tarif pengiriman barang berdasarkan jarak tempuh $x$ (dalam km) dengan aturan biaya penanganan awal Rp6.000,00 dan tarif tiap kilometer Rp4.000,00. Pelanggan memiliki anggaran maksimum sebesar Rp100.000,00 untuk satu kali kirim. Tentukan kebenaran dari setiap pernyataan berikut!",
    pernyataan: [
      "Model matematika dari masalah tersebut adalah $4.000x+6.000 \\leq 100.000$.",
      "Jarak maksimum pengiriman yang masih dapat dijangkau adalah 23,5 km.",
      "Jika jarak pengiriman 20 km, maka biaya total yang harus dibayar adalah Rp86.000,00.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Biaya total terdiri dari biaya penanganan awal dan biaya berdasarkan jarak:\n$4.000x+6.000 \\leq 100.000$\n→ Pernyataan (1) BENAR.\n\n$4.000x \\leq 94.000 \\Rightarrow x \\leq 23,5$\nJarak maksimum adalah 23,5 km → Pernyataan (2) BENAR.\n\nUntuk jarak 20 km:\n$4.000(20)+6.000=80.000+6.000=86.000$\nBiaya totalnya Rp86.000,00 → Pernyataan (3) BENAR.",
  },

  // ── Soal tambahan 4 — PGK ───────────────────────────────────────────────────
  {
    no: 9, type: "pgk",
    soal: "Suatu jasa penyewaan studio musik menentukan biaya sewa harian berdasarkan fungsi linear $y=5.000d+15.000$, dengan $d$ adalah durasi sewa dalam jam dan $y$ total biaya dalam rupiah. Seorang pemusik memiliki anggaran maksimum sebesar Rp80.000,00 untuk menyewa studio. Manakah pernyataan berikut yang benar? Pilihan jawaban benar bisa lebih dari satu.",
    gambar: <StudioMusikGraph />,
    pernyataan: [
      "Jika $d$ menyatakan durasi latihan (jam), masalah ini dapat dimodelkan dengan $5.000d+15.000 \\leq 80.000$.",
      "Durasi latihan maksimal yang dapat dipilih pemusik adalah 13 jam.",
      "Jika durasi sewa adalah 10 jam, biaya total yang harus dibayar tepat sama dengan Rp65.000,00.",
      "Penambahan durasi latihan selama 2 jam akan menambah biaya sewa sebesar Rp10.000,00.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 1, 2, dan 3",
      "C. 1, 3, dan 4",
      "D. 1, 2, 3, dan 4",
    ],
    jawaban: "D",
    pembahasan: "Dengan anggaran maksimum Rp80.000, model pertidaksamaannya adalah:\n$5.000d+15.000 \\leq 80.000$\n→ Pernyataan (1) BENAR.\n\n$5.000d \\leq 65.000 \\Rightarrow d \\leq 13$\nDurasi maksimum adalah 13 jam → Pernyataan (2) BENAR.\n\nUntuk $d=10$:\n$y=5.000(10)+15.000=50.000+15.000=65.000$\n→ Pernyataan (3) BENAR.\n\nTambahan 2 jam menambah biaya sebesar $2\\times5.000=10.000$ rupiah → Pernyataan (4) BENAR.\n\nJadi, pernyataan yang benar adalah 1, 2, 3, dan 4 → Jawaban D",
  },
];

const latihanDasarDenganTambahan: LatihanSoal[] = [
  ...latihanDasar.filter((soal) => !new Set([3, 6, 7, 8, 9, 13, 18, 20, 21, 23, 27, 28, 29, 31, 32, 34, 35, 39, 40]).has(soal.no)).slice(0, 5),
  ...tambahanPLSV,
  ...latihanDasar.filter((soal) => !new Set([3, 6, 7, 8, 9, 13, 18, 20, 21, 23, 27, 28, 29, 31, 32, 34, 35, 39, 40]).has(soal.no)).slice(5),
].map((soal, index) => ({ ...soal, no: index + 1 }));

const PLSVPage = () => (
  <TKAPemantapanLayout
    title="Persamaan Dan Pertidaksamaan Linear Satu Variabel"
    materiSections={materiSections}
    contohSoal={contohSoal}
    latihanDasar={latihanDasarDenganTambahan}
  />
);

export default PLSVPage;
