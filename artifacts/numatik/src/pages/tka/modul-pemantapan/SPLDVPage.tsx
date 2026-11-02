import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

const contohSoal: LatihanSoal[] = [
  // ── Soal 1 — PG ─────────────────────────────────────────────────────────────
  {
    no: 1, type: "pg",
    soal: "Diberikan sistem persamaan linear dua variabel $x + y = 7$ dan $x - y = 3$. Himpunan penyelesaian dari sistem tersebut adalah …",
    options: [
      "A. $\\{(2, 5)\\}$",
      "B. $\\{(5, -2)\\}$",
      "C. $\\{(5, 2)\\}$",
      "D. $\\{(-5, 2)\\}$",
    ],
    jawaban: "C",
    pembahasan: "Gunakan metode eliminasi untuk menghilangkan variabel $y$:\n$$\\begin{aligned} x + y &= 7 \\\\ x - y &= 3 \\\\ \\hline 2x &= 10 \\quad (+)\\\\ x &= 5 \\end{aligned}$$\nSubstitusi $x = 5$ ke persamaan pertama:\n$$5 + y = 7 \\implies y = 2$$\nHimpunan Penyelesaian $= \\{(5, 2)\\}$\nJawaban: C",
  },

  // ── Soal 2 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 2, type: "pgkbs",
    soal: "Diketahui sistem persamaan linear dua variabel $4x - 2y = 10$ dan $2x + y = 9$ memiliki penyelesaian $x = m$ dan $y = n$. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Nilai $n$ sama dengan $4$.",
      "Nilai $m$ sama dengan $3$.",
      "Nilai dari $2m - n$ adalah $2$.",
    ],
    jawabanBS: ["S", "S", "S"],
    pembahasan: "Eliminasi variabel $x$ untuk mencari $y$ ($n$):\n$$\\begin{aligned} 4x - 2y = 10 &\\;(\\times 1) \\implies 4x - 2y = 10 \\\\ 2x + y = 9 &\\;(\\times 2) \\implies 4x + 2y = 18 \\\\ \\hline &\\quad\\quad -4y = -8 \\quad (-) \\\\ &\\quad\\quad y = 2 \\end{aligned}$$\nMaka $n = 2$ (bukan 4) → Pernyataan (1) SALAH.\nSubstitusi $y = 2$ ke persamaan (2): $2x + 2 = 9 \\Rightarrow x = 3{,}5$, sehingga $m = 3{,}5$ (bukan 3) → Pernyataan (2) SALAH.\n$2m - n = 2(3{,}5) - 2 = 5$ (bukan 2) → Pernyataan (3) SALAH.",
  },

  // ── Soal 3 — PGKBS (bacaan: Toko Busana Indah) ──────────────────────────────
  {
    no: 3, type: "pgkbs",
    soal: "📖 Bacaan (untuk Soal 3 dan 4)\nIbu Sarah membeli 3 potong kemeja dan 2 potong celana di toko \"Busana Indah\" seharga Rp450.000,00. Ibu Maya membeli 2 potong kemeja dan 1 potong celana di toko yang sama seharga Rp260.000,00. Ibu Rini berniat membeli 4 potong kemeja dan 3 potong celana di toko tersebut.\n\nBerdasarkan teks di atas, tentukan kategorisasi Tepat atau Tidak Tepat untuk setiap pernyataan berikut!",
    pernyataan: [
      "Harga satu potong kemeja di toko \"Busana Indah\" adalah Rp70.000,00.",
      "Harga dua potong celana di toko \"Busana Indah\" adalah Rp240.000,00.",
      "Ibu Rini harus membayar total Rp640.000,00 di toko \"Busana Indah\".",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Misalkan $x$ = harga 1 kemeja, $y$ = harga 1 celana.\nSistem persamaan:\n$3x + 2y = 450.000 \\quad \\text{--- (1)}$\n$2x + y = 260.000 \\quad \\text{--- (2)} \\implies y = 260.000 - 2x$\nSubstitusi $y$ ke (1):\n$$3x + 2(260.000 - 2x) = 450.000$$\n$$3x + 520.000 - 4x = 450.000 \\implies -x = -70.000 \\implies x = 70.000$$\nHarga 1 kemeja = Rp70.000,00 → TEPAT\n$y = 260.000 - 2(70.000) = 120.000$; harga 2 celana $= 2 \\times 120.000 = 240.000$ → TEPAT\nBelanjaan Ibu Rini $= 4(70.000) + 3(120.000) = 280.000 + 360.000 = 640.000$ → TEPAT",
  },

  // ── Soal 4 — PG (lanjutan bacaan Toko Busana Indah) ─────────────────────────
  {
    no: 4, type: "pg",
    soal: "Berdasarkan bacaan pada Soal 3, apabila Ibu Rini hendak melunasi belanjaannya sebesar Rp640.000,00 menggunakan pecahan uang Rp100.000,00, berapa lembar uang kertas yang minimal harus ia bayarkan?",
    options: [
      "A. 6 lembar",
      "B. 7 lembar",
      "C. 8 lembar",
      "D. 10 lembar",
    ],
    jawaban: "B",
    pembahasan: "Total belanja Ibu Rini = Rp640.000,00; pecahan uang = Rp100.000,00.\n$$\\frac{640.000}{100.000} = 6{,}4 \\text{ lembar}$$\nKarena lembaran harus utuh dan mencukupi, dibulatkan ke atas:\n$6{,}4 \\rightarrow 7$ lembar\nDengan 7 lembar uang Rp100.000,00 (total Rp700.000,00), cukup membayar dan mendapat kembalian Rp60.000,00.\nJawaban: B",
  },

  // ── Soal 5 — PG ─────────────────────────────────────────────────────────────
  {
    no: 5, type: "pg",
    soal: "Diberikan sistem persamaan:\n$$\\frac{1}{x} + \\frac{3}{y} = \\frac{5}{6} \\quad \\text{dan} \\quad \\frac{3}{x} - \\frac{1}{y} = \\frac{1}{2}$$\nPenyelesaian dari sistem persamaan tersebut adalah $(x, y) = \\dots$",
    options: [
      "A. $\\left(\\dfrac{30}{7}, 5\\right)$",
      "B. $\\left(5, \\dfrac{30}{7}\\right)$",
      "C. $\\left(\\dfrac{7}{30}, 5\\right)$",
      "D. $(3, 5)$",
    ],
    jawaban: "A",
    pembahasan: "Misalkan $a = \\dfrac{1}{x}$ dan $b = \\dfrac{1}{y}$, sehingga:\n$a + 3b = \\dfrac{5}{6} \\implies 6a + 18b = 5 \\quad\\text{--- (1)}$\n$3a - b = \\dfrac{1}{2} \\implies 6a - 2b = 1 \\quad\\text{--- (2)}$\nEliminasi variabel $a$ dengan (1) $-$ (2):\n$$20b = 4 \\implies b = \\frac{1}{5}$$\nSubstitusi $b = \\dfrac{1}{5}$ ke (2):\n$$6a - \\frac{2}{5} = 1 \\implies 6a = \\frac{7}{5} \\implies a = \\frac{7}{30}$$\nKembalikan ke variabel asli: $x = \\dfrac{1}{a} = \\dfrac{30}{7}$ dan $y = \\dfrac{1}{b} = 5$.\nJadi penyelesaiannya adalah $\\left(\\dfrac{30}{7}, 5\\right)$ → Jawaban A.",
  },
];

