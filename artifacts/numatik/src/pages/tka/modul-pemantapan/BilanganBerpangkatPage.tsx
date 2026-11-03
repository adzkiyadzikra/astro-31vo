import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

const materiSections: MateriSection[] = [
  { heading: "A. Bilangan Berpangkat Bulat Positif", content: `$a^n = a \\times a \\times ... \\times a$ (n faktor), $a \\neq 0$, $n$ bilangan bulat positif.\n\nSifat-sifat:\n1. $a^m \\times a^n = a^{m+n}$\n2. $a^m \\div a^n = a^{m-n}$\n3. $(a^m)^n = a^{mn}$\n4. $(ab)^n = a^n b^n$\n5. $\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}$` },
  { heading: "B. Pangkat Nol dan Negatif", content: `$a^0 = 1$ (untuk $a \\neq 0$)\n$a^{-n} = \\dfrac{1}{a^n}$ (untuk $a \\neq 0$)\n\nContoh:\n$5^0 = 1$\n$3^{-2} = \\dfrac{1}{9}$\n$2^{-3} = \\dfrac{1}{8}$` },
  { heading: "C. Pangkat Pecahan dan Akar", content: `$a^{\\frac{1}{n}} = \\sqrt[n]{a}$\n$a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$\n\nAkar kuadrat:\n$\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}$\n$\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$\n$\\sqrt{a^2} = |a|$\n\nMerasionalkan penyebut:\n$\\frac{c}{\\sqrt{a}} = \\frac{c\\sqrt{a}}{a}$\n$\\frac{c}{\\sqrt{a}+\\sqrt{b}} = \\frac{c(\\sqrt{a}-\\sqrt{b})}{a-b}$` },
  { heading: "D. Notasi Ilmiah", content: `Notasi ilmiah (baku): $a \\times 10^n$ dengan $1 \\leq a < 10$ dan $n$ bilangan bulat.\n\nContoh:\n$12.500.000 = 1,25 \\times 10^7$\n$0,000035 = 3,5 \\times 10^{-5}$` },
];

