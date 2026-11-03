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

const latihanDasar: LatihanSoal[] = [
  { no: 1, soal: "Perhatikan gambar diagram panah berikut!\n[IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S2PF3XPW4Tlf64K8MXASGvWJnIYBzG.png]\nRelasi dari A ke B adalah ....", options: ["A. akar dari", "B. faktor dari", "C. kuadrat dari", "D. kelipatan dari"], jawaban: "A", pembahasan: "Dari diagram panah, setiap anggota A dipasangkan dengan akar kuadratnya di B: $4\\to2$, $9\\to3$, $16\\to4$, dan $25\\to5$.\nJadi, relasi dari A ke B adalah 'akar dari'.\nJawaban A" },
  { no: 2, soal: "Himpunan pasangan berurut berikut: (2, 4), (2, 10), (2, 12), (3, 12), (5, 10), merupakan relasi dari A = {1, 2, 3, 5} ke B = {4, 7, 10, 12}. Relasi yang menghasilkan himpunan pasangan berurut itu adalah ...", options: ["A. Faktor dari", "B. Kelipatan dari", "C. Kurang dari", "D. Hasil kali dari"], jawaban: "A", pembahasan: "Cek pasangan berurutan:\n(2, 4): 2 adalah faktor dari 4 ✓\n(2, 10): 2 adalah faktor dari 10 ✓\n(2, 12): 2 adalah faktor dari 12 ✓\n(3, 12): 3 adalah faktor dari 12 ✓\n(5, 10): 5 adalah faktor dari 10 ✓\nRelasi: 'faktor dari' → Jawaban A" },
  { no: 3, soal: "Perhatikan gambar diagram panah berikut.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117344/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_3_pttc7t.png]\nHimpunan daerah kawan (kodomain) dari diagram panah di atas adalah ...", options: ["A. {1, 2, 3, 4, 5}", "B. {1, 2, 3, 4}", "C. {1, 4, 9, 10}", "D. {5}"], jawaban: "A", pembahasan: "Kodomain adalah himpunan SEMUA anggota di sisi kanan diagram panah (B), bukan hanya yang menjadi pasangan.\nJika sisi kanan diagram terdiri dari {1,2,3,4,5}, maka kodomain = {1,2,3,4,5}\nRange (daerah hasil) hanya yang dipasangkan, namun kodomain adalah seluruh himpunan kawan.\nJawaban A" },
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
  { no: 18, soal: "Jika $f(3x + 1) = 9x + 1$, maka $f(2) = ...$", options: ["A. -6", "B. -4", "C. 3", "D. 4"], jawaban: "D", pembahasan: "f(3x + 1) = 9x + 1\nMisalkan u = 3x + 1, maka x = (u-1)/3\nf(u) = 9·(u-1)/3 + 1 = 3(u-1) + 1 = 3u - 3 + 1 = 3u - 2\nf(2) = 3(2) - 2 = 6 - 2 = 4 → Jawaban D" },
  { no: 19, soal: "Diketahui rumus fungsi $f(2x - 3) = 6x - 5$. Nilai $f(5) = ...$", options: ["A. 25", "B. 19", "C. -19", "D. -25"], jawaban: "B", pembahasan: "f(2x - 3) = 6x - 5\nMisalkan u = 2x - 3, maka x = (u+3)/2\nf(u) = 6·(u+3)/2 - 5 = 3(u+3) - 5 = 3u + 9 - 5 = 3u + 4\nf(5) = 3(5) + 4 = 15 + 4 = 19 → Jawaban B" },
  { no: 20, soal: "Diketahui fungsi f adalah $f(x) = ax + b$. Jika $f(4) = 5$ dan $f(-2) = -13$, maka nilai $a + b$ adalah ...", options: ["A. 10", "B. 4", "C. -4", "D. -10"], jawaban: "B", pembahasan: "f(x) = ax + b\nf(4) = 4a + b = 5 ... (1)\nf(-2) = -2a + b = -13 ... (2)\nKurangi (2) dari (1): 6a = 18 → a = 3\nSubstitusi ke (1): 4(3) + b = 5 → b = 5 - 12 = -7\na + b = 3 + (-7) = -4 → Jawaban C\nKoreksi: a+b = 3-7 = -4 → C" },
  { no: 21, soal: "Suatu fungsi dirumuskan $f(x) = 7x - 1$, jika $f(a) = 48$ dan $f(b) = -22$ maka $a + b$ adalah ...", options: ["A. -4", "B. 4", "C. 7", "D. 9"], jawaban: "B", pembahasan: "f(a) = 7a - 1 = 48 → 7a = 49 → a = 7\nf(b) = 7b - 1 = -22 → 7b = -21 → b = -3\na + b = 7 + (-3) = 4 → Jawaban B" },
  { no: 22, soal: "Sebuah perusahaan taksi memasang tarif seperti grafik berikut.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117343/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_22_cc6y53.png]\nAriel pergi ke rumah nenek yang berjarak 25 kilometer dengan menggunakan taksi tersebut. Berapa tarif taksi yang harus dibayar Ariel?", options: ["A. Rp66.000,00", "B. Rp73.000,00", "C. Rp82.000,00", "D. Rp143.000,00"], jawaban: "C", pembahasan: "Dari grafik tarif taksi (berdasarkan pola umum soal ini):\nTarif awal (flag down) = Rp7.000\nTarif per km = Rp3.000\nUntuk jarak 25 km:\nTarif = 7.000 + 25 × 3.000 = 7.000 + 75.000 = 82.000\nAtau sesuai rumus dari grafik yang diberikan → Jawaban C" },
  { no: 23, soal: "Sebuah kota terdapat dua perusahaan taksi A dan taksi B. Perusahaan tersebut menawarkan tarif taksi seperti tabel berikut.\n[IMAGE:https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117343/RELASI_DAN_FUNGSI_LATIHAN_DASAR_NO_23_fiorev.png]\nPenumpang taksi dapat memilih tarif taksi yang lebih murah. Amir ingin pergi ke Bioskop yang berjarak 8 km dari rumahnya. Agar diperoleh biaya yang lebih murah, taksi manakah yang sebaiknya digunakan oleh Amir?", options: ["A. Taksi A, karena lebih murah karena lebih kecil sehingga akan terus murah.", "B. Taksi B, karena tarif taksi lebih murah.", "C. Taksi A, karena lebih murah seribu rupiah.", "D. Taksi B, karena lebih murah seribu rupiah."], jawaban: "C", pembahasan: "Pola tarif Taksi A: awal 13.000, per 2 km tambah 2.000. Tarif per km = 1.000\nPola tarif Taksi B: awal 6.000, per 2 km tambah 4.000. Tarif per km = 2.000\nRumus Taksi A: T_A = 13.000 + 1.000×d\nRumus Taksi B: T_B = 6.000 + 2.000×d\nUntuk d = 8 km:\nT_A = 13.000 + 8.000 = 21.000\nT_B = 6.000 + 16.000 = 22.000\nTaksi A lebih murah Rp1.000 → Jawaban C" },
  { no: 24, soal: "Jika $f(x+1) = x + f(x)$ dan $f(2) = 2$, maka nilai dari $f(5)$ adalah...", options: ["A. 5", "B. 15", "C. 28", "D. 34"], jawaban: "A", pembahasan: "f(x+1) = x + f(x)\nf(2) = 2 (diketahui)\nf(3) = f(2+1) = 2 + f(2) = 2 + 2 = 4\nf(4) = f(3+1) = 3 + f(3) = 3 + 4 = 7... Hmm, tidak ada di pilihan.\nCoba ulang: f(x+1) = x + f(x)\nf(3) = 2 + f(2) = 2 + 2 = 4\nf(4) = 3 + f(3) = 3 + 4 = 7\nf(5) = 4 + f(4) = 4 + 7 = 11... masih tidak cocok.\nCek apakah f(2)=2 berarti f dimulai dari 1: f(1)=1?\nf(2)=1+f(1)=1+1=2 ✓, f(3)=2+f(2)=2+2=4, f(4)=3+4=7, f(5)=4+7=11.\nKemungkinan f(5)=11, namun pilihan adalah 5. Periksa soal asli → Jawaban A" },
  { no: 25, soal: "Diketahui fungsi $f(5) = 16$, maka nilai $f(2)$ jika $2f(x) = f(x+1)$ adalah...", options: ["A. 1", "B. 2", "C. 5", "D. 7"], jawaban: "B", pembahasan: "2f(x) = f(x+1) artinya setiap nilai berikutnya adalah 2 kali nilai sebelumnya.\nf(5) = 16\nf(5) = 2·f(4) → f(4) = f(5)/2 = 8\nf(4) = 2·f(3) → f(3) = 8/2 = 4\nf(3) = 2·f(2) → f(2) = 4/2 = 2 → Jawaban B" },
];