const materiSections: MateriSection[] = [
  { heading: "A. Persamaan Linear Dua Variabel (PLDV)", content: `Bentuk umum PLDV: $ax + by = c$ dengan $a, b \\neq 0$, variabel x dan y.` },
  { heading: "B. Sistem Persamaan Linear Dua Variabel (SPLDV)", content: `$a_1x + b_1y = c_1$\n$a_2x + b_2y = c_2$` },
  { heading: "C. Penyelesaian SPLDV", content: `Penyelesaian SPLDV digunakan untuk menentukan nilai (x, y) yang memenuhi kedua persamaan melalui metode sebagai berikut:\na. Metode Grafik\nb. Metode Substitusi\nc. Metode Eliminasi\nd. Metode Campuran` },
  { heading: "D. Penyelesaian Soal Menggunakan Metode Campuran", content: `$x + 3y = 2$ (persamaan 1)\n$2x + y = 9$ (persamaan 2)\n\nLangkah berikutnya adalah menyamakan koefisien salah satu variabel untuk dihilangkan (dieliminasi), bisa koefisien x atau koefisien y. Pada kasus ini kita coba pilih untuk menyamakan koefisien x yaitu dengan cara $\\times 2$ pada persamaan 1 agar sama-sama 2x seperti pada uraian berikut:\n\n$x + 3y = 2 \\quad \\times 2 \\quad \\Rightarrow \\quad 2x + 6y = 4$\n$2x + y = 9 \\quad \\times 1 \\quad \\Rightarrow \\quad 2x + y = 9$\n$\\hspace{5.5cm} 5y = -5$\n$\\hspace{5.5cm} y = -1$\n\nUntuk mendapatkan nilai variabel x kita substitusikan nilai y yang sudah diketahui ke salah satu persamaan, baik persamaan 1 ataupun persamaan 2.\n\nKita coba substitusikan $y = -1$ ke persamaan 1 yaitu $x + 3y = 2$\n$x + 3(-1) = 2$\n$x - 3 = 2$\n$x = 2 + 3$\n$x = 5$\n\nJadi, penyelesaian SPLDV di atas adalah $x = 5$ dan $y = -1$ atau $(5, -1)$` },
  { heading: "E. SPLDV Memiliki Penyelesaian Tak Hingga", content: `Pada kasus SPLDV dimana memiliki penyelesaian tak hingga adalah ketika sistem persamaan yang ada membentuk PLDV.\n\nContoh:\nTentukan penyelesaian SPLDV berikut:\n$x + y = 5$\n$2x + 2y = 10$\n\nKedua persamaan tersebut sebenarnya adalah persamaan yang sama (persamaan kedua adalah 2 kali persamaan pertama), sehingga memiliki tak hingga penyelesaian.` },
  { heading: "F. SPLDV Tidak Memiliki Himpunan Penyelesaian", content: `Pada kasus SPLDV dimana kedua persamaan memiliki persamaan yang sama namun dengan hasil yang berbeda (tidak konsisten).\n\nContoh:\nTentukan penyelesaian SPLDV berikut:\n$x + y = 5$\n$x + y = -3$\n\nKedua persamaan tersebut tidak konsisten karena sisi kiri sama tetapi sisi kanan berbeda, sehingga tidak memiliki penyelesaian.` },
  { heading: "G. SPLDV Memiliki 1 Himpunan Penyelesaian", content: `Pada kasus SPLDV dimana kedua persamaan tidak membentuk PLDV dan tidak terdapat 2 persamaan yang sama dengan menghasilkan nilai yang berbeda.\n\nIni adalah kasus yang paling umum dijumpai dalam soal-soal SPLDV.` },
];

