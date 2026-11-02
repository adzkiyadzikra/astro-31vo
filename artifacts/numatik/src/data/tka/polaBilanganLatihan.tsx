import type { ReactNode } from "react";
import type { MateriSection } from "@/components/tka/TKAPemantapanLayout";
import polaLingkaranImage from "@/assets/image_1793171450761.png";

export interface TkaPolaBilanganSoal {
  no: number;
  soal: string;
  options: string[];
}

export const polaBilanganMateriSections: MateriSection[] = [
  {
    heading: "A. Barisan",
    content:
      "Barisan adalah daftar urutan bilangan dari kiri ke kanan yang mempunyai pola tertentu. Setiap bilangan dalam barisan merupakan suku dalam barisan.",
  },
  {
    heading: "B. Barisan Aritmatika",
    content: `Barisan aritmatika adalah barisan dengan selisih antara dua suku yang berurutan selalu tetap. Selisih tersebut dinamakan beda dan dilambangkan dengan "b"

Rumus:
$b = U_n - U_{n-1}$
$U_n = a + (n-1)b$
$U_n = S_n - S_{n-1}$

Deret adalah penjumlahan suku-suku dari suatu barisan. Jika suatu barisan: $U_1, U_2, U_3, ..., U_n$ maka $S_n = U_1 + U_2 + U_3 + ... + U_n$ adalah deret.

Rumus:
$S_n = \\frac{n}{2}(2a + (n-1)b)$
$S_n = \\frac{n}{2}(a + U_n)$

Keterangan:
a = $U_1$ = Suku pertama
b = beda
n = banyak suku
$U_n$ = Suku ke-n
$S_n$ = Jumlah n suku pertama`,
  },
  {
    heading: "C. Barisan Geometri",
    content: `Barisan geometri adalah barisan dengan rasio antara dua suku yang berurutan selalu tetap. Rasio tersebut dilambangkan dengan "r".

Rumus:
$r = \\frac{U_n}{U_{n-1}}$
$U_n = ar^{n-1}$

Deret geometri:
$S_n = \\frac{a(r^n - 1)}{r - 1}$ untuk $r > 1$
$S_n = \\frac{a(1 - r^n)}{1 - r}$ untuk $r < 1$

Keterangan:
a = $U_1$ = Suku pertama
r = rasio
n = banyak suku
$U_n$ = Suku ke-n
$S_n$ = Jumlah n suku pertama`,
  },
  {
    heading: "D. Barisan Bertingkat",
    content: `1. Pola Bilangan Persegi
$U_n = n^2$

2. Pola Bilangan Persegi Panjang
$U_n = n(n+1)$

3. Pola Bilangan Segitiga
$U_n = \\frac{n(n+1)}{2}$`,
  },
  {
    heading: "E. Menentukan Rumus Suku Ke-n dengan Prosedur Matematika",
    content: `Prosedur matematika dapat dilakukan dengan cara mengamati pola selisih suku-suku yang berurutan pada barisan bilangan yang bersangkutan.

Secara umum, jika selisih tetapnya ditemukan pada:
- Satu Tingkat penyelidikan, maka $U_n$ berupa polinom berderajat 1: $U_n = an + b$
- Dua Tingkat penyelidikan, maka $U_n$ berupa polinom berderajat 2: $U_n = an^2 + bn + c$
- Tiga Tingkat penyelidikan, maka $U_n$ berupa polinom berderajat 3: $U_n = an^3 + bn^2 + cn + d$

Contoh:
Tentukan rumus ke-n dari barisan 0, 1, 3, 6, 10, 15
Jawab: $U_n = \\frac{1}{2}n(n-1)$`,
  },
];

