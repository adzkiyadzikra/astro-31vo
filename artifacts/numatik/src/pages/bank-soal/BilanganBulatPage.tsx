import OlympiadBankPage from "@/components/bank-soal/OlympiadBankPage";
import type { OlympiadQuestion } from "@/components/bank-soal/OlympiadBankPage";
import { QUESTIONS_BY_LANG as penjumlahanQuestions } from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/PenjumlahanPage";
import { QUESTIONS_BY_LANG as penguranganQuestions } from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/PenguranganPage";
import { QUESTIONS_BY_LANG as perkalianQuestions } from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/PerkalianPage";
import {
  MATH_QUESTIONS as operasiMathQuestions,
  ESSAY_QUESTIONS_BY_LANG as operasiEssayQuestions,
} from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/OperasiCampuranPage";
import { QUESTIONS_BY_LANG as kpkFpbQuestions } from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/KPKFPBPage";

const toReadableMath = (math: string) =>
  math
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\cdot/g, "·")
    .replace(/\\left|\\right/g, "");

const TKA_QUESTION_COUNT = 22;

const tkaQuestionPrompts: OlympiadQuestion[] = [
  { no: 1, category: "TKA Bilangan Bulat · Pilihan Ganda", soal: "Hasil dari −18 + 42 ÷ (−6) × 3 adalah ....", options: ["A. −39", "B. −33", "C. 3", "D. 33"] },
  {
    no: 2,
    category: "TKA Bilangan Bulat · Pilihan Ganda Kompleks",
    soal: "Manakah pernyataan-pernyataan berikut yang BENAR? Klik semua yang benar!",
    options: [
      "(−3) × (−5) = 15",
      "7 + (−7) = 14",
      "(−12) ÷ 4 = −3",
      "(−2)³ = −8",
    ],
  },
  {
    no: 3,
    category: "TKA Bilangan Bulat · Benar/Salah",
    soal: "Tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    options: [
      "a. (−7) × 4 = −28",
      "b. −9 − (−7) = −16",
      "c. 0 adalah bilangan bulat yang bukan positif dan bukan negatif",
    ],
  },
  {
    no: 4,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Suhu di puncak gunung adalah −4°C. Suhu di kaki gunung 23°C lebih tinggi dari suhu di puncak. Suhu di kaki gunung adalah ....",
    options: ["A. −27°C", "B. −19°C", "C. 19°C", "D. 27°C"],
  },
  {
    no: 5,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: 'Operasi "★" didefinisikan sebagai a ★ b = 3a − 2b. Nilai dari (−2) ★ 4 adalah ....',
    options: ["A. −14", "B. −2", "C. 2", "D. 14"],
  },
  {
    no: 6,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Kompetisi matematika memberi skor +4 untuk jawaban benar, −2 untuk jawaban salah, dan 0 untuk tidak dijawab. Dari 20 soal, Dina menjawab 17 soal dengan 12 benar. Skor Dina adalah ....",
    options: ["A. 34", "B. 38", "C. 42", "D. 44"],
  },
  {
    no: 7,
    category: "TKA Bilangan Bulat · Pilihan Ganda Kompleks",
    soal: "Perhatikan ekspresi 24 − 8 × 3 + 12 ÷ 4. Manakah pernyataan berikut yang BENAR? Pilih semua yang benar.",
    options: [
      "A. Langkah pertama: kerjakan 8 × 3 = 24",
      "B. Nilai ekspresi tersebut adalah 12",
      "C. Setelah kali/bagi, ekspresi menjadi 24 − 24 + 3",
      "D. Nilai ekspresi tersebut adalah 3",
    ],
  },
  {
    no: 8,
    category: "TKA Bilangan Bulat · Benar/Salah",
    soal: "Tentukan Benar atau Salah untuk setiap pernyataan tentang suhu berikut!",
    options: [
      "a. Jika suhu mula-mula −5°C lalu turun 3°C, suhu akhirnya −8°C",
      "b. Selisih suhu −10°C dan 15°C adalah 5°C",
      "c. Suhu −3°C lebih dingin dari suhu −7°C",
    ],
  },
  {
    no: 9,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Perhatikan gambar berikut. Pernyataan yang BENAR adalah ....",
    diagram: "numberLine",
    statementList: [
      "(i) P < R",
      "(ii) Q = −2",
      "(iii) Nilai terbesar adalah R",
      "(iv) P < Q, Q > R, dan R < S",
    ],
    options: ["A. (i) dan (ii)", "B. (ii) dan (iii)", "C. (ii) dan (iv)", "D. (iii) dan (iv)"],
  },
  {
    no: 10,
    category: "TKA Bilangan Bulat · Pilihan Ganda Kompleks",
    soal: "Diketahui p = −6 × 4 ÷ 8 dan q = 11 − 16 − (−8). Pilihlah semua pernyataan yang BENAR!",
    options: [
      "A. Nilai p adalah −3",
      "B. Nilai q adalah −3",
      "C. Hasil dari p × q − 5 adalah −14",
      "D. Hasil dari p + q adalah 6",
    ],
  },
  {
    no: 11,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Hasil dari (15 − (−3)) × 2 ÷ (−9 − 3 + 6) adalah ....",
    options: ["A. 9", "B. 6", "C. −6", "D. −9"],
  },
  {
    no: 12,
    category: "TKA Bilangan Bulat · Benar/Salah",
    soal: 'Operasi "⋄" didefinisikan sebagai: kalikan bilangan pertama dengan −5, kemudian tambahkan dua kali bilangan kedua. Tentukan Benar atau Salah!',
    options: [
      "a. Hasil dari 3 ⋄ (−4) adalah −23",
      "b. Jika x = −2, hasil dari x ⋄ 6 adalah −2",
      "c. Hasil dari 5 ⋄ (−1) adalah −27",
    ],
  },
  {
    no: 13,
    category: "TKA Bilangan Bulat · Pilihan Ganda Kompleks",
    soal: "Empat gelas diberi nama W, X, Y, dan Z. Pilihlah semua pernyataan yang BENAR berdasarkan gambar!",
    diagram: "temperatureGlasses",
    options: [
      "Gelas dengan suhu air terendah adalah gelas X",
      "Selisih suhu gelas X dan gelas Y adalah 21°C",
      "Urutan suhu dari terendah ke tertinggi adalah X, Y, Z, W",
    ],
  },
  {
    no: 14,
    category: "TKA Bilangan Bulat · Benar/Salah",
    soal: "Berdasarkan data suhu keempat gelas (W = 18°C, X = 25°C, Y = −4°C, Z = 7°C), tentukan Benar atau Salah!",
    options: [
      "a. Suhu air dalam gelas Y lebih rendah daripada suhu air dalam gelas Z",
      "b. Selisih suhu air gelas X dan gelas W adalah 6°C",
      "c. Suhu air gelas W lebih tinggi dari gelas Z, tetapi lebih rendah dari gelas X",
    ],
  },
  {
    no: 15,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Pak Danu mencatat keuntungan dan kerugian toko selama 4 hari: untung Rp85.000, rugi Rp32.000, untung Rp64.000, dan rugi Rp45.000. Keuntungan bersih selama 4 hari adalah ....",
    options: ["A. Rp72.000", "B. Rp64.000", "C. Rp56.000", "D. Rp48.000"],
  },
  {
    no: 16,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Suhu udara di tepi pantai adalah 32°C, sedangkan suhu udara di puncak gunung terdekat adalah −6°C. Selisih suhu kedua tempat tersebut adalah ....",
    options: ["A. 26°C", "B. 32°C", "C. 38°C", "D. 44°C"],
  },
  {
    no: 17,
    category: "TKA Bilangan Bulat · Pilihan Ganda Kompleks",
    soal: "Sebuah kapal selam berada pada kedalaman 8 m di bawah permukaan laut. Helikopter berada pada ketinggian 45 m. Kapal selam kemudian menyelam 12 m lebih dalam. Pilih semua pernyataan yang BENAR!",
    options: [
      "A. Posisi awal kapal selam pada garis bilangan adalah −8",
      "B. Ketinggian helikopter dari permukaan laut adalah 45 m",
      "C. Posisi akhir kapal selam adalah −12 m",
      "D. Jarak helikopter dari posisi akhir kapal selam adalah 65 m",
    ],
  },
  {
    no: 18,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Faktorisasi prima dari 900 dapat dinyatakan dalam bentuk 2ᵃ × 3ᵇ × 5ᶜ. Nilai dari a + b + c adalah ....",
    options: ["A. 4", "B. 5", "C. 6", "D. 7"],
  },
  {
    no: 19,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Rina membeli 3 buku tulis seharga Rp7.800 per buku dan 2 pensil seharga Rp3.200 per buah. Ia membayar dengan Rp40.000. Berdasarkan taksiran yang paling tepat, pernyataan yang benar adalah ....",
    options: [
      "A. Uang Rina tidak cukup untuk membayar semua barang",
      "B. Uang Rina pas, tidak ada kembalian",
      "C. Uang Rina cukup, estimasi kembalian sekitar Rp10.000",
      "D. Uang Rina cukup, estimasi kembalian sekitar Rp5.000",
    ],
  },
  {
    no: 20,
    category: "TKA Bilangan Bulat · Pilihan Ganda",
    soal: "Sebuah baling-baling berputar 80 kali setiap 12 menit. Banyak putaran selama 1 jam adalah ....",
    options: ["A. 320 kali", "B. 360 kali", "C. 400 kali", "D. 480 kali"],
  },
  {
    no: 21,
    category: "TKA Bilangan Bulat · Pilihan Ganda Kompleks",
    soal: "Harga beras Rp19.750 per kg. Pemilik warung membeli 12,3 kg. Estimasi yang tepat adalah ....",
    options: [
      "A. Total biaya kurang dari Rp260.000,00",
      "B. Total biaya lebih dari Rp220.000,00",
      "C. Estimasi 12 × Rp20.000 masuk akal",
      "D. Nilainya mendekati Rp300.000,00",
    ],
  },
  {
    no: 22,
    category: "TKA Bilangan Bulat · Pilihan Ganda Kompleks",
    soal: "Pilih semua estimasi yang benar untuk pembelian 12,3 kg beras seharga Rp19.750 per kg.",
    options: [
      "A. Biaya lebih dari Rp220.000,00",
      "B. Biaya kurang dari Rp260.000,00",
      "C. 12 × Rp20.000 adalah estimasi yang masuk akal",
      "D. Biaya mendekati Rp300.000,00",
    ],
  },
];

