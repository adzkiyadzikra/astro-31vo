import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

const materiSections: MateriSection[] = [
  { heading: "A. Bentuk Umum", content: `$ax^n + b$\n\n$x$ disebut variabel, biasanya berupa huruf alfabet\n$a$ disebut koefisien (bilangan pengali variabel)\n$b$ disebut konstanta, bilangan tunggal (tanpa variabel)\n$n$ disebut pangkat/derajat` },
  { heading: "B. Operasi", content: `1. Macam-macam suku\n   - Monomial (satu suku)\n   - Binomial (dua suku)\n   - Polinomial (banyak suku)\n\n2. Jumlah atau kurang\n   Menjumlahkan dan mengurangkan suku-suku sejenis.\n\n3. Perkalian\n   $a(b+c) = ab + ac$\n   $(a+b)(c+d) = ac + ad + bc + bd$\n   $(a+b)(a+b) = a^2 + 2ab + b^2$\n\n4. Pembagian\n   $\\frac{a^m}{a^n} = a^{m-n}$, dengan $a^n \\neq 0$` },
  { heading: "D. Faktorisasi", content: `1. Faktor Persekutuan\n   $ab \\pm ac = a(b \\pm c)$\n\n2. Selisih dua kuadrat\n   $a^2 - b^2 = (a+b)(a-b)$\n\n3. Bentuk $ax^2 + bx + c$\n   - Jika $a = 1$: $x^2 + bx + c = (x + p)(x + q)$ dengan $p + q = b$ dan $p \\times q = c$\n   - Jika $a \\neq 1$: $ax^2 + bx + c = (ax + p)(ax + q) / a$ dengan $p + q = b$ dan $p \\times q = a \\times c$` },
];

// ─── Contoh Soal — TES KEMAMPUAN AKADEMIK · MODUL PEMANTAPAN 2026–2027 ───
// Sumber: soal dan pembahasan yang diunggah pengguna.
const contohSoal: LatihanSoal[] = [
  {
    no: 1, type: "pg",
    soal: "Bentuk paling sederhana dari aljabar $8x + 5y - 3z - 2x - 8y + 7z$ adalah …",
    options: ["A. $6x - 3y + 4z$", "B. $6x + 3y + 4z$", "C. $10x - 3y + 4z$", "D. $6x - 3y - 4z$"],
    jawaban: "A",
    pembahasan: "Trik dan Tips:\nGunakan prinsip \"Suku Sejenis\": kerjakan variabel yang sama secara terpisah.\n\nStep by Step Penyelesaian:\nKelompokkan suku-suku sejenis:\n$$(8x - 2x) + (5y - 8y) + (-3z + 7z)$$\n\nVariabel $x$: $8 - 2 = 6 \\longrightarrow 6x$\nVariabel $y$: $5 - 8 = -3 \\longrightarrow -3y$\nVariabel $z$: $-3 + 7 = 4 \\longrightarrow 4z$\n\nHasil akhir: $$6x - 3y + 4z$$\n\nJawaban: A",
  },
  {
    no: 2, type: "pgk",
    soal: "Cermati beberapa bentuk pemfaktoran aljabar berikut!\nManakah dari pemfaktoran di atas yang bernilai benar?",
    pernyataan: [
      "(i) $9x^2 - 16 = (3x - 4)(3x + 4)$",
      "(ii) $3x^2 + 5x - 2 = (3x - 1)(x - 2)$",
      "(iii) $x^2 + 2x - 15 = (x + 5)(x - 3)$",
      "(iv) $x^2 + 5x - 6 = (x - 6)(x + 1)$",
    ],
    jawaban: "Pernyataan (i) dan (iii) BENAR", jawabanPGK: [0, 2],
    pembahasan: "(i) BENAR karena $9x^2-16=(3x)^2-4^2=(3x-4)(3x+4)$.\n\n(ii) SALAH: $(3x-1)(x-2)=3x^2-7x+2$, tidak cocok.\n\n(iii) BENAR karena $+5\\times(-3)=-15$ dan $+5+(-3)=+2$.\n\n(iv) SALAH: $(x-6)(x+1)=x^2-5x-6$, bukan $x^2+5x-6$.\n\nJawaban: Pernyataan (i) dan (iii) BENAR",
  },
  {
    no: 3, type: "pgkbs",
    soal: "TKA Matematika 2026 — Diketahui bentuk aljabar berikut: $2ab-b^2+3a^2b+ab^2-5$. Tentukan Benar atau Salah pada setiap pernyataan berikut!",
    pernyataan: ["Terdapat 2 variabel yaitu a dan b.", "Konstanta pada bentuk aljabar tersebut adalah 5.", "Bilangan 2, −1, 3, dan 1 merupakan koefisien."],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Variabelnya adalah a dan b. Konstanta adalah −5, sehingga pernyataan kedua salah. Koefisien suku-sukunya adalah 2, −1, 3, dan 1.",
  },
  {
    no: 4, type: "pg",
    soal: "Di sekeliling taman kota tersebut akan dipasang pagar kawat pembatas setinggi $2$ m. Jika panjang taman diketahui $15$ m dan harga kawat pembatas adalah Rp15.000/m², hitung total biaya pembelian kawat yang dibutuhkan!",
    options: ["A. Rp1.200.000", "B. Rp1.320.000", "C. Rp1.440.000", "D. Rp1.560.000"], jawaban: "D",
    pembahasan: "Dari $p=2x+3=15$, diperoleh $x=6$. Lebar $l=2(6)-1=11$ m.\n\nKeliling $=2(15+11)=52$ m. Luas kawat $=52\\times2=104$ m².\n\nTotal biaya $=104\\times$ Rp15.000 = Rp1.560.000.\n\nJawaban: D",
  },
  {
    no: 5, type: "pg",
    soal: "Bentuk sederhana dari pecahan aljabar $\\dfrac{3x^2 - 7x - 6}{9x^2 - 4}$ adalah …",
    options: ["A. $\\dfrac{x - 3}{3x - 2}$", "B. $\\dfrac{x - 3}{3x + 2}$", "C. $\\dfrac{x + 3}{3x - 2}$", "D. $\\dfrac{x + 3}{3x + 2}$"], jawaban: "A",
    pembahasan: "Pembilang: $3x^2-7x-6=(3x+2)(x-3)$. Penyebut: $9x^2-4=(3x-2)(3x+2)$.\n\nMaka $$\\frac{(3x+2)(x-3)}{(3x-2)(3x+2)}=\\frac{x-3}{3x-2}$$\n\nJawaban: A",
  },
];