export const latihanDasarPolaBilanganTka: TkaPolaBilanganSoal[] = [
  { no: 1, soal: "Perhatikan gambar pola berikut.\n[DIAGRAM]\nBanyak lingkaran pada pola ke-15 adalah ....", options: ["A. 105", "B. 120", "C. 210", "D. 240"] },
  { no: 2, soal: "Perhatikan pola bilangan berselang-seling berikut.\n$1, 3, 5, 8, 9, 13, 13, 18, 17, \\ldots$\nPernyataan yang sesuai dengan pola tersebut adalah ....", options: ["A. Suku ke-7, ke-8, dan ke-9 adalah 13, 18, 17", "B. Suku ke-7, ke-8, dan ke-9 adalah 14, 17, 18", "C. Suku ke-7, ke-8, dan ke-9 adalah 13, 17, 18", "D. Suku ke-7, ke-8, dan ke-9 adalah 14, 18, 19"] },
  { no: 3, soal: "Suku ke-22 dari barisan 99, 93, 87, 81, … adalah ....", options: ["A. –27", "B. –21", "C. –15", "D. –9"] },
  { no: 4, soal: "Suku pertama dari barisan aritmatika adalah 3 dan bedanya 4, suku ke-10 dari barisan aritmatika tersebut adalah ....", options: ["A. 30", "B. 33", "C. 36", "D. 39"] },
  { no: 5, soal: "Dari barisan aritmetika diketahui $U_3 = 18$ dan $U_7 = 38$. Jumlah 24 suku pertama adalah ....", options: ["A. 786", "B. 1248", "C. 1572", "D. 3144"] },
  { no: 7, soal: "Perhatikan gambar tumpukan batu bata berikut.\nPada lapisan paling atas ada 8 buah, dan setiap lapisan di bawahnya memiliki 2 batu bata lebih banyak dari lapisan sebelumnya. Jika ada 15 lapisan dari atas sampai bawah, berapa banyak batu bata pada lapisan paling bawah?", options: ["A. 35 buah", "B. 36 buah", "C. 38 buah", "D. 40 buah"] },
  { no: 8, soal: "Dalam suatu ruang terdapat 15 baris kursi, baris paling depan terdapat 23 kursi, baris berikutnya 2 kursi lebih banyak dari baris di depannya. Jumlah kursi dalam ruang tersebut adalah ....", options: ["A. 555", "B. 385", "C. 1.110", "D. 1.140"] },
  { no: 9, soal: "Permintaan suatu produk barang diperkirakan mengalami kenaikan 5.000 unit setiap bulan. Jika jumlah produk pertamanya 100.000, maka jumlah produk selama satu tahun pertama adalah ....", options: ["A. 1.205.000 unit", "B. 1.255.000 unit", "C. 1.260.000 unit", "D. 1.530.000 unit", "E. 1.560.000 unit"] },
  { no: 10, soal: "BACAAN 1 — Susunan batu bata persegi panjang dan segitiga. [IMAGE:https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OVf676JRNFoPJoPmK4fpN2pfEIFTXU.png]\n(Perhatikan Bacaan 1) Jika ingin dibuat pagar dengan 10 tingkat susunan batu bata, berapakah jumlah total batu bata pada tingkat ke-10?", options: ["A. 10 batu bata", "B. 11 batu bata", "C. 20 batu bata", "D. 21 batu bata"] },
  { no: 11, soal: "(Perhatikan Bacaan 1) Dua pagar yang sama persis dengan masing-masing memiliki 9 tingkat akan dibangun. Persediaan 60 batu bata segitiga dan 80 batu bata persegi panjang. Apakah persediaan tersebut cukup?", options: ["A. Benar, semua persediaan cukup", "B. Salah, diperlukan tambahan 15 segitiga", "C. Salah, diperlukan tambahan 28 persegi panjang", "D. Salah, diperlukan tambahan total 43 batu bata"] },
  { no: 13, soal: "Tentukan jumlah semua bilangan asli antara 100 dan 300 yang habis dibagi 7 tetapi tidak habis dibagi 5.", options: ["A. 3.424", "B. 3.696", "C. 4.060", "D. 4.200"] },
  { no: 14, soal: "Diberikan deret bilangan bulat positif: 1, 2, 3, …, 200. Tentukan jumlah bilangan dalam deret tersebut yang habis dibagi 4 tetapi tidak habis dibagi 10.", options: ["A. 4.000", "B. 4.200", "C. 4.400", "D. 4.800"] },
  { no: 15, soal: "Diketahui barisan bilangan 8, 4, 2, 1, …. Rumus suku ke-n barisan tersebut adalah ....", options: ["A. $2^{n+2}$", "B. $2^{n-4}$", "C. $2^{-n+4}$", "D. $2^{n-1}$"] },
  { no: 16, soal: "Suku pertama dan kelima suatu barisan geometri berturut-turut 5 dan 80. Suku ke-9 barisan geometri tersebut adalah ....", options: ["A. 90", "B. 405", "C. 940", "D. 1.280"] },
  { no: 17, soal: "Suku ke-2 dan ke-4 barisan geometri adalah 384 dan 96. Suku ke-8 barisan tersebut adalah ....", options: ["A. 3", "B. 6", "C. 9", "D. 12"] },
  { no: 19, soal: "Kaisan melipat-lipat kertas berkali-kali. Jika ketebalan kertas mula-mula 2 mm, maka butuh berapa kali lipatan sehingga ketebalan kertas menjadi 256 mm?", options: ["A. 7 kali", "B. 8 kali", "C. 9 kali", "D. 10 kali"] },
  { no: 20, soal: "Seutas tali dibagi menjadi enam bagian, sehingga bagian-bagiannya membentuk barisan geometri. Jika panjang tali terpendek 9 cm dan panjang tali terpanjang 288 cm, maka panjang tali mula-mula adalah ....", options: ["A. 567 cm", "B. 576 cm", "C. 586 cm", "D. 596 cm"] },
  { no: 21, soal: "Setiap bakteri akan membelah diri menjadi 2 setiap 15 menit. Jika banyak bakteri pada pukul 10.00 ada 25 buah, maka banyak bakteri pada pukul 12.15 adalah ....", options: ["A. 800", "B. 1600", "C. 3200", "D. 6400"] },
  { no: 22, soal: "Diketahui barisan $15, 24, 35, 48, \\ldots$. Suku ke-14 barisan tersebut adalah ....", options: ["A. 280", "B. 286", "C. 288", "D. 290"] },
  { no: 23, soal: "Diketahui barisan $3, 5, 9, 15, 23, \\ldots$. Suku ke-40 barisan tersebut adalah ....", options: ["A. 1.560", "B. 1.563", "C. 1.584", "D. 1.603"] },
  { no: 24, soal: "Perhatikan pola bilangan berselang-seling berikut.\n$1, 3, 6, 7, 11, 11, \\ldots$\nTiga suku berikutnya adalah ....", options: ["A. 15, 16, 20", "B. 16, 15, 21", "C. 16, 16, 21", "D. 17, 15, 22"] },
  { no: 25, soal: "Rumus suku ke-n barisan adalah $U_n = 2n(n-1)$. Hasil dari $U_9 - U_7$ adalah ....", options: ["A. 80", "B. 70", "C. 60", "D. 50"] },
  { no: 26, soal: "Rumus suku ke-n dari barisan bilangan 0, 4, 10, 18, … adalah ....", options: ["A. $\\frac{1}{2}n(n+1)$", "B. $2n(n+1)$", "C. $(n-1)(n+2)$", "D. $(n+1)(n+2)$"] },
  { no: 27, soal: "Perhatikan gambar berikut!\nBanyak persegi satuan pada pola ke-19 adalah ....", options: ["A. 36", "B. 38", "C. 40", "D. 42"] },
  { no: 28, soal: "Perhatikan gambar pola berikut.\nBanyak lingkaran pada pola ke-15 adalah ....", options: ["A. 105", "B. 120", "C. 210", "D. 240"] },
  { no: 29, soal: "Gambar berikut adalah pola segitiga.\nBanyak segitiga satu-satuan pada pola ke-7 adalah ....", options: ["A. 28", "B. 36", "C. 42", "D. 49"] },
  { no: 30, soal: "Perhatikan gambar pola berikut!\nBanyak lingkaran pada pola ke-10 adalah ....", options: ["A. 99 buah", "B. 104 buah", "C. 115 buah", "D. 120 buah"] },
  { no: 31, soal: "Perhatikanlah pola berikut.\nBanyak lingkaran pada pola ke-30 adalah ....", options: ["A. 39", "B. 41", "C. 57", "D. 59"] },
];