const tkaAnswerKeys: Record<number, Pick<OlympiadQuestion, "type" | "correctIndex" | "correctIndices" | "statementAnswers">> = {
  1: { type: "pg", correctIndex: 0 },
  2: { type: "mcma", correctIndices: [0, 2, 3] },
  3: { type: "pgkbs", statementAnswers: [true, false, true] },
  4: { type: "pg", correctIndex: 2 },
  5: { type: "pg", correctIndex: 0 },
  6: { type: "pg", correctIndex: 1 },
  7: { type: "mcma", correctIndices: [0, 2, 3] },
  8: { type: "pgkbs", statementAnswers: [true, false, false] },
  9: { type: "pg", correctIndex: 0 },
  10: { type: "mcma", correctIndices: [0, 2] },
  11: { type: "pg", correctIndex: 2 },
  12: { type: "pgkbs", statementAnswers: [true, false, true] },
  13: { type: "mcma", correctIndices: [0, 1, 2] },
  14: { type: "pgkbs", statementAnswers: [true, false, true] },
  15: { type: "pg", correctIndex: 0 },
  16: { type: "pg", correctIndex: 2 },
  17: { type: "mcma", correctIndices: [0, 1, 3] },
  18: { type: "pg", correctIndex: 2 },
  19: { type: "pg", correctIndex: 2 },
  20: { type: "pg", correctIndex: 2 },
  21: { type: "mcma", correctIndices: [0, 1, 2] },
  22: { type: "mcma", correctIndices: [0, 1, 2] },
};

