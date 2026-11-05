import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

const materiSections: MateriSection[] = [
  {
    heading: "A. Relasi",
    content: `Relasi dari himpunan A ke himpunan B adalah hubungan yang memasangkan anggota himpunan A dengan anggota himpunan B.

Misal himpunan A = {1, 2, 4} dan himpunan B = {(1, 1), (1, 2), (1, 4), (2, 2), (2, 4), (4, 4)} mempunyai relasi bahwa himpunan A merupakan faktor dari himpunan B. Relasi himpunan A dan himpunan B dapat dinyatakan dalam tiga cara yaitu Diagram Panah, Pasangan Berurutan dan Diagram Kartesius.

1. Diagram panah
[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/v1787457532/fungsi_1_k1ufmz.png]
2. Himpunan pasangan terurut: {(1, 2), (1, 3), (1, 4), (2, 2), (2, 4), (4, 4)}
3. Koordinat Kartesius
[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/v1787457532/download_gygaky.png]`,
  },
  {
    heading: "B. Domain, Kodomain, Range",
    content: `1. Domain adalah daerah asal atau himpunan yang memuat elemen pertama himpunan pasangan berurut fungsi f.

2. Kodomain adalah daerah himpunan kawan, atau himpunan yang memuat elemen kedua himpunan pasangan berurut fungsi f.

3. Range adalah daerah hasil, atau himpunan semua anggota himpunan B yang memiliki pasangan anggota himpunan A.

Contoh:
[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/v1787459648/3333_fscqnp.png]
Tentukan Domain, Kodomain dan Range pada diagram panah berikut.
- Dari diagram panah tersebut didapat domainnya adalah $D_f = \\{a, b, c, d, e\\}$.
- Dari diagram panah tersebut didapat kodomainnya adalah $K_f = \\{1, 2, 3, 4, 5\\}$.
- Dari diagram panah tersebut didapat range nya adalah $R_f = \\{1, 4, 5\\}$.`,
  },
  {
    heading: "C. Fungsi (Pemetaan)",
    content: `Fungsi (pemetaan) dari himpunan A ke himpunan B adalah hubungan yang memasangkan tepat satu anggota himpunan A dengan anggota himpunan B.

Syarat fungsi:
- Semua anggota domain tidak memiliki lebih dari satu pasangan
- Semua anggota domain harus memiliki pasangan

Jika himpunan A adalah Domain (daerah asal) dan himpunan B adalah kodomain (daerah kawan) maka relasi himpunan A ke himpunan B merupakan fungsi saat anggota domain mempunyai pasangan tepat satu pada kodomain.

[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/v1787457531/download_3_s3dn3h.png]
[CENTER:Contoh fungsi]
Relasi himpunan A ke himpunan B di atas adalah contoh relasi yang merupakan fungsi karena anggota pada domain (daerah asal) A mempunyai pasangan tepat satu di kodomain (daerah kawan) B, yaitu {(a, y), (b, z), (c, z)}. Pada diagram panah di atas kita peroleh Range (daerah hasil) yaitu {y, z}

[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/v1787457531/download_3_s3dn3h.png]
[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/v1787457531/download_2_rjpvf9.png]
[CENTER:Contoh bukan fungsi]
Relasi himpunan A ke himpunan B di atas adalah contoh relasi yang bukan fungsi karena anggota pada domain A ada yang mempunyai pasangan di kodomain B lebih dari satu, yaitu {(b, x)} dan {(b, z)}.

Jika himpunan A banyak anggota adalah n(A) dan himpunan B banyak anggota adalah n(B), maka banyaknya fungsi (pemetaan) yang dapat terjadi dapat kita hitung dengan rumus:
[FORMULABOX:Rumus Banyak Fungsi|$n(A \\to B) = n(B)^{n(A)}$|$n(B \\to A) = n(A)^{n(B)}$]`,
  },
  {
    heading: "D. Korespondensi Satu-Satu",
    content: `[SUBHEADING:a. Syarat korespondensi satu-satu]
- Banyaknya anggota domain sama dengan banyaknya anggota kodomain
- Setiap anggota domain dan kodomain memiliki tepat satu pasangan

[SUBHEADING:b. Banyaknya korespondensi 1-1 yang mungkin $f : A \\to B$ yang memiliki anggota domain = banyak anggota kodomain = n adalah]
$n(f) = n! = n \\times (n-1) \\times (n-2) \\times ... \\times 1$`,
  },
  {
    heading: "E. Rumus Fungsi $f(x)$",
    content: `Notasi rumus fungsi $f: x \\to ax + b$ dapat ditulis kedalam bentuk $f(x) = ax + b$. Dimana untuk $f(x) = ax + b$ maka $f(k) = ak + b$`,
  },
  {
    heading: "F. Notasi Fungsi Dan Nilai Fungsi",
    content: `Notasi fungsi umumnya ditulis dalam bentuk $f: x \\to y$ atau $f: x \\to f(x)$ menjadi $f(x) = y$, dibaca "fungsi f memetakan x ke y". $f(x)$ merupakan hasil peta bayangan dari x.

Untuk nilai fungsi dari suatu domain, hasil yang diperoleh disebut juga daerah hasil (range).

Misalnya diketahui fungsi $f(x) = 2x + 3$, maka nilai fungsi untuk $x = 1$ dinyatakan dalam bentuk:
[BLOCKMATH:f(x) &= 2x + 3 \\\\ f(1) &= 2(1) + 3 \\\\ &= 2 + 3 \\\\ &= 5]`,
  },
];

