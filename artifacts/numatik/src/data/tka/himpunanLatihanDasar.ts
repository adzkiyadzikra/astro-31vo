export interface TkaHimpunanPembahasan {
  konsep: string;
  langkah: string[];
  rumus?: string;
}

export interface TkaHimpunanSoal {
  no: number;
  type?: "pg" | "pgk" | "pgkbs";
  soal: string;
  image?: string;
  options: string[];
  jawaban: string;
  jawabanPGK?: number[];
  pernyataan?: string[];
  jawabanBS?: ("B" | "S")[];
  pembahasan: TkaHimpunanPembahasan;
}

/**
 * Latihan dasar khusus Modul Pemantapan TKA.
 *
 * Data ini sengaja berada di sumber TKA sendiri agar perubahan pada menu lain
 * tidak mengubah latihan TKA secara tidak sengaja.
 */
export const latihanDasarHimpunanTka: TkaHimpunanSoal[] = [
  {
    no: 1,
    soal: "Diketahui\nS = {x | x < 15, x $\\in$ bilangan asli}\nP = {x | 2 $\\leq$ x < 10, x $\\in$ bilangan prima}\nQ = {x | 2 < x $\\leq$ 10, x $\\in$ bilangan genap}\nDiagram Venn yang menyatakan hubungan di atas adalah ...",
    options: ["A. P berada di dalam Q", "B. Q berada di dalam P", "C. P dan Q saling lepas", "D. P dan Q beririsan"],
    jawaban: "C",
    pembahasan: {
      konsep: "Tentukan anggota setiap himpunan, lalu cari irisan P∩Q untuk menentukan bentuk diagram Venn.",
      langkah: [
        "S = {1, 2, 3, ..., 14}",
        "P = {2, 3, 5, 7} — prima dengan 2 ≤ x < 10",
        "Q = {4, 6, 8, 10} — genap dengan 2 < x ≤ 10 (2 tidak masuk karena syarat x > 2)",
        "P ∩ Q = ∅ — tidak ada anggota yang sama di P dan Q",
        "Diagram Venn: P dan Q adalah dua lingkaran yang SALING LEPAS di dalam persegi panjang S"
      ],
      rumus: "Jika P ∩ Q = ∅, diagram Venn menunjukkan dua lingkaran yang tidak berpotongan (saling lepas)."
    }
  },
  {
    no: 2,
    soal: "Diketahui:\nS = {x | 1 $\\leq$ x $\\leq$ 10, x $\\in$ bilangan asli}\nP = {x | x $\\leq$ 6, x $\\in$ bilangan prima}\nQ = {x | 1 $\\leq$ x $\\leq$ 9, x $\\in$ bilangan genap}\nDiagram Venn untuk himpunan-himpunan di atas adalah ...",
    options: ["A.|/himpunan-no2-opsi-a.svg","B.|/himpunan-no2-opsi-b.svg","C.|/himpunan-no2-opsi-c.svg","D.|/himpunan-no2-opsi-d.png"],
    jawaban: "B",
    pembahasan: {
      konsep: "Tentukan anggota S, P, Q dan irisan P∩Q untuk menentukan bentuk diagram Venn yang benar.",
      langkah: [
        "S = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}",
        "P = {2, 3, 5} — prima ≤ 6",
        "Q = {2, 4, 6, 8} — genap, 1 ≤ x ≤ 9",
        "P ∩ Q = {2} — hanya 2 yang prima sekaligus genap",
        "Hanya P: {3, 5} | Hanya Q: {4, 6, 8} | Di luar keduanya: {1, 7, 9, 10}",
        "Jawaban: B. Himpunan saling beririsan, karena P ∩ Q = {2}."
      ],
      rumus: "P ∩ Q = {x | x ∈ P dan x ∈ Q}"
    }
  },
  {
    no: 3,
    soal: "Perhatikan gambar diagram Venn berikut!\nPernyataan berikut yang benar adalah ....",
    image: "/himpunan-no3-diagram.svg",
    type: "pgk",
    options: [],
    pernyataan: [
      "$B \\cup C = \\{1, 2, 3, 4, 5, 6, 8\\}$",
      "$B \\cap C = \\{2, 6, 7, 9\\}$",
      "$B - C = \\{1, 3, 9\\}$",
      "$C - B = \\{5, 8\\}$",
    ],
    jawabanPGK: [2, 3],
    jawaban: "",

    pembahasan: {
      konsep: "Baca diagram Venn dengan cermat, lalu verifikasi setiap pernyataan menggunakan definisi operasi himpunan.",
      langkah: [
        "Dari diagram: B = {1, 2, 3, 6, 7, 9}, C = {2, 5, 6, 7, 8}",
        "Cek A: B∪C = {1,2,3,5,6,7,8,9} ≠ {1,2,3,4,5,6,8} → SALAH ✗",
        "Cek B: B∩C = {2, 6, 7} ≠ {2,6,7,9} → SALAH ✗",
        "Cek C: B - C = anggota B yang tidak ada di C = {1, 3, 9} → BENAR ✓",
        "Cek D: C - B = anggota C yang tidak ada di B = {5, 8} — sesuai diagram → perlu cek soal asli"
      ],
      rumus: "B - C = {x | x ∈ B dan x ∉ C}"
    }
  },
  {
    no: 4,
    soal: "Diketahui\nP = {x | 2 $\\leq$ x $\\leq$ 12, x $\\in$ bilangan cacah} dan Q = {x | x faktor dari 12}.\n$P \\cap Q$ = ...",
    options: ["A. {3, 4, 6}","B. {3, 4, 6, 12}","C. {2, 3, 4, 6, 12}","D. {1, 2, 3, 4, 6, 12}"],
    jawaban: "C",
    pembahasan: {
      konsep: "Tentukan anggota P dan Q terlebih dahulu, lalu ambil irisan (anggota yang ada di keduanya).",
      langkah: [
        "P = {2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12} — bilangan cacah, 2 ≤ x ≤ 12",
        "Q = faktor dari 12 = {1, 2, 3, 4, 6, 12}",
        "P ∩ Q = anggota yang ada di P dan juga di Q:",
        "1 ∉ P ✗ | 2 ∈ P ✓ | 3 ∈ P ✓ | 4 ∈ P ✓ | 6 ∈ P ✓ | 12 ∈ P ✓",
        "P ∩ Q = {2, 3, 4, 6, 12}"
      ],
      rumus: "P ∩ Q = {x | x ∈ P dan x ∈ Q}"
    }
  },
  {
    no: 5,
    soal: "Jika K = {0, 1, 2, 3, 4, 6, 7} dan L = {1, 3, 5, 7, 9, 11, 13}. Hasil K - L adalah ...",
    options: ["A. {0, 9, 11, 13}","B. {1, 3, 5, 7}","C. {0, 2, 4, 6}","D. {5, 9, 11, 13}"],
    jawaban: "C",
    pembahasan: {
      konsep: "Selisih K - L adalah anggota K yang tidak terdapat di L.",
      langkah: [
        "K = {0, 1, 2, 3, 4, 6, 7}, L = {1, 3, 5, 7, 9, 11, 13}",
        "Periksa setiap anggota K:",
        "0 ∉ L ✓ | 1 ∈ L ✗ (dibuang) | 2 ∉ L ✓ | 3 ∈ L ✗ | 4 ∉ L ✓ | 6 ∉ L ✓ | 7 ∈ L ✗",
        "K - L = {0, 2, 4, 6}"
      ],
      rumus: "K - L = {x | x ∈ K dan x ∉ L}"
    }
  },
  {
    no: 6,
    soal: "Diketahui himpunan\nS = {bilangan asli kurang dari 12}\nA = {bilangan ganjil kurang dari 11}\nB = {bilangan prima kurang dari 12}\nKomplemen dari $(A \\cap B)^c$ adalah ...",
    type: "pgk",
    options: [],
    pernyataan: [
      "$A - B = \\{1, 9\\}$",
      "$B - A = \\{2, 11\\}$",
      "$A \\cap B = \\{3, 5, 7\\}$",
      "$(A \\cap B)^c = \\{3, 5, 7\\}$",
    ],
    jawabanPGK: [0, 1, 2],
    jawaban: "",

    pembahasan: {
      konsep: "Komplemen dari komplemen suatu himpunan adalah himpunan itu sendiri: $((H)^c)^c = H$.",
      langkah: [
        "S = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}",
        "A = {1, 3, 5, 7, 9} — ganjil < 11",
        "B = {2, 3, 5, 7, 11} — prima < 12",
        "A ∩ B = {3, 5, 7}",
        "$(A \\cap B)^c = S - \\{3,5,7\\} = \\{1,2,4,6,8,9,10,11\\}$",
        "Komplemen dari $(A \\cap B)^c$ = $((A \\cap B)^c)^c = A \\cap B = \\{3, 5, 7\\}$"
      ],
      rumus: "$((H)^c)^c = H$ untuk setiap himpunan H"
    }
  },
  {
    no: 8,
    soal: "Diketahui himpunan D = {bilangan genap antara 3 dan 14}, himpunan L = {bilangan prima kurang dari 8}, himpunan semesta S = {bilangan asli kurang dari 14}. Komplemen dari $D \\cup L$ adalah ...",
    type: "pgk",
    options: [],
    pernyataan: [
      "$(D - L)^c = \\{1, 2, 3, 5, 7, 9, 11, 13\\}$",
      "$(D \\cap L)^c = S$",
      "$(L - D)^c = \\{1, 4, 6, 8, 9, 10, 11, 12, 13\\}$",
      "$(D \\cup L)^c = \\{1, 9, 11, 13\\}$",
    ],
    jawabanPGK: [0, 1, 2, 3],
    jawaban: "",

    pembahasan: {
      konsep: "Komplemen dari D∪L adalah semua anggota S yang bukan anggota D maupun L.",
      langkah: [
        "S = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13}",
        "D = {4, 6, 8, 10, 12} — genap antara 3 dan 14 (tidak termasuk 3 dan 14)",
        "L = {2, 3, 5, 7} — prima < 8",
        "D ∪ L = {2, 3, 4, 5, 6, 7, 8, 10, 12}",
        "$(D \\cup L)^c = S - (D \\cup L) = \\{1, 9, 11, 13\\}"
      ],
      rumus: "$(D \\cup L)^c = S - (D \\cup L)$"
    }
  },
  {
    no: 10,
    type: "pgkbs",
    soal: "Diketahui\nS = {1, 2, 3, ..., 10}\nA = {x | x $\\leq$ 10, x Bilangan ganjil}\nB = {x | 1 $\\leq$ x $\\leq$ 10, x Bilangan prima}\nTentukan Benar atau Salah untuk setiap pernyataan berikut!",
    options: [],
    pernyataan: [
      "I. Komplemen $(A \\cap B) = \\{1, 2, 4, 6, 8, 9\\}$",
      "II. Komplemen $(A \\cup B) = \\{4, 6, 8, 10\\}$",
      "III. Komplemen $(A - B) = \\{2, 3, 4, 5, 6, 7, 8, 10\\}$",
    ],
    jawabanBS: ["S", "B", "B"],
    jawaban: "",
    pembahasan: {
      konsep: "Verifikasi setiap pernyataan dengan menentukan A, B, lalu menghitung komplemen masing-masing operasi.",
      langkah: [
        "A = {1,3,5,7,9} — ganjil | B = {2,3,5,7} — prima",
        "I. A∩B = {3,5,7}; $(A∩B)^c$ = {1,2,4,6,8,9,10} — soal tulis {1,2,4,6,8,9} (kurang 10) → SALAH ✗",
        "II. A∪B = {1,2,3,5,7,9}; $(A∪B)^c$ = {4,6,8,10} → BENAR ✓",
        "III. A-B = {1,9}; $(A-B)^c$ = {2,3,4,5,6,7,8,10} → BENAR ✓",
        "IV. B-A = {2}; $(B-A)^c$ = {1,3,4,5,6,7,8,9,10} — soal bilang {2,11} dan 11∉S → SALAH ✗",
        "Yang benar: II dan III"
      ],
      rumus: "Komplemen selalu dihitung terhadap himpunan semesta S."
    }
  },
  {
    no: 11,
    soal: "Diketahui A = {huruf pembentuk kata \"matematika\"}, dan B = {huruf pembentuk kata \"Jakarta\"}\nA - B adalah ...",
    options: ["A. {m, e, i, k, j, r}","B. {m, e, i}","C. {a, t, k}","D. {j, r}"],
    jawaban: "B",
    pembahasan: {
      konsep: "Selisih A-B adalah anggota A yang tidak terdapat di B. Tentukan huruf unik dari setiap kata terlebih dahulu.",
      langkah: [
        "A = huruf unik dari 'matematika' = {m, a, t, e, i, k}",
        "B = huruf unik dari 'Jakarta' = {j, a, k, r, t}",
        "A - B = anggota A yang tidak ada di B:",
        "m ∉ B ✓ | a ∈ B ✗ | t ∈ B ✗ | e ∉ B ✓ | i ∉ B ✓ | k ∈ B ✗",
        "A - B = {m, e, i}"
      ],
      rumus: "A - B = {x | x ∈ A dan x ∉ B}"
    }
  },
  {
    no: 12,
    soal: "Diketahui himpunan P = {bilangan prima kurang dari 15} dan $P \\cap Q = \\{2, 3, 5\\}$. Himpunan Q yang mungkin adalah ....",
    options: ["A. {faktor dari 15}","B. {faktor dari 30}","C. {bilangan prima kurang dari 11}","D. {bilangan ganjil kurang dari 9}"],
    jawaban: "B",
    pembahasan: {
      konsep: "P∩Q = {2,3,5} berarti Q harus memuat 2, 3, 5 tetapi tidak memuat 7, 11, 13 (anggota P lainnya).",
      langkah: [
        "P = {2, 3, 5, 7, 11, 13} — prima < 15",
        "Syarat Q: mengandung {2,3,5} dan tidak mengandung {7,11,13}",
        "A. faktor 15 = {1,3,5,15} → P∩Q = {3,5}, tidak ada 2 → SALAH ✗",
        "B. faktor 30 = {1,2,3,5,6,10,15,30} → P∩Q = {2,3,5} dan 7,11,13 ∉ Q → BENAR ✓",
        "C. prima < 11 = {2,3,5,7} → P∩Q = {2,3,5,7}, ada 7 → SALAH ✗",
        "D. ganjil < 9 = {1,3,5,7} → P∩Q = {3,5,7}, tidak ada 2 → SALAH ✗"
      ],
      rumus: "$P \\cap Q = \\{2,3,5\\}$ ⟹ $\\{2,3,5\\} \\subseteq Q$ dan $Q \\cap \\{7,11,13\\} = \\emptyset$"
    }
  },
  {
    no: 13,
    soal: "Diketahui {x | 4 $\\leq$ x $\\leq$ 15, x $\\in$ bilangan prima}. Banyak himpunan bagian dari A adalah ...",
    options: ["A. 8","B. 16","C. 25","D. 32"],
    jawaban: "B",
    pembahasan: {
      konsep: "Tentukan anggota A terlebih dahulu, lalu gunakan rumus banyak himpunan bagian $2^n$.",
      langkah: [
        "A = {x | 4 ≤ x ≤ 15, x prima}",
        "Bilangan prima di antara 4 dan 15: 5, 7, 11, 13",
        "n(A) = 4",
        "Banyak himpunan bagian = $2^4 = 16$"
      ],
      rumus: "Banyak himpunan bagian = $2^{n(A)}$"
    }
  },
  {
    no: 14,
    soal: "Diketahui P = {x | x < 10, x $\\in$ bilangan asli genap}. Banyaknya himpunan bagian dari P yang mempunyai 3 anggota adalah ...",
    options: ["A. 5","B. 10","C. 16","D. 32"],
    jawaban: "B",
    pembahasan: {
      konsep: "Gunakan rumus kombinasi $\\binom{n}{r}$ untuk menghitung himpunan bagian dengan tepat r anggota.",
      langkah: [
        "P = bilangan asli genap < 10 = {0, 2, 4, 6, 8} (termasuk 0 sebagai bilangan cacah genap)",
        "n(P) = 5",
        "Himpunan bagian dengan tepat 3 anggota = $\\binom{5}{3} = \\frac{5!}{3! \\cdot 2!} = 10$"
      ],
      rumus: "$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$"
    }
  },
  {
    no: 15,
    soal: "Dari 30 siswa diketahui 16 anak gemar IPA, 12 anak gemar Matematika, serta 5 anak tidak gemar IPA atau Matematika. Banyaknya anak yang hanya gemar Matematika adalah ...",
    options: ["A. 3","B. 9","C. 10","D. 12"],
    jawaban: "B",
    pembahasan: {
      konsep: "Gunakan rumus gabungan dua himpunan untuk mencari irisan, lalu hitung yang hanya gemar Matematika.",
      langkah: [
        "Total = 30, n(IPA) = 16, n(Mat) = 12, tidak keduanya = 5",
        "n(IPA ∪ Mat) = 30 - 5 = 25",
        "25 = 16 + 12 - n(IPA ∩ Mat) → n(IPA ∩ Mat) = 3",
        "Hanya Matematika = n(Mat) - n(IPA ∩ Mat) = 12 - 3 = 9"
      ],
      rumus: "$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$"
    }
  },
  {
    no: 16,
    soal: "Petugas lalu lintas melakukan pemeriksaan terhadap pengendara kendaraan bermotor. Hasilnya 25 orang memiliki SIM A, 30 orang memiliki SIM C, 17 orang memiliki SIM A & C, sedangkan 12 orang tidak memiliki SIM A maupun C. Banyak pengendara bermotor yang diperiksa adalah....",
    options: ["A. 50 orang","B. 60 orang","C. 72 orang","D. 84 orang"],
    jawaban: "A",
    pembahasan: {
      konsep: "Hitung n(A∪C) dengan rumus gabungan, lalu tambahkan yang tidak memiliki keduanya.",
      langkah: [
        "n(A) = 25, n(C) = 30, n(A∩C) = 17, tidak keduanya = 12",
        "n(A∪C) = n(A) + n(C) - n(A∩C) = 25 + 30 - 17 = 38",
        "Total = n(A∪C) + tidak keduanya = 38 + 12 = 50"
      ],
      rumus: "Total = $n(A \\cup C) + $ yang tidak keduanya"
    }
  },
  {
    no: 17,
    soal: "Dari 24 siswa kelas A, diketahui 15 siswa suka basket, 5 siswa suka Futsal dan basket, serta 4 siswa tidak suka keduanya, maka banyak siswa yang menyukai salah satu adalah...",
    options: ["A. 4","B. 5","C. 10","D. 15"],
    jawaban: "D",
    pembahasan: {
      konsep: "Cari n(Futsal) dari n(B∪F), lalu hitung yang hanya suka satu olahraga saja.",
      langkah: [
        "Total = 24, n(B) = 15, n(B∩F) = 5, tidak keduanya = 4",
        "n(B∪F) = 24 - 4 = 20",
        "n(F) = n(B∪F) - n(B) + n(B∩F) = 20 - 15 + 5 = 10",
        "Hanya basket = 15 - 5 = 10 | Hanya futsal = 10 - 5 = 5",
        "Menyukai salah satu (tidak keduanya) = 10 + 5 = 15"
      ],
      rumus: "$n(B \\cup F) = n(B) + n(F) - n(B \\cap F)$"
    }
  },
  {
    no: 18,
    soal: "Peserta tes dinyatakan diterima masuk sekolah jika lulus tes wawancara dan psikotes. Dari 50 peserta tes diketahui jumlah siswa yang lulus tes psikotes dua kali dari jumlah yang lulus tes wawancara. Jika akhirnya peserta yang diterima sebanyak 10 orang, maka banyaknya peserta yang lulus psikotes adalah...",
    options: ["A. 20","B. 30","C. 40","D. 45"],
    jawaban: "C",
    pembahasan: {
      konsep: "Misalkan lulus wawancara = x dan lulus psikotes = 2x, lalu gunakan rumus gabungan dua himpunan.",
      langkah: [
        "Misalkan: lulus wawancara = x, lulus psikotes = 2x",
        "Diterima (lulus keduanya) = 10",
        "$n(W \\cup P) = 50$ (semua peserta)",
        "Rumus: $x + 2x - 10 = 50 \\Rightarrow 3x = 60 \\Rightarrow x = 20$",
        "Lulus psikotes = $2x = 2 \\times 20 = 40$"
      ],
      rumus: "$n(W \\cup P) = n(W) + n(P) - n(W \\cap P)$"
    }
  },
  {
    no: 19,
    soal: "Dalam suatu survey yang dilakukan terhadap 60 orang, diperoleh informasi bahwa 25 orang berlangganan Newsweek, 26 orang berlangganan Time, dan 26 orang berlangganan Fortune. Diketahui juga bahwa 9 orang berlangganan Newsweek dan Fortune, 11 orang berlangganan Newsweek dan Time, 8 orang berlangganan Time dan Fortune, dan 8 orang tidak berlangganan majalah apapun. Berapa orangkah yang berlangganan ketiga majalah Newsweek, Time dan Fortune?",
    options: ["A. 2","B. 3","C. 4","D. 5"],
    jawaban: "B",
    pembahasan: {
      konsep: "Gunakan rumus gabungan tiga himpunan untuk mencari yang berlangganan ketiga majalah.",
      langkah: [
        "N=25, T=26, F=26; N∩F=9, N∩T=11, T∩F=8; tidak satupun=8",
        "$n(N \\cup T \\cup F) = 60 - 8 = 52$",
        "$52 = 25 + 26 + 26 - 11 - 9 - 8 + n(N \\cap T \\cap F)$",
        "$52 = 49 + n(N \\cap T \\cap F)$",
        "$n(N \\cap T \\cap F) = 3$"
      ],
      rumus: "$n(A \\cup B \\cup C) = n(A)+n(B)+n(C) - n(A\\cap B) - n(A\\cap C) - n(B\\cap C) + n(A\\cap B\\cap C)$"
    }
  },
  {
    no: 20,
    soal: "Suatu kelas terdiri dari 42 siswa. $\\frac{1}{3}$ dari seluruh siswa itu menyukai olahraga berenang, $\\frac{1}{6}$ nya menyukai berenang dan sepakbola dan $\\frac{3}{7}$ nya tidak menyukai kedua olahraga tersebut. Banyak orang yang menyukai sepakbola adalah ...",
    options: ["A. 7 siswa","B. 10 siswa","C. 17 siswa","D. 24 siswa"],
    jawaban: "C",
    pembahasan: {
      konsep: "Terjemahkan pecahan ke bilangan nyata, gunakan rumus dua himpunan untuk mencari n(Sepakbola).",
      langkah: [
        "Total = 42",
        "$n(R) = \\frac{1}{3} \\times 42 = 14$ (renang)",
        "$n(R \\cap S) = \\frac{1}{6} \\times 42 = 7$ (renang dan sepakbola)",
        "Tidak keduanya = $\\frac{3}{7} \\times 42 = 18$",
        "$n(R \\cup S) = 42 - 18 = 24$",
        "$24 = 14 + n(S) - 7 \\Rightarrow n(S) = 17$"
      ],
      rumus: "$n(R \\cup S) = n(R) + n(S) - n(R \\cap S)$"
    }
  },
];