const editTkaQuestion = (question: OlympiadQuestion): OlympiadQuestion => ({
  ...question,
  soal: question.soal
    .replace(/^Hasil dari/, "Tentukan nilai")
    .replace(/Manakah pernyataan-pernyataan berikut yang BENAR\? Klik semua yang benar!/, "Pilih semua pernyataan yang tepat berdasarkan informasi berikut.")
    .replace(/Tentukan Benar atau Salah untuk setiap pernyataan berikut!/, "Nilailah setiap pernyataan berikut dengan memilih Benar atau Salah.")
    .replace(/Tentukan Benar atau Salah untuk setiap pernyataan tentang suhu berikut!/, "Nilailah setiap pernyataan suhu berikut dengan memilih Benar atau Salah.")
    .replace(/Pilihlah semua pernyataan yang BENAR!/, "Pilih semua pernyataan yang tepat.")
    .replace(/Pilih semua pernyataan yang BENAR!/, "Pilih semua pernyataan yang tepat.")
    .replace(/Pilih semua estimasi yang benar/, "Tentukan semua estimasi yang masuk akal"),
});

const tkaQuestions: OlympiadQuestion[] = tkaQuestionPrompts.map((question) => ({
  ...editTkaQuestion(question),
  ...tkaAnswerKeys[question.no],
}));