const Soal7Svg = () => {
  const rowCount = 15;
  const brickWidth = 8;
  const brickHeight = 8;
  const brickGap = 1;
  const rowStep = 11;
  const maxBricks = 36;
  const stackCenter = 178;

  return (
    <svg
      viewBox="0 0 440 205"
      role="img"
      aria-label="Ilustrasi tumpukan 15 lapis batu bata, dari 8 batu bata di lapisan atas hingga 36 di lapisan bawah"
      className="block h-auto w-full max-w-xl"
    >
      <title>Tumpukan batu bata: 15 lapis, bertambah 2 bata setiap lapis</title>
      {Array.from({ length: rowCount }, (_, index) => {
        const count = 8 + index * 2;
        const rowWidth = count * brickWidth + (count - 1) * brickGap;
        const x = stackCenter - rowWidth / 2;
        const y = 18 + index * rowStep;
        return (
          <g key={count}>
            {Array.from({ length: count }, (_, brickIndex) => (
              <rect
                key={brickIndex}
                x={x + brickIndex * (brickWidth + brickGap)}
                y={y}
                width={brickWidth}
                height={brickHeight}
                rx="1"
                fill={index % 2 === 0 ? "#fb923c" : "#f97316"}
                stroke="#7c2d12"
                strokeWidth="0.65"
              />
            ))}
          </g>
        );
      })}
      <text x="196" y="201" textAnchor="middle" fill="#a5f3fc" fontSize="10" fontFamily="sans-serif">
        Lapisan atas → lapisan bawah
      </text>
    </svg>
  );
};

