import type { ReactNode } from "react";
import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import { latihanDasarHimpunanTka } from "@/data/tka/himpunanLatihanDasar";

type VennOptionKind = "pInsideQ" | "qInsideP" | "disjoint" | "overlap";

const VennOptionSvg = ({ kind }: { kind: VennOptionKind }) => {
  const isPInsideQ = kind === "pInsideQ";
  const isQInsideP = kind === "qInsideP";
  const isDisjoint = kind === "disjoint";

  const circles = isPInsideQ ? (
    <>
      <circle cx="132" cy="69" r="43" fill="rgba(59,130,246,0.2)" stroke="#60a5fa" strokeWidth="2.5" />
      <circle cx="132" cy="69" r="22" fill="rgba(244,114,182,0.28)" stroke="#f9a8d4" strokeWidth="2.5" />
      <text x="132" y="74" textAnchor="middle" fill="#fce7f3" fontSize="14" fontWeight="700">P</text>
      <text x="132" y="31" textAnchor="middle" fill="#bfdbfe" fontSize="14" fontWeight="700">Q</text>
    </>
  ) : isQInsideP ? (
    <>
      <circle cx="132" cy="69" r="43" fill="rgba(244,114,182,0.2)" stroke="#f9a8d4" strokeWidth="2.5" />
      <circle cx="132" cy="69" r="22" fill="rgba(59,130,246,0.28)" stroke="#93c5fd" strokeWidth="2.5" />
      <text x="132" y="74" textAnchor="middle" fill="#dbeafe" fontSize="14" fontWeight="700">Q</text>
      <text x="132" y="31" textAnchor="middle" fill="#fbcfe8" fontSize="14" fontWeight="700">P</text>
    </>
  ) : isDisjoint ? (
    <>
      <circle cx="92" cy="69" r="29" fill="rgba(59,130,246,0.24)" stroke="#60a5fa" strokeWidth="2.5" />
      <circle cx="172" cy="69" r="29" fill="rgba(244,114,182,0.24)" stroke="#f9a8d4" strokeWidth="2.5" />
      <text x="92" y="74" textAnchor="middle" fill="#dbeafe" fontSize="14" fontWeight="700">P</text>
      <text x="172" y="74" textAnchor="middle" fill="#fce7f3" fontSize="14" fontWeight="700">Q</text>
    </>
  ) : (
    <>
      <circle cx="108" cy="69" r="34" fill="rgba(59,130,246,0.24)" stroke="#60a5fa" strokeWidth="2.5" />
      <circle cx="156" cy="69" r="34" fill="rgba(244,114,182,0.24)" stroke="#f9a8d4" strokeWidth="2.5" />
      <text x="93" y="74" textAnchor="middle" fill="#dbeafe" fontSize="14" fontWeight="700">P</text>
      <text x="171" y="74" textAnchor="middle" fill="#fce7f3" fontSize="14" fontWeight="700">Q</text>
    </>
  );

  return (
    <svg
      viewBox="0 0 264 132"
      role="img"
      aria-label={`Diagram Venn opsi ${kind}`}
      className="h-auto w-full max-w-[264px]"
    >
      <rect x="4" y="4" width="256" height="124" rx="12" fill="rgba(15,23,42,0.72)" stroke="rgba(148,163,184,0.55)" strokeWidth="2" />
      <text x="16" y="23" fill="#cbd5e1" fontSize="12" fontWeight="700">S</text>
      {circles}
    </svg>
  );
};

const materiSections: MateriSection[] = [
  { heading: "A. Pengertian Himpunan", content: `Himpunan adalah kumpulan objek yang terdefinisi dengan jelas.\n\nCara menyatakan himpunan:\n1. Dengan kata-kata: "Himpunan bilangan genap"\n2. Dengan notasi pembentuk himpunan: $A = \\{x | x$ bilangan genap$\\}$\n3. Dengan mendaftar anggotanya: $A = \\{2, 4, 6, 8, ...\\}$` },
  { heading: "B. Jenis-jenis Himpunan", content: `- Himpunan kosong ($\\emptyset$ atau $\\{\\}$): tidak memiliki anggota\n- Himpunan semesta (S atau U): memuat semua anggota yang dibicarakan\n- Himpunan berhingga: jumlah anggota dapat dihitung\n- Himpunan tak berhingga: jumlah anggota tidak dapat dihitung\n- Himpunan sama: memiliki anggota yang tepat sama\n- Himpunan ekuivalen: memiliki jumlah anggota yang sama` },
  { heading: "C. Operasi Himpunan", content: `1. Gabungan (Union): $A \\cup B = \\{x | x \\in A$ atau $x \\in B\\}$\n   Rumus: $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$\n\n2. Irisan (Intersection): $A \\cap B = \\{x | x \\in A$ dan $x \\in B\\}$\n\n3. Selisih (Difference): $A - B = \\{x | x \\in A$ dan $x \\notin B\\}$\n\n4. Komplemen: $A^c = \\{x | x \\in S$ dan $x \\notin A\\}$\n\n5. Hukum De Morgan:\n   $(A \\cup B)^c = A^c \\cap B^c$\n   $(A \\cap B)^c = A^c \\cup B^c$` },
  { heading: "D. Diagram Venn", content: `Diagram Venn digunakan untuk menyatakan hubungan antar himpunan secara visual.\n\nRumus kardinalitas untuk tiga himpunan:\n$n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(A \\cap C) - n(B \\cap C) + n(A \\cap B \\cap C)$` },
];

const latihanDasar: LatihanSoal[] = latihanDasarHimpunanTka.map((item) => ({
  no: item.no,
  soal: item.image ? `${item.soal}\n[IMAGE:${item.image}]` : item.soal,
  type: item.type,
  options: item.options,
  pernyataan: item.pernyataan,
  jawabanPGK: item.jawabanPGK,
  jawabanBS: item.jawabanBS,
  optionsJsx: item.no === 1
    ? ([
        <VennOptionSvg key="A" kind="pInsideQ" />,
        <VennOptionSvg key="B" kind="qInsideP" />,
        <VennOptionSvg key="C" kind="disjoint" />,
        <VennOptionSvg key="D" kind="overlap" />,
      ] satisfies ReactNode[])
    : undefined,
  jawaban: item.jawaban,
  pembahasan: typeof item.pembahasan === "string" ? item.pembahasan : item.pembahasan ? [item.pembahasan.konsep, ...item.pembahasan.langkah, item.pembahasan.rumus].filter(Boolean).join("\n") : "",
}));

const HimpunanPage = () => (
  <TKAPemantapanLayout
    title="HIMPUNAN"
    materiSections={materiSections}
    contohSoal={getTkaContohSoal("himpunan")}
  latihanDasar={latihanDasar}
  />
);

export default HimpunanPage;