const legacyInteractiveKeys: Record<number, Pick<OlympiadQuestion, "type" | "options" | "correctIndex" | "correctIndices" | "statementAnswers">> = {
  24: { type: "pg", options: ["A. −8°C", "B. 3°C", "C. 11°C", "D. 16°C"], correctIndex: 2 },
  25: { type: "mcma", options: ["A. 15 m lebih tinggi daripada −25 m", "B. −50 m lebih tinggi daripada −10 m", "C. −10 m lebih tinggi daripada −50 m", "D. −25 m lebih rendah daripada 15 m"], correctIndices: [0, 2, 3] },
  26: { type: "pg", options: ["A. −58°C", "B. −8°C", "C. 8°C", "D. 58°C"], correctIndex: 1 },
  27: { type: "pgkbs", options: ["a. 18°C lebih tinggi daripada 14°C", "b. −3°C lebih tinggi daripada −1°C", "c. 2°C lebih tinggi daripada −8°C"], statementAnswers: [true, false, true] },
  28: { type: "mcma", options: ["A. 52 > −31", "B. 74 < −92", "C. −41 < 55", "D. −95 > 112"], correctIndices: [0, 2] },
  29: { type: "pg", options: ["A. −7 < 0 < 15", "B. 15 < 0 < −7", "C. 0 < −7 < 15", "D. −7 < 15 < 0"], correctIndex: 0 },
  30: { type: "mcma", options: ["A. 4 + 6 = 10", "B. 8 + (−3) = 11", "C. 6 + (−10) = −4", "D. −4 + 7 = 3"], correctIndices: [0, 2, 3] },
  31: { type: "pg", options: ["A. −122", "B. −106", "C. −90", "D. 106"], correctIndex: 1 },
  32: { type: "pgkbs", options: ["a. 7 − 15 = −8", "b. −12 − 6 = −18", "c. 30 − (−9) = 21"], statementAnswers: [true, true, false] },
  33: { type: "mcma", options: ["A. Selisih posisi A dan B adalah 100 m", "B. Selisih posisi C dan B adalah 30 m", "C. Selisih posisi A dan C adalah 130 m", "D. Posisi C lebih tinggi daripada posisi A"], correctIndices: [0, 1, 2] },
  34: { type: "pg", options: ["A. −13", "B. 2", "C. 18", "D. 44"], correctIndex: 1 },
  35: { type: "mcma", options: ["A. Kecepatan searah angin menjadi 280 km/jam", "B. Kecepatan melawan angin menjadi 220 km/jam", "C. Selisih kedua kecepatan adalah 30 km/jam", "D. Kecepatan melawan angin lebih besar daripada searah angin"], correctIndices: [0, 1] },
  36: { type: "pg", options: ["A. 1.235°C", "B. 1.250°C", "C. 1.265°C", "D. 1.275°C"], correctIndex: 2 },
  37: { type: "pgkbs", options: ["a. 7 × (−9) = −63", "b. (−6) × (−11) = 66", "c. (−4) × 0 × (−25) = −100"], statementAnswers: [true, true, false] },
  38: { type: "pg", options: ["A. p = 9, q = −8, r = −2, s = −3", "B. p = −9, q = 8, r = 2, s = 3", "C. p = 9, q = 8, r = −2, s = 3", "D. p = −9, q = −8, r = 2, s = −3"], correctIndex: 0 },
  39: { type: "pgkbs", options: ["a. −7 × (−25 + 14) = 77", "b. [−15 − (−40)] × (−12) = −300", "c. [18 × (−6)] + [−22 × (−5)] = −2"], statementAnswers: [true, true, false] },
  40: { type: "pg", options: ["A. −18°C", "B. 0°C", "C. 6°C", "D. 12°C"], correctIndex: 2 },
  41: { type: "pg", options: ["A. 97", "B. 103", "C. 109", "D. 121"], correctIndex: 2 },
  42: { type: "pg", options: ["A. −19", "B. −13", "C. 13", "D. 19"], correctIndex: 3 },
  43: { type: "pg", options: ["A. −168", "B. −40", "C. 64", "D. 168"], correctIndex: 3 },
  44: { type: "pg", options: ["A. −60", "B. −48", "C. 0", "D. 72"], correctIndex: 1 },
  45: { type: "pg", options: ["A. −33", "B. −12", "C. 21", "D. 33"], correctIndex: 3 },
  46: { type: "pg", options: ["A. −109", "B. −83", "C. 83", "D. 109"], correctIndex: 1 },
  47: { type: "pg", options: ["A. −284", "B. −182", "C. −80", "D. 284"], correctIndex: 0 },
  48: { type: "pg", options: ["A. 14", "B. 20", "C. 26", "D. 32"], correctIndex: 2 },
  49: { type: "pg", options: ["A. 106", "B. 114", "C. 122", "D. 130"], correctIndex: 2 },
  50: { type: "pg", options: ["A. 18", "B. 20", "C. 22", "D. 24"], correctIndex: 2 },
  51: { type: "pg", options: ["A. 13 orang", "B. 15 orang", "C. 17 orang", "D. 19 orang"], correctIndex: 2 },
  52: { type: "mcma", options: ["A. Selisih Wina dan Soul adalah −6°C", "B. Selisih Baghdad dan Wina adalah 30°C", "C. Selisih Surabaya dan Soul adalah 34°C", "D. Selisih Surabaya dan Wina adalah 39°C"], correctIndices: [0, 2] },
  53: { type: "pg", options: ["A. Rp5.000", "B. Rp8.000", "C. Rp10.000", "D. Rp12.000"], correctIndex: 2 },
  54: { type: "pg", options: ["A. −5°C", "B. −1°C", "C. 5°C", "D. 7°C"], correctIndex: 0 },
  55: { type: "pg", options: ["A. 21", "B. 30", "C. 33", "D. 45"], correctIndex: 2 },
  56: { type: "pg", options: ["A. −28", "B. −12", "C. 12", "D. 28"], correctIndex: 1 },
  57: { type: "pg", options: ["A. 14", "B. 18", "C. 24", "D. 48"], correctIndex: 2 },
  58: { type: "pg", options: ["A. 9", "B. 12", "C. 18", "D. 27"], correctIndex: 2 },
  59: { type: "pg", options: ["A. 7", "B. 12", "C. 14", "D. 28"], correctIndex: 2 },
  60: { type: "pg", options: ["A. 10", "B. 20", "C. 25", "D. 40"], correctIndex: 1 },
  61: { type: "pg", options: ["A. 45", "B. 60", "C. 90", "D. 180"], correctIndex: 2 },
  62: { type: "pg", options: ["A. 12", "B. 18", "C. 24", "D. 36"], correctIndex: 2 },
  63: { type: "pg", options: ["A. 20.00", "B. 20.30", "C. 21.00", "D. 22.00"], correctIndex: 2 },
  64: { type: "pg", options: ["A. 30 Mei", "B. 15 Juni", "C. 30 Juni", "D. 1 Juli"], correctIndex: 2 },
  65: { type: "pg", options: ["A. 9 wadah", "B. 12 wadah", "C. 18 wadah", "D. 36 wadah"], correctIndex: 2 },
  66: { type: "pg", options: ["A. 20 orang", "B. 30 orang", "C. 40 orang", "D. 60 orang"], correctIndex: 2 },
};

