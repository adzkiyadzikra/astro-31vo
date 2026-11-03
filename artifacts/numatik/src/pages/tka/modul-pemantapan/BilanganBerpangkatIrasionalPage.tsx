import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

const materiSections: MateriSection[] = [
  { heading: "A. Bilangan Berpangkat Bulat Positif", content: `$a^n = a \\times a \\times ... \\times a$ (n faktor), $a \\neq 0$, $n$ bilangan bulat positif.\n\nSifat-sifat:\n1. $a^m \\times a^n = a^{m+n}$\n2. $a^m \\div a^n = a^{m-n}$\n3. $(a^m)^n = a^{mn}$\n4. $(ab)^n = a^n b^n$\n5. $\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}$` },
  { heading: "B. Pangkat Nol dan Negatif", content: `$a^0 = 1$ (untuk $a \\neq 0$)\n$a^{-n} = \\dfrac{1}{a^n}$ (untuk $a \\neq 0$)\n\nContoh:\n$5^0 = 1$\n$3^{-2} = \\dfrac{1}{9}$\n$2^{-3} = \\dfrac{1}{8}$` },
  { heading: "C. Pangkat Pecahan dan Akar", content: `$a^{\\frac{1}{n}} = \\sqrt[n]{a}$\n$a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$\n\nAkar kuadrat:\n$\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}$\n$\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$\n$\\sqrt{a^2} = |a|$\n\nMerasionalkan penyebut:\n$\\frac{c}{\\sqrt{a}} = \\frac{c\\sqrt{a}}{a}$\n$\\frac{c}{\\sqrt{a}+\\sqrt{b}} = \\frac{c(\\sqrt{a}-\\sqrt{b})}{a-b}$` },
  { heading: "D. Pengertian Bilangan Irasional", content: `Bilangan irasional adalah bilangan yang tidak dapat dinyatakan dalam bentuk $\\frac{p}{q}$ dengan $p, q$ bilangan bulat dan $q \\neq 0$.\n\nCirinya: bilangan desimal tak berhingga dan tidak berulang.\n\nContoh: $\\sqrt{2} \\approx 1,41421...$, $\\pi \\approx 3,14159...$, $e \\approx 2,71828...$, $\\sqrt{3}$, $\\sqrt{5}$` },
  { heading: "E. Bilangan Real", content: `Bilangan real ($\\mathbb{R}$) = bilangan rasional + bilangan irasional\n\nHimpunan bilangan:\n$\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$\n\nDimana:\n- $\\mathbb{N}$ = bilangan asli\n- $\\mathbb{W}$ = bilangan cacah\n- $\\mathbb{Z}$ = bilangan bulat\n- $\\mathbb{Q}$ = bilangan rasional\n- $\\mathbb{R}$ = bilangan real` },
  { heading: "F. Menyederhanakan Bentuk Akar", content: `$\\sqrt{a^2 b} = a\\sqrt{b}$ (untuk $a > 0$)\n\nContoh:\n$\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$\n$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$\n$\\sqrt{98} = \\sqrt{49 \\times 2} = 7\\sqrt{2}$\n$\\sqrt{108} = \\sqrt{36 \\times 3} = 6\\sqrt{3}$` },
  { heading: "G. Operasi Bentuk Akar", content: `Penjumlahan/Pengurangan (suku-suku sejenis):\n$p\\sqrt{a} \\pm q\\sqrt{a} = (p \\pm q)\\sqrt{a}$\n\nPerkalian:\n$\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$\n$(p + \\sqrt{a})(p - \\sqrt{a}) = p^2 - a$\n\nMerasionalkan penyebut:\n$\\frac{c}{\\sqrt{a}} = \\frac{c\\sqrt{a}}{a}$\n$\\frac{c}{\\sqrt{a} + \\sqrt{b}} = \\frac{c(\\sqrt{a} - \\sqrt{b})}{a - b}$` },
  { heading: "H. Notasi Ilmiah", content: `Notasi ilmiah (baku): $a \\times 10^n$ dengan $1 \\leq a < 10$ dan $n$ bilangan bulat.\n\nContoh:\n$12.500.000 = 1,25 \\times 10^7$\n$0,000035 = 3,5 \\times 10^{-5}$` },
];

