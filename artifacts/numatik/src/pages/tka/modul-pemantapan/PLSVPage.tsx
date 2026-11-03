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
    soal: "Kebun Pak Gamal berbentuk persegi panjang. Panjang dan lebarnya berturut-turut dinyatakan sebagai $(4x - 10)$ meter dan $(3x - 5)$ meter. Jika keliling kebun $110$ meter, pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Persamaan yang terbentuk adalah $2\\big((4x - 10) + (3x - 5)\\big)=110$.",
      "Nilai $x$ yang memenuhi adalah $x = 11$.",
      "Panjang kebun Pak Gamal adalah $30$ meter.",
      "Lebar kebun Pak Gamal adalah $20$ meter.",
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

  // ── No. 30 — PG ─────────────────────────────────────────────────────────────
  {
    no: 30, type: "pg",
    soal: "Pak Dika mempunyai sejumlah uang. Seperempat bagian dipakai membayar tagihan listrik, kemudian sepertiga dari sisa uang dibelanjakan kebutuhan dapur. Jika uang yang tersisa adalah Rp150.000,00, maka uang Pak Dika mula-mula adalah ...",
    options: ["A. Rp200.000,00", "B. Rp240.000,00", "C. Rp300.000,00", "D. Rp360.000,00"],
    jawaban: "C",
    pembahasan: "Misalkan uang mula-mula $= T$\nListrik $= \\frac{T}{4}$; sisa $= \\frac{3T}{4}$\nDapur $= \\frac{1}{3} \\times \\frac{3T}{4} = \\frac{T}{4}$\nSisa akhir $= \\frac{3T}{4} - \\frac{T}{4} = \\frac{T}{2} = 150.000$\n$T = 300.000$ → Jawaban C",
  },

  // ── No. 33 — PG ────────────────────────���────────────────────────────────────
  {
    no: 33, type: "pg",
    soal: "Penyelesaian dari pertidaksamaan $\\dfrac{x + 3}{2} > \\dfrac{2x - 1}{3}$ adalah ...",
    options: ["A. $x > 3$", "B. $x < 3$", "C. $x > 11$", "D. $x < 11$"],
    jawaban: "D",
    pembahasan: "Kalikan dengan KPK(2, 3) = 6:\n$3(x + 3) > 2(2x - 1)$\n$3x + 9 > 4x - 2$\n$-x > -11$\nBagi dengan $-1$ (tanda dibalik): $x < 11$ → Jawaban D",
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



const latihanDasarDiurutkan = [...latihanDasar];
const [soalNomor2] = latihanDasarDiurutkan.splice(1, 1);
const [soalNomor16] = latihanDasarDiurutkan.splice(14, 1);

if (!soalNomor2 || !soalNomor16) {
  throw new Error("Soal PLSV yang akan dipindahkan tidak ditemukan.");
}

latihanDasarDiurutkan.splice(3, 0, soalNomor2);
latihanDasarDiurutkan.splice(5, 0, soalNomor16);

const [soalNomor17] = latihanDasarDiurutkan.splice(16, 1);
const [soalNomor13] = latihanDasarDiurutkan.splice(12, 1);
const [soalNomor14] = latihanDasarDiurutkan.splice(12, 1);

if (!soalNomor17 || !soalNomor13 || !soalNomor14) {
  throw new Error("Soal PLSV yang akan dipindahkan tidak ditemukan.");
}

latihanDasarDiurutkan.splice(2, 0, soalNomor17, soalNomor13, soalNomor14);

const soalTkaGarisBilangan: LatihanSoal = {
  no: 3,
  type: "pg",
  soal: "Diketahui pertidaksamaan sebagai berikut.\n\n$3x + 17 \\leq 7 - 2x$\n\nManakah garis bilangan yang menunjukkan himpunan penyelesaian dari pertidaksamaan tersebut?",
  options: ["A", "B", "C", "D"],
  optionsJsx: [
    <img
      src="https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_limit/v1793734322/A1_noik1j.png"
      alt="Garis bilangan pilihan A"
      className="h-auto w-full max-w-[270px] rounded bg-white p-1 object-contain"
    />,
    <img
      src="https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_limit/v1793734322/A2_pkehhm.png"
      alt="Garis bilangan pilihan B"
      className="h-auto w-full max-w-[270px] rounded bg-white p-1 object-contain"
    />,
    <img
      src="https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_limit/v1793734322/A3_ohqcr8.png"
      alt="Garis bilangan pilihan C"
      className="h-auto w-full max-w-[270px] rounded bg-white p-1 object-contain"
    />,
    <img
      src="https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_limit/v1793734322/A4_ix9sdi.png"
      alt="Garis bilangan pilihan D"
      className="h-auto w-full max-w-[270px] rounded bg-white p-1 object-contain"
    />,
  ],
  jawaban: "A",
  pembahasan: "$3x + 17 \\leq 7 - 2x$\n$5x \\leq -10$\n$x \\leq -2$\nJadi, himpunan penyelesaiannya ditunjukkan oleh garis bilangan dengan titik penuh di $-2$ dan arsiran ke kiri, yaitu pilihan A.",
  sourceLabel: "TKA Matematika 2026",
};
latihanDasarDiurutkan.splice(9, 0, soalTkaGarisBilangan);

const latihanDasarBernomor: LatihanSoal[] = latihanDasarDiurutkan.map((soal, index) => ({
  ...soal,
  no: index + 1,
}));

const PLSVPage = () => (
  <TKAPemantapanLayout
    title="Persamaan Dan Pertidaksamaan Linear Satu Variabel"
    materiSections={materiSections}
    contohSoal={contohSoal}
    latihanDasar={latihanDasarBernomor}
  />
);

export default PLSVPage;