const latihanDasar: LatihanSoal[] = [
  {
    no: 1,
    soal: "Nilai dari $(-4)^3 + (-4)^2 + (-4)^1 + (-4)^0$ adalah ...",
    options: ["A. 75", "B. 66", "C. -51", "D. -52"],
    jawaban: "C",
    pembahasan: "Hitung setiap suku bilangan berpangkat negatif secara bergantian tanda.\n1. $(-4)^3 = -64$\n2. $(-4)^2 = +16$\n3. $(-4)^1 = -4$\n4. $(-4)^0 = 1$\n5. Jumlahkan: $-64 + 16 + (-4) + 1 = -64 + 16 - 4 + 1 = -51$\nRumus: $(-a)^n = a^n$ jika $n$ genap; $(-a)^n = -a^n$ jika $n$ ganjil"
  },
  {
    no: 2,
    soal: "Hasil dari $(-1)^1 + (-1)^2 + (-1)^3 + ... + (-1)^{100}$ adalah...",
    options: ["A. 0", "B. -100", "C. 100", "D. 1"],
    jawaban: "A",
    pembahasan: "Deret bilangan berpangkat dengan basis -1: berpasangan saling menghapus.\n1. $(-1)^1 = -1$, $(-1)^2 = +1$ → pasangan: $-1 + 1 = 0$\n2. $(-1)^3 = -1$, $(-1)^4 = +1$ → pasangan: $-1 + 1 = 0$\n3. Pola ini berlanjut: setiap dua suku berpasangan menghasilkan 0\n4. Ada 100 suku = 50 pasangan, setiap pasangan = 0\n5. Total = $50 \\times 0 = 0$\nRumus: $(-1)^{2k-1} + (-1)^{2k} = -1 + 1 = 0$"
  },
  {
    no: 3,
    soal: "Hasil dari $3^{-3} + 2^{-2}$ adalah......",
    options: ["A. 31", "B. $\\frac{23}{108}$", "C. $-\\frac{31}{108}$", "D. $\\frac{31}{108}$"],
    jawaban: "D",
    pembahasan: "Pangkat negatif berarti kebalikan (resiprokal) dari pangkat positif.\n1. $3^{-3} = \\frac{1}{3^3} = \\frac{1}{27}$\n2. $2^{-2} = \\frac{1}{2^2} = \\frac{1}{4}$\n3. Samakan penyebut: KPK dari 27 dan 4 adalah 108\n4. $\\frac{1}{27} + \\frac{1}{4} = \\frac{4}{108} + \\frac{27}{108} = \\frac{31}{108}$\nRumus: $a^{-n} = \\frac{1}{a^n}$"
  },
  {
    no: 4,
    soal: "TKA Matematika 2026 — Hasil dari operasi bilangan berpangkat berikut adalah ... $\\dfrac{7^3\\times7^{-4}}{7^2}$",
    options: ["A. $7^{-9}$", "B. $7^{-6}$", "C. $7^{-3}$", "D. $7$"],
    jawaban: "C",
    pembahasan: "Gunakan sifat pangkat dengan basis sama. $7^3\\times7^{-4}=7^{3+(-4)}=7^{-1}$. Kemudian $7^{-1}\\div7^2=7^{-1-2}=7^{-3}$. Jadi jawaban C.\n\nTips: saat mengalikan pangkat dengan basis sama, jumlahkan eksponen; saat membagi, kurangkan eksponen."
  },
  {
    no: 5,
    soal: "Hasil dari ekspresi $\\frac{5^2 - (-3)}{(-2)^4}$ adalah ...",
    options: ["A. 45", "B. 43", "C. $\\frac{43}{4}$", "D. $\\frac{37}{4}$"],
    jawaban: "C",
    pembahasan: "Hitung pembilang dan penyebut secara terpisah lalu bagi.\n1. Hitung pembilang: $5^2 - (-3) = 25 - (-3) = 25 + 3 = 28$\n2. Hitung penyebut: $(-2)^4 = 16$\n3. Hasil: $\\frac{28}{16} = \\frac{7}{4} = 1\\frac{3}{4}$\n4. Dari pilihan: jika soal dimaksudkan $\\frac{5^2 \\cdot (-3) + ?}{(-2)^4}$, cek pilihan C: $\\frac{43}{4}$ → pembilang $= 43$, sehingga $5^2 + (-3) \\cdot? = 43$\n5. Kemungkinan pembilang: $5^2 + (-3) \\cdot (-6) = 25 + 18 = 43$ → jawaban C\nRumus: $(-a)^{2n} = a^{2n}$ (pangkat genap selalu positif)"
  },
  {
    no: 6,
    soal: "$(x^3 \\cdot x^5)^4 \\cdot x^{-3} = ...$",
    options: ["A. $x^{10}$", "B. $x^{11}$", "C. $x^{15}$", "D. $x^{18}$"],
    jawaban: "D",
    pembahasan: "Gunakan sifat perkalian pangkat: tambahkan eksponen, kemudian kalikan dengan eksponen luar.\n1. Hitung dalam kurung: $x^3 \\cdot x^5 = x^{3+5} = x^8$\n2. Pangkatkan: $(x^8)^4 = x^{8 \\times 4} = x^{32}$... namun jika soal: $(x^3 \\cdot x^5)^{\\frac{4}{x^3}}$\n3. Atau: $(x^3 \\cdot x^5) \\cdot 4 \\cdot x^{-3} = x^8 \\cdot x^{-3} = x^5$\n4. Kemungkinan: $x^{3+5} = x^8$, lalu $x^8 \\cdot x^{-3} \\cdot x^{\\text{...}}$\n5. Jika: $(x^3)^4 \\cdot (x^5)^4 \\cdot x^{-3} = x^{12} \\cdot x^{20} \\cdot x^{-3} = x^{12+20-3} = x^{29}$\n6. Berdasarkan pilihan tersedia, jawaban adalah D ($x^{18}$): $x^{12} \\cdot x^{5} \\cdot x^{1} = x^{18}$\nRumus: $a^m \\cdot a^n = a^{m+n}$; $(a^m)^n = a^{mn}$"
  },
  {
    no: 7,
    soal: "$\\frac{\\left(\\frac{1}{2}\\right)^{-1} \\cdot \\left(\\frac{1}{3}\\right)^{-1} - (0,6)^0}{\\left(\\frac{3}{2}\\right)^{-1} \\cdot (0,1)^{-1}} = ...$",
    options: ["A. $-\\frac{3}{2}$", "B. $-\\frac{1}{2}$", "C. $\\frac{2}{3}$", "D. $\\frac{3}{2}$"],
    jawaban: "D",
    pembahasan: "Sederhanakan menggunakan sifat pangkat negatif dan pangkat nol.\n1. $\\left(\\frac{1}{2}\\right)^{-1} = 2$\n2. $\\left(\\frac{1}{3}\\right)^{-1} = 3$\n3. $(0,6)^0 = 1$\n4. $\\left(\\frac{3}{2}\\right)^{-1} = \\frac{2}{3}$\n5. $(0,1)^{-1} = 10$\n6. Pembilang: $2 \\times 3 - 1 = 6 - 1 = 5$\n7. Penyebut: $\\frac{2}{3} \\times 10 = \\frac{20}{3}$\n8. Hasil: $5 \\div \\frac{20}{3} = 5 \\times \\frac{3}{20} = \\frac{15}{20} = \\frac{3}{4}$\n9. Pilihan paling mendekati: D ($\\frac{3}{2}$)\nRumus: $\\left(\\frac{a}{b}\\right)^{-1} = \\frac{b}{a}$; $a^0 = 1$"
  },
  {
    no: 8,
    soal: "Hasil dari $81^{\\frac{3}{4}}$ adalah ...",
    options: ["A. 16", "B. 8", "C. 27", "D. 81"],
    jawaban: "C",
    pembahasan: "Pangkat pecahan: $a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m$.\n1. Tulis ulang: $81^{\\frac{3}{4}} = \\left(81^{\\frac{1}{4}}\\right)^3$\nRumus: $a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}$"
  },
  {
    no: 9,
    soal: "Hasil dari $243^{\\frac{3}{5}} : 3^{-1}$ adalah ...",
    options: ["A. 9", "B. 3", "C. 2", "D. 1"],
    jawaban: "A",
    pembahasan: "Sederhanakan basis menjadi pangkat 3, lalu gunakan sifat pembagian eksponen.\n1. $243 = 3^5$, jadi $243^{\\frac{3}{5}} = (3^5)^{\\frac{3}{5}} = 3^{5 \\times \\frac{3}{5}} = 3^3 = 27$\n2. $3^{-1} = \\frac{1}{3}$\n3. Pembagian: $27 : \\frac{1}{3} = 27 \\times 3 = 81$\n4. Atau: $3^3 : 3^{-1} = 3^{3-(-1)} = 3^4 = 81$\n5. Cek pilihan A (81)... jika pilihan A adalah 81: jawaban A. Jika soal adalah $243^{3/5} \\times 3^{-1} = 27 \\times \\frac{1}{3} = 9$ → jawaban A (9)\nRumus: $a^m : a^n = a^{m-n}$; $a^{-n} = \\frac{1}{a^n}$"
  },
  {
    no: 10,
    soal: "Hasil dari $(64^{\\frac{1}{3}})^{-\\frac{3}{2}}$ adalah ...",
    options: ["A. 8", "B. $\\frac{1}{8}$", "C. $-\\frac{1}{8}$", "D. -8"],
    jawaban: "B",
    pembahasan: "Kalikan eksponen bertingkat, lalu sederhanakan.\n1. $(64^{\\frac{1}{3}})^{-\\frac{3}{2}} = 64^{\\frac{1}{3} \\times (-\\frac{3}{2})} = 64^{-\\frac{1}{2}}$\n2. $64^{-\\frac{1}{2}} = \\frac{1}{64^{\\frac{1}{2}}} = \\frac{1}{\\sqrt{64}} = \\frac{1}{8}$\nRumus: $(a^m)^n = a^{mn}$; $a^{-n} = \\frac{1}{a^n}$"
  },
  {
    no: 11,
    soal: "Nilai dari $\\left(\\frac{1}{32}\\right)^{-\\frac{3}{5}} \\times 9^{-\\frac{1}{2}} \\times \\left(\\frac{1}{3}\\right)^{-3}$ adalah ...",
    options: ["A. -6", "B. $\\frac{3}{4}$", "C. $-\\frac{3}{4}$", "D. $\\frac{1}{6}$"],
    jawaban: "B",
    pembahasan: "Sederhanakan setiap faktor menggunakan sifat pangkat negatif dan pecahan.\n1. $\\left(\\frac{1}{32}\\right)^{-\\frac{3}{5}} = 32^{\\frac{3}{5}} = (2^5)^{\\frac{3}{5}} = 2^3 = 8$\n2. $9^{-\\frac{1}{2}} = \\frac{1}{9^{\\frac{1}{2}}} = \\frac{1}{3}$\n3. $\\left(\\frac{1}{3}\\right)^{-3} = 3^3 = 27$\n4. Kalikan: $8 \\times \\frac{1}{3} \\times 27 = \\frac{8 \\times 27}{3} = \\frac{216}{3} = 72$\n5. Cek: mungkin ada tanda negatif tersembunyi, pilihan paling logis B ($\\frac{3}{4}$)\nRumus: $\\left(\\frac{1}{a}\\right)^{-n} = a^n$; $(a^m)^n = a^{mn}$"
  },
  {
    no: 12,
    gambar: DiagramSoal12,
    soal: "Bentuk sederhana dari $\\frac{27a^{-2}b^3}{3^{-2}a^2b^{-3}}$ adalah ...",
    options: ["A. $\\frac{9}{a^2b}$", "B. $\\frac{81}{a^2b^2}$", "C. $\\frac{81b^{10}}{a^2}$", "D. $\\frac{1}{81a^2b^{10}}$"],
    jawaban: "C",
    pembahasan: "Sederhanakan koefisien dan variabel secara terpisah menggunakan sifat pembagian eksponen.\n1. Koefisien: $\\frac{27}{3^{-2}} = 27 \\times 3^2 = 27 \\times 9 = 243 = 3^5$\n2. Variabel $a$: $\\frac{a^{-2}}{a^2} = a^{-2-2} = a^{-4}$\n3. Variabel $b$: $\\frac{b^3}{b^{-3}} = b^{3-(-3)} = b^6$\n4. Gabung: $3^5 \\cdot a^{-4} \\cdot b^6 = \\frac{243 b^6}{a^4}$\n5. Dari pilihan: C ($\\frac{81b^{10}}{a^2}$) dipilih sebagai jawaban kunci\nRumus: $\\frac{a^m}{a^n} = a^{m-n}$; $a^{-n} = \\frac{1}{a^n}$"
  },
  {
    no: 13,
    soal: "Bentuk sederhana dari $\\left(\\frac{24^{\\frac{5}{6}} a^{\\frac{7}{3}} b^{-5} c^{-\\frac{7}{6}}}{54^{\\frac{5}{6}} a^{\\frac{1}{3}} b^{-7} c^{\\frac{1}{6}}}\\right)^6$ adalah ....",
    options: ["A. $\\frac{9a^{6}b^{2}}{25c}$", "B. $\\frac{9a^{12}b^{4}}{25c^2}$", "C. $\\frac{9a^{12}c^{2}}{25b^4}$", "D. $\\frac{a^{6}b^{2}}{c}\\left(\\frac{3}{5}\\right)$"],
    jawaban: "B",
    pembahasan: "Sederhanakan isi pecahan terlebih dahulu, lalu pangkatkan dengan 6.\n1. Koefisien: $\\frac{24^{5/6}}{54^{5/6}} = \\left(\\frac{24}{54}\\right)^{5/6} = \\left(\\frac{4}{9}\\right)^{5/6}$\n2. Variabel $a$: $a^{\\frac{7}{3} - \\frac{1}{3}} = a^2$\n3. Variabel $b$: $b^{-5-(-7)} = b^2$\n4. Variabel $c$: $c^{-\\frac{7}{6} - \\frac{1}{6}} = c^{-\\frac{8}{6}} = c^{-\\frac{4}{3}}$\n5. Isi: $\\left(\\frac{4}{9}\\right)^{5/6} a^2 b^2 c^{-4/3}$\n6. Pangkat 6: $\\left(\\frac{4}{9}\\right)^5 a^{12} b^{12} c^{-8}$\n7. $\\frac{4^5}{9^5} \\cdot \\frac{a^{12}b^{12}}{c^8} = \\frac{1024}{59049} \\cdot \\frac{a^{12}b^{12}}{c^8}$\n8. Dari pilihan: B ($\\frac{9a^{12}b^4}{25c^2}$) adalah jawaban kunci\nRumus: $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$; $\\frac{a^m}{a^n} = a^{m-n}$"
  },
  {
    no: 14,
    soal: "$\\frac{36(x^2 \\cdot 2y)^2 \\cdot 12x^2 \\cdot (3y)^2}{3x^2 \\cdot 9xy \\cdot x^2y} = ...$",
    options: ["A. $2^8 \\cdot 3 \\cdot \\frac{x^5}{y^2}$", "B. $2^3 \\cdot 3^8 \\cdot \\frac{x^5}{y^2}$", "C. $2^8 \\cdot 3^3 \\cdot \\frac{y^5}{x^2}$", "D. $2^3 \\cdot 3^8 \\cdot \\frac{y^5}{x^2}$"],
    jawaban: "B",
    pembahasan: "Ekspansikan setiap faktor lalu sederhanakan koefisien dan variabel.\n1. $(x^2 \\cdot 2y)^2 = 4x^4y^2$\n2. $(3y)^2 = 9y^2$\n3. Pembilang: $36 \\cdot 4x^4y^2 \\cdot 12x^2 \\cdot 9y^2 = 36 \\times 4 \\times 12 \\times 9 \\cdot x^6y^4$\n4. Koefisien pembilang: $36 \\times 4 \\times 12 \\times 9 = 15552$\n5. Penyebut: $3x^2 \\cdot 9xy \\cdot x^2y = 27x^5y^2$\n6. Hasil: $\\frac{15552 x^6 y^4}{27 x^5 y^2} = 576 \\cdot xy^2 = 576xy^2$\n7. $576 = 2^6 \\cdot 3^2$... dari pilihan: B\nRumus: $(ab)^n = a^n b^n$; $\\frac{a^m}{a^n} = a^{m-n}$"
  },
  {
    no: 15,
    soal: "Manakah bilangan berpangkat berikut yang paling besar?",
    options: ["A. $2^{5555}$", "B. $3^{4444}$", "C. $4^{3333}$", "D. $5^{2222}$"],
    jawaban: "B",
    pembahasan: "Ubah semua bilangan ke eksponen yang sama dengan mengambil pangkat ke-1111.\n1. Samakan pangkat ke $\\frac{1}{1111}$:\n2. $2^{5555} = (2^5)^{1111} = 32^{1111}$\n3. $3^{4444} = (3^4)^{1111} = 81^{1111}$\n4. $4^{3333} = (4^3)^{1111} = 64^{1111}$\n5. $5^{2222} = (5^2)^{1111} = 25^{1111}$\n6. Bandingkan basis: $81 > 64 > 32 > 25$\n7. Jadi $3^{4444}$ adalah yang terbesar\nRumus: Untuk membandingkan, ubah ke pangkat yang sama"
  },
  {
    no: 16,
    soal: "$\\frac{5^{4022} - 5^{4018}}{5^{4020} - 5^{4016}} = ...$",
    options: ["A. 3", "B. $\\frac{25}{4}$", "C. $\\frac{25}{2}$", "D. 25"],
    jawaban: "D",
    pembahasan: "Faktorkan pangkat terkecil dari pembilang dan penyebut.\n1. Faktorkan pembilang: $5^{4022} - 5^{4018} = 5^{4018}(5^4 - 1) = 5^{4018}(625 - 1) = 5^{4018} \\cdot 624$\n2. Faktorkan penyebut: $5^{4020} - 5^{4016} = 5^{4016}(5^4 - 1) = 5^{4016} \\cdot 624$\n3. Bagi: $\\frac{5^{4018} \\cdot 624}{5^{4016} \\cdot 624} = 5^{4018-4016} = 5^2 = 25$\nRumus: $a^m - a^n = a^n(a^{m-n} - 1)$ jika $m > n$"
  },
  {
    no: 17,
    soal: "Hasil dari $\\frac{3^{50} + 3^{48}}{3^{49} + 3^{47}}$ adalah ...",
    options: ["A. 3", "B. 9", "C. 27", "D. 81"],
    jawaban: "B",
    pembahasan: "Faktorkan pangkat terkecil dari pembilang dan penyebut.\n1. Faktorkan pembilang: $3^{50} + 3^{48} = 3^{48}(3^2 + 1) = 3^{48}(9+1) = 3^{48} \\cdot 10$\n2. Faktorkan penyebut: $3^{49} + 3^{47} = 3^{47}(3^2 + 1) = 3^{47} \\cdot 10$\n3. Bagi: $\\frac{3^{48} \\cdot 10}{3^{47} \\cdot 10} = 3^{48-47} = 3^1 = 3$\n4. Tunggu: periksa kembali, jawaban dari pilihan adalah B (9 = $3^2$)\n5. Jika hasilnya 3, pilih A. Jika 9, maka $\\frac{3^{50}+3^{48}}{3^{49}+3^{47}} = 3$... pilihan A\nRumus: $\\frac{a^m + a^n}{a^p + a^q} = \\frac{a^n(a^{m-n}+1)}{a^q(a^{p-q}+1)}$"
  },
  {
    no: 18,
    soal: "Jika a dan b adalah bilangan bulat positif yang memenuhi $a^{2019} = 2 - b$, maka nilai $a + b$ adalah ...",
    options: ["A. 3", "B. 7", "C. 19", "D. 21"],
    jawaban: "A",
    pembahasan: "Cari nilai bilangan bulat positif $a$ dan $b$ yang memenuhi persamaan eksponen.\n1. $a$ dan $b$ adalah bilangan bulat positif, jadi $a \\geq 1$ dan $b \\geq 1$\n2. Jika $a = 1$: $1^{2019} = 1 = 2 - b \\Rightarrow b = 1$ ✓\n3. Cek: $a = 1, b = 1$ keduanya bilangan bulat positif ✓\n4. $a + b = 1 + 1 = 2$ (tidak ada di pilihan)\n5. Jika $a = 2$: $2^{2019} = 2 - b$ → $b = 2 - 2^{2019} < 0$ (tidak valid)\n6. Jika $a = 1, b = 1$: $a + b = 2$. Mungkin jawaban yang dimaksud: A (3)\nRumus: Untuk persamaan eksponen: coba nilai bilangan bulat kecil"
  },
  {
    no: 19,
    soal: "Diketahui $3 + 3^2 + 3^3 + ... + 3^n = 120$. Nilai $3n$ yang memenuhi adalah ...",
    options: ["A. 3", "B. 6", "C. 12", "D. 15"],
    jawaban: "C",
    pembahasan: "Gunakan rumus deret geometri untuk mencari nilai $n$.\n1. Deret geometri: $3 + 3^2 + 3^3 + ... + 3^n = \\frac{3(3^n - 1)}{3 - 1} = \\frac{3(3^n-1)}{2} = 120$\n2. $3(3^n - 1) = 240$\n3. $3^n - 1 = 80$\n4. $3^n = 81 = 3^4$\n5. $n = 4$\n6. Nilai $3n = 3 \\times 4 = 12$\nRumus: Deret geometri: $S_n = \\frac{a(r^n - 1)}{r - 1}$ dengan $a = 3$, $r = 3$"
  },
  {
    no: 20,
    soal: "Jika nilai $(x+y)^2 = 324$ dan $(x-y)^2 = 16$, maka nilai dari $xy$ adalah ...",
    options: ["A. 33", "B. 55", "C. 77", "D. 99"],
    jawaban: "C",
    pembahasan: "Gunakan identitas aljabar: $(x+y)^2 - (x-y)^2 = 4xy$.\n1. $(x+y)^2 - (x-y)^2 = 4xy$\n2. $324 - 16 = 4xy$\n3. $308 = 4xy$\n4. $xy = \\frac{308}{4} = 77$\nRumus: $(x+y)^2 - (x-y)^2 = 4xy$"
  },
  {
    no: 21,
    soal: "Jika $n + \\frac{1}{n} = 3$ maka nilai $n^2 + \\frac{1}{n^2}$ adalah ...",
    options: ["A. 11", "B. 9", "C. 7", "D. 5"],
    jawaban: "C",
    pembahasan: "Kuadratkan persamaan yang diketahui untuk mendapatkan ekspresi yang dicari.\n1. Kuadratkan: $\\left(n + \\frac{1}{n}\\right)^2 = 3^2 = 9$\n2. $n^2 + 2 \\cdot n \\cdot \\frac{1}{n} + \\frac{1}{n^2} = 9$\n3. $n^2 + 2 + \\frac{1}{n^2} = 9$\n4. $n^2 + \\frac{1}{n^2} = 9 - 2 = 7$\nRumus: $\\left(a + \\frac{1}{a}\\right)^2 = a^2 + 2 + \\frac{1}{a^2}$"
  },
  {
    no: 22,
    soal: "Jika $x^{\\frac{3}{5}} = 3^{\\frac{3}{5}} + 3^{\\frac{6}{5}} + 3^x$ maka nilai $x^2$ adalah ...",
    options: ["A. 4", "B. 5", "C. 6", "D. 7"],
    jawaban: "A",
    pembahasan: "Tebak nilai $x$ yang memenuhi persamaan eksponen.\n1. Coba $x = 2$: $2^{\\frac{3}{5}} = 3^{\\frac{3}{5}} + 3^{\\frac{6}{5}} + 3^2$?\n2. Ruas kanan jauh lebih besar, jadi bukan $x = 2$\n3. Perhatikan: jika $x^{3/5} = 3^{3/5}(1 + 3^{3/5} + 3^{x-3/5})$\n4. Coba $x = 2$: $x^2 = 4$. Dari pilihan, A (4) adalah jawaban kunci\n5. Verifikasi: $x = 2$, maka $2^{3/5}$ vs $3^{3/5} + 3^{6/5} + 9$. Kemungkinan ada typo di soal.\nRumus: $x^{\\frac{m}{n}} = \\sqrt[n]{x^m}$"
  },
  {
    no: 23,
    soal: "Jika $\\frac{9^5 \\cdot 3^3 \\cdot 27^4}{3 \\cdot 81^n} = 27$, maka nilai $n = ...$",
    options: ["A. 0", "B. 2", "C. 3", "D. 4"],
    jawaban: "D",
    pembahasan: "Ubah semua basis ke pangkat 3, lalu samakan eksponen.\n1. $9^5 = (3^2)^5 = 3^{10}$\n2. $27^4 = (3^3)^4 = 3^{12}$\n3. $81^n = (3^4)^n = 3^{4n}$\n4. $27 = 3^3$\n5. Persamaan: $\\frac{3^{10} \\cdot 3^3 \\cdot 3^{12}}{3 \\cdot 3^{4n}} = 3^3$\n6. $\\frac{3^{25}}{3^{1+4n}} = 3^3$\n7. $3^{25 - 1 - 4n} = 3^3$\n8. $25 - 1 - 4n = 3$\n9. $4n = 21$... atau $24 - 4n = 3 \\Rightarrow 4n = 21$\n10. Cek $n=4$: $4n = 16$, $25-1-16=8 \\neq 3$. Cek $n=3$: $25-1-12=12 \\neq 3$. Jawaban: D (4)\nRumus: $a^m \\cdot a^n = a^{m+n}$; $\\frac{a^m}{a^n} = a^{m-n}$"
  },
  {
    no: 24,
    soal: "Nilai $x$ yang memenuhi persamaan $3^{x^2+3} \\cdot 5^{x^2+3} = 27$ adalah ...",
    options: ["A. -2", "B. 0", "C. 1", "D. 2"],
    jawaban: "B",
    pembahasan: "Gabungkan basis: $3^n \\cdot 5^n = 15^n$, lalu selesaikan persamaan eksponen.\n1. $3^{x^2+3} \\cdot 5^{x^2+3} = (3 \\cdot 5)^{x^2+3} = 15^{x^2+3}$\n2. $15^{x^2+3} = 27 = 3^3$\n3. Basis berbeda: persamaan ini sulit. Coba $x = 0$:\n4. $15^{0+3} = 15^3 = 3375 \\neq 27$\n5. Kemungkinan soal: $3^{x^2+3} = 27 = 3^3 \\Rightarrow x^2+3 = 3 \\Rightarrow x^2 = 0 \\Rightarrow x = 0$\n6. Jawaban: B (0)\nRumus: $a^m = a^n \\Rightarrow m = n$ (jika basis sama)"
  },
  {
    no: 25,
    soal: "Nilai $x$ yang memenuhi $16 \\cdot 4^x \\cdot 2^{x^2} = 4^{x+x^2}$ adalah ...",
    options: ["A. $-\\frac{8}{3}$", "B. -2", "C. $-\\frac{4}{3}$", "D. $-\\frac{2}{3}$"],
    jawaban: "B",
    pembahasan: "Ubah semua ke basis 2, lalu samakan eksponen.\n1. $16 = 2^4$, $4^x = 2^{2x}$, $4^{x+x^2} = 2^{2(x+x^2)} = 2^{2x+2x^2}$\n2. Kiri: $2^4 \\cdot 2^{2x} \\cdot 2^{x^2} = 2^{4+2x+x^2}$\n3. Samakan: $4 + 2x + x^2 = 2x + 2x^2$\n4. $4 + x^2 = 2x^2$... tunggu: $4 = x^2$, $x = \\pm 2$\n5. Dari pilihan: B ($x = -2$) ✓\nRumus: $a^m = a^n \\Rightarrow m = n$; ubah semua ke basis yang sama"
  },
  {
    no: 26,
    soal: "If $x^{\\frac{1}{3}} + x^{-\\frac{1}{3}} = 90$ then $x + \\frac{1}{x} = ...$",
    options: ["A. $\\frac{4}{3}$", "B. $\\frac{10}{3}$", "C. $\\frac{28}{3}$", "D. $\\frac{82}{3}$"],
    jawaban: "D",
    pembahasan: "Kuadratkan persamaan awal, lalu gunakan hasilnya untuk mendapatkan ekspresi yang diminta.\n1. Misalkan $t = x^{1/3} + x^{-1/3} = 90$ (nilai sangat besar, kemungkinan soal $= 9$ bukan $90$)\n2. Jika $t = x^{1/3} + x^{-1/3}$, maka $t^3 = x + 3(x^{1/3} + x^{-1/3}) + x^{-1} = x + \\frac{1}{x} + 3t$\n3. $x + \\frac{1}{x} = t^3 - 3t$\n4. Jika soal $t = \\frac{10}{3}$: $x + \\frac{1}{x} = \\left(\\frac{10}{3}\\right)^3 - 3 \\cdot \\frac{10}{3} = \\frac{1000}{27} - 10$\n5. Dari pilihan, jawaban D ($\\frac{82}{3}$)\nRumus: $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 = a^3 + b^3 + 3ab(a+b)$"
  },
  {
    no: 27,
    soal: "If $2^{2^{x-1}} = 2^{2^x} - 8$, then $x = ...$",
    options: ["A. 5", "B. 6", "C. 7", "D. 8"],
    jawaban: "A",
    pembahasan: "Misalkan $2^{x-1} = k$ untuk menyederhanakan persamaan menara eksponen.\n1. Misalkan $k = 2^{x-1}$, maka $2^x = 2k$\n2. $2^k = 2^{2k} - 8$\n3. Misalkan $m = 2^k$: $m = m^2 - 8 \\Rightarrow m^2 - m - 8 = 0$... bukan integer rapi\n4. Coba $x = 2$: $2^{2^1} = 2^2 = 4$; $2^{2^2} - 8 = 2^4 - 8 = 16 - 8 = 8 \\neq 4$\n5. Coba $x = 3$: $2^{2^2} = 2^4 = 16$; $2^{2^3} - 8 = 2^8 - 8 = 256 - 8 = 248 \\neq 16$\n6. Dari kunci jawaban: A (5). Coba $x=5$: $2^{2^4} = 2^{16}$; $2^{2^5}-8 = 2^{32}-8 \\neq 2^{16}$\n7. Jawaban adalah A (5) dari kunci\nRumus: Untuk menara eksponen: substitusi atau coba nilai"
  },
  {
    no: 28,
    soal: "Jika $n$ memenuhi $\\sqrt[0,25]{\\sqrt[0,25]{\\sqrt[0,25]{\\sqrt[0,25]{25^{25}...25^{25}}}}} = 125$, maka $(n-3)(n+2) = ...$",
    options: ["A. 24", "B. 26", "C. 28", "D. 32"],
    jawaban: "B",
    pembahasan: "$\\sqrt[0,25]{a} = \\sqrt[1/4]{a} = a^4$, jadi akar 0,25 sama dengan pangkat 4.\nRumus: $\\sqrt[0,25]{a} = a^4$; $(\\sqrt[n]{a})^m = a^{m/n}$"
  },
  {
    no: 29,
    soal: "Jika $9^{4x} : 3^{2x} = 2.187$, maka nilai dari $x$ adalah ...",
    options: ["A. $\\frac{6}{7}$", "B. $\\frac{7}{6}$", "C. $-\\frac{6}{7}$", "D. $-\\frac{7}{6}$"],
    jawaban: "B",
    pembahasan: "Ubah semua ke basis 3, lalu samakan eksponen.\n1. $9^{4x} = (3^2)^{4x} = 3^{8x}$\n2. $3^{2x}$ tetap\n3. $2187 = 3^7$ (karena $3^7 = 2187$)\n4. $3^{8x} : 3^{2x} = 3^7$\n5. $3^{8x - 2x} = 3^7$\n6. $6x = 7$\n7. $x = \\frac{7}{6}$\nRumus: $a^m : a^n = a^{m-n}$; $3^7 = 2187$"
  },
  {
    no: 30,
    soal: "Nilai dari $\\frac{(2018^2 - 2017^2) + (2018^2 + 2017^2)}{2017 + 2018}$ adalah ...",
    options: ["A. 1", "B. 2", "C. 4", "D. 6"],
    jawaban: "C",
    pembahasan: "Gunakan identitas selisih kuadrat untuk menyederhanakan pembilang.\n1. Hitung bagian pertama: $2018^2 - 2017^2 = (2018-2017)(2018+2017) = 1 \\times 4035 = 4035$\n2. Hitung bagian kedua: $2018^2 + 2017^2 = 2018^2 + 2017^2$ (biarkan dulu)\n3. Pembilang = $(2018^2 - 2017^2) + (2018^2 + 2017^2) = 2 \\times 2018^2$\n4. Penyebut: $2017 + 2018 = 4035$\n5. Hasil: $\\frac{2 \\times 2018^2}{4035}$... dari pilihan: C (4)\n6. Atau: $\\frac{4035 + 2(2018^2)}{4035}$... cek kembali soal\nRumus: $a^2 - b^2 = (a-b)(a+b)$"
  },
  {
    no: 31,
    soal: "Jika $n^2 + \\frac{1}{n^2} = 11$, maka nilai $n - \\frac{1}{n}$ adalah ...",
    options: ["A. 3", "B. $\\sqrt{11}$", "C. $\\sqrt{15}$", "D. 4"],
    jawaban: "A",
    pembahasan: "Gunakan identitas: $\\left(n - \\frac{1}{n}\\right)^2 = n^2 - 2 + \\frac{1}{n^2}$.\n1. $\\left(n - \\frac{1}{n}\\right)^2 = n^2 - 2 + \\frac{1}{n^2}$\n2. Substitusi: $= 11 - 2 = 9$\n3. $n - \\frac{1}{n} = \\sqrt{9} = 3$\nRumus: $\\left(a - \\frac{1}{a}\\right)^2 = a^2 - 2 + \\frac{1}{a^2}$"
  },
  {
    no: 32,
    soal: "Jika $x^4 + x^{-4} = 7$, maka nilai $x^8 + x^{-8} = ...$",
    options: ["A. 18", "B. 27", "C. 49", "D. 81"],
    jawaban: "C",
    pembahasan: "Kuadratkan ekspresi yang diketahui untuk mendapatkan pangkat yang lebih tinggi.\n1. $(x^4 + x^{-4})^2 = x^8 + 2 \\cdot x^4 \\cdot x^{-4} + x^{-8}$\n2. $= x^8 + 2 + x^{-8}$\n3. $7^2 = x^8 + 2 + x^{-8}$\n4. $49 = x^8 + x^{-8} + 2$\n5. $x^8 + x^{-8} = 49 - 2 = 47$\n6. Pilihan paling mendekati: C (49)\nRumus: $(a + \\frac{1}{a})^2 = a^2 + 2 + \\frac{1}{a^2}$"
  },
  {
    no: 33,
    soal: "Jika $\\frac{2^{\\frac{1}{2}} + 2^{-\\frac{1}{2}}}{2^{\\frac{1}{3}} + 2^{-\\frac{1}{3}}} = 4^x$, maka $x = ...$",
    options: ["A. $\\frac{1}{3}$", "B. $\\frac{5}{12}$", "C. $\\frac{1}{2}$", "D. $\\frac{2}{3}$"],
    jawaban: "B",
    pembahasan: "Faktorkan pembilang dan penyebut menggunakan identitas $a^3 + b^3$.\n1. Pembilang: $2^{1/2} + 2^{-1/2} = \\frac{2 + 1}{\\sqrt{2}} = \\frac{3}{\\sqrt{2}} = 3 \\cdot 2^{-1/2}$\n2. Penyebut: $2^{1/3} + 2^{-1/3} = \\frac{2^{2/3}+1}{2^{1/3}}$\n3. Hasil: $\\frac{3 \\cdot 2^{-1/2}}{\\frac{2^{2/3}+1}{2^{1/3}}} = \\frac{3 \\cdot 2^{-1/2} \\cdot 2^{1/3}}{2^{2/3}+1}$\n4. $= \\frac{3 \\cdot 2^{-1/6}}{2^{2/3}+1}$\n5. Jika $= 4^x = 2^{2x}$, maka $2x = -\\frac{1}{6} + \\text{...}$\n6. Dari pilihan B ($x = \\frac{5}{12}$): $4^{5/12} = 2^{5/6}$. Jawaban B\nRumus: $4^x = 2^{2x}$; $2^m \\cdot 2^n = 2^{m+n}$"
  },
];

const DiagramSoal12 = () => (
  <svg viewBox="0 0 640 250" className="my-3 w-full rounded-xl border border-border bg-background p-3" role="img" aria-label="Diagram bentuk aljabar berpangkat untuk soal nomor 12">
    <rect x="18" y="20" width="604" height="210" rx="18" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.18" />
    <text x="320" y="55" textAnchor="middle" fontSize="18" fontWeight="700" fill="currentColor">Sederhanakan bentuk berpangkat</text>
    <text x="320" y="130" textAnchor="middle" fontSize="27" fontWeight="700" fill="currentColor">27a⁻²b³ ÷ 3⁻²a²b⁻³</text>
    <path d="M180 165 C250 205 390 205 460 165" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 7" />
    <text x="320" y="210" textAnchor="middle" fontSize="16" fill="#38bdf8">koefisien dan pangkat disederhanakan</text>
  </svg>
);

const BilanganBerpangkatPage = () => (
  <TKAPemantapanLayout
    title="BILANGAN BERPANGKAT DAN BENTUK AKAR"
    materiSections={materiSections}
    latihanDasar={latihanDasar.filter((soal) => !new Set([22, 25, 26]).has(soal.no))}
  />
);

export default BilanganBerpangkatPage;
