import { lazy, Suspense, useEffect } from "react";
import MenuPage from "./pages/MenuPage";
import { Analytics } from '@vercel/analytics/react';
import { Capacitor } from '@capacitor/core';
import { initGA, trackPageView } from '@/lib/analytics';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { startGlobalAmbient } from "@/hooks/useAudio";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SoundProvider } from "@/contexts/SoundContext";
import { MusicProvider } from "@/contexts/MusicContext";
import { FontProvider } from "@/contexts/FontContext";
import PageLoader from "@/components/PageLoader";

// ── Lazy-loaded pages ──────────────────────────────────────────────────────
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const ExamBrowserComingSoonPage = lazy(() => import("./pages/ExamBrowserComingSoonPage"));

  const UjiMandiriPage = lazy(() => import("./pages/UjiMandiriPage"));

const LKPDPage = lazy(() => import("./pages/LKPDPage"));
const LKPDMenuPage = lazy(() => import("./pages/LKPDMenuPage"));
const LKPDKelas7Page = lazy(() => import("./pages/LKPDKelasPage").then(m => ({ default: m.LKPDKelas7Page })));
const LKPDKelas8Page = lazy(() => import("./pages/LKPDKelasPage").then(m => ({ default: m.LKPDKelas8Page })));
const LKPDKelas9Page = lazy(() => import("./pages/LKPDKelasPage").then(m => ({ default: m.LKPDKelas9Page })));
const LKPDPerbandinganPage = lazy(() => import("./pages/LKPDPerbandinganPage"));
const BertingkatLKPDPage = lazy(() => import("./pages/lkpd/kelas7/perbandingan/BertingkatLKPDPage"));
const SenilaiLKPDPage = lazy(() => import("./pages/lkpd/kelas7/perbandingan/SenilaiLKPDPage"));
const SkalaLKPDPage = lazy(() => import("./pages/lkpd/kelas7/perbandingan/SkalaLKPDPage"));
const CampuranLKPDPage = lazy(() => import("./pages/lkpd/kelas7/perbandingan/CampuranLKPDPage"));
const BilanganBulatMenuPage = lazy(() => import("./pages/lkpd/kelas7/BilanganBulatMenuPage"));
const PenjumlahanLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-bulat/PenjumlahanLKPDPage"));
const PesawatTembakMeteorPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-bulat/PesawatTembakMeteorPage"));
const PesawatTembakMeteorPenjumlahanPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-bulat/PesawatTembakMeteorPenjumlahanPage"));
const PenguranganLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-bulat/PenguranganLKPDPage"));
const PerkalianLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-bulat/PerkalianLKPDPage"));
const PembagianLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-bulat/PembagianLKPDPage"));
const OperasiCampuranLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-bulat/OperasiCampuranLKPDPage"));
const KPKFPBLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-bulat/KPKFPBLKPDPage"));
const BilanganRasionalMenuPage = lazy(() => import("./pages/lkpd/kelas7/BilanganRasionalMenuPage"));
const ArtiPecahanLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-rasional/ArtiPecahanLKPDPage"));
const AljabarMenuPage = lazy(() => import("./pages/lkpd/kelas7/AljabarMenuPage"));
const PengertianUnsurAljabarLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aljabar/PengertianUnsurAljabarLKPDPage"));
const PenjumlahanPenguranganAljabarLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aljabar/PenjumlahanPenguranganAljabarLKPDPage"));
const PerkalianPembagianAljabarLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aljabar/PerkalianPembagianAljabarLKPDPage"));
const SubstitusiAljabarLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aljabar/SubstitusiAljabarLKPDPage"));
const FaktorisasiAljabarLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aljabar/FaktorisasiAljabarLKPDPage"));
const AritmetikaSosialMenuPage = lazy(() => import("./pages/lkpd/kelas7/AritmetikaSosialMenuPage"));
const JualBeliUntungRugiLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aritmetika-sosial/JualBeliUntungRugiLKPDPage"));
const DiskonLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aritmetika-sosial/DiskonLKPDPage"));
const BrutoNettoTaraLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aritmetika-sosial/BrutoNettoTaraLKPDPage"));
const BungaTunggalLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aritmetika-sosial/BungaTunggalLKPDPage"));
const GarisDanSudutLKPDPage = lazy(() => import("./pages/lkpd/kelas7/garis-sudut/GarisDanSudutLKPDPage"));
const SegitigaDanSegiempatLKPDPage = lazy(() => import("./pages/lkpd/kelas7/segitiga-segiempat/SegitigaDanSegiempatLKPDPage"));
const HimpunanLKPDPage = lazy(() => import("./pages/lkpd/kelas7/himpunan/HimpunanLKPDPage"));
const HimpunanMenuPage = lazy(() => import("./pages/lkpd/kelas7/HimpunanMenuPage"));
const GarisDanSudutMenuPage = lazy(() => import("./pages/lkpd/kelas7/GarisDanSudutMenuPage"));
const SegitigaDanSegiempatMenuPage = lazy(() => import("./pages/lkpd/kelas7/SegitigaDanSegiempatMenuPage"));
const PolaBilanganLKPDPage = lazy(() => import("./pages/lkpd/kelas8/pola-bilangan/PolaBilanganLKPDPage"));
const PolaBilanganMenuPage = lazy(() => import("./pages/lkpd/kelas8/PolaBilanganMenuPage"));
const KoordinatCartesiusLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas8/KoordinatCartesiusMenuPage"));
const KoordinatCartesiusLKPDPage = lazy(() => import("./pages/lkpd/kelas8/koordinat-cartesius/KoordinatCartesiusLKPDPage"));
const RelasiFungsiLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas8/RelasiFungsiMenuPage"));
const RelasiFungsiLKPDPage = lazy(() => import("./pages/lkpd/kelas8/relasi-fungsi/RelasiFungsiLKPDPage"));
const SPLDVLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas8/SPLDVMenuPage"));
const SPLDVLKPDPage = lazy(() => import("./pages/lkpd/kelas8/spldv/SPLDVLKPDPage"));
const SPLDVMetodeEliminasiLKPDPage = lazy(() => import("./pages/lkpd/kelas8/spldv/MetodeEliminasiLKPDPage"));
const PostesEliminasiDispatcher = lazy(() => import("./pages/lkpd/kelas8/spldv/PostesEliminasiDispatcher"));
const SPLDVMetodeSubstitusiLKPDPage = lazy(() => import("./pages/lkpd/kelas8/spldv/MetodeSubstitusiLKPDPage"));
const SPLDVMetodeCampuranLKPDPage = lazy(() => import("./pages/lkpd/kelas8/spldv/MetodeCampuranLKPDPage"));
const SPLDVDefinisiLKPDPage = lazy(() => import("./pages/lkpd/kelas8/spldv/DefinisiSPLDVLKPDPage"));
const SPLDVMetodeGrafikLKPDPage = lazy(() => import("./pages/lkpd/kelas8/spldv/MetodeGrafikLKPDPage"));
const SPLDVModelLKPDPage = lazy(() => import("./pages/lkpd/kelas8/spldv/ModelSPLDVLKPDPage"));
const SPLDVPenyelesaianMasalahLKPDPage = lazy(() => import("./pages/lkpd/kelas8/spldv/PenyelesaianMasalahLKPDPage"));
const PersamaanGarisLurusLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas8/PersamaanGarisLurusMenuPage"));
const PersamaanGarisLurusLKPDPage = lazy(() => import("./pages/lkpd/kelas8/persamaan-garis-lurus/PersamaanGarisLurusLKPDPage"));
const BukuAnimasiPGLPage = lazy(() => import("./pages/lkpd/kelas8/persamaan-garis-lurus/BukuAnimasiPGLPage"));
const TeoremaPythagorasLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas8/TeoremaPythagorasMenuPage"));
const TeoremaPythagorasLKPDPage = lazy(() => import("./pages/lkpd/kelas8/teorema-pythagoras/TeoremaPythagorasLKPDPage"));
const LingkaranLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas8/LingkaranMenuPage"));
const LingkaranLKPDPage = lazy(() => import("./pages/lkpd/kelas8/lingkaran/LingkaranLKPDPage"));
const GarisSinggungLingkaranLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas8/GarisSinggungLingkaranMenuPage"));
const GarisSinggungLingkaranLKPDPage = lazy(() => import("./pages/lkpd/kelas8/garis-singgung-lingkaran/GarisSinggungLingkaranLKPDPage"));
const BangunRuangSisiDatarLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas8/BangunRuangSisiDatarMenuPage"));
const KubusBRSDLKPDPage = lazy(() => import("./pages/lkpd/kelas8/bangun-ruang-sisi-datar/KubusLKPDPage"));
const BalokBRSDLKPDPage = lazy(() => import("./pages/lkpd/kelas8/bangun-ruang-sisi-datar/BalokLKPDPage"));
const PrismaBRSDLKPDPage = lazy(() => import("./pages/lkpd/kelas8/bangun-ruang-sisi-datar/PrismaLKPDPage"));
const LimasBRSDLKPDPage = lazy(() => import("./pages/lkpd/kelas8/bangun-ruang-sisi-datar/LimasLKPDPage"));
const GabunganBRSDLKPDPage = lazy(() => import("./pages/lkpd/kelas8/bangun-ruang-sisi-datar/GabunganBRSDLKPDPage"));
const BilanganBerpangkatLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas9/BilanganBerpangkatMenuPage"));
const PengertianNotasiPangkatLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bilangan-berpangkat/PengertianNotasiPangkatLKPDPage"));
const SifatOperasiPangkatLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bilangan-berpangkat/SifatOperasiPangkatLKPDPage"));
const BentukAkarLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bilangan-berpangkat/BentukAkarLKPDPage"));
const MerasionalkanAkarLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bilangan-berpangkat/MerasionalkanAkarLKPDPage"));
const NotasiIlmiahLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bilangan-berpangkat/NotasiIlmiahLKPDPage"));
const KesebangunanKekongruenanLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas9/KesebangunanKekongruenanMenuPage"));
const TransformasiGeometriLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas9/TransformasiGeometriMenuPage"));
const TranslasiTGLKPDPage = lazy(() => import("./pages/lkpd/kelas9/transformasi-geometri/TranslasiLKPDPage"));
const RefleksiTGLKPDPage = lazy(() => import("./pages/lkpd/kelas9/transformasi-geometri/RefleksiLKPDPage"));
const RotasiTGLKPDPage = lazy(() => import("./pages/lkpd/kelas9/transformasi-geometri/RotasiLKPDPage"));
const DilatasiTGLKPDPage = lazy(() => import("./pages/lkpd/kelas9/transformasi-geometri/DilatasiLKPDPage"));
const BangunRuangSisiLengkungLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas9/BangunRuangSisiLengkungMenuPage"));
const TabungBRSLLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bangun-ruang-sisi-lengkung/TabungLKPDPage"));
const KerucutBRSLLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bangun-ruang-sisi-lengkung/KerucutLKPDPage"));
const BolaBRSLLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bangun-ruang-sisi-lengkung/BolaLKPDPage"));
const PerubahanLuasVolumeBRSLLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bangun-ruang-sisi-lengkung/PerubahanLuasVolumeLKPDPage"));
const GabunganBRSLLKPDPage = lazy(() => import("./pages/lkpd/kelas9/bangun-ruang-sisi-lengkung/GabunganBRSLLKPDPage"));
const StatistikaLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas9/StatistikaMenuPage"));
const PengantarStatistikaLKPDPage = lazy(() => import("./pages/lkpd/kelas9/statistika/PengantarStatistikaLKPDPage"));
const PenyajianDataLKPDPage = lazy(() => import("./pages/lkpd/kelas9/statistika/PenyajianDataLKPDPage"));
const RataRataStatistikaLKPDPage = lazy(() => import("./pages/lkpd/kelas9/statistika/RataRataLKPDPage"));
const MedianModusLKPDPage = lazy(() => import("./pages/lkpd/kelas9/statistika/MedianModusLKPDPage"));
const KuartilLKPDPage = lazy(() => import("./pages/lkpd/kelas9/statistika/KuartilLKPDPage"));
const JangkauanSimpanganLKPDPage = lazy(() => import("./pages/lkpd/kelas9/statistika/JangkauanSimpanganLKPDPage"));
const PeluangLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas9/PeluangMenuPage"));
const RuangSampelLKPDPage = lazy(() => import("./pages/lkpd/kelas9/peluang/RuangSampelLKPDPage"));
const PeluangEmpirikLKPDPage = lazy(() => import("./pages/lkpd/kelas9/peluang/PeluangEmpirikLKPDPage"));
const PeluangTeoretikLKPDPage = lazy(() => import("./pages/lkpd/kelas9/peluang/PeluangTeoretikLKPDPage"));
const FrekuensiHarapanLKPDPage = lazy(() => import("./pages/lkpd/kelas9/peluang/FrekuensiHarapanLKPDPage"));
const KomplemenLKPDPage = lazy(() => import("./pages/lkpd/kelas9/peluang/KomplemenLKPDPage"));
const PeluangKejadianMajemukLKPDPage = lazy(() => import("./pages/lkpd/kelas9/peluang/PeluangKejadianMajemukLKPDPage"));
const PersamaanKuadratLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas9/PersamaanKuadratMenuPage"));
const PKBentukUmumLKPDPage = lazy(() => import("./pages/lkpd/kelas9/persamaan-kuadrat/BentukUmumLKPDPage"));
const PKPemfaktoranLKPDPage = lazy(() => import("./pages/lkpd/kelas9/persamaan-kuadrat/PemfaktoranLKPDPage"));
const PKRumusKuadratikLKPDPage = lazy(() => import("./pages/lkpd/kelas9/persamaan-kuadrat/RumusKuadratikLKPDPage"));
const PKPelengkapKuadratLKPDPage = lazy(() => import("./pages/lkpd/kelas9/persamaan-kuadrat/PelengkapKuadratLKPDPage"));
const PKDiskriminanLKPDPage = lazy(() => import("./pages/lkpd/kelas9/persamaan-kuadrat/DiskriminanLKPDPage"));
const PKMenyusunBaruLKPDPage = lazy(() => import("./pages/lkpd/kelas9/persamaan-kuadrat/MenyusunPKBaruLKPDPage"));
const PKPenerapanKontekstualLKPDPage = lazy(() => import("./pages/lkpd/kelas9/persamaan-kuadrat/PenerapanKontekstualLKPDPage"));
const FungsiKuadratLKPDMenuPage = lazy(() => import("./pages/lkpd/kelas9/FungsiKuadratMenuPage"));
const FKBentukUmumKarakteristikLKPDPage = lazy(() => import("./pages/lkpd/kelas9/fungsi-kuadrat/BentukUmumKarakteristikLKPDPage"));
const FKTitikPotongLKPDPage = lazy(() => import("./pages/lkpd/kelas9/fungsi-kuadrat/TitikPotongLKPDPage"));
const FKSumbuSimetriPuncakLKPDPage = lazy(() => import("./pages/lkpd/kelas9/fungsi-kuadrat/SumbuSimetriPuncakLKPDPage"));
const FKMenggambarGrafikLKPDPage = lazy(() => import("./pages/lkpd/kelas9/fungsi-kuadrat/MenggambarGrafikLKPDPage"));
const FKMenyusunFungsiLKPDPage = lazy(() => import("./pages/lkpd/kelas9/fungsi-kuadrat/MenyusunFungsiLKPDPage"));
const FKPenerapanMaksMinLKPDPage = lazy(() => import("./pages/lkpd/kelas9/fungsi-kuadrat/PenerapanMaksMinLKPDPage"));
const PPNLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aritmetika-sosial/PPNLKPDPage"));
const PPhLKPDPage = lazy(() => import("./pages/lkpd/kelas7/aritmetika-sosial/PPhLKPDPage"));
const PecahanCampuranLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-rasional/PecahanCampuranLKPDPage"));
const PenjumlahanPenguranganPecahanLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-rasional/PenjumlahanPenguranganPecahanLKPDPage"));
const PerkalianPecahanLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-rasional/PerkalianPecahanLKPDPage"));
const PembagianPecahanLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-rasional/PembagianPecahanLKPDPage"));
const BentukDesimalLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-rasional/BentukDesimalLKPDPage"));
const OperasiDesimalLKPDPage = lazy(() => import("./pages/lkpd/kelas7/bilangan-rasional/OperasiDesimalLKPDPage"));
const PLSVPtLSVMenuPage = lazy(() => import("./pages/lkpd/kelas7/PLSVPtLSVMenuPage"));
const KalimatTerbukaTertutupLKPDPage = lazy(() => import("./pages/lkpd/kelas7/plsv-ptlsv/KalimatTerbukaTertutupLKPDPage"));
const PengertianPLSVLKPDPage = lazy(() => import("./pages/lkpd/kelas7/plsv-ptlsv/PengertianPLSVLKPDPage"));
const PenyelesaianPLSVLKPDPage = lazy(() => import("./pages/lkpd/kelas7/plsv-ptlsv/PenyelesaianPLSVLKPDPage"));
const ModelMatematikaPLSVLKPDPage = lazy(() => import("./pages/lkpd/kelas7/plsv-ptlsv/ModelMatematikaPLSVLKPDPage"));
const PengertianPtLSVLKPDPage = lazy(() => import("./pages/lkpd/kelas7/plsv-ptlsv/PengertianPtLSVLKPDPage"));
const PenyelesaianPtLSVLKPDPage = lazy(() => import("./pages/lkpd/kelas7/plsv-ptlsv/PenyelesaianPtLSVLKPDPage"));
const ModelMatematikaPtLSVLKPDPage = lazy(() => import("./pages/lkpd/kelas7/plsv-ptlsv/ModelMatematikaPtLSVLKPDPage"));
const ATPPage = lazy(() => import("./pages/ATPPage"));
const GuruLayout = lazy(() => import("./components/GuruLayout"));
const RuangUntukGuruPage = lazy(() => import("./pages/RuangUntukGuruPage"));
const SmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPage"));
const SdPage = lazy(() => import("./pages/ruang-untuk-guru/SdPage"));
const SdComingSoonPage = lazy(() =>
  import("./pages/ruang-untuk-guru/SdPage").then((module) => ({ default: module.SdComingSoonPage })),
);
const SdBukuAnimasiPage = lazy(() => import("./pages/ruang-untuk-guru/SdBukuAnimasiPage"));
const SdBukuAnimasiTopicPage = lazy(() =>
  import("./pages/ruang-untuk-guru/SdBukuAnimasiPage").then((module) => ({
    default: module.SdBukuAnimasiTopicPage,
  })),
);
const IntensifUtbkPage = lazy(() => import("./pages/ruang-untuk-guru/IntensifUtbkPage"));
const SmaComingSoonPage = lazy(() => import("./pages/ruang-untuk-guru/SmaComingSoonPage"));
const SmaTopicMenuPage = lazy(() => import("./pages/ruang-untuk-guru/SmaTopicMenuPage"));
const SmaSubtopicComingSoonPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSubtopicComingSoonPage"));
const SmaSpltvPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSpltvPage"));
const SmaSptdvPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSptdvPage"));
const SmaPolinomialKonsepPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPolinomialKonsepPage"));
const SmaNilaiPolinomialHornerPage = lazy(() => import("./pages/ruang-untuk-guru/SmaNilaiPolinomialHornerPage"));
const SmaPembagianPolinomialPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPembagianPolinomialPage"));
const SmaPolinomialTeoremaFaktorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPolinomialTeoremaFaktorPage.tsx"));
const SmaPersamaanPolinomialVietaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanPolinomialVietaPage"));
const SmaStatistikaPenyajianDataPage = lazy(() => import("./pages/ruang-untuk-guru/SmaStatistikaPenyajianDataPage"));
const SmaStatistikaUkuranPemusatanDataPage = lazy(() => import("./pages/ruang-untuk-guru/SmaStatistikaUkuranPemusatanDataPage"));
const SmaStatistikaUkuranLetakDataPage = lazy(() => import("./pages/ruang-untuk-guru/SmaStatistikaUkuranLetakDataPage"));
const SmaStatistikaUkuranPenyebaranDataPage = lazy(() => import("./pages/ruang-untuk-guru/SmaStatistikaUkuranPenyebaranDataPage"));
const SmaPeluangAturanPerkalianPenjumlahanPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangAturanPerkalianPenjumlahanPage"));
const SmaPeluangPermutasiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangPermutasiPage"));
const SmaPeluangKombinasiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangKombinasiPage"));
const SmaPeluangEkspansiBinomialPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangEkspansiBinomialPage"));
const SmaPeluangRuangSampelDistribusiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangRuangSampelDistribusiPage"));
const SmaPeluangFrekuensiHarapanKomplemenPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangFrekuensiHarapanKomplemenPage"));
const SmaPeluangKejadianMajemukPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangKejadianMajemukPage"));
const SmaEksponenLogaritmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaEksponenLogaritmaPage"));
const SmaEksponenLogaritmaLatihanPage = lazy(() => import("./pages/ruang-untuk-guru/SmaEksponenLogaritmaLatihanPage"));
const SmaPersamaanEksponenLatihanPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanEksponenLatihanPage"));
const SmaLogaritmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaLogaritmaPage"));
const SmaPerbandinganTrigonometriSegitigaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPerbandinganTrigonometriSegitigaPage"));
const SmaSudutIstimewaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSudutIstimewaPage"));
const SmaNilaiKuadranPage = lazy(() => import("./pages/ruang-untuk-guru/SmaNilaiKuadranPage"));
const SmaPersamaanTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanTrigonometriPage"));
const SmaPertidaksamaanTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPertidaksamaanTrigonometriPage"));
const SmaIdentitasTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaIdentitasTrigonometriPage"));
const SmaRumusRumusTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaRumusRumusTrigonometriPage"));
const SmaGrafikFungsiTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaGrafikFungsiTrigonometriPage"));
const SmaAturanSinusCosinusLuasSegitigaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaAturanSinusCosinusLuasSegitigaPage"));
const SmaPersamaanLogaritmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanLogaritmaPage"));
const SmaPertidaksamaanLogaritmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPertidaksamaanLogaritmaPage"));
const SmaFungsiEksponenPage = lazy(() => import("./pages/ruang-untuk-guru/SmaFungsiEksponenPage"));
const SmaPersamaanEksponenPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanEksponenPage"));
const SmaPertidaksamaanEksponenPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPertidaksamaanEksponenPage"));
const SmaBentukAkarPage = lazy(() => import("./pages/ruang-untuk-guru/SmaBentukAkarPage"));
const SmaBarisanDeretAritmetikaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaBarisanDeretAritmetikaPage"));
const SmaBarisanDeretGeometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaBarisanDeretGeometriPage"));
const SmaDeretGeometriTakHinggaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaDeretGeometriTakHinggaPage"));
const SmaKonsepDasarVektorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaKonsepDasarVektorPage"));
const SmaOperasiVektorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaOperasiVektorPage"));
const SmaVektorPadaSistemKoordinatKartesiusPage = lazy(() => import("./pages/ruang-untuk-guru/SmaVektorPadaSistemKoordinatKartesiusPage"));
const SmaSudutAntaraDuaVektorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSudutAntaraDuaVektorPage"));
const SmaProyeksiVektorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaProyeksiVektorPage"));
const NumatikGamePage = lazy(() => import("./pages/ruang-untuk-guru/NumatikGamePage"));
const NumatikStrikeGamePage = lazy(() => import("./pages/math-game-arena/umum/GamePage"));
const NumatikWorldPage = lazy(() => import("./pages/math-game-arena/umum/NumatikWorldPage"));
const KeyakinanKelasPage = lazy(() => import("./pages/ruang-untuk-guru/KeyakinanKelasPage"));
const PenilaianPembelajaranPage = lazy(() => import("./pages/ruang-untuk-guru/PenilaianPembelajaranPage"));
const CapaianPembelajaranPage = lazy(() => import("./pages/ruang-untuk-guru/CapaianPembelajaranPage"));
const RubrikPenilaianDimensiLulusanPage = lazy(() => import("./pages/ruang-untuk-guru/RubrikPenilaianDimensiLulusanPage"));
const JurnalGuruPage = lazy(() => import("./pages/ruang-untuk-guru/JurnalGuruPage"));
const AgendaGuruPage = lazy(() => import("./pages/ruang-untuk-guru/AgendaGuruPage"));
const ProsemPage = lazy(() => import("./pages/ruang-untuk-guru/ProsemPage"));
const ProtaPage = lazy(() => import("./pages/ruang-untuk-guru/ProtaPage"));
const ProtaTahunPage = lazy(() => import("./pages/ruang-untuk-guru/ProtaTahunPage"));
const AnalisisAlokasiWaktuPage = lazy(() => import("./pages/ruang-untuk-guru/AnalisisAlokasiWaktuPage"));
const KKTPPage = lazy(() => import("./pages/ruang-untuk-guru/KKTPPage"));
const AbsensiSiswaPage = lazy(() => import("./pages/ruang-untuk-guru/AbsensiSiswaPage"));
const PenilaianSiswaPage = lazy(() => import("./pages/ruang-untuk-guru/PenilaianSiswaPage"));
const RancangRPPPage = lazy(() => import("./pages/ruang-untuk-guru/RancangRPPPage"));
const KokulikulerPage = lazy(() => import("./pages/ruang-untuk-guru/KokulikulerPage"));
const RPPPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPage"));
const RPPBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPBilanganBulatPage"));
const RPPPenjumlahanBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPenjumlahanBilanganBulatPage"));
const RPPPenguranganBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPenguranganBilanganBulatPage"));
const RPPPerkalianBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPerkalianBilanganBulatPage"));
const RPPPembagianBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPembagianBilanganBulatPage"));
const RPPOperasiCampuranBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPOperasiCampuranBilanganBulatPage"));
const RPPKpkFpbPage = lazy(() => import("./pages/ruang-untuk-guru/RPPKpkFpbPage"));
const RPPMateriDynamicPage = lazy(() => import("./pages/ruang-untuk-guru/RPPMateriDynamicPage"));
const RPPDetailDynamicPage = lazy(() => import("./pages/ruang-untuk-guru/RPPDetailDynamicPage"));
const UlanganHarianPage = lazy(() => import("./pages/UlanganHarianPage"));
const PesanKesanPage = lazy(() => import("./pages/PesanKesanPage"));
const PetunjukPage = lazy(() => import("./pages/PetunjukPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const ReferensiPage = lazy(() => import("./pages/ReferensiPage"));
const DonasiPage = lazy(() => import("./pages/DonasiPage"));
const BiografiPage = lazy(() => import("./pages/BiografiPage"));
const OlimpiadePage = lazy(() => import("./pages/OlimpiadePage"));
const OlimpiadeBilanganBulatPage = lazy(() => import("./pages/OlimpiadeBilanganBulatPage"));
const OlimpiadeBilanganRasionalPage = lazy(() => import("./pages/OlimpiadeBilanganRasionalPage"));
const OlimpiadeBilanganBerpangkatPage = lazy(() => import("./pages/OlimpiadeBilanganBerpangkatPage"));
const OlimpiadeStatistikaPage = lazy(() => import("./pages/OlimpiadeStatistikaPage"));
const OlimpiadeBilanganIrasionalPage = lazy(() => import("./pages/OlimpiadeBilanganIrasionalPage"));
const OlimpiadeKPKFPBPage = lazy(() => import("./pages/OlimpiadeKPKFPBPage"));
const OlimpiadeModuloPage = lazy(() => import("./pages/OlimpiadeModuloPage"));
const OlimpiadeHimpunanPage = lazy(() => import("./pages/OlimpiadeHimpunanPage"));
const OlimpiadeRelasiFungsiPage = lazy(() => import("./pages/OlimpiadeRelasiFungsiPage"));
const OlimpiadePerbandinganPage = lazy(() => import("./pages/OlimpiadePerbandinganPage"));
const OlimpiadeAljabarPage = lazy(() => import("./pages/OlimpiadeAljabarPage"));
const OlimpiadePolaBilanganPage = lazy(() => import("./pages/OlimpiadePolaBilanganPage"));
const OlimpiadeSPLDVPage = lazy(() => import("./pages/OlimpiadeSPLDVPage"));
const OlimpiadeGarisSudutPage = lazy(() => import("./pages/OlimpiadeGarisSudutPage"));
const OlimpiadeKoordinatCartesiusPage = lazy(() => import("./pages/OlimpiadeKoordinatCartesiusPage"));
const OlimpiadeTeoremaPage = lazy(() => import("./pages/OlimpiadeTeoremaPage"));
const OlimpiadeSegitigaSegiempatPage = lazy(() => import("./pages/OlimpiadeSegitigaSegiempatPage"));
const OlimpiadeLingkaranPage = lazy(() => import("./pages/OlimpiadeLingkaranPage"));
const OlimpiadeBangunRuangSisiDatarPage = lazy(() => import("./pages/OlimpiadeBangunRuangSisiDatarPage"));
const OlimpiadeBangunRuangSisiLengkungPage = lazy(() => import("./pages/OlimpiadeBangunRuangSisiLengkungPage"));
const OlimpiadePLSVPage = lazy(() => import("./pages/OlimpiadePLSVPage"));
const OlimpiadePersamaanGarisPage = lazy(() => import("./pages/OlimpiadePersamaanGarisPage"));
const OlimpiadePersamaanKuadratPage = lazy(() => import("./pages/OlimpiadePersamaanKuadratPage"));
const OlimpiadeFungsiKuadratPage = lazy(() => import("./pages/OlimpiadeFungsiKuadratPage"));
const OlimpiadeAritmetikaSosialPage = lazy(() => import("./pages/OlimpiadeAritmetikaSosialPage"));
const OlimpiadeKesebangunanPage = lazy(() => import("./pages/OlimpiadeKesebangunanPage"));
const OlimpiadeTransformasiPage = lazy(() => import("./pages/OlimpiadeTransformasiPage"));
const OlimpiadePeluangPage = lazy(() => import("./pages/OlimpiadePeluangPage"));
const TKAPage = lazy(() => import("./pages/TKAPage"));
const TKALatihan1Page = lazy(() => import("./pages/tka/TKALatihan1Page"));
const TKATryOut1Page = lazy(() => import("./pages/tka/TKATryOut1Page"));
const TKATryOut2Page = lazy(() => import("./pages/tka/TKATryOut2Page"));
const TKALatihan2Page = lazy(() => import("./pages/tka/TKALatihan2Page"));
const TKALatihan3Page = lazy(() => import("./pages/tka/TKALatihan3Page"));
const TKALatihan4Page = lazy(() => import("./pages/tka/TKALatihan4Page"));
const TKALatihan5Page = lazy(() => import("./pages/tka/TKALatihan5Page"));
const TKALatihan6Page = lazy(() => import("./pages/tka/TKALatihan6Page"));
const TKALatihan7Page = lazy(() => import("./pages/tka/TKALatihan7Page"));
const TKASoalAsli2025Page = lazy(() => import("./pages/tka/TKASoalAsli2025Page"));
const TKATipsPage = lazy(() => import("./pages/tka/TKATipsPage"));
const TKAModulPemantapanPage = lazy(() => import("./pages/tka/TKAModulPemantapanPage"));
const TKAPemantapanBilanganBulatPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganBulatPage"));
const TKAPemantapanBilanganRasionalPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganRasionalPage"));
const TKAPemantapanBilanganBerpangkatPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganBerpangkatPage"));
const TKAPemantapanBilanganIrasionalPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganIrasionalPage"));
const TKAPemantapanBilanganBerpangkatIrasionalPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganBerpangkatIrasionalPage"));
const TKAPemantapanHimpunanPage = lazy(() => import("./pages/tka/modul-pemantapan/HimpunanPage"));
const TKAPemantapanRelasiFungsiPage = lazy(() => import("./pages/tka/modul-pemantapan/RelasiFungsiPage"));
const TKAPemantapanPerbandinganPage = lazy(() => import("./pages/tka/modul-pemantapan/PerbandinganPage"));
const TKAPemantapanAljabarPage = lazy(() => import("./pages/tka/modul-pemantapan/AljabarPage"));
const TKAPemantapanPLSVPage = lazy(() => import("./pages/tka/modul-pemantapan/PLSVPage"));
const TKAPemantapanAritmetikaSosialPage = lazy(() => import("./pages/tka/modul-pemantapan/AritmetikaSosialPage"));
const TKAPemantapanPolaBilanganPage = lazy(() => import("./pages/tka/modul-pemantapan/PolaBilanganPage"));
const TKAPemantapanSPLDVPage = lazy(() => import("./pages/tka/modul-pemantapan/SPLDVPage"));
const TKAPemantapanGarisSudutPage = lazy(() => import("./pages/tka/modul-pemantapan/GarisSudutPage"));
const TKAPemantapanTeoremaPage = lazy(() => import("./pages/tka/modul-pemantapan/TeoremaPage"));
const TKAPemantapanSegitigaSegiempatPage = lazy(() => import("./pages/tka/modul-pemantapan/SegitigaSegiempatPage"));
const TKAPemantapanLingkaranPage = lazy(() => import("./pages/tka/modul-pemantapan/LingkaranPage"));
const TKAPemantapanBangunRuangSisiDatarPage = lazy(() => import("./pages/tka/modul-pemantapan/BangunRuangSisiDatarPage"));
const TKAPemantapanBangunRuangSisiLengkungPage = lazy(() => import("./pages/tka/modul-pemantapan/BangunRuangSisiLengkungPage"));
const TKAPemantapanKesebangunanPage = lazy(() => import("./pages/tka/modul-pemantapan/KesebangunanPage"));
const TKAPemantapanTransformasiPage = lazy(() => import("./pages/tka/modul-pemantapan/TransformasiPage"));
const TKAPemantapanStatistikaPage = lazy(() => import("./pages/tka/modul-pemantapan/StatistikaPage"));
const TKAPemantapanPeluangPage = lazy(() => import("./pages/tka/modul-pemantapan/PeluangPage"));
const TKAPemantapanPersamaanGarisPage = lazy(() => import("./pages/tka/modul-pemantapan/PersamaanGarisPage"));
const TKAPemantapanKoordinatCartesiusPage = lazy(() => import("./pages/tka/modul-pemantapan/KoordinatCartesiusPage"));
const PapanPeringkatPage = lazy(() => import("./pages/PapanPeringkatPage"));
const BankSoalPage = lazy(() => import("./pages/BankSoalPage"));
const BankSoalBilanganBulatPage = lazy(() => import("./pages/bank-soal/BilanganBulatPage"));
const BankSoalBilanganRasionalPage = lazy(() => import("./pages/bank-soal/BilanganRasionalPage"));
const BankSoalSegitigaSegiempatPage = lazy(() => import("./pages/bank-soal/SegitigaSegiempatPage"));
const BankSoalHimpunanPage = lazy(() => import("./pages/bank-soal/HimpunanPage"));
const BankSoalKoordinatCartesiusPage = lazy(() => import("./pages/bank-soal/KoordinatCartesiusPage"));
const BankSoalAljabarPage = lazy(() => import("./pages/bank-soal/AljabarPage"));
const BankSoalPLSVPage = lazy(() => import("./pages/bank-soal/PLSVPage"));
const BankSoalPerbandinganPage = lazy(() => import("./pages/bank-soal/PerbandinganPage"));
const BankSoalAritmetikaSosialPage = lazy(() => import("./pages/bank-soal/AritmetikaSosialPage"));
const BankSoalPolaBilanganPage = lazy(() => import("./pages/bank-soal/PolaBilanganPage"));
const BankSoalRelasiFungsiPage = lazy(() => import("./pages/bank-soal/RelasiFungsiPage"));
const BankSoalGarisSudutPage = lazy(() => import("./pages/bank-soal/GarisSudutPage"));
const BankSoalSPLDVPage = lazy(() => import("./pages/bank-soal/SPLDVPage"));
const BankSoalPersamaanGarisLurusPage = lazy(() => import("./pages/bank-soal/PersamaanGarisLurusPage"));
const BankSoalPeluangPage = lazy(() => import("./pages/bank-soal/PeluangPage"));
const BankSoalTeoremaPythagorasPage = lazy(() => import("./pages/bank-soal/TeoremaPythagorasPage"));
const BankSoalLingkaranPage = lazy(() => import("./pages/bank-soal/LingkaranPage"));
const BankSoalBangunRuangSisiDatarPage = lazy(() => import("./pages/bank-soal/BangunRuangSisiDatarPage"));
const BankSoalBangunRuangSisiLengkungPage = lazy(() => import("./pages/bank-soal/BangunRuangSisiLengkungPage"));
const BankSoalBilanganBerpangkatPage = lazy(() => import("./pages/bank-soal/BilanganBerpangkatPage"));
const BankSoalPersamaanKuadratPage = lazy(() => import("./pages/bank-soal/PersamaanKuadratPage"));
const BankSoalFungsiKuadratPage = lazy(() => import("./pages/bank-soal/FungsiKuadratPage"));
const BankSoalStatistikaPage = lazy(() => import("./pages/bank-soal/StatistikaPage"));
const BankSoalGarisSinggungLingkaranPage = lazy(() => import("./pages/bank-soal/GarisSinggungLingkaranPage"));
const BankSoalKesebangunanPage = lazy(() => import("./pages/bank-soal/KesebangunanPage"));
const BankSoalTransformasiGeometriPage = lazy(() => import("./pages/bank-soal/TransformasiGeometriPage"));
const ChatAIPage = lazy(() => import("./pages/ChatAIPage"));
const PengaturanPage = lazy(() => import("./pages/PengaturanPage"));
const TentangAplikasiPage = lazy(() => import("./pages/TentangAplikasiPage"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const KalkulatorScientificPage = lazy(() => import("./pages/KalkulatorScientificPage"));
const VideoPembelajaranPage = lazy(() => import("./pages/VideoPembelajaranPage"));
const KumpulanRumusPage = lazy(() => import("./pages/KumpulanRumusPage"));
const KonversiSatuanPage = lazy(() => import("./pages/KonversiSatuanPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MenghitungCepatPage = lazy(() => import("./pages/MenghitungCepatPage"));
const PerkalianDengan11Page = lazy(() => import("./pages/menghitung-cepat/PerkalianDengan11Page"));
const KuadratBerakhiran5Page = lazy(() => import("./pages/menghitung-cepat/KuadratBerakhiran5Page"));
const KuadratCepatPage = lazy(() => import("./pages/menghitung-cepat/KuadratCepatPage"));
const PerkalianDekat100Page = lazy(() => import("./pages/menghitung-cepat/PerkalianDekat100Page"));
const PersentaseCepatPage = lazy(() => import("./pages/menghitung-cepat/PersentaseCepatPage"));
const PenjumlahanPenguranganCepatPage = lazy(() => import("./pages/menghitung-cepat/PenjumlahanPenguranganPage"));
const PerkalianDuaDigitPage = lazy(() => import("./pages/menghitung-cepat/PerkalianDuaDigitPage"));
const PembagianCepatPage = lazy(() => import("./pages/menghitung-cepat/PembagianCepatPage"));
const TabelReferensiPage = lazy(() => import("./pages/menghitung-cepat/TabelReferensiPage"));
const LatihanFlashcardPage = lazy(() => import("./pages/menghitung-cepat/LatihanFlashcardPage"));
const GameLatihanHitungCepatPage = lazy(() => import("./pages/menghitung-cepat/GameLatihanHitungCepatPage"));

// Latihan Mandiri
const LatihanMandiriPage = lazy(() => import("./pages/LatihanMandiriPage"));
const LatihanMandiriKelas7Page = lazy(() => import("./pages/LatihanMandiriKelas7Page"));
const LatihanMandiriKelas8Page = lazy(() => import("./pages/LatihanMandiriKelas8Page"));
const LatihanMandiriKelas9Page = lazy(() => import("./pages/LatihanMandiriKelas9Page"));

// Kelas 7 Topic Pages
const BilanganBulatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/BilanganBulatPage"));
const PenjumlahanBilanganBulatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/bilangan-bulat/PenjumlahanPage"));
const PenguranganBilanganBulatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/bilangan-bulat/PenguranganPage"));
const PerkalianBilanganBulatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/bilangan-bulat/PerkalianPage"));
const PembagianBilanganBulatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/bilangan-bulat/PembagianPage"));
const OperasiCampuranBilanganBulatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/bilangan-bulat/OperasiCampuranPage"));
const KPKFPBBilanganBulatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/bilangan-bulat/KPKFPBPage"));
const BilanganRasionalK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/BilanganRasionalPage"));
const ArtiPecahanSenilaiMembandingkanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/ArtiPecahanSenilaiMembandingkanPage"));
const PecahanCampuranPersenK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/PecahanCampuranPersenPage"));
const PenjumlahanPecahanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/PenjumlahanPecahanPage"));
const PerkalianPecahanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/PerkalianPecahanPage"));
const PembagianPecahanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/PembagianPecahanPage"));
const BentukDesimalK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/BentukDesimalPage"));
const PenjumlahanPenguranganDesimalK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/PenjumlahanPenguranganDesimalPage"));
const PerkalianDesimalK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/PerkalianDesimalPage"));
const PembagianDesimalK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/PembagianDesimalPage"));
const PembulatanDesimalK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/pecahan/PembulatanDesimalPage"));
const PengertianUnsurAljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aljabar/PengertianUnsurAljabarPage"));
const PenjumlahanPenguranganAljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aljabar/PenjumlahanPenguranganAljabarPage"));
const PerkalianAljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aljabar/PerkalianAljabarPage"));
const PembagianAljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aljabar/PembagianAljabarPage"));
const PemangkatanAljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aljabar/PemangkatanAljabarPage"));
const SubstitusiBilanganAljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aljabar/SubstitusiBilanganAljabarPage"));
const FaktorisasiAljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aljabar/FaktorisasiAljabarPage"));
const MenyederhanakanPecahanAljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aljabar/MenyederhanakanPecahanAljabarPage"));
const AljabarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/AljabarPage"));
const PLSVPtLSVK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/PLSVPtLSVPage"));
const KalimatTerbukaTertutupK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/plsv-ptlsv/KalimatTerbukaTertutupPage"));
const PengertianPLSVK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/plsv-ptlsv/PengertianPLSVPage"));
const PenyelesaianPLSVK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/plsv-ptlsv/PenyelesaianPLSVPage"));
const ModelMatematikaPLSVK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/plsv-ptlsv/ModelMatematikaPLSVPage"));
const PengertianPtLSVK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/plsv-ptlsv/PengertianPtLSVPage"));
const PenyelesaianPtLSVK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/plsv-ptlsv/PenyelesaianPtLSVPage"));
const ModelMatematikaPtLSVK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/plsv-ptlsv/ModelMatematikaPtLSVPage"));
const PerbandinganK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/PerbandinganPage"));
const PerbandinganUmumK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganUmumPage"));
const PerbandinganSenilaiK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganSenilaiPage"));
const PerbandinganCampuranK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganCampuranPage"));
const PerbandinganBertingkatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganBertingkatPage"));
const PerbandinganSkalaK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganSkalaPage"));
const AritmetikaSosialK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/AritmetikaSosialPage"));
const JualBeliUntungRugiK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aritmetika-sosial/JualBeliUntungRugiPage"));
const DiskonK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aritmetika-sosial/DiskonPage"));
const BrutoNettoTaraK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aritmetika-sosial/BrutoNettoTaraPage"));
const BungaTunggalK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aritmetika-sosial/BungaTunggalPage"));
const PPNK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aritmetika-sosial/PPNPage"));
const PPhK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/aritmetika-sosial/PPhPage"));
const GarisDanSudutK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/GarisDanSudutPage"));
const HubunganDuaGarisK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/garis-dan-sudut/HubunganDuaGarisPage"));
const SudutPelurusPenyikuBertolakK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/garis-dan-sudut/SudutPelurusPenyikuBertolakPage"));
const SifatSudutDuaGarisSejajarK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/garis-dan-sudut/SifatSudutDuaGarisSejajarPage"));
const JumlahSudutSegiBanyakK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/garis-dan-sudut/JumlahSudutPadaSegiBanyakPage"));
const SegitigaSegiempatK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/SegitigaSegiempatPage"));
const GarisBeratBagiTinggiLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/segitiga-segiempat/GarisBeratBagiTinggiPage"));
const KelilingSegitigaSegiempatLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/segitiga-segiempat/KelilingSegitigaSegiempatPage"));
const LuasSegitigaLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/segitiga-segiempat/LuasSegitigaPage"));
const LuasSegiempatLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/segitiga-segiempat/LuasSegiempatPage"));
const KelilingLuasBangunTakBeraturanLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage"));
const PengertianKeanggotaanHimpunanLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/himpunan/PengertianKeanggotaanPage"));
const MenyatakanHimpunanLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/himpunan/MenyatakanHimpunanPage"));
const DiagramVennLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/himpunan/DiagramVennPage"));
const HimpunanBagianLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/himpunan/HimpunanBagianPage"));
const OperasiHimpunanLatihanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/himpunan/OperasiHimpunanPage"));
const HimpunanK7Page = lazy(() => import("./pages/latihan-mandiri/kelas7/HimpunanPage"));

// Kelas 8 Topic Pages
const PolaBilanganK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/PolaBilanganPage"));
const PengertianPolaK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/pola-bilangan/PengertianPolaPage"));
const PengertianDanPolaKhususK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/pola-bilangan/PengertianDanPolaKhususPage"));
const PolaKhususK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/pola-bilangan/PolaKhususPage"));
const PolaAritmetikaK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/pola-bilangan/PolaAritmetikaPage"));
const PolaGeometriK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/pola-bilangan/PolaGeometriPage"));
const KoordinatCartesiusK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/KoordinatCartesiusPage"));
const UnsurUnsurCartesiusK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/koordinat-cartesius/UnsurUnsurPage"));
const PosisiRelatifTitikAcuanK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/koordinat-cartesius/PosisiRelatifTitikAcuanPage"));
const JarakTitikGarisK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/koordinat-cartesius/JarakTitikGarisPage"));
const RelasiFungsiK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/RelasiFungsiPage"));
const PengertianRelasiK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/relasi-fungsi/PengertianRelasiPage"));
const PengertianFungsiK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/relasi-fungsi/PengertianFungsiPage"));
const BanyakFungsiK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/relasi-fungsi/BanyakFungsiPage"));
const NotasiFungsiK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/relasi-fungsi/NotasiFungsiPage"));
const GrafikFungsiK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/relasi-fungsi/GrafikFungsiPage"));
const SPLDVK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/SPLDVPage"));
const DefinisiSPLDVK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/spldv/DefinisiSPLDVPage"));
const MetodeGrafikSPLDVK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/spldv/MetodeGrafikPage"));
const MetodeSubstitusiSPLDVK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/spldv/MetodeSubstitusiPage"));
const MetodeEliminasiSPLDVK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/spldv/MetodeEliminasiPage"));
const MetodeCampuranSPLDVK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/spldv/MetodeCampuranPage"));
const ModelSPLDVK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/spldv/ModelSPLDVPage"));
const PenyelesaianMasalahSPLDVK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/spldv/PenyelesaianMasalahPage"));
const PersamaanGarisLurusK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/PersamaanGarisLurusPage"));
const GrafikPGLK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/persamaan-garis-lurus/GrafikPGLPage"));
const GradienK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/persamaan-garis-lurus/GradienPage"));
const MenentukanPGLK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/persamaan-garis-lurus/MenentukanPGLPage"));
const Hubungan2GarisK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/persamaan-garis-lurus/Hubungan2GarisPage"));
const AplikasiKontekstualPGLK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/persamaan-garis-lurus/AplikasiKontekstualPage"));
const TeoremaPythagorasK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/TeoremaPythagorasPage"));
const PembuktianPythagorasK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/teorema-pythagoras/PembuktianPage"));
const MenghitungPanjangPythagorasK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/teorema-pythagoras/MenghitungPanjangPage"));
const TriplePythagorasK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/teorema-pythagoras/TriplePythagorasPage"));
const JenisSegitigaPythagorasK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/teorema-pythagoras/JenisSegitigaPage"));
const SudutKhususPythagorasK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/teorema-pythagoras/SudutKhususPage"));
const MasalahKontekstualPythagorasK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/teorema-pythagoras/MasalahKontekstualPage"));
const LingkaranK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/LingkaranPage"));
const UnsurUnsurLingkaranK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/lingkaran/UnsurUnsurPage"));
const KelilingLuasLingkaranK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/lingkaran/KelilingLuasPage"));
const KaitanBangunDatarLingkaranK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/lingkaran/KaitanBangunDatarPage"));
const BusurJuringLingkaranK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/lingkaran/BusurJuringPage"));
const SudutPusatKelilingLingkaranK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/lingkaran/SudutPusatKelilingPage"));
const PenerapanKontekstualLingkaranK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/lingkaran/PenerapanKontekstualPage"));
const GarisSinggungLingkaranK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/GarisSinggungLingkaranPage"));
const PengertianGSLK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/garis-singgung-lingkaran/PengertianPage"));
const MenghitungPanjangGSLK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/garis-singgung-lingkaran/MenghitungPanjangPage"));
const GSPLK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/garis-singgung-lingkaran/GSPLPage"));
const GSPDK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/garis-singgung-lingkaran/GSPDPage"));
const SabukLilitanK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/garis-singgung-lingkaran/SabukLilitanPage"));
const BangunRuangSisiDatarK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/BangunRuangSisiDatarPage"));
const KubusLMK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/bangun-ruang-sisi-datar/KubusPage"));
const BalokLMK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/bangun-ruang-sisi-datar/BalokPage"));
const PrismaLMK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/bangun-ruang-sisi-datar/PrismaPage"));
const LimasLMK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/bangun-ruang-sisi-datar/LimasPage"));
const MasalahKontekstualBRSDLMK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/bangun-ruang-sisi-datar/MasalahKontekstualPage"));
const BRSDGabunganLMK8Page = lazy(() => import("./pages/latihan-mandiri/kelas8/bangun-ruang-sisi-datar-gabungan/GabunganPage"));

// Kelas 9 Topic Pages
const BilanganBerpangkatK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/BilanganBerpangkatPage"));
const PengertianNotasiK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bilangan-berpangkat/PengertianNotasiPage"));
const SifatSifatK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bilangan-berpangkat/SifatSifatPage"));
const PangkatNolNegatifPecahanK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bilangan-berpangkat/PangkatNolNegatifPecahanPage"));
const BentukAkarK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bilangan-berpangkat/BentukAkarPage"));
const NotasiIlmiahK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bilangan-berpangkat/NotasiIlmiahPage"));
const KesebangunanKekongruenK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/KesebangunanKekongruenPage"));
const DefinisiKesebangunanK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/kesebangunan-kekongruenan/DefinisiKesebangunanPage"));
const MenghitungRusukK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/kesebangunan-kekongruenan/MenghitungRusukPage"));
const SegitigaSebangunK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/kesebangunan-kekongruenan/SegitigaSebangunPage"));
const RasioRusukK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/kesebangunan-kekongruenan/RasioRusukPage"));
const KekongruenBangunDatarK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/kesebangunan-kekongruenan/KekongruenBangunDatarPage"));
const TransformasiGeometriK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/TransformasiGeometriPage"));
const TranslasiK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/transformasi-geometri/TranslasiPage"));
const RefleksiK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/transformasi-geometri/RefleksiPage"));
const RotasiK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/transformasi-geometri/RotasiPage"));
const DilatsiK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/transformasi-geometri/DilatsiPage"));
const BangunRuangSisiLengkungK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/BangunRuangSisiLengkungPage"));
const TabungLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bangun-ruang-sisi-lengkung/TabungPage"));
const KerucutLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bangun-ruang-sisi-lengkung/KerucutPage"));
const BolaLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bangun-ruang-sisi-lengkung/BolaPage"));
const PerubahanVolumeLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bangun-ruang-sisi-lengkung/PerubahanVolumePage"));
const GabunganLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/bangun-ruang-sisi-lengkung/GabunganPage"));
const StatistikaK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/StatistikaPage"));
const PengantarStatistikaLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/statistika/PengantarStatistikaPage"));
const PenyajianDataLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/statistika/PenyajianDataPage"));
const RataRataLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/statistika/RataRataPage"));
const MedianModusLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/statistika/MedianModusPage"));
const KuartilLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/statistika/KuartilPage"));
const PenyebaranDataLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/statistika/PenyebaranDataPage"));
const PeluangK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/PeluangPage"));
const RuangSampelLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/peluang/RuangSampelPage"));
const PeluangEmpirikLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/peluang/PeluangEmpirikPage"));
const PeluangTeoretikLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/peluang/PeluangTeoretikPage"));
const FrekuensiHarapanLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/peluang/FrekuensiHarapanPage"));
const KomplementLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/peluang/KomplementPage"));
const PeluangKejadianMajemukLMK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/peluang/PeluangKejadianMajemukPage"));
const PersamaanKuadratK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/PersamaanKuadratPage"));
const FungsiKuadratK9Page = lazy(() => import("./pages/latihan-mandiri/kelas9/FungsiKuadratPage"));
const FKBentukUmumKarakteristikPage = lazy(() => import("./pages/latihan-mandiri/kelas9/fungsi-kuadrat/BentukUmumKarakteristikPage"));
const FKTitikPotongPage = lazy(() => import("./pages/latihan-mandiri/kelas9/fungsi-kuadrat/TitikPotongPage"));
const FKSumbuSimetriPage = lazy(() => import("./pages/latihan-mandiri/kelas9/fungsi-kuadrat/SumbuSimetriPage"));
const FKMenggambarGrafikPage = lazy(() => import("./pages/latihan-mandiri/kelas9/fungsi-kuadrat/MenggambarGrafikPage"));
const FKMenyusunFungsiPage = lazy(() => import("./pages/latihan-mandiri/kelas9/fungsi-kuadrat/MenyusunFungsiPage"));
const FKPenerapanNilaiMaksMinPage = lazy(() => import("./pages/latihan-mandiri/kelas9/fungsi-kuadrat/PenerapanNilaiMaksMinPage"));
const PKBentukUmumPage = lazy(() => import("./pages/latihan-mandiri/kelas9/persamaan-kuadrat/BentukUmumPage"));
const PKPemfaktoranPage = lazy(() => import("./pages/latihan-mandiri/kelas9/persamaan-kuadrat/PemfaktoranPage"));
const PKRumusKuadratikPage = lazy(() => import("./pages/latihan-mandiri/kelas9/persamaan-kuadrat/RumusKuadratikPage"));
const PKPelengkapKuadratPage = lazy(() => import("./pages/latihan-mandiri/kelas9/persamaan-kuadrat/PelengkapKuadratPage"));
const PKDiskriminanPage = lazy(() => import("./pages/latihan-mandiri/kelas9/persamaan-kuadrat/DiskriminanPage"));
const PKMenyusunBaruPage = lazy(() => import("./pages/latihan-mandiri/kelas9/persamaan-kuadrat/MenyusunPKBaruPage"));
const PKPenerapanKontekstualPage = lazy(() => import("./pages/latihan-mandiri/kelas9/persamaan-kuadrat/PenerapanKontekstualPage"));

// Math Game Arena Pages
const MathGameArenaPage = lazy(() => import("./pages/MathGameArenaPage"));
const MathGameArenaSmaMenuPage = lazy(() => import("./pages/MathGameArenaSmaMenuPage"));
const MathGameArenaSmaSubtopicPage = lazy(() => import("./pages/MathGameArenaSmaSubtopicPage"));
const MathGameArenaUmumPage = lazy(() => import("./pages/MathGameArenaUmumPage"));
const CarRacingGamePage = lazy(() => import("./pages/math-game-arena/umum/CarRacingGamePage"));
const TetrisGamePage = lazy(() => import("./pages/math-game-arena/umum/TetrisGamePage"));
const DinoRunGamePage = lazy(() => import("./pages/math-game-arena/umum/DinoRunGamePage"));
const FlappyRocketPage = lazy(() => import("./pages/math-game-arena/umum/FlappyRocketPage"));
const CatchItemsGamePage = lazy(() => import("./pages/math-game-arena/umum/CatchItemsGamePage"));
const SnakeMathPage = lazy(() => import("./pages/math-game-arena/umum/SnakeMathPage"));
const AsteroidBlasterPage = lazy(() => import("./pages/math-game-arena/umum/AsteroidBlasterPage"));
const BubblePopPage = lazy(() => import("./pages/math-game-arena/umum/BubblePopPage"));
const MolSmashPage = lazy(() => import("./pages/math-game-arena/umum/MolSmashPage"));
const FishingMathPage = lazy(() => import("./pages/math-game-arena/umum/FishingMathPage"));
const BrickBreakerPage = lazy(() => import("./pages/math-game-arena/umum/BrickBreakerPage"));
const BattleTankPage = lazy(() => import("./pages/math-game-arena/umum/BattleTankPage"));
const CoinTrainMathPage = lazy(() => import("./pages/math-game-arena/umum/CoinTrainMathPage"));
const FruitNinjaMathPage = lazy(() => import("./pages/math-game-arena/umum/FruitNinjaMathPage"));
const TreasureIslandMathPage = lazy(() => import("./pages/math-game-arena/umum/TreasureIslandMathPage"));
const SubmarineBattleMathPage = lazy(() => import("./pages/math-game-arena/umum/SubmarineBattleMathPage"));
const PlatformJumpMathPage = lazy(() => import("./pages/math-game-arena/umum/PlatformJumpMathPage"));
const KsatriaMatPage = lazy(() => import("./pages/math-game-arena/umum/KsatriaMatPage"));
const SpaceImpactPage = lazy(() => import("./pages/math-game-arena/umum/SpaceImpactPage"));
const GalaxyDefenderPage = lazy(() => import("./pages/math-game-arena/umum/GalaxyDefenderPage"));
const MathBrosPage = lazy(() => import("./pages/math-game-arena/umum/MathBrosPage"));
const ZumaMathPage = lazy(() => import("./pages/math-game-arena/umum/ZumaMathPage"));
const PacmanMathPage = lazy(() => import("./pages/math-game-arena/umum/PacmanMathPage"));
const BounceMathPage = lazy(() => import("./pages/math-game-arena/umum/BounceMathPage"));
const WesternBarPage = lazy(() => import("./pages/math-game-arena/umum/WesternBarPage"));
const PinballMathPage = lazy(() => import("./pages/math-game-arena/umum/PinballMathPage"));
const PenaltiMathPage = lazy(() => import("./pages/math-game-arena/umum/PenaltiMathPage"));

// MGA - Kelas 7
const BilanganBulatMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/BilanganBulatPage"));
const BilanganRasionalMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/BilanganRasionalPage"));
const AljabarMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/AljabarPage"));
const PLSVPtLSVMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/PLSVPtLSVPage"));
const PerbandinganMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/PerbandinganPage"));
const PenguranganBilanganBulatGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganGamePage"));
const PerkalianBilanganBulatGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianGamePage"));
const PembagianBilanganBulatGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianGamePage"));
const OperasiCampuranBilanganBulatGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranGamePage"));
const KPKFPBGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBGamePage"));
const AritmetikaSosialMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/AritmetikaSosialPage"));
const JualBeliUntungRugiGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/aritmetika-sosial/JualBeliUntungRugiGamePage"));
const DiskonGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/aritmetika-sosial/DiskonGamePage"));
const BrutoNettoTaraGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/aritmetika-sosial/BrutoNettoTaraGamePage"));
const PPNGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/aritmetika-sosial/PPNGamePage"));
const PPhGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/aritmetika-sosial/PPhGamePage"));
const GarisDanSudutMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/GarisDanSudutPage"));
const SegitigaSegiempatMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/SegitigaSegiempatPage"));
const HimpunanMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/HimpunanPage"));

// MGA - Kelas 7 Pecahan
const ArtiPecahanGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/ArtiPecahanGamePage"));
const PecahanCampuranGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PecahanCampuranGamePage"));
const PenjumlahanPecahanGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PenjumlahanPecahanGamePage"));
const PenguranganPecahanGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PenguranganPecahanGamePage"));
const PerkalianPecahanGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PerkalianPecahanGamePage"));
const PembagianPecahanGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PembagianPecahanGamePage"));
const BentukDesimalGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/BentukDesimalGamePage"));
const PenjumlahanDesimalGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PenjumlahanDesimalGamePage"));
const PenguranganDesimalGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PenguranganDesimalGamePage"));
const PerkalianDesimalGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PerkalianDesimalGamePage"));
const PembagianDesimalGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PembagianDesimalGamePage"));
const PembulatanDesimalGamePage = lazy(() => import("./pages/math-game-arena/kelas7/pecahan/PembulatanDesimalGamePage"));

// MGA - Kelas 7 Aljabar
const PengertianUnsurAljabarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aljabar/PengertianUnsurGamePage"));
const PenjumlahanPenguranganAljabarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aljabar/PenjumlahanPenguranganAljabarGamePage"));
const PerkalianAljabarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aljabar/PerkalianAljabarGamePage"));
const PembagianAljabarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aljabar/PembagianAljabarGamePage"));
const PemangkatanAljabarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aljabar/PemangkatanAljabarGamePage"));
const SubstitusiAljabarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aljabar/SubstitusiAljabarGamePage"));
const FaktorisasiAljabarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aljabar/FaktorisasiAljabarGamePage"));
const OperasiPecahanAljabarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aljabar/OperasiPecahanAljabarGamePage"));

// MGA - Kelas 7 PLSV
const KalimatTerbukaGamePage = lazy(() => import("./pages/math-game-arena/kelas7/plsv/KalimatTerbukaGamePage"));
const PengertianPLSVGamePage = lazy(() => import("./pages/math-game-arena/kelas7/plsv/PengertianPLSVGamePage"));
const PenyelesaianPLSVGamePage = lazy(() => import("./pages/math-game-arena/kelas7/plsv/PenyelesaianPLSVGamePage"));
const ModelMatematikaPLSVGamePage = lazy(() => import("./pages/math-game-arena/kelas7/plsv/ModelMatematikaPLSVGamePage"));
const PengertianPtLSVGamePage = lazy(() => import("./pages/math-game-arena/kelas7/plsv/PengertianPtLSVGamePage"));
const PenyelesaianPtLSVGamePage = lazy(() => import("./pages/math-game-arena/kelas7/plsv/PenyelesaianPtLSVGamePage"));
const ModelMatematikaPtLSVGamePage = lazy(() => import("./pages/math-game-arena/kelas7/plsv/ModelMatematikaPtLSVGamePage"));

// MGA - Kelas 7 Perbandingan
const PerbandinganUmumGamePage = lazy(() => import("./pages/math-game-arena/kelas7/perbandingan/PerbandinganUmumGamePage"));
const PerbandinganSenilaiGamePage = lazy(() => import("./pages/math-game-arena/kelas7/perbandingan/PerbandinganSenilaiGamePage"));
const PerbandinganCampuranGamePage = lazy(() => import("./pages/math-game-arena/kelas7/perbandingan/PerbandinganCampuranGamePage"));
const PerbandinganBertingkatGamePage = lazy(() => import("./pages/math-game-arena/kelas7/perbandingan/PerbandinganBertingkatGamePage"));
const SkalaGamePage = lazy(() => import("./pages/math-game-arena/kelas7/perbandingan/SkalaGamePage"));

// MGA - Kelas 7 Garis Dan Sudut
const HubunganDuaGarisGamePage = lazy(() => import("./pages/math-game-arena/kelas7/garis-dan-sudut/HubunganDuaGarisGamePage"));
const SudutPelurusGamePage = lazy(() => import("./pages/math-game-arena/kelas7/garis-dan-sudut/SudutPelurusGamePage"));
const SifatSudutSejajarGamePage = lazy(() => import("./pages/math-game-arena/kelas7/garis-dan-sudut/SifatSudutSejajarGamePage"));
const JumlahSudutSegibanyakGamePage = lazy(() => import("./pages/math-game-arena/kelas7/garis-dan-sudut/JumlahSudutSegibanyakGamePage"));

// MGA - Kelas 7 Segitiga Segiempat
const GarisBeratBagiTinggiGamePage = lazy(() => import("./pages/math-game-arena/kelas7/segitiga-segiempat/GarisBeratBagiTinggiGamePage"));
const KelilingSegitigaSegiempatGamePage = lazy(() => import("./pages/math-game-arena/kelas7/segitiga-segiempat/KelilingGamePage"));
const LuasSegitigaGamePage = lazy(() => import("./pages/math-game-arena/kelas7/segitiga-segiempat/LuasSegitigaGamePage"));
const LuasSegiempatGamePage = lazy(() => import("./pages/math-game-arena/kelas7/segitiga-segiempat/LuasSegiempatGamePage"));
const BangunTakBeraturanGamePage = lazy(() => import("./pages/math-game-arena/kelas7/segitiga-segiempat/BangunTakBeraturanGamePage"));

// MGA - Kelas 7 Himpunan
const PengertianKeanggotaanHimpunanGamePage = lazy(() => import("./pages/math-game-arena/kelas7/himpunan/PengertianKeanggotaanGamePage"));
const HimpunanBerhingaKosongGamePage = lazy(() => import("./pages/math-game-arena/kelas7/himpunan/HimpunanBerhingaKosongGamePage"));
const DiagramVennGamePage = lazy(() => import("./pages/math-game-arena/kelas7/himpunan/DiagramVennGamePage"));
const PemecahanMasalahHimpunanGamePage = lazy(() => import("./pages/math-game-arena/kelas7/himpunan/PemecahanMasalahHimpunanGamePage"));
const BungaTunggalGamePage = lazy(() => import("./pages/math-game-arena/kelas7/aritmetika-sosial/BungaTunggalGamePage"));

// MGA - Kelas 7 Bilangan Bulat game variants
const PenjumlahanBilanganBulatGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanGamePage"));
const PenjumlahanMeteorGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanMeteorGamePage"));
const PenjumlahanTurtleRunGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanTurtleRunGamePage"));
const PenjumlahanFlappyRocketGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanFlappyRocketGamePage"));
const PenjumlahanTembakTankGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanTembakTankGamePage"));
const PenjumlahanSpaceImpactGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanSpaceImpactGamePage"));
const PenjumlahanTetrisGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanTetrisGamePage"));
const PenjumlahanSnakeMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanSnakeMathGamePage"));
const PenguranganMeteorGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganMeteorGamePage"));
const PenguranganFlappyRocketGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganFlappyRocketGamePage"));
const PenguranganTembakTankGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganTembakTankGamePage"));
const PenguranganSpaceImpactGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganSpaceImpactGamePage"));
const PenguranganTurtleRunGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganTurtleRunGamePage"));
const PenguranganTetrisGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganTetrisGamePage"));
const PenguranganSnakeMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganSnakeMathGamePage"));
const PerkalianMeteorGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianMeteorGamePage"));
const PerkalianFlappyRocketGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianFlappyRocketGamePage"));
const PerkalianTembakTankGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianTembakTankGamePage"));
const PerkalianSpaceImpactGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianSpaceImpactGamePage"));
const PerkalianTurtleRunGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianTurtleRunGamePage"));
const PerkalianTetrisGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianTetrisGamePage"));
const PerkalianSnakeMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianSnakeMathGamePage"));
const PembagianMeteorGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianMeteorGamePage"));
const PembagianFlappyRocketGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianFlappyRocketGamePage"));
const PembagianTembakTankGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianTembakTankGamePage"));
const PembagianSpaceImpactGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianSpaceImpactGamePage"));
const PembagianTurtleRunGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianTurtleRunGamePage"));
const PembagianTetrisGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianTetrisGamePage"));
const PembagianSnakeMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianSnakeMathGamePage"));
const OperasiCampuranMeteorGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranMeteorGamePage"));
const OperasiCampuranFlappyRocketGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranFlappyRocketGamePage"));
const OperasiCampuranTembakTankGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranTembakTankGamePage"));
const OperasiCampuranSpaceImpactGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranSpaceImpactGamePage"));
const OperasiCampuranTurtleRunGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranTurtleRunGamePage"));
const OperasiCampuranTetrisGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranTetrisGamePage"));
const OperasiCampuranSnakeMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranSnakeMathGamePage"));
const KPKFPBMeteorGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBMeteorGamePage"));
const KPKFPBFlappyRocketGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBFlappyRocketGamePage"));
const KPKFPBTembakTankGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBTembakTankGamePage"));
const KPKFPBSpaceImpactGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBSpaceImpactGamePage"));
const KPKFPBTurtleRunGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBTurtleRunGamePage"));
const KPKFPBTetrisGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBTetrisGamePage"));
const KPKFPBSnakeMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBSnakeMathGamePage"));
const PenjumlahanMeteorPantulGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanMeteorPantulGamePage"));
const PenguranganMeteorPantulGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganMeteorPantulGamePage"));
const PerkalianMeteorPantulGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianMeteorPantulGamePage"));
const PembagianMeteorPantulGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianMeteorPantulGamePage"));
const OperasiCampuranMeteorPantulGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranMeteorPantulGamePage"));
const KPKFPBMeteorPantulGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBMeteorPantulGamePage"));
const PenjumlahanGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanGalaksiTempurGamePage"));
const PenguranganGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganGalaksiTempurGamePage"));
const PerkalianGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianGalaksiTempurGamePage"));
const PembagianGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianGalaksiTempurGamePage"));
const OperasiCampuranGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranGalaksiTempurGamePage"));
const KPKFPBGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBGalaksiTempurGamePage"));
const PenjumlahanZumMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanZumMathGamePage"));
const PenguranganZumMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganZumMathGamePage"));
const PerkalianZumMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianZumMathGamePage"));
const PembagianZumMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianZumMathGamePage"));
const OperasiCampuranZumMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranZumMathGamePage"));
const KPKFPBZumMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBZumMathGamePage"));
const PenjumlahanPacMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanPacMathGamePage"));
const PenguranganPacMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganPacMathGamePage"));
const PerkalianPacMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianPacMathGamePage"));
const PembagianPacMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/PembagianPacMathGamePage"));
const OperasiCampuranPacMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranPacMathGamePage"));
const KPKFPBPacMathGameMGAK7Page = lazy(() => import("./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBPacMathGamePage"));

// MGA - Kelas 8 Topic Pages
const PolaBilanganMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/PolaBilanganPage"));
const KoordinatCartesiusMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/KoordinatCartesiusPage"));
const RelasiFungsiMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/RelasiFungsiPage"));
const SPLDVMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/SPLDVPage"));
const PersamaanGarisLurusMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/PersamaanGarisLurusPage"));
const GradienPGLGameK8Page = lazy(() => import("./pages/math-game-arena/kelas8/persamaan-garis-lurus/GradienGamePage"));
const GrafikPGLGameK8Page = lazy(() => import("./pages/math-game-arena/kelas8/persamaan-garis-lurus/GrafikPGLGamePage"));
const Hubungan2GarisGameK8Page = lazy(() => import("./pages/math-game-arena/kelas8/persamaan-garis-lurus/Hubungan2GarisGamePage"));
const MenentukanPGLGameK8Page = lazy(() => import("./pages/math-game-arena/kelas8/persamaan-garis-lurus/MenentukanPGLGamePage"));
const AplikasiKontekstualPGLGameK8Page = lazy(() => import("./pages/math-game-arena/kelas8/persamaan-garis-lurus/AplikasiKontekstualPGLGamePage"));
const TeoremaPythagorasMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/TeoremaPythagorasPage"));
const LingkaranMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/LingkaranPage"));
const GarisSinggungLingkaranMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/GarisSinggungLingkaranPage"));
const BangunRuangSisiDatarMGAK8Page = lazy(() => import("./pages/math-game-arena/kelas8/BangunRuangSisiDatarPage"));
const SubmaterialGameVariantsChooserK7 = lazy(() => import("./components/mga-k7/SubmaterialGameVariantsChooser"));
const SubmaterialGameDispatcherK7 = lazy(() => import("./components/mga-k7/SubmaterialGameDispatcher"));
const SubmaterialGameVariantsChooserK8 = lazy(() => import("./components/mga-k8/SubmaterialGameVariantsChooser"));
const SubmaterialGameDispatcherK8 = lazy(() => import("./components/mga-k8/SubmaterialGameDispatcher"));

// MGA - Kelas 9 Topic Pages
const BilanganBerpangkatMGAK9Page = lazy(() => import("./pages/math-game-arena/kelas9/BilanganBerpangkatPage"));
const KesebangunanKekongruenMGAK9Page = lazy(() => import("./pages/math-game-arena/kelas9/KesebangunanKekongruenPage"));
const TransformasiGeometriMGAK9Page = lazy(() => import("./pages/math-game-arena/kelas9/TransformasiGeometriPage"));
const BangunRuangSisiLengkungMGAK9Page = lazy(() => import("./pages/math-game-arena/kelas9/BangunRuangSisiLengkungPage"));
const StatistikaMGAK9Page = lazy(() => import("./pages/math-game-arena/kelas9/StatistikaPage"));
const PeluangMGAK9Page = lazy(() => import("./pages/math-game-arena/kelas9/PeluangPage"));
const PersamaanKuadratMGAK9Page = lazy(() => import("./pages/math-game-arena/kelas9/PersamaanKuadratPage"));
const FungsiKuadratMGAK9Page = lazy(() => import("./pages/math-game-arena/kelas9/FungsiKuadratPage"));
const SubmaterialGameVariantsChooserK9 = lazy(() => import("./components/mga-k9/SubmaterialGameVariantsChooser"));
const SubmaterialGameDispatcherK9 = lazy(() => import("./components/mga-k9/SubmaterialGameDispatcher"));

// Materi Matematika
const MateriMatematikaPage = lazy(() => import("./pages/MateriMatematikaPage"));
const MateriMatematikaKelas7Page = lazy(() => import("./pages/MateriMatematikaKelas7Page"));
const MateriMatematikaKelas8Page = lazy(() => import("./pages/MateriMatematikaKelas8Page"));
const MateriMatematikaKelas9Page = lazy(() => import("./pages/MateriMatematikaKelas9Page"));
const BilanganBulatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/BilanganBulatPage"));
const PenjumlahanBilanganBulatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-bulat/PenjumlahanPage"));
const BukuAnimasiPenjumlahanBilanganBulatPage = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-bulat/BukuAnimasiPenjumlahanPage"));
const PenguranganBilanganBulatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-bulat/PenguranganPage"));
const PerkalianBilanganBulatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-bulat/PerkalianPage"));
const PembagianBilanganBulatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-bulat/PembagianPage"));
const OperasiCampuranBilanganBulatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-bulat/OperasiCampuranPage"));
const KPKFPBBilanganBulatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-bulat/KPKFPBPage"));
const BilanganRasionalMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/BilanganRasionalPage"));
const ArtiPecahanMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/ArtiPecahanPage"));
const PecahanCampuranMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/PecahanCampuranPage"));
const PenjumlahanPenguranganMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/PenjumlahanPenguranganPage"));
const PerkalianPecahanMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/PerkalianPecahanPage"));
const PembagianPecahanMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/PembagianPecahanPage"));
const BentukDesimalMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/BentukDesimalPage"));
const PenjumlahanPenguranganBentukDesimalMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage"));
const PerkalianBentukDesimalMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/PerkalianBentukDesimalPage"));
const PembagianBentukDesimalMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/PembagianBentukDesimalPage"));
const PembulatanBentukDesimalMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/bilangan-rasional/PembulatanBentukDesimalPage"));
const AljabarMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/AljabarPage"));
const PengertianUnsurMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aljabar/PengertianUnsurPage"));
const PenjumlahanPenguranganAljabarMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aljabar/PenjumlahanPenguranganPage"));
const PerkalianAljabarMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aljabar/PerkalianPage"));
const PembagianAljabarMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aljabar/PembagianPage"));
const PemangkatanAljabarMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aljabar/PemangkatanPage"));
const SubstitusiAljabarMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aljabar/SubstitusiPage"));
const FaktorisasiAljabarMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aljabar/FaktorisasiPage"));
const OperasiPecahanAljabarMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aljabar/OperasiPecahanPage"));
const PLSVPtLSVMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/PLSVPtLSVPage"));
const KalimatTerbukaTertutupPage = lazy(() => import("./pages/materi-matematika/kelas7/plsv-ptlsv/KalimatTerbukaTertutupPage"));
const PengertianPLSVPage = lazy(() => import("./pages/materi-matematika/kelas7/plsv-ptlsv/PengertianPLSVPage"));
const PenyelesaianPLSVPage = lazy(() => import("./pages/materi-matematika/kelas7/plsv-ptlsv/PenyelesaianPLSVPage"));
const ModelMatematikaPLSVPage = lazy(() => import("./pages/materi-matematika/kelas7/plsv-ptlsv/ModelMatematikaPLSVPage"));
const PengertianPtLSVPage = lazy(() => import("./pages/materi-matematika/kelas7/plsv-ptlsv/PengertianPtLSVPage"));
const PenyelesaianPtLSVPage = lazy(() => import("./pages/materi-matematika/kelas7/plsv-ptlsv/PenyelesaianPtLSVPage"));
const ModelMatematikaPtLSVPage = lazy(() => import("./pages/materi-matematika/kelas7/plsv-ptlsv/ModelMatematikaPtLSVPage"));
const PerbandinganMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/PerbandinganPage"));
const PerbandinganUmumMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/perbandingan/PerbandinganUmumPage"));
const PerbandinganSenilaiMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/perbandingan/PerbandinganSenilaiPage"));
const PerbandinganCampuranMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/perbandingan/PerbandinganCampuranPage"));
const PerbandinganBertingkatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/perbandingan/PerbandinganBertingkatPage"));
const SkalaMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/perbandingan/SkalaPage"));
const AritmetikaSosialMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/AritmetikaSosialPage"));
const JualBeliUntungRugiMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aritmetika-sosial/JualBeliUntungRugiPage"));
const DiskonMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aritmetika-sosial/DiskonPage"));
const BrutoNettoTaraMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aritmetika-sosial/BrutoNettoTaraPage"));
const BungaTunggalMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aritmetika-sosial/BungaTunggalPage"));
const PPNMMk7Page = lazy(() => import("./pages/materi-matematika/kelas7/aritmetika-sosial/PPNPage"));
const PPhMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/aritmetika-sosial/PPhPage"));
const GarisDanSudutMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/GarisDanSudutPage"));
const HubunganDuaGarisMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/garis-dan-sudut/HubunganDuaGarisPage"));
const SudutPelurusPenyikuBertolakMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/garis-dan-sudut/SudutPelurusPenyikuBertolakPage"));
const SifatSudutDuaGarisSejajarPage = lazy(() => import("./pages/materi-matematika/kelas7/garis-dan-sudut/SifatSudutDuaGarisSejajarPage"));
const JumlahSudutSegiBanyakPage = lazy(() => import("./pages/materi-matematika/kelas7/garis-dan-sudut/JumlahSudutSegiBanyakPage"));
const SegitigaSegiempatMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/SegitigaSegiempatPage"));
const GarisBeratBagiTinggiPage = lazy(() => import("./pages/materi-matematika/kelas7/segitiga-segiempat/GarisBeratBagiTinggiPage"));
const KelilingSegitigaSegiempatPage = lazy(() => import("./pages/materi-matematika/kelas7/segitiga-segiempat/KelilingSegitigaSegiempatPage"));
const LuasSegitigaPage = lazy(() => import("./pages/materi-matematika/kelas7/segitiga-segiempat/LuasSegitigaPage"));
const LuasSegiempatPage = lazy(() => import("./pages/materi-matematika/kelas7/segitiga-segiempat/LuasSegiempatPage"));
const KelilingLuasBangunTakBeraturanPage = lazy(() => import("./pages/materi-matematika/kelas7/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage"));
const KubusMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/bangun-ruang-sisi-datar/KubusPage"));
const BalokMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/bangun-ruang-sisi-datar/BalokPage"));
const PrismaMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/bangun-ruang-sisi-datar/PrismaPage"));
const LimasMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/bangun-ruang-sisi-datar/LimasPage"));
const GabunganMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/bangun-ruang-sisi-datar/GabunganPage"));
const HimpunanMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/HimpunanPage"));
const PengertianKeanggotaanHimpunanPage = lazy(() => import("./pages/materi-matematika/kelas7/himpunan/PengertianKeanggotaanPage"));
const JenisHimpunanPage = lazy(() => import("./pages/materi-matematika/kelas7/himpunan/JenisHimpunanPage"));
const OperasiHimpunanMMK7Page = lazy(() => import("./pages/materi-matematika/kelas7/himpunan/OperasiHimpunanPage"));
const DiagramVennPage = lazy(() => import("./pages/materi-matematika/kelas7/himpunan/DiagramVennPage"));
const PemecahanMasalahHimpunanPage = lazy(() => import("./pages/materi-matematika/kelas7/himpunan/PemecahanMasalahHimpunanPage"));

// Materi Matematika - Kelas 8
const PolaBilanganMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/PolaBilanganPage"));
const PengertianPolaMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/pola-bilangan/PengertianPolaPage"));
const PolaKhususMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/pola-bilangan/PolaKhususPage"));
const PolaAritmetikaMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/pola-bilangan/PolaAritmetikaPage"));
const PolaGeometriMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/pola-bilangan/PolaGeometriPage"));
const KoordinatCartesiusMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/KoordinatCartesiusPage"));
const UnsurUnsurCartesiusMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/koordinat-cartesius/UnsurUnsurCartesiusPage"));
const PosisiRelatifTitikAcuanMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/koordinat-cartesius/PosisiRelatifTitikAcuanPage"));
const JarakTitikGarisMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/koordinat-cartesius/JarakTitikGarisPage"));
const PosisiRelatifGarisMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/koordinat-cartesius/PosisiRelatifGarisPage"));
const PosisiRelatifTitikDanGarisMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/koordinat-cartesius/PosisiRelatifTitikDanGarisPage"));
const RelasiFungsiMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/RelasiFungsiPage"));
const PengertianRelasiMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/relasi-fungsi/PengertianRelasiPage"));
const PengertianFungsiMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/relasi-fungsi/PengertianFungsiPage"));
const BanyakFungsiMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/relasi-fungsi/BanyakFungsiPage"));
const BukuAnimasiBanyakFungsiPage = lazy(() => import("./pages/materi-matematika/kelas8/relasi-fungsi/BukuAnimasiBanyakFungsiPage"));
const NotasiFungsiMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/relasi-fungsi/NotasiFungsiPage"));
const GrafikFungsiMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/relasi-fungsi/GrafikFungsiPage"));
const SPLDVMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/SPLDVPage"));
const DefinisiSPLDVMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/spldv/DefinisiSPLDVPage"));
const MetodeGrafikMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/spldv/MetodeGrafikPage"));
const MetodeSubstitusiMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/spldv/MetodeSubstitusiPage"));
const MetodeEliminasiMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/spldv/MetodeEliminasiPage"));
const MetodeCampuranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/spldv/MetodeCampuranPage"));
const ModelSPLDVMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/spldv/ModelSPLDVPage"));
const PenyelesaianMasalahSPLDVMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/spldv/PenyelesaianMasalahSPLDVPage"));
const PersamaanGarisLurusMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/PersamaanGarisLurusPage"));
const GrafikPGLMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/persamaan-garis-lurus/GrafikPGLPage"));
const GradienMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/persamaan-garis-lurus/GradienPage"));
const MenentukanPGLMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/persamaan-garis-lurus/MenentukanPGLPage"));
const Hubungan2GarisMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/persamaan-garis-lurus/Hubungan2GarisPage"));
const AplikasiKontekstualMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/persamaan-garis-lurus/AplikasiKontekstualPage"));
const TeoremaPythagorasMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/TeoremaPythagorasPage"));
const PembuktianPythagorasMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/teorema-pythagoras/PembuktianPage"));
const MenghitungPanjangPythagorasMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/teorema-pythagoras/MenghitungPanjangPage"));
const TriplePythagorasMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/teorema-pythagoras/TriplePythagorasPage"));
const JenisSegitigaPythagorasMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/teorema-pythagoras/JenisSegitigaPage"));
const SudutKhususPythagorasMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/teorema-pythagoras/SudutKhususPage"));
const MasalahKontekstualPythagorasMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/teorema-pythagoras/MasalahKontekstualPage"));
const LingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/LingkaranPage"));
const UnsurUnsurLingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/lingkaran/UnsurUnsurPage"));
const KelilingLuasLingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/lingkaran/KelilingLuasPage"));
const KaitanBangunDatarLingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/lingkaran/KaitanBangunDatarPage"));
const KaitanBangunDatarLainnyaLingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/lingkaran/KaitanBangunDatarLainnyaPage"));
const BusurJuringLingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/lingkaran/BusurJuringPage"));
const SudutPusatKelilingLingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/lingkaran/SudutPusatKelilingPage"));
const PenerapanKontekstualLingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/lingkaran/PenerapanKontekstualPage"));
const GarisSinggungLingkaranMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/GarisSinggungLingkaranPage"));
const PengertianGSLMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/garis-singgung-lingkaran/PengertianPage"));
const MenghitungPanjangGSLMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/garis-singgung-lingkaran/MenghitungPanjangPage"));
const GSPLMMk8Page = lazy(() => import("./pages/materi-matematika/kelas8/garis-singgung-lingkaran/GSPLPage"));
const GSPDMMk8Page = lazy(() => import("./pages/materi-matematika/kelas8/garis-singgung-lingkaran/GSPDPage"));
const SabukLilitanMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/garis-singgung-lingkaran/SabukLilitanPage"));
const BangunRuangSisiDatarMMK8Page = lazy(() => import("./pages/materi-matematika/kelas8/BangunRuangSisiDatarPage"));

// Materi Matematika - Kelas 9
const BilanganBerpangkatMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/BilanganBerpangkatPage"));
const PengertianNotasiPangkatMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bilangan-berpangkat/PengertianNotasiPangkatPage"));
const SifatSifatOperasiMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bilangan-berpangkat/SifatSifatOperasiPage"));
const BentukAkarMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bilangan-berpangkat/BentukAkarPage"));
const NotasiIlmiahMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bilangan-berpangkat/NotasiIlmiahPage"));
const KesebangunanKekongruenMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/KesebangunanKekongruenPage"));
const DefinisiKesebangunanMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/DefinisiPage"));
const MenghitungRusukMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/MenghitungRusukPage"));
const SegitigaSebangunMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/SegitigaSebangunPage"));
const PerbandinganRusukSikuSikuMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage"));
const KekongruenBangunDatarMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/KekongruenBangunDatarPage"));
const TransformasiGeometriMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/TransformasiGeometriPage"));
const TranslasiMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/transformasi-geometri/TranslasiPage"));
const RefleksiMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/transformasi-geometri/RefleksiPage"));
const RotasiMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/transformasi-geometri/RotasiPage"));
const DilatasisMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/transformasi-geometri/DilatasisPage"));
const BangunRuangSisiLengkungMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/BangunRuangSisiLengkungPage"));
const TabungMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/TabungPage"));
const KerucutMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/KerucutPage"));
const BolaMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/BolaPage"));
const PerubahanVolumeMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/PerubahanVolumePage"));
const GabunganMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/GabunganPage"));
const StatistikaMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/StatistikaPage"));
const PengantarStatistikaMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/statistika/PengantarStatistikaPage"));
const PenyajianDataMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/statistika/PenyajianDataPage"));
const RataRataMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/statistika/RataRataPage"));
const MedianModusMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/statistika/MedianModusPage"));
const KuartilMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/statistika/KuartilPage"));
const PenyebaranDataMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/statistika/PenyebaranDataPage"));
const PeluangMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/PeluangPage"));
const RuangSampelMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/peluang/RuangSampelPage"));
const PeluangEmpirikMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/peluang/PeluangEmpirikPage"));
const PeluangTeoretikMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/peluang/PeluangTeoretikPage"));
const FrekuensiHarapanMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/peluang/FrekuensiHarapanPage"));
const KomplementMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/peluang/KomplementPage"));
const PeluangKejadianMajemukMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/peluang/PeluangKejadianMajemukPage"));
const PersamaanKuadratMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/PersamaanKuadratPage"));
const PKMMBentukUmumPage = lazy(() => import("./pages/materi-matematika/kelas9/persamaan-kuadrat/BentukUmumPage"));
const PKMMPemfaktoranPage = lazy(() => import("./pages/materi-matematika/kelas9/persamaan-kuadrat/PemfaktoranPage"));
const PKMMRumusKuadratikPage = lazy(() => import("./pages/materi-matematika/kelas9/persamaan-kuadrat/RumusKuadratikPage"));
const PKMMPelengkapKuadratPage = lazy(() => import("./pages/materi-matematika/kelas9/persamaan-kuadrat/PelengkapKuadratPage"));
const PKMMDiskriminanPage = lazy(() => import("./pages/materi-matematika/kelas9/persamaan-kuadrat/DiskriminanPage"));
const PKMMMenyusunBaruPage = lazy(() => import("./pages/materi-matematika/kelas9/persamaan-kuadrat/MenyusunPKBaruPage"));
const PKMMPenerapanKontekstualPage = lazy(() => import("./pages/materi-matematika/kelas9/persamaan-kuadrat/PenerapanKontekstualPage"));
const FungsiKuadratMMK9Page = lazy(() => import("./pages/materi-matematika/kelas9/FungsiKuadratPage"));
const FKMMBentukUmumKarakteristikPage = lazy(() => import("./pages/materi-matematika/kelas9/fungsi-kuadrat/BentukUmumKarakteristikPage"));
const FKMMTitikPotongPage = lazy(() => import("./pages/materi-matematika/kelas9/fungsi-kuadrat/TitikPotongPage"));
const FKMMSumbuSimetriPage = lazy(() => import("./pages/materi-matematika/kelas9/fungsi-kuadrat/SumbuSimetriPage"));
const FKMMMenggambarGrafikPage = lazy(() => import("./pages/materi-matematika/kelas9/fungsi-kuadrat/MenggambarGrafikPage"));
const FKMMMenyusunFungsiPage = lazy(() => import("./pages/materi-matematika/kelas9/fungsi-kuadrat/MenyusunFungsiPage"));
const FKMMPenerapanNilaiMaksMinPage = lazy(() => import("./pages/materi-matematika/kelas9/fungsi-kuadrat/PenerapanNilaiMaksMinPage"));

// ── App setup ──────────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

const scrollPositionsByPath = new Map<string, number>();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, scrollPositionsByPath.get(pathname) ?? 0);

    const saveScrollPosition = () => {
      scrollPositionsByPath.set(pathname, window.scrollY);
    };

    window.addEventListener("scroll", saveScrollPosition, { passive: true });
    return () => window.removeEventListener("scroll", saveScrollPosition);
  }, [pathname]);
  return null;
};

const hidePracticeGradeLabels = () => {
  const practiceRoute = document.querySelector(".latihan-mandiri-route");
  if (!practiceRoute) return;

  practiceRoute.querySelectorAll<HTMLElement>("p, span").forEach((element) => {
    const text = element.textContent?.trim().replace(/\s+/g, " ");
    if (text && /^(?:✦\s*)?(?:Kelas|Grade)\s+[789](?:\s*(?:·|—|-).*)?$/.test(text)) {
      element.hidden = true;
    }
  });
};

const AppInner = () => {
  useEffect(() => {
    const handleInteraction = () => {
      startGlobalAmbient();
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, []);

  // GA4: init once on mount
  useEffect(() => {
    initGA();
  }, []);

  // GA4: track route changes
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    hidePracticeGradeLabels();
    const observer = new MutationObserver(hidePracticeGradeLabels);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <div className={[
          /^\/materi-matematika\/kelas-[789](?:\/.*)?$/.test(pathname) ? "animation-submaterial-route" : "",
          pathname.startsWith("/latihan-mandiri") ? "latihan-mandiri-route" : "",
        ].filter(Boolean).join(" ") || undefined}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/exam-browser" element={<Navigate to="/ruang-untuk-guru/exam-browser" replace />} />
  <Route path="/uji-mandiri" element={<UjiMandiriPage />} />
          <Route path="/lkpd" element={<LKPDMenuPage />} />
          <Route path="/lkpd/kelas-7" element={<LKPDKelas7Page />} />
          <Route path="/lkpd/kelas-8" element={<LKPDKelas8Page />} />
          <Route path="/lkpd/kelas-9" element={<LKPDKelas9Page />} />
          <Route path="/lkpd/kelas-7/perbandingan" element={<LKPDPerbandinganPage />} />
          <Route path="/lkpd/kelas-7/perbandingan/umum" element={<LKPDPage />} />
          <Route path="/lkpd/kelas-7/perbandingan/bertingkat" element={<BertingkatLKPDPage />} />
          <Route path="/lkpd/kelas-7/perbandingan/senilai-berbalik" element={<SenilaiLKPDPage />} />
          <Route path="/lkpd/kelas-7/perbandingan/skala" element={<SkalaLKPDPage />} />
          <Route path="/lkpd/kelas-7/perbandingan/campuran" element={<CampuranLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat" element={<BilanganBulatMenuPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat/penjumlahan" element={<PenjumlahanLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat/pengurangan" element={<PenguranganLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat/perkalian" element={<PerkalianLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat/pembagian" element={<PembagianLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat/operasi-campuran" element={<OperasiCampuranLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat/kpk-fpb" element={<KPKFPBLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat/pesawat-tembak-meteor" element={<PesawatTembakMeteorPage />} />
          <Route path="/lkpd/kelas-7/bilangan-bulat/penjumlahan/pesawat-tembak-meteor" element={<PesawatTembakMeteorPenjumlahanPage />} />
          <Route path="/lkpd/kelas-7/bilangan-rasional" element={<BilanganRasionalMenuPage />} />
          <Route path="/lkpd/kelas-7/bilangan-rasional/arti-pecahan" element={<ArtiPecahanLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-rasional/pecahan-campuran" element={<PecahanCampuranLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-rasional/penjumlahan-pengurangan" element={<PenjumlahanPenguranganPecahanLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-rasional/perkalian" element={<PerkalianPecahanLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-rasional/pembagian" element={<PembagianPecahanLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-rasional/bentuk-desimal" element={<BentukDesimalLKPDPage />} />
          <Route path="/lkpd/kelas-7/bilangan-rasional/operasi-desimal" element={<OperasiDesimalLKPDPage />} />
          <Route path="/lkpd/kelas-7/aljabar" element={<AljabarMenuPage />} />
          <Route path="/lkpd/kelas-7/aljabar/pengertian-unsur" element={<PengertianUnsurAljabarLKPDPage />} />
          <Route path="/lkpd/kelas-7/aljabar/penjumlahan-pengurangan" element={<PenjumlahanPenguranganAljabarLKPDPage />} />
          <Route path="/lkpd/kelas-7/aljabar/perkalian-pembagian" element={<PerkalianPembagianAljabarLKPDPage />} />
          <Route path="/lkpd/kelas-7/aljabar/substitusi" element={<SubstitusiAljabarLKPDPage />} />
          <Route path="/lkpd/kelas-7/aljabar/faktorisasi" element={<FaktorisasiAljabarLKPDPage />} />
          <Route path="/lkpd/kelas-7/plsv-ptlsv" element={<PLSVPtLSVMenuPage />} />
          <Route path="/lkpd/kelas-7/plsv-ptlsv/kalimat-terbuka-tertutup" element={<KalimatTerbukaTertutupLKPDPage />} />
          <Route path="/lkpd/kelas-7/plsv-ptlsv/pengertian-plsv" element={<PengertianPLSVLKPDPage />} />
          <Route path="/lkpd/kelas-7/plsv-ptlsv/penyelesaian-plsv" element={<PenyelesaianPLSVLKPDPage />} />
          <Route path="/lkpd/kelas-7/plsv-ptlsv/model-matematika-plsv" element={<ModelMatematikaPLSVLKPDPage />} />
          <Route path="/lkpd/kelas-7/plsv-ptlsv/pengertian-ptlsv" element={<PengertianPtLSVLKPDPage />} />
          <Route path="/lkpd/kelas-7/plsv-ptlsv/penyelesaian-ptlsv" element={<PenyelesaianPtLSVLKPDPage />} />
          <Route path="/lkpd/kelas-7/plsv-ptlsv/model-matematika-ptlsv" element={<ModelMatematikaPtLSVLKPDPage />} />
          <Route path="/lkpd/kelas-7/aritmetika-sosial" element={<AritmetikaSosialMenuPage />} />
          <Route path="/lkpd/kelas-7/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiLKPDPage />} />
          <Route path="/lkpd/kelas-7/aritmetika-sosial/diskon" element={<DiskonLKPDPage />} />
          <Route path="/lkpd/kelas-7/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraLKPDPage />} />
          <Route path="/lkpd/kelas-7/aritmetika-sosial/bunga-tunggal" element={<BungaTunggalLKPDPage />} />
          <Route path="/lkpd/kelas-7/garis-dan-sudut" element={<GarisDanSudutMenuPage />} />
          <Route path="/lkpd/kelas-7/garis-dan-sudut/lkpd" element={<GarisDanSudutLKPDPage />} />
          <Route path="/lkpd/kelas-7/segitiga-dan-segiempat" element={<SegitigaDanSegiempatMenuPage />} />
          <Route path="/lkpd/kelas-7/segitiga-dan-segiempat/lkpd" element={<SegitigaDanSegiempatLKPDPage />} />
          <Route path="/lkpd/kelas-7/aritmetika-sosial/ppn" element={<PPNLKPDPage />} />
          <Route path="/lkpd/kelas-7/aritmetika-sosial/pph" element={<PPhLKPDPage />} />
          <Route path="/lkpd/kelas-7/himpunan" element={<HimpunanMenuPage />} />
          <Route path="/lkpd/kelas-7/himpunan/lkpd" element={<HimpunanLKPDPage />} />
          <Route path="/lkpd/kelas-7/*" element={<ComingSoonPage />} />
          <Route path="/lkpd/kelas-8/pola-bilangan" element={<PolaBilanganMenuPage />} />
          <Route path="/lkpd/kelas-8/pola-bilangan/lkpd" element={<PolaBilanganLKPDPage />} />
          <Route path="/lkpd/kelas-8/koordinat-cartesius" element={<KoordinatCartesiusLKPDMenuPage />} />
          <Route path="/lkpd/kelas-8/koordinat-cartesius/lkpd" element={<KoordinatCartesiusLKPDPage />} />
          <Route path="/lkpd/kelas-8/relasi-dan-fungsi" element={<RelasiFungsiLKPDMenuPage />} />
          <Route path="/lkpd/kelas-8/relasi-dan-fungsi/lkpd" element={<RelasiFungsiLKPDPage />} />
          <Route path="/lkpd/kelas-8/spldv" element={<SPLDVLKPDMenuPage />} />
          <Route path="/lkpd/kelas-8/spldv/lkpd" element={<SPLDVLKPDPage />} />
          <Route path="/lkpd/kelas-8/spldv/metode-eliminasi" element={<SPLDVMetodeEliminasiLKPDPage />} />
          <Route path="/lkpd/kelas-8/spldv/metode-eliminasi/postes/:variant" element={<PostesEliminasiDispatcher />} />
          <Route path="/lkpd/kelas-8/spldv/definisi-spldv" element={<SPLDVDefinisiLKPDPage />} />
          <Route path="/lkpd/kelas-8/spldv/metode-grafik" element={<SPLDVMetodeGrafikLKPDPage />} />
          <Route path="/lkpd/kelas-8/spldv/metode-substitusi" element={<SPLDVMetodeSubstitusiLKPDPage />} />
          <Route path="/lkpd/kelas-8/spldv/metode-campuran" element={<SPLDVMetodeCampuranLKPDPage />} />
          <Route path="/lkpd/kelas-8/spldv/model-spldv" element={<SPLDVModelLKPDPage />} />
          <Route path="/lkpd/kelas-8/spldv/penyelesaian-masalah" element={<SPLDVPenyelesaianMasalahLKPDPage />} />
          <Route path="/lkpd/kelas-8/persamaan-garis-lurus" element={<PersamaanGarisLurusLKPDMenuPage />} />
          <Route path="/lkpd/kelas-8/persamaan-garis-lurus/lkpd" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/kelas-8/persamaan-garis-lurus/gradien" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/kelas-8/persamaan-garis-lurus/menentukan-pgl" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/kelas-8/persamaan-garis-lurus/hubungan-2-garis" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/kelas-8/persamaan-garis-lurus/aplikasi-kontekstual" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/kelas-8/persamaan-garis-lurus/buku-animasi" element={<BukuAnimasiPGLPage />} />
          <Route path="/lkpd/kelas-8/teorema-pythagoras" element={<TeoremaPythagorasLKPDMenuPage />} />
          <Route path="/lkpd/kelas-8/teorema-pythagoras/lkpd" element={<TeoremaPythagorasLKPDPage />} />
          <Route path="/lkpd/kelas-8/lingkaran" element={<LingkaranLKPDMenuPage />} />
          <Route path="/lkpd/kelas-8/lingkaran/lkpd" element={<LingkaranLKPDPage />} />
          <Route path="/lkpd/kelas-8/garis-singgung-lingkaran" element={<GarisSinggungLingkaranLKPDMenuPage />} />
          <Route path="/lkpd/kelas-8/garis-singgung-lingkaran/lkpd" element={<GarisSinggungLingkaranLKPDPage />} />
          <Route path="/lkpd/kelas-8/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarLKPDMenuPage />} />
          <Route path="/lkpd/kelas-8/bangun-ruang-sisi-datar/kubus" element={<KubusBRSDLKPDPage />} />
          <Route path="/lkpd/kelas-8/bangun-ruang-sisi-datar/balok" element={<BalokBRSDLKPDPage />} />
          <Route path="/lkpd/kelas-8/bangun-ruang-sisi-datar/prisma" element={<PrismaBRSDLKPDPage />} />
          <Route path="/lkpd/kelas-8/bangun-ruang-sisi-datar/limas" element={<LimasBRSDLKPDPage />} />
          <Route path="/lkpd/kelas-8/bangun-ruang-sisi-datar/gabungan" element={<GabunganBRSDLKPDPage />} />
          <Route path="/lkpd/kelas-8/*" element={<ComingSoonPage />} />
          <Route path="/lkpd/kelas-9/bilangan-berpangkat" element={<BilanganBerpangkatLKPDMenuPage />} />
          <Route path="/lkpd/kelas-9/bilangan-berpangkat/pengertian-notasi" element={<PengertianNotasiPangkatLKPDPage />} />
          <Route path="/lkpd/kelas-9/bilangan-berpangkat/sifat-operasi" element={<SifatOperasiPangkatLKPDPage />} />
          <Route path="/lkpd/kelas-9/bilangan-berpangkat/bentuk-akar" element={<BentukAkarLKPDPage />} />
          <Route path="/lkpd/kelas-9/bilangan-berpangkat/merasionalkan-akar" element={<MerasionalkanAkarLKPDPage />} />
          <Route path="/lkpd/kelas-9/bilangan-berpangkat/notasi-ilmiah" element={<NotasiIlmiahLKPDPage />} />
          <Route path="/lkpd/kelas-9/kesebangunan-kekongruenan" element={<KesebangunanKekongruenanLKPDMenuPage />} />
          <Route path="/lkpd/kelas-9/transformasi-geometri" element={<TransformasiGeometriLKPDMenuPage />} />
          <Route path="/lkpd/kelas-9/transformasi-geometri/translasi" element={<TranslasiTGLKPDPage />} />
          <Route path="/lkpd/kelas-9/transformasi-geometri/refleksi" element={<RefleksiTGLKPDPage />} />
          <Route path="/lkpd/kelas-9/transformasi-geometri/rotasi" element={<RotasiTGLKPDPage />} />
          <Route path="/lkpd/kelas-9/transformasi-geometri/dilatasi" element={<DilatasiTGLKPDPage />} />
          <Route path="/lkpd/kelas-9/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungLKPDMenuPage />} />
          <Route path="/lkpd/kelas-9/bangun-ruang-sisi-lengkung/tabung" element={<TabungBRSLLKPDPage />} />
          <Route path="/lkpd/kelas-9/bangun-ruang-sisi-lengkung/kerucut" element={<KerucutBRSLLKPDPage />} />
          <Route path="/lkpd/kelas-9/bangun-ruang-sisi-lengkung/bola" element={<BolaBRSLLKPDPage />} />
          <Route path="/lkpd/kelas-9/bangun-ruang-sisi-lengkung/perubahan-luas-volume" element={<PerubahanLuasVolumeBRSLLKPDPage />} />
          <Route path="/lkpd/kelas-9/bangun-ruang-sisi-lengkung/gabungan" element={<GabunganBRSLLKPDPage />} />
          <Route path="/lkpd/kelas-9/statistika" element={<StatistikaLKPDMenuPage />} />
          <Route path="/lkpd/kelas-9/statistika/pengantar-statistika" element={<PengantarStatistikaLKPDPage />} />
          <Route path="/lkpd/kelas-9/statistika/penyajian-data" element={<PenyajianDataLKPDPage />} />
          <Route path="/lkpd/kelas-9/statistika/rata-rata" element={<RataRataStatistikaLKPDPage />} />
          <Route path="/lkpd/kelas-9/statistika/median-modus" element={<MedianModusLKPDPage />} />
          <Route path="/lkpd/kelas-9/statistika/kuartil" element={<KuartilLKPDPage />} />
          <Route path="/lkpd/kelas-9/statistika/jangkauan-simpangan" element={<JangkauanSimpanganLKPDPage />} />
          <Route path="/lkpd/kelas-9/peluang" element={<PeluangLKPDMenuPage />} />
          <Route path="/lkpd/kelas-9/peluang/ruang-sampel" element={<RuangSampelLKPDPage />} />
          <Route path="/lkpd/kelas-9/peluang/peluang-empirik" element={<PeluangEmpirikLKPDPage />} />
          <Route path="/lkpd/kelas-9/peluang/peluang-teoretik" element={<PeluangTeoretikLKPDPage />} />
          <Route path="/lkpd/kelas-9/peluang/frekuensi-harapan" element={<FrekuensiHarapanLKPDPage />} />
          <Route path="/lkpd/kelas-9/peluang/komplemen" element={<KomplemenLKPDPage />} />
          <Route path="/lkpd/kelas-9/peluang/kejadian-majemuk" element={<PeluangKejadianMajemukLKPDPage />} />
          <Route path="/lkpd/kelas-9/persamaan-kuadrat" element={<PersamaanKuadratLKPDMenuPage />} />
          <Route path="/lkpd/kelas-9/persamaan-kuadrat/bentuk-umum" element={<PKBentukUmumLKPDPage />} />
          <Route path="/lkpd/kelas-9/persamaan-kuadrat/pemfaktoran" element={<PKPemfaktoranLKPDPage />} />
          <Route path="/lkpd/kelas-9/persamaan-kuadrat/rumus-kuadratik" element={<PKRumusKuadratikLKPDPage />} />
          <Route path="/lkpd/kelas-9/persamaan-kuadrat/pelengkap-kuadrat" element={<PKPelengkapKuadratLKPDPage />} />
          <Route path="/lkpd/kelas-9/persamaan-kuadrat/diskriminan" element={<PKDiskriminanLKPDPage />} />
          <Route path="/lkpd/kelas-9/persamaan-kuadrat/menyusun-baru" element={<PKMenyusunBaruLKPDPage />} />
          <Route path="/lkpd/kelas-9/persamaan-kuadrat/penerapan-kontekstual" element={<PKPenerapanKontekstualLKPDPage />} />
          <Route path="/lkpd/kelas-9/fungsi-kuadrat" element={<FungsiKuadratLKPDMenuPage />} />
          <Route path="/lkpd/kelas-9/fungsi-kuadrat/bentuk-umum-karakteristik" element={<FKBentukUmumKarakteristikLKPDPage />} />
          <Route path="/lkpd/kelas-9/fungsi-kuadrat/titik-potong" element={<FKTitikPotongLKPDPage />} />
          <Route path="/lkpd/kelas-9/fungsi-kuadrat/sumbu-simetri-puncak" element={<FKSumbuSimetriPuncakLKPDPage />} />
          <Route path="/lkpd/kelas-9/fungsi-kuadrat/menggambar-grafik" element={<FKMenggambarGrafikLKPDPage />} />
          <Route path="/lkpd/kelas-9/fungsi-kuadrat/menyusun-fungsi" element={<FKMenyusunFungsiLKPDPage />} />
          <Route path="/lkpd/kelas-9/fungsi-kuadrat/penerapan-maks-min" element={<FKPenerapanMaksMinLKPDPage />} />
          <Route path="/lkpd/kelas-9/*" element={<ComingSoonPage />} />
          <Route path="/atp" element={<ATPPage />} />
          <Route element={<GuruLayout />}>
            <Route path="/ruang-untuk-guru" element={<RuangUntukGuruPage />} />
            <Route path="/ruang-untuk-guru/sma" element={<SmaPage />} />
            <Route path="/ruang-untuk-guru/sd" element={<SdPage />} />
            <Route path="/ruang-untuk-guru/sd/buku-animasi" element={<SdBukuAnimasiPage />} />
            <Route
              path="/ruang-untuk-guru/sd/buku-animasi/:classSlug/:topicSlug"
              element={<SdBukuAnimasiTopicPage />}
            />
            <Route path="/ruang-untuk-guru/sd/:sectionSlug" element={<SdComingSoonPage />} />
            <Route path="/ruang-untuk-guru/sma/:mode" element={<SmaTopicMenuPage />} />
            <Route path="/ruang-untuk-guru/sma/:mode/:topicSlug" element={<SmaTopicMenuPage />} />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/sifat-sifat-eksponen"
              element={<SmaEksponenLogaritmaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/tugas-latihan-mandiri/eksponen-dan-logaritma/sifat-sifat-eksponen"
              element={<SmaEksponenLogaritmaLatihanPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/tugas-latihan-mandiri/eksponen-dan-logaritma/persamaan-eksponen"
              element={<SmaPersamaanEksponenLatihanPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/konsep-dan-sifat-sifat-logaritma"
              element={<SmaLogaritmaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/perbandingan-trigonometri-segitiga-siku-siku"
              element={<SmaPerbandinganTrigonometriSegitigaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/sudut-sudut-istimewa-dan-relasi-sudut"
              element={<SmaSudutIstimewaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/penerapan-dan-pemodelan-trigonometri"
              element={<SmaNilaiKuadranPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/identitas-dan-rumus-rumus-trigonometri"
              element={<SmaIdentitasTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/rumus-rumus-trigonometri"
              element={<SmaRumusRumusTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/persamaan-trigonometri"
              element={<SmaPersamaanTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/pertidaksamaan-trigonometri"
              element={<SmaPertidaksamaanTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/grafik-fungsi-trigonometri"
              element={<SmaGrafikFungsiTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/aturan-sinus-cosinus-dan-luas-segitiga"
              element={<SmaAturanSinusCosinusLuasSegitigaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/persamaan-logaritma"
              element={<SmaPersamaanLogaritmaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/pertidaksamaan-logaritma"
              element={<SmaPertidaksamaanLogaritmaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/bentuk-akar-dan-merasionalkan-penyebut"
              element={<SmaBentukAkarPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/fungsi-eksponen"
              element={<SmaFungsiEksponenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/persamaan-eksponen"
              element={<SmaPersamaanEksponenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/pertidaksamaan-eksponen"
              element={<SmaPertidaksamaanEksponenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/fungsi-eksponen/eksplorasi-fungsi-eksponen"
              element={<SmaFungsiEksponenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/barisan-dan-deret/barisan-dan-deret-aritmatika"
              element={<SmaBarisanDeretAritmetikaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/barisan-dan-deret/barisan-dan-deret-geometri"
              element={<SmaBarisanDeretGeometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/barisan-dan-deret/deret-geometri-tak-hingga"
              element={<SmaDeretGeometriTakHinggaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/konsep-dasar-vektor"
              element={<SmaKonsepDasarVektorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/operasi-vektor-secara-geometris"
              element={<SmaOperasiVektorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/vektor-pada-sistem-koordinat-kartesius"
              element={<SmaVektorPadaSistemKoordinatKartesiusPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/operasi-aljabar-pada-vektor"
              element={<SmaSudutAntaraDuaVektorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/proyeksi-vektor"
              element={<SmaProyeksiVektorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/sistem-persamaan-dan-pertidaksamaan-linear/sistem-persamaan-linear-tiga-variabel"
              element={<SmaSpltvPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/sistem-persamaan-dan-pertidaksamaan-linear/sistem-pertidaksamaan-linear-dua-variabel"
              element={<SmaSptdvPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/konsep-dasar-dan-operasi-polinomial"
              element={<SmaPolinomialKonsepPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/nilai-polinomial-dan-metode-horner"
              element={<SmaNilaiPolinomialHornerPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/pembagian-polinomial"
              element={<SmaPembagianPolinomialPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/teorema-sisa-dan-teorema-faktor"
              element={<SmaPolinomialTeoremaFaktorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/persamaan-polinomial-dan-teorema-vieta"
              element={<SmaPersamaanPolinomialVietaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/statistika/penyajian-data"
              element={<SmaStatistikaPenyajianDataPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/statistika/ukuran-pemusatan-data"
              element={<SmaStatistikaUkuranPemusatanDataPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/statistika/ukuran-letak-data"
              element={<SmaStatistikaUkuranLetakDataPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/statistika/ukuran-penempatan-penyebaran-data"
              element={<SmaStatistikaUkuranPenyebaranDataPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/aturan-perkalian-dan-penjumlahan"
              element={<SmaPeluangAturanPerkalianPenjumlahanPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/kombinasi"
              element={<SmaPeluangKombinasiPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/permutasi"
              element={<SmaPeluangPermutasiPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/ekspansi-binomial"
              element={<SmaPeluangEkspansiBinomialPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/ruang-sampel-dan-distribusi-peluang-kejadian"
              element={<SmaPeluangRuangSampelDistribusiPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/frekuensi-harapan"
              element={<SmaPeluangFrekuensiHarapanKomplemenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/kejadian-majemuk"
              element={<SmaPeluangKejadianMajemukPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/komplemen-suatu-kejadian"
              element={<SmaPeluangFrekuensiHarapanKomplemenPage />}
            />
            <Route path="/ruang-untuk-guru/sma/:mode/:topicSlug/:subtopicSlug" element={<SmaSubtopicComingSoonPage />} />
            <Route path="/ruang-untuk-guru/sma/olimpiade" element={<SmaComingSoonPage />} />
            <Route path="/ruang-untuk-guru/sma/tes-kemampuan-akademik" element={<SmaComingSoonPage />} />
            <Route path="/ruang-untuk-guru/exam-browser" element={<ExamBrowserComingSoonPage />} />
            <Route path="/ruang-untuk-guru/numatik-game" element={<NumatikGamePage />} />
            <Route path="/math-game-arena/umum/numatik-strike" element={<NumatikStrikeGamePage />} />
            <Route path="/math-game-arena/umum/numatik-world" element={<NumatikWorldPage />} />
            <Route path="/ruang-untuk-guru/keyakinan-kelas" element={<KeyakinanKelasPage />} />
            <Route path="/ruang-untuk-guru/penilaian-pembelajaran" element={<PenilaianPembelajaranPage />} />
            <Route path="/ruang-untuk-guru/capaian-pembelajaran" element={<CapaianPembelajaranPage />} />
            <Route path="/ruang-untuk-guru/rubrik-penilaian-dimensi-lulusan" element={<RubrikPenilaianDimensiLulusanPage />} />
            <Route path="/ruang-untuk-guru/jurnal-guru" element={<JurnalGuruPage />} />
            <Route path="/ruang-untuk-guru/agenda-guru" element={<AgendaGuruPage />} />
            <Route path="/ruang-untuk-guru/prosem" element={<ProsemPage />} />
            <Route path="/ruang-untuk-guru/kktp" element={<KKTPPage />} />
            <Route path="/ruang-untuk-guru/absensi-siswa" element={<AbsensiSiswaPage />} />
            <Route path="/ruang-untuk-guru/penilaian-siswa" element={<PenilaianSiswaPage />} />
            <Route path="/ruang-untuk-guru/rpp/rancang" element={<RancangRPPPage />} />
            <Route path="/ruang-untuk-guru/kokulikuler" element={<KokulikulerPage />} />
            <Route path="/ruang-untuk-guru/prota" element={<ProtaPage />} />
            <Route path="/ruang-untuk-guru/prota/:tahun" element={<ProtaTahunPage />} />
            <Route path="/ruang-untuk-guru/analisis-alokasi-waktu" element={<AnalisisAlokasiWaktuPage />} />
            <Route path="/ruang-untuk-guru/rpp" element={<RPPPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat" element={<RPPBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/penjumlahan" element={<RPPPenjumlahanBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/pengurangan" element={<RPPPenguranganBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/perkalian" element={<RPPPerkalianBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/pembagian" element={<RPPPembagianBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/operasi-campuran" element={<RPPOperasiCampuranBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/kpk-fpb" element={<RPPKpkFpbPage />} />
            <Route path="/ruang-untuk-guru/rpp/:materiSlug" element={<RPPMateriDynamicPage />} />
            <Route path="/ruang-untuk-guru/rpp/:materiSlug/:subSlug" element={<RPPDetailDynamicPage />} />
          </Route>
          <Route path="/ulangan-harian" element={<UlanganHarianPage />} />
          <Route path="/pesan-kesan" element={<PesanKesanPage />} />
          <Route path="/petunjuk" element={<PetunjukPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/referensi" element={<ReferensiPage />} />
          <Route path="/kalkulator-scientific" element={<KalkulatorScientificPage />} />
          <Route path="/kumpulan-rumus" element={<KumpulanRumusPage />} />
          <Route path="/konversi-satuan" element={<KonversiSatuanPage />} />
          <Route path="/video-pembelajaran" element={<VideoPembelajaranPage />} />
          <Route path="/donasi" element={<DonasiPage />} />
          <Route path="/biografi" element={<BiografiPage />} />
          <Route path="/olimpiade" element={<OlimpiadePage />} />
          <Route path="/olimpiade/bilangan-bulat" element={<OlimpiadeBilanganBulatPage />} />
          <Route path="/olimpiade/bilangan-rasional" element={<OlimpiadeBilanganRasionalPage />} />
          <Route path="/olimpiade/bilangan-berpangkat" element={<OlimpiadeBilanganBerpangkatPage />} />
          <Route path="/olimpiade/statistika" element={<OlimpiadeStatistikaPage />} />
          <Route path="/olimpiade/bilangan-irasional" element={<OlimpiadeBilanganIrasionalPage />} />
          <Route path="/olimpiade/kpk-fpb" element={<OlimpiadeKPKFPBPage />} />
          <Route path="/olimpiade/modulo" element={<OlimpiadeModuloPage />} />
          <Route path="/olimpiade/himpunan" element={<OlimpiadeHimpunanPage />} />
          <Route path="/olimpiade/relasi-fungsi" element={<OlimpiadeRelasiFungsiPage />} />
          <Route path="/olimpiade/perbandingan" element={<OlimpiadePerbandinganPage />} />
          <Route path="/olimpiade/aljabar" element={<OlimpiadeAljabarPage />} />
          <Route path="/olimpiade/pola-bilangan" element={<OlimpiadePolaBilanganPage />} />
          <Route path="/olimpiade/spldv" element={<OlimpiadeSPLDVPage />} />
          <Route path="/olimpiade/garis-sudut" element={<OlimpiadeGarisSudutPage />} />
          <Route path="/olimpiade/koordinat-cartesius" element={<OlimpiadeKoordinatCartesiusPage />} />
          <Route path="/olimpiade/teorema-pythagoras" element={<OlimpiadeTeoremaPage />} />
          <Route path="/olimpiade/segitiga-segiempat" element={<OlimpiadeSegitigaSegiempatPage />} />
          <Route path="/olimpiade/lingkaran" element={<OlimpiadeLingkaranPage />} />
          <Route path="/olimpiade/bangun-ruang-sisi-datar" element={<OlimpiadeBangunRuangSisiDatarPage />} />
          <Route path="/olimpiade/bangun-ruang-sisi-lengkung" element={<OlimpiadeBangunRuangSisiLengkungPage />} />
          <Route path="/olimpiade/plsv" element={<OlimpiadePLSVPage />} />
          <Route path="/olimpiade/persamaan-garis" element={<OlimpiadePersamaanGarisPage />} />
          <Route path="/olimpiade/persamaan-kuadrat" element={<OlimpiadePersamaanKuadratPage />} />
          <Route path="/olimpiade/fungsi-kuadrat" element={<OlimpiadeFungsiKuadratPage />} />
          <Route path="/olimpiade/aritmetika-sosial" element={<OlimpiadeAritmetikaSosialPage />} />
          <Route path="/olimpiade/kesebangunan" element={<OlimpiadeKesebangunanPage />} />
          <Route path="/olimpiade/transformasi-geometri" element={<OlimpiadeTransformasiPage />} />
          <Route path="/olimpiade/peluang" element={<OlimpiadePeluangPage />} />
          <Route path="/tka" element={<TKAPage />} />
          <Route path="/tka/tips" element={<TKATipsPage />} />
          <Route path="/tka/paket-1" element={<TKALatihan1Page />} />
          <Route path="/tka/try-out-1" element={<TKATryOut1Page />} />
           <Route path="/tka/try-out-2" element={<TKATryOut2Page />} />
          <Route path="/tka/paket-2" element={<TKALatihan2Page />} />
          <Route path="/tka/paket-3" element={<TKALatihan3Page />} />
          <Route path="/tka/paket-4" element={<TKALatihan4Page />} />
          <Route path="/tka/paket-5" element={<TKALatihan5Page />} />
          <Route path="/tka/paket-6" element={<TKALatihan6Page />} />
          <Route path="/tka/paket-7" element={<TKALatihan7Page />} />
          <Route path="/tka/soal-asli-2025" element={<TKASoalAsli2025Page />} />
          <Route path="/tka/modul-pemantapan" element={<TKAModulPemantapanPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-bulat" element={<TKAPemantapanBilanganBulatPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-rasional" element={<TKAPemantapanBilanganRasionalPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-berpangkat" element={<TKAPemantapanBilanganBerpangkatPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-irasional" element={<TKAPemantapanBilanganIrasionalPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-berpangkat-irasional" element={<TKAPemantapanBilanganBerpangkatIrasionalPage />} />
          <Route path="/tka/modul-pemantapan/himpunan" element={<TKAPemantapanHimpunanPage />} />
          <Route path="/tka/modul-pemantapan/relasi-fungsi" element={<TKAPemantapanRelasiFungsiPage />} />
          <Route path="/tka/modul-pemantapan/perbandingan" element={<TKAPemantapanPerbandinganPage />} />
          <Route path="/tka/modul-pemantapan/aljabar" element={<TKAPemantapanAljabarPage />} />
          <Route path="/tka/modul-pemantapan/plsv" element={<TKAPemantapanPLSVPage />} />
          <Route path="/tka/modul-pemantapan/aritmetika-sosial" element={<TKAPemantapanAritmetikaSosialPage />} />
          <Route path="/tka/modul-pemantapan/pola-bilangan" element={<TKAPemantapanPolaBilanganPage />} />
          <Route path="/tka/modul-pemantapan/spldv" element={<TKAPemantapanSPLDVPage />} />
          <Route path="/tka/modul-pemantapan/garis-sudut" element={<TKAPemantapanGarisSudutPage />} />
          <Route path="/tka/modul-pemantapan/teorema-pythagoras" element={<TKAPemantapanTeoremaPage />} />
          <Route path="/tka/modul-pemantapan/segitiga-segiempat" element={<TKAPemantapanSegitigaSegiempatPage />} />
          <Route path="/tka/modul-pemantapan/lingkaran" element={<TKAPemantapanLingkaranPage />} />
          <Route path="/tka/modul-pemantapan/bangun-ruang-sisi-datar" element={<TKAPemantapanBangunRuangSisiDatarPage />} />
          <Route path="/tka/modul-pemantapan/bangun-ruang-sisi-lengkung" element={<TKAPemantapanBangunRuangSisiLengkungPage />} />
          <Route path="/tka/modul-pemantapan/kesebangunan" element={<TKAPemantapanKesebangunanPage />} />
          <Route path="/tka/modul-pemantapan/transformasi-geometri" element={<TKAPemantapanTransformasiPage />} />
          <Route path="/tka/modul-pemantapan/statistika" element={<TKAPemantapanStatistikaPage />} />
          <Route path="/tka/modul-pemantapan/peluang" element={<TKAPemantapanPeluangPage />} />
          <Route path="/tka/modul-pemantapan/persamaan-garis" element={<TKAPemantapanPersamaanGarisPage />} />
          <Route path="/tka/modul-pemantapan/koordinat-cartesius" element={<TKAPemantapanKoordinatCartesiusPage />} />
          <Route path="/papan-peringkat" element={<PapanPeringkatPage />} />
          <Route path="/bank-soal" element={<BankSoalPage />} />
          <Route path="/bank-soal/bilangan-bulat" element={<BankSoalBilanganBulatPage />} />
          <Route path="/bank-soal/bilangan-rasional" element={<BankSoalBilanganRasionalPage />} />
          <Route path="/bank-soal/segitiga-dan-segiempat" element={<BankSoalSegitigaSegiempatPage />} />
          <Route path="/bank-soal/himpunan" element={<BankSoalHimpunanPage />} />
          <Route path="/bank-soal/koordinat-cartesius" element={<BankSoalKoordinatCartesiusPage />} />
          <Route path="/bank-soal/aljabar" element={<BankSoalAljabarPage />} />
          <Route path="/bank-soal/plsv" element={<BankSoalPLSVPage />} />
          <Route path="/bank-soal/perbandingan" element={<BankSoalPerbandinganPage />} />
          <Route path="/bank-soal/aritmetika-sosial" element={<BankSoalAritmetikaSosialPage />} />
          <Route path="/bank-soal/pola-bilangan" element={<BankSoalPolaBilanganPage />} />
          <Route path="/bank-soal/relasi-fungsi" element={<BankSoalRelasiFungsiPage />} />
          <Route path="/bank-soal/garis-sudut" element={<BankSoalGarisSudutPage />} />
          <Route path="/bank-soal/spldv" element={<BankSoalSPLDVPage />} />
          <Route path="/bank-soal/persamaan-garis-lurus" element={<BankSoalPersamaanGarisLurusPage />} />
          <Route path="/bank-soal/peluang" element={<BankSoalPeluangPage />} />
          <Route path="/bank-soal/teorema-pythagoras" element={<BankSoalTeoremaPythagorasPage />} />
          <Route path="/bank-soal/lingkaran" element={<BankSoalLingkaranPage />} />
          <Route path="/bank-soal/bangun-ruang-sisi-datar" element={<BankSoalBangunRuangSisiDatarPage />} />
          <Route path="/bank-soal/bangun-ruang-sisi-lengkung" element={<BankSoalBangunRuangSisiLengkungPage />} />
          <Route path="/bank-soal/bilangan-berpangkat" element={<BankSoalBilanganBerpangkatPage />} />
          <Route path="/bank-soal/persamaan-kuadrat" element={<BankSoalPersamaanKuadratPage />} />
          <Route path="/bank-soal/fungsi-kuadrat" element={<BankSoalFungsiKuadratPage />} />
          <Route path="/bank-soal/statistika" element={<BankSoalStatistikaPage />} />
          <Route path="/bank-soal/garis-singgung-lingkaran" element={<BankSoalGarisSinggungLingkaranPage />} />
          <Route path="/bank-soal/kesebangunan-kekongruenan" element={<BankSoalKesebangunanPage />} />
          <Route path="/bank-soal/transformasi-geometri" element={<BankSoalTransformasiGeometriPage />} />
          <Route path="/chat-ai" element={<ChatAIPage />} />
          <Route path="/pengaturan" element={<PengaturanPage />} />
          <Route path="/tentang-aplikasi" element={<TentangAplikasiPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/intensif-utbk" element={<IntensifUtbkPage />} />
          <Route path="/intensif-utbk/:topicSlug" element={<IntensifUtbkPage />} />
          <Route path="/menghitung-cepat" element={<MenghitungCepatPage />} />
          <Route path="/menghitung-cepat/perkalian-dengan-11" element={<PerkalianDengan11Page />} />
          <Route path="/menghitung-cepat/kuadrat-berakhiran-5" element={<KuadratBerakhiran5Page />} />
          <Route path="/menghitung-cepat/kuadrat-cepat" element={<KuadratCepatPage />} />
          <Route path="/menghitung-cepat/perkalian-dekat-100" element={<PerkalianDekat100Page />} />
          <Route path="/menghitung-cepat/persentase-cepat" element={<PersentaseCepatPage />} />
          <Route path="/menghitung-cepat/penjumlahan-pengurangan" element={<PenjumlahanPenguranganCepatPage />} />
          <Route path="/menghitung-cepat/perkalian-dua-digit" element={<PerkalianDuaDigitPage />} />
          <Route path="/menghitung-cepat/pembagian-cepat" element={<PembagianCepatPage />} />
          <Route path="/menghitung-cepat/tabel-referensi" element={<TabelReferensiPage />} />
          <Route path="/menghitung-cepat/latihan-flashcard" element={<LatihanFlashcardPage />} />
          <Route path="/menghitung-cepat/game-latihan" element={<GameLatihanHitungCepatPage />} />

          {/* Latihan Mandiri Routes */}
          <Route path="/latihan-mandiri" element={<LatihanMandiriPage />} />
          <Route path="/latihan-mandiri/kelas-7" element={<Navigate to="/latihan-mandiri" replace />} />
          <Route path="/latihan-mandiri/kelas-8" element={<Navigate to="/latihan-mandiri" replace />} />
          <Route path="/latihan-mandiri/kelas-9" element={<Navigate to="/latihan-mandiri" replace />} />

          {/* Kelas 7 Topic Routes */}
          <Route path="/latihan-mandiri/kelas-7/bilangan-bulat" element={<BilanganBulatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/pembagian" element={<PembagianBilanganBulatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/kpk-fpb" element={<KPKFPBBilanganBulatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional" element={<BilanganRasionalK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/arti-pecahan-senilai-membandingkan" element={<ArtiPecahanSenilaiMembandingkanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/pecahan-campuran-persen" element={<PecahanCampuranPersenK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/penjumlahan-pecahan" element={<PenjumlahanPecahanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/perkalian-pecahan" element={<PerkalianPecahanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/pembagian-pecahan" element={<PembagianPecahanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/bentuk-desimal" element={<BentukDesimalK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/penjumlahan-pengurangan-desimal" element={<PenjumlahanPenguranganDesimalK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/perkalian-desimal" element={<PerkalianDesimalK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/pembagian-desimal" element={<PembagianDesimalK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/bilangan-rasional/pembulatan-desimal" element={<PembulatanDesimalK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar" element={<AljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar/pengertian-unsur" element={<PengertianUnsurAljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar/penjumlahan-pengurangan" element={<PenjumlahanPenguranganAljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar/perkalian" element={<PerkalianAljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar/pembagian" element={<PembagianAljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar/pemangkatan" element={<PemangkatanAljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar/substitusi" element={<SubstitusiBilanganAljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar/faktorisasi" element={<FaktorisasiAljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aljabar/pecahan-aljabar" element={<MenyederhanakanPecahanAljabarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv" element={<PLSVPtLSVK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv/kalimat-terbuka" element={<KalimatTerbukaTertutupK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv/pengertian-plsv" element={<PengertianPLSVK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv/penyelesaian-plsv" element={<PenyelesaianPLSVK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv/model-matematika-plsv" element={<ModelMatematikaPLSVK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv/pengertian-ptlsv" element={<PengertianPtLSVK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv/penyelesaian-ptlsv" element={<PenyelesaianPtLSVK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv/model-matematika-ptlsv" element={<ModelMatematikaPtLSVK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/perbandingan" element={<PerbandinganK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/perbandingan/umum" element={<PerbandinganUmumK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/perbandingan/senilai" element={<PerbandinganSenilaiK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/perbandingan/campuran" element={<PerbandinganCampuranK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/perbandingan/bertingkat" element={<PerbandinganBertingkatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/perbandingan/skala" element={<PerbandinganSkalaK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial" element={<AritmetikaSosialK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/diskon" element={<DiskonK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/bunga-tunggal" element={<BungaTunggalK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/ppn" element={<PPNK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/pph" element={<PPhK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/garis-dan-sudut" element={<GarisDanSudutK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/garis-dan-sudut/hubungan-2-garis" element={<HubunganDuaGarisK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/garis-dan-sudut/sudut-pelurus-penyiku-bertolak" element={<SudutPelurusPenyikuBertolakK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/garis-dan-sudut/sifat-sudut-dua-garis-sejajar" element={<SifatSudutDuaGarisSejajarK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/garis-dan-sudut/jumlah-sudut-segi-banyak" element={<JumlahSudutSegiBanyakK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat" element={<SegitigaSegiempatK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat/garis-berat-bagi-tinggi" element={<GarisBeratBagiTinggiLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat/keliling-segitiga-dan-segiempat" element={<KelilingSegitigaSegiempatLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat/luas-segitiga" element={<LuasSegitigaLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat/luas-segiempat" element={<LuasSegiempatLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat/keliling-luas-bangun-tak-beraturan" element={<KelilingLuasBangunTakBeraturanLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/himpunan" element={<HimpunanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/himpunan/pengertian-keanggotaan" element={<PengertianKeanggotaanHimpunanLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/himpunan/menyatakan-himpunan" element={<MenyatakanHimpunanLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/himpunan/diagram-venn" element={<DiagramVennLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/himpunan/himpunan-bagian" element={<HimpunanBagianLatihanK7Page />} />
          <Route path="/latihan-mandiri/kelas-7/himpunan/operasi-himpunan" element={<OperasiHimpunanLatihanK7Page />} />

          {/* Kelas 8 Topic Routes */}
          <Route path="/latihan-mandiri/kelas-8/pola-bilangan" element={<PolaBilanganK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/pola-bilangan/pengertian-pola" element={<PengertianPolaK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/pola-bilangan/pengertian-dan-pola-khusus" element={<PengertianDanPolaKhususK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/pola-bilangan/pola-khusus" element={<PolaKhususK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/pola-bilangan/pola-aritmetika" element={<PolaAritmetikaK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/pola-bilangan/pola-geometri" element={<PolaGeometriK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/koordinat-cartesius" element={<KoordinatCartesiusK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/koordinat-cartesius/unsur-unsur" element={<UnsurUnsurCartesiusK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/koordinat-cartesius/posisi-relatif-titik-acuan" element={<PosisiRelatifTitikAcuanK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/koordinat-cartesius/jarak-titik-garis" element={<JarakTitikGarisK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/relasi-dan-fungsi" element={<RelasiFungsiK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/relasi-dan-fungsi/pengertian-relasi" element={<PengertianRelasiK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/relasi-dan-fungsi/pengertian-fungsi" element={<PengertianFungsiK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/relasi-dan-fungsi/banyak-fungsi" element={<BanyakFungsiK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/relasi-dan-fungsi/notasi-fungsi" element={<NotasiFungsiK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/relasi-dan-fungsi/grafik-fungsi" element={<GrafikFungsiK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/spldv" element={<SPLDVK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/spldv/definisi" element={<DefinisiSPLDVK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/spldv/metode-grafik" element={<MetodeGrafikSPLDVK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/spldv/metode-substitusi" element={<MetodeSubstitusiSPLDVK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/spldv/metode-eliminasi" element={<MetodeEliminasiSPLDVK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/spldv/metode-campuran" element={<MetodeCampuranSPLDVK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/spldv/model-spldv" element={<ModelSPLDVK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/spldv/penyelesaian-masalah" element={<PenyelesaianMasalahSPLDVK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/persamaan-garis-lurus" element={<PersamaanGarisLurusK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/persamaan-garis-lurus/grafik" element={<GrafikPGLK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/persamaan-garis-lurus/gradien" element={<GradienK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/persamaan-garis-lurus/menentukan-pgl" element={<MenentukanPGLK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/persamaan-garis-lurus/hubungan-2-garis" element={<Hubungan2GarisK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/persamaan-garis-lurus/aplikasi-kontekstual" element={<AplikasiKontekstualPGLK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/teorema-pythagoras" element={<TeoremaPythagorasK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/teorema-pythagoras/pembuktian" element={<PembuktianPythagorasK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/teorema-pythagoras/menghitung-panjang" element={<MenghitungPanjangPythagorasK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/teorema-pythagoras/triple-pythagoras" element={<TriplePythagorasK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/teorema-pythagoras/jenis-segitiga" element={<JenisSegitigaPythagorasK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/teorema-pythagoras/sudut-khusus" element={<SudutKhususPythagorasK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/teorema-pythagoras/masalah-kontekstual" element={<MasalahKontekstualPythagorasK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/lingkaran" element={<LingkaranK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/lingkaran/unsur-unsur" element={<UnsurUnsurLingkaranK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/lingkaran/keliling-luas" element={<KelilingLuasLingkaranK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/lingkaran/kaitan-bangun-datar" element={<KaitanBangunDatarLingkaranK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/lingkaran/busur-juring" element={<BusurJuringLingkaranK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/lingkaran/sudut-pusat-keliling" element={<SudutPusatKelilingLingkaranK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/lingkaran/penerapan-kontekstual" element={<PenerapanKontekstualLingkaranK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/garis-singgung-lingkaran" element={<GarisSinggungLingkaranK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/garis-singgung-lingkaran/pengertian" element={<PengertianGSLK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/garis-singgung-lingkaran/menghitung-panjang" element={<MenghitungPanjangGSLK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/garis-singgung-lingkaran/gspl" element={<GSPLK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/garis-singgung-lingkaran/gspd" element={<GSPDK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/garis-singgung-lingkaran/sabuk-lilitan" element={<SabukLilitanK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar/kubus" element={<KubusLMK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar/balok" element={<BalokLMK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar/prisma" element={<PrismaLMK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar/limas" element={<LimasLMK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar/masalah-kontekstual" element={<MasalahKontekstualBRSDLMK8Page />} />
          <Route path="/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar-gabungan" element={<BRSDGabunganLMK8Page />} />

          {/* Kelas 9 Topic Routes */}
          <Route path="/latihan-mandiri/kelas-9/bilangan-berpangkat" element={<BilanganBerpangkatK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bilangan-berpangkat/pengertian-notasi" element={<PengertianNotasiK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bilangan-berpangkat/sifat-sifat" element={<SifatSifatK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bilangan-berpangkat/pangkat-nol-negatif-pecahan" element={<PangkatNolNegatifPecahanK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bilangan-berpangkat/bentuk-akar" element={<BentukAkarK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bilangan-berpangkat/notasi-ilmiah" element={<NotasiIlmiahK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/kesebangunan-kekongruenan" element={<KesebangunanKekongruenK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/kesebangunan-kekongruenan/definisi" element={<DefinisiKesebangunanK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/kesebangunan-kekongruenan/menghitung-rusuk" element={<MenghitungRusukK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/kesebangunan-kekongruenan/segitiga-sebangun" element={<SegitigaSebangunK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/kesebangunan-kekongruenan/rasio-rusuk" element={<RasioRusukK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/kesebangunan-kekongruenan/kekongruenan" element={<KekongruenBangunDatarK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/transformasi-geometri" element={<TransformasiGeometriK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/transformasi-geometri/translasi" element={<TranslasiK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/transformasi-geometri/refleksi" element={<RefleksiK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/transformasi-geometri/rotasi" element={<RotasiK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/transformasi-geometri/dilatasi" element={<DilatsiK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/tabung" element={<TabungLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/kerucut" element={<KerucutLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/bola" element={<BolaLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/perubahan-volume" element={<PerubahanVolumeLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/gabungan" element={<GabunganLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/statistika" element={<StatistikaK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/statistika/pengantar" element={<PengantarStatistikaLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/statistika/penyajian-data" element={<PenyajianDataLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/statistika/rata-rata" element={<RataRataLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/statistika/median-modus" element={<MedianModusLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/statistika/kuartil" element={<KuartilLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/statistika/penyebaran-data" element={<PenyebaranDataLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/peluang" element={<PeluangK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/peluang/ruang-sampel" element={<RuangSampelLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/peluang/peluang-empirik" element={<PeluangEmpirikLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/peluang/peluang-teoretik" element={<PeluangTeoretikLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/peluang/frekuensi-harapan" element={<FrekuensiHarapanLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/peluang/komplemen" element={<KomplementLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/peluang/kejadian-majemuk" element={<PeluangKejadianMajemukLMK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat" element={<PersamaanKuadratK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat/bentuk-umum" element={<PKBentukUmumPage />} />
          <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat/pemfaktoran" element={<PKPemfaktoranPage />} />
          <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat/rumus-kuadratik" element={<PKRumusKuadratikPage />} />
          <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat/pelengkap-kuadrat" element={<PKPelengkapKuadratPage />} />
          <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat/diskriminan" element={<PKDiskriminanPage />} />
          <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat/menyusun-persamaan-baru" element={<PKMenyusunBaruPage />} />
          <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat/penerapan-kontekstual" element={<PKPenerapanKontekstualPage />} />
          <Route path="/latihan-mandiri/kelas-9/fungsi-kuadrat" element={<FungsiKuadratK9Page />} />
          <Route path="/latihan-mandiri/kelas-9/fungsi-kuadrat/bentuk-umum-karakteristik" element={<FKBentukUmumKarakteristikPage />} />
          <Route path="/latihan-mandiri/kelas-9/fungsi-kuadrat/titik-potong" element={<FKTitikPotongPage />} />
          <Route path="/latihan-mandiri/kelas-9/fungsi-kuadrat/sumbu-simetri" element={<FKSumbuSimetriPage />} />
          <Route path="/latihan-mandiri/kelas-9/fungsi-kuadrat/menggambar-grafik" element={<FKMenggambarGrafikPage />} />
          <Route path="/latihan-mandiri/kelas-9/fungsi-kuadrat/menyusun-fungsi" element={<FKMenyusunFungsiPage />} />
          <Route path="/latihan-mandiri/kelas-9/fungsi-kuadrat/penerapan-nilai-maks-min" element={<FKPenerapanNilaiMaksMinPage />} />

          {/* Math Game Arena Routes */}
          <Route path="/math-game-arena" element={<MathGameArenaPage />} />
          <Route path="/math-game-arena/sma" element={<MathGameArenaSmaMenuPage />} />
           <Route path="/math-game-arena/sma/:topicSlug/:subtopicSlug" element={<MathGameArenaSmaSubtopicPage />} />
           <Route path="/math-game-arena/sma/:topicSlug" element={<MathGameArenaSmaMenuPage />} />
          <Route path="/math-game-arena/kelas-7" element={<Navigate to="/math-game-arena" replace />} />
          <Route path="/math-game-arena/kelas-8" element={<Navigate to="/math-game-arena" replace />} />
          <Route path="/math-game-arena/kelas-9" element={<Navigate to="/math-game-arena" replace />} />
          <Route path="/math-game-arena/umum" element={<MathGameArenaUmumPage />} />
          <Route path="/math-game-arena/umum/balap-mobil" element={<CarRacingGamePage />} />
          <Route path="/math-game-arena/umum/tetris" element={<TetrisGamePage />} />
          <Route path="/math-game-arena/umum/dino-run" element={<DinoRunGamePage />} />
          <Route path="/math-game-arena/umum/flappy-rocket" element={<FlappyRocketPage />} />
          <Route path="/math-game-arena/umum/tangkap-benda" element={<CatchItemsGamePage />} />
          <Route path="/math-game-arena/umum/snake-math" element={<SnakeMathPage />} />
          <Route path="/math-game-arena/umum/asteroid-blaster" element={<AsteroidBlasterPage />} />
          <Route path="/math-game-arena/umum/bubble-pop" element={<BubblePopPage />} />
          <Route path="/math-game-arena/umum/hajar-mol" element={<MolSmashPage />} />
          <Route path="/math-game-arena/umum/mancing-soal" element={<FishingMathPage />} />
          <Route path="/math-game-arena/umum/pecah-jawaban" element={<BrickBreakerPage />} />
          <Route path="/math-game-arena/umum/tembak-tank" element={<BattleTankPage />} />
          <Route path="/math-game-arena/umum/kereta-koin-math" element={<CoinTrainMathPage />} />
          <Route path="/math-game-arena/umum/ninja-buah-math" element={<FruitNinjaMathPage />} />
          <Route path="/math-game-arena/umum/pulau-harta-math" element={<TreasureIslandMathPage />} />
          <Route path="/math-game-arena/umum/kapal-selam-math-battle" element={<SubmarineBattleMathPage />} />
          <Route path="/math-game-arena/umum/lompat-jawaban" element={<PlatformJumpMathPage />} />
          <Route path="/math-game-arena/umum/ksatria-mat" element={<KsatriaMatPage />} />
          <Route path="/math-game-arena/umum/space-impact" element={<SpaceImpactPage />} />
          <Route path="/math-game-arena/umum/galaxy-defender" element={<GalaxyDefenderPage />} />
          <Route path="/math-game-arena/umum/math-bros" element={<MathBrosPage />} />
          <Route path="/math-game-arena/umum/zuma-math" element={<ZumaMathPage />} />
          <Route path="/math-game-arena/umum/pacman-math" element={<PacmanMathPage variant="spider" topicLabel="Math Game Arena" />} />
          <Route path="/math-game-arena/umum/bounce-math" element={<BounceMathPage />} />
          <Route path="/math-game-arena/umum/western-bar" element={<WesternBarPage />} />
          <Route path="/math-game-arena/umum/pinball-math" element={<PinballMathPage />} />
          <Route path="/math-game-arena/umum/penalti-math" element={<PenaltiMathPage />} />

          {/* Math Game Arena - Kelas 7 Topic Routes */}
          <Route path="/math-game-arena/kelas-7/bilangan-bulat" element={<BilanganBulatMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/pesawat-tembak-meteor" element={<PenjumlahanMeteorGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/turtle-run" element={<PenjumlahanTurtleRunGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/flappy-rocket" element={<PenjumlahanFlappyRocketGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/tembak-tank" element={<PenjumlahanTembakTankGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/space-impact" element={<PenjumlahanSpaceImpactGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/tetris" element={<PenjumlahanTetrisGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/snake-math" element={<PenjumlahanSnakeMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/pesawat-tembak-meteor" element={<PenguranganMeteorGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/flappy-rocket" element={<PenguranganFlappyRocketGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/tembak-tank" element={<PenguranganTembakTankGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/space-impact" element={<PenguranganSpaceImpactGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/turtle-run" element={<PenguranganTurtleRunGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/tetris" element={<PenguranganTetrisGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/snake-math" element={<PenguranganSnakeMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/pesawat-tembak-meteor" element={<PerkalianMeteorGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/flappy-rocket" element={<PerkalianFlappyRocketGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/tembak-tank" element={<PerkalianTembakTankGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/space-impact" element={<PerkalianSpaceImpactGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/turtle-run" element={<PerkalianTurtleRunGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/tetris" element={<PerkalianTetrisGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/snake-math" element={<PerkalianSnakeMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian" element={<PembagianBilanganBulatGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/pesawat-tembak-meteor" element={<PembagianMeteorGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/flappy-rocket" element={<PembagianFlappyRocketGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/tembak-tank" element={<PembagianTembakTankGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/space-impact" element={<PembagianSpaceImpactGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/turtle-run" element={<PembagianTurtleRunGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/tetris" element={<PembagianTetrisGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/snake-math" element={<PembagianSnakeMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/pesawat-tembak-meteor" element={<OperasiCampuranMeteorGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/flappy-rocket" element={<OperasiCampuranFlappyRocketGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/tembak-tank" element={<OperasiCampuranTembakTankGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/space-impact" element={<OperasiCampuranSpaceImpactGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/turtle-run" element={<OperasiCampuranTurtleRunGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/tetris" element={<OperasiCampuranTetrisGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/snake-math" element={<OperasiCampuranSnakeMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb" element={<KPKFPBGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/pesawat-tembak-meteor" element={<KPKFPBMeteorGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/flappy-rocket" element={<KPKFPBFlappyRocketGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/tembak-tank" element={<KPKFPBTembakTankGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/space-impact" element={<KPKFPBSpaceImpactGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/turtle-run" element={<KPKFPBTurtleRunGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/tetris" element={<KPKFPBTetrisGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/snake-math" element={<KPKFPBSnakeMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/meteor-pantul" element={<PenjumlahanMeteorPantulGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/meteor-pantul" element={<PenguranganMeteorPantulGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/meteor-pantul" element={<PerkalianMeteorPantulGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/meteor-pantul" element={<PembagianMeteorPantulGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/meteor-pantul" element={<OperasiCampuranMeteorPantulGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/meteor-pantul" element={<KPKFPBMeteorPantulGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/galaksi-tempur" element={<PenjumlahanGalaksiTempurGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/galaksi-tempur" element={<PenguranganGalaksiTempurGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/galaksi-tempur" element={<PerkalianGalaksiTempurGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/galaksi-tempur" element={<PembagianGalaksiTempurGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/galaksi-tempur" element={<OperasiCampuranGalaksiTempurGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/galaksi-tempur" element={<KPKFPBGalaksiTempurGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/zum-math" element={<PenjumlahanZumMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/zum-math" element={<PenguranganZumMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/zum-math" element={<PerkalianZumMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/zum-math" element={<PembagianZumMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/zum-math" element={<OperasiCampuranZumMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/zum-math" element={<KPKFPBZumMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan/pac-math" element={<PenjumlahanPacMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan/pac-math" element={<PenguranganPacMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian/pac-math" element={<PerkalianPacMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian/pac-math" element={<PembagianPacMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran/pac-math" element={<OperasiCampuranPacMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb/pac-math" element={<KPKFPBPacMathGameMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/bilangan-rasional" element={<BilanganRasionalMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/aljabar" element={<AljabarMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/plsv-ptlsv" element={<PLSVPtLSVMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/perbandingan" element={<PerbandinganMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/aritmetika-sosial" element={<AritmetikaSosialMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/garis-dan-sudut" element={<GarisDanSudutMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/segitiga-dan-segiempat" element={<SegitigaSegiempatMGAK7Page />} />
          <Route path="/math-game-arena/kelas-7/himpunan" element={<HimpunanMGAK7Page />} />

          {/* Math Game Arena - Kelas 7 catch-all chooser & dispatcher */}
          <Route path="/math-game-arena/kelas-7/:parentSlug/:slug" element={<SubmaterialGameVariantsChooserK7 />} />
          <Route path="/math-game-arena/kelas-7/:parentSlug/:slug/:variant" element={<SubmaterialGameDispatcherK7 />} />

          {/* Math Game Arena - Kelas 8 Topic Routes */}
          <Route path="/math-game-arena/kelas-8/pola-bilangan" element={<PolaBilanganMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/koordinat-cartesius" element={<KoordinatCartesiusMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/relasi-dan-fungsi" element={<RelasiFungsiMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/spldv" element={<SPLDVMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/persamaan-garis-lurus" element={<PersamaanGarisLurusMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/persamaan-garis-lurus/gradien" element={<GradienPGLGameK8Page />} />
          <Route path="/math-game-arena/kelas-8/persamaan-garis-lurus/grafik-pgl" element={<GrafikPGLGameK8Page />} />
          <Route path="/math-game-arena/kelas-8/persamaan-garis-lurus/hubungan-2-garis" element={<Hubungan2GarisGameK8Page />} />
          <Route path="/math-game-arena/kelas-8/persamaan-garis-lurus/menentukan-pgl" element={<MenentukanPGLGameK8Page />} />
          <Route path="/math-game-arena/kelas-8/persamaan-garis-lurus/aplikasi-kontekstual" element={<AplikasiKontekstualPGLGameK8Page />} />
          <Route path="/math-game-arena/kelas-8/teorema-pythagoras" element={<TeoremaPythagorasMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/lingkaran" element={<LingkaranMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/garis-singgung-lingkaran" element={<GarisSinggungLingkaranMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarMGAK8Page />} />
          <Route path="/math-game-arena/kelas-8/:parentSlug/:slug" element={<SubmaterialGameVariantsChooserK8 />} />
          <Route path="/math-game-arena/kelas-8/:parentSlug/:slug/:variant" element={<SubmaterialGameDispatcherK8 />} />

          {/* Math Game Arena - Kelas 9 Topic Routes */}
          <Route path="/math-game-arena/kelas-9/bilangan-berpangkat" element={<BilanganBerpangkatMGAK9Page />} />
          <Route path="/math-game-arena/kelas-9/kesebangunan-kekongruenan" element={<KesebangunanKekongruenMGAK9Page />} />
          <Route path="/math-game-arena/kelas-9/transformasi-geometri" element={<TransformasiGeometriMGAK9Page />} />
          <Route path="/math-game-arena/kelas-9/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungMGAK9Page />} />
          <Route path="/math-game-arena/kelas-9/statistika" element={<StatistikaMGAK9Page />} />
          <Route path="/math-game-arena/kelas-9/peluang" element={<PeluangMGAK9Page />} />
          <Route path="/math-game-arena/kelas-9/persamaan-kuadrat" element={<PersamaanKuadratMGAK9Page />} />
          <Route path="/math-game-arena/kelas-9/fungsi-kuadrat" element={<FungsiKuadratMGAK9Page />} />
          <Route path="/math-game-arena/kelas-9/:parentSlug/:slug" element={<SubmaterialGameVariantsChooserK9 />} />
          <Route path="/math-game-arena/kelas-9/:parentSlug/:slug/:variant" element={<SubmaterialGameDispatcherK9 />} />

          {/* Materi Matematika Routes */}
          <Route path="/materi-matematika" element={<Navigate to="/buku-animasi-matematika" replace />} />
          <Route path="/buku-animasi-matematika" element={<MateriMatematikaPage />} />
          <Route path="/materi-matematika/kelas-7" element={<Navigate to="/buku-animasi-matematika" replace />} />
          <Route path="/materi-matematika/kelas-8" element={<Navigate to="/buku-animasi-matematika" replace />} />
          <Route path="/materi-matematika/kelas-9" element={<Navigate to="/buku-animasi-matematika" replace />} />
          <Route path="/materi-matematika/kelas-7/bilangan-bulat" element={<BilanganBulatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-bulat/penjumlahan/buku-animasi" element={<BukuAnimasiPenjumlahanBilanganBulatPage />} />
          <Route path="/materi-matematika/kelas-7/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-bulat/pembagian" element={<PembagianBilanganBulatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-bulat/kpk-fpb" element={<KPKFPBBilanganBulatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional" element={<BilanganRasionalMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/arti-pecahan" element={<ArtiPecahanMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/pecahan-campuran" element={<PecahanCampuranMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/penjumlahan-pengurangan" element={<PenjumlahanPenguranganMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/perkalian" element={<PerkalianPecahanMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/pembagian" element={<PembagianPecahanMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/bentuk-desimal" element={<BentukDesimalMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/penjumlahan-pengurangan-desimal" element={<PenjumlahanPenguranganBentukDesimalMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/perkalian-desimal" element={<PerkalianBentukDesimalMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/pembagian-desimal" element={<PembagianBentukDesimalMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/bilangan-rasional/pembulatan-desimal" element={<PembulatanBentukDesimalMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar" element={<AljabarMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar/pengertian-unsur" element={<PengertianUnsurMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar/penjumlahan-pengurangan" element={<PenjumlahanPenguranganAljabarMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar/perkalian" element={<PerkalianAljabarMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar/pembagian" element={<PembagianAljabarMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar/pemangkatan" element={<PemangkatanAljabarMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar/substitusi" element={<SubstitusiAljabarMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar/faktorisasi" element={<FaktorisasiAljabarMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aljabar/operasi-pecahan" element={<OperasiPecahanAljabarMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/plsv-ptlsv" element={<PLSVPtLSVMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/plsv-ptlsv/kalimat-terbuka-tertutup" element={<KalimatTerbukaTertutupPage />} />
          <Route path="/materi-matematika/kelas-7/plsv-ptlsv/pengertian-plsv" element={<PengertianPLSVPage />} />
          <Route path="/materi-matematika/kelas-7/plsv-ptlsv/penyelesaian-plsv" element={<PenyelesaianPLSVPage />} />
          <Route path="/materi-matematika/kelas-7/plsv-ptlsv/model-matematika-plsv" element={<ModelMatematikaPLSVPage />} />
          <Route path="/materi-matematika/kelas-7/plsv-ptlsv/pengertian-ptlsv" element={<PengertianPtLSVPage />} />
          <Route path="/materi-matematika/kelas-7/plsv-ptlsv/penyelesaian-ptlsv" element={<PenyelesaianPtLSVPage />} />
          <Route path="/materi-matematika/kelas-7/plsv-ptlsv/model-matematika-ptlsv" element={<ModelMatematikaPtLSVPage />} />
          <Route path="/materi-matematika/kelas-7/perbandingan" element={<PerbandinganMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/perbandingan/umum" element={<PerbandinganUmumMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/perbandingan/senilai" element={<PerbandinganSenilaiMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/perbandingan/campuran" element={<PerbandinganCampuranMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/perbandingan/bertingkat" element={<PerbandinganBertingkatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/perbandingan/skala" element={<SkalaMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aritmetika-sosial" element={<AritmetikaSosialMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aritmetika-sosial/diskon" element={<DiskonMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aritmetika-sosial/bunga-tunggal" element={<BungaTunggalMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/aritmetika-sosial/ppn" element={<PPNMMk7Page />} />
          <Route path="/materi-matematika/kelas-7/aritmetika-sosial/pph" element={<PPhMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/garis-dan-sudut" element={<GarisDanSudutMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/garis-dan-sudut/hubungan-dua-garis" element={<HubunganDuaGarisMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/garis-dan-sudut/sudut-pelurus-penyiku-bertolak" element={<SudutPelurusPenyikuBertolakMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/garis-dan-sudut/sifat-sudut-sejajar" element={<SifatSudutDuaGarisSejajarPage />} />
          <Route path="/materi-matematika/kelas-7/garis-dan-sudut/jumlah-sudut-segi-banyak" element={<JumlahSudutSegiBanyakPage />} />
          <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat" element={<SegitigaSegiempatMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/garis-berat-bagi-tinggi" element={<GarisBeratBagiTinggiPage />} />
          <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/keliling" element={<KelilingSegitigaSegiempatPage />} />
          <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/luas-segitiga" element={<LuasSegitigaPage />} />
          <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/luas-segiempat" element={<LuasSegiempatPage />} />
          <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/bangun-tak-beraturan" element={<KelilingLuasBangunTakBeraturanPage />} />
          <Route path="/materi-matematika/kelas-7/himpunan" element={<HimpunanMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/himpunan/pengertian-keanggotaan" element={<PengertianKeanggotaanHimpunanPage />} />
          <Route path="/materi-matematika/kelas-7/himpunan/jenis-himpunan" element={<JenisHimpunanPage />} />
          <Route path="/materi-matematika/kelas-7/himpunan/operasi-himpunan" element={<OperasiHimpunanMMK7Page />} />
          <Route path="/materi-matematika/kelas-7/himpunan/diagram-venn" element={<DiagramVennPage />} />
          <Route path="/materi-matematika/kelas-7/himpunan/pemecahan-masalah" element={<PemecahanMasalahHimpunanPage />} />
          <Route path="/materi-matematika/kelas-8/pola-bilangan" element={<PolaBilanganMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/pola-bilangan/pengertian-pola" element={<PengertianPolaMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/pola-bilangan/pola-khusus" element={<PolaKhususMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/pola-bilangan/pola-aritmetika" element={<PolaAritmetikaMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/pola-bilangan/pola-geometri" element={<PolaGeometriMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/koordinat-cartesius" element={<KoordinatCartesiusMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/koordinat-cartesius/unsur-unsur" element={<UnsurUnsurCartesiusMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/koordinat-cartesius/posisi-relatif-titik-dan-garis" element={<PosisiRelatifTitikDanGarisMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/koordinat-cartesius/posisi-relatif-titik-acuan" element={<PosisiRelatifTitikAcuanMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/koordinat-cartesius/jarak-titik-garis" element={<JarakTitikGarisMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/koordinat-cartesius/posisi-relatif-garis" element={<PosisiRelatifGarisMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi" element={<RelasiFungsiMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/pengertian-relasi" element={<PengertianRelasiMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/pengertian-fungsi" element={<PengertianFungsiMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/banyak-fungsi" element={<BanyakFungsiMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/buku-animasi-banyak-fungsi" element={<BukuAnimasiBanyakFungsiPage />} />
          <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/notasi-fungsi" element={<NotasiFungsiMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/grafik-fungsi" element={<GrafikFungsiMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/spldv" element={<SPLDVMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/spldv/definisi" element={<DefinisiSPLDVMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/spldv/metode-grafik" element={<MetodeGrafikMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/spldv/metode-substitusi" element={<MetodeSubstitusiMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/spldv/metode-eliminasi" element={<MetodeEliminasiMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/spldv/metode-campuran" element={<MetodeCampuranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/spldv/model-spldv" element={<ModelSPLDVMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/spldv/penyelesaian-masalah" element={<PenyelesaianMasalahSPLDVMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/persamaan-garis-lurus" element={<PersamaanGarisLurusMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/persamaan-garis-lurus/grafik" element={<GrafikPGLMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/persamaan-garis-lurus/gradien" element={<GradienMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/persamaan-garis-lurus/menentukan-pgl" element={<MenentukanPGLMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/persamaan-garis-lurus/hubungan-2-garis" element={<Hubungan2GarisMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/persamaan-garis-lurus/aplikasi-kontekstual" element={<AplikasiKontekstualMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/teorema-pythagoras" element={<TeoremaPythagorasMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/teorema-pythagoras/pembuktian" element={<PembuktianPythagorasMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/teorema-pythagoras/menghitung-panjang" element={<MenghitungPanjangPythagorasMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/teorema-pythagoras/triple-pythagoras" element={<TriplePythagorasMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/teorema-pythagoras/jenis-segitiga" element={<JenisSegitigaPythagorasMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/teorema-pythagoras/sudut-khusus" element={<SudutKhususPythagorasMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/teorema-pythagoras/masalah-kontekstual" element={<MasalahKontekstualPythagorasMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/lingkaran" element={<LingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/lingkaran/unsur-unsur" element={<UnsurUnsurLingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/lingkaran/keliling-luas" element={<KelilingLuasLingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/lingkaran/kaitan-bangun-datar-lainnya" element={<KaitanBangunDatarLainnyaLingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/lingkaran/kaitan-bangun-datar" element={<KaitanBangunDatarLingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/lingkaran/busur-juring" element={<BusurJuringLingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/lingkaran/sudut-pusat-keliling" element={<SudutPusatKelilingLingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/lingkaran/penerapan-kontekstual" element={<PenerapanKontekstualLingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/garis-singgung-lingkaran" element={<GarisSinggungLingkaranMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/garis-singgung-lingkaran/pengertian" element={<PengertianGSLMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/garis-singgung-lingkaran/menghitung-panjang" element={<MenghitungPanjangGSLMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/garis-singgung-lingkaran/gspl" element={<GSPLMMk8Page />} />
          <Route path="/materi-matematika/kelas-8/garis-singgung-lingkaran/gspd" element={<GSPDMMk8Page />} />
          <Route path="/materi-matematika/kelas-8/garis-singgung-lingkaran/sabuk-lilitan" element={<SabukLilitanMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar/kubus" element={<KubusMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar/balok" element={<BalokMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar/prisma" element={<PrismaMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar/limas" element={<LimasMMK8Page />} />
          <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar/gabungan" element={<GabunganMMK8Page />} />
          <Route path="/materi-matematika/kelas-9/bilangan-berpangkat" element={<BilanganBerpangkatMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bilangan-berpangkat/pengertian-notasi" element={<PengertianNotasiPangkatMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bilangan-berpangkat/sifat-sifat-operasi" element={<SifatSifatOperasiMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bilangan-berpangkat/bentuk-akar" element={<BentukAkarMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bilangan-berpangkat/notasi-ilmiah" element={<NotasiIlmiahMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan" element={<KesebangunanKekongruenMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/definisi" element={<DefinisiKesebangunanMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/menghitung-rusuk" element={<MenghitungRusukMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/segitiga-sebangun" element={<SegitigaSebangunMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/perbandingan-rusuk-siku-siku" element={<PerbandinganRusukSikuSikuMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/kekongruenan" element={<KekongruenBangunDatarMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/transformasi-geometri" element={<TransformasiGeometriMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/transformasi-geometri/translasi" element={<TranslasiMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/transformasi-geometri/refleksi" element={<RefleksiMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/transformasi-geometri/rotasi" element={<RotasiMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/transformasi-geometri/dilatasi" element={<DilatasisMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/tabung" element={<TabungMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/kerucut" element={<KerucutMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/bola" element={<BolaMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/perubahan-volume" element={<PerubahanVolumeMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/gabungan" element={<GabunganMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/statistika" element={<StatistikaMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/statistika/pengantar" element={<PengantarStatistikaMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/statistika/penyajian-data" element={<PenyajianDataMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/statistika/rata-rata" element={<RataRataMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/statistika/median-modus" element={<MedianModusMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/statistika/kuartil" element={<KuartilMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/statistika/penyebaran-data" element={<PenyebaranDataMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/peluang" element={<PeluangMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/peluang/ruang-sampel" element={<RuangSampelMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/peluang/peluang-empirik" element={<PeluangEmpirikMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/peluang/peluang-teoretik" element={<PeluangTeoretikMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/peluang/frekuensi-harapan" element={<FrekuensiHarapanMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/peluang/komplemen" element={<KomplementMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/peluang/kejadian-majemuk" element={<PeluangKejadianMajemukMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/persamaan-kuadrat" element={<PersamaanKuadratMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/persamaan-kuadrat/bentuk-umum" element={<PKMMBentukUmumPage />} />
          <Route path="/materi-matematika/kelas-9/persamaan-kuadrat/pemfaktoran" element={<PKMMPemfaktoranPage />} />
          <Route path="/materi-matematika/kelas-9/persamaan-kuadrat/rumus-kuadratik" element={<PKMMRumusKuadratikPage />} />
          <Route path="/materi-matematika/kelas-9/persamaan-kuadrat/pelengkap-kuadrat" element={<PKMMPelengkapKuadratPage />} />
          <Route path="/materi-matematika/kelas-9/persamaan-kuadrat/diskriminan" element={<PKMMDiskriminanPage />} />
          <Route path="/materi-matematika/kelas-9/persamaan-kuadrat/menyusun-baru" element={<PKMMMenyusunBaruPage />} />
          <Route path="/materi-matematika/kelas-9/persamaan-kuadrat/penerapan-kontekstual" element={<PKMMPenerapanKontekstualPage />} />
          <Route path="/materi-matematika/kelas-9/fungsi-kuadrat" element={<FungsiKuadratMMK9Page />} />
          <Route path="/materi-matematika/kelas-9/fungsi-kuadrat/bentuk-umum-karakteristik" element={<FKMMBentukUmumKarakteristikPage />} />
          <Route path="/materi-matematika/kelas-9/fungsi-kuadrat/titik-potong" element={<FKMMTitikPotongPage />} />
          <Route path="/materi-matematika/kelas-9/fungsi-kuadrat/sumbu-simetri" element={<FKMMSumbuSimetriPage />} />
          <Route path="/materi-matematika/kelas-9/fungsi-kuadrat/menggambar-grafik" element={<FKMMMenggambarGrafikPage />} />
          <Route path="/materi-matematika/kelas-9/fungsi-kuadrat/menyusun-fungsi" element={<FKMMMenyusunFungsiPage />} />
          <Route path="/materi-matematika/kelas-9/fungsi-kuadrat/penerapan-nilai-maks-min" element={<FKMMPenerapanNilaiMaksMinPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </Suspense>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
      <SoundProvider>
        <MusicProvider>
          <FontProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {!Capacitor.isNativePlatform() && <Analytics />}
              <BrowserRouter>
                <AppInner />
              </BrowserRouter>
            </TooltipProvider>
          </FontProvider>
        </MusicProvider>
      </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