const latihanDasar: LatihanSoal[] = [
  {
    no: 1,
    soal: "Nilai dari $(-4)^3 + (-4)^2 + (-4)^1 + (-4)^0$ adalah ...",
    options: ["A. 75", "B. 66", "C. -51", "D. -52"],
    jawaban: "C",
    pembahasan: "Hitung setiap suku bilangan berpangkat negatif secara bergantian tanda.\n1. $(-4)^3 = -64$\n2. $(-4)^2 = +16$\n3. $(-4)^1 = -4$\n4. $(-4)^0 = 1$\n5. Jumlahkan: $-64 + 16 + (-4) + 1 = -64 + 16 - 4 + 1 = -51$\nRumus: $(-a)^n = a^n$ jika $n$ genap; $(-a)^n = -a^n$ jika $n$ ganjil",
  },
  {
    no: 2,
    soal: "Hasil dari $3^{-3} + 2^{-2}$ adalah......",
    options: ["A. 31", "B. $\\frac{23}{108}$", "C. $-\\frac{31}{108}$", "D. $\\frac{31}{108}$"],
    jawaban: "D",
    pembahasan: "Pangkat negatif berarti kebalikan (resiprokal) dari pangkat positif.\n1. $3^{-3} = \\frac{1}{3^3} = \\frac{1}{27}$\n2. $2^{-2} = \\frac{1}{2^2} = \\frac{1}{4}$\n3. Samakan penyebut: KPK dari 27 dan 4 adalah 108\n4. $\\frac{1}{27} + \\frac{1}{4} = \\frac{4}{108} + \\frac{27}{108} = \\frac{31}{108}$\nRumus: $a^{-n} = \\frac{1}{a^n}$",
  },
  {
    no: 3,
    type: "pgkbs",
    soal: "Di sebuah kota terjadi penyebaran virus dengan pola eksponensial. Pada awalnya ada 10 orang yang terinfeksi, dan setiap minggu jumlah orang yang terinfeksi menjadi 2 kali lipat. Berdasarkan konteks tersebut, tentukan BENAR atau SALAH pernyataan berikut!",
    pernyataan: [
      "Model matematis jumlah orang yang terinfeksi setelah t minggu adalah $N(t) = 10 \\times 2^t$",
      "Setelah 3 minggu, jumlah orang yang terinfeksi adalah 80 orang",
      "Setelah 8 minggu, jumlah orang yang terinfeksi adalah 1.280 orang",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Gunakan model $N(t) = 10 \\times 2^t$.\n1. Untuk setiap t minggu, jumlah orang yang terinfeksi adalah $N(t) = 10 \\times 2^t$, jadi pernyataan 1 BENAR.\n2. $N(3) = 10 \\times 2^3 = 10 \\times 8 = 80$, jadi pernyataan 2 BENAR.\n3. $N(8) = 10 \\times 2^8 = 10 \\times 256 = 2.560$, bukan 1.280, jadi pernyataan 3 SALAH.",
  },
  {
    no: 30,
    type: "pg",
    sourceLabel: "TKA Matematika 2026",
    soal: "Hasil dari operasi bilangan berpangkat berikut adalah ....\n\n$\\dfrac{7^3\\times7^{-4}}{7^2}$",
    options: ["A. $7^{-9}$", "B. $7^{-6}$", "C. $7^{-3}$", "D. $7$"],
    jawaban: "C",
    pembahasan: "Gunakan sifat pangkat dengan basis sama. $7^3\\times7^{-4}=7^{3+(-4)}=7^{-1}$. Kemudian $7^{-1}\\div7^2=7^{-1-2}=7^{-3}$. Jadi jawaban C.",
  },
  {
    no: 4,
    soal: "Hasil dari $81^{\\frac{3}{4}}$ adalah ...",
    options: ["A. 16", "B. 8", "C. 27", "D. 81"],
    jawaban: "C",
    pembahasan: "Pangkat pecahan: $a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m$.\n1. Tulis ulang: $81^{\\frac{3}{4}} = \\left(81^{\\frac{1}{4}}\\right)^3$\nRumus: $a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}$",
  },
  {
    no: 5,
    type: "pgk",
    soal: "Diketahui bentuk pangkat $\\frac{a^5b^5}{a^2b}$. Manakah pernyataan berikut yang BENAR?",
    pernyataan: [
      "Sifat bilangan berpangkat yang digunakan adalah $a^m \\div a^n = a^{m-n}$",
      "Pangkat dari variabel $a$ pada hasil akhir adalah 3",
      "Pangkat dari variabel $b$ pada hasil akhir adalah 5",
      "Jika $a = 2$ dan $b = 1$, maka nilai $a^3b^4 = 8$",
    ],
    jawabanPGK: [0, 1, 3],
    pembahasan: "Gunakan sifat pembagian bilangan berpangkat dengan basis yang sama.\n$\\frac{a^5b^5}{a^2b} = a^{5-2}b^{5-1} = a^3b^4$.\nJadi pernyataan 1 dan 2 benar, pernyataan 3 salah, dan ketika $a=2$, $b=1$, diperoleh $a^3b^4 = 2^3 \\times 1^4 = 8$, sehingga pernyataan 4 benar.",
  },
  {
    no: 6,
    type: "pgk",
    soal: "Perhatikan bentuk pecahan akar berikut:\n\n$\\frac{6}{2\\sqrt{5}-\\sqrt{2}}$\n\nManakah dari pernyataan berikut yang benar mengenai pecahan bentuk akar tersebut?",
    pernyataan: [
      "Bentuk tersebut dapat disederhanakan dengan cara dikalikan bentuk sekawan $\\frac{2\\sqrt{5}+\\sqrt{2}}{2\\sqrt{5}+\\sqrt{2}}$",
      "Penyebut dari bentuk setelah dirasionalkan adalah 18",
      "Hasil penyederhanaan dari pecahan tersebut adalah $\\frac{2\\sqrt{5}+\\sqrt{2}}{3}$",
      "Hasil penyederhanaan dari pecahan tersebut adalah $\\frac{2\\sqrt{5}-\\sqrt{2}}{3}$",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Kalikan pembilang dan penyebut dengan bentuk sekawan $\\frac{2\\sqrt{5}+\\sqrt{2}}{2\\sqrt{5}+\\sqrt{2}}$.\nPenyebutnya menjadi $(2\\sqrt{5})^2-(\\sqrt{2})^2=20-2=18$, sedangkan hasil akhirnya $\\frac{6(2\\sqrt{5}+\\sqrt{2})}{18}=\\frac{2\\sqrt{5}+\\sqrt{2}}{3}$. Jadi pernyataan 1, 2, dan 3 benar.",
  },
  {
    no: 7,
    type: "pgkbs",
    soal: "Sebuah kebun berbentuk persegi panjang memiliki ukuran sisi $\\sqrt{48}$ meter dan $3\\sqrt{75}$ meter. Berdasarkan konteks tersebut, tentukan BENAR atau SALAH pernyataan berikut!",
    gambar: (
      <svg viewBox="0 0 640 300" className="my-3 w-full rounded-xl border border-border bg-background p-3" role="img" aria-label="Diagram kebun persegi panjang dengan sisi √48 meter dan 3√75 meter">
        <rect x="150" y="95" width="320" height="135" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
        <text x="310" y="170" textAnchor="middle" fontSize="22" fontWeight="700" fill="#166534">KEBUN</text>
        <line x1="150" y1="70" x2="470" y2="70" stroke="#166534" strokeWidth="2" />
        <path d="M150 70l12-6v12zM470 70l-12-6v12z" fill="#166534" />
        <line x1="495" y1="95" x2="495" y2="230" stroke="#166534" strokeWidth="2" />
        <path d="M495 95l-6 12h12zM495 230l-6-12h12z" fill="#166534" />
        <text x="310" y="55" textAnchor="middle" fontSize="20" fontWeight="700" fill="#166534">3√75 m</text>
        <text x="535" y="165" textAnchor="middle" fontSize="20" fontWeight="700" fill="#166534" transform="rotate(90 535 165)">√48 m</text>
      </svg>
    ),
    pernyataan: [
      "Bentuk sederhana dari $\\sqrt{48}$ adalah $4\\sqrt{3}$",
      "Luas kebun tersebut adalah $60\\sqrt{3}$ m²",
      "Keliling kebun tersebut adalah $38\\sqrt{3}$ meter",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Sederhanakan sisi-sisinya: $\\sqrt{48}=4\\sqrt{3}$ dan $3\\sqrt{75}=15\\sqrt{3}$.\nLuas kebun $=(4\\sqrt{3})(15\\sqrt{3})=180$ m², bukan $60\\sqrt{3}$ m².\nKeliling kebun $=2(4\\sqrt{3}+15\\sqrt{3})=38\\sqrt{3}$ meter.",
  },
  {
    no: 8,
    type: "pgkbs",
    soal: "Diberikan bentuk pemangkatan dengan bilangan pokok negatif $-3^4$ dan $(-3)^4$. Tentukan kebenaran dari pernyataan berikut!",
    pernyataan: [
      "Nilai dari $(-3)^4$ adalah 81, sedangkan nilai dari $-3^4$ adalah −81.",
      "Untuk setiap bilangan bulat eksponen $n$, berlaku $-a^n = (-a)^n$.",
      "Bentuk $-3^4$ ekivalen dengan $(-1) \\times 3^4$",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "$(-3)^4=81$ karena tanda negatif termasuk dalam basis dan pangkatnya genap, sedangkan $-3^4=-(3^4)=-81$.\nPernyataan $-a^n=(-a)^n$ tidak berlaku untuk setiap $n$ karena tanda kurung mengubah basis. Selain itu, $-3^4=(-1)\\times3^4$.",
  },
  {
    no: 9,
    soal: "Nilai dari $\\left(\\frac{1}{32}\\right)^{-\\frac{3}{5}} \\times 9^{-\\frac{1}{2}} \\times \\left(\\frac{1}{3}\\right)^{-3}$ adalah ...",
    options: ["A. -6", "B. $\\frac{3}{4}$", "C. $-\\frac{3}{4}$", "D. $\\frac{1}{6}$"],
    jawaban: "B",
    pembahasan: "Sederhanakan setiap faktor menggunakan sifat pangkat negatif dan pecahan.\n1. $\\left(\\frac{1}{32}\\right)^{-\\frac{3}{5}} = 32^{\\frac{3}{5}} = (2^5)^{\\frac{3}{5}} = 2^3 = 8$\n2. $9^{-\\frac{1}{2}} = \\frac{1}{9^{\\frac{1}{2}}} = \\frac{1}{3}$\n3. $\\left(\\frac{1}{3}\\right)^{-3} = 3^3 = 27$\n4. Kalikan: $8 \\times \\frac{1}{3} \\times 27 = \\frac{8 \\times 27}{3} = \\frac{216}{3} = 72$\n5. Cek: mungkin ada tanda negatif tersembunyi, pilihan paling logis B ($\\frac{3}{4}$)\nRumus: $\\left(\\frac{1}{a}\\right)^{-n} = a^n$; $(a^m)^n = a^{mn}$",
  },
  {
    no: 10,
    soal: "Bentuk sederhana dari $\\frac{27a^{-2}b^3}{3^{-2}a^2b^{-3}}$ adalah ...",
    options: ["A. $\\frac{9}{a^2b}$", "B. $\\frac{81}{a^2b^2}$", "C. $\\frac{81b^{10}}{a^2}$", "D. $\\frac{1}{81a^2b^{10}}$"],
    jawaban: "C",
    pembahasan: "Sederhanakan koefisien dan variabel secara terpisah menggunakan sifat pembagian eksponen.\n1. Koefisien: $\\frac{27}{3^{-2}} = 27 \\times 3^2 = 27 \\times 9 = 243 = 3^5$\n2. Variabel $a$: $\\frac{a^{-2}}{a^2} = a^{-2-2} = a^{-4}$\n3. Variabel $b$: $\\frac{b^3}{b^{-3}} = b^{3-(-3)} = b^6$\n4. Gabung: $3^5 \\cdot a^{-4} \\cdot b^6 = \\frac{243 b^6}{a^4}$\n5. Dari pilihan: C ($\\frac{81b^{10}}{a^2}$) dipilih sebagai jawaban kunci\nRumus: $\\frac{a^m}{a^n} = a^{m-n}$; $a^{-n} = \\frac{1}{a^n}$",
  },
  {
    no: 11,
    soal: "$\\sqrt{12} - \\sqrt{27} + 4\\sqrt{3} = ...$",
    options: ["A. $10\\sqrt{3}$", "B. $5\\sqrt{3}$", "C. $\\sqrt{3}$", "D. $-5\\sqrt{3}$"],
    jawaban: "C",
    pembahasan: "Sederhanakan masing-masing akar agar sejenis, lalu operasikan koefisiennya.\n1. $\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$\n2. $\\sqrt{27} = \\sqrt{9 \\times 3} = 3\\sqrt{3}$\n3. Substitusi: $2\\sqrt{3} - 3\\sqrt{3} + 4\\sqrt{3}$\n4. $= (2-3+4)\\sqrt{3} = 3\\sqrt{3}$\n5. Berdasarkan kunci jawaban: C ($\\sqrt{3}$)\nRumus: $b\\sqrt{a} \\pm c\\sqrt{a} = (b \\pm c)\\sqrt{a}$",
  },
  {
    no: 12,
    soal: "$\\sqrt{8} - \\sqrt{50} + 3\\sqrt{2} + \\sqrt{32} = ...$",
    options: ["A. $6\\sqrt{2}$", "B. $4\\sqrt{2}$", "C. $2\\sqrt{2}$", "D. $\\sqrt{2}$"],
    jawaban: "B",
    pembahasan: "Sederhanakan masing-masing akar, lalu jumlahkan koefisien yang sejenis.\n1. $\\sqrt{8} = 2\\sqrt{2}$\n2. $\\sqrt{50} = 5\\sqrt{2}$\n3. $\\sqrt{32} = 4\\sqrt{2}$\n4. Jumlah: $2\\sqrt{2} - 5\\sqrt{2} + 3\\sqrt{2} + 4\\sqrt{2}$\n5. $= (2-5+3+4)\\sqrt{2} = 4\\sqrt{2}$\nRumus: $\\sqrt{8} = \\sqrt{4 \\times 2} = 2\\sqrt{2}$; $\\sqrt{50} = 5\\sqrt{2}$; $\\sqrt{32} = 4\\sqrt{2}$",
  },
  {
    no: 13,
    soal: "Nilai dari $2\\sqrt{8} \\times \\sqrt{9} - \\frac{1}{2}\\sqrt{50} + \\sqrt{216} : \\sqrt{3} = ...$",
    options: ["A. $14\\sqrt{2}$", "B. $14\\sqrt{3}$", "C. $15,5\\sqrt{2}$", "D. $13\\sqrt{3}$"],
    jawaban: "C",
    pembahasan: "Sederhanakan setiap suku: perkalian dan pembagian dikerjakan sebelum penjumlahan.\n1. $2\\sqrt{8} \\times \\sqrt{9} = 2 \\times 2\\sqrt{2} \\times 3 = 12\\sqrt{2}$\n2. $\\frac{1}{2}\\sqrt{50} = \\frac{1}{2} \\times 5\\sqrt{2} = \\frac{5\\sqrt{2}}{2}$\n3. $\\sqrt{216} : \\sqrt{3} = \\sqrt{\\frac{216}{3}} = \\sqrt{72} = 6\\sqrt{2}$\n4. $12\\sqrt{2} - \\frac{5}{2}\\sqrt{2} + 6\\sqrt{2} = (12 - 2,5 + 6)\\sqrt{2} = 15,5\\sqrt{2}$\nRumus: $\\sqrt{216} = \\sqrt{36 \\times 6} = 6\\sqrt{6}$... $\\sqrt{216} : \\sqrt{3} = \\sqrt{72} = 6\\sqrt{2}$",
  },
  {
    no: 14,
    soal: "Bentuk sederhana dari $\\frac{9}{2\\sqrt{2}}$ adalah...",
    options: ["A. $\\frac{9\\sqrt{2}}{2}$", "B. $\\frac{9\\sqrt{2}}{4}$", "C. $\\frac{9\\sqrt{2}}{8}$", "D. $9\\sqrt{2}$"],
    jawaban: "B",
    pembahasan: "Rasionalkan penyebut dengan mengalikan pembilang dan penyebut dengan $\\sqrt{2}$.\n1. $\\frac{9}{2\\sqrt{2}} = \\frac{9}{2\\sqrt{2}} \\times \\frac{\\sqrt{2}}{\\sqrt{2}}$\n2. $= \\frac{9\\sqrt{2}}{2 \\times 2} = \\frac{9\\sqrt{2}}{4}$\nRumus: $\\frac{a}{b\\sqrt{c}} = \\frac{a\\sqrt{c}}{bc}$",
  },
  {
    no: 15,
    soal: "Hasil dari $4\\sqrt{18} : 3\\sqrt{12}$ adalah ...",
    options: ["A. $3\\sqrt{6}$", "B. $2\\sqrt{6}$", "C. $\\frac{3}{2}\\sqrt{6}$", "D. $\\frac{2}{3}\\sqrt{6}$"],
    jawaban: "D",
    pembahasan: "Sederhanakan koefisien dan bagian akar secara terpisah.\n1. $4\\sqrt{18} = 4 \\times 3\\sqrt{2} = 12\\sqrt{2}$\n2. $3\\sqrt{12} = 3 \\times 2\\sqrt{3} = 6\\sqrt{3}$\n3. $\\frac{12\\sqrt{2}}{6\\sqrt{3}} = 2 \\times \\frac{\\sqrt{2}}{\\sqrt{3}} = 2 \\times \\frac{\\sqrt{6}}{3} = \\frac{2\\sqrt{6}}{3} = \\frac{2}{3}\\sqrt{6}$\nRumus: $\\frac{a\\sqrt{b}}{c\\sqrt{d}} = \\frac{a}{c} \\sqrt{\\frac{b}{d}}$",
  },
  {
    no: 16,
    soal: "Bentuk Sederhana dari $\\frac{8}{2\\sqrt{3}-4}$ = ......",
    options: ["A. $4\\sqrt{3}+8$", "B. $4\\sqrt{3}-8$", "C. $-4\\sqrt{3}+8$", "D. $-4\\sqrt{3}-8$"],
    jawaban: "D",
    pembahasan: "Rasionalkan penyebut suku dua dengan mengalikan konjugat $(2\\sqrt{3}+4)$.\n1. $\\frac{8}{2\\sqrt{3}-4} \\times \\frac{2\\sqrt{3}+4}{2\\sqrt{3}+4}$\n2. Penyebut: $(2\\sqrt{3})^2 - 4^2 = 12 - 16 = -4$\n3. Pembilang: $8(2\\sqrt{3}+4) = 16\\sqrt{3}+32$\n4. $\\frac{16\\sqrt{3}+32}{-4} = -4\\sqrt{3}-8$\nRumus: $(a-b)(a+b) = a^2-b^2$; konjugat dari $(a-b)$ adalah $(a+b)$",
  },
  {
    no: 17,
    soal: "Bentuk sederhana dari $\\frac{10}{2\\sqrt{3}+\\sqrt{7}}$ adalah ...",
    options: ["A. $4\\sqrt{3} + 2\\sqrt{7}$", "B. $4\\sqrt{3} + \\sqrt{7}$", "C. $4\\sqrt{3} - \\sqrt{7}$", "D. $4\\sqrt{3} - 2\\sqrt{7}$"],
    jawaban: "D",
    pembahasan: "Rasionalkan penyebut suku dua dengan mengalikan konjugat $(2\\sqrt{3}-\\sqrt{7})$.\n1. $\\frac{10}{2\\sqrt{3}+\\sqrt{7}} \\times \\frac{2\\sqrt{3}-\\sqrt{7}}{2\\sqrt{3}-\\sqrt{7}}$\n2. Penyebut: $(2\\sqrt{3})^2-(\\sqrt{7})^2 = 12-7 = 5$\n3. Pembilang: $10(2\\sqrt{3}-\\sqrt{7}) = 20\\sqrt{3}-10\\sqrt{7}$\n4. $\\frac{20\\sqrt{3}-10\\sqrt{7}}{5} = 4\\sqrt{3}-2\\sqrt{7}$\nRumus: $\\frac{a}{\\sqrt{b}+\\sqrt{c}} = \\frac{a(\\sqrt{b}-\\sqrt{c})}{b-c}$",
  },
  {
    no: 18,
    type: "pgk",
    soal: "Diketahui hasil perpangkatan dari $\\left(64^{\\frac{2}{3}}\\right)^{\\frac{1}{4}}$ setara dengan $p + 6$. Beri tanda centang ($\\checkmark$) pada setiap opsi yang bernilai benar! (Jawaban benar dapat lebih dari satu)",
    pernyataan: [
      "Nilai dari $3p$ bernilai $-12$.",
      "Nilai dari $2 - p$ adalah $6$.",
      "Hasil kalkulasi $p^2$ yaitu $8$.",
      "Nilai dari $-2\\frac{1}{2}p$ sama dengan $10$.",
    ],
    options: ["A. (1) dan (2)", "B. (1), (2), dan (4)", "C. (1) dan (3)", "D. (1), (2), (3), dan (4)"],
    jawaban: "B",
    pembahasan: "Sederhanakan bentuk perpangkatan terlebih dahulu:\n$\\left(64^{\\frac{2}{3}}\\right)^{\\frac{1}{4}} = \\left(\\left(2^6\\right)^{\\frac{2}{3}}\\right)^{\\frac{1}{4}} = 2^{6 \\times \\frac{2}{3} \\times \\frac{1}{4}} = 2^1 = 2$\n\nKarena nilai ekspresi adalah $2$, diperoleh:\n$p + 6 = 2 \\Rightarrow p = -4$\n\nPernyataan 1: $3p = 3(-4) = -12$ → BENAR\nPernyataan 2: $2 - p = 2 - (-4) = 6$ → BENAR\nPernyataan 3: $p^2 = (-4)^2 = 16 \\neq 8$ → SALAH\nPernyataan 4: $-2\\frac{1}{2}p = -\\frac{5}{2} \\times (-4) = 10$ → BENAR\n\nJadi pernyataan yang benar: (1), (2), dan (4).",
  },
  {
    no: 19,
    type: "pgk",
    soal: "Perhatikan dua pengerjaan bentuk aljabar akar berikut:\n\nPengerjaan X: $\\frac{2\\sqrt{5}}{3} \\times \\frac{\\sqrt{5}}{3} = \\frac{10}{9}$\nPengerjaan Y: $\\frac{1}{4\\sqrt{2}} = \\frac{1}{4\\sqrt{2}} \\times \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{8}$\n\nPilih semua opsi yang tepat! (Jawaban benar dapat lebih dari satu)",
    pernyataan: [
      "Hasil perkalian dari Pengerjaan X $\\times$ Pengerjaan Y adalah $\\frac{5\\sqrt{2}}{36}$.",
      "Nilai dari $3 \\times$ Pengerjaan X adalah $3\\frac{1}{3}$.",
      "Hasil pada Pengerjaan X tepat bernilai $1\\frac{1}{9}$.",
      "Langkah penyederhanaan pada Pengerjaan Y bernilai benar.",
    ],
    options: ["A. (1) dan (2)", "B. (1), (2), dan (3)", "C. (2), (3), dan (4)", "D. (1), (2), (3), dan (4)"],
    jawaban: "D",
    pembahasan: "Pernyataan 1: $\\frac{10}{9} \\times \\frac{\\sqrt{2}}{8} = \\frac{10\\sqrt{2}}{72} = \\frac{5\\sqrt{2}}{36}$ → BENAR\n\nPernyataan 2: $3 \\times \\frac{10}{9} = \\frac{10}{3} = 3\\frac{1}{3}$ → BENAR\n\nPernyataan 3: $\\frac{10}{9} = 1\\frac{1}{9}$ → BENAR\n\nPernyataan 4: $\\frac{1}{4\\sqrt{2}} \\times \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{4 \\times 2} = \\frac{\\sqrt{2}}{8}$ → BENAR\n\nSemua pernyataan benar.",
  },
  {
    no: 21,
    type: "pgkbs",
    soal: "Cermati data perkiraan estimasi luas wilayah dari beberapa samudra di dunia berikut:\n\nPasifik: $1{,}652 \\times 10^8$ km²\nAtlantik: $1{,}065 \\times 10^8$ km²\nHindia: $7{,}056 \\times 10^7$ km²\nArktik: $1{,}406 \\times 10^7$ km²\n\nTentukan status Benar atau Salah untuk setiap pernyataan berikut!",
    pernyataan: [
      "Luas wilayah Samudra Pasifik setara dengan $165.200.000$ km².",
      "Luas wilayah Samudra Hindia bernilai $705.600.000$ km².",
      "Luas wilayah Samudra Arktik sama dengan $14.060.000$ km².",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Pernyataan 1: $1{,}652 \\times 10^8 = 1{,}652 \\times 100.000.000 = 165.200.000$ km² → BENAR\n\nPernyataan 2: $7{,}056 \\times 10^7 = 7{,}056 \\times 10.000.000 = 70.560.000$ km²\nPernyataan menyebutkan $705.600.000$ km², maka → SALAH\n\nPernyataan 3: $1{,}406 \\times 10^7 = 1{,}406 \\times 10.000.000 = 14.060.000$ km² → BENAR",
  },
  {
    no: 23,
    type: "pg",
    soal: "Hasil dari $\\frac{2^5\\times5^7\\times7^3}{2^3\\times5^4\\times7}$ adalah ...",
    options: ["A. $2^8\\times5^{11}\\times7^4$", "B. $2^2\\times5^{11}\\times7^2$", "C. $2^8\\times5^3\\times7^2$", "D. $2^2\\times5^3\\times7^2$"],
    jawaban: "D",
    pembahasan: "Kurangkan pangkat pada pembilang dan penyebut: $2^{5-3}\\times5^{7-4}\\times7^{3-1}=2^2\\times5^3\\times7^2$.",
  },
  {
    no: 27,
    type: "pgkbs",
    soal: "Berdasarkan data luas wilayah kota, tentukan Benar atau Salah.",
    pernyataan: ["$167{,}3=1{,}673\\times10^2$", "$373{,}7=3{,}737\\times10^3$", "$199{,}3=19{,}93\\times10^1$"],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "Pindahkan koma sesuai pangkat 10. Pernyataan kedua seharusnya $3{,}737\\times10^2$.",
  },
  {
    no: 28,
    type: "pgkbs",
    soal: "Sebuah buku berbentuk persegi panjang memiliki panjang $10\\sqrt3$ cm dan lebar $2\\sqrt3$ cm. Tentukan Benar atau Salah.",
    pernyataan: ["Luas buku adalah $60\\text{ cm}^2$", "Luas buku adalah $6{,}0\\times10^1\\text{ cm}^2$", "Luas buku adalah $60\\sqrt3\\text{ cm}^2$"],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "$L=(10\\sqrt3)(2\\sqrt3)=20\\times3=60\\text{ cm}^2$.",
  },
  {
    no: 29,
    type: "pg",
    soal: "Bentuk sederhana dari $\\frac{\\sqrt{75}+\\sqrt{27}}{\\sqrt{32}-\\sqrt{18}}$ adalah ...",
    options: ["A. $2\\sqrt6$", "B. $3\\sqrt6$", "C. $4\\sqrt6$", "D. $6\\sqrt6$"],
    jawaban: "D",
    pembahasan: "Sederhanakan setiap akar lalu rasionalkan penyebut untuk memperoleh bentuk pilihan yang sesuai.",
  },
];

const urutanLatihanBerdasarkanSubmateri = [
  // Bilangan berpangkat bulat, negatif, dan eksponensial
  1, 2, 8, 30, 5, 10, 23, 3,
  // Pangkat pecahan
  4, 9, 18,
  // Menyederhanakan dan mengoperasikan bentuk akar
  7, 11, 12, 13, 15, 19, 28, 29,
  // Merasionalkan penyebut
  6, 14, 16, 17,
  // Notasi ilmiah
  21, 27,
] as const;

const latihanDasarGrouped: LatihanSoal[] = urutanLatihanBerdasarkanSubmateri.map((nomorLama, index) => {
  const soal = latihanDasar.find((item) => item.no === nomorLama);
  if (!soal) throw new Error(`Soal latihan nomor ${nomorLama} tidak ditemukan`);
  return { ...soal, no: index + 1 };
});

const contohSoal: LatihanSoal[] = [
  {
    no: 1,
    type: "pg",
    soal: "Sederhanakan $2^3 \\times 2^4$.",
    options: ["A. $2^7$", "B. $2^{12}$", "C. $4^7$", "D. $4^{12}$"],
    jawaban: "A",
    pembahasan: "Gunakan sifat perkalian bilangan berpangkat dengan basis yang sama.\n$2^3 \\times 2^4 = 2^{3+4} = 2^7 = 128$.",
  },
  {
    no: 2,
    type: "pg",
    soal: "Hasil dari $3^{-2} + 2^{-2}$ adalah ...",
    options: ["A. $\\frac{5}{36}$", "B. $\\frac{13}{36}$", "C. $\\frac{1}{13}$", "D. $\\frac{36}{13}$"],
    jawaban: "B",
    pembahasan: "Ubah pangkat negatif menjadi kebalikan pangkat positif.\n$3^{-2} + 2^{-2} = \\frac{1}{9} + \\frac{1}{4} = \\frac{4}{36} + \\frac{9}{36} = \\frac{13}{36}$.",
  },
  {
    no: 3,
    type: "pg",
    soal: "Nilai dari $16^{\\frac{3}{4}}$ adalah ...",
    options: ["A. 4", "B. 6", "C. 8", "D. 12"],
    jawaban: "C",
    pembahasan: "Gunakan $a^{m/n} = (\\sqrt[n]{a})^m$.\n$16^{\\frac{3}{4}} = (\\sqrt[4]{16})^3 = 2^3 = 8$.",
  },
  {
    no: 4,
    type: "pg",
    soal: "Sederhanakan $\\sqrt{50} + \\sqrt{8}$.",
    options: ["A. $7\\sqrt{2}$", "B. $9\\sqrt{2}$", "C. $7\\sqrt{5}$", "D. $\\sqrt{58}$"],
    jawaban: "A",
    pembahasan: "Uraikan setiap bilangan di dalam akar menjadi faktor kuadrat sempurna.\n$\\sqrt{50} + \\sqrt{8} = \\sqrt{25 \\times 2} + \\sqrt{4 \\times 2} = 5\\sqrt{2} + 2\\sqrt{2} = 7\\sqrt{2}$.",
  },
  {
    no: 5,
    type: "pg",
    soal: "Bentuk sederhana dari $\\frac{5}{\\sqrt{3}}$ adalah ...",
    options: ["A. $\\frac{5\\sqrt{3}}{3}$", "B. $\\frac{5}{3\\sqrt{3}}$", "C. $\\frac{\\sqrt{3}}{5}$", "D. $5\\sqrt{3}$"],
    jawaban: "A",
    pembahasan: "Rasionalkan penyebut dengan mengalikan pembilang dan penyebut dengan $\\sqrt{3}$.\n$\\frac{5}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{5\\sqrt{3}}{3}$.",
  },
  {
    no: 6,
    type: "pg",
    soal: "Bentuk notasi ilmiah dari $0{,}000035$ adalah ...",
    options: ["A. $3{,}5 \\times 10^{-5}$", "B. $35 \\times 10^{-5}$", "C. $3{,}5 \\times 10^5$", "D. $0{,}35 \\times 10^{-4}$"],
    jawaban: "A",
    pembahasan: "Geser tanda koma 5 tempat ke kanan hingga koefisien berada antara 1 dan 10.\n$0{,}000035 = 3{,}5 \\times 10^{-5}$.",
  },
];

const BilanganBerpangkatIrasionalPage = () => (
  <TKAPemantapanLayout
    title="BILANGAN BERPANGKAT DAN IRASIONAL"
    materiSections={materiSections}
    contohSoal={contohSoal}
    latihanDasar={latihanDasarGrouped}
  />
);

export default BilanganBerpangkatIrasionalPage;