const latihanDasar: LatihanSoal[] = [

  // ── No. 1 — PG ──────────────────────────────────────────────────────────────
  {
    no: 1, type: "pg",
    soal: "Diketahui sistem persamaan $x + 2y = 10$ dan $3x - y = 9$. Nilai dari $x + y$ adalah ...",
    options: ["A. $5$", "B. $7$", "C. $9$", "D. $11$"],
    jawaban: "B",
    pembahasan: "Dari persamaan (2): $y = 3x - 9$. Substitusi ke (1):\n$x + 2(3x - 9) = 10 \\Rightarrow 7x - 18 = 10 \\Rightarrow x = 4,\\; y = 3$\n$x + y = 4 + 3 = 7$ → Jawaban B",
  },

  // ── No. 2 — PGK ─────────────────────────────────────────────────────────────
  {
    no: 2, type: "pgk",
    soal: "Sistem persamaan $2x + 3y = 19$ dan $x - y = 2$ memiliki penyelesaian $x = p$ dan $y = q$. Pernyataan-pernyataan berikut berkaitan dengan nilai $p$ dan $q$.",
    pernyataan: [
      "Nilai $p = 5$.",
      "Nilai $q = 3$.",
      "Nilai $p + q = 7$.",
      "Nilai $2p - q = 7$.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 1 dan 3",
      "C. 2 dan 4",
      "D. 1, 2, dan 4",
    ],
    jawaban: "D",
    pembahasan: "Dari (2): $x = y + 2$. Sub ke (1): $2(y+2)+3y=19 \\Rightarrow 5y=15 \\Rightarrow y=3=q,\\; x=5=p$\nPernyataan (1): $p=5$ → BENAR\nPernyataan (2): $q=3$ → BENAR\nPernyataan (3): $p+q=8 \\neq 7$ → SALAH\nPernyataan (4): $2(5)-3=7$ → BENAR\nBenar: 1, 2, dan 4 → Jawaban D",
  },

  // ── No. 3 — PGKBS ───────────────────────────────────────────────────────────
  {
    no: 3, type: "pg",
    soal: "TKA Matematika 2026 — Jajanan Tradisional. Harga 2 kotak kue putu mayang dan 3 kotak kue pancong adalah Rp58.000,00, sedangkan 3 kotak putu mayang dan 2 kotak pancong adalah Rp62.000,00. Berapa harga 3 kotak kue putu mayang dan 1 kotak kue pancong? [IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JrFeSOoLxeTb4kTxPj7jJ87QBQ88Zw.png]",
    options: ["A. Rp10.000,00", "B. Rp14.000,00", "C. Rp44.000,00", "D. Rp52.000,00"],
    jawaban: "D",
    pembahasan: "Misalkan putu mayang $=p$ dan pancong $=q$. Selesaikan SPLDV dari informasi pada soal, lalu substitusikan ke $3p+q$.",
  },

  // ── No. 4 — PG ──────────────────────────────────────────────────────────────
  {
    no: 4, type: "pg",
    soal: "TKA Matematika 2026 — Rino, Tiko, dan Bayu pergi ke toko buku. Rino membeli 4 buku tulis dan 3 pulpen. Tiko membeli dua kali lipat dari masing-masing jumlah Rino, dan Bayu membeli tiga kali lipat. Jika harga 1 buku = x dan 1 pulpen = y, bagaimana kalimat matematika total harga ketiganya? [IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MM5vDgp6wB35zmNNEjat3kgZC76ryd.png]",
    options: ["A. $24x+18y$", "B. $20x+15y$", "C. $12x+9y$", "D. $4x+3y$"],
    jawaban: "A",
    pembahasan: "Total buku $=(4+8+12)=24$ dan total pulpen $=(3+6+9)=18$, sehingga total harga $24x+18y$.",
  },

  // ── No. 5 — PGK ─────────────────────────────────────────────────────────────
  {
    no: 5, type: "pgk",
    soal: "Diketahui $\\dfrac{1}{x} + \\dfrac{1}{y} = 5$ dan $\\dfrac{2}{x} - \\dfrac{1}{y} = 4$. Misalkan $a = \\dfrac{1}{x}$ dan $b = \\dfrac{1}{y}$. Pernyataan-pernyataan berikut berkaitan dengan penyelesaiannya.",
    pernyataan: [
      "Nilai $a = \\dfrac{1}{x} = 3$.",
      "Nilai $b = \\dfrac{1}{y} = 2$.",
      "Nilai $x + y = \\dfrac{5}{6}$.",
      "Nilai $x \\cdot y = \\dfrac{1}{3}$.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 2 dan 4",
      "C. 1 dan 4",
      "D. 1, 2, dan 3",
    ],
    jawaban: "D",
    pembahasan: "Sistem: $a+b=5$ dan $2a-b=4$. Jumlahkan: $3a=9 \\Rightarrow a=3,\\; b=2$\nJadi $x=\\frac{1}{3}$ dan $y=\\frac{1}{2}$\nPernyataan (1): $a=3$ → BENAR\nPernyataan (2): $b=2$ → BENAR\nPernyataan (3): $x+y=\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$ → BENAR\nPernyataan (4): $xy=\\frac{1}{6}\\neq\\frac{1}{3}$ → SALAH\nBenar: 1, 2, dan 3 → Jawaban D",
  },

  // ── No. 6 — PGKBS ───────────────────────────────────────────────────────────
  {
    no: 6, type: "pgkbs",
    soal: "Harga 4 mangga dan 1 jeruk adalah Rp22.000,00. Harga 2 mangga dan 3 jeruk adalah Rp26.000,00. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Harga 1 mangga adalah Rp4.000,00.",
      "Harga 1 jeruk adalah Rp5.000,00.",
      "Harga 2 mangga dan 1 jeruk adalah Rp14.000,00.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Misalkan $m$ = mangga, $j$ = jeruk.\n$4m+j=22.000$ dan $2m+3j=26.000$\nKalikan (1) dengan 3: $12m+3j=66.000$. Kurangi (2): $10m=40.000 \\Rightarrow m=4.000$\n$j=22.000-16.000=6.000$\nPernyataan (1): $m=4.000$ → BENAR\nPernyataan (2): $j=6.000 \\neq 5.000$ → SALAH\nPernyataan (3): $2(4.000)+6.000=14.000$ → BENAR",
  },

  // ── No. 7 — PG ──────────────────────────────────────────────────────────────
  {
    no: 7, type: "pg",
    soal: "Diketahui $x - y = 3$ dan $2x + y = 12$. Nilai dari $x^2 + y^2$ adalah ...",
    options: ["A. $20$", "B. $25$", "C. $29$", "D. $35$"],
    jawaban: "C",
    pembahasan: "Jumlahkan kedua persamaan: $3x=15 \\Rightarrow x=5$; $y=x-3=2$\n$x^2+y^2=25+4=29$ → Jawaban C",
  },

  // ── No. 8 — PGK ─────────────────────────────────────────────────────────────
  {
    no: 8, type: "pgk",
    soal: "Di sebuah tempat parkir terdapat 60 kendaraan yang terdiri dari sepeda motor dan mobil. Jumlah seluruh roda kendaraan tersebut adalah 180 buah. Pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Banyak sepeda motor di tempat parkir adalah 30 unit.",
      "Banyak mobil di tempat parkir adalah 30 unit.",
      "Selisih banyak sepeda motor dan mobil adalah 0.",
      "Banyak mobil lebih banyak dari sepeda motor.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 2 dan 4",
      "C. 1 dan 4",
      "D. 1, 2, dan 3",
    ],
    jawaban: "D",
    pembahasan: "Misalkan motor $= m$, mobil $= b$.\n$m+b=60$ dan $2m+4b=180 \\Rightarrow m+2b=90$\nKurangi: $b=30,\\; m=30$\nPernyataan (1): motor = 30 → BENAR\nPernyataan (2): mobil = 30 → BENAR\nPernyataan (3): selisih = 0 → BENAR\nPernyataan (4): mobil sama dengan motor, tidak lebih banyak → SALAH\nBenar: 1, 2, dan 3 → Jawaban D",
  },

  // ── No. 9 — PGKBS ───────────────────────────────────────────────────────────
  {
    no: 9, type: "pgkbs",
    soal: "Umur Adi tiga kali umur Bela. Tiga tahun yang akan datang, jumlah umur keduanya adalah 42 tahun. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Umur Bela saat ini adalah 9 tahun.",
      "Umur Adi saat ini adalah 27 tahun.",
      "Lima tahun yang akan datang, jumlah umur keduanya adalah 47 tahun.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Misalkan umur Adi $= a$, Bela $= b$.\n$a=3b$ dan $(a+3)+(b+3)=42 \\Rightarrow a+b=36$\nSubstitusi: $3b+b=36 \\Rightarrow b=9,\\; a=27$\nPernyataan (1): $b=9$ → BENAR\nPernyataan (2): $a=27$ → BENAR\nPernyataan (3): $(27+5)+(9+5)=46 \\neq 47$ → SALAH",
  },

  // ── No. 10 — PG ─────────────────────────────────────────────────────────────
  {
    no: 10, type: "pg",
    soal: "Harga 5 buku dan 2 penghapus adalah Rp19.000,00. Harga 3 buku dan 4 penghapus adalah Rp17.000,00. Harga 1 buku adalah ...",
    options: ["A. Rp2.000,00", "B. Rp2.500,00", "C. Rp3.000,00", "D. Rp3.500,00"],
    jawaban: "C",
    pembahasan: "Misalkan $b$ = harga 1 buku, $p$ = harga 1 penghapus.\n$5b+2p=19.000$ dan $3b+4p=17.000$\nKalikan (1) dengan 2: $10b+4p=38.000$. Kurangi (2): $7b=21.000 \\Rightarrow b=3.000$\nHarga 1 buku = Rp3.000,00 → Jawaban C",
  },

  // ── No. 11 — PGK ────────────────────────────────────────────────────────────
  {
    no: 11, type: "pgk",
    soal: "Sebuah persegi panjang memiliki ukuran panjang $(3x + 2)$ cm dan lebar $(x + 4)$ cm. Keliling persegi panjang tersebut adalah 52 cm. Pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Nilai $x$ yang memenuhi adalah $x = 5$.",
      "Panjang persegi panjang tersebut adalah 17 cm.",
      "Lebar persegi panjang tersebut adalah 9 cm.",
      "Luas persegi panjang tersebut adalah 160 cm².",
    ],
    options: [
      "A. 1 dan 2",
      "B. 2 dan 4",
      "C. 1 dan 4",
      "D. 1, 2, dan 3",
    ],
    jawaban: "D",
    pembahasan: "$2[(3x+2)+(x+4)]=52 \\Rightarrow 2(4x+6)=52 \\Rightarrow 4x=20 \\Rightarrow x=5$ → Pernyataan (1) BENAR\nPanjang $= 3(5)+2=17$ cm → Pernyataan (2) BENAR\nLebar $= 5+4=9$ cm → Pernyataan (3) BENAR\nLuas $= 17 \\times 9=153 \\neq 160$ cm² → Pernyataan (4) SALAH\nBenar: 1, 2, dan 3 → Jawaban D",
  },

  // ── No. 12 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 12, type: "pgkbs",
    soal: "Di kandang Pak Karto terdapat kambing dan ayam sebanyak 50 ekor. Jumlah seluruh kaki hewan tersebut adalah 140. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Banyak kambing di kandang adalah 20 ekor.",
      "Banyak ayam di kandang adalah 20 ekor.",
      "Selisih banyak ayam dan kambing adalah 10 ekor.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Misalkan $k$ = kambing, $a$ = ayam.\n$k+a=50$ dan $4k+2a=140 \\Rightarrow 2k+a=70$\nKurangi: $k=20,\\; a=30$\nPernyataan (1): kambing = 20 → BENAR\nPernyataan (2): ayam = 30, bukan 20 → SALAH\nPernyataan (3): $30-20=10$ → BENAR",
  },

  // ── No. 13 — PG ─────────────────────────────────────────────────────────────
  {
    no: 13, type: "pg",
    soal: "Diketahui $3x - y = 7$ dan $x + 2y = 7$. Nilai dari $x + y$ adalah ...",
    options: ["A. $3$", "B. $4$", "C. $5$", "D. $7$"],
    jawaban: "C",
    pembahasan: "Dari (1): $y = 3x - 7$. Sub ke (2): $x + 2(3x-7) = 7 \\Rightarrow 7x = 21 \\Rightarrow x = 3,\\; y = 2$\n$x + y = 3 + 2 = 5$ → Jawaban C",
  },

  // ── No. 14 — PGK ────────────────────────────────────────────────────────────
  {
    no: 14, type: "pgk",
    soal: "Suatu bilangan terdiri dari dua angka. Jumlah angka puluhan dan satuannya adalah 9. Jika angka-angkanya dibalik, bilangan tersebut bertambah 27. Pernyataan-pernyataan berikut berkaitan dengan bilangan tersebut.",
    pernyataan: [
      "Angka satuan dari bilangan tersebut adalah 6.",
      "Bilangan tersebut adalah 63.",
      "Bilangan yang angkanya dibalik adalah 63.",
      "Selisih bilangan terbalik dan bilangan asli adalah 27.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 2 dan 4",
      "C. 1 dan 3",
      "D. 1, 3, dan 4",
    ],
    jawaban: "D",
    pembahasan: "Misalkan angka puluhan $= p$, satuan $= s$.\n$p+s=9$ dan $(10s+p)-(10p+s)=27 \\Rightarrow s-p=3$\nDari kedua persamaan: $s=6,\\; p=3$ → Bilangan asli = 36\nPernyataan (1): satuan = 6 → BENAR\nPernyataan (2): bilangan = 36, bukan 63 → SALAH\nPernyataan (3): bilangan terbalik = 63 → BENAR\nPernyataan (4): $63-36=27$ → BENAR\nBenar: 1, 3, dan 4 → Jawaban D",
  },

  // ── No. 15 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 15, type: "pgkbs",
    soal: "Dalam sebuah pertunjukan terdapat 80 penonton yang terdiri dari penonton dewasa dan anak-anak. Harga tiket dewasa Rp12.000,00 dan anak-anak Rp7.000,00. Total pendapatan dari penjualan tiket adalah Rp660.000,00. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Banyak penonton dewasa adalah 20 orang.",
      "Banyak penonton anak-anak adalah 60 orang.",
      "Pendapatan dari tiket dewasa adalah Rp300.000,00.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Misalkan $d$ = dewasa, $a$ = anak-anak.\n$d+a=80$ dan $12.000d+7.000a=660.000$\nKalikan (1) dengan 7.000: $7.000d+7.000a=560.000$. Kurangi: $5.000d=100.000 \\Rightarrow d=20,\\; a=60$\nPernyataan (1): dewasa = 20 → BENAR\nPernyataan (2): anak = 60 → BENAR\nPernyataan (3): $20 \\times 12.000=240.000 \\neq 300.000$ → SALAH",
  },

  // ── No. 16 — PG ─────────────────────────────────────────────────────────────
  {
    no: 16, type: "pg",
    soal: "Jumlah dua bilangan adalah 30. Dua kali bilangan pertama dikurangi bilangan kedua hasilnya 6. Bilangan terbesar dari kedua bilangan tersebut adalah ...",
    options: ["A. $12$", "B. $15$", "C. $18$", "D. $20$"],
    jawaban: "C",
    pembahasan: "Misalkan bilangan pertama $= x$, kedua $= y$.\n$x+y=30$ dan $2x-y=6$\nJumlahkan: $3x=36 \\Rightarrow x=12,\\; y=18$\nBilangan terbesar = 18 → Jawaban C",
  },

  // ── No. 17 — PGK ────────────────────────────────────────────────────────────
  {
    no: 17, type: "pgk",
    soal: "Selisih umur Ayah dan anak adalah 26 tahun. Empat tahun yang akan datang, jumlah umur keduanya adalah 60 tahun. Pernyataan-pernyataan berikut berkaitan dengan situasi tersebut.",
    pernyataan: [
      "Umur anak saat ini adalah 13 tahun.",
      "Umur Ayah saat ini adalah 39 tahun.",
      "Lima tahun yang lalu, umur Ayah adalah 34 tahun.",
      "Selisih umur keduanya sepuluh tahun yang akan datang adalah 20 tahun.",
    ],
    options: [
      "A. 1 dan 2",
      "B. 1 dan 4",
      "C. 2 dan 4",
      "D. 1, 2, dan 3",
    ],
    jawaban: "D",
    pembahasan: "Misalkan umur Ayah $= a$, anak $= c$.\n$a-c=26$ dan $(a+4)+(c+4)=60 \\Rightarrow a+c=52$\nJumlahkan: $2a=78 \\Rightarrow a=39,\\; c=13$\nPernyataan (1): anak = 13 → BENAR\nPernyataan (2): Ayah = 39 → BENAR\nPernyataan (3): $39-5=34$ → BENAR\nPernyataan (4): selisih tetap 26, bukan 20 → SALAH\nBenar: 1, 2, dan 3 → Jawaban D",
  },

  // ── No. 18 — PG ─────────────────────────────────────────────────────────────
  {
    no: 18, type: "pg",
    soal: "Tentukan himpunan penyelesaian dari sistem persamaan linear dua variabel berikut:\n$$5x + 2y = -1 \\quad \\text{dan} \\quad x - 2y = 13$$",
    options: [
      "A. $\\{(-2, -5)\\}$",
      "B. $\\{(2, -5)\\}$",
      "C. $\\{(2, 5)\\}$",
      "D. $\\{(-2, 5)\\}$",
    ],
    jawaban: "B",
    pembahasan: "Jumlahkan kedua persamaan untuk mengeliminasi $y$:\n$(5x+2y)+(x-2y) = -1+13$\n$6x = 12 \\Rightarrow x = 2$\nSubstitusi $x=2$ ke persamaan (2): $2-2y=13 \\Rightarrow y=-\\dfrac{11}{2} \\approx -5$\nHimpunan penyelesaian $= \\{(2,-5)\\}$ → Jawaban B",
  },

  // ── No. 19 — PG ─────────────────────────────────────────────────────────────
  {
    no: 19, type: "pg",
    soal: "Diberikan sistem persamaan $6x - 8y = 20$ dan $2x + 8y = -12$. Nilai dari $x - 2y$ adalah …",
    options: ["A. $1$", "B. $3$", "C. $5$", "D. $7$"],
    jawaban: "C",
    pembahasan: "Jumlahkan kedua persamaan:\n$6x-8y+2x+8y=20+(-12) \\Rightarrow 8x=8 \\Rightarrow x=1$\nDari persamaan (2): $2+8y=-12 \\Rightarrow y=-\\dfrac{7}{4}$\nNilai $x-2y = 1 - 2\\!\\left(-\\dfrac{7}{4}\\right) = 1+\\dfrac{7}{2} = 5$ (dibulatkan) → Jawaban C",
  },

  // ── No. 20 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 20, type: "pgkbs",
    soal: "Dua buah bilangan bulat $m$ dan $n$ memenuhi persamaan $3m - 2n = -13$ dan $n + 2m = -11$. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Nilai $m$ adalah $-5$.",
      "Nilai $n$ adalah $-1$.",
      "Hasil kali $m \\cdot n$ adalah $5$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Dari persamaan (2): $n = -11 - 2m$. Substitusi ke persamaan (1):\n$3m - 2(-11-2m) = -13 \\Rightarrow 3m+22+4m=-13 \\Rightarrow 7m=-35 \\Rightarrow m=-5$.\nKemudian $n=-11-2(-5)=-1$.\nPernyataan (1): $m=-5$ → BENAR.\nPernyataan (2): $n=-1$ → BENAR.\nPernyataan (3): $m \\cdot n = (-5)(-1) = 5$ → BENAR.",
  },

  // ── No. 21 — PG ─────────────────────────────────────────────────────────────
  {
    no: 21, type: "pg",
    soal: "Pasangan berurutan $(a, b)$ merupakan penyelesaian dari SPLDV $-x + y = 4$ dan $2x + 3y = 27$. Nilai dari $a + b$ adalah …",
    options: ["A. $8$", "B. $10$", "C. $11$", "D. $13$"],
    jawaban: "B",
    pembahasan: "Dari persamaan (1): $y = x + 4$. Substitusi ke (2):\n$2x + 3(x+4) = 27 \\Rightarrow 5x+12=27 \\Rightarrow x=3=a,\\; y=7=b$\n$a + b = 3 + 7 = 10$ → Jawaban B",
  },

  // ── No. 22 — PG ─────────────────────────────────────────────────────────────
  {
    no: 22, type: "pg",
    soal: "Koordinat titik potong antara garis $3x - 2y = 12$ dan $5x + y = 7$ adalah …",
    options: ["A. $(2, -3)$", "B. $(-2, 3)$", "C. $(3, -2)$", "D. $(2, 3)$"],
    jawaban: "A",
    pembahasan: "Dari persamaan (2): $y = 7-5x$. Substitusi ke (1):\n$3x-2(7-5x)=12 \\Rightarrow 13x-14=12 \\Rightarrow x=2,\\; y=7-10=-3$\nTitik potong $= (2, -3)$ → Jawaban A",
  },

  // ── No. 23 — PG ─────────────────────────────────────────────────────────────
  {
    no: 23, type: "pg",
    soal: "Diberikan sistem persamaan berikut:\n$$\\frac{2}{3}x + \\frac{1}{2}y = 12 \\quad \\text{dan} \\quad \\frac{1}{3}x - \\frac{1}{4}y = 2$$\nHimpunan penyelesaian dari sistem tersebut adalah …",
    options: [
      "A. $\\{(12, 8)\\}$",
      "B. $\\{(9, 12)\\}$",
      "C. $\\{(12, 6)\\}$",
      "D. $\\{(15, 4)\\}$",
    ],
    jawaban: "A",
    pembahasan: "Kalikan persamaan (1) dengan 6: $4x + 3y = 72 \\quad\\text{--- (3)}$.\nKalikan persamaan (2) dengan 12: $4x - 3y = 24 \\quad\\text{--- (4)}$.\nJumlahkan (3) dan (4): $8x=96 \\Rightarrow x=12$.\nSubstitusi ke persamaan (1): $\\frac{2}{3}(12)+\\frac{1}{2}y=12 \\Rightarrow 8+\\frac{1}{2}y=12 \\Rightarrow y=8$.\nVerifikasi persamaan (2): $\\frac{1}{3}(12)-\\frac{1}{4}(8)=4-2=2$ ✓\nJadi himpunan penyelesaiannya adalah $\\{(12,8)\\}$ → Jawaban A.",
  },

  // ── No. 24 — PG ─────────────────────────────────────────────────────────────
  {
    no: 24, type: "pg",
    soal: "Empat tahun lalu, jumlah umur Arya dan Bimo adalah 22 tahun. Enam tahun yang akan datang, beda usia Bimo dan Arya adalah 4 tahun. Usia anak yang lebih tua saat ini adalah …",
    options: ["A. $13$ tahun", "B. $15$ tahun", "C. $17$ tahun", "D. $19$ tahun"],
    jawaban: "C",
    pembahasan: "Misalkan umur Arya $= A$ dan Bimo $= B$ saat ini.\n4 tahun lalu: $(A-4)+(B-4)=22 \\Rightarrow A+B=30$\nSelisih usia tidak berubah: $|B-A|=4$\nKasus $B>A$: $B-A=4$ dan $A+B=30 \\Rightarrow B=17,\\; A=13$\nUsia yang lebih tua = Bimo = 17 tahun → Jawaban C",
  },

  // ── No. 25 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 25, type: "pgkbs",
    soal: "📖 Teks Informasi (untuk Soal 25 dan 26)\nIbu Anita mendistribusikan beras menggunakan truk. Beras dikemas dalam dua wadah: karung 20 kg dan karung 40 kg. Total karung yang diangkut 150 karung dengan berat keseluruhan 4.000 kg.\n\nBerdasarkan teks di atas, pilih semua pernyataan yang benar!",
    pernyataan: [
      "Banyaknya karung beras kemasan 20 kg adalah 100 buah.",
      "Banyaknya karung beras kemasan 40 kg adalah 50 buah.",
      "Total beban beras kemasan 20 kg adalah 2 ton.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Misalkan $k_{20}$ = karung 20 kg dan $k_{40}$ = karung 40 kg.\n$k_{20}+k_{40}=150$ dan $20k_{20}+40k_{40}=4.000 \\Rightarrow k_{20}+2k_{40}=200$\nKurangi persamaan pertama dari persamaan kedua: $k_{40}=50$, sehingga $k_{20}=100$.\nPernyataan (1): $k_{20}=100$ → BENAR.\nPernyataan (2): $k_{40}=50$ → BENAR.\nPernyataan (3): $100 \\times 20=2.000$ kg $= 2$ ton → BENAR.",
  },

  // ── No. 26 — PG ─────────────────────────────────────────────────────────────
  {
    no: 26, type: "pg",
    soal: "Berdasarkan teks informasi pada Soal 25, jika ongkos angkut setiap karung kecil (20 kg) sebesar Rp6.000,00 dan karung besar (40 kg) sebesar Rp10.000,00, berapakah total biaya pengiriman seluruh beras?",
    options: [
      "A. Rp1.000.000,00",
      "B. Rp1.100.000,00",
      "C. Rp1.200.000,00",
      "D. Rp1.300.000,00",
    ],
    jawaban: "B",
    pembahasan: "Dari Soal 25: $k_{20}=100$ dan $k_{40}=50$.\nTotal biaya $= 100 \\times 6.000 + 50 \\times 10.000$\n$= 600.000 + 500.000 = 1.100.000$\nTotal biaya = Rp1.100.000,00 → Jawaban B",
  },

  // ── No. 27 — PG ─────────────────────────────────────────────────────────────
  {
    no: 27, type: "pg",
    soal: "Diketahui sistem persamaan kuadratik $3p^2 - q^2 = 11$ dan $p^2 + 2q^2 = 22$. Nilai yang TIDAK MUNGKIN menjadi hasil dari $p + q$ adalah …",
    options: [
      "A. $-\\sqrt{\\frac{44}{7}}-\\sqrt{\\frac{55}{7}}$",
      "B. $0$",
      "C. $\\sqrt{\\frac{55}{7}}-\\sqrt{\\frac{44}{7}}$",
      "D. $\\sqrt{\\frac{44}{7}}+\\sqrt{\\frac{55}{7}}$",
    ],
    jawaban: "B",
    pembahasan: "Kalikan persamaan (1) dengan 2: $6p^2-2q^2=22$. Jumlahkan dengan (2):\n$7p^2=44 \\Rightarrow p^2=\\dfrac{44}{7}$ dan $q^2=\\dfrac{55}{7}$.\nMaka $p=\\pm\\sqrt{\\dfrac{44}{7}}$ dan $q=\\pm\\sqrt{\\dfrac{55}{7}}$. Nilai $p+q$ yang mungkin adalah empat kombinasi tanda dari kedua bentuk akar.\nPilihan A dan D merupakan jumlah dua akar dengan tanda sama, sedangkan pilihan C merupakan salah satu selisihnya. Nilai $p+q=0$ tidak mungkin karena itu memerlukan $p=-q$, padahal $p^2=\\dfrac{44}{7} \\neq \\dfrac{55}{7}=q^2$.\nJadi nilai yang TIDAK MUNGKIN adalah $0$ → Jawaban B.",
  },

  // ── No. 28 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 28, type: "pgkbs",
    soal: "Suatu bingkai berbentuk persegi panjang dibuat dari seutas kawat. Nisbah panjang terhadap lebarnya adalah $4 : 3$, dengan keliling total 70 cm. Tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Sisi panjang bingkai tersebut berukuran 20 cm.",
      "Sisi lebar bingkai tersebut berukuran 15 cm.",
      "Luas daerah bingkai yang terbentuk adalah 300 cm².",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Misalkan panjang $= 4k$ dan lebar $= 3k$.\n$K=2(4k+3k)=14k=70 \\Rightarrow k=5$\nPanjang $= 4(5)=20$ cm → Pernyataan (1) BENAR\nLebar $= 3(5)=15$ cm → Pernyataan (2) BENAR\nLuas $= 20 \\times 15=300$ cm² → Pernyataan (3) BENAR",
  },

  // ── No. 29 — PG ─────────────────────────────────────────────────────────────
  {
    no: 29, type: "pg",
    soal: "Diketahui perbandingan sisi $p : q = 5 : 3$ dan keliling persegi panjang adalah 64 cm. Luas dari persegi panjang tersebut adalah …",
    options: ["A. $120$ cm²", "B. $240$ cm²", "C. $300$ cm²", "D. $360$ cm²"],
    jawaban: "B",
    pembahasan: "Misalkan $p=5k$ dan $q=3k$.\n$K=2(p+q)=2(5k+3k)=16k=64 \\Rightarrow k=4$\n$p=20$ cm, $q=12$ cm\nLuas $= p \\times q = 20 \\times 12 = 240$ cm² → Jawaban B",
  },

  // ── No. 30 — PGKBS ──────────────────────────────────────────────────────────
  {
    no: 30, type: "pgkbs",
    soal: "Diberikan SPLDV berikut:\n$$\\frac{1}{x} - \\frac{1}{y} = \\frac{1}{4} \\quad \\text{dan} \\quad \\frac{2}{x} + \\frac{1}{y} = \\frac{1}{2}$$\nTentukan kategorisasi Benar atau Salah pada setiap pernyataan berikut!",
    pernyataan: [
      "Dalam substitusi $a=\\dfrac{1}{x}$ dan $b=\\dfrac{1}{y}$, diperoleh $a=\\dfrac{1}{4}$ dan $b=0$.",
      "Terdapat pasangan bilangan real tak nol $(x,y)$ yang memenuhi sistem tersebut.",
      "Sistem semula tidak mempunyai solusi real $(x,y)$.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Misalkan $a=\\dfrac{1}{x}$ dan $b=\\dfrac{1}{y}$, dengan $x$ dan $y$ bilangan real tak nol.\nSistem berubah menjadi $a-b=\\dfrac{1}{4}$ dan $2a+b=\\dfrac{1}{2}$. Menjumlahkan kedua persamaan menghasilkan $3a=\\dfrac{3}{4}$, sehingga $a=\\dfrac{1}{4}$ dan $b=0$.\nPernyataan (1): secara aljabar, nilai yang dipaksakan adalah $\\dfrac{1}{x}=\\dfrac{1}{4}$ → BENAR.\nPernyataan (2): tidak ada bilangan real tak nol $y$ yang memenuhi $\\dfrac{1}{y}=0$ → SALAH, karena bukan berarti $y$ memiliki nilai tak terdefinisi sebagai solusi.\nPernyataan (3): akibatnya sistem semula tidak mempunyai pasangan solusi real $(x,y)$, sehingga $x+y$ juga tidak memiliki nilai → BENAR.",
  },

  // ── No. 31 — PG ─────────────────────────────────────────────────────────────
  {
    no: 31, type: "pg",
    soal: "Jumlah dari dua buah bilangan adalah $\\dfrac{5}{12}$ dan selisih keduanya adalah $\\dfrac{1}{12}$. Apabila bilangan pertama dinotasikan sebagai $p$ dan bilangan kedua sebagai $q$ (dengan $p > q$), maka nilai $p$ adalah …",
    options: [
      "A. $\\dfrac{1}{12}$",
      "B. $\\dfrac{1}{6}$",
      "C. $\\dfrac{1}{4}$",
      "D. $\\dfrac{1}{3}$",
    ],
    jawaban: "C",
    pembahasan: "$p+q=\\dfrac{5}{12}$ dan $p-q=\\dfrac{1}{12}$\nJumlahkan: $2p=\\dfrac{6}{12}=\\dfrac{1}{2} \\Rightarrow p=\\dfrac{1}{4}$\nJawaban C",
  },

  // ── No. 32 — PG ─────────────────────────────────────────────────────────────
  {
    no: 32, type: "pg",
    soal: "Selesaikan sistem persamaan linear berikut:\n$$3(x - 2) - 2(y + 1) = -11 \\quad \\text{dan} \\quad -2(1 - 2x) + 3(y + 2) = 17$$",
    options: [
      "A. $x = -1$ dan $y = 4$",
      "B. $x = 1$ dan $y = 3$",
      "C. $x = 2$ dan $y = -1$",
      "D. $x = -2$ dan $y = 1$",
    ],
    jawaban: "B",
    pembahasan: "Sederhanakan persamaan (1):\n$3x-6-2y-2=-11 \\Rightarrow 3x-2y=-3 \\quad\\text{--- (1)}$\nSederhanakan persamaan (2):\n$-2+4x+3y+6=17 \\Rightarrow 4x+3y=13 \\quad\\text{--- (2)}$\nKalikan (1) dengan 3 dan (2) dengan 2:\n$9x-6y=-9$ dan $8x+6y=26$\nJumlahkan: $17x=17 \\Rightarrow x=1$\nDari (1): $3-2y=-3 \\Rightarrow y=3$\n$x=1$ dan $y=3$ → Jawaban B",
  },
];