const Soal9Svg = () => {
  const values = Array.from({ length: 12 }, (_, index) => 100_000 + index * 5_000);
  const left = 62;
  const right = 468;
  const top = 26;
  const bottom = 166;
  const min = 100_000;
  const max = 160_000;
  const points = values.map((value, index) => ({
    value,
    x: left + (index * (right - left)) / (values.length - 1),
    y: bottom - ((value - min) / (max - min)) * (bottom - top),
  }));
  const format = (value: number) => value.toLocaleString("id-ID");

  return (
    <div className="my-2 w-full max-w-xl rounded-xl border border-cyan-400/30 bg-white/5 p-2">
      <div className="text-center text-xs font-bold text-cyan-200">Perkiraan jumlah produk per bulan</div>
      <svg
        viewBox="0 0 500 205"
        role="img"
        aria-label={`Grafik kenaikan jumlah produk bulanan: ${values.map((value, index) => `bulan ${index + 1}, ${format(value)} unit`).join("; ")}`}
        className="block h-auto w-full"
      >
        <title>Jumlah produk meningkat 5.000 unit setiap bulan</title>
        {[100_000, 120_000, 140_000, 160_000].map((value) => {
          const y = bottom - ((value - min) / (max - min)) * (bottom - top);
          return (
            <g key={value}>
              <line x1={left} y1={y} x2={right} y2={y} stroke="#ffffff22" />
              <text x={left - 6} y={y + 3} textAnchor="end" fill="#cbd5e1" fontSize="8">
                {format(value)}
              </text>
            </g>
          );
        })}
        <polyline
          points={points.map(({ x, y }) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((point, index) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r="3" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
            <text x={point.x} y={point.y - 7} textAnchor="middle" fill="#fef08a" fontSize="7.5">
              {format(point.value)}
            </text>
            <text x={point.x} y={bottom + 13} textAnchor="middle" fill="#e2e8f0" fontSize="8">
              {index + 1}
            </text>
          </g>
        ))}
        <text x={(left + right) / 2} y="198" textAnchor="middle" fill="#a5f3fc" fontSize="9">
          Bulan
        </text>
      </svg>
    </div>
  );
};

const Soal27Svg = () => {
  const square = 18;
  const gap = 22;
  const patterns = [{ columns: 2 }, { columns: 3 }, { columns: 4 }];
  let currentX = 8;
  const positions: number[] = [];
  for (const pattern of patterns) {
    positions.push(currentX);
    currentX += pattern.columns * square + gap;
  }
  return (
    <svg width={currentX - gap + 8} height={2 * square + 12}>
      {patterns.map((pattern, index) => {
        const x = positions[index];
        const rectangles: ReactNode[] = [];
        for (let row = 0; row < 2; row++) {
          for (let column = 0; column < pattern.columns; column++) {
            rectangles.push(
              <rect
                key={`${row}-${column}`}
                x={x + column * square}
                y={6 + row * square}
                width={square}
                height={square}
                fill="#5b9ec9"
                stroke="var(--icon-stroke)"
                strokeWidth="1.5"
                rx="1"
              />,
            );
          }
        }
        return <g key={index}>{rectangles}</g>;
      })}
    </svg>
  );
};

