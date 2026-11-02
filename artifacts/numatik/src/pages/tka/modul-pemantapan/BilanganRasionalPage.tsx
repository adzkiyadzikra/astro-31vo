import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

const materiSections: MateriSection[] = [
  {
    heading: "A. Pengertian Bilangan Rasional",
    content: `Bilangan rasional adalah bilangan yang dapat dinyatakan dalam bentuk $\\dfrac{p}{q}$ di mana $p$ dan $q$ bilangan bulat dan $q \\neq 0$.\n\nContoh: $\\frac{1}{2}$, $\\frac{-3}{4}$, $\\frac{5}{1} = 5$, $0{,}75 = \\frac{3}{4}$, $1{,}\\overline{3} = \\frac{4}{3}$`,
  },
  {
    heading: "B. Operasi Pecahan",
    content: `1. Penjumlahan/Pengurangan:\n$\\dfrac{a}{b} \\pm \\dfrac{c}{d} = \\dfrac{ad \\pm bc}{bd}$\n(samakan penyebut terlebih dahulu)\n\n2. Perkalian:\n$\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{ac}{bd}$\n\n3. Pembagian:\n$\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c} = \\dfrac{ad}{bc}$`,
  },
  {
    heading: "C. Bentuk Pecahan",
    content: `1. Pecahan biasa: $\\dfrac{p}{q}$\n\n2. Pecahan campuran: $a\\dfrac{p}{q} = a + \\dfrac{p}{q}$\n\n3. Desimal:\n   - Desimal berhingga: $\\dfrac{3}{4} = 0{,}75$\n   - Desimal tak berhingga berulang: $\\dfrac{1}{3} = 0{,}333...$\n\n4. Persen: $p\\% = \\dfrac{p}{100}$`,
  },
  {
    heading: "D. Membandingkan Bilangan Rasional",
    content: `Untuk membandingkan $\\dfrac{a}{b}$ dan $\\dfrac{c}{d}$, samakan penyebutnya terlebih dahulu.\n\nAlternatif: kalikan silang:\n$\\dfrac{a}{b} < \\dfrac{c}{d}$ jika $ad < bc$ (untuk $b, d > 0$)\n\nContoh: Urutkan $0{,}6;\\; 55\\%;\\; \\frac{2}{3}$ dari terkecil ke terbesar.\nUbah ke desimal: $0{,}600 > 0{,}550$ dan $\\frac{2}{3} \\approx 0{,}667$\nUrutan: $55\\% < 0{,}6 < \\frac{2}{3}$`,
  },
  {
    heading: "E. Bilangan Rasional pada Garis Bilangan",
    content: `Setiap bilangan rasional dapat diletakkan pada garis bilangan. Semakin ke kanan, semakin besar nilainya.\n\nUrutan bilangan rasional:\n$... < -1 < -\\dfrac{1}{2} < 0 < \\dfrac{1}{3} < \\dfrac{1}{2} < 1 < ...$`,
  },
  {
    heading: "F. Menentukan Penyelesaian yang Berkaitan dengan Bilangan Rasional",
    content: `Langkah-langkah menyelesaikan soal yang berkaitan dengan bilangan rasional:\n\n1. Baca soal dengan cermat dan identifikasi semua data bilangan rasional yang diketahui.\n2. Ubah semua bilangan ke bentuk yang seragam (pecahan biasa, desimal, atau persen) agar mudah dioprasikan.\n3. Tentukan operasi yang diperlukan (penjumlahan, pengurangan, perkalian, atau pembagian).\n4. Lakukan operasi sesuai aturan, kemudian sederhanakan hasilnya.\n5. Nyatakan jawaban dalam satuan atau bentuk yang diminta soal.\n\nContoh:\nSebuah tali panjang $3\\frac{1}{4}$ m. Dipotong $\\frac{2}{5}$ bagiannya. Sisa tali = ?\n$3\\frac{1}{4} \\times \\left(1 - \\frac{2}{5}\\right) = \\frac{13}{4} \\times \\frac{3}{5} = \\frac{39}{20} = 1\\frac{19}{20}$ m`,
  },
  {
    heading: "G. Estimasi/Pembulatan Bilangan Rasional",
    content: `Estimasi adalah menaksir nilai suatu bilangan rasional ke nilai terdekat tertentu, untuk mempermudah perhitungan.\n\nCara membulatkan:\n1. Bulatkan ke satuan terdekat: perhatikan angka persepuluhan.\n   - Jika angka persepuluhan $\\geq 5$, bulatkan ke atas.\n   - Jika angka persepuluhan $< 5$, bulatkan ke bawah.\n2. Estimasi persen: misalnya $\\frac{1}{3} \\approx 33\\%$ (bukan 33,3% — sudah cukup dekat).\n3. Estimasi pecahan: $\\frac{7}{8} \\approx 1$, $\\frac{1}{9} \\approx 0$.\n\nContoh:\n$38\\% \\times 520 \\approx 40\\% \\times 500 = \\frac{40}{100} \\times 500 = 200$\nHarga Rp29.750 → dibulatkan menjadi Rp30.000 untuk kemudahan estimasi belanja.`,
  },
];