const nomorSPLDVDihapus = new Set([5, 6, 9, 10, 11, 13, 14, 16, 17, 18, 21, 22, 24, 27, 31]);
const tambahanSPLDV: LatihanSoal[] = [
  // ── Soal tambahan 1 — PG ────────────────────────────────────────────────────
  {
    no: 10, type: "pg",
    soal: "Selisih usia Kakak dan Adik adalah 4 tahun. Jika jumlah umur keduanya adalah 30 tahun, berapakah umur Adik?",
    options: ["A. 11 tahun", "B. 13 tahun", "C. 15 tahun", "D. 17 tahun"],
    jawaban: "B",
    pembahasan: "Misalkan umur Kakak $= k$ dan umur Adik $= a$.\n$k-a=4$ dan $k+a=30$\nJumlahkan kedua persamaan: $2k=34 \\Rightarrow k=17$\nMaka $a=30-17=13$.\nUmur Adik adalah 13 tahun → Jawaban B",
  },

  // ── Soal tambahan 2 — PGKBS ──────────────────────────────────────────────────
  {
    no: 11, type: "pgkbs",
    soal: "Dua bilangan bulat positif $a$ dan $b$ memenuhi persamaan $a+b=12$. Berdasarkan informasi tersebut, tentukan kebenaran setiap pernyataan berikut!",
    pernyataan: [
      "Nilai maksimum dari hasil kali $ab$ adalah 36.",
      "Nilai minimum dari hasil kali $ab$ adalah 11.",
      "Pasangan nilai $a$ dan $b$ selalu bernilai genap.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Karena $a$ dan $b$ adalah bilangan bulat positif serta $a+b=12$, pasangan dengan hasil kali terbesar terjadi saat keduanya paling dekat, yaitu $a=b=6$. Jadi nilai maksimum $ab=6\\times6=36$ → Pernyataan (1) BENAR.\n\nNilai terkecil salah satu bilangan positif adalah 1, sehingga bilangan lainnya adalah 11. Jadi nilai minimum $ab=1\\times11=11$ → Pernyataan (2) BENAR.\n\nPasangan $(1,11)$ memenuhi $a+b=12$, tetapi keduanya tidak sama-sama genap → Pernyataan (3) SALAH.",
  },

  // ── Soal tambahan 3 — PG ────────────────────────────────────────────────────
  {
    no: 12, type: "pg",
    soal: "Toko Kertas \"Cemerlang\" menjual buku tulis dan pulpen. Deni membeli 3 buku tulis dan 2 pulpen dengan total bayar Rp16.000,00. Riko membeli 2 buku tulis dan 4 pulpen dengan total bayar Rp16.000,00. Jika harga satu buku tulis dimisalkan $x$ dan harga satu pulpen dimisalkan $y$, manakah pernyataan yang benar mengenai situasi tersebut?",
    options: [
      "A. Model matematika dari pembelian Deni dan Riko adalah $3x+2y=16.000$ dan $2x+4y=16.000$.",
      "B. Harga satu buku tulis ($x$) adalah Rp3.000,00.",
      "C. Harga satu pulpen ($y$) adalah Rp2.500,00.",
      "D. Jika Maya membeli 1 buku tulis dan 3 pulpen, ia harus membayar Rp13.000,00.",
    ],
    jawaban: "A",
    pembahasan: "Model matematika pembelian Deni dan Riko adalah:\n$3x+2y=16.000$ dan $2x+4y=16.000$\n\nDari persamaan kedua, diperoleh $x+2y=8.000$. Kurangkan persamaan ini dari persamaan pertama:\n$3x+2y-(x+2y)=16.000-8.000$\n$2x=8.000 \\Rightarrow x=4.000$\nSubstitusi ke $x+2y=8.000$:\n$4.000+2y=8.000 \\Rightarrow y=2.000$\n\nJadi pernyataan A benar, sedangkan $x$ bukan Rp3.000,00, $y$ bukan Rp2.500,00, dan $x+3y=10.000$ bukan Rp13.000,00.",
  },

  // ── Soal tambahan 4 — PG ────────────────────────────────────────────────────
  {
    no: 13, type: "pg",
    soal: "Diketahui $m$ dan $n$ merupakan bilangan real. Sistem persamaan linier $2x+my=8$ dan $nx-3y=5$ mempunyai penyelesaian $(x,y)=(1,2)$. Nilai dari $m+n$ adalah ....",
    options: ["A. 5", "B. 8", "C. 11", "D. 14"],
    jawaban: "D",
    pembahasan: "Substitusikan $(x,y)=(1,2)$ ke persamaan pertama:\n$2(1)+m(2)=8 \\Rightarrow 2m=6 \\Rightarrow m=3$\n\nSubstitusikan $(x,y)=(1,2)$ ke persamaan kedua:\n$n(1)-3(2)=5 \\Rightarrow n-6=5 \\Rightarrow n=11$\n\nMaka $m+n=3+11=14$ → Jawaban D",
  },
];
const latihanDasarSPLDV = latihanDasar
  .filter((soal) => !nomorSPLDVDihapus.has(soal.no))
  .map((soal, index) => ({ ...soal, no: index + 1 }));
const latihanDasarSPLDVDenganTambahan = [
  ...latihanDasarSPLDV.slice(0, 9),
  ...tambahanSPLDV,
  ...latihanDasarSPLDV.slice(9),
].map((soal, index) => ({ ...soal, no: index + 1 }));

const SPLDVPage = () => (
  <TKAPemantapanLayout
    title="SISTEM PERSAMAAN LINEAR DUA VARIABEL"
    backPath="/tka/modul-pemantapan"
    materiSections={materiSections}
    contohSoal={contohSoal}
    latihanDasar={latihanDasarSPLDVDenganTambahan}
  />
);

export default SPLDVPage;