// ─── Latihan Soal — 20 soal: PG, PG Kompleks (4 pernyataan), dan PG Benar-Salah (3 pernyataan) ───
// Pola: PG (1,4,7,...) · PGK (2,5,8,...) · PGKBS (3,6,9,...).
const latihanDasar: LatihanSoal[] = [
  {
    no: 1, type: "pg",
    soal: "Koefisien variabel $x$ dari bentuk aljabar $-x^2 - (m + 1)x + 3m$ adalah ...",
    options: ["A. $-1$", "B. $1$", "C. $m + 1$", "D. $-m - 1$"], jawaban: "D",
    pembahasan: "Suku yang mengandung $x$ adalah $-(m+1)x$. Jadi koefisien $x = -(m+1) = -m-1$ → Jawaban D",
  },
  {
    no: 2, type: "pgk",
    soal: "Pada bentuk aljabar $7x^2 - 5xy - 9y^2 + 8$, perhatikan pernyataan berikut!",
    pernyataan: [
      "Koefisien $x^2$ adalah $7$.",
      "Koefisien $xy$ adalah $5$.",
      "Koefisien $y^2$ dijumlahkan dengan konstanta menghasilkan $-1$.",
      "Konstanta pada bentuk aljabar tersebut adalah $-8$.",
    ],
    options: ["A. (1) dan (3) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua pernyataan benar"],
    jawaban: "A", jawabanPGK: [0, 2],
    pembahasan: "(1) Benar, koefisien $x^2=7$. (2) Salah, koefisien $xy=-5$. (3) Benar, $-9+8=-1$. (4) Salah, konstanta adalah $8$. Jadi yang benar (1) dan (3) → Jawaban A",
  },
  {
    no: 3, type: "pgkbs",
    soal: "Sederhanakan bentuk aljabar $4x + 12y - 10z - 8x + 5y - 7z$. Tentukan Benar atau Salah!",
    pernyataan: [
      "Koefisien $x$ pada hasil sederhana adalah $-4$.",
      "Koefisien $y$ pada hasil sederhana adalah $17$.",
      "Hasil sederhananya adalah $-4x + 17y - 17z$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Gabungkan suku sejenis: $4x-8x=-4x$, $12y+5y=17y$, dan $-10z-7z=-17z$. Jadi hasilnya $-4x+17y-17z$.",
  },
  {
    no: 4, type: "pg",
    soal: "Bentuk sederhana dari $5ab + 4bc - 3ac - 2ac - 8bc - ab$ adalah ...",
    options: ["A. $4ab - 4bc - 5ac$", "B. $4ab + 2bc - 11ac$", "C. $6ab - 2bc + 5ac$", "D. $6ab + 4bc + 5ac$"], jawaban: "A",
    pembahasan: "$5ab-ab=4ab$, $4bc-8bc=-4bc$, dan $-3ac-2ac=-5ac$. Hasilnya $4ab-4bc-5ac$ → Jawaban A",
  },
  {
    no: 5, type: "pgk",
    soal: "Diberikan bentuk $P=-3p(p^3-2p^2)+2(p^2-3p+6)$. Pernyataan yang benar adalah ...",
    pernyataan: [
      "$-3p(p^3-2p^2)=-3p^4+6p^3$.",
      "$2(p^2-3p+6)=2p^2-6p+12$.",
      "Bentuk sederhana $P=-3p^4+6p^3+2p^2-6p+12$.",
      "Derajat tertinggi dari $P$ adalah $3$.",
    ],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua pernyataan benar"],
    jawaban: "B", jawabanPGK: [0, 1, 2],
    pembahasan: "(1), (2), dan (3) benar berdasarkan distributif. (4) salah karena suku tertinggi adalah $-3p^4$, sehingga derajatnya $4$. → Jawaban B",
  },
  {
    no: 6, type: "pgkbs",
    soal: "Hasil pengurangan $3x-4$ dari $2x+5$ adalah $-x+9$. Tentukan Benar atau Salah!",
    pernyataan: [
      "Kalimat tersebut berarti $(2x+5)-(3x-4)$.",
      "Tanda di depan $3x-4$ berubah saat dikurangkan.",
      "Hasilnya adalah $x+1$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "$(2x+5)-(3x-4)=2x+5-3x+4=-x+9$. Jadi pernyataan (1) dan (2) benar, sedangkan (3) salah.",
  },
  {
    no: 7, type: "pg",
    soal: "Hasil dari $(-8m^2n^3) \\cdot (2k^3n^2)$ adalah ...",
    options: ["A. $-16k^3m^2n^{12}$", "B. $-16k^3m^3n^2$", "C. $16k^3m^2n^{12}$", "D. $-16k^3m^2n^5$"], jawaban: "D",
    pembahasan: "Kalikan koefisien dan jumlahkan pangkat $n$: $(-8)(2)k^3m^2n^{3+2}=-16k^3m^2n^5$ → Jawaban D",
  },
  {
    no: 8, type: "pgk",
    soal: "Perhatikan hasil perkalian $(2x-2)(x+5)$. Pernyataan yang benar adalah ...",
    pernyataan: [
      "Suku pertama hasil perkalian adalah $2x^2$.",
      "Suku silang menghasilkan $10x-2x=8x$.",
      "Suku konstanta hasil perkalian adalah $-10$.",
      "Hasil akhirnya adalah $2x^2+12x-10$.",
    ],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua pernyataan benar"],
    jawaban: "B", jawabanPGK: [0, 1, 2],
    pembahasan: "(1), (2), dan (3) benar. Hasil perkalian adalah $2x^2+8x-10$, sehingga (4) salah → Jawaban B",
  },
  {
    no: 9, type: "pgkbs",
    soal: "Perhatikan bentuk $\u005cleft(2a-\u005cfrac{1}{a}\u005cright)^2$, dengan $a\\neq0$. Tentukan Benar atau Salah!",
    pernyataan: [
      "Suku pertama hasil pengembangan adalah $4a^2$.",
      "Suku tengah hasil pengembangan adalah $-4$.",
      "Hasil akhirnya adalah $4a^2-4+\\frac{1}{a^2}$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Gunakan $(u-v)^2=u^2-2uv+v^2$: $4a^2-4+\\frac{1}{a^2}$.",
  },
  {
    no: 10, type: "pg",
    soal: "Hasil dari $(-3x-4y)^2$ adalah ...",
    options: ["A. $-9x^2-24xy-16y^2$", "B. $9x^2-24xy-16y^2$", "C. $-9x^2+24xy-16y^2$", "D. $9x^2+24xy+16y^2$"], jawaban: "D",
    pembahasan: "$(u+v)^2=u^2+2uv+v^2$. Jadi $(-3x-4y)^2=9x^2+24xy+16y^2$ → Jawaban D",
  },
  {
    no: 11, type: "pgk",
    soal: "Perhatikan penyederhanaan $(2x+3)^2-(x-2)^2$. Pernyataan yang benar adalah ...",
    pernyataan: [
      "$(2x+3)^2=4x^2+12x+9$.",
      "$(x-2)^2=x^2-4x+4$.",
      "Hasil pengurangannya adalah $3x^2+16x+5$.",
      "Koefisien $x$ pada hasil akhir adalah $8$.",
    ],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua pernyataan benar"],
    jawaban: "B", jawabanPGK: [0, 1, 2],
    pembahasan: "(1) dan (2) adalah pengembangan yang benar. Selisihnya $3x^2+16x+5$, sehingga (3) benar dan (4) salah → Jawaban B",
  },
  {
    no: 12, type: "pgkbs",
    soal: "Perhatikan pemfaktoran $6x^2+3x-18$ dan $4x^2-9$. Tentukan Benar atau Salah!",
    pernyataan: [
      "$6x^2+3x-18=3(2x-3)(x+2)$.",
      "$4x^2-9=(2x-3)(2x+3)$.",
      "Faktor persekutuan kedua bentuk tersebut adalah $2x-3$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "$6x^2+3x-18=3(2x^2+x-6)=3(2x-3)(x+2)$ dan $4x^2-9=(2x-3)(2x+3)$. Faktor persekutuannya $2x-3$.",
  },
  {
    no: 13, type: "pg",
    soal: "Pemfaktoran bentuk kuadrat $x^2-3ax+2a^2$ adalah ...",
    options: ["A. $(x-2a)(x+a)$", "B. $(x+2a)(x+a)$", "C. $(x-2a)(x-a)$", "D. $(x+2a)(x-a)$"], jawaban: "C",
    pembahasan: "Dua suku yang jumlahnya $-3a$ dan hasil kalinya $2a^2$ adalah $-2a$ dan $-a$. Jadi faktornya $(x-2a)(x-a)$ → Jawaban C",
  },
  {
    no: 14, type: "pgk",
    soal: "Perhatikan pemfaktoran berikut. Pernyataan yang benar adalah ...",
    pernyataan: [
      "$4x^2-9=(2x-3)(2x+3)$.",
      "$2x^2+x-3=(2x-3)(x+1)$.",
      "$x^2+x-6=(x+3)(x-2)$.",
      "$x^2+4x-5=(x-5)(x+1)$.",
    ],
    options: ["A. (1) dan (2) saja", "B. (2) dan (3) saja", "C. (1) dan (3) saja", "D. (2) dan (4) saja"],
    jawaban: "C", jawabanPGK: [0, 2],
    pembahasan: "(1) benar dan (3) benar. (2) menghasilkan $2x^2-x-3$, sedangkan (4) menghasilkan $x^2-4x-5$. Jadi jawaban C.",
  },
  {
    no: 15, type: "pgkbs",
    soal: "Tentukan Benar atau Salah untuk pemfaktoran berikut!",
    pernyataan: [
      "$x^2-2x=x(x-2)$.",
      "$x^2-9=(x+3)(x-3)$.",
      "$x^2+3x-10=(x+5)(x-2)$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Ketiga pemfaktoran benar jika dikalikan kembali: $x(x-2)=x^2-2x$, selisih kuadrat menghasilkan $x^2-9$, dan $(x+5)(x-2)=x^2+3x-10$.",
  },
  {
    no: 16, type: "pg",
    soal: "Bentuk paling sederhana dari $\\frac{2x^2+5x-12}{4x^2-9}$ adalah ...",
    options: ["A. $\\frac{x+4}{2x-3}$", "B. $\\frac{x+4}{2x+3}$", "C. $\\frac{x-4}{2x-3}$", "D. $\\frac{x-4}{2x+3}$"], jawaban: "B",
    pembahasan: "$2x^2+5x-12=(2x-3)(x+4)$ dan $4x^2-9=(2x-3)(2x+3)$. Setelah dicoret, hasilnya $\\frac{x+4}{2x+3}$ → Jawaban B",
  },
  {
    no: 17, type: "pgk",
    soal: "Perhatikan penjumlahan pecahan aljabar $\\frac{3}{2x}+\\frac{4}{x+2}$. Pernyataan yang benar adalah ...",
    pernyataan: [
      "KPK penyebutnya adalah $2x(x+2)$.",
      "Pembilang pecahan pertama setelah disamakan adalah $3(x+2)$.",
      "Pembilang pecahan kedua setelah disamakan adalah $4(2x)$.",
      "Hasilnya adalah $\\frac{11x+6}{2x(x+2)}$.",
    ],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua pernyataan benar"],
    jawaban: "D", jawabanPGK: [0, 1, 2, 3],
    pembahasan: "Semua pernyataan benar. Pembilang gabungan $3(x+2)+4(2x)=11x+6$, sehingga jawaban D.",
  },
  {
    no: 18, type: "pgkbs",
    soal: "Perhatikan pengurangan $\\frac{3}{a-b}-\\frac{2}{a+b}$, dengan $a\\neq b$ dan $a\\neq-b$. Tentukan Benar atau Salah!",
    pernyataan: [
      "Penyebut bersama dapat ditulis $(a-b)(a+b)=a^2-b^2$.",
      "Pembilang setelah disamakan adalah $3(a+b)-2(a-b)$.",
      "Hasil akhirnya adalah $\\frac{a+5b}{a^2-b^2}$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "$3(a+b)-2(a-b)=3a+3b-2a+2b=a+5b$. Jadi hasilnya $\\frac{a+5b}{a^2-b^2}$.",
  },
  {
    no: 19, type: "pg",
    soal: "Diketahui keliling sebuah persegi panjang adalah 48 cm. Jika lebarnya 6 cm kurang dari panjangnya, luas persegi panjang tersebut adalah ...",
    options: ["A. $135$ cm$^2$", "B. $225$ cm$^2$", "C. $567$ cm$^2$", "D. $616$ cm$^2$"], jawaban: "A",
    pembahasan: "Misalkan panjang $p$ dan lebar $p-6$. $2(p+p-6)=48$ memberi $p=15$ dan lebar $9$. Luas $=15\\times9=135$ cm² → Jawaban A",
  },
  {
    no: 20, type: "pgk",
    soal: "Kebun Pak Ogah berbentuk persegi panjang. Panjang diagonalnya dinyatakan dengan $(5x-15)$ meter dan $(3x+5)$ meter. Pernyataan yang benar adalah ...",
    pernyataan: [
      "Karena keduanya menyatakan diagonal yang sama, $5x-15=3x+5$.",
      "Nilai $x$ adalah $10$.",
      "Panjang diagonal kebun adalah $35$ meter.",
      "Panjang diagonal kebun adalah $50$ meter.",
    ],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua pernyataan benar"],
    jawaban: "B", jawabanPGK: [0, 1, 2],
    pembahasan: "$5x-15=3x+5$ memberi $2x=20$, sehingga $x=10$. Diagonal $=5(10)-15=35$ meter. Jadi (1), (2), dan (3) benar → Jawaban B",
  },

  // ─── Soal tambahan 21–33 — Modul Pemantapan 2026–2027, Bentuk Aljabar ───
  // Catatan: soal #3 dan #10 dari sumber asli di-skip sementara karena hasil
  // hitungan tidak cocok dengan opsi/pernyataan yang diberikan (lihat catatan
  // di chat) — menunggu verifikasi angka dari sumber.
  {
    no: 21, type: "pg",
    soal: "Sederhanakan bentuk pecahan aljabar $y - \\frac{4}{y}$ menjadi satu pecahan tunggal.",
    options: ["A. $\\frac{1 - 4y}{y}$", "B. $\\frac{y - 4}{y}$", "C. $\\frac{y^2 - 4}{y}$", "D. $\\frac{4 - y^2}{y}$"],
    jawaban: "C",
    pembahasan: "Samakan penyebut dengan mengalikan $y$ dengan $\\frac{y}{y}$:\n$$y - \\frac{4}{y} = \\frac{y \\cdot y}{y} - \\frac{4}{y} = \\frac{y^2 - 4}{y}$$\n\nJawaban: C",
  },
  {
    no: 22, type: "pg",
    soal: "Diberikan dua bentuk aljabar $P = -5m + 8$ dan $Q = 4m - 3$. Hasil dari pengurangan $P$ dari $Q$ ($Q - P$) adalah ....",
    options: ["A. $9m - 11$", "B. $9m + 5$", "C. $-9m + 11$", "D. $-m + 5$"],
    jawaban: "A",
    pembahasan: "$$Q - P = (4m - 3) - (-5m + 8) = 4m - 3 + 5m - 8 = 9m - 11$$\n\nJawaban: A",
  },
  {
    no: 23, type: "pg",
    soal: "Bentuk paling sederhana dari $(3x - 2)(x + 4) - 3x^2 + 10$ adalah ....",
    options: ["A. $10x + 2$", "B. $10x - 2$", "C. $6x^2 + 10x - 2$", "D. $10x + 18$"],
    jawaban: "A",
    pembahasan: "Jabarkan dahulu:\n$$(3x - 2)(x + 4) = 3x^2 + 12x - 2x - 8 = 3x^2 + 10x - 8$$\n\nSubstitusikan:\n$$3x^2 + 10x - 8 - 3x^2 + 10 = 10x + 2$$\n\nJawaban: A",
  },
  {
    no: 24, type: "pg",
    soal: "Sebuah model matematika dinyatakan dengan tiga kali nilai $(8 - 2x)$ dikurangi oleh $5x$, kemudian ditambahkan dengan empat kali suatu variabel $x$. Persamaan aljabar yang tepat untuk menggambarkan kondisi tersebut adalah ....",
    options: ["A. $24 - 7x$", "B. $24 - 11x$", "C. $24 + 5x$", "D. $24 - 5x$"],
    jawaban: "A",
    pembahasan: "Terjemahkan kalimat menjadi bentuk aljabar:\n$$3(8 - 2x) - 5x + 4x = 24 - 6x - 5x + 4x = 24 - 7x$$\n\nJawaban: A",
  },
  {
    no: 25, type: "pg",
    soal: "Bentuk aljabar $\\frac{a}{a - b} - \\frac{b}{a + b}$ dapat dituliskan sebagai pecahan tunggal $\\frac{K}{L}$. Jumlah dari pembilang $K$ dan penyebut $L$ adalah ....",
    options: ["A. $2a^2 + 2b^2$", "B. $a^2 + b^2 + ab$", "C. $2a^2$", "D. $a^2 - b^2 + ab$"],
    jawaban: "C",
    pembahasan: "Samakan penyebut:\n$$\\frac{a}{a-b} - \\frac{b}{a+b} = \\frac{a(a+b) - b(a-b)}{(a-b)(a+b)} = \\frac{a^2 + b^2}{a^2 - b^2}$$\n\nJadi $K = a^2 + b^2$ dan $L = a^2 - b^2$.\n$$K + L = (a^2 + b^2) + (a^2 - b^2) = 2a^2$$\n\nJawaban: C",
  },
  {
    no: 26, type: "pg",
    soal: "Suatu segitiga $PQR$ memiliki panjang sisi-sisi sebagai berikut: $PQ = 5x - 3$, $QR = 4x + 6$, dan $PR = 7x - 1$. Rumus keliling segitiga $PQR$ dalam bentuk aljabar adalah ....",
    options: ["A. $16x + 2$", "B. $16x + 10$", "C. $12x + 2$", "D. $16x - 2$"],
    jawaban: "A",
    pembahasan: "Keliling = jumlah ketiga sisi:\n$$(5x - 3) + (4x + 6) + (7x - 1) = 16x + 2$$\n\nJawaban: A",
  },
  {
    no: 27, type: "pgk",
    soal: "Cermati beberapa bentuk pemfaktoran aljabar berikut! Manakah dari pemfaktoran di atas yang bernilai benar?",
    pernyataan: [
      "$16x^2 - 25 = (4x - 5)(4x + 5)$",
      "$3x^2 + 5x - 2 = (x + 2)(3x - 1)$",
      "$x^2 - 8x + 12 = (x - 6)(x - 2)$",
      "$4x^2 + x - 3 = (2x - 1)(2x + 3)$",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "(1) BENAR: $(4x-5)(4x+5) = 16x^2 - 25$.\n\n(2) BENAR: $(x+2)(3x-1) = 3x^2 - x + 6x - 2 = 3x^2 + 5x - 2$.\n\n(3) BENAR: $(x-6)(x-2) = x^2 - 8x + 12$.\n\n(4) SALAH: $(2x-1)(2x+3) = 4x^2 + 4x - 3$, bukan $4x^2 + x - 3$.",
  },
  {
    no: 28, type: "pgkbs",
    soal: "Taman Pak Budi berbentuk trapesium sama kaki. Sisi-sisi sejajarnya berturut-turut sepanjang $(6x - 4)$ m dan $(4x + 8)$ m, sedangkan sisi miringnya masing-masing $(5x + 2)$ m. Di sekeliling taman akan ditanami pohon pucuk merah dengan jarak antarpohon $(2x - 2)$ m. Harga per pohon adalah Rp200.000.\n\nBerdasarkan data di atas, tentukan kebenaran pernyataan berikut!",
    pernyataan: [
      "Keliling taman Pak Budi adalah $(20x + 8)$ m.",
      "Jika nilai $x = 3$, maka banyak pohon yang dibutuhkan adalah $17$ buah.",
      "Total biaya pembelian seluruh pohon untuk $x = 3$ adalah Rp3.400.000.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Keliling $= (6x-4) + (4x+8) + 2(5x+2) = 20x + 8$ (BENAR).\n\nUntuk $x=3$: keliling $= 20(3)+8 = 68$ m dan jarak antarpohon $= 2(3)-2 = 4$ m. Banyak pohon $= 68 \\div 4 = 17$ buah (BENAR).\n\nTotal biaya $=17\\times Rp200.000=Rp3.400.000$ (BENAR).",
  },
  {
    no: 29, type: "pg",
    soal: "Bentuk sederhana dari pecahan aljabar $\\frac{9x^2 - 4}{6x^2 + x - 2}$ adalah ....",
    options: ["A. $\\frac{3x - 2}{2x - 1}$", "B. $\\frac{3x + 2}{2x + 1}$", "C. $\\frac{3x - 2}{2x + 1}$", "D. $\\frac{3x + 2}{2x - 1}$"],
    jawaban: "A",
    pembahasan: "Faktorkan pembilang (selisih dua kuadrat): $9x^2 - 4 = (3x-2)(3x+2)$.\n\nFaktorkan penyebut: $6x^2 + x - 2 = (3x+2)(2x-1)$.\n\nCoret faktor yang sama:\n$$\\frac{(3x-2)(3x+2)}{(3x+2)(2x-1)} = \\frac{3x-2}{2x-1}$$\n\nJawaban: A",
  },
  {
    no: 30, type: "pg",
    soal: "Salah satu faktor dari bentuk kuadrat $4x^2 - 40x + 84$ adalah ....",
    options: ["A. $(x - 7)$", "B. $(x + 3)$", "C. $(2x - 3)$", "D. $(4x + 12)$"],
    jawaban: "A",
    pembahasan: "Keluarkan faktor persekutuan $4$: $4x^2-40x+84 = 4(x^2-10x+21)$.\n\nFaktorkan $x^2-10x+21$: cari dua bilangan berjumlah $-10$ dan berkali $21$, yaitu $-7$ dan $-3$:\n$$4(x-7)(x-3)$$\n\nSalah satu faktornya adalah $(x-7)$ → Jawaban A",
  },
  {
    no: 31, type: "pgk",
    soal: "Sebuah persegi panjang memiliki panjang $(x+5)$ dan lebar $(x+2)$. Persegi panjang itu dibagi menjadi kisi 2 × 2: baris atas memiliki tinggi $x$, baris bawah memiliki tinggi $2$, sedangkan kolom kiri memiliki lebar $x$ dan kolom kanan memiliki lebar $5$. Daerah I adalah kiri atas, daerah II kanan atas, daerah III kiri bawah, dan daerah IV kanan bawah.\n\nPilihlah semua pernyataan yang benar terkait luas daerah tersebut!",
    pernyataan: [
      "Luas daerah I adalah $x^2$.",
      "Luas daerah II adalah $5x$.",
      "Luas daerah III adalah $2x$.",
      "Luas total seluruh daerah adalah $x^2 + 7x + 10$.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    pembahasan: "Daerah I: $x \\times x = x^2$ (BENAR).\n\nDaerah II: $5 \\times x = 5x$ (BENAR).\n\nDaerah III: $x \\times 2 = 2x$ (BENAR).\n\nLuas total $= (x+5)(x+2) = x^2+7x+10$, sama dengan jumlah keempat daerah (BENAR). Semua pernyataan benar.",
  },
  {
    no: 32, type: "pg",
    soal: "Hasil dari penjabaran dan penyederhanaan $3(x - 4)^2 - 4(x + 1)$ adalah ....",
    options: ["A. $3x^2 - 28x + 44$", "B. $3x^2 - 24x + 44$", "C. $3x^2 - 28x + 48$", "D. $3x^2 - 20x + 44$"],
    jawaban: "A",
    pembahasan: "Jabarkan $(x-4)^2 = x^2-8x+16$, kalikan $3$: $3x^2-24x+48$.\n\nJabarkan $-4(x+1) = -4x-4$.\n\nGabungkan:\n$$3x^2-24x+48-4x-4 = 3x^2-28x+44$$\n\nJawaban: A",
  },
  {
    no: 33, type: "pgkbs",
    soal: "Perhatikan skema alur algoritma fungsi berikut:\nMasukan $(x) \\rightarrow y = 2x + 3 \\rightarrow$ Apakah $y$ Bilangan Genap?\nJika Ya $\\rightarrow z = 3y + 1$\nJika Tidak $\\rightarrow z = 4y - 2$\n\nBerdasarkan diagram alur di atas, tentukan Benar (B) atau Salah (S) untuk setiap pernyataan berikut!",
    pernyataan: [
      "Untuk nilai masukan $x = 3$, hasil akhir $z$ adalah $34$.",
      "Untuk nilai masukan $x = 5$, hasil akhir $z$ adalah $50$.",
      "Nilai $y$ yang dihasilkan akan selalu bernilai ganjil untuk setiap $x$ bilangan bulat.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Karena $y = 2x+3$ dan $2x$ selalu genap, maka $y$ = genap $+3$ selalu GANJIL untuk semua $x$ bilangan bulat (pernyataan 3 BENAR). Karena $y$ selalu ganjil, cabang \"Jika Tidak\" yang selalu dipakai: $z = 4y-2$.\n\nUntuk $x=3$: $y=2(3)+3=9$, $z=4(9)-2=34$ (BENAR).\n\nUntuk $x=5$: $y=2(5)+3=13$, $z=4(13)-2=50$ (BENAR).",
  },

  // ─── Soal 34–35: perbaikan dari 2 soal yang angkanya tidak konsisten
  // dengan opsi/pernyataan aslinya (lihat catatan di chat). Cerita/tema soal
  // dipertahankan sama persis; hanya bagian yang keliru yang diperbaiki. ───
  {
    no: 34, type: "pg",
    soal: "Bentuk aljabar $4(3p - 5q + 2) + 6p + 9q$ disederhanakan menjadi $ap + bq + c$. Nilai dari $a + b + c$ adalah ....",
    options: ["A. $5$", "B. $11$", "C. $15$", "D. $-3$"],
    jawaban: "C",
    pembahasan: "Jabarkan dahulu:\n$$4(3p - 5q + 2) = 12p - 20q + 8$$\n\nGabungkan dengan $6p + 9q$:\n$$12p - 20q + 8 + 6p + 9q = 18p - 11q + 8$$\n\nJadi $a=18$, $b=-11$, $c=8$.\n$$a+b+c = 18 + (-11) + 8 = 15$$\n\nJawaban: C",
  },
  {
    no: 35, type: "pgkbs",
    soal: "Tiga generasi dalam satu keluarga terdiri dari Cucu, Ibu, dan Nenek. Tiga tahun yang lalu, usia Nenek tepat tiga kali usia Ibu, dan usia Ibu pada saat itu kurang lima tahun dari empat kali usia Cucu pada saat itu. Jika tahun ini usia Cucu adalah $y$ tahun, tentukan apakah pernyataan berikut Benar (B) atau Salah (S):",
    pernyataan: [
      "Usia Ibu tahun ini dapat dinyatakan sebagai $(4y - 14)$ tahun.",
      "Usia Nenek dua tahun yang akan datang adalah $(12y - 46)$ tahun.",
      "Jumlah total usia mereka bertiga tahun ini adalah $(17y - 50)$ tahun.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Tiga tahun lalu, usia Cucu $=y-3$.\n\nUsia Ibu tiga tahun lalu $=4(y-3)-5=4y-17$, sehingga usia Ibu tahun ini $=4y-17+3=4y-14$ (BENAR).\n\nUsia Nenek tiga tahun lalu $=3(4y-17)=12y-51$, sehingga usia Nenek tahun ini $=12y-51+3=12y-48$, dan dua tahun akan datang $=12y-48+2=12y-46$ (BENAR).\n\nTotal usia ketiganya tahun ini $=y+(4y-14)+(12y-48)=17y-62$, BUKAN $17y-50$ (SALAH).",
  },
];

const nomorAljabarDihapus = new Set([1, 2, 8, 9, 13, 15, 17, 18, 21, 24, 25, 33, 34]);
const latihanDasarAljabar = latihanDasar
  .filter((soal) => !nomorAljabarDihapus.has(soal.no))
  .map((soal, index) => ({ ...soal, no: index + 1 }));
const soalBentukAljabarTka: LatihanSoal = {
  no: 3,
  type: "pgkbs",
  sourceLabel: "TKA Matematika 2026",
  soal: "Diketahui bentuk aljabar berikut ini.\n\n$2ab-b^2+3a^2b+ab^2-5$\n\nTentukan Benar atau Salah pada setiap pernyataan berikut terkait bentuk aljabar tersebut!",
  pernyataan: [
    "Terdapat 2 variabel yaitu $a$ dan $b$.",
    "Konstanta pada bentuk aljabar tersebut adalah $5$.",
    "Bilangan $2$, $-1$, $3$, dan $1$ merupakan koefisien.",
  ],
  jawabanBS: ["B", "S", "B"],
  pembahasan: "Variabel pada bentuk aljabar tersebut adalah $a$ dan $b$, sehingga pernyataan (1) benar. Konstanta adalah $-5$, bukan $5$, sehingga pernyataan (2) salah. Koefisien suku-suku yang memuat variabel adalah $2$, $-1$, $3$, dan $1$, sehingga pernyataan (3) benar.",
};
const latihanDasarAljabarAktif = latihanDasarAljabar
  .filter((soal) => !new Set([4, 11, 20]).has(soal.no))
  .map((soal) => ({
    ...soal,
    no: soal.no === 14 ? 3 : soal.no === 15 ? 4 : soal.no === 21 ? 5 : soal.no,
  }));
const latihanDasarAljabarDenganSoalTka = [
  ...latihanDasarAljabarAktif.slice(0, 2),
  soalBentukAljabarTka,
  ...latihanDasarAljabarAktif.slice(2),
].map((soal, index) => ({ ...soal, no: index + 1 }));

const AljabarPage = () => (
  <TKAPemantapanLayout
    title="BENTUK ALJABAR"
    backPath="/tka/modul-pemantapan"
    materiSections={materiSections}
    contohSoal={contohSoal}
    latihanDasar={latihanDasarAljabarDenganSoalTka}
  />
);

export default AljabarPage;