const Soal28Svg = () => {
  const radius = 7;
  const spacing = 17;
  const patterns = [1, 2, 3, 4];
  const gap = 22;
  let currentX = 8;
  const positions: number[] = [];
  for (const pattern of patterns) {
    positions.push(currentX);
    currentX += pattern * spacing + gap;
  }
  const maxHeight = 4 * spacing;
  return (
    <svg width={currentX - gap + 8} height={maxHeight + 30}>
      {patterns.map((pattern, index) => {
        const x = positions[index];
        const patternWidth = pattern * spacing;
        const circles: ReactNode[] = [];
        for (let row = 0; row < pattern; row++) {
          const number = pattern - row;
          const rowOffset = (patternWidth - number * spacing) / 2;
          const y = 8 + maxHeight - (row + 1) * spacing + spacing / 2;
          for (let column = 0; column < number; column++) {
            circles.push(
              <circle
                key={`${row}-${column}`}
                cx={x + rowOffset + column * spacing + spacing / 2}
                cy={y}
                r={radius}
                fill="none"
                stroke="#5b9ec9"
                strokeWidth="1.5"
              />,
            );
          }
        }
        return (
          <g key={index}>
            {circles}
            <text x={x + patternWidth / 2} y={8 + maxHeight + 20} textAnchor="middle" fill="#ffffffcc" fontSize="12" fontFamily="sans-serif">
              {pattern}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Soal30Svg = () => {
  const dotRadius = 5;
  const spacing = 13;
  const patterns = [
    { rows: 1, columns: 3 },
    { rows: 2, columns: 4 },
    { rows: 3, columns: 5 },
    { rows: 4, columns: 6 },
  ];
  const gap = 18;
  let currentX = 8;
  const positions: number[] = [];
  for (const pattern of patterns) {
    positions.push(currentX);
    currentX += pattern.columns * spacing + gap;
  }
  const maxHeight = 4 * spacing;
  return (
    <svg width={currentX - gap + 8} height={maxHeight + 12}>
      {patterns.map((pattern, index) => {
        const x = positions[index];
        const height = pattern.rows * spacing;
        const offsetY = 6 + maxHeight - height;
        const dots: ReactNode[] = [];
        for (let row = 0; row < pattern.rows; row++) {
          for (let column = 0; column < pattern.columns; column++) {
            dots.push(
              <circle
                key={`${row}-${column}`}
                cx={x + column * spacing + dotRadius}
                cy={offsetY + row * spacing + dotRadius}
                r={dotRadius}
                fill="var(--icon-stroke)"
              />,
            );
          }
        }
        return <g key={index}>{dots}</g>;
      })}
    </svg>
  );
};

const Soal31Svg = () => {
  const dotRadius = 5;
  const spacing = 14;
  const patterns = [1, 2, 3, 4];
  const gap = 22;
  let currentX = 8;
  const positions: number[] = [];
  for (const pattern of patterns) {
    positions.push(currentX);
    currentX += pattern * spacing + gap;
  }
  const maxHeight = 4 * spacing;
  return (
    <svg width={currentX - gap + 8} height={maxHeight + 12}>
      {patterns.map((pattern, index) => {
        const x = positions[index];
        const baseY = 6 + maxHeight;
        const dots: ReactNode[] = [];
        for (let column = 0; column < pattern; column++) {
          dots.push(
            <circle
              key={`bottom-${column}`}
              cx={x + column * spacing + dotRadius}
              cy={baseY - dotRadius}
              r={dotRadius}
              fill="var(--icon-stroke)"
            />,
          );
        }
        for (let row = 1; row < pattern; row++) {
          dots.push(
            <circle
              key={`right-${row}`}
              cx={x + (pattern - 1) * spacing + dotRadius}
              cy={baseY - row * spacing - dotRadius}
              r={dotRadius}
              fill="var(--icon-stroke)"
            />,
          );
        }
        return <g key={index}>{dots}</g>;
      })}
    </svg>
  );
};

export const polaBilanganSoalSvgMap: Record<string, ReactNode> = {
  "1": (
    <img
      src={polaLingkaranImage}
      alt="Pola lingkaran segitiga untuk pola 1, 2, 3, dan 4"
      className="my-2 w-full max-w-sm rounded-xl bg-white"
    />
  ),
  "7": <Soal7Svg />,
  "9": <Soal9Svg />,
  "27": <Soal27Svg />,
  "28": <Soal28Svg />,
  "29": (
    <img
      src="https://drive.google.com/thumbnail?id=1f-EBr1I4CaOwcZbixjEMgb5NxepLfmoM&sz=w800"
      alt="Pola segitiga"
      className="my-2 max-w-xs w-full rounded"
    />
  ),
  "30": <Soal30Svg />,
  "31": <Soal31Svg />,
};