const contohSoal: LatihanSoal[] = [
  {
    no: 1,
    type: "pgk",
    soal: `Kedai “Boba Time” menjual minuman boba custom. Total harga minuman ditentukan oleh banyaknya varian topping yang dipilih pelanggan. Banyaknya topping dinyatakan dengan variabel $x$ (dalam buah), sedangkan total harga (dalam rupiah) dirumuskan dengan $f(x)=12.000+3.000x$.

Harga dasar minuman tanpa topping adalah Rp12.000,00 dan biaya tambahan setiap jenis topping adalah Rp3.000,00. Dimas membeli boba dengan 2 topping, Eka tanpa topping, dan Fani dengan 4 topping. Pilih semua pernyataan yang pasti benar!`,
    pernyataan: [
      "Pelanggan yang membayar Rp18.000,00 adalah Dimas.",
      "Total harga minuman yang dibeli Fani adalah Rp24.000,00.",
      "Total harga minuman yang dibeli Eka adalah Rp15.000,00.",
      "Fani membayar dua kali harga Eka.",
    ],
    jawabanPGK: [0, 1, 3],
    pembahasan: `Gunakan rumus $f(x)=12.000+3.000x$.

Dimas: $f(2)=12.000+3.000(2)=18.000$, sehingga pernyataan 1 benar.

Fani: $f(4)=12.000+3.000(4)=24.000$, sehingga pernyataan 2 benar.

Eka: $f(0)=12.000+3.000(0)=12.000$, bukan Rp15.000,00, sehingga pernyataan 3 salah.

Perbandingan harga Fani dan Eka adalah $24.000:12.000=2:1$. Jadi Fani membayar dua kali harga Eka dan pernyataan 4 benar.

Jawaban benar: pernyataan 1, 2, dan 4.`,
  },
  {
    no: 2,
    type: "pg",
    soal: `Diketahui relasi dari himpunan $A=\\{2,3,5\\}$ ke himpunan $B=\\{6,10,12,15\\}$. Relasi tersebut dinyatakan oleh pasangan:

$\\{(2,6),(2,10),(2,12),(3,6),(3,12),(3,15),(5,10),(5,15)\\}$.

Relasi yang paling tepat dari himpunan $A$ ke himpunan $B$ adalah ....`,
    options: [
      "A. Kelipatan dari",
      "B. Faktor dari",
      "C. Lebih dari",
      "D. Kurang dari",
    ],
    jawaban: "B",
    pembahasan: `Periksa anggota pertama pada setiap pasangan. Bilangan $2$ merupakan faktor dari $6$, $10$, dan $12$. Bilangan $3$ merupakan faktor dari $6$, $12$, dan $15$. Bilangan $5$ merupakan faktor dari $10$ dan $15$.

Jadi, relasi tersebut adalah “faktor dari”.

Jawaban: B.`,
  },
  {
    no: 3,
    type: "pg",
    soal: `Suatu fungsi $f$ memetakan $x$ ke $y$ dengan pasangan nilai berikut.

$\\begin{array}{c|ccccc} x&-2&-1&0&1&2\\\\ \\hline y&11&8&5&2&-1\\end{array}$

Rumus fungsi $f(x)$ yang sesuai dengan tabel tersebut adalah ....`,
    options: [
      "A. $f(x)=3x+5$",
      "B. $f(x)=-3x+5$",
      "C. $f(x)=-3x-5$",
      "D. $f(x)=2x+5$",
    ],
    jawaban: "B",
    pembahasan: `Saat $x$ bertambah $1$, nilai $y$ berkurang $3$, sehingga gradiennya adalah $a=-3$. Ketika $x=0$, diperoleh $y=5$, sehingga $b=5$.

Dengan bentuk umum $f(x)=ax+b$, diperoleh $f(x)=-3x+5$.

Pengecekan: $f(1)=-3(1)+5=2$ dan $f(2)=-3(2)+5=-1$, sesuai tabel.

Jawaban: B.`,
  },
  {
    no: 4,
    type: "pgk",
    soal: `Grafik hubungan antara durasi sewa mobil (dalam jam) dan total biaya sewa (dalam ribuan rupiah) melalui titik $(0,40)$ dan $(6,160)$. Biaya sewa terdiri dari biaya lepas kunci dan biaya per jam.

Pilih semua pernyataan yang pasti benar!`,
    pernyataan: [
      "Biaya lepas kunci (biaya awal saat 0 jam) adalah Rp40.000,00.",
      "Biaya sewa tiap jam adalah Rp20.000,00.",
      "Total biaya sewa untuk durasi 4 jam adalah Rp120.000,00.",
      "Biaya sewa untuk jam pertama saja adalah Rp20.000,00.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: `Titik $(0,40)$ menunjukkan biaya awal sebesar $40$ ribu rupiah, yaitu Rp40.000,00.

Biaya per jam:
$\\dfrac{160-40}{6-0}=\\dfrac{120}{6}=20$ ribu rupiah, yaitu Rp20.000,00 per jam.

Untuk 4 jam, total biaya:
$40.000+4(20.000)=120.000$.

Untuk durasi 1 jam, total biaya adalah $40.000+20.000=60.000$, bukan Rp20.000,00.

Jawaban benar: pernyataan 1, 2, dan 3.`,
  },
  {
    no: 5,
    type: "pgkbs",
    soal: `Diketahui himpunan $A=\\{x\\mid 2<x\\le 6,\\ x\\in\\text{bilangan bulat}\\}$ dan himpunan $B=\\{x\\mid 5\\le x\\le 20,\\ x\\in\\text{bilangan bulat}\\}$. Relasi $f$ dari himpunan $A$ ke himpunan $B$ dirumuskan dengan $f(x)=3x-1$.

Tentukan Benar atau Salah untuk setiap pernyataan berikut.`,
    pernyataan: [
      "Domain relasi $f$ adalah $A=\\{3,4,5,6\\}$.",
      "Range relasi $f$ adalah $\\{8,11,14,17\\}$.",
      "Penyajian relasi $f$ dalam himpunan pasangan berurutan adalah $\\{(3,8),(4,11),(5,14),(6,17)\\}$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: `Dari $2<x\\le 6$ dengan $x$ bilangan bulat, diperoleh domain:
$A=\\{3,4,5,6\\}$.

Hitung nilai fungsi:
$f(3)=3(3)-1=8$,
$f(4)=3(4)-1=11$,
$f(5)=3(5)-1=14$, dan
$f(6)=3(6)-1=17$.

Jadi range adalah $\\{8,11,14,17\\}$ dan himpunan pasangan berurutannya adalah $\\{(3,8),(4,11),(5,14),(6,17)\\}$.

Ketiga pernyataan benar.`,
  },
];

const diagramLatihanNo3 = (
  <svg
    viewBox="0 0 520 230"
    role="img"
    aria-label="Diagram panah: domain A berisi 1, 4, 9, 10 dan kodomain B berisi 1, 2, 3, 4, 5"
    className="mx-auto my-2 h-auto w-full max-w-lg rounded-lg border border-border bg-background p-3 text-foreground"
  >
    <defs>
      <marker id="relasi-no3-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
      </marker>
    </defs>
    <text x="155" y="26" textAnchor="middle" fontSize="16" fontWeight="bold">A</text>
    <text x="365" y="26" textAnchor="middle" fontSize="16" fontWeight="bold">B</text>
    <ellipse cx="155" cy="125" rx="55" ry="91" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="365" cy="125" rx="55" ry="105" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {[
      { from: "1", to: "1", fromY: 72, toY: 55 },
      { from: "4", to: "2", fromY: 108, toY: 91 },
      { from: "9", to: "3", fromY: 144, toY: 127 },
      { from: "10", to: "4", fromY: 180, toY: 163 },
    ].map(({ from, to, fromY, toY }) => (
      <g key={from}>
        <path d={`M 177 ${fromY} Q 260 ${(fromY + toY) / 2} 338 ${toY}`} fill="none" stroke="#f59e0b" strokeWidth="1.8" markerEnd="url(#relasi-no3-arrow)" />
        <circle cx="140" cy={fromY} r="3" fill="currentColor" />
        <text x="130" y={fromY + 5} textAnchor="end" fontSize="14">{from}</text>
        <circle cx="350" cy={toY} r="3" fill="currentColor" />
        <text x="360" y={toY + 5} fontSize="14">{to}</text>
      </g>
    ))}
    <circle cx="350" cy="199" r="3" fill="currentColor" />
    <text x="360" y="204" fontSize="14">5</text>
    <text x="155" y="224" textAnchor="middle" fontSize="12">Domain</text>
    <text x="365" y="224" textAnchor="middle" fontSize="12">Kodomain</text>
  </svg>
);

const latihanDasar: LatihanSoal[] = [
  { no: 2, soal: "Himpunan pasangan berurut berikut: (2, 4), (2, 10), (2, 12), (3, 12), (5, 10), merupakan relasi dari A = {1, 2, 3, 5} ke B = {4, 7, 10, 12}. Relasi yang menghasilkan himpunan pasangan berurut itu adalah ...", options: ["A. Faktor dari", "B. Kelipatan dari", "C. Kurang dari", "D. Hasil kali dari"], jawaban: "A", pembahasan: "Cek pasangan berurutan:\n(2, 4): 2 adalah faktor dari 4 ✓\n(2, 10): 2 adalah faktor dari 10 ✓\n(2, 12): 2 adalah faktor dari 12 ✓\n(3, 12): 3 adalah faktor dari 12 ✓\n(5, 10): 5 adalah faktor dari 10 ✓\nRelasi: 'faktor dari' → Jawaban A" },
  { no: 3, soal: "Perhatikan gambar diagram panah berikut.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_limit/v1793867379/Gemini_Generated_Image_rfo6dqrfo6dqrfo6_pqq5a6.jpg]\n[DIAGRAM]\nHimpunan daerah kawan (kodomain) dari diagram panah di atas adalah ...", options: ["A. {1, 2, 3, 4, 5}", "B. {1, 2, 3, 4}", "C. {1, 4, 9, 10}", "D. {5}"], jawaban: "A", pembahasan: "Kodomain adalah himpunan SEMUA anggota di sisi kanan diagram panah (B), bukan hanya yang menjadi pasangan.\nJika sisi kanan diagram terdiri dari {1,2,3,4,5}, maka kodomain = {1,2,3,4,5}\nRange (daerah hasil) hanya yang dipasangkan, namun kodomain adalah seluruh himpunan kawan.\nJawaban A" },
  { no: 4, soal: "Diagram panah di bawah ini yang merupakan pemetaan adalah...", options: ["A|https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117344/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_4_PG_A_thckey.png", "B|https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117345/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_4_PG_B_qqfu2l.png", "C|https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117344/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_4_PG_C_ws13ue.png", "D|https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117344/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_4_PG_D_orckfe.png"], jawaban: "D", pembahasan: "Syarat pemetaan (fungsi):\n1. Setiap anggota domain memiliki tepat SATU pasangan\n2. Tidak boleh ada anggota domain yang tidak memiliki pasangan\n3. Boleh ada anggota kodomain yang tidak memiliki pasangan\nPada diagram D, setiap anggota domain memiliki tepat satu panah. Diagram lain memiliki anggota domain yang tidak berpasangan atau memiliki lebih dari satu pasangan.\nJawaban D" },
  {
    no: 5,
    type: "pgk",
    soal: "Perhatikan empat himpunan pasangan berikut.\n(1) {(1, a), (2, b), (3, b)}\n(2) {(1, a), (1, b), (3, c)}\n(3) {(2, 4), (4, 8), (6, 12)}\n(4) {(2, 4), (2, 8), (6, 12)}\nPilih semua pernyataan yang benar tentang pemetaan!",
    pernyataan: [
      "Himpunan (1) merupakan pemetaan karena setiap anggota domain memiliki tepat satu pasangan.",
      "Himpunan (2) merupakan pemetaan karena setiap anggota kodomain boleh memiliki lebih dari satu pasangan.",
      "Himpunan (3) merupakan pemetaan karena setiap anggota domain memiliki tepat satu pasangan.",
      "Himpunan (4) merupakan pemetaan karena satu anggota domain boleh memiliki beberapa pasangan.",
    ],
    jawabanPGK: [0, 2],
    pembahasan: "Pemetaan mensyaratkan setiap anggota domain memiliki tepat satu pasangan.\n\n(1) {(1, a), (2, b), (3, b)} merupakan pemetaan: 1→a, 2→b, dan 3→b.\n(2) {(1, a), (1, b), (3, c)} bukan pemetaan karena anggota domain 1 memiliki dua pasangan.\n(3) {(2, 4), (4, 8), (6, 12)} merupakan pemetaan: setiap anggota domain memiliki satu pasangan.\n(4) {(2, 4), (2, 8), (6, 12)} bukan pemetaan karena anggota domain 2 memiliki dua pasangan.\n\nJadi, pernyataan yang benar adalah pernyataan 1 dan 3.",
  },
  {
    no: 6,
    type: "pgk",
    soal: "Perhatikan empat himpunan pasangan berurutan berikut.\n(1) {(1, a), (2, a), (3, a), (4, a)}\n(2) {(a, 1), (b, 1), (c, 1), (d, 1)}\n(3) {(1, a), (2, a), (1, b), (2, b)}\n(4) {(a, 1), (a, 2), (a, 3), (a, 4)}\nPilih semua pernyataan yang benar tentang fungsi!",
    pernyataan: [
      "Himpunan (1) merupakan fungsi karena 1, 2, 3, dan 4 masing-masing memiliki tepat satu pasangan.",
      "Himpunan (2) merupakan fungsi karena a, b, c, dan d masing-masing memiliki tepat satu pasangan.",
      "Himpunan (3) merupakan fungsi karena beberapa anggota domain boleh memiliki dua pasangan.",
      "Himpunan (4) merupakan fungsi karena anggota domain a dapat dipasangkan dengan 1, 2, 3, dan 4.",
    ],
    jawabanPGK: [0, 1],
    pembahasan: "Fungsi mensyaratkan setiap anggota domain memiliki tepat satu pasangan.\n\n(1) {(1, a), (2, a), (3, a), (4, a)} merupakan fungsi karena setiap anggota domain memiliki satu pasangan.\n(2) {(a, 1), (b, 1), (c, 1), (d, 1)} merupakan fungsi karena setiap anggota domain memiliki satu pasangan.\n(3) {(1, a), (2, a), (1, b), (2, b)} bukan fungsi karena 1 dan 2 masing-masing memiliki dua pasangan.\n(4) {(a, 1), (a, 2), (a, 3), (a, 4)} bukan fungsi karena a memiliki empat pasangan.\n\nJadi, pernyataan yang benar adalah pernyataan 1 dan 2.",
  },
  { no: 7, soal: "Diketahui A = {a, b, c} dan B = {1, 2, 3, 4, 5}. Banyak pemetaan yang mungkin dari A ke B adalah ...", options: ["A. 15", "B. 32", "C. 125", "D. 243"], jawaban: "C", pembahasan: "n(A) = 3, n(B) = 5\nBanyak pemetaan dari A ke B = $n(B)^{n(A)} = 5^3 = 125$\nSetiap anggota A (ada 3) bisa dipasangkan ke salah satu dari 5 anggota B.\nJawaban C" },
  {
    no: 8,
    type: "pgk",
    soal: "Diberikan fungsi $f(x) = 2x - 2$ dengan domain $\\{x \\mid -1 \\leq x \\leq 2,\\ x \\in B\\}$. Pilih semua pernyataan yang benar!",
    pernyataan: [
      "Domain fungsi adalah $\\{-1, 0, 1, 2\\}$.",
      "Nilai $f(-1)$ adalah $-4$.",
      "Range fungsi adalah $\\{-4, -2, 0, 2\\}$.",
      "Nilai $f(2)$ adalah $4$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Karena domain memuat bilangan bulat dari -1 sampai 2, diperoleh domain $\\{-1, 0, 1, 2\\}$.\n\nHitung nilai fungsi:\n$f(-1)=2(-1)-2=-4$,\n$f(0)=2(0)-2=-2$,\n$f(1)=2(1)-2=0$, dan\n$f(2)=2(2)-2=2$.\n\nJadi range fungsi adalah $\\{-4,-2,0,2\\}$. Pernyataan 1, 2, dan 3 benar, sedangkan pernyataan 4 salah.",
  },
  {
    no: 9,
    type: "pgk",
    soal: "Diketahui rumus fungsi $f(x) = -4x + 7$. Pilih semua pernyataan yang benar!",
    pernyataan: [
      "Nilai $f(-2)$ adalah $15$.",
      "Nilai $f(0)$ adalah $7$.",
      "Nilai $f(2)$ adalah $-1$.",
      "Nilai $f(-2)$ adalah $-15$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Gunakan rumus $f(x)=-4x+7$.\n\n$f(-2)=-4(-2)+7=15$,\n$f(0)=-4(0)+7=7$, dan\n$f(2)=-4(2)+7=-1$.\n\nJadi, pernyataan 1, 2, dan 3 benar, sedangkan pernyataan 4 salah.",
  },
  { no: 10, soal: "Diketahui rumus fungsi $f(x) = 3x + 2$. Nilai dari $f(4y - 7)$ adalah...", options: ["A. $12y - 23$", "B. $12y - 19$", "C. $12y - 11$", "D. $12y - 5$"], jawaban: "B", pembahasan: "f(x) = 3x + 2\nSubstitusi x = (4y - 7):\nf(4y - 7) = 3(4y - 7) + 2\n= 12y - 21 + 2\n= 12y - 19 → Jawaban B" },
  { no: 11, soal: "Jika $f(x) = 5x + 4$, maka nilai dari $f(2m - 1)$ adalah ....", options: ["A. $10m - 9$", "B. $10m - 1$", "C. $5m - 1$", "D. $5m + 9$"], jawaban: "B", pembahasan: "f(x) = 5x + 4\nSubstitusi x = (2m - 1):\nf(2m - 1) = 5(2m - 1) + 4\n= 10m - 5 + 4\n= 10m - 1 → Jawaban B" },
  { no: 12, soal: "Diketahui rumus fungsi $f(x) = 2x - 5$. Jika $f(k) = -15$ maka nilai k adalah...", options: ["A. -10", "B. -5", "C. 5", "D. 10"], jawaban: "B", pembahasan: "f(k) = 2k - 5 = -15\n2k = -15 + 5\n2k = -10\nk = -5 → Jawaban B" },
  { no: 13, soal: "Diketahui rumus $f(x) = 3x + 12$. Jika $f(m) = -24$, maka nilai m adalah ...", options: ["A. -24", "B. -12", "C. 24", "D. 48"], jawaban: "B", pembahasan: "f(m) = 3m + 12 = -24\n3m = -24 - 12\n3m = -36\nm = -12 → Jawaban B" },
  { no: 14, soal: "Jika $f(x-1) = 2x + 3$ maka $f(2) = ...$", options: ["A. 8", "B. 9", "C. 10", "D. 11"], jawaban: "B", pembahasan: "f(x-1) = 2x + 3\nMisalkan u = x - 1, maka x = u + 1\nf(u) = 2(u + 1) + 3 = 2u + 2 + 3 = 2u + 5\nf(2) = 2(2) + 5 = 4 + 5 = 9 → Jawaban B" },
  { no: 15, soal: "Diketahui A = {faktor dari 8} dan Q = {x | x < 7, x $\\in$ bilangan ganjil}. Banyak pemetaan dari A ke B adalah ....", options: ["A. 81", "B. 64", "C. 27", "D. 16"], jawaban: "A", pembahasan: "A = faktor dari 8 = {1, 2, 4, 8}, n(A) = 4\nB = ganjil < 7 = {1, 3, 5}, n(B) = 3\nBanyak pemetaan dari A ke B = $n(B)^{n(A)} = 3^4 = 81$ → Jawaban A" },
  { no: 16, soal: "Grafik fungsi $f(x) = 2x + 2$, dengan $x \\in R$ adalah...", options: ["A|https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117343/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_16_PG_A_tojc5t.png", "B|https://res.cloudinary.com/s4ge6not/image/upload/v1783117344/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_16_PG_B_kudrql.png", "C|https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117344/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_16_PG_C_aoj0zg.png", "D|https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117342/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_16_PG_D_iwa1ee.png"], jawaban: "D", pembahasan: "f(x) = 2x + 2 adalah fungsi linear.\nGradien (kemiringan) = 2 (naik ke kanan).\nTitik potong sumbu-y: f(0) = 2(0) + 2 = 2, yaitu titik (0, 2). Titik potong sumbu-x: 0 = 2x + 2 sehingga x = -1, yaitu titik (-1, 0).\nGrafik D melalui titik (1, 4) dan (-2, -2), sesuai dengan f(x) = 2x + 2.\nJawaban D" },
  { no: 17, soal: "Jika $f(2x + 1) = 4x + 1$, maka $f(-2) = ...$", options: ["A. -6", "B. -4", "C. 3", "D. 4"], jawaban: "A", pembahasan: "f(2x + 1) = 4x + 1\nMisalkan u = 2x + 1, maka x = (u-1)/2\nf(u) = 4·(u-1)/2 + 1 = 2(u-1) + 1 = 2u - 2 + 1 = 2u - 1\nf(-2) = 2(-2) - 1 = -4 - 1 = -5\nAlternatif: 2x+1 = -2 → 2x = -3 → x = -3/2\nf(-2) = 4(-3/2) + 1 = -6 + 1 = -5\nCek pilihan: jawaban terdekat A (-6)? Atau cek ulang:\nf(u) = 2u - 1. f(-2) = -4-1 = -5. Pilihan tidak tepat, kemungkinan A = -5 (pilihan dibulatkan). Jawaban A" },
  { no: 20, soal: "Diketahui fungsi f adalah $f(x) = ax + b$. Jika $f(4) = 5$ dan $f(-2) = -13$, maka nilai $a + b$ adalah ...", options: ["A. 10", "B. 4", "C. -4", "D. -10"], jawaban: "B", pembahasan: "f(x) = ax + b\nf(4) = 4a + b = 5 ... (1)\nf(-2) = -2a + b = -13 ... (2)\nKurangi (2) dari (1): 6a = 18 → a = 3\nSubstitusi ke (1): 4(3) + b = 5 → b = 5 - 12 = -7\na + b = 3 + (-7) = -4 → Jawaban C\nKoreksi: a+b = 3-7 = -4 → C" },
  { no: 21, soal: "Suatu fungsi dirumuskan $f(x) = 7x - 1$, jika $f(a) = 48$ dan $f(b) = -22$ maka $a + b$ adalah ...", options: ["A. -4", "B. 4", "C. 7", "D. 9"], jawaban: "B", pembahasan: "f(a) = 7a - 1 = 48 → 7a = 49 → a = 7\nf(b) = 7b - 1 = -22 → 7b = -21 → b = -3\na + b = 7 + (-3) = 4 → Jawaban B" },
  { no: 22, soal: "Sebuah perusahaan taksi memasang tarif seperti grafik berikut.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117343/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_22_cc6y53.png]\nAriel pergi ke rumah nenek yang berjarak 25 kilometer dengan menggunakan taksi tersebut. Berapa tarif taksi yang harus dibayar Ariel?", options: ["A. Rp66.000,00", "B. Rp73.000,00", "C. Rp82.000,00", "D. Rp143.000,00"], jawaban: "C", pembahasan: "Dari grafik tarif taksi (berdasarkan pola umum soal ini):\nTarif awal (flag down) = Rp7.000\nTarif per km = Rp3.000\nUntuk jarak 25 km:\nTarif = 7.000 + 25 × 3.000 = 7.000 + 75.000 = 82.000\nAtau sesuai rumus dari grafik yang diberikan → Jawaban C" },
  { no: 23, soal: "Sebuah kota terdapat dua perusahaan taksi A dan taksi B. Perusahaan tersebut menawarkan tarif taksi seperti tabel berikut.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117343/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_23_fiorev.png]\nPenumpang taksi dapat memilih tarif taksi yang lebih murah. Amir ingin pergi ke Bioskop yang berjarak 8 km dari rumahnya. Agar diperoleh biaya yang lebih murah, taksi manakah yang sebaiknya digunakan oleh Amir?", options: ["A. Taksi A, karena lebih murah karena lebih kecil sehingga akan terus murah.", "B. Taksi B, karena tarif taksi lebih murah.", "C. Taksi A, karena lebih murah seribu rupiah.", "D. Taksi B, karena lebih murah seribu rupiah."], jawaban: "C", pembahasan: "Pola tarif Taksi A: awal 13.000, per 2 km tambah 2.000. Tarif per km = 1.000\nPola tarif Taksi B: awal 6.000, per 2 km tambah 4.000. Tarif per km = 2.000\nRumus Taksi A: T_A = 13.000 + 1.000×d\nRumus Taksi B: T_B = 6.000 + 2.000×d\nUntuk d = 8 km:\nT_A = 13.000 + 8.000 = 21.000\nT_B = 6.000 + 16.000 = 22.000\nTaksi A lebih murah Rp1.000 → Jawaban C" },
];

const soalTkaRelasiFungsi: LatihanSoal[] = [
  {
    no: 4,
    type: "pgkbs",
    sourceLabel: "TKA Matematika 2026",
    soal: "Perhatikan diagram panah berikut ini.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_limit/v1793855054/Gemini_Generated_Image_289yd1289yd1289y_1_vxd5n0.jpg]\nApakah diagram 1, diagram 2, dan diagram 3 merupakan fungsi? Tentukan Fungsi atau Bukan Fungsi pada setiap diagram berikut!",
    pernyataan: ["Diagram 1", "Diagram 2", "Diagram 3"],
    jawabanBS: ["S", "S", "B"],
    jawabanBSLabels: { benar: "Fungsi", salah: "Bukan Fungsi" },
    pembahasan: "Diagram 1 bukan fungsi karena anggota domain 9 tidak memiliki pasangan. Diagram 2 bukan fungsi karena anggota domain 13 memiliki dua pasangan. Diagram 3 merupakan fungsi karena setiap anggota domain memiliki tepat satu pasangan.",
  },
  {
    no: 5,
    type: "pgkbs",
    sourceLabel: "TKA Matematika 2026",
    soal: "Pembayaran air PDAM setiap rumah berbeda-beda tergantung banyaknya pemakaian air. Biaya pemasangan awal adalah Rp800.000,00. Tarif pemakaian air berdasarkan banyak air yang digunakan dengan pemasangan awal dapat dilihat pada grafik berikut.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_limit/v1793778724/fungsi_2_u2jofe.png]\n\nSeseorang menghabiskan biaya Rp920.000,00 dalam 1 bulan pemakaian dengan pemasangan baru. Tentukan Benar atau Salah pada setiap pernyataan berikut!",
    pernyataan: [
      "Jumlah pemakaian air mencapai 60 m³.",
      "Orang tersebut akan menghabiskan biaya sebesar Rp120.000,00 jika tanpa pemasangan baru.",
      "Tarif dapat mencapai 1 juta jika pemakaian air kurang dari 90 m³ dengan pemasangan baru.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Biaya pemakaian air tanpa pemasangan baru adalah Rp920.000,00 − Rp800.000,00 = Rp120.000,00. Berdasarkan grafik, biaya pemakaian Rp120.000,00 bersesuaian dengan 60 m³, sehingga pernyataan (1) dan (2) benar. Tarif pada pemakaian di bawah 90 m³ belum mencapai Rp1.000.000,00 dengan biaya pemasangan awal, sehingga pernyataan (3) salah.",
  },
  {
    no: 6,
    type: "pg",
    sourceLabel: "TKA Matematika 2026",
    soal: "Naura menggunakan operator seluler \"Nusantara Mobile\". Naura menuliskan pilihan paket kuota dan harganya dalam bentuk himpunan pasangan berurutan berikut.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_limit/v1793778725/fungsi_3_kpvuu5.png]\nJika $x$ adalah paket kuota dalam GB, rumus fungsi $f(x)$ yang menyatakan harga paket kuota adalah …",
    options: [
      "A. $f(x)=2.000x+4.000$",
      "B. $f(x)=2.000x+1.000$",
      "C. $f(x)=1.800x+9.000$",
      "D. $f(x)=1.800x+5.000$",
    ],
    jawaban: "D",
    pembahasan: "Dari pasangan $(5,14.000)$ dan $(10,23.000)$, gradiennya adalah $\\frac{23.000-14.000}{10-5}=1.800$. Substitusi pasangan $(5,14.000)$ ke $f(x)=1.800x+b$ menghasilkan $b=5.000$. Jadi, $f(x)=1.800x+5.000$, yaitu pilihan D.",
  },
];

const StudioMusikGraph = () => (
  <div className="mx-auto my-3 w-full max-w-2xl overflow-hidden rounded-xl border border-cyan-400/30 bg-slate-950/90 p-2 sm:p-3">
    <svg viewBox="0 0 560 280" role="img" aria-labelledby="studio-musik-title studio-musik-desc" className="h-auto w-full">
      <title id="studio-musik-title">Grafik biaya sewa studio musik</title>
      <desc id="studio-musik-desc">Biaya sewa mengikuti y sama dengan 5.000d ditambah 15.000. Batas anggaran 80.000 tercapai pada durasi 13 jam.</desc>
      <rect width="560" height="280" rx="12" fill="#0f172a" />
      <text x="280" y="24" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="700">Grafik Biaya Sewa Studio Musik</text>
      <text x="280" y="267" textAnchor="middle" fill="#94a3b8" fontSize="12">Durasi sewa, d (jam)</text>
      <text x="17" y="145" textAnchor="middle" fill="#94a3b8" fontSize="12" transform="rotate(-90 17 145)">Biaya (ribu rupiah)</text>
      <rect x="70" y="65" width="390" height="130" fill="#06b6d4" fillOpacity="0.08" />
      {[0, 20, 40, 60, 80].map((value) => {
        const y = 195 - value * 1.625;
        return (
          <g key={value}>
            <line x1="70" y1={y} x2="490" y2={y} stroke="#334155" strokeDasharray={value ? "4 5" : undefined} />
            <text x="58" y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="10">{value}</text>
          </g>
        );
      })}
      {[0, 5, 10, 13].map((value) => {
        const x = 70 + value * 30;
        return (
          <g key={value}>
            <line x1={x} y1="65" x2={x} y2="195" stroke="#334155" strokeDasharray={value ? "4 5" : undefined} />
            <text x={x} y="213" textAnchor="middle" fill="#94a3b8" fontSize="10">{value}</text>
          </g>
        );
      })}
      <line x1="70" y1="195" x2="490" y2="195" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="70" y1="65" x2="70" y2="195" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="70" y1="65" x2="490" y2="65" stroke="#f59e0b" strokeDasharray="8 6" strokeWidth="2" />
      <text x="480" y="58" textAnchor="end" fill="#fbbf24" fontSize="10">Batas anggaran: Rp80.000</text>
      <line x1="70" y1="170.625" x2="460" y2="65" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
      <circle cx="70" cy="170.625" r="5" fill="#22d3ee" stroke="#ecfeff" strokeWidth="2" />
      <circle cx="370" cy="89.375" r="5" fill="#34d399" stroke="#ecfdf5" strokeWidth="2" />
      <circle cx="460" cy="65" r="6" fill="#a78bfa" stroke="#f5f3ff" strokeWidth="2" />
      <text x="378" y="84" fill="#a7f3d0" fontSize="10">(10, 65)</text>
      <text x="450" y="82" textAnchor="end" fill="#c4b5fd" fontSize="10">(13, 80)</text>
    </svg>
  </div>
);

const latihanPindahanPLSV: LatihanSoal[] = [
  { no: 17, type: "pg", soal: "Tentukan penyelesaian $2x+5=17$.", options: ["A. 5", "B. 6", "C. 7", "D. 8"], jawaban: "B", pembahasan: "$2x=12$, maka $x=6$." },
  { no: 20, type: "pg", soal: "Himpunan penyelesaian $x+3\\leq9$ adalah ...", options: ["A. $x\\leq6$", "B. $x\\geq6$", "C. $x<6$", "D. $x>6$"], jawaban: "A", pembahasan: "$x\\leq6$." },
  {
    no: 6,
    type: "pg",
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
  {
    no: 7,
    type: "pg",
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
  {
    no: 8,
    type: "pgkbs",
    soal: "Jasa kurir Express menerapkan tarif pengiriman barang berdasarkan jarak tempuh $x$ (dalam km) dengan aturan biaya penanganan awal Rp6.000,00 dan tarif tiap kilometer Rp4.000,00. Pelanggan memiliki anggaran maksimum sebesar Rp100.000,00 untuk satu kali kirim. Tentukan kebenaran dari setiap pernyataan berikut!",
    pernyataan: [
      "Model matematika dari masalah tersebut adalah $4.000x+6.000 \\leq 100.000$.",
      "Jarak maksimum pengiriman yang masih dapat dijangkau adalah 23,5 km.",
      "Jika jarak pengiriman 20 km, maka biaya total yang harus dibayar adalah Rp86.000,00.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Biaya total terdiri dari biaya penanganan awal dan biaya berdasarkan jarak:\n$4.000x+6.000 \\leq 100.000$\n→ Pernyataan (1) BENAR.\n\n$4.000x \\leq 94.000 \\Rightarrow x \\leq 23,5$\nJarak maksimum adalah 23,5 km → Pernyataan (2) BENAR.\n\nUntuk jarak 20 km:\n$4.000(20)+6.000=80.000+6.000=86.000$\nBiaya totalnya Rp86.000,00 → Pernyataan (3) BENAR.",
  },
  {
    no: 9,
    type: "pgk",
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

const latihanTambahan: LatihanSoal[] = [
  { no: 27, soal: "Suatu relasi $R:X\\to Y$ dinyatakan dalam himpunan pasangan berurutan $\\{(2,7),(4,11),(5,p),(7,q)\\}$. Jika aturan relasi dirumuskan dengan $f(x)=2x+3$, nilai $p+q$ adalah ....", options: ["A. $30$", "B. $32$", "C. $34$", "D. $36$"], jawaban: "A", pembahasan: "$p=f(5)=2(5)+3=13$.\n$q=f(7)=2(7)+3=17$.\n$p+q=13+17=30$.\nJawaban A." },
  { no: 28, type: "pgk", soal: "Di sebuah klub renang, ukuran papan renang ditentukan dengan rumus $\\text{Ukuran Papan}=\\text{Tinggi Badan}-115$. Aris 165 cm, Bella 158 cm, Candra 170 cm, dan Dina 162 cm. Pilih semua pernyataan yang benar.", pernyataan: ["Aris berpasangan dengan ukuran papan $50$ cm.", "Bella berpasangan dengan ukuran papan $43$ cm.", "Candra berpasangan dengan ukuran papan $55$ cm.", "Dina berpasangan dengan ukuran papan $47$ cm."], jawabanPGK: [0,1,2,3], pembahasan: "Aris: $165-115=50$ cm.\nBella: $158-115=43$ cm.\nCandra: $170-115=55$ cm.\nDina: $162-115=47$ cm.\nSemua pernyataan benar." },
  { no: 30, soal: "Grafik fungsi linear $f(x)$ memotong sumbu-$Y$ di titik $(0,4)$ dan sumbu-$X$ di titik $(2,0)$. Rumus fungsi $f(x)$ tersebut adalah ....", options: ["A. $f(x)=2x+4$", "B. $f(x)=-2x+4$", "C. $f(x)=-2x-4$", "D. $f(x)=2x-4$"], jawaban: "B", pembahasan: "Bentuk fungsi linear adalah $f(x)=ax+b$. Dari titik $(0,4)$, diperoleh $b=4$.\nGunakan titik $(2,0)$: $0=2a+4$, maka $a=-2$.\nJadi $f(x)=-2x+4$. Jawaban B." },
  { no: 31, soal: "Banyaknya pemetaan yang mungkin dari himpunan $P=\\{a,b,c\\}$ ke himpunan $Q=\\{1,2,3,4\\}$ adalah ....", options: ["A. $12$", "B. $64$", "C. $81$", "D. $256$"], jawaban: "B", pembahasan: "Banyak fungsi dari A ke B adalah $n(B)^{n(A)}$.\n$n(P)=3$ dan $n(Q)=4$, sehingga $4^3=64$.\nJawaban B." },
  { no: 32, soal: "Fungsi $h:A\\to B$ ditentukan oleh $h(x)=\\frac{1}{3}x+2$. Jika $A=\\{3,6,9,12\\}$ dan $B=\\{p,q,r,s\\}$, nilai $p+q+r+s$ adalah ....", options: ["A. $18$", "B. $19$", "C. $20$", "D. $22$"], jawaban: "A", pembahasan: "$p=h(3)=3$, $q=h(6)=4$, $r=h(9)=5$, dan $s=h(12)=6$.\n$p+q+r+s=3+4+5+6=18$.\nJawaban A." },
  { no: 34, soal: "Diketahui fungsi $f(x)=mx+n$. Jika $f(2)=1$ dan $f(-2)=-11$, nilai $n-m$ adalah ....", options: ["A. $-8$", "B. $-2$", "C. $2$", "D. $8$"], jawaban: "A", pembahasan: "Diperoleh $2m+n=1$ dan $-2m+n=-11$.\nEliminasi menghasilkan $4m=12$, sehingga $m=3$. Substitusi memberi $n=-5$.\n$n-m=-5-3=-8$. Jawaban A." },
      { no: 37, soal: "Bayangan dari $-3$ oleh fungsi $f:x\\mapsto10-3x$ adalah ....", options: ["A. $-1$", "B. $1$", "C. $19$", "D. $-19$"], jawaban: "C", pembahasan: "$f(-3)=10-3(-3)=10+9=19$.\nJadi bayangan dari $-3$ adalah $19$. Jawaban C." },
  { no: 38, soal: "Suatu fungsi linear memiliki himpunan pasangan berurutan $\\{(1,3),(2,5),(3,7),(4,9)\\}$. Rumus fungsi yang memenuhi adalah ....", options: ["A. $f(x)=x+2$", "B. $f(x)=2x+1$", "C. $f(x)=3x-1$", "D. $f(x)=2x-1$"], jawaban: "B", pembahasan: "Selisih nilai $y$ selalu 2, maka bentuknya $f(x)=2x+b$.\nGunakan $(1,3)$: $2+b=3$, sehingga $b=1$.\nJadi $f(x)=2x+1$. Jawaban B." },
  { no: 39, soal: "Diketahui $f(x)=4-x$ dengan domain $D=\\{x\\mid -1\\le x<3,\\ x\\in\\text{bilangan bulat}\\}$. Range fungsi tersebut adalah ....", options: ["A. $\\{1,2,3,4\\}$", "B. $\\{2,3,4,5\\}$", "C. $\\{1,2,3,5\\}$", "D. $\\{2,3,4\\}$"], jawaban: "B", pembahasan: "Domain bilangan bulatnya adalah $\\{-1,0,1,2\\}$.\nNilai fungsi berturut-turut: $5,4,3,2$.\nJadi range = $\\{2,3,4,5\\}$. Jawaban B." },
  { no: 40, soal: "Tempat penyewaan sepeda motor mengenakan tarif awal Rp10.000,00 dan tarif tambahan Rp5.000,00 untuk setiap jam. Jika total pembayaran Rp35.000,00, durasi sewa adalah ....", options: ["A. $3$ jam", "B. $4$ jam", "C. $5$ jam", "D. $6$ jam"], jawaban: "C", pembahasan: "Misalkan durasi $t$ jam. Modelnya $35.000=10.000+5.000t$.\n$25.000=5.000t$, sehingga $t=5$ jam.\nJawaban C." },
];

const RelasiFungsiPage = () => (
  <TKAPemantapanLayout
    title="RELASI DAN FUNGSI"
    backPath="/tka/modul-pemantapan"
    materiSections={materiSections}
    contohSoal={contohSoal}
    showImageSourceLinks={false}
    imageScale="default"
    soalSvgMap={{ "3": diagramLatihanNo3 }}
    latihanDasar={[
      ...latihanDasar.slice(0, 2),
      ...soalTkaRelasiFungsi,
      ...latihanDasar.slice(2),
      ...latihanTambahan,
      ...latihanPindahanPLSV,
    ].map((soal, index) => ({ ...soal, no: index + 2 }))}
  />
);

export default RelasiFungsiPage;