const contohSoal: LatihanSoal[] = [
  // ─── CONTOH 1 · PG ─────────────────────────────────────────────────────────
  {
    no: 101,
    type: "pg",
    soal: "Diketahui empat bilangan $\\dfrac{3}{4};\\; 0{,}6;\\; 45\\%;\\; \\dfrac{4}{5}$. Urutan bilangan tersebut dari yang terkecil ke terbesar adalah ....",
    options: [
      "A. $\\dfrac{3}{4};\\; 0{,}6;\\; 45\\%;\\; \\dfrac{4}{5}$",
      "B. $45\\%;\\; \\dfrac{3}{4};\\; 0{,}6;\\; \\dfrac{4}{5}$",
      "C. $45\\%;\\; 0{,}6;\\; \\dfrac{4}{5};\\; \\dfrac{3}{4}$",
      "D. $45\\%;\\; 0{,}6;\\; \\dfrac{3}{4};\\; \\dfrac{4}{5}$",
    ],
    jawaban: "D",
    pembahasan: `Ubah semua bilangan ke pecahan dengan penyebut yang sama (penyebut 20):
$0{,}6 = \\dfrac{6}{10} = \\dfrac{12}{20}$
$45\\% = \\dfrac{45}{100} = \\dfrac{9}{20}$
$\\dfrac{3}{4} = \\dfrac{15}{20}$
$\\dfrac{4}{5} = \\dfrac{16}{20}$

Urutan dari terkecil: $\\dfrac{9}{20} < \\dfrac{12}{20} < \\dfrac{15}{20} < \\dfrac{16}{20}$

Jadi, urutan dari terkecil ke terbesar: $45\\% < 0{,}6 < \\dfrac{3}{4} < \\dfrac{4}{5}$.
Jawaban: D`,
  },

  // ─── CONTOH 2 · PG (estimasi/konteks belanja) ──────────────────────────────
  {
    no: 102,
    type: "pg",
    soal: "Dodi akan membeli susu dan biskuit di minimarket. Kebetulan sedang ada promo akhir bulan dengan diskon 15% untuk semua produk. Harga sebelum diskon: 1 liter susu Rp35.000 dan 1 kotak biskuit Rp28.000. Jika Dodi membeli 2 liter susu dan 3 kotak biskuit, estimasi harga yang harus dibayar adalah ....",
    options: [
      "A. Rp98.000",
      "B. Rp114.000",
      "C. Rp132.000",
      "D. Rp148.000",
    ],
    jawaban: "C",
    pembahasan: `Harga 1 liter susu setelah diskon 15%:
$= \\text{Rp}35.000 - (15\\% \\times \\text{Rp}35.000)$
$= \\text{Rp}35.000 - \\text{Rp}5.250 = \\text{Rp}29.750$
Dibulatkan → estimasi $\\text{Rp}30.000$.

Harga 1 kotak biskuit setelah diskon 15%:
$= \\text{Rp}28.000 - (15\\% \\times \\text{Rp}28.000)$
$= \\text{Rp}28.000 - \\text{Rp}4.200 = \\text{Rp}23.800$
Dibulatkan → estimasi $\\text{Rp}24.000$.

Total 2 liter susu + 3 kotak biskuit:
$= 2(\\text{Rp}30.000) + 3(\\text{Rp}24.000)$
$= \\text{Rp}60.000 + \\text{Rp}72.000 = \\text{Rp}132.000$
Jawaban: C`,
  },

  // ─── CONTOH 3 · PGK (konteks lahan kebun buah) ─────────────────────────────
  {
    no: 103,
    type: "pgk",
    soal: `Perhatikan bacaan berikut untuk menjawab soal nomor 3 dan 4.

Kebun Buah Pak Eko
Pak Eko memiliki sebidang lahan untuk berkebun. Diketahui $\\dfrac{3}{8}$ bagian lahan ditanami mangga, $\\dfrac{1}{4}$ bagian ditanami rambutan, $\\dfrac{1}{5}$ bagian ditanami durian, dan sisanya ditanami pepaya. Luas lahan yang ditanami pepaya adalah $42\\text{ m}^2$. Pak Eko menjual hasil panen berdasarkan luas lahan. Harga jual per meter persegi: mangga Rp8.000, rambutan Rp15.000, durian Rp20.000, dan pepaya Rp5.000.

Berdasarkan bacaan tersebut, pilihlah semua jawaban yang benar. Jawaban benar lebih dari satu.`,
    pernyataan: [
      "Luas lahan yang ditanami mangga adalah $90\\text{ m}^2$.",
      "Luas seluruh lahan Pak Eko adalah $300\\text{ m}^2$.",
      "Luas lahan yang ditanami rambutan adalah $60\\text{ m}^2$.",
      "Luas lahan yang ditanami durian adalah $48\\text{ m}^2$.",
    ],
    options: [
      "(1) dan (2)",
      "(1) dan (3)",
      "(2) dan (4)",
      "(1), (3), dan (4)",
    ],
    jawaban: "D",
    pembahasan: `Tentukan bagian lahan pepaya terlebih dahulu:
$= 1 - \\dfrac{3}{8} - \\dfrac{1}{4} - \\dfrac{1}{5}$
$= \\dfrac{40}{40} - \\dfrac{15}{40} - \\dfrac{10}{40} - \\dfrac{8}{40} = \\dfrac{7}{40}$ bagian

$\\dfrac{7}{40}$ bagian $= 42\\text{ m}^2$, sehingga luas seluruh lahan $= 42 \\times \\dfrac{40}{7} = 240\\text{ m}^2$.

Pernyataan (1): Mangga $= \\dfrac{3}{8} \\times 240 = 90\\text{ m}^2$ ✓ BENAR
Pernyataan (2): Luas seluruh lahan $240\\text{ m}^2 \\neq 300\\text{ m}^2$ ✗ SALAH
Pernyataan (3): Rambutan $= \\dfrac{1}{4} \\times 240 = 60\\text{ m}^2$ ✓ BENAR
Pernyataan (4): Durian $= \\dfrac{1}{5} \\times 240 = 48\\text{ m}^2$ ✓ BENAR

Jawaban: D — Pernyataan (1), (3), dan (4) benar.`,
  },

  // ─── CONTOH 4 · PGKBS (masih konteks kebun Pak Eko) ───────────────────────
  {
    no: 104,
    type: "pgkbs",
    soal: `Berdasarkan bacaan Kebun Buah Pak Eko (soal nomor 3), tentukan Benar atau Salah untuk setiap pernyataan berikut.`,
    pernyataan: [
      "Hasil penjualan durian merupakan yang terbesar di antara keempat komoditas.",
      "Hasil penjualan mangga lebih besar daripada hasil penjualan rambutan.",
      "Hasil penjualan pepaya lebih kecil daripada hasil penjualan mangga.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: `Hitung hasil penjualan masing-masing komoditas:
Mangga: $90 \\times \\text{Rp}8.000 = \\text{Rp}720.000$
Rambutan: $60 \\times \\text{Rp}15.000 = \\text{Rp}900.000$
Durian: $48 \\times \\text{Rp}20.000 = \\text{Rp}960.000$
Pepaya: $42 \\times \\text{Rp}5.000 = \\text{Rp}210.000$

Pernyataan (1): Durian = Rp960.000 (tertinggi) ✓ BENAR
Pernyataan (2): Mangga (Rp720.000) < Rambutan (Rp900.000), jadi mangga TIDAK lebih besar ✗ SALAH
Pernyataan (3): Pepaya (Rp210.000) < Mangga (Rp720.000) ✓ BENAR`,
  },

  // ─── CONTOH 5 · PG (operasi campuran pecahan) ──────────────────────────────
  {
    no: 105,
    type: "pg",
    soal: "Hasil dari $\\dfrac{3}{5} \\times \\dfrac{10}{9} - \\left(\\dfrac{5}{6} - \\dfrac{1}{4}\\right)$ adalah ....",
    options: [
      "A. $-\\dfrac{5}{12}$",
      "B. $-\\dfrac{1}{12}$",
      "C. $\\dfrac{1}{12}$",
      "D. $\\dfrac{2}{3}$",
    ],
    jawaban: "C",
    pembahasan: `Ikuti aturan urutan operasi: kerjakan perkalian dan operasi dalam kurung terlebih dahulu.

$\\dfrac{3}{5} \\times \\dfrac{10}{9} - \\left(\\dfrac{5}{6} - \\dfrac{1}{4}\\right)$
$= \\dfrac{3 \\times 10}{5 \\times 9} - \\left(\\dfrac{10}{12} - \\dfrac{3}{12}\\right)$
$= \\dfrac{30}{45} - \\dfrac{7}{12}$
$= \\dfrac{2}{3} - \\dfrac{7}{12}$
$= \\dfrac{8}{12} - \\dfrac{7}{12}$
$= \\dfrac{1}{12}$

Jawaban: C`,
  },
];

const latihanDasar: LatihanSoal[] = [
  // ─── 1 · PG ───────────────────────────────────────────────────────────────
  {
    no: 1,
    type: "pg",
    soal: "Hasil dari $1\\frac{1}{2} + 2\\frac{2}{3} \\times 1\\frac{2}{5}$ adalah ...",
    options: [
      "$3\\frac{1}{2}$",
      "$5\\frac{7}{30}$",
      "$4\\frac{13}{15}$",
      "$6\\frac{1}{5}$",
    ],
    jawaban: "B",
    pembahasan:
      "Perkalian dikerjakan lebih dulu (bukan penjumlahan):\n" +
      "$2\\frac{2}{3} \\times 1\\frac{2}{5} = \\frac{8}{3} \\times \\frac{7}{5} = \\frac{56}{15}$\n\n" +
      "Kemudian penjumlahan:\n" +
      "$1\\frac{1}{2} + \\frac{56}{15} = \\frac{3}{2} + \\frac{56}{15} = \\frac{45}{30} + \\frac{112}{30} = \\frac{157}{30} = 5\\frac{7}{30}$",
  },

  // ─── 2 · PGK ──────────────────────────────────────────────────────────────
  {
    no: 2,
    type: "pgk",
    soal: "Diketahui bilangan $a=\\dfrac{3}{4}$, $b=0{,}6$, $c=45\\%$, dan $d=\\dfrac{4}{5}$. Pilihlah semua pernyataan yang benar.",
    pernyataan: [
      "$a+b=\\dfrac{27}{20}$",
      "$d-c=\\dfrac{7}{20}$",
      "$b\\div c=\\dfrac{4}{3}$",
      "$a\\times d=\\dfrac{2}{5}$",
    ],
    options: [
      "(1) dan (2)",
      "(1), (2), dan (3)",
      "(1), (3), dan (4)",
      "(1), (2), (3), dan (4)",
    ],
    jawaban: "B",
    jawabanPGK: [0, 1, 2],
    pembahasan:
      "$a=\\frac{3}{4}=0{,}75$, $b=0{,}6=\\frac{3}{5}$, $c=45\\%=\\frac{9}{20}$, dan $d=\\frac{4}{5}$.\n\n" +
      "(1) $a+b=\\frac{3}{4}+\\frac{3}{5}=\\frac{15+12}{20}=\\frac{27}{20}$ ✓ BENAR\n" +
      "(2) $d-c=\\frac{4}{5}-\\frac{9}{20}=\\frac{16-9}{20}=\\frac{7}{20}$ ✓ BENAR\n" +
      "(3) $b\\div c=\\frac{3}{5}\\div\\frac{9}{20}=\\frac{3}{5}\\times\\frac{20}{9}=\\frac{4}{3}$ ✓ BENAR\n" +
      "(4) $a\\times d=\\frac{3}{4}\\times\\frac{4}{5}=\\frac{3}{5}$, bukan $\\frac{2}{5}$ ✗ SALAH\n\n" +
      "Jadi pernyataan yang benar adalah (1), (2), dan (3) → B.",
  },

  // ─── 3 · PGKBS ────────────────────────────────────────────────────────────
  {
    no: 3,
    type: "pgkbs",
    soal: "Ibu Sari memiliki $12\\dfrac{1}{2}$ kg tepung. Sebanyak $\\dfrac{2}{5}$ bagian digunakan untuk membuat kue dan $30\\%$ bagian digunakan untuk membuat roti. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Tepung untuk membuat kue sebanyak $5$ kg.",
      "Tepung untuk membuat roti sebanyak $3\\dfrac{3}{4}$ kg.",
      "Sisa tepung setelah membuat kue dan roti adalah $4$ kg.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan:
      "Ubah jumlah tepung menjadi pecahan biasa: $12\\frac{1}{2}=\\frac{25}{2}$ kg.\n\n" +
      "(1) Tepung untuk kue $=\\frac{2}{5}\\times\\frac{25}{2}=5$ kg ✓ BENAR\n" +
      "(2) Tepung untuk roti $=30\\%\\times\\frac{25}{2}=\\frac{3}{10}\\times\\frac{25}{2}=\\frac{15}{4}=3\\frac{3}{4}$ kg ✓ BENAR\n" +
      "(3) Sisa $=12\\frac{1}{2}-5-3\\frac{3}{4}=3\\frac{3}{4}$ kg, bukan $4$ kg ✗ SALAH",
  },

  // ─── 4 · PG ───────────────────────────────────────────────────────────────
  {
    no: 4,
    type: "pg",
    soal: "Urutan bilangan dari terkecil ke terbesar dari $0,6$ ; $55\\%$ ; $\\dfrac{2}{3}$ ; $0,54$ adalah ...",
    options: [
      "$55\\%$ ; $0,54$ ; $0,6$ ; $\\frac{2}{3}$",
      "$0,54$ ; $55\\%$ ; $0,6$ ; $\\frac{2}{3}$",
      "$\\frac{2}{3}$ ; $0,6$ ; $55\\%$ ; $0,54$",
      "$0,54$ ; $55\\%$ ; $\\frac{2}{3}$ ; $0,6$",
    ],
    jawaban: "B",
    pembahasan:
      "Ubah semua ke bentuk desimal:\n" +
      "$0,6=0{,}600$;  $55\\%=0{,}550$;  $\\frac{2}{3}\\approx0{,}667$;  $0,54=0{,}540$\n\n" +
      "Urutan terkecil ke terbesar: $0{,}540 < 0{,}550 < 0{,}600 < 0{,}667$\n" +
      "Jadi: $0,54 < 55\\% < 0,6 < \\frac{2}{3}$ → B",
  },

  // ─── 5 · PGK ──────────────────────────────────────────────────────────────
  {
    no: 5,
    type: "pgk",
    soal: "Perhatikan pernyataan-pernyataan berikut!",
    pernyataan: [
      "$0,45 < \\dfrac{39}{50}$",
      "$\\dfrac{39}{50} < 0,85$",
      "$0,85 < \\dfrac{7}{8}$",
      "$\\dfrac{7}{8} > 0,9$",
    ],
    options: [
      "(1) dan (2)",
      "(2) dan (3)",
      "(1), (2), dan (3)",
      "(2), (3), dan (4)",
    ],
    jawaban: "C",
    jawabanPGK: [0, 1, 2],
    pembahasan:
      "(1) $0,45 < 0,78$ ✓\n" +
      "(2) $0,78 < 0,85$ ✓\n" +
      "(3) $0,85 < \\frac{7}{8}=0,875$ ✓\n" +
      "(4) $\\frac{7}{8}=0,875 < 0,9$, jadi $\\frac{7}{8}>0,9$ adalah SALAH ✗\n\n" +
      "Pernyataan yang benar: (1), (2), dan (3) → C",
  },

  // ─── 6 · PGKBS ────────────────────────────────────────────────────────────
  {
    no: 6,
    type: "pgkbs",
soal: "TKA Matematika 2026 — Buah merupakan salah satu sumber vitamin C. Perhatikan tabel berikut! Buah A: berat 118,4 gr, air 96,3 mL; Buah B: berat 130,7 gr, air 150 mL; Buah C: berat 130,55 gr, air 140 mL; Buah D: berat 96,255 gr, air 118,15 mL. Buah yang diteliti pertama adalah buah yang memiliki berat terbesar dan kandungan air paling banyak. Buah tersebut adalah ...",
    options: ["Buah A", "Buah B", "Buah C", "Buah D"],
    jawaban: "B",
    pembahasan: "Buah B memiliki berat terbesar (130,7 gram) dan kandungan air paling banyak (150 mL). Jadi jawabannya B.",
  },

  // ─── 7 · PG ───────────────────────────────────────────────────────────────
  {
    no: 7,
    type: "pg",
soal: "Hasil dari $\\dfrac{\\frac{3}{4}-\\frac{1}{2}}{\\frac{1}{3}+\\frac{1}{2}}$ adalah ...",
    options: ["$\\dfrac{3}{10}$", "$\\dfrac{1}{5}$", "$\\dfrac{5}{3}$", "$\\dfrac{2}{5}$"],
    jawaban: "A",
    pembahasan: "Pembilang $=\\frac{3}{4}-\\frac{1}{2}=\\frac{1}{4}$. Penyebut $=\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$. Jadi hasilnya $\\frac{1}{4}\\div\\frac{5}{6}=\\frac{3}{10}$; opsi perlu disesuaikan dengan hasil ini."
  },

  // ─── 8 · PGK ──────────────────────────────────────────────────────────────
  {
    no: 8,
    type: "pgk",
    soal: "Pak Ihsan mempunyai sejumlah uang. Seperlimanya untuk membeli kaos, duapertiganya untuk membeli baju, dan sisanya Rp60.000,00 untuk membeli topi.\nPerhatikan pernyataan-pernyataan berikut!",
    pernyataan: [
      "Bagian uang untuk kaos dan baju adalah $\\dfrac{13}{15}$ dari total",
      "Sisa uang yang digunakan untuk topi adalah $\\dfrac{2}{15}$ dari total",
      "Total uang Pak Ihsan adalah Rp450.000,00",
      "Uang yang digunakan membeli kaos adalah Rp75.000,00",
    ],
    options: [
      "(1) dan (2)",
      "(2) dan (3)",
      "(1), (2), dan (3)",
      "(1), (2), (3), dan (4)",
    ],
    jawaban: "C",
    jawabanPGK: [0, 1, 2],
    pembahasan:
      "(1) $\\frac{1}{5}+\\frac{2}{3}=\\frac{3}{15}+\\frac{10}{15}=\\frac{13}{15}$ ✓\n" +
      "(2) Sisa $=1-\\frac{13}{15}=\\frac{2}{15}$ ✓\n" +
      "(3) Total $=60.000\\div\\frac{2}{15}=60.000\\times\\frac{15}{2}=450.000$ ✓\n" +
      "(4) Kaos $=\\frac{1}{5}\\times450.000=90.000\\neq75.000$ ✗\n\n" +
      "Pernyataan yang benar: (1), (2), dan (3) → C",
  },

  // ─── 9 · PGKBS ────────────────────────────────────────────────────────────
  {
    no: 9,
    type: "pgkbs",
    soal: "Ibu membeli gula $6\\frac{2}{3}$ kg. Di rumah masih ada $10\\frac{5}{6}$ kg. Semua gula dimasukkan ke kantong plastik masing-masing $1\\frac{3}{4}$ kg.\nTentukan benar atau salah setiap pernyataan berikut!",
    pernyataan: [
      "Total gula yang tersedia adalah $17\\frac{1}{2}$ kg",
      "Dibutuhkan tepat 10 kantong plastik untuk semua gula",
      "Gula yang tersisa setelah 10 kantong penuh adalah $\\frac{1}{4}$ kg",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan:
      "(1) $6\\frac{2}{3}+10\\frac{5}{6}=\\frac{20}{3}+\\frac{65}{6}=\\frac{40}{6}+\\frac{65}{6}=\\frac{105}{6}=17\\frac{1}{2}$ kg ✓ BENAR\n" +
      "(2) $17\\frac{1}{2}\\div1\\frac{3}{4}=\\frac{35}{2}\\div\\frac{7}{4}=\\frac{35}{2}\\times\\frac{4}{7}=10$ tepat ✓ BENAR\n" +
      "(3) Karena habis tepat 10 kantong, sisa gula = 0 kg $\\neq\\frac{1}{4}$ kg ✗ SALAH",
  },

  // ─── 10 · PG ──────────────────────────────────────────────────────────────
  {
    no: 10,
    type: "pg",
soal: "Ibu Nayra menerima gaji kotor Rp15.000.000 setiap bulan. Ia menggunakan $\\frac{1}{3}$ untuk makan dan minum, $\\frac{1}{4}$ untuk kredit rumah, dan $\\frac{1}{12}$ untuk listrik, internet, dan air. Sisanya ditabung. Jumlah tabungan darurat selama setahun adalah ...",
    options: ["Rp30.000.000", "Rp60.000.000", "Rp90.000.000", "Rp120.000.000"],
    jawaban: "B",
    pembahasan: "Bagian tabungan $=1-\\left(\\frac{1}{3}+\\frac{1}{4}+\\frac{1}{12}\\right)=\\frac{1}{3}$. Tabungan per bulan $=\\frac{1}{3}\\times15.000.000=5.000.000$. Selama setahun $=12\\times5.000.000=60.000.000$, jadi jawaban B.",
  },

  // ─── 11 · PGK ─────────────────────────────────────────────────────────────
  {
    no: 11,
    type: "pgkbs",
    soal: "Tabel kandungan nutrisi per 100 gram daging sapi: energi 250 kkal, protein 26 gram, lemak 15 gram, zat besi 2,6 mg. Lemak meningkat 40% jika digoreng. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Energi dan zat besi pada 400 gram berturut-turut 1.000 kkal dan 10,4 mg.",
      "Menggoreng meningkatkan lemak menjadi 21 gram per 100 gram.",
      "Kebutuhan minimal 78 gram protein dipenuhi dengan minimal 300 gram daging.",
    ],
    jawabanBS: ["B", "B", "B"],
    options: [],
    jawaban: "",
    pembahasan: "(1) 400 gram mengandung 1.000 kkal dan 10,4 mg zat besi: BENAR. (2) $15\\times1,4=21$ gram: BENAR. (3) $78\\div26=3$, jadi minimal 300 gram: BENAR."
  },

  // ─── 12 · PGKBS ───────────────────────────────────────────────────────────
  {
    no: 12,
    type: "pgkbs",
    soal: "Sebuah kotak berisi $250$ kelereng. Sebanyak $20\\%$ kelereng berwarna merah dan $\\dfrac{3}{10}$ berwarna biru. Sisanya berwarna hijau. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Kelereng merah berjumlah $50$ buah.",
      "Kelereng biru berjumlah $75$ buah.",
      "Kelereng hijau berjumlah $150$ buah.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan:
      "(1) Merah $=20\\%\\times250=50$ buah ✓ BENAR\n" +
      "(2) Biru $=\\frac{3}{10}\\times250=75$ buah ✓ BENAR\n" +
      "(3) Hijau $=250-50-75=125$ buah, bukan $150$ buah ✗ SALAH",
  },

  // ─── 13 · PG ──────────────────────────────────────────────────────────────
  {
    no: 13,
    type: "pg",
    soal: "Hasil dari $\\dfrac{3}{4}+0{,}35$ adalah ....",
    options: ["A. $0{,}95$", "B. $1{,}05$", "C. $1{,}10$", "D. $1{,}25$"],
    jawaban: "C",
    pembahasan: "$\\frac{3}{4}=0{,}75$, sehingga $0{,}75+0{,}35=1{,}10$, bukan $1{,}05$. Jawaban yang benar adalah C.",
  },

  // ─── 14 · PGK ─────────────────────────────────────────────────────────────
  {
    no: 14,
    type: "pgk",
    soal: "Diketahui $A=-\\dfrac{3}{4}$, $B=-0{,}7$, $C=\\dfrac{2}{3}$, dan $D=65\\%$. Pilihlah semua pernyataan yang benar.",
    pernyataan: [
      "$A<B$",
      "$B<C$",
      "$D>C$",
      "$A>D$",
    ],
    options: [
      "(1) dan (2)",
      "(1), (2), dan (4)",
      "(1), (3), dan (4)",
      "(2), (3), dan (4)",
    ],
    jawaban: "B",
    jawabanPGK: [0, 1, 3],
    pembahasan:
      "Ubah ke desimal jika diperlukan: $A=-0{,}75$, $B=-0{,}7$, $C\\approx0{,}667$, dan $D=0{,}65$.\n\n" +
      "(1) $-0{,}75<-0{,}7$ ✓ BENAR\n" +
      "(2) $-0{,}7<0{,}667$ ✓ BENAR\n" +
      "(3) $0{,}65<0{,}667$, sehingga $D>C$ ✗ SALAH\n" +
      "(4) $A+D=-\\frac{3}{4}+\\frac{13}{20}=-\\frac{15}{20}+\\frac{13}{20}=-\\frac{1}{10}$ ✓ BENAR\n\n" +
      "Pernyataan yang benar adalah (1), (2), dan (4) → B.",
  },

  // ─── 15 · PGKBS ───────────────────────────────────────────────────────────
  {
    no: 15,
    type: "pgkbs",
    soal: "Sebuah tangki berkapasitas $15$ liter diisi air hingga $\\dfrac{3}{5}$ bagian. Kemudian $\\dfrac{1}{4}$ dari air di dalam tangki digunakan. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Volume air mula-mula adalah $9$ liter.",
      "Volume air yang tersisa adalah $6\\dfrac{3}{4}$ liter.",
      "Volume air yang tersisa sama dengan $\\dfrac{3}{4}$ kapasitas tangki.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan:
      "(1) Volume mula-mula $=\\frac{3}{5}\\times15=9$ liter ✓ BENAR\n" +
      "(2) Air yang digunakan $=\\frac{1}{4}\\times9=2\\frac{1}{4}$ liter, sehingga sisa $=9-2\\frac{1}{4}=6\\frac{3}{4}$ liter ✓ BENAR\n" +
      "(3) Perbandingan sisa terhadap kapasitas $=6\\frac{3}{4}\\div15=\\frac{27}{60}=\\frac{9}{20}$, bukan $\\frac{3}{4}$ ✗ SALAH",
  },

  // ─── 16 · PG ──────────────────────────────────────────────────────────────
  {
    no: 16,
    type: "pg",
    soal: "Bentuk persen dari $0{,}875$ adalah ....",
    options: ["A. $0{,}875\\%$", "B. $8{,}75\\%$", "C. $87{,}5\\%$", "D. $875\\%$"],
    jawaban: "C",
    pembahasan: "$0{,}875\\times100\\%=87{,}5\\%$. Jadi jawabannya C.",
  },

  // ─── 17 · PGK ─────────────────────────────────────────────────────────────
  {
    no: 17,
    type: "pgk",
    soal: "Seutas tali panjangnya $6\\dfrac{1}{2}$ m. Tali itu dipotong menjadi dua bagian, masing-masing sepanjang $\\dfrac{3}{4}$ m dan $\\dfrac{2}{5}$ m. Pilihlah semua pernyataan yang benar.",
    pernyataan: [
      "Panjang tali mula-mula adalah $\\dfrac{13}{2}$ m.",
      "Total panjang tali yang dipotong adalah $\\dfrac{23}{20}$ m.",
      "Sisa tali adalah $5\\dfrac{7}{20}$ m.",
      "Sisa tali kurang dari $5$ m.",
    ],
    options: [
      "(1) dan (2)",
      "(1), (2), dan (3)",
      "(1), (3), dan (4)",
      "(2), (3), dan (4)",
    ],
    jawaban: "B",
    jawabanPGK: [0, 1, 2],
    pembahasan:
      "$6\\frac{1}{2}=\\frac{13}{2}$ m.\n" +
      "Total yang dipotong $=\\frac{3}{4}+\\frac{2}{5}=\\frac{15}{20}+\\frac{8}{20}=\\frac{23}{20}$ m.\n" +
      "Sisa $=\\frac{13}{2}-\\frac{23}{20}=\\frac{130-23}{20}=\\frac{107}{20}=5\\frac{7}{20}$ m.\n\n" +
      "Jadi (1), (2), dan (3) BENAR, sedangkan sisa lebih dari $5$ m sehingga (4) SALAH → B.",
  },

  // ─── 18 · PGKBS ───────────────────────────────────────────────────────────
  {
    no: 18,
    type: "pgkbs",
    soal: "Sebuah wadah berkapasitas $15$ liter diisi sampai $\\dfrac{3}{5}$ bagian. Kemudian $\\dfrac{1}{4}$ dari isi wadah digunakan. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Isi wadah mula-mula adalah $9$ liter.",
      "Sisa isi wadah adalah $6\\dfrac{3}{4}$ liter.",
      "Sisa isi wadah adalah $\\dfrac{3}{4}$ dari kapasitas wadah.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan:
      "Isi mula-mula $=\\frac{3}{5}\\times15=9$ liter.\n" +
      "Yang digunakan $=\\frac{1}{4}\\times9=\\frac{9}{4}=2\\frac{1}{4}$ liter, sehingga sisa $=9-\\frac{9}{4}=\\frac{27}{4}=6\\frac{3}{4}$ liter.\n\n" +
      "(1) BENAR. (2) BENAR. Untuk (3), sisa dibanding kapasitas $=\\frac{27/4}{15}=\\frac{9}{20}$, bukan $\\frac{3}{4}$, sehingga SALAH.",
  },

  // ─── 19 · PG ──────────────────────────────────────────────────────────────
  {
    no: 19,
    type: "pg",
    soal: "Hasil dari $\\dfrac{5}{6}-\\dfrac{3}{8}$ adalah ....",
    options: ["A. $\\dfrac{7}{24}$", "B. $\\dfrac{11}{24}$", "C. $\\dfrac{13}{24}$", "D. $\\dfrac{19}{24}$"],
    jawaban: "B",
    pembahasan: "$\\frac{5}{6}-\\frac{3}{8}=\\frac{20}{24}-\\frac{9}{24}=\\frac{11}{24}$. Jadi jawaban yang benar adalah B.",
  },

  // ─── 20 · PG ──────────────────────────────────────────────────────────────
  {
    no: 20,
    type: "pg",
    soal: "Dina akan mengemas tepung beras ke dalam kantong plastik berukuran $\\dfrac{1}{2}\\text{ kg}$ dan $\\dfrac{1}{4}\\text{ kg}$. Berat tepung beras yang akan dikemas adalah $24{,}3\\text{ kg}$. Kemasan $\\dfrac{1}{2}\\text{ kg}$ akan digunakan terlebih dahulu. Berat sisa tepung beras yang tidak dapat dikemas sesuai ukuran kantong adalah ....",
    options: [
      "A. $\\dfrac{1}{20}\\text{ kg}$",
      "B. $\\dfrac{1}{10}\\text{ kg}$",
      "C. $\\dfrac{3}{20}\\text{ kg}$",
      "D. $\\dfrac{1}{5}\\text{ kg}$",
    ],
    jawaban: "A",
    pembahasan:
      "Gunakan kantong $\\frac{1}{2}$ kg terlebih dahulu:\n" +
      "$24{,}3 \\div \\frac{1}{2} = 48{,}6$ → 48 kantong penuh\n" +
      "Tepung terpakai: $48 \\times \\frac{1}{2} = 24\\text{ kg}$\n" +
      "Sisa: $24{,}3 - 24 = 0{,}3\\text{ kg}$\n\n" +
      "Gunakan kantong $\\frac{1}{4}$ kg:\n" +
      "$0{,}3 \\div \\frac{1}{4} = 1{,}2$ → hanya 1 kantong penuh\n" +
      "Tepung terpakai: $1 \\times \\frac{1}{4} = 0{,}25\\text{ kg}$\n" +
      "Sisa akhir: $0{,}3 - 0{,}25 = 0{,}05\\text{ kg} = \\dfrac{1}{20}\\text{ kg}$\n\n" +
      "Jawaban: A",
  },

  // ─── 21 · PGKBS ───────────────────────────────────────────────────────────
  {
    no: 21,
    type: "pgkbs",
    soal: "Diketahui sekarung kedelai dengan berat $36\\text{ kg}$. Kedelai tersebut akan dijual dalam kemasan plastik kecil. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Jika terdapat 24 kemasan plastik, setiap kemasan berisi $1{,}5\\text{ kg}$ kedelai.",
      "Jika setiap kemasan berisi $5\\text{ kg}$ kedelai, sisa kedelai yang tidak dikemas adalah $2\\text{ kg}$.",
      "Jika setiap kemasan berisi $2\\dfrac{1}{4}\\text{ kg}$ kedelai, banyak kemasan plastik adalah 16 buah.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan:
      "(1) $36 \\div 24 = 1{,}5\\text{ kg}$ per kemasan ✓ BENAR\n\n" +
      "(2) $36 \\div 5 = 7{,}2$ → 7 kemasan penuh → terpakai $7 \\times 5 = 35\\text{ kg}$\n" +
      "Sisa: $36 - 35 = 1\\text{ kg} \\neq 2\\text{ kg}$ ✗ SALAH\n\n" +
      "(3) $36 \\div 2\\frac{1}{4} = 36 \\div \\frac{9}{4} = 36 \\times \\frac{4}{9} = 16$ kemasan ✓ BENAR",
  },

  // ─── 22 · PG (estimasi) ────────────────────────────────────────────────────
  {
    no: 22,
    type: "pg",
    soal: "Diketahui operasi bilangan $4{,}2 \\times 19{,}7 + 13{,}81 - 32{,}47 = m$. Perkiraan hasil dari $(m - 20)$ adalah ....",
    options: ["A. 20", "B. 40", "C. 80", "D. 100"],
    jawaban: "B",
    pembahasan:
      "Gunakan pembulatan ke bilangan yang nyaman:\n" +
      "$4{,}2 \\approx 4,\\quad 19{,}7 \\approx 20,\\quad 13{,}81 \\approx 14,\\quad 32{,}47 \\approx 32$\n\n" +
      "$m \\approx 4 \\times 20 + 14 - 32 = 80 + 14 - 32 = 62$\n\n" +
      "$m - 20 \\approx 62 - 20 = 42 \\approx 40$\n\n" +
      "(Nilai sejati: $4{,}2 \\times 19{,}7 = 82{,}74$; $m = 82{,}74 + 13{,}81 - 32{,}47 = 64{,}08$; $m-20 = 44{,}08$)\n" +
      "Jawaban: B",
  },

  // ─── 23 · PG (urutan → kode) ───────────────────────────────────────────────
  {
    no: 23,
    type: "pg",
    soal: "Diketahui kode warna menggunakan huruf yang nilainya disusun dari terbesar ke terkecil. Huruf beserta nilainya: $B = \\dfrac{3}{5}$; $I = 0{,}48$; $R = \\dfrac{1}{3}$; $U = 7\\%$. Kode warna tersebut adalah ....",
    options: ["A. BIRU", "B. RUBI", "C. UBIR", "D. IURB"],
    jawaban: "A",
    pembahasan:
      "Ubah semua ke desimal:\n" +
      "$B = \\frac{3}{5} = 0{,}600$\n" +
      "$I = 0{,}480$\n" +
      "$R = \\frac{1}{3} \\approx 0{,}333$\n" +
      "$U = 7\\% = 0{,}070$\n\n" +
      "Urutan dari terbesar ke terkecil: $B > I > R > U$\n\n" +
      "Kode warna: **BIRU** → A",
  },

  // ─── 24 · PG ──────────────────────────────────────────────────────────────
  {
    no: 24,
    type: "pg",
    soal: "Hasil dari $\\dfrac{2}{5} \\times \\dfrac{5}{6} - \\dfrac{3}{4} \\div \\dfrac{9}{2}$ adalah ....",
    options: [
      "A. $-\\dfrac{1}{6}$",
      "B. $\\dfrac{1}{6}$",
      "C. $\\dfrac{1}{3}$",
      "D. $\\dfrac{5}{6}$",
    ],
    jawaban: "B",
    pembahasan:
      "Perkalian dan pembagian dikerjakan lebih dulu (kiri ke kanan):\n" +
      "$\\frac{2}{5} \\times \\frac{5}{6} = \\frac{10}{30} = \\frac{1}{3}$\n\n" +
      "$\\frac{3}{4} \\div \\frac{9}{2} = \\frac{3}{4} \\times \\frac{2}{9} = \\frac{6}{36} = \\frac{1}{6}$\n\n" +
      "Sekarang pengurangan:\n" +
      "$\\frac{1}{3} - \\frac{1}{6} = \\frac{2}{6} - \\frac{1}{6} = \\frac{1}{6}$\n\n" +
      "Jawaban: B",
  },

  // ─── 25 & 26 · Konteks Kaveling ────────────────────────────────────────────
  // ─── 25 · PGKBS ───────────────────────────────────────────────────────────
  {
    no: 25,
    type: "pgkbs",
    soal: `Perhatikan teks berikut untuk menjawab soal nomor 25 dan 26.

Tanah Kaveling
Seorang pengembang memiliki sebidang tanah berbentuk persegi panjang berukuran $80\\text{ m} \\times 40\\text{ m}$ yang dibagi menjadi kaveling rumah berukuran sama, masing-masing $8\\text{ m} \\times 4\\text{ m}$. Kaveling-kaveling tersebut diberi nomor urut 1, 2, 3, dan seterusnya hingga semuanya bernomor.

Berdasarkan teks tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut.`,
    pernyataan: [
      "Kaveling bernomor ganjil merupakan $\\dfrac{1}{2}$ bagian dari total kaveling.",
      "Kaveling bernomor prima merupakan $\\dfrac{1}{5}$ bagian dari total kaveling.",
      "Kaveling bernomor lebih dari 12 merupakan $\\dfrac{22}{25}$ bagian dari total kaveling.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan:
      "Total kaveling: $\\dfrac{80 \\times 40}{8 \\times 4} = \\dfrac{3200}{32} = 100$ kaveling\n\n" +
      "(1) Ganjil: nomor 1, 3, 5, …, 99 → 50 kaveling = $\\dfrac{50}{100} = \\dfrac{1}{2}$ ✓ BENAR\n\n" +
      "(2) Bilangan prima ≤ 100: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 → 25 bilangan prima\n" +
      "$\\dfrac{25}{100} = \\dfrac{1}{4} \\neq \\dfrac{1}{5}$ ✗ SALAH\n\n" +
      "(3) Bernomor > 12 → kaveling 13 s.d. 100 = 88 kaveling = $\\dfrac{88}{100} = \\dfrac{22}{25}$ ✓ BENAR",
  },

  // ─── 26 · PGK ─────────────────────────────────────────────────────────────
  {
    no: 26,
    type: "pgk",
    soal: "Berdasarkan teks Tanah Kaveling pada soal nomor 25, pilihlah semua pernyataan yang benar.",
    pernyataan: [
      "Kaveling bernomor kelipatan 4 merupakan $\\dfrac{1}{4}$ bagian dari total kaveling.",
      "Kaveling bernomor kelipatan 5 merupakan $\\dfrac{1}{5}$ bagian dari total kaveling.",
      "Kaveling bernomor paling banyak 10 merupakan $\\dfrac{1}{10}$ bagian dari total kaveling.",
      "Kaveling bernomor genap merupakan $\\dfrac{2}{5}$ bagian dari total kaveling.",
    ],
    options: [
      "(1) dan (2)",
      "(1), (2), dan (3)",
      "(1), (3), dan (4)",
      "(1), (2), (3), dan (4)",
    ],
    jawaban: "B",
    jawabanPGK: [0, 1, 2],
    pembahasan:
      "Total kaveling adalah $100$.\n" +
      "(1) Kelipatan 4 dari 1 sampai 100 ada $100\\div4=25$, jadi bagiannya $\\frac{25}{100}=\\frac{1}{4}$ ✓ BENAR\n" +
      "(2) Kelipatan 5 ada $100\\div5=20$, jadi bagiannya $\\frac{20}{100}=\\frac{1}{5}$ ✓ BENAR\n" +
      "(3) Nomor 1 sampai 10 berjumlah $10$, jadi bagiannya $\\frac{10}{100}=\\frac{1}{10}$ ✓ BENAR\n" +
      "(4) Bilangan genap ada $50$, sehingga bagiannya $\\frac{50}{100}=\\frac{1}{2}$, bukan $\\frac{2}{5}$ ✗ SALAH\n\n" +
      "Pernyataan yang benar adalah (1), (2), dan (3) → B.",
  },

  // ─── 27 · PGK ─────────────────────────────────────────────────────────────
  {
    no: 27,
    type: "pgk",
    soal: "Perhatikan perhitungan bilangan pecahan berikut.\n$P = \\dfrac{4}{7} \\div \\dfrac{8}{21}, \\quad Q = \\dfrac{3}{8} \\times \\dfrac{4}{15}, \\quad R = \\dfrac{7}{12} + \\dfrac{5}{6}, \\quad S = \\dfrac{11}{12} - \\dfrac{5}{6}$\nBerdasarkan informasi tersebut, pilihlah semua jawaban yang benar. Jawaban benar lebih dari satu.",
    pernyataan: [
      "Nilai $P = \\dfrac{2}{3}$",
      "Nilai $Q = \\dfrac{1}{10}$",
      "Nilai $R = \\dfrac{17}{12}$",
      "Nilai $S = \\dfrac{1}{6}$",
    ],
    options: [
      "(1) dan (2)",
      "(2) dan (3)",
      "(3) dan (4)",
      "(1), (2), dan (3)",
    ],
    jawaban: "B",
    jawabanPGK: [1, 2],
    pembahasan:
      "$P = \\dfrac{4}{7} \\div \\dfrac{8}{21} = \\dfrac{4}{7} \\times \\dfrac{21}{8} = \\dfrac{84}{56} = \\dfrac{3}{2}$; pernyataan $P=\\frac{2}{3}$ ✗ SALAH\n\n" +
      "$Q = \\dfrac{3}{8} \\times \\dfrac{4}{15} = \\dfrac{12}{120} = \\dfrac{1}{10}$ ✓ BENAR\n\n" +
      "$R = \\dfrac{7}{12} + \\dfrac{5}{6} = \\dfrac{7}{12} + \\dfrac{10}{12} = \\dfrac{17}{12}$ ✓ BENAR\n\n" +
      "$S = \\dfrac{11}{12} - \\dfrac{5}{6} = \\dfrac{11}{12} - \\dfrac{10}{12} = \\dfrac{1}{12}$; pernyataan $S=\\frac{1}{6}$ ✗ SALAH\n\n" +
      "Pernyataan yang benar: (2) dan (3) → B",
  },

  // ─── 28 & 29 · Konteks Persediaan Beras ────────────────────────────────────
  // ─── 28 · PGK ─────────────────────────────────────────────────────────────
  {
    no: 28,
    type: "pgk",
    soal: `Perhatikan teks berikut untuk menjawab soal nomor 28 dan 29.

Persediaan Beras Bu Alya
Bu Alya mencatat harga pembelian 100 kg beras sebesar Rp1.200.000,00. Untuk acara syukuran, ia perlu menyediakan beras untuk 75 tamu. Setiap tamu mendapat $0{,}12$ kg beras. Beras untuk acara dibeli sebagai persediaan tambahan dengan harga per kilogram yang sama.

Berdasarkan teks tersebut, pilihlah semua pernyataan yang benar.`,
    pernyataan: [
      "Kebutuhan beras untuk acara syukuran adalah $9$ kg.",
      "Harga beras per kilogram adalah Rp12.000,00.",
      "Biaya pembelian beras tambahan adalah Rp108.000,00.",
      "Jika membeli $10$ kg, sisa beras setelah acara adalah $2$ kg.",
    ],
    options: [
      "(1) dan (2)",
      "(1), (2), dan (3)",
      "(1), (3), dan (4)",
      "(1), (2), (3), dan (4)",
    ],
    jawaban: "B",
    jawabanPGK: [0, 1, 2],
    pembahasan:
      "(1) Kebutuhan beras $=75\\times0{,}12=9$ kg ✓ BENAR\n" +
      "(2) Harga per kilogram $=\\text{Rp}1.200.000,00\\div100=\\text{Rp}12.000,00$ ✓ BENAR\n" +
      "(3) Biaya tambahan $=9\\times\\text{Rp}12.000,00=\\text{Rp}108.000,00$ ✓ BENAR\n" +
      "(4) Jika membeli 10 kg, sisa setelah menyediakan 9 kg adalah $10-9=1$ kg, bukan 2 kg ✗ SALAH\n\n" +
      "Pernyataan yang benar adalah (1), (2), dan (3) → B.",
  },

  // ─── 29 · PG ──────────────────────────────────────────────────────────────
  {
    no: 29,
    type: "pg",
    soal: "Berdasarkan teks Persediaan Beras Bu Alya (soal 28), biaya pembelian beras tambahan untuk acara syukuran adalah ....",
    options: [
      "A. Rp96.000",
      "B. Rp108.000",
      "C. Rp120.000",
      "D. Rp216.000",
    ],
    jawaban: "B",
    pembahasan:
      "Kebutuhan beras untuk acara:\n" +
      "$75 \\text{ tamu} \\times 0{,}12\\text{ kg} = 9\\text{ kg}$\n\n" +
      "Harga beras per kg:\n" +
      "$\\text{Rp}1.200.000 \\div 100\\text{ kg} = \\text{Rp}12.000\\text{/kg}$\n\n" +
      "Total biaya:\n" +
      "$9 \\times \\text{Rp}12.000 = \\text{Rp}108.000$\n\n" +
      "Jawaban: B",
  },
];

const nomorDihapus = new Set([13, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 29]);
const latihanDasarTampil = latihanDasar.filter((soal) => !nomorDihapus.has(soal.no));

const BilanganRasionalPage = () => (
  <TKAPemantapanLayout
    title="BILANGAN RASIONAL"
    materiSections={materiSections}
    contohSoal={contohSoal}
    latihanDasar={latihanDasarTampil}
  />
);

export default BilanganRasionalPage;