const withLegacyInteraction = (question: OlympiadQuestion): OlympiadQuestion => {
  const interaction = legacyInteractiveKeys[question.no];
  if (!interaction) return question;
  return {
    ...question,
    ...interaction,
  };
};

const bankQuestions: OlympiadQuestion[] = [
  ...tkaQuestions,
  ...penjumlahanQuestions.id.map((question) => ({
    no: question.number + TKA_QUESTION_COUNT,
    category: "Penjumlahan Bilangan Bulat",
    soal: [question.title, question.content].filter(Boolean).join("\n"),
  })),
  ...penguranganQuestions.id.map((question) => ({
    no: question.number + 8 + TKA_QUESTION_COUNT,
    category: "Pengurangan Bilangan Bulat",
    soal: question.content,
    ...(question.image ? { image: question.image } : {}),
  })),
  ...perkalianQuestions.id.map((question) => ({
    no: question.number + 13 + TKA_QUESTION_COUNT,
    category: "Perkalian Bilangan Bulat",
    soal: [
      question.content,
      ...(question.subItems || []).map((item) => `${item.label} ${toReadableMath(item.math)}`),
    ].join("\n"),
  })),
  ...operasiMathQuestions.map((question) => ({
    no: question.number + 18 + TKA_QUESTION_COUNT,
    category: "Operasi Campuran Bilangan Bulat",
    soal: toReadableMath(question.math || ""),
  })),
  ...operasiEssayQuestions.id.map((question) => ({
    no: question.number + 18 + TKA_QUESTION_COUNT,
    category: "Operasi Campuran Bilangan Bulat",
    soal: question.content || "",
  })),
  ...kpkFpbQuestions.id.map((question) => ({
    no: question.number + 33 + TKA_QUESTION_COUNT,
    category: "KPK dan FPB",
    soal: question.content,
  })),
].map(withLegacyInteraction);

export default function BilanganBulatPage() {
  return (
    <OlympiadBankPage
      title="Bilangan Bulat"
      questions={bankQuestions}
      heading="BANK SOAL – BILANGAN BULAT"
      topicLabel="Soal dari seluruh subtopik Tugas-Latihan Mandiri"
      backPath="/bank-soal"
      questionLabel="Tugas-Latihan Mandiri"
      showDiscussion={false}
      showQuestionCategory={false}
    />
  );
}