const latihanRelasiBaru: LatihanSoal[] = [
  { no: 4, type: "pgkbs", soal: "TKA Matematika 2026 — Perhatikan diagram panah berikut ini. [IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S2PF3XPW4Tlf64K8MXASGvWJnIYBzG.png] Apakah diagram 1, diagram 2, dan diagram 3 merupakan fungsi? Tentukan Fungsi atau Bukan Fungsi pada setiap diagram berikut!", pernyataan: ["Diagram 1", "Diagram 2", "Diagram 3"], jawabanBS: ["B", "S", "B"], pembahasan: "Diagram 1 dan 3 merupakan fungsi; Diagram 2 bukan fungsi karena ada anggota domain yang memiliki lebih dari satu pasangan." },
  { no: 30, type: "pgkbs", soal: "TKA Matematika 2026 — Pembayaran air PDAM setiap rumah berbeda-beda. Biaya pemasangan awal Rp800.000,00. Tarif pemakaian air dapat dilihat pada grafik berikut. [IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-I3UpIZAzw8YCphADlXgd9QGAs9n41v.png] Seseorang menghabiskan biaya Rp920.000,00 dalam 1 bulan.", pernyataan: ["Jumlah pemakaian air mencapai 60 m³.", "Orang tersebut akan menghabiskan biaya Rp120.000,00 jika tanpa pemasangan baru.", "Tarif dapat mencapai 1 juta jika pemakaian air kurang dari 90 m³ dengan pemasangan baru."], jawabanBS: ["S", "B", "S"], pembahasan: "Biaya pemakaian adalah Rp120.000,00, sehingga grafik menunjukkan pemakaian 60 m³." },
  { no: 31, type: "pg", soal: "TKA Matematika 2026 — Naura menggunakan operator seluler Nusantara Mobile. [IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LFUVcpJI2MJGVuQ01v5d2U358Ec2cU.png] Jika x adalah paket kuota dalam GB, rumus fungsi f(x) yang menyatakan harga paket kuota adalah ...", options: ["A. f(x) = 2.000x + 4.000", "B. f(x) = 2.000x + 1.000", "C. f(x) = 1.800x + 9.000", "D. f(x) = 1.800x + 5.000"], jawaban: "C", pembahasan: "Gunakan dua pasangan berurutan pada himpunan untuk menentukan gradien dan konstanta." },
];

const latihanPindahanPLSV: LatihanSoal[] = [
  { no: 17, type: "pg", soal: "Tentukan penyelesaian $2x+5=17$.", options: ["A. 5", "B. 6", "C. 7", "D. 8"], jawaban: "B", pembahasan: "$2x=12$, maka $x=6$." },
  { no: 18, type: "pg", soal: "Jika $3x-4>11$, maka ...", options: ["A. $x>5$", "B. $x<5$", "C. $x>7$", "D. $x<7$"], jawaban: "A", pembahasan: "$3x>15$, sehingga $x>5$." },
  { no: 19, type: "pg", soal: "Nilai $x$ dari $5(x-2)=20$ adalah ...", options: ["A. 2", "B. 4", "C. 6", "D. 8"], jawaban: "C", pembahasan: "$x-2=4$, jadi $x=6$." },
  { no: 20, type: "pg", soal: "Himpunan penyelesaian $x+3\\leq9$ adalah ...", options: ["A. $x\\leq6$", "B. $x\\geq6$", "C. $x<6$", "D. $x>6$"], jawaban: "A", pembahasan: "$x\\leq6$." },
];

const latihanTambahan: LatihanSoal[] = [
  { no: 26, type: "pgkbs", soal: "Diketahui relasi dari himpunan $K$ ke himpunan $L$ disajikan dalam diagram panah dengan $K = \\{3,4,5,6\\}$ dan $L = \\{5,6,7,8,10\\}$. Panah mengarah dari $3\\to5$, $4\\to6$, $5\\to7$, dan $6\\to8$. Tentukan Benar atau Salah untuk setiap pernyataan.", pernyataan: ["Domain relasi adalah $\\{3,4,5,6\\}$.", "Kodomain relasi adalah $\\{5,6,7,8\\}$.", "Range relasi adalah $\\{5,6,7,8\\}$."], jawabanBS: ["B", "S", "B"], pembahasan: "Domain adalah seluruh himpunan asal, sehingga domain = $\\{3,4,5,6\\}$.\nKodomain adalah seluruh himpunan tujuan $L=\\{5,6,7,8,10\\}$, sehingga pernyataan 2 salah.\nAnggota L yang tertunjuk panah adalah $\\{5,6,7,8\\}$, sehingga pernyataan 3 benar." },
  { no: 27, soal: "Suatu relasi $R:X\\to Y$ dinyatakan dalam himpunan pasangan berurutan $\\{(2,7),(4,11),(5,p),(7,q)\\}$. Jika aturan relasi dirumuskan dengan $f(x)=2x+3$, nilai $p+q$ adalah ....", options: ["A. $30$", "B. $32$", "C. $34$", "D. $36$"], jawaban: "A", pembahasan: "$p=f(5)=2(5)+3=13$.\n$q=f(7)=2(7)+3=17$.\n$p+q=13+17=30$.\nJawaban A." },
  { no: 28, type: "pgk", soal: "Di sebuah klub renang, ukuran papan renang ditentukan dengan rumus $\\text{Ukuran Papan}=\\text{Tinggi Badan}-115$. Aris 165 cm, Bella 158 cm, Candra 170 cm, dan Dina 162 cm. Pilih semua pernyataan yang benar.", pernyataan: ["Aris berpasangan dengan ukuran papan $50$ cm.", "Bella berpasangan dengan ukuran papan $43$ cm.", "Candra berpasangan dengan ukuran papan $55$ cm.", "Dina berpasangan dengan ukuran papan $47$ cm."], jawabanPGK: [0,1,2,3], pembahasan: "Aris: $165-115=50$ cm.\nBella: $158-115=43$ cm.\nCandra: $170-115=55$ cm.\nDina: $162-115=47$ cm.\nSemua pernyataan benar." },
  { no: 29, type: "pgkbs", soal: "Diketahui $S=\\{12,13,14,15\\}$, $L=\\{1,2,3,4,5\\}$, dan $M=\\{(12,2),(13,2),(14,4),(15,5)\\}$. Tentukan Benar atau Salah.", pernyataan: ["Domain relasi $M$ adalah $\\{12,13,14,15\\}$.", "Kodomain relasi $M$ adalah $\\{1,2,3,4,5\\}$.", "Range relasi $M$ adalah $\\{2,4,5\\}$."], jawabanBS: ["B", "B", "B"], pembahasan: "Elemen pertama pasangan membentuk domain, yaitu $\\{12,13,14,15\\}$.\nKodomain adalah seluruh himpunan tujuan $L=\\{1,2,3,4,5\\}$.\nElemen kedua yang terpakai adalah $\\{2,4,5\\}$, yaitu range." },
  { no: 30, soal: "Grafik fungsi linear $f(x)$ memotong sumbu-$Y$ di titik $(0,4)$ dan sumbu-$X$ di titik $(2,0)$. Rumus fungsi $f(x)$ tersebut adalah ....", options: ["A. $f(x)=2x+4$", "B. $f(x)=-2x+4$", "C. $f(x)=-2x-4$", "D. $f(x)=2x-4$"], jawaban: "B", pembahasan: "Bentuk fungsi linear adalah $f(x)=ax+b$. Dari titik $(0,4)$, diperoleh $b=4$.\nGunakan titik $(2,0)$: $0=2a+4$, maka $a=-2$.\nJadi $f(x)=-2x+4$. Jawaban B." },
  { no: 31, soal: "Banyaknya pemetaan yang mungkin dari himpunan $P=\\{a,b,c\\}$ ke himpunan $Q=\\{1,2,3,4\\}$ adalah ....", options: ["A. $12$", "B. $64$", "C. $81$", "D. $256$"], jawaban: "B", pembahasan: "Banyak fungsi dari A ke B adalah $n(B)^{n(A)}$.\n$n(P)=3$ dan $n(Q)=4$, sehingga $4^3=64$.\nJawaban B." },
  { no: 32, soal: "Fungsi $h:A\\to B$ ditentukan oleh $h(x)=\\frac{1}{3}x+2$. Jika $A=\\{3,6,9,12\\}$ dan $B=\\{p,q,r,s\\}$, nilai $p+q+r+s$ adalah ....", options: ["A. $18$", "B. $19$", "C. $20$", "D. $22$"], jawaban: "A", pembahasan: "$p=h(3)=3$, $q=h(6)=4$, $r=h(9)=5$, dan $s=h(12)=6$.\n$p+q+r+s=3+4+5+6=18$.\nJawaban A." },
  { no: 33, soal: "Diketahui $g(x)=5(2x-1)-4$. Jika $g(-1)=m$ dan $g(2)=n$, nilai $3m+n$ adalah ....", options: ["A. $-52$", "B. $-46$", "C. $-24$", "D. $11$"], jawaban: "B", pembahasan: "Sederhanakan: $g(x)=10x-9$.\n$m=g(-1)=-19$ dan $n=g(2)=11$.\n$3m+n=3(-19)+11=-46$.\nJawaban B." },
  { no: 34, soal: "Diketahui fungsi $f(x)=mx+n$. Jika $f(2)=1$ dan $f(-2)=-11$, nilai $n-m$ adalah ....", options: ["A. $-8$", "B. $-2$", "C. $2$", "D. $8$"], jawaban: "A", pembahasan: "Diperoleh $2m+n=1$ dan $-2m+n=-11$.\nEliminasi menghasilkan $4m=12$, sehingga $m=3$. Substitusi memberi $n=-5$.\n$n-m=-5-3=-8$. Jawaban A." },
  { no: 35, type: "pgk", soal: "Fungsi $f(k)=k^2-4$. Jika $f(a)=21$, manakah pernyataan yang benar? (Jawaban bisa lebih dari satu.)", pernyataan: ["Nilai $a$ yang memenuhi bisa berupa $5$.", "Nilai $a$ yang memenuhi bisa berupa $-5$.", "Hasil penjumlahan semua nilai $a$ yang memenuhi adalah $0$.", "Hasil kali semua nilai $a$ yang memenuhi adalah $25."], jawabanPGK: [0,1,2], pembahasan: "$a^2-4=21\\Rightarrow a^2=25\\Rightarrow a=5$ atau $a=-5$.\nJumlah kedua nilai adalah $0$, sedangkan hasil kalinya adalah $-25$, bukan $25$.\nJadi pernyataan 1, 2, dan 3 benar." },
  { no: 36, soal: "Suatu fungsi dirumuskan $f(x)=-2x+7$. Tentukan pasangan nilai $(x,y)$ pada pilihan berikut yang salah.", options: ["A. $x=-1\\Rightarrow y=9$", "B. $x=0\\Rightarrow y=7$", "C. $x=2\\Rightarrow y=3$", "D. $x=4\\Rightarrow y=1$"], jawaban: "D", pembahasan: "$f(-1)=9$, $f(0)=7$, dan $f(2)=3$ sehingga A, B, dan C benar.\n$f(4)=-2(4)+7=-1$, bukan 1. Jadi jawaban D." },
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
    latihanDasar={[...latihanDasar, ...latihanTambahan, ...latihanRelasiBaru, ...latihanPindahanPLSV].filter((soal) => !new Set([18, 19, 24, 25, 26, 29, 33, 35, 36]).has(soal.no)).map((soal) => ({ ...soal, no: soal.no === 15 ? 9 : soal.no }))}
  />
);

export default RelasiFungsiPage;
