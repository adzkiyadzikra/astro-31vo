import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { useNavigate } from "react-router-dom";

type IslandId = "rainbow" | "snow" | "candy" | "cloud" | "volcano";
type IslandTheme = {
  id: IslandId;
  name: string;
  emoji: string;
  description: string;
  palette: {
    grass: string;
    grassLight: string;
    path: string;
    roof: string;
    blue: string;
    leaf: string;
    leafLight: string;
    water: string;
  };
};

const ISLANDS: IslandTheme[] = [
  {
    id: "rainbow",
    name: "Pulau Pelangi",
    emoji: "🌈",
    description: "Desa ceria penuh warna",
    palette: { grass: "#70cf66", grassLight: "#9be36b", path: "#f6d58a", roof: "#ff806d", blue: "#5495ef", leaf: "#42b96b", leafLight: "#85dc65", water: "#42c7e8" },
  },
  {
    id: "snow",
    name: "Pulau Salju",
    emoji: "❄️",
    description: "Pegunungan es berkilau",
    palette: { grass: "#c5eaf2", grassLight: "#effbff", path: "#a9d8e9", roof: "#8c9ff5", blue: "#53c9e8", leaf: "#398f9c", leafLight: "#74c7c7", water: "#49b8dd" },
  },
  {
    id: "candy",
    name: "Pulau Permen",
    emoji: "🍭",
    description: "Hutan manis warna-warni",
    palette: { grass: "#f39acb", grassLight: "#ffc5dc", path: "#ffe5a0", roof: "#ae78ed", blue: "#61b8f5", leaf: "#ed6fa7", leafLight: "#ffb25f", water: "#64d7e8" },
  },
  {
    id: "cloud",
    name: "Pulau Awan",
    emoji: "☁️",
    description: "Taman langit yang lembut",
    palette: { grass: "#8ecaf4", grassLight: "#c7e9ff", path: "#fff1bd", roof: "#f28caf", blue: "#6d95ef", leaf: "#5ba9a4", leafLight: "#a1d9ca", water: "#76c9f3" },
  },
  {
    id: "volcano",
    name: "Pulau Vulkanik",
    emoji: "🌋",
    description: "Petualangan hangat di kawah",
    palette: { grass: "#727076", grassLight: "#9a8988", path: "#ffad68", roof: "#e85e58", blue: "#6cbbe0", leaf: "#477c5d", leafLight: "#8fad62", water: "#3d9bb4" },
  },
];

type WorldQuestion = {
  prompt: string;
  answer: number;
  options: number[];
};

type Treasure = {
  group: THREE.Group;
  home: THREE.Vector3;
  phase: number;
  collected: boolean;
};

const TREASURE_COUNT = 5;

// Skala tunggal untuk mengatur ukuran figur tanpa menggeser telapak dari pangkal rig.
const AVATAR_SCALE = 1;

const RUN_CONFIG = {
  cycleLength: 4.2,
  maxCyclesPerSecond: 2.6,
  legSwing: 0.8,
  elbowBend: 1.57,
  bodyLean: 0.24,
  footLift: 0.34,
  bodyBounce: 0.06,
  blendSeconds: 0.2,
  torsoTwist: 0.08,
  maxDeltaTime: 0.04,
} as const;

const ROBLOX_SLIM_CONFIG = {
  parts: {
    head: [0.56, 0.52, 0.46],
    upperTorso: [0.54, 0.44, 0.28],
    lowerTorso: [0.44, 0.3, 0.27],
    hand: [0.105, 0.095, 0.075],
    thigh: [0.17, 0.31, 0.16],
    calf: [0.145, 0.3, 0.135],
    foot: [0.16, 0.08, 0.26],
  },
  armReference: {
    upper: [0.24, 0.3, 0.24],
    forearm: [0.164, 0.24, 0.164],
  },
  elbowForward: 70 * Math.PI / 180,
  elbowBackward: 15 * Math.PI / 180,
  kneeBackward: 90 * Math.PI / 180,
  forearmLagCycles: 0.2,
  handLagCycles: 0.27,
  armThicknessScale: 0.58,
  bevelRatio: 0.12,
  bodyLean: 6 * Math.PI / 180,
  transitionSeconds: 0.2,
} as const;

type AvatarHairStyle = "swept" | "short" | "long" | "wavy";

type AvatarColors = {
  skin: string;
  hair: string;
  hoodie: string;
  vest: string;
  pants: string;
  shoes: string;
};

type OrganicAvatarPalette = {
  skin: string;
  hair: string;
  jacket: string;
  shirt: string;
  skirt: string;
  shorts: string;
  socks: string;
  shoes: string;
  accent: string;
  metal: string;
};

type AvatarPreset = {
  id: string;
  name: string;
  description: string;
  colors: AvatarColors;
  hairstyle: AvatarHairStyle;
  clothing: "hoodie-vest" | "shirt-suspenders" | "streetwear-crop" | "organic-pastel" | "roblox-slim";
  accessories: readonly string[];
  perutTerbuka?: boolean;
  organicPalette?: OrganicAvatarPalette;
};

const AVATAR_PRESETS: readonly AvatarPreset[] = [
  {
    id: "anak-cokelat",
    name: "Anak Cokelat",
    description: "Hoodie krem dengan rambut cokelat",
    colors: { skin: "#f2c9a5", hair: "#7a4a32", hoodie: "#e8c98a", vest: "#3b3f44", pants: "#292c30", shoes: "#c98b4e" },
    hairstyle: "swept",
    clothing: "hoodie-vest",
    accessories: ["kalung", "sarung-tangan-gelap"],
  },
  {
    id: "kacamata-hitam",
    name: "Kacamata Hitam",
    description: "Rambut bergelombang, kacamata, dan suspender",
    colors: { skin: "#F3D2BC", hair: "#14110F", hoodie: "#F5F5F5", vest: "#111111", pants: "#1A1A1A", shoes: "#111111" },
    hairstyle: "wavy",
    clothing: "shirt-suspenders",
    accessories: ["kacamata", "permen-karet", "aksesori-rambut"],
  },
  {
    id: "cewek-streetwear",
    name: "Si Streetwear",
    description: "Beanie hitam, lengan merah, dan celana cargo",
    colors: { skin: "#F3D2BC", hair: "#14110F", hoodie: "#151515", vest: "#1A1A1A", pants: "#1A1A1A", shoes: "#D63A2F" },
    hairstyle: "long",
    clothing: "streetwear-crop",
    accessories: ["beanie", "resleting", "sabuk", "saku-cargo"],
    perutTerbuka: true,
  },
  {
    id: "cewek-gaul",
    name: "Si Gaul",
    description: "Rambut panjang dan outfit pastel",
    colors: { skin: "#F3D2BC", hair: "#2B1B17", hoodie: "#C9B6F2", vest: "#F5F5F5", pants: "#F3F3F3", shoes: "#F5F5F5" },
    hairstyle: "long",
    clothing: "organic-pastel",
    accessories: ["jepit-pink", "tas-selempang", "kalung-bintang", "gelang"],
    organicPalette: {
      skin: "#F3D2BC",
      hair: "#2B1B17",
      jacket: "#C9B6F2",
      shirt: "#F5F5F5",
      skirt: "#F3F3F3",
      shorts: "#171717",
      socks: "#F5F5F5",
      shoes: "#F5F5F5",
      accent: "#F4A3C0",
      metal: "#D6D1DA",
    },
  },
  {
    id: "roblox-slim",
    name: "Si Roblox",
    description: "Avatar ramping bergaya Roblox R15",
    colors: { skin: "#F3D2BC", hair: "#171313", hoodie: "#3188D8", vest: "#3188D8", pants: "#315C91", shoes: "#F5F5F5" },
    hairstyle: "short",
    clothing: "roblox-slim",
    accessories: [],
  },
];

const DEFAULT_AVATAR_PRESET = AVATAR_PRESETS[0]!;
type AvatarPresetId = AvatarPreset["id"];

const AVATAR_STORAGE_KEY = "numatik-world-avatar";

const readSavedAvatar = (): AvatarPresetId => {
  try {
    const savedId = window.localStorage.getItem(AVATAR_STORAGE_KEY);
    return AVATAR_PRESETS.some((preset) => preset.id === savedId)
      ? (savedId as AvatarPresetId)
      : "anak-cokelat";
  } catch {
    return "anak-cokelat";
  }
};

type DustParticle = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  age: number;
  lifetime: number;
  baseScale: number;
};

const makeQuestion = (): WorldQuestion => {
  const first = 3 + Math.floor(Math.random() * 18);
  const second = 2 + Math.floor(Math.random() * 12);
  const useAddition = Math.random() > 0.45;
  const answer = useAddition ? first + second : Math.max(first, second) - Math.min(first, second);
  const prompt = useAddition
    ? `${first} + ${second} = ?`
    : `${Math.max(first, second)} − ${Math.min(first, second)} = ?`;
  const choices = new Set([answer]);
  while (choices.size < 4) {
    choices.add(Math.max(0, answer + Math.floor(Math.random() * 13) - 6));
  }
  const options = [...choices].sort(() => Math.random() - 0.5);
  return { prompt, answer, options };
};

const NumatikWorldPage = () => {
  const navigate = useNavigate();
  const hostRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef(new Set<string>());
  const pendingTreasureRef = useRef<Treasure | null>(null);
  const gameCompleteRef = useRef(false);
  const jumpRequestedRef = useRef(false);
  const [selectedIsland, setSelectedIsland] = useState<IslandId>("rainbow");
  const [selectedAvatarId, setSelectedAvatarId] = useState<AvatarPresetId>(readSavedAvatar);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [treasuresFound, setTreasuresFound] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [question, setQuestion] = useState<WorldQuestion | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  const selectAvatar = (presetId: AvatarPresetId) => {
    setSelectedAvatarId(presetId);
    try {
      window.localStorage.setItem(AVATAR_STORAGE_KEY, presetId);
    } catch {
      // Pilihan tetap berlaku untuk sesi ini meski penyimpanan browser tidak tersedia.
    }
    setAvatarPickerOpen(false);
  };

  useEffect(() => {
    if (!gameStarted) return;
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch (error) {
      console.error("NUMATIK WORLD tidak dapat membuat WebGLRenderer:", error);
      host.textContent = "Perangkat ini belum mendukung dunia 3D.";
      return;
    }

    const scene = new THREE.Scene();
    const island = ISLANDS.find(({ id }) => id === selectedIsland) ?? ISLANDS[0]!;
    scene.background = new THREE.Color("#91ddff");
    scene.fog = new THREE.Fog("#91ddff", 100, 235);
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 300);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.className = "world-canvas";
    renderer.domElement.setAttribute("aria-label", "Jelajahi dunia 3D NUMATIK WORLD");
    host.appendChild(renderer.domElement);

    const resources = new Set<THREE.BufferGeometry | THREE.Material>();
    const makeMaterial = (color: THREE.ColorRepresentation, roughness = 0.8) => {
      const value = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });
      resources.add(value);
      return value;
    };
    const mats = {
      grass: makeMaterial(island.palette.grass),
      grassLight: makeMaterial(island.palette.grassLight),
      water: makeMaterial(island.palette.water, 0.36),
      path: makeMaterial(island.palette.path),
      wood: makeMaterial("#bd7951"),
      roof: makeMaterial(island.palette.roof),
      blue: makeMaterial(island.palette.blue),
      yellow: makeMaterial("#ffd858"),
      white: makeMaterial("#fff6dc"),
      skin: makeMaterial(DEFAULT_AVATAR_PRESET.colors.skin, 0.6),
      hair: makeMaterial(DEFAULT_AVATAR_PRESET.colors.hair, 0.6),
      hoodie: makeMaterial(DEFAULT_AVATAR_PRESET.colors.hoodie, 0.6),
      vest: makeMaterial(DEFAULT_AVATAR_PRESET.colors.vest, 0.6),
      pants: makeMaterial(DEFAULT_AVATAR_PRESET.colors.pants, 0.6),
      shoes: makeMaterial(DEFAULT_AVATAR_PRESET.colors.shoes, 0.6),
      shoeSole: makeMaterial("#292722", 0.65),
      glove: makeMaterial("#242629", 0.6),
      pendant: makeMaterial("#d8b15e", 0.6),
      eye: makeMaterial("#293e61"),
      pink: makeMaterial("#ff92c4", 0.2),
      chestWood: makeMaterial("#9f5834"),
      trunk: makeMaterial("#a86f4d"),
      leaf: makeMaterial(island.palette.leaf),
      leafLight: makeMaterial(island.palette.leafLight),
    };
    const addMesh = <T extends THREE.BufferGeometry>(
      geometry: T,
      mat: THREE.Material,
      parent: THREE.Object3D,
      position: THREE.Vector3 | [number, number, number],
      scale?: [number, number, number],
    ) => {
      resources.add(geometry);
      const mesh = new THREE.Mesh(geometry, mat);
      if (position instanceof THREE.Vector3) mesh.position.copy(position);
      else mesh.position.set(...position);
      if (scale) mesh.scale.set(...scale);
      parent.add(mesh);
      return mesh;
    };
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const addBox = (
      parent: THREE.Object3D,
      mat: THREE.Material,
      position: [number, number, number],
      scale: [number, number, number],
    ) => addMesh(boxGeometry, mat, parent, position, scale);

    scene.add(new THREE.HemisphereLight("#e8fbff", "#83bd63", 2.7));
    const sunlight = new THREE.DirectionalLight("#fff1bf", 3);
    sunlight.position.set(-24, 38, 17);
    scene.add(sunlight);
    scene.add(new THREE.AmbientLight("#ffffff", 0.35));

    addMesh(new THREE.PlaneGeometry(280, 280), mats.water, scene, [0, -1.45, 0]).rotation.x = -Math.PI / 2;
    addMesh(new THREE.CylinderGeometry(70, 74, 3.2, 72), mats.path, scene, [0, -0.5, 0]);
    addMesh(new THREE.CylinderGeometry(67, 68, 0.95, 72), mats.grass, scene, [0, 1.05, 0]);
    addMesh(new THREE.CylinderGeometry(63, 63, 0.14, 72), mats.grassLight, scene, [0, 1.58, 0]);

    const mainPath = addMesh(new THREE.BoxGeometry(8, 0.1, 88), mats.path, scene, [0, 1.68, 9]);
    mainPath.rotation.y = -0.08;
    const crossPath = addMesh(new THREE.BoxGeometry(84, 0.1, 7), mats.path, scene, [0, 1.68, -8]);
    crossPath.rotation.y = -0.08;

    const makeTree = (x: number, z: number, size: number, variant: number) => {
      const tree = new THREE.Group();
      tree.position.set(x, 1.65, z);
      scene.add(tree);
      addBox(tree, mats.trunk, [0, size * 0.72, 0], [size * 0.32, size * 1.45, size * 0.32]);
      addBox(tree, variant % 2 ? mats.leafLight : mats.leaf, [0, size * 1.82, 0], [size * 1.38, size * 0.95, size * 1.38]);
      addBox(tree, variant % 2 ? mats.leaf : mats.leafLight, [0, size * 2.42, 0], [size * 0.9, size * 0.82, size * 0.9]);
      addBox(tree, mats.grassLight, [0, size * 2.92, 0], [size * 0.45, size * 0.45, size * 0.45]);
    };
    [
      [-45, -40, 3.2], [-30, -52, 2.6], [-51, -14, 2.8], [-48, 24, 3],
      [45, -43, 2.8], [52, -8, 3.2], [47, 32, 2.7], [32, 48, 3],
      [-28, 49, 2.6], [-54, 37, 2.8], [18, -52, 2.6], [56, 20, 2.6],
    ].forEach(([x, z, size], index) => makeTree(x!, z!, size!, index));

    const makeHouse = (x: number, z: number, wall: THREE.Material, roof: THREE.Material) => {
      const house = new THREE.Group();
      house.position.set(x, 1.68, z);
      scene.add(house);
      addBox(house, wall, [0, 2, 0], [7, 4, 6]);
      addBox(house, roof, [0, 4.5, 0], [7.8, 1, 6.8]);
      addBox(house, mats.wood, [0, 0.9, 3.08], [1.35, 2.2, 0.14]);
      addBox(house, mats.blue, [-2.15, 2.35, 3.1], [1.1, 1.05, 0.13]);
      addBox(house, mats.blue, [2.15, 2.35, 3.1], [1.1, 1.05, 0.13]);
      addBox(house, mats.white, [0, 3.3, 3.12], [0.2, 1.2, 0.12]);
      addBox(house, mats.white, [0, 3.3, 3.12], [1.2, 0.2, 0.12]);
    };
    makeHouse(-29, -29, mats.yellow, mats.roof);
    makeHouse(31, -34, mats.white, mats.blue);
    makeHouse(30, 24, mats.roof, mats.yellow);

    const arch = new THREE.Group();
    arch.position.set(0, 1.7, 53);
    scene.add(arch);
    addBox(arch, mats.roof, [-5.1, 3.2, 0], [1.15, 6.4, 0.85]);
    addBox(arch, mats.blue, [5.1, 3.2, 0], [1.15, 6.4, 0.85]);
    addBox(arch, mats.yellow, [0, 6.2, 0], [11.4, 1.3, 0.9]);
    addBox(arch, mats.white, [0, 6.18, 0.5], [8.8, 0.38, 0.08]);

    if (island.id === "rainbow") {
      [mats.roof, mats.yellow, mats.blue].forEach((mat, index) => {
        const rainbow = addMesh(new THREE.TorusGeometry(9 - index * 1.25, 0.7, 10, 48, Math.PI), mat, scene, [0, 7 + index * 0.1, -35]);
        rainbow.rotation.z = Math.PI;
      });
    } else if (island.id === "snow") {
      [-1, 1].forEach((side) => {
        addMesh(new THREE.ConeGeometry(5, 13, 7), mats.blue, scene, [side * 29, 8, -39]);
        addMesh(new THREE.ConeGeometry(3.2, 9, 7), mats.white, scene, [side * 29, 15, -39]);
      });
      addMesh(new THREE.SphereGeometry(3.2, 16, 12), mats.white, scene, [0, 4.7, -34]);
      addMesh(new THREE.SphereGeometry(2.2, 16, 12), mats.white, scene, [0, 8.8, -34]);
      addMesh(new THREE.SphereGeometry(0.35, 10, 8), mats.eye, scene, [-0.75, 9, -32]);
      addMesh(new THREE.SphereGeometry(0.35, 10, 8), mats.eye, scene, [0.75, 9, -32]);
    } else if (island.id === "candy") {
      [-1, 1].forEach((side, index) => {
        const lollipop = new THREE.Group();
        lollipop.position.set(side * 32, 1.68, -37 + index * 13);
        scene.add(lollipop);
        addBox(lollipop, mats.wood, [0, 6, 0], [0.7, 12, 0.7]);
        addMesh(new THREE.SphereGeometry(4.5, 20, 16), index ? mats.blue : mats.pink, lollipop, [0, 13, 0]);
        addMesh(new THREE.TorusGeometry(2.8, 0.35, 8, 32), mats.white, lollipop, [0, 13, 3.4]);
      });
    } else if (island.id === "cloud") {
      [-1, 1].forEach((side) => {
        const cloud = new THREE.Group();
        cloud.position.set(side * 34, 1.68, -40);
        scene.add(cloud);
        [[0, 5, 0, 5], [-4, 3.5, 0, 3.6], [4, 3.5, 0, 3.8], [0, 2.5, 2, 3.7]].forEach(([x, y, z, radius]) => {
          addMesh(new THREE.SphereGeometry(radius!, 14, 10), mats.white, cloud, [x!, y!, z!]);
        });
      });
    } else {
      addMesh(new THREE.ConeGeometry(17, 25, 9), mats.wood, scene, [0, 14, -38]);
      addMesh(new THREE.ConeGeometry(7, 10, 9), mats.roof, scene, [0, 27, -38]);
      addMesh(new THREE.TorusGeometry(12, 1.2, 10, 36), mats.roof, scene, [0, 2.4, -38]).rotation.x = Math.PI / 2;
    }

    const avatar = new THREE.Group();
    scene.add(avatar);
    const avatarRig = new THREE.Group();
    // Pangkal rig berada di telapak sehingga perubahan skala tidak mengubah titik tanah.
    avatarRig.scale.setScalar(AVATAR_SCALE);
    avatar.add(avatarRig);
    const textures = new Set<THREE.Texture>();
    const makeRoundedGeometry = (width: number, height: number, depth: number, radius: number) => (
      new RoundedBoxGeometry(width, height, depth, 5, radius)
    );
    const torsoGeometry = makeRoundedGeometry(0.76, 0.68, 0.54, 0.16);
    const hoodieGeometry = makeRoundedGeometry(0.8, 0.72, 0.58, 0.17);
    const vestGeometry = makeRoundedGeometry(0.52, 0.6, 0.08, 0.025);
    const vestBackGeometry = makeRoundedGeometry(0.5, 0.58, 0.07, 0.02);
    const sleeveGeometry = makeRoundedGeometry(0.3, 0.34, 0.32, 0.075);
    const forearmSleeveGeometry = makeRoundedGeometry(0.29, 0.35, 0.31, 0.075);
    const armGeometry = makeRoundedGeometry(0.27, 0.33, 0.29, 0.075);
    const forearmGeometry = makeRoundedGeometry(0.26, 0.34, 0.28, 0.07);
    const cuffGeometry = makeRoundedGeometry(0.28, 0.11, 0.3, 0.035);
    const handGeometry = makeRoundedGeometry(0.27, 0.24, 0.3, 0.08);
    const gloveGeometry = makeRoundedGeometry(0.29, 0.17, 0.32, 0.055);
    const legGeometry = makeRoundedGeometry(0.35, 0.48, 0.38, 0.09);
    const kneePadGeometry = makeRoundedGeometry(0.27, 0.19, 0.08, 0.02);
    const bootGeometry = makeRoundedGeometry(0.42, 0.34, 0.58, 0.11);
    const soleGeometry = makeRoundedGeometry(0.44, 0.09, 0.6, 0.027);
    const neckGeometry = makeRoundedGeometry(0.24, 0.18, 0.25, 0.055);
    const headGeometry = makeRoundedGeometry(0.58, 0.56, 0.52, 0.15);
    const earGeometry = makeRoundedGeometry(0.1, 0.18, 0.12, 0.03);
    const hairCapGeometry = makeRoundedGeometry(0.62, 0.2, 0.56, 0.06);
    const hairFringeGeometry = makeRoundedGeometry(0.43, 0.16, 0.18, 0.055);
    const hairLockGeometry = makeRoundedGeometry(0.15, 0.24, 0.17, 0.05);
    const hairSpikeGeometry = makeRoundedGeometry(0.14, 0.22, 0.14, 0.045);
    const hoodGeometry = makeRoundedGeometry(0.48, 0.38, 0.18, 0.05);
    const pocketGeometry = makeRoundedGeometry(0.36, 0.17, 0.045, 0.015);
    const pendantGeometry = makeRoundedGeometry(0.09, 0.12, 0.045, 0.015);
    const faceGeometry = new THREE.PlaneGeometry(0.28, 0.2);
    [
      torsoGeometry,
      hoodieGeometry,
      vestGeometry,
      vestBackGeometry,
      sleeveGeometry,
      forearmSleeveGeometry,
      armGeometry,
      forearmGeometry,
      cuffGeometry,
      handGeometry,
      gloveGeometry,
      legGeometry,
      kneePadGeometry,
      bootGeometry,
      soleGeometry,
      neckGeometry,
      headGeometry,
      earGeometry,
      hairCapGeometry,
      hairFringeGeometry,
      hairLockGeometry,
      hairSpikeGeometry,
      hoodGeometry,
      pocketGeometry,
      pendantGeometry,
      faceGeometry,
    ].forEach((geometry) => resources.add(geometry));

    const faceCanvas = document.createElement("canvas");
    faceCanvas.width = 128;
    faceCanvas.height = 128;
    const faceContext = faceCanvas.getContext("2d");
    if (!faceContext) throw new Error("Canvas 2D tidak tersedia untuk membuat wajah avatar.");
    faceContext.fillStyle = "#161616";
    faceContext.beginPath();
    faceContext.arc(43, 54, 4, 0, Math.PI * 2);
    faceContext.arc(85, 54, 4, 0, Math.PI * 2);
    faceContext.fill();
    faceContext.strokeStyle = "#161616";
    faceContext.lineWidth = 2.5;
    faceContext.lineCap = "round";
    faceContext.beginPath();
    faceContext.moveTo(57, 82);
    faceContext.quadraticCurveTo(64, 88, 71, 82);
    faceContext.stroke();
    const faceTexture = new THREE.CanvasTexture(faceCanvas);
    faceTexture.colorSpace = THREE.SRGBColorSpace;
    textures.add(faceTexture);
    const faceMaterial = new THREE.MeshStandardMaterial({
      map: faceTexture,
      transparent: true,
      roughness: 0.6,
      metalness: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    resources.add(faceMaterial);

    const bodyRig = new THREE.Group();
    bodyRig.position.y = 1;
    avatarRig.add(bodyRig);
    const legacyLayers: THREE.Group[] = [];
    const legacyBody = new THREE.Group();
    bodyRig.add(legacyBody);
    legacyLayers.push(legacyBody);
    addMesh(torsoGeometry, mats.skin, legacyBody, [0, 0, 0]);
    addMesh(hoodieGeometry, mats.hoodie, legacyBody, [0, 0, 0]);
    addMesh(vestGeometry, mats.vest, legacyBody, [0, -0.015, 0.31]);
    addMesh(vestBackGeometry, mats.vest, legacyBody, [0, 0, -0.3]);
    addMesh(pocketGeometry, mats.hoodie, legacyBody, [0, -0.19, 0.355]);
    const hoodPivot = new THREE.Group();
    hoodPivot.position.set(0, 0.43, -0.3);
    legacyBody.add(hoodPivot);
    addMesh(hoodGeometry, mats.hoodie, hoodPivot, [0, 0, 0]);
    addMesh(neckGeometry, mats.skin, legacyBody, [0, 0.47, 0]);
    const necklace = addMesh(cuffGeometry, mats.pendant, legacyBody, [0, 0.29, 0.06], [0.72, 0.14, 0.72]);
    necklace.rotation.x = -0.16;
    const pendantPivot = new THREE.Group();
    pendantPivot.position.set(0, 0.17, 0.16);
    legacyBody.add(pendantPivot);
    addMesh(pendantGeometry, mats.pendant, pendantPivot, [0, 0, 0]);

    const head = new THREE.Group();
    head.position.set(0, 0.72, 0);
    bodyRig.add(head);
    const legacyHead = new THREE.Group();
    head.add(legacyHead);
    legacyLayers.push(legacyHead);
    addMesh(headGeometry, mats.skin, legacyHead, [0, 0, 0]);
    addMesh(faceGeometry, faceMaterial, legacyHead, [0, 0, 0.264]);
    [-1, 1].forEach((side) => {
      addMesh(earGeometry, mats.skin, legacyHead, [side * 0.32, 0, 0]);
    });

    const hairMotion = new THREE.Group();
    const makeHairStyle = (style: AvatarHairStyle) => {
      const group = new THREE.Group();
      group.visible = style === "swept";
      hairMotion.add(group);
      addMesh(hairCapGeometry, mats.hair, group, [0, 0.22, -0.015]);
      if (style === "swept") {
        const fringe = addMesh(hairFringeGeometry, mats.hair, group, [0.035, 0.205, 0.205]);
        fringe.rotation.z = -0.16;
        [-1, 1].forEach((side) => {
          const lock = addMesh(hairLockGeometry, mats.hair, group, [side * 0.23, -0.015, 0.17]);
          lock.rotation.z = side * -0.12;
        });
        [
          [-0.22, 0.29, -0.08, -0.35],
          [-0.08, 0.32, -0.02, -0.12],
          [0.08, 0.31, -0.02, 0.18],
          [0.22, 0.27, -0.08, 0.38],
        ].forEach(([x, y, z, angle]) => {
          const spike = addMesh(hairSpikeGeometry, mats.hair, group, [x!, y!, z!]);
          spike.rotation.z = angle!;
        });
      } else if (style === "short") {
        [-1, 1].forEach((side) => {
          addMesh(hairLockGeometry, mats.hair, group, [side * 0.23, -0.015, 0.17]);
        });
        [-0.16, 0, 0.16].forEach((x, index) => {
          const spike = addMesh(hairSpikeGeometry, mats.hair, group, [x, 0.3, -0.04]);
          spike.rotation.z = (index - 1) * 0.2;
        });
      } else {
        const fringe = addMesh(hairFringeGeometry, mats.hair, group, [-0.025, 0.2, 0.205]);
        fringe.rotation.z = 0.14;
        [-1, 1].forEach((side) => {
          const lock = addMesh(hairLockGeometry, mats.hair, group, [side * 0.24, -0.12, -0.02]);
          lock.scale.y = 2;
        });
        [-0.12, 0.08].forEach((x) => {
          const spike = addMesh(hairSpikeGeometry, mats.hair, group, [x, 0.3, -0.03]);
          spike.rotation.z = x * -1.5;
        });
      }
    };
    (["swept", "short", "long"] as const).forEach(makeHairStyle);
    legacyHead.add(hairMotion);

    type LimbRig = { pivot: THREE.Group; elbow: THREE.Group; hand: THREE.Group };
    const makeArm = (side: number): LimbRig => {
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 0.47, 0.28, 0);
      bodyRig.add(shoulder);
      const legacyUpper = new THREE.Group();
      shoulder.add(legacyUpper);
      legacyLayers.push(legacyUpper);
      addMesh(armGeometry, mats.skin, legacyUpper, [0, -0.16, 0]);
      addMesh(sleeveGeometry, mats.hoodie, legacyUpper, [0, -0.08, 0], [1.06, 1, 1.06]);
      const elbow = new THREE.Group();
      elbow.position.y = -0.25;
      shoulder.add(elbow);
      const legacyForearm = new THREE.Group();
      elbow.add(legacyForearm);
      legacyLayers.push(legacyForearm);
      addMesh(forearmGeometry, mats.skin, legacyForearm, [0, -0.15, 0]);
      addMesh(forearmSleeveGeometry, mats.hoodie, legacyForearm, [0, -0.14, 0], [1.04, 1, 1.04]);
      addMesh(cuffGeometry, mats.hoodie, legacyForearm, [0, -0.2, 0]);
      const hand = new THREE.Group();
      hand.position.y = -0.22;
      elbow.add(hand);
      const legacyHand = new THREE.Group();
      hand.add(legacyHand);
      legacyLayers.push(legacyHand);
      addMesh(handGeometry, mats.skin, legacyHand, [0, -0.045, 0]);
      addMesh(gloveGeometry, mats.glove, legacyHand, [0, -0.13, 0.015]);
      addMesh(cuffGeometry, mats.glove, legacyHand, [0, 0.055, 0]);
      return { pivot: shoulder, elbow, hand };
    };
    const makeLeg = (side: number): { pivot: THREE.Group; baseY: number } => {
      const hip = new THREE.Group();
      hip.position.set(side * 0.2, 0.64, 0);
      avatarRig.add(hip);
      const legacyLeg = new THREE.Group();
      hip.add(legacyLeg);
      legacyLayers.push(legacyLeg);
      addMesh(legGeometry, mats.pants, legacyLeg, [0, -0.22, 0]);
      addMesh(kneePadGeometry, mats.glove, legacyLeg, [0, -0.28, 0.2]);
      const boot = new THREE.Group();
      boot.position.set(0, -0.445, 0.08);
      legacyLeg.add(boot);
      addMesh(bootGeometry, mats.shoes, boot, [0, 0.02, 0.03]);
      addMesh(soleGeometry, mats.shoeSole, boot, [0, -0.15, 0.02]);
      return { pivot: hip, baseY: hip.position.y };
    };
    const leftArm = makeArm(-1);
    const rightArm = makeArm(1);
    const leftLeg = makeLeg(-1);
    const rightLeg = makeLeg(1);
    const newAvatarLayers: THREE.Group[] = [];
    const blackPreset = AVATAR_PRESETS.find((preset) => preset.id === "kacamata-hitam")!;
    const streetwearPreset = AVATAR_PRESETS.find((preset) => preset.id === "cewek-streetwear")!;
    const gaulPreset = AVATAR_PRESETS.find((preset) => preset.id === "cewek-gaul")!;
    let blackAvatarBuilt = false;
    let streetwearBuilt = false;
    let gaulBuilt = false;
    let blackHairMotion: THREE.Group | null = null;
    let streetwearHairMotion: THREE.Group | null = null;
    let gumMesh: THREE.Mesh | null = null;
    let gaulTorsoMotion: THREE.Group | null = null;
    let gaulHeadLayer: THREE.Group | null = null;
    let gaulHairMotion: THREE.Group | null = null;
    let gaulSkirtMotion: THREE.Group | null = null;
    let gaulBagMotion: THREE.Group | null = null;
    let gaulLeftKnee: THREE.Group | null = null;
    let gaulRightKnee: THREE.Group | null = null;
    let gaulLeftKneeAngle = 0.08;
    let gaulRightKneeAngle = 0.08;
    const gaulShoulders: Array<{ layer: THREE.Group; side: number }> = [];
    const gaulForearms: THREE.Group[] = [];
    const gaulHairSegments: Array<{ pivot: THREE.Group; delay: number; phase: number }> = [];
    const gaulEyeLids: THREE.Mesh[] = [];
    let gaulNextBlinkAt = 0;
    let gaulBlinkStartedAt = -1;
    type RobloxSlimArm = { upper: THREE.Group; elbow: THREE.Group; wrist: THREE.Group; limb: LimbRig; side: number };
    type RobloxSlimLeg = { upper: THREE.Group; knee: THREE.Group; ankle: THREE.Group; limb: typeof leftLeg; side: number };
    const robloxSlimLayers: THREE.Group[] = [];
    const robloxSlimArms: RobloxSlimArm[] = [];
    const robloxSlimLegs: RobloxSlimLeg[] = [];
    let robloxSlimBuilt = false;
    let robloxSlimTorso: THREE.Group | null = null;
    let robloxSlimUpperTorso: THREE.Group | null = null;
    let robloxSlimHead: THREE.Group | null = null;

    const buildBlackAvatar = () => {
      if (blackAvatarBuilt) return;
      const blackMats = {
        skin: makeMaterial(blackPreset.colors.skin, 0.6),
        hair: makeMaterial(blackPreset.colors.hair, 0.6),
        shirt: makeMaterial(blackPreset.colors.hoodie, 0.72),
        black: makeMaterial(blackPreset.colors.vest, 0.58),
        pants: makeMaterial(blackPreset.colors.pants, 0.72),
        shoes: makeMaterial(blackPreset.colors.shoes, 0.65),
        sole: makeMaterial("#292722", 0.65),
        glove: makeMaterial("#F5F5F5", 0.68),
        gum: makeMaterial("#F4A3C0", 0.28),
      };

      const torsoLayer = new THREE.Group();
      bodyRig.add(torsoLayer);
      newAvatarLayers.push(torsoLayer);
      addMesh(torsoGeometry, blackMats.skin, torsoLayer, [0, 0, 0]);
      addMesh(hoodieGeometry, blackMats.shirt, torsoLayer, [0, 0, 0]);
      addMesh(neckGeometry, blackMats.skin, torsoLayer, [0, 0.47, 0]);
      const collarLeft = addMesh(hairFringeGeometry, blackMats.shirt, torsoLayer, [-0.105, 0.29, 0.27], [0.55, 0.8, 0.72]);
      const collarRight = addMesh(hairFringeGeometry, blackMats.shirt, torsoLayer, [0.105, 0.29, 0.27], [0.55, 0.8, 0.72]);
      collarLeft.rotation.z = -0.5;
      collarRight.rotation.z = 0.5;
      addMesh(cuffGeometry, blackMats.black, torsoLayer, [0, 0.17, 0.32], [0.38, 0.7, 0.4]);
      addMesh(pendantGeometry, blackMats.black, torsoLayer, [0, -0.01, 0.34], [0.75, 3.5, 0.8]);
      [-1, 1].forEach((side) => {
        addMesh(cuffGeometry, blackMats.black, torsoLayer, [side * 0.2, 0.02, 0.31], [0.44, 3.5, 0.2]);
        addMesh(cuffGeometry, blackMats.black, torsoLayer, [side * 0.2, 0.02, -0.31], [0.44, 3.5, 0.2]);
      });

      const headLayer = new THREE.Group();
      head.add(headLayer);
      newAvatarLayers.push(headLayer);
      addMesh(headGeometry, blackMats.skin, headLayer, [0, 0, 0]);

      const faceCanvas = document.createElement("canvas");
      faceCanvas.width = 128;
      faceCanvas.height = 128;
      const faceContext = faceCanvas.getContext("2d");
      if (!faceContext) throw new Error("Canvas 2D tidak tersedia untuk wajah avatar.");
      faceContext.fillStyle = "#C2182B";
      faceContext.beginPath();
      faceContext.moveTo(32, 50);
      faceContext.lineTo(53, 56);
      faceContext.lineTo(43, 62);
      faceContext.closePath();
      faceContext.fill();
      faceContext.beginPath();
      faceContext.moveTo(75, 56);
      faceContext.lineTo(96, 50);
      faceContext.lineTo(85, 62);
      faceContext.closePath();
      faceContext.fill();
      faceContext.fillStyle = "#171313";
      faceContext.beginPath();
      faceContext.arc(44, 56, 2.5, 0, Math.PI * 2);
      faceContext.arc(84, 56, 2.5, 0, Math.PI * 2);
      faceContext.fill();
      faceContext.strokeStyle = "#171313";
      faceContext.lineWidth = 2;
      faceContext.beginPath();
      faceContext.moveTo(34, 39);
      faceContext.quadraticCurveTo(43, 35, 52, 39);
      faceContext.moveTo(76, 39);
      faceContext.quadraticCurveTo(85, 35, 94, 39);
      faceContext.stroke();
      faceContext.lineWidth = 5;
      faceContext.lineCap = "round";
      faceContext.beginPath();
      faceContext.moveTo(31, 47);
      faceContext.lineTo(53, 49);
      faceContext.moveTo(75, 49);
      faceContext.lineTo(97, 47);
      faceContext.stroke();
      faceContext.strokeStyle = "#36221E";
      faceContext.lineWidth = 2;
      faceContext.beginPath();
      faceContext.moveTo(59, 83);
      faceContext.quadraticCurveTo(64, 86, 69, 83);
      faceContext.stroke();
      const blackFaceTexture = new THREE.CanvasTexture(faceCanvas);
      blackFaceTexture.colorSpace = THREE.SRGBColorSpace;
      textures.add(blackFaceTexture);
      const blackFaceMaterial = new THREE.MeshStandardMaterial({
        map: blackFaceTexture,
        transparent: true,
        roughness: 0.6,
        metalness: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      resources.add(blackFaceMaterial);
      addMesh(faceGeometry, blackFaceMaterial, headLayer, [0, 0, 0.264]);
      [-1, 1].forEach((side) => {
        addMesh(earGeometry, blackMats.skin, headLayer, [side * 0.32, 0, 0]);
      });

      const blackHair = new THREE.Group();
      blackHairMotion = blackHair;
      headLayer.add(blackHair);
      addMesh(hairCapGeometry, blackMats.hair, blackHair, [0, 0.22, -0.015]);
      [-1, 0, 1].forEach((side) => {
        const fringe = addMesh(hairFringeGeometry, blackMats.hair, blackHair, [side * 0.11, 0.17, 0.22], [0.82, 1.15, 1]);
        fringe.rotation.z = side * -0.17;
      });
      [-1, 1].forEach((side) => {
        const lock = addMesh(hairLockGeometry, blackMats.hair, blackHair, [side * 0.25, 0.015, 0.14], [1.1, 1.35, 1]);
        lock.rotation.z = side * -0.14;
      });
      [-0.24, -0.08, 0.08, 0.24].forEach((x, index) => {
        const wave = addMesh(hairSpikeGeometry, blackMats.hair, blackHair, [x, 0.29 + (index % 2) * 0.025, -0.035], [1.35, 1.2, 1.25]);
        wave.rotation.z = (index - 1.5) * 0.17;
      });
      const hairAccessory = addMesh(hairSpikeGeometry, blackMats.black, blackHair, [-0.22, 0.14, 0.235], [0.62, 0.38, 0.5]);
      hairAccessory.rotation.z = -0.4;

      const glassesGeometry = makeRoundedGeometry(0.25, 0.045, 0.035, 0.018);
      const glassesLayer = new THREE.Group();
      headLayer.add(glassesLayer);
      newAvatarLayers.push(glassesLayer);
      [-1, 1].forEach((side) => {
        const centerX = side * 0.09;
        addMesh(glassesGeometry, blackMats.black, glassesLayer, [centerX, 0.075, 0.3]);
        addMesh(glassesGeometry, blackMats.black, glassesLayer, [centerX, -0.025, 0.3]);
        const outerBar = addMesh(glassesGeometry, blackMats.black, glassesLayer, [centerX + side * 0.1, 0.025, 0.3], [0.2, 1, 1]);
        const innerBar = addMesh(glassesGeometry, blackMats.black, glassesLayer, [centerX - side * 0.1, 0.025, 0.3], [0.2, 1, 1]);
        outerBar.rotation.z = Math.PI / 2;
        innerBar.rotation.z = Math.PI / 2;
      });
      addMesh(glassesGeometry, blackMats.black, glassesLayer, [0, 0.025, 0.3], [0.42, 0.8, 1]);
      const gumGeometry = new THREE.SphereGeometry(0.055, 12, 10);
      gumMesh = addMesh(gumGeometry, blackMats.gum, headLayer, [0, -0.075, 0.315]);

      const buildSleevedArm = (limb: LimbRig) => {
        const upper = new THREE.Group();
        limb.pivot.add(upper);
        newAvatarLayers.push(upper);
        addMesh(armGeometry, blackMats.skin, upper, [0, -0.16, 0]);
        addMesh(sleeveGeometry, blackMats.shirt, upper, [0, -0.08, 0], [1.1, 1.08, 1.1]);
        const forearm = new THREE.Group();
        limb.elbow.add(forearm);
        newAvatarLayers.push(forearm);
        addMesh(forearmGeometry, blackMats.skin, forearm, [0, -0.15, 0]);
        addMesh(forearmSleeveGeometry, blackMats.shirt, forearm, [0, -0.14, 0], [1.08, 1.08, 1.08]);
        const hand = new THREE.Group();
        limb.hand.add(hand);
        newAvatarLayers.push(hand);
        addMesh(handGeometry, blackMats.skin, hand, [0, -0.045, 0]);
        addMesh(gloveGeometry, blackMats.glove, hand, [0, -0.13, 0.015], [1.02, 1, 1.02]);
      };
      buildSleevedArm(leftArm);
      buildSleevedArm(rightArm);

      const buildBlackLeg = (leg: typeof leftLeg) => {
        const pantsLayer = new THREE.Group();
        leg.pivot.add(pantsLayer);
        newAvatarLayers.push(pantsLayer);
        addMesh(legGeometry, blackMats.pants, pantsLayer, [0, -0.22, 0], [1.24, 1.08, 1.12]);
        const boot = new THREE.Group();
        boot.position.set(0, -0.445, 0.08);
        pantsLayer.add(boot);
        addMesh(bootGeometry, blackMats.shoes, boot, [0, 0.02, 0.03]);
        addMesh(soleGeometry, blackMats.sole, boot, [0, -0.15, 0.02]);
      };
      buildBlackLeg(leftLeg);
      buildBlackLeg(rightLeg);
      blackAvatarBuilt = true;
    };

    const streetwearLayers: THREE.Group[] = [];
    const buildStreetwearAvatar = () => {
      if (streetwearBuilt) return;
      const streetMats = {
        skin: makeMaterial(streetwearPreset.colors.skin, 0.62),
        hair: makeMaterial(streetwearPreset.colors.hair, 0.7),
        beanie: makeMaterial("#1A1A1A", 0.88),
        top: makeMaterial(streetwearPreset.colors.hoodie, 0.74),
        black: makeMaterial(streetwearPreset.colors.vest, 0.72),
        red: makeMaterial("#D63A2F", 0.7),
        silver: makeMaterial("#C7C7C7", 0.38),
        pants: makeMaterial(streetwearPreset.colors.pants, 0.82),
        shoes: makeMaterial(streetwearPreset.colors.shoes, 0.55),
        sole: makeMaterial("#F2F2F2", 0.76),
        glove: makeMaterial("#111111", 0.76),
      };

      const torsoLayer = new THREE.Group();
      bodyRig.add(torsoLayer);
      streetwearLayers.push(torsoLayer);
      addMesh(torsoGeometry, streetMats.skin, torsoLayer, [0, 0, 0]);
      addMesh(hoodieGeometry, streetMats.top, torsoLayer, [0, 0.13, 0], [1, 0.56, 1]);
      addMesh(neckGeometry, streetMats.skin, torsoLayer, [0, 0.47, 0]);
      addMesh(cuffGeometry, streetMats.top, torsoLayer, [0, 0.31, 0.11], [1.55, 1, 1.15]);
      addMesh(cuffGeometry, streetMats.silver, torsoLayer, [0, 0.12, 0.324], [0.1, 2.2, 0.12]);
      addMesh(pendantGeometry, streetMats.silver, torsoLayer, [0, 0.25, 0.343], [0.35, 0.4, 0.35]);
      addMesh(cuffGeometry, streetMats.black, torsoLayer, [0, -0.27, 0.31], [2.4, 0.9, 0.22]);
      addMesh(pendantGeometry, streetMats.silver, torsoLayer, [0, -0.27, 0.348], [0.9, 0.8, 0.3]);
      if (!streetwearPreset.perutTerbuka) {
        addMesh(pocketGeometry, streetMats.black, torsoLayer, [0, -0.13, 0.302], [1.7, 0.72, 0.3]);
      }

      const headLayer = new THREE.Group();
      head.add(headLayer);
      streetwearLayers.push(headLayer);
      addMesh(headGeometry, streetMats.skin, headLayer, [0, 0, 0]);
      const streetFaceCanvas = document.createElement("canvas");
      streetFaceCanvas.width = 128;
      streetFaceCanvas.height = 128;
      const streetFaceContext = streetFaceCanvas.getContext("2d");
      if (!streetFaceContext) throw new Error("Canvas 2D tidak tersedia untuk wajah avatar.");
      streetFaceContext.fillStyle = "#111111";
      streetFaceContext.beginPath();
      streetFaceContext.arc(43, 55, 3.2, 0, Math.PI * 2);
      streetFaceContext.arc(85, 55, 3.2, 0, Math.PI * 2);
      streetFaceContext.fill();
      streetFaceContext.fillStyle = "#FFFFFF";
      streetFaceContext.beginPath();
      streetFaceContext.arc(44, 54, 1, 0, Math.PI * 2);
      streetFaceContext.arc(86, 54, 1, 0, Math.PI * 2);
      streetFaceContext.fill();
      streetFaceContext.strokeStyle = "#171313";
      streetFaceContext.lineWidth = 1.5;
      streetFaceContext.lineCap = "round";
      streetFaceContext.beginPath();
      streetFaceContext.moveTo(36, 48);
      streetFaceContext.lineTo(42, 44);
      streetFaceContext.moveTo(48, 47);
      streetFaceContext.lineTo(53, 49);
      streetFaceContext.moveTo(75, 49);
      streetFaceContext.lineTo(80, 47);
      streetFaceContext.moveTo(86, 44);
      streetFaceContext.lineTo(92, 48);
      streetFaceContext.moveTo(60, 83);
      streetFaceContext.lineTo(68, 83);
      streetFaceContext.stroke();
      const streetFaceTexture = new THREE.CanvasTexture(streetFaceCanvas);
      streetFaceTexture.colorSpace = THREE.SRGBColorSpace;
      textures.add(streetFaceTexture);
      const streetFaceMaterial = new THREE.MeshStandardMaterial({
        map: streetFaceTexture,
        transparent: true,
        roughness: 0.7,
        metalness: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      resources.add(streetFaceMaterial);
      addMesh(faceGeometry, streetFaceMaterial, headLayer, [0, 0, 0.264]);
      [-1, 1].forEach((side) => {
        addMesh(earGeometry, streetMats.skin, headLayer, [side * 0.32, 0, 0]);
      });

      streetwearHairMotion = new THREE.Group();
      headLayer.add(streetwearHairMotion);
      [-0.18, -0.06, 0.06, 0.18].forEach((x) => {
        addMesh(hairLockGeometry, streetMats.hair, streetwearHairMotion!, [x, -0.35, -0.37], [1.05, 3.8, 0.65]);
      });
      [-1, 1].forEach((side) => {
        const frontLock = addMesh(hairLockGeometry, streetMats.hair, streetwearHairMotion!, [side * 0.19, -0.2, 0.35], [0.8, 2.6, 0.65]);
        frontLock.rotation.z = side * -0.045;
      });
      [-1, 1].forEach((side) => {
        const bang = addMesh(hairFringeGeometry, streetMats.hair, streetwearHairMotion!, [side * 0.12, 0.04, 0.22], [0.72, 0.65, 0.78]);
        bang.rotation.z = side * -0.2;
      });
      addMesh(hairCapGeometry, streetMats.beanie, headLayer, [0, 0.22, -0.015]);
      const beanieBrimGeometry = new THREE.TorusGeometry(0.255, 0.026, 6, 20);
      const beanieBrim = addMesh(beanieBrimGeometry, streetMats.beanie, headLayer, [0, 0.13, 0]);
      beanieBrim.rotation.x = Math.PI / 2;

      const addStreetSleeve = (limb: LimbRig) => {
        const upper = new THREE.Group();
        limb.pivot.add(upper);
        streetwearLayers.push(upper);
        addMesh(armGeometry, streetMats.skin, upper, [0, -0.16, 0]);
        addMesh(sleeveGeometry, streetMats.red, upper, [0, -0.08, 0], [1.22, 1.18, 1.2]);
        addMesh(cuffGeometry, streetMats.black, upper, [0, -0.08, 0.18], [0.52, 1.25, 0.22]);
        addMesh(cuffGeometry, streetMats.black, upper, [0, -0.19, 0], [1.25, 0.36, 1.15]);
        const forearm = new THREE.Group();
        limb.elbow.add(forearm);
        streetwearLayers.push(forearm);
        addMesh(forearmGeometry, streetMats.skin, forearm, [0, -0.15, 0]);
        addMesh(forearmSleeveGeometry, streetMats.red, forearm, [0, -0.14, 0], [1.24, 1.18, 1.2]);
        addMesh(cuffGeometry, streetMats.black, forearm, [0, -0.14, 0.18], [0.5, 1.22, 0.22]);
        addMesh(cuffGeometry, streetMats.black, forearm, [0, -0.24, 0], [1.2, 0.36, 1.12]);
        const hand = new THREE.Group();
        limb.hand.add(hand);
        streetwearLayers.push(hand);
        addMesh(handGeometry, streetMats.skin, hand, [0, -0.045, 0]);
        addMesh(gloveGeometry, streetMats.glove, hand, [0, -0.13, 0.015]);
        addMesh(cuffGeometry, streetMats.black, hand, [0, 0.055, 0], [1, 0.7, 1]);
      };
      addStreetSleeve(leftArm);
      addStreetSleeve(rightArm);

      const addCargoLeg = (leg: typeof leftLeg) => {
        const cargoLayer = new THREE.Group();
        leg.pivot.add(cargoLayer);
        streetwearLayers.push(cargoLayer);
        addMesh(legGeometry, streetMats.pants, cargoLayer, [0, -0.22, 0], [1.08, 1.08, 1.06]);
        const outside = Math.sign(leg.pivot.position.x);
        addMesh(cuffGeometry, streetMats.red, cargoLayer, [outside * 0.155, -0.22, 0], [0.22, 3.5, 0.15]);
        addMesh(pocketGeometry, streetMats.pants, cargoLayer, [outside * 0.065, -0.2, 0.205], [0.52, 1, 0.65]);
        const sneaker = new THREE.Group();
        sneaker.position.set(0, -0.445, 0.08);
        cargoLayer.add(sneaker);
        addMesh(bootGeometry, streetMats.shoes, sneaker, [0, 0.02, 0.03]);
        addMesh(soleGeometry, streetMats.sole, sneaker, [0, -0.13, 0.02], [1.04, 1.45, 1.04]);
      };
      addCargoLeg(leftLeg);
      addCargoLeg(rightLeg);
      streetwearBuilt = true;
    };

    const organicLayers: THREE.Group[] = [];
    const buildOrganicAvatar = () => {
      if (gaulBuilt) return;
      const palette = gaulPreset.organicPalette!;
      const organicMats = {
        skin: makeMaterial(palette.skin, 0.56),
        hair: makeMaterial(palette.hair, 0.62),
        jacket: makeMaterial(palette.jacket, 0.68),
        shirt: makeMaterial(palette.shirt, 0.78),
        skirt: makeMaterial(palette.skirt, 0.8),
        shorts: makeMaterial(palette.shorts, 0.72),
        socks: makeMaterial(palette.socks, 0.8),
        shoes: makeMaterial(palette.shoes, 0.58),
        accent: makeMaterial(palette.accent, 0.56),
        metal: makeMaterial(palette.metal, 0.34),
        eyelid: makeMaterial(palette.skin, 0.56),
      };
      const makeLathe = (profile: Array<[number, number]>, segments: number) => new THREE.LatheGeometry(
        profile.map(([radius, height]) => new THREE.Vector2(radius, height)),
        segments,
      );
      const smoothSphere = new THREE.SphereGeometry(1, 16, 12);
      const torsoGeometry = makeLathe([
        [0.1, -0.36], [0.17, -0.31], [0.19, -0.22], [0.145, -0.08],
        [0.15, 0.06], [0.205, 0.19], [0.22, 0.27], [0.15, 0.35],
      ], 24);
      const shirtGeometry = makeLathe([
        [0.105, -0.34], [0.175, -0.29], [0.195, -0.2], [0.153, -0.07],
        [0.16, 0.07], [0.215, 0.2], [0.23, 0.27], [0.16, 0.34],
      ], 20);
      const jacketGeometry = makeLathe([
        [0.16, 0.015], [0.17, 0.07], [0.22, 0.2], [0.235, 0.27], [0.17, 0.34],
      ], 20);
      const upperArmGeometry = makeLathe([[0.075, -0.25], [0.095, -0.19], [0.09, -0.1], [0.11, -0.035], [0.085, 0]], 12);
      const forearmGeometry = makeLathe([[0.045, -0.22], [0.055, -0.17], [0.073, -0.09], [0.075, -0.035], [0.07, 0]], 12);
      const upperSleeveGeometry = makeLathe([[0.083, -0.25], [0.105, -0.19], [0.1, -0.1], [0.12, -0.035], [0.092, 0]], 12);
      const forearmSleeveGeometry = makeLathe([[0.052, -0.22], [0.063, -0.17], [0.082, -0.09], [0.084, -0.035], [0.079, 0]], 12);
      const thighGeometry = makeLathe([[0.055, -0.25], [0.075, -0.2], [0.09, -0.1], [0.1, -0.035], [0.095, 0]], 12);
      const calfGeometry = makeLathe([[0.045, -0.22], [0.052, -0.17], [0.073, -0.08], [0.078, -0.025], [0.07, 0]], 12);
      const sockGeometry = makeLathe([[0.053, -0.21], [0.06, -0.17], [0.081, -0.08], [0.086, -0.02], [0.083, 0]], 12);
      const hairSegmentGeometry = makeLathe([[0.008, -0.12], [0.028, -0.09], [0.035, -0.035], [0.032, 0.035], [0.016, 0.1]], 10);
      const faceGeometry = new THREE.PlaneGeometry(0.32, 0.32);
      const eyeLidGeometry = new THREE.PlaneGeometry(0.09, 0.055);
      const collarGeometry = new THREE.TorusGeometry(0.11, 0.014, 6, 20);
      const necklaceGeometry = new THREE.TorusGeometry(0.075, 0.004, 5, 20);
      const sockStripeGeometry = new THREE.TorusGeometry(0.081, 0.009, 5, 16);
      const shoeGeometry = new THREE.SphereGeometry(1, 14, 10);
      const shoeSoleGeometry = new RoundedBoxGeometry(0.22, 0.045, 0.32, 3, 0.016);
      const bagGeometry = new THREE.SphereGeometry(1, 12, 10);

      const torsoLayer = new THREE.Group();
      bodyRig.add(torsoLayer);
      organicLayers.push(torsoLayer);
      gaulTorsoMotion = torsoLayer;
      addMesh(torsoGeometry, organicMats.skin, torsoLayer, [0, 0, 0]);
      addMesh(shirtGeometry, organicMats.shirt, torsoLayer, [0, 0, 0]);
      addMesh(jacketGeometry, organicMats.jacket, torsoLayer, [0, 0, 0]);
      const shirtPanelGeometry = new THREE.PlaneGeometry(0.12, 0.28);
      addMesh(shirtPanelGeometry, organicMats.shirt, torsoLayer, [0, 0.17, 0.235]);
      const zipperGeometry = new THREE.CylinderGeometry(0.004, 0.004, 0.26, 6);
      addMesh(zipperGeometry, organicMats.metal, torsoLayer, [-0.074, 0.16, 0.237]);
      addMesh(zipperGeometry, organicMats.metal, torsoLayer, [0.074, 0.16, 0.237]);
      addMesh(smoothSphere, organicMats.metal, torsoLayer, [0.074, 0.27, 0.245], [0.012, 0.018, 0.008]);
      const jacketCollar = addMesh(collarGeometry, organicMats.shirt, torsoLayer, [0, 0.34, 0]);
      jacketCollar.rotation.x = Math.PI / 2;

      const shortsGeometry = new THREE.CylinderGeometry(0.16, 0.19, 0.12, 16, 1, false);
      addMesh(shortsGeometry, organicMats.shorts, torsoLayer, [0, -0.27, 0]);
      const skirtMotion = new THREE.Group();
      skirtMotion.position.y = -0.255;
      torsoLayer.add(skirtMotion);
      gaulSkirtMotion = skirtMotion;
      const skirtGeometry = new THREE.CylinderGeometry(0.18, 0.29, 0.2, 24, 1, false);
      const skirtMaterial = makeMaterial(palette.skirt, 0.8);
      skirtMaterial.flatShading = true;
      skirtMaterial.needsUpdate = true;
      addMesh(skirtGeometry, skirtMaterial, skirtMotion, [0, 0, 0]);

      const necklace = addMesh(necklaceGeometry, organicMats.metal, torsoLayer, [0, 0.39, 0.08]);
      necklace.rotation.x = Math.PI / 2;
      const starShape = new THREE.Shape();
      for (let point = 0; point < 10; point += 1) {
        const angle = -Math.PI / 2 + point * Math.PI / 5;
        const radius = point % 2 === 0 ? 0.025 : 0.012;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (point === 0) starShape.moveTo(x, y);
        else starShape.lineTo(x, y);
      }
      starShape.closePath();
      addMesh(new THREE.ShapeGeometry(starShape), organicMats.accent, torsoLayer, [0, 0.31, 0.16]);

      const bagMotion = new THREE.Group();
      torsoLayer.add(bagMotion);
      gaulBagMotion = bagMotion;
      const bagPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.12, 0.33, 0.19),
        new THREE.Vector3(0.02, 0.21, 0.23),
        new THREE.Vector3(0.2, 0.02, 0.22),
        new THREE.Vector3(0.29, -0.16, 0.17),
      ]);
      const bagStrapGeometry = new THREE.TubeGeometry(bagPath, 16, 0.009, 5, false);
      addMesh(bagStrapGeometry, organicMats.accent, bagMotion, [0, 0, 0]);
      addMesh(bagGeometry, organicMats.accent, bagMotion, [0.29, -0.17, 0.18], [0.075, 0.095, 0.045]);

      const headLayer = new THREE.Group();
      head.add(headLayer);
      organicLayers.push(headLayer);
      gaulHeadLayer = headLayer;
      addMesh(smoothSphere, organicMats.skin, headLayer, [0, 0, 0], [0.22, 0.28, 0.18]);
      const chinGeometry = new THREE.ConeGeometry(0.15, 0.16, 16, 1);
      const chin = addMesh(chinGeometry, organicMats.skin, headLayer, [0, -0.19, 0.035]);
      chin.rotation.z = Math.PI;
      [-1, 1].forEach((side) => {
        addMesh(smoothSphere, organicMats.skin, headLayer, [side * 0.22, -0.005, 0], [0.045, 0.065, 0.045]);
      });
      addMesh(smoothSphere, organicMats.skin, headLayer, [0, -0.015, 0.194], [0.021, 0.032, 0.026]);

      const faceCanvas = document.createElement("canvas");
      faceCanvas.width = 512;
      faceCanvas.height = 512;
      const faceContext = faceCanvas.getContext("2d");
      if (!faceContext) throw new Error("Canvas 2D tidak tersedia untuk wajah avatar.");
      faceContext.clearRect(0, 0, 512, 512);
      [125, 387].forEach((x) => {
        const blush = faceContext.createRadialGradient(x, 310, 3, x, 310, 48);
        blush.addColorStop(0, "rgba(244,163,192,0.34)");
        blush.addColorStop(1, "rgba(244,163,192,0)");
        faceContext.fillStyle = blush;
        faceContext.beginPath();
        faceContext.arc(x, 310, 48, 0, Math.PI * 2);
        faceContext.fill();
      });
      [165, 347].forEach((x) => {
        faceContext.fillStyle = "#FFFDFC";
        faceContext.beginPath();
        faceContext.ellipse(x, 218, 42, 30, 0, 0, Math.PI * 2);
        faceContext.fill();
        const iris = faceContext.createRadialGradient(x - 5, 211, 2, x, 220, 24);
        iris.addColorStop(0, "#8B6049");
        iris.addColorStop(0.68, "#4E3025");
        iris.addColorStop(1, "#2B1B17");
        faceContext.fillStyle = iris;
        faceContext.beginPath();
        faceContext.arc(x, 220, 22, 0, Math.PI * 2);
        faceContext.fill();
        faceContext.fillStyle = "#171313";
        faceContext.beginPath();
        faceContext.arc(x, 221, 12, 0, Math.PI * 2);
        faceContext.fill();
        faceContext.fillStyle = "#FFFFFF";
        faceContext.beginPath();
        faceContext.arc(x - 7, 211, 6, 0, Math.PI * 2);
        faceContext.arc(x + 7, 228, 2.7, 0, Math.PI * 2);
        faceContext.fill();
        faceContext.strokeStyle = "#2B1B17";
        faceContext.lineWidth = 12;
        faceContext.lineCap = "round";
        faceContext.beginPath();
        faceContext.ellipse(x, 218, 43, 31, 0, Math.PI + 0.12, Math.PI * 2 - 0.12);
        faceContext.stroke();
        faceContext.lineWidth = 4;
        for (let lash = -1; lash <= 1; lash += 1) {
          faceContext.beginPath();
          faceContext.moveTo(x + lash * 24, 191);
          faceContext.lineTo(x + lash * 27, 181);
          faceContext.stroke();
        }
      });
      faceContext.strokeStyle = "#51372C";
      faceContext.lineWidth = 5;
      faceContext.lineCap = "round";
      faceContext.beginPath();
      faceContext.quadraticCurveTo(145, 169, 190, 179);
      faceContext.moveTo(322, 179);
      faceContext.quadraticCurveTo(367, 169, 390, 181);
      faceContext.stroke();
      const noseShade = faceContext.createLinearGradient(249, 235, 267, 300);
      noseShade.addColorStop(0, "rgba(114,72,56,0)");
      noseShade.addColorStop(1, "rgba(114,72,56,0.18)");
      faceContext.fillStyle = noseShade;
      faceContext.beginPath();
      faceContext.ellipse(256, 275, 16, 38, 0, 0, Math.PI * 2);
      faceContext.fill();
      faceContext.fillStyle = "#D97991";
      faceContext.beginPath();
      faceContext.ellipse(256, 359, 26, 10, 0, 0, Math.PI * 2);
      faceContext.fill();
      faceContext.strokeStyle = "#A84F69";
      faceContext.lineWidth = 3;
      faceContext.beginPath();
      faceContext.moveTo(228, 356);
      faceContext.quadraticCurveTo(256, 370, 284, 356);
      faceContext.stroke();
      faceContext.fillStyle = "rgba(255,255,255,0.85)";
      faceContext.beginPath();
      faceContext.ellipse(249, 352, 8, 2.5, 0, 0, Math.PI * 2);
      faceContext.fill();
      const faceTexture = new THREE.CanvasTexture(faceCanvas);
      faceTexture.colorSpace = THREE.SRGBColorSpace;
      textures.add(faceTexture);
      const faceMaterial = new THREE.MeshStandardMaterial({
        map: faceTexture,
        transparent: true,
        roughness: 0.58,
        metalness: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      resources.add(faceMaterial);
      addMesh(faceGeometry, faceMaterial, headLayer, [0, 0, 0.17]);
      const eyelidMaterial = makeMaterial(palette.skin, 0.56);
      [-1, 1].forEach((side) => {
        const eyelid = addMesh(eyeLidGeometry, eyelidMaterial, headLayer, [side * 0.057, 0.024, 0.185]);
        eyelid.scale.y = 0.001;
        gaulEyeLids.push(eyelid);
      });

      const hairMotion = new THREE.Group();
      headLayer.add(hairMotion);
      gaulHairMotion = hairMotion;
      const addHairChain = (side: number, rootY: number, rootZ: number, segmentCount: number, delay: number) => {
        let parent = hairMotion;
        for (let segment = 0; segment < segmentCount; segment += 1) {
          const pivot = new THREE.Group();
          if (segment === 0) pivot.position.set(side * 0.13, rootY, rootZ);
          else pivot.position.set(side * 0.018, -0.22, 0);
          parent.add(pivot);
          addMesh(hairSegmentGeometry, organicMats.hair, pivot, [0, -0.1, 0]);
          gaulHairSegments.push({ pivot, delay: delay + segment * 0.28, phase: side * 0.35 });
          parent = pivot;
        }
      };
      addHairChain(-1, 0.12, -0.29, 4, 0.1);
      addHairChain(1, 0.12, -0.29, 4, 0.35);
      addHairChain(-1, 0.17, 0.205, 2, 0.18);
      addHairChain(1, 0.17, 0.205, 2, 0.42);
      const hairClipGeometry = new THREE.SphereGeometry(1, 10, 8);
      addMesh(hairClipGeometry, organicMats.accent, headLayer, [-0.18, 0.105, 0.19], [0.035, 0.015, 0.012]);

      const beanieGeometry = new THREE.SphereGeometry(1, 16, 10);
      addMesh(beanieGeometry, organicMats.hair, headLayer, [0, 0.19, -0.015], [0.235, 0.125, 0.19]);

      const shoulderJointGeometry = new THREE.SphereGeometry(1, 12, 8);
      const upperLegJointGeometry = new THREE.SphereGeometry(1, 12, 8);
      const kneeJointGeometry = new THREE.SphereGeometry(1, 12, 8);
      const addOrganicArm = (limb: LimbRig, side: number) => {
        const upper = new THREE.Group();
        limb.pivot.add(upper);
        organicLayers.push(upper);
        gaulShoulders.push({ layer: upper, side });
        addMesh(shoulderJointGeometry, organicMats.skin, upper, [-side * 0.12, 0.015, 0], [0.14, 0.11, 0.13]);
        addMesh(upperArmGeometry, organicMats.skin, upper, [0, 0, 0]);
        addMesh(upperSleeveGeometry, organicMats.jacket, upper, [0, 0, 0]);
        const forearm = new THREE.Group();
        limb.elbow.add(forearm);
        organicLayers.push(forearm);
        gaulForearms.push(forearm);
        addMesh(shoulderJointGeometry, organicMats.skin, forearm, [0, 0, 0], [0.078, 0.078, 0.078]);
        addMesh(forearmGeometry, organicMats.skin, forearm, [0, 0, 0]);
        addMesh(forearmSleeveGeometry, organicMats.jacket, forearm, [0, 0, 0]);
        const handLayer = new THREE.Group();
        limb.hand.add(handLayer);
        organicLayers.push(handLayer);
        const handShape = new THREE.Shape();
        handShape.moveTo(-0.04, -0.075);
        handShape.quadraticCurveTo(-0.065, -0.03, -0.055, 0.015);
        handShape.lineTo(-0.064, 0.07);
        handShape.quadraticCurveTo(-0.062, 0.095, -0.046, 0.075);
        handShape.lineTo(-0.035, 0.035);
        handShape.lineTo(-0.022, 0.098);
        handShape.quadraticCurveTo(-0.013, 0.119, 0, 0.096);
        handShape.lineTo(0.005, 0.04);
        handShape.lineTo(0.018, 0.105);
        handShape.quadraticCurveTo(0.03, 0.123, 0.039, 0.096);
        handShape.lineTo(0.037, 0.035);
        handShape.lineTo(0.05, 0.087);
        handShape.quadraticCurveTo(0.066, 0.102, 0.07, 0.072);
        handShape.lineTo(0.06, -0.04);
        handShape.quadraticCurveTo(0.055, -0.082, 0.025, -0.09);
        handShape.closePath();
        const handGeometry = new THREE.ExtrudeGeometry(handShape, {
          depth: 0.035,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.006,
          bevelThickness: 0.006,
        });
        addMesh(handGeometry, organicMats.skin, handLayer, [0, -0.03, 0.015]);
      };
      addOrganicArm(leftArm, -1);
      addOrganicArm(rightArm, 1);

      const gaulKnees: THREE.Group[] = [];
      const addOrganicLeg = (leg: typeof leftLeg) => {
        const thigh = new THREE.Group();
        leg.pivot.add(thigh);
        organicLayers.push(thigh);
        addMesh(upperLegJointGeometry, organicMats.skin, thigh, [0, -0.015, 0], [0.105, 0.105, 0.095]);
        addMesh(thighGeometry, organicMats.skin, thigh, [0, 0, 0]);
        const knee = new THREE.Group();
        knee.position.y = -0.25;
        thigh.add(knee);
        organicLayers.push(knee);
        gaulKnees.push(knee);
        addMesh(kneeJointGeometry, organicMats.skin, knee, [0, 0, 0], [0.075, 0.075, 0.07]);
        addMesh(calfGeometry, organicMats.skin, knee, [0, 0, 0]);
        addMesh(sockGeometry, organicMats.socks, knee, [0, 0, 0]);
        const stripeGeometry = new THREE.TorusGeometry(0.081, 0.008, 5, 12);
        const stripe = addMesh(stripeGeometry, organicMats.accent, knee, [0, -0.015, 0]);
        stripe.rotation.x = Math.PI / 2;
        addMesh(shoeGeometry, organicMats.shoes, knee, [0, -0.3, 0.065], [0.115, 0.065, 0.17]);
        addMesh(shoeSoleGeometry, organicMats.shirt, knee, [0, -0.3625, 0.065]);
      };
      addOrganicLeg(leftLeg);
      addOrganicLeg(rightLeg);
      gaulLeftKnee = gaulKnees[0] ?? null;
      gaulRightKnee = gaulKnees[1] ?? null;
      gaulNextBlinkAt = performance.now() + 3000 + Math.random() * 2000;
      gaulBuilt = true;
    };

    const buildRobloxSlimAvatar = () => {
      if (robloxSlimBuilt) return;
      const preset = AVATAR_PRESETS.find(({ id }) => id === "roblox-slim")!;
      const slimMats = {
        skin: makeMaterial(preset.colors.skin, 0.84),
        hair: makeMaterial(preset.colors.hair, 0.9),
        shirt: makeMaterial(preset.colors.hoodie, 0.86),
        denim: makeMaterial(preset.colors.pants, 0.88),
        shoes: makeMaterial(preset.colors.shoes, 0.72),
        sole: makeMaterial("#d8dce2", 0.9),
      };
      const rounded = (size: readonly [number, number, number], segments = 2) => (
        new RoundedBoxGeometry(...size, segments, Math.min(...size) * ROBLOX_SLIM_CONFIG.bevelRatio)
      );
      const slimUpperArmSize = ROBLOX_SLIM_CONFIG.armReference.upper.map((size, axis) => (
        axis === 1 ? size : size * ROBLOX_SLIM_CONFIG.armThicknessScale
      )) as unknown as readonly [number, number, number];
      const slimForearmSize = ROBLOX_SLIM_CONFIG.armReference.forearm.map((size, axis) => (
        axis === 1 ? size : size * ROBLOX_SLIM_CONFIG.armThicknessScale
      )) as unknown as readonly [number, number, number];
      const partGeometry = {
        head: rounded(ROBLOX_SLIM_CONFIG.parts.head),
        upperTorso: rounded(ROBLOX_SLIM_CONFIG.parts.upperTorso),
        lowerTorso: rounded(ROBLOX_SLIM_CONFIG.parts.lowerTorso),
        upperArm: rounded(slimUpperArmSize),
        forearm: rounded(slimForearmSize),
        hand: rounded(ROBLOX_SLIM_CONFIG.parts.hand),
        thigh: rounded(ROBLOX_SLIM_CONFIG.parts.thigh),
        calf: rounded(ROBLOX_SLIM_CONFIG.parts.calf),
        foot: rounded(ROBLOX_SLIM_CONFIG.parts.foot),
        neck: rounded([0.16, 0.2, 0.15], 1),
        hairCap: rounded([0.56, 0.16, 0.47], 1),
        hairFringe: rounded([0.38, 0.1, 0.13], 1),
        hairLock: rounded([0.12, 0.16, 0.13], 1),
        sole: rounded([0.16, 0.025, 0.26], 1),
      };
      const jointGeometry = new THREE.SphereGeometry(1, 6, 4);

      // Torso dan kepala tetap menumpang rig umum; seluruh detail visual berada di layer baru.
      const torso = new THREE.Group();
      bodyRig.add(torso);
      robloxSlimLayers.push(torso);
      robloxSlimTorso = torso;
      addMesh(partGeometry.lowerTorso, slimMats.denim, torso, [0, -0.2, 0]);
      const upperTorso = new THREE.Group();
      upperTorso.position.y = 0.1;
      torso.add(upperTorso);
      robloxSlimUpperTorso = upperTorso;
      addMesh(partGeometry.upperTorso, slimMats.shirt, upperTorso, [0, 0.1, 0]);

      const headLayer = new THREE.Group();
      head.add(headLayer);
      robloxSlimLayers.push(headLayer);
      robloxSlimHead = headLayer;
      addMesh(partGeometry.head, slimMats.skin, headLayer, [0, 0, 0]);
      addMesh(partGeometry.neck, slimMats.skin, headLayer, [0, -0.34, 0]);

      const faceCanvas = document.createElement("canvas");
      faceCanvas.width = 128;
      faceCanvas.height = 128;
      const faceContext = faceCanvas.getContext("2d");
      if (!faceContext) throw new Error("Canvas 2D tidak tersedia untuk wajah avatar.");
      faceContext.fillStyle = "#171313";
      faceContext.beginPath();
      faceContext.arc(43, 54, 4, 0, Math.PI * 2);
      faceContext.arc(85, 54, 4, 0, Math.PI * 2);
      faceContext.fill();
      faceContext.strokeStyle = "#171313";
      faceContext.lineWidth = 3;
      faceContext.lineCap = "round";
      faceContext.beginPath();
      faceContext.moveTo(55, 81);
      faceContext.quadraticCurveTo(64, 89, 73, 81);
      faceContext.stroke();
      const faceTexture = new THREE.CanvasTexture(faceCanvas);
      faceTexture.colorSpace = THREE.SRGBColorSpace;
      textures.add(faceTexture);
      const faceMaterial = new THREE.MeshStandardMaterial({
        map: faceTexture,
        transparent: true,
        roughness: 0.82,
        metalness: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      resources.add(faceMaterial);
      addMesh(new THREE.PlaneGeometry(0.32, 0.22), faceMaterial, headLayer, [0, 0, 0.232]);
      addMesh(partGeometry.hairCap, slimMats.hair, headLayer, [0, 0.19, -0.015]);
      [-1, 0, 1].forEach((side) => {
        const bang = addMesh(partGeometry.hairFringe, slimMats.hair, headLayer, [side * 0.11, 0.12, 0.2]);
        bang.rotation.z = side * -0.08;
      });
      [-1, 1].forEach((side) => {
        addMesh(partGeometry.hairLock, slimMats.hair, headLayer, [side * 0.205, 0.01, 0.12]);
      });

      const addArm = (limb: LimbRig, side: number) => {
        const upper = new THREE.Group();
        upper.position.x = -side * 0.26;
        upper.rotation.z = side * 0.12;
        limb.pivot.add(upper);
        robloxSlimLayers.push(upper);
        addMesh(partGeometry.upperArm, slimMats.shirt, upper, [0, -0.15, 0]);
        const elbow = new THREE.Group();
        elbow.position.y = -0.29;
        upper.add(elbow);
        addMesh(jointGeometry, slimMats.skin, elbow, [0, 0, 0], [0.057, 0.057, 0.057]);
        addMesh(partGeometry.forearm, slimMats.shirt, elbow, [0, -0.12, 0]);
        const wrist = new THREE.Group();
        wrist.position.y = -0.23;
        elbow.add(wrist);
        addMesh(jointGeometry, slimMats.skin, wrist, [0, 0, 0], [0.047, 0.047, 0.047]);
        addMesh(partGeometry.hand, slimMats.skin, wrist, [0, -0.035, 0.008]);
        robloxSlimArms.push({ upper, elbow, wrist, limb, side });
      };
      addArm(leftArm, -1);
      addArm(rightArm, 1);

      const addLeg = (limb: typeof leftLeg, side: number) => {
        const upper = new THREE.Group();
        limb.pivot.add(upper);
        robloxSlimLayers.push(upper);
        addMesh(partGeometry.thigh, slimMats.denim, upper, [0, -0.15, 0]);
        const knee = new THREE.Group();
        knee.position.y = -0.3;
        upper.add(knee);
        addMesh(jointGeometry, slimMats.denim, knee, [0, 0, 0], [0.068, 0.068, 0.068]);
        addMesh(partGeometry.calf, slimMats.denim, knee, [0, -0.15, 0]);
        const ankle = new THREE.Group();
        ankle.position.y = -0.29;
        knee.add(ankle);
        addMesh(jointGeometry, slimMats.skin, ankle, [0, 0, 0], [0.055, 0.055, 0.055]);
        addMesh(partGeometry.foot, slimMats.shoes, ankle, [0, 0, 0.035]);
        addMesh(partGeometry.sole, slimMats.sole, ankle, [0, -0.037, 0.035]);
        robloxSlimLegs.push({ upper, knee, ankle, limb, side });
      };
      addLeg(leftLeg, -1);
      addLeg(rightLeg, 1);
      robloxSlimBuilt = true;
    };

    const avatarLayerRegistry = new Map<AvatarPresetId, { layers: THREE.Group[]; build?: () => void }>([
      ["anak-cokelat", { layers: legacyLayers }],
      ["kacamata-hitam", { layers: newAvatarLayers, build: buildBlackAvatar }],
      ["cewek-streetwear", { layers: streetwearLayers, build: buildStreetwearAvatar }],
      ["cewek-gaul", { layers: organicLayers, build: buildOrganicAvatar }],
      ["roblox-slim", { layers: robloxSlimLayers, build: buildRobloxSlimAvatar }],
    ]);

    const applyAvatar = (presetId: AvatarPresetId) => {
      const selectedLayer = avatarLayerRegistry.get(presetId);
      if (!selectedLayer) return;
      selectedLayer.build?.();
      avatarLayerRegistry.forEach((entry, id) => {
        entry.layers.forEach((layer) => { layer.visible = id === presetId; });
      });
    };
    applyAvatar(selectedAvatarId);

    const animationState = {
      phase: 0,
      runBlend: 0,
      runIntensity: 0,
      armSwing: 0,
      armLift: 0,
      elbowBend: 0,
      breath: 0,
      torsoLean: 0,
      torsoTwist: 0,
      bodyBounce: 0,
      leftFootLift: 0,
      rightFootLift: 0,
      leftLegSwing: 0,
      rightLegSwing: 0,
      hoodSway: 0,
      hairSway: 0,
      pendantSway: 0,
      landingBend: 0,
    };

    // Pool debu berukuran tetap; mesh dan material dipakai ulang setiap langkah.
    const dustGeometry = new THREE.SphereGeometry(0.045, 8, 6);
    const dustMaterial = new THREE.MeshStandardMaterial({
      color: "#d8c6a5",
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    resources.add(dustGeometry);
    resources.add(dustMaterial);
    const dustParticles: DustParticle[] = Array.from({ length: 16 }, () => {
      const mesh = new THREE.Mesh(dustGeometry, dustMaterial);
      mesh.visible = false;
      scene.add(mesh);
      return { mesh, velocity: new THREE.Vector3(), age: 0, lifetime: 0.32, baseScale: 0.55 };
    });
    let dustCursor = 0;

    const treasurePositions: Array<[number, number]> = [
      [2, 45], [-18, 28], [20, 30], [-34, 3], [36, -7],
    ];
    const treasures: Treasure[] = treasurePositions.map(([x, z], index) => {
      const group = new THREE.Group();
      group.position.set(x, 0.08, z);
      scene.add(group);
      addBox(group, mats.chestWood, [0, 0.38, 0], [1.1, 0.55, 0.76]);
      addBox(group, mats.chestWood, [0, 0.7, 0], [1.16, 0.18, 0.82]);
      addBox(group, mats.yellow, [0, 0.39, 0.39], [1.12, 0.1, 0.06]);
      addBox(group, mats.yellow, [0, 0.7, 0.42], [0.2, 0.24, 0.08]);
      const halo = addMesh(new THREE.TorusGeometry(0.95, 0.055, 8, 24), mats.yellow, group, [0, 0.08, 0]);
      halo.rotation.x = Math.PI / 2;
      return { group, home: group.position.clone(), phase: index * 0.8, collected: false };
    });

    const playerPosition = new THREE.Vector3(0, 1.68, 43);
    const emitDust = (side: number, count: number) => {
      const facingX = Math.sin(avatar.rotation.y);
      const facingZ = Math.cos(avatar.rotation.y);
      for (let index = 0; index < count; index += 1) {
        const particle = dustParticles[dustCursor]!;
        dustCursor = (dustCursor + 1) % dustParticles.length;
        const lateral = side * 0.2 + (index - (count - 1) / 2) * 0.07;
        particle.mesh.position.set(
          playerPosition.x - facingX * 0.2 + Math.cos(avatar.rotation.y) * lateral,
          playerPosition.y + 0.035,
          playerPosition.z - facingZ * 0.2 - Math.sin(avatar.rotation.y) * lateral,
        );
        particle.velocity.set(
          -facingX * (0.25 + index * 0.04) + Math.cos(avatar.rotation.y) * side * 0.18,
          0.35 + index * 0.04,
          -facingZ * (0.25 + index * 0.04) - Math.sin(avatar.rotation.y) * side * 0.18,
        );
        particle.age = 0;
        particle.lifetime = 0.28 + index * 0.025;
        particle.baseScale = 0.55 + index * 0.08;
        particle.mesh.scale.setScalar(particle.baseScale);
        particle.mesh.visible = true;
      }
    };
    const velocity = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    const cameraPosition = new THREE.Vector3();
    let cameraYaw = 0;
    let cameraPitch = 0.16;
    let pointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let grounded = true;
    let scoreNow = 0;
    let lastFrameTime = performance.now();
    let frameId = 0;
    const maxIslandRadius = 62;

    const updateSize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      setMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 760);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) event.preventDefault();
      keysRef.current.add(key);
      if (key === " " && !event.repeat) jumpRequestedRef.current = true;
    };
    const onKeyUp = (event: KeyboardEvent) => keysRef.current.delete(event.key.toLowerCase());
    const onBlur = () => keysRef.current.clear();
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.button !== 2) return;
      pointerId = event.pointerId;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      cameraYaw -= (event.clientX - lastPointerX) * 0.006;
      cameraPitch = THREE.MathUtils.clamp(cameraPitch + (event.clientY - lastPointerY) * 0.003, -0.05, 0.55);
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      pointerId = null;
      if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
    };
    const onContextMenu = (event: MouseEvent) => event.preventDefault();
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0 && (event.target as HTMLElement).closest(".world-hud")) event.preventDefault();
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    renderer.domElement.addEventListener("contextmenu", onContextMenu);

    const animate = (now: number) => {
      frameId = window.requestAnimationFrame(animate);
      const dt = Math.min((now - lastFrameTime) / 1000, RUN_CONFIG.maxDeltaTime);
      lastFrameTime = now;
      const input = keysRef.current;
      const forward = Number(input.has("w") || input.has("arrowup")) - Number(input.has("s") || input.has("arrowdown"));
      const sideways = Number(input.has("d") || input.has("arrowright")) - Number(input.has("a") || input.has("arrowleft"));
      const moving = forward !== 0 || sideways !== 0;
      const wasGrounded = grounded;
      let movementSpeed = 0;

      if (!pendingTreasureRef.current && !gameCompleteRef.current) {
        const direction = new THREE.Vector3(
          Math.sin(cameraYaw) * forward + Math.cos(cameraYaw) * sideways,
          0,
          -Math.cos(cameraYaw) * forward + Math.sin(cameraYaw) * sideways,
        );
        if (moving) {
          direction.normalize();
          const speed = input.has("shift") ? 10 : 6.2;
          movementSpeed = speed;
          playerPosition.x += direction.x * speed * dt;
          playerPosition.z += direction.z * speed * dt;
          avatar.rotation.y = Math.atan2(direction.x, direction.z);
        }
        if (jumpRequestedRef.current && grounded) {
          velocity.y = 8.5;
          grounded = false;
        }
        jumpRequestedRef.current = false;
        velocity.y -= 22 * dt;
        playerPosition.y += velocity.y * dt;
        if (playerPosition.y <= 1.68) {
          playerPosition.y = 1.68;
          velocity.y = 0;
          grounded = true;
        }
        const distanceFromCenter = Math.hypot(playerPosition.x, playerPosition.z);
        if (distanceFromCenter > maxIslandRadius) {
          playerPosition.x *= maxIslandRadius / distanceFromCenter;
          playerPosition.z *= maxIslandRadius / distanceFromCenter;
        }
        avatar.position.copy(playerPosition);
        const nearbyTreasure = treasures.find((treasure) => (
          !treasure.collected && treasure.group.position.distanceTo(playerPosition) < 2.15
        ));
        if (nearbyTreasure) {
          nearbyTreasure.collected = true;
          nearbyTreasure.group.visible = false;
          pendingTreasureRef.current = nearbyTreasure;
          setQuestion(makeQuestion());
          setAnswerFeedback(null);
        }
      }

      if (!wasGrounded && grounded) animationState.landingBend = 1;
      const isRunning = movementSpeed > 0 && grounded && !pendingTreasureRef.current;
      const runIntensity = movementSpeed >= 10 ? 1 : movementSpeed > 0 ? 0.86 : 0;
      const phaseBeforeStep = animationState.phase;
      if (isRunning) {
        const cyclesPerSecond = Math.min(
          movementSpeed / RUN_CONFIG.cycleLength,
          RUN_CONFIG.maxCyclesPerSecond,
        );
        animationState.phase += cyclesPerSecond * Math.PI * 2 * dt;
        if (phaseBeforeStep < Math.PI && animationState.phase >= Math.PI) {
          emitDust(-1, runIntensity > 0.9 ? 2 : 1);
        }
        if (animationState.phase >= Math.PI * 2) {
          animationState.phase %= Math.PI * 2;
          emitDust(1, runIntensity > 0.9 ? 2 : 1);
        }
      }

      const runTarget = isRunning ? 1 : 0;
      const blendAlpha = 1 - Math.exp(-dt / (RUN_CONFIG.blendSeconds / 3));
      const damping = 1 - Math.exp(-10 * dt);
      animationState.runBlend = THREE.MathUtils.lerp(animationState.runBlend, runTarget, blendAlpha);
      animationState.runIntensity = THREE.MathUtils.lerp(animationState.runIntensity, runIntensity, blendAlpha);
      const strideWave = Math.sin(animationState.phase);
      const leftSwing = Math.max(0, strideWave);
      const rightSwing = Math.max(0, -strideWave);
      animationState.armSwing = THREE.MathUtils.lerp(
        animationState.armSwing,
        -strideWave * RUN_CONFIG.legSwing * runIntensity,
        damping,
      );
      animationState.elbowBend = THREE.MathUtils.lerp(
        animationState.elbowBend,
        isRunning ? RUN_CONFIG.elbowBend : 0,
        damping,
      );
      animationState.landingBend *= Math.exp(-dt / 0.12);
      if (animationState.landingBend < 0.005) animationState.landingBend = 0;

      const runWeight = animationState.runIntensity * animationState.runBlend;
      const bounceTarget = isRunning
        ? Math.max(0, Math.sin(animationState.phase * 2)) * RUN_CONFIG.bodyBounce * runWeight
        : 0;
      const breathTarget = isRunning ? 0 : Math.sin(now * 0.0018) * 0.018;
      const leanTarget = isRunning
        ? RUN_CONFIG.bodyLean * runIntensity * animationState.runBlend
        : 0;
      const twistTarget = isRunning
        ? -Math.sin(animationState.phase) * RUN_CONFIG.torsoTwist * animationState.runBlend
        : 0;
      animationState.bodyBounce = THREE.MathUtils.lerp(animationState.bodyBounce, bounceTarget, damping);
      animationState.breath = THREE.MathUtils.lerp(animationState.breath, breathTarget, damping);
      animationState.torsoLean = THREE.MathUtils.lerp(animationState.torsoLean, leanTarget, damping);
      animationState.torsoTwist = THREE.MathUtils.lerp(animationState.torsoTwist, twistTarget, damping);
      animationState.hoodSway = THREE.MathUtils.lerp(
        animationState.hoodSway,
        isRunning ? Math.sin(animationState.phase - 0.35) * 0.09 * runIntensity : 0,
        1 - Math.exp(-7 * dt),
      );
      animationState.hairSway = THREE.MathUtils.lerp(
        animationState.hairSway,
        isRunning ? Math.sin(animationState.phase - 0.5) * 0.055 * runIntensity : 0,
        1 - Math.exp(-8 * dt),
      );
      animationState.pendantSway = THREE.MathUtils.lerp(
        animationState.pendantSway,
        isRunning ? Math.sin(animationState.phase - 0.45) * 0.12 * runWeight : 0,
        1 - Math.exp(-9 * dt),
      );

      animationState.leftFootLift = leftSwing * RUN_CONFIG.footLift * runWeight;
      animationState.rightFootLift = rightSwing * RUN_CONFIG.footLift * runWeight;
      animationState.leftLegSwing = leftSwing * RUN_CONFIG.legSwing * runWeight;
      animationState.rightLegSwing = -rightSwing * RUN_CONFIG.legSwing * runWeight;
      leftLeg.pivot.position.y = leftLeg.baseY + Math.max(0, animationState.leftFootLift);
      rightLeg.pivot.position.y = rightLeg.baseY + Math.max(0, animationState.rightFootLift);
      leftLeg.pivot.rotation.x = animationState.leftLegSwing;
      rightLeg.pivot.rotation.x = animationState.rightLegSwing;
      leftArm.pivot.rotation.x = animationState.armSwing * animationState.runBlend;
      rightArm.pivot.rotation.x = -animationState.armSwing * animationState.runBlend;
      const jumpLift = grounded ? 0 : 2.2;
      animationState.armLift = THREE.MathUtils.lerp(animationState.armLift, jumpLift, 1 - Math.exp(-12 * dt));
      const idleArmRaise = selectedAvatarId === "kacamata-hitam" ? 0.46 * (1 - animationState.runBlend) : 0;
      leftArm.pivot.rotation.z = animationState.armLift - idleArmRaise;
      rightArm.pivot.rotation.z = -animationState.armLift + idleArmRaise;
      leftArm.elbow.rotation.x = -animationState.elbowBend * animationState.runBlend;
      rightArm.elbow.rotation.x = -animationState.elbowBend * animationState.runBlend;
      bodyRig.position.y = 1 + Math.max(0, animationState.bodyBounce) + animationState.breath;
      bodyRig.rotation.x = animationState.torsoLean;
      bodyRig.rotation.y = animationState.torsoTwist;
      bodyRig.scale.y = 1 - animationState.landingBend * 0.06;
      head.rotation.x = -animationState.torsoLean;
      head.rotation.y = -animationState.torsoTwist;
      if (selectedAvatarId === "roblox-slim" && robloxSlimBuilt && robloxSlimTorso && robloxSlimUpperTorso && robloxSlimHead) {
        const slimAlpha = 1 - Math.exp(-dt / ROBLOX_SLIM_CONFIG.transitionSeconds);
        const idleWave = Math.sin(now * 0.00125);
        const torsoLeanTarget = (isRunning ? ROBLOX_SLIM_CONFIG.bodyLean * runWeight : 0) - animationState.torsoLean;
        robloxSlimTorso.rotation.x = THREE.MathUtils.lerp(robloxSlimTorso.rotation.x, torsoLeanTarget, slimAlpha);
        robloxSlimTorso.position.x = THREE.MathUtils.lerp(robloxSlimTorso.position.x, grounded ? idleWave * 0.012 : 0, slimAlpha);
        robloxSlimUpperTorso.rotation.y = THREE.MathUtils.lerp(
          robloxSlimUpperTorso.rotation.y,
          -animationState.torsoTwist * 1.4,
          slimAlpha,
        );
        robloxSlimHead.rotation.x = THREE.MathUtils.lerp(robloxSlimHead.rotation.x, idleWave * 0.01, slimAlpha);
        robloxSlimHead.rotation.y = THREE.MathUtils.lerp(robloxSlimHead.rotation.y, -animationState.torsoTwist * 0.3, slimAlpha);

        robloxSlimArms.forEach(({ upper, elbow, wrist, limb, side }) => {
          const delayedPhase = animationState.phase - ROBLOX_SLIM_CONFIG.forearmLagCycles * Math.PI * 2;
          const phaseDrive = -side * Math.sin(delayedPhase);
          const sharedShoulderDrive = -limb.pivot.rotation.x / RUN_CONFIG.legSwing;
          const forwardAmount = THREE.MathUtils.clamp((0.65 * sharedShoulderDrive + 0.35 * phaseDrive + 1) / 2, 0, 1);
          const elbowTarget = isRunning
            ? THREE.MathUtils.lerp(ROBLOX_SLIM_CONFIG.elbowBackward, ROBLOX_SLIM_CONFIG.elbowForward, forwardAmount)
            : grounded
              ? 0.22 + Math.sin(now * 0.0015 + side) * 0.018
              : 0.38;
          const jumpSpread = grounded ? 0 : 0.3;
          upper.rotation.z = THREE.MathUtils.lerp(upper.rotation.z, side * (0.12 + jumpSpread), slimAlpha);
          elbow.rotation.x = THREE.MathUtils.lerp(elbow.rotation.x, elbowTarget, slimAlpha);
          const handPhase = animationState.phase - ROBLOX_SLIM_CONFIG.handLagCycles * Math.PI * 2;
          const wristTarget = isRunning
            ? Math.sin(handPhase) * 0.09 + elbow.rotation.x * 0.12
            : grounded ? 0.035 : -0.06;
          wrist.rotation.x = THREE.MathUtils.lerp(wrist.rotation.x, wristTarget, slimAlpha);
          wrist.rotation.z = THREE.MathUtils.lerp(wrist.rotation.z, side * 0.035, slimAlpha);
        });

        robloxSlimLegs.forEach(({ upper, knee, ankle, limb, side }) => {
          const sharedHipDrive = limb.pivot.rotation.x / RUN_CONFIG.legSwing;
          const phaseBack = side < 0
            ? Math.max(0, -Math.sin(animationState.phase))
            : Math.max(0, Math.sin(animationState.phase));
          const backwardAmount = THREE.MathUtils.clamp(
            phaseBack * (0.75 + 0.25 * Math.min(1, Math.abs(sharedHipDrive))),
            0,
            1,
          );
          const kneeTarget = isRunning
            ? ROBLOX_SLIM_CONFIG.kneeBackward * backwardAmount
            : grounded
              ? 0.025 + animationState.landingBend * 0.28
              : 0.28;
          knee.rotation.x = THREE.MathUtils.lerp(knee.rotation.x, kneeTarget, slimAlpha);
          const footTarget = isRunning
            ? -Math.sin(animationState.phase + side * 0.2) * 0.08 + limb.pivot.rotation.x * 0.06
            : grounded ? 0 : 0.1;
          ankle.rotation.x = THREE.MathUtils.lerp(ankle.rotation.x, footTarget, slimAlpha);

          const hipAngle = limb.pivot.rotation.x;
          const kneeAngle = knee.rotation.x;
          const ankleBaseAngle = hipAngle + kneeAngle;
          const footAngle = ankleBaseAngle + ankle.rotation.x;
          const absCos = Math.abs(Math.cos(footAngle));
          const absSin = Math.abs(Math.sin(footAngle));
          const footBottom = -0.035 * Math.sin(footAngle) - 0.04 * absCos - 0.13 * absSin;
          const soleBottom = -0.037 * Math.cos(footAngle) - 0.035 * Math.sin(footAngle)
            - 0.0125 * absCos - 0.13 * absSin;
          const lowestPoint = limb.pivot.position.y
            - 0.3 * Math.cos(hipAngle)
            + ankle.position.y * Math.cos(ankleBaseAngle)
            + Math.min(footBottom, soleBottom);
          const localLift = Math.max(0, -lowestPoint / Math.max(0.5, Math.cos(hipAngle)));
          upper.position.y = THREE.MathUtils.lerp(upper.position.y, localLift, slimAlpha);
        });
      }
      if (legacyBody.visible) {
        hoodPivot.rotation.x = animationState.hoodSway;
        hairMotion.rotation.x = animationState.hairSway;
        pendantPivot.rotation.x = animationState.pendantSway;
      }
      if (blackHairMotion?.visible && blackHairMotion.parent?.visible) {
        blackHairMotion.rotation.x = animationState.hairSway * 1.25;
        blackHairMotion.rotation.z = Math.sin(animationState.phase - 0.55) * 0.025 * animationState.runBlend;
      }
      if (streetwearHairMotion?.visible && streetwearHairMotion.parent?.visible) {
        streetwearHairMotion.rotation.x = THREE.MathUtils.clamp(animationState.hairSway * 0.55, -0.035, 0.035);
        streetwearHairMotion.rotation.z = THREE.MathUtils.clamp(Math.sin(animationState.phase - 0.65) * 0.018 * animationState.runBlend, -0.018, 0.018);
      }
      if (gumMesh?.visible && gumMesh.parent?.visible) {
        const gumCycle = now * 0.001 * (Math.PI * 2);
        gumMesh.scale.setScalar(1 + Math.sin(gumCycle) * 0.1 + Math.sin(animationState.phase) * animationState.runBlend * 0.025);
        gumMesh.position.y = -0.04 + Math.sin(gumCycle) * 0.009;
      }

      dustParticles.forEach((particle) => {
        if (!particle.mesh.visible) return;
        particle.age += dt;
        if (particle.age >= particle.lifetime) {
          particle.mesh.visible = false;
          return;
        }
        particle.velocity.y -= 0.8 * dt;
        particle.mesh.position.addScaledVector(particle.velocity, dt);
        const progress = particle.age / particle.lifetime;
        particle.mesh.scale.setScalar(particle.baseScale * (1 - progress));
      });

      treasures.forEach((treasure) => {
        if (treasure.collected) return;
        treasure.group.rotation.y = Math.sin(now * 0.0004 + treasure.phase) * 0.12;
        treasure.group.position.y = treasure.home.y + Math.sin(now * 0.002 + treasure.phase) * 0.08;
      });
      cameraTarget.set(playerPosition.x, playerPosition.y + 1.1, playerPosition.z);
      const cameraDistance = 5.2;
      cameraPosition.set(
        playerPosition.x + Math.sin(cameraYaw) * Math.cos(cameraPitch) * cameraDistance,
        playerPosition.y + 1.6 + Math.sin(cameraPitch) * cameraDistance,
        playerPosition.z + Math.cos(cameraYaw) * Math.cos(cameraPitch) * cameraDistance,
      );
      camera.position.lerp(cameraPosition, 1 - Math.exp(-7 * dt));
      camera.lookAt(cameraTarget);
      renderer.render(scene, camera);
    };
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("touchmove", onTouchMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerUp);
      renderer.domElement.removeEventListener("contextmenu", onContextMenu);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && !resources.has(object.geometry)) object.geometry.dispose();
      });
      resources.forEach((resource) => resource.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      keysRef.current.clear();
    };
  }, [gameStarted, selectedIsland, selectedAvatarId]);

  const answerQuestion = (answer: number) => {
    if (!question || !pendingTreasureRef.current) return;
    if (answer !== question.answer) {
      setAnswerFeedback("Belum tepat. Coba hitung sekali lagi!");
      return;
    }
    pendingTreasureRef.current = null;
    const nextTreasuresFound = treasuresFound + 1;
    setTreasuresFound(nextTreasuresFound);
    setScore((value) => value + 10);
    if (nextTreasuresFound >= TREASURE_COUNT) {
      gameCompleteRef.current = true;
      setGameComplete(true);
    }
    setQuestion(null);
    setAnswerFeedback(null);
  };

  useEffect(() => {
    if (!question) pendingTreasureRef.current = null;
  }, [question]);

  const restartAdventure = () => {
    gameCompleteRef.current = false;
    setGameComplete(false);
    setTreasuresFound(0);
    setScore(0);
    setQuestion(null);
    setGameStarted(false);
  };

  const holdKey = (key: string) => (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    keysRef.current.add(key);
  };
  const releaseKey = (key: string) => (event: ReactPointerEvent<HTMLButtonElement>) => {
    keysRef.current.delete(key);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <main className="world-page">
      <style>{`
        .world-page{position:relative;width:100%;height:100dvh;min-height:100dvh;overflow:hidden;background:#85dfff;color:#fff;font-family:var(--font-body,'Exo 2'),sans-serif}
        .world-canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab}
        .world-canvas:active{cursor:grabbing}
        .world-hud{position:absolute;inset:0;pointer-events:none}
        .world-top{position:absolute;top:clamp(14px,3vh,28px);left:clamp(14px,3vw,34px);right:clamp(14px,3vw,34px);display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
        .world-brand{display:flex;align-items:center;gap:12px}
        .world-back,.world-score{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:9px 14px;border:1px solid rgba(255,255,255,.92);border-radius:16px;background:rgba(255,255,255,.88);color:#315d87;font:800 11px var(--font-display,'Orbitron'),sans-serif;box-shadow:0 6px 20px rgba(34,99,137,.16);backdrop-filter:blur(8px)}
        .world-back{pointer-events:auto;cursor:pointer}
        .world-score{font-size:13px;color:#3672cb}
        .world-title{font:900 clamp(16px,2.4vw,25px)/1 var(--font-display,'Orbitron'),sans-serif;letter-spacing:.04em;text-shadow:0 2px 0 #3478c8,0 5px 12px rgba(22,80,138,.3)}
        .world-subtitle{margin-top:5px;font-size:11px;font-weight:700;color:#fff;text-shadow:0 1px 5px rgba(20,83,133,.4)}
        .world-brand-mark{display:grid;place-items:center;width:42px;height:42px;border:2px solid #fff;border-radius:14px;background:linear-gradient(145deg,#49b8f3,#5175e8);box-shadow:0 5px 16px rgba(34,99,137,.18)}
        .world-bottom{position:absolute;left:50%;bottom:clamp(14px,3vh,28px);transform:translateX(-50%);padding:10px 17px;border:1px solid rgba(255,255,255,.86);border-radius:15px;background:rgba(255,255,255,.85);color:#315d87;font-size:12px;font-weight:700;white-space:nowrap;box-shadow:0 5px 17px rgba(34,99,137,.14);backdrop-filter:blur(8px)}
        .world-bottom kbd{padding:3px 6px;border:1px solid #bedcf0;border-radius:6px;background:#eff9ff;color:#3974c6;font:800 10px var(--font-display,'Orbitron'),sans-serif}
        .world-hud .world-mobile-controls{pointer-events:auto}
        .world-mobile-controls{position:absolute;left:16px;bottom:18px;display:grid;grid-template-columns:repeat(3,46px);grid-template-rows:repeat(2,46px);gap:5px}
        .world-mobile-controls button{border:1px solid rgba(255,255,255,.85);border-radius:14px;background:rgba(64,130,202,.84);color:#fff;font-size:18px;font-weight:900;touch-action:none}
        .world-mobile-controls .world-up{grid-column:2;grid-row:1}
        .world-mobile-controls .world-left{grid-column:1;grid-row:2}
        .world-mobile-controls .world-down{grid-column:2;grid-row:2}
        .world-mobile-controls .world-right{grid-column:3;grid-row:2}
        .world-jump{position:absolute;right:20px;bottom:23px;width:64px;height:64px;border:1px solid #fff;border-radius:50%;background:linear-gradient(145deg,#ffb650,#ff7c68);color:#fff;font:800 10px var(--font-display,'Orbitron'),sans-serif;box-shadow:0 6px 18px rgba(163,84,59,.25);pointer-events:auto;touch-action:none}
        .world-question-layer{position:absolute;inset:0;display:grid;place-items:center;padding:16px;background:rgba(37,103,145,.28);backdrop-filter:blur(5px);pointer-events:auto}
        .world-question-card{width:min(440px,calc(100vw - 28px));padding:clamp(22px,5vw,36px);border:2px solid rgba(255,255,255,.95);border-radius:26px;background:linear-gradient(145deg,#fff,#eaf8ff);text-align:center;box-shadow:0 22px 65px rgba(22,88,128,.3)}
        .world-question-kicker{display:flex;justify-content:center;align-items:center;gap:7px;color:#229b83;font:800 10px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.12em}
        .world-question-title{margin:12px 0;color:#315d87;font:900 clamp(21px,5vw,28px) var(--font-display,'Orbitron'),sans-serif}
        .world-question-prompt{margin:14px 0 22px;color:#3672cb;font:900 clamp(38px,9vw,54px) var(--font-display,'Orbitron'),sans-serif}
        .world-answer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
        .world-answer{min-height:54px;border:0;border-radius:14px;background:linear-gradient(135deg,#49b8f3,#5175e8);color:#fff;font:800 20px var(--font-display,'Orbitron'),sans-serif;box-shadow:0 5px 12px rgba(58,116,202,.2);cursor:pointer}
        .world-answer:hover{filter:brightness(1.08);transform:translateY(-1px)}
        .world-feedback{min-height:24px;margin-top:12px;color:#249b83;font-size:13px;font-weight:800}
        .world-error{display:grid;place-items:center;height:100%;padding:24px;color:#315d87;text-align:center;font-weight:700}
        .world-start-screen{position:absolute;z-index:5;inset:0;overflow:auto;display:grid;place-items:center;padding:clamp(16px,4vw,40px);background:radial-gradient(ellipse at 10% 12%,rgba(255,255,255,.92),transparent 30%),radial-gradient(ellipse at 90% 85%,rgba(255,221,139,.65),transparent 34%),linear-gradient(145deg,#65d8ed 0%,#8fcef9 48%,#b5a2f5 100%);color:#34547d}
        .world-start-content{width:min(1060px,100%);margin:auto}
        .world-start-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:clamp(18px,4vh,34px)}
        .world-start-back{display:inline-flex;align-items:center;gap:7px;min-height:40px;padding:8px 13px;border:2px solid rgba(255,255,255,.9);border-radius:15px;background:rgba(255,255,255,.78);color:#45638c;font:800 10px var(--font-display,'Orbitron'),sans-serif;box-shadow:0 5px 0 rgba(68,107,163,.14);cursor:pointer}
        .world-start-badge{display:flex;align-items:center;gap:6px;padding:8px 12px;border:1px solid rgba(255,255,255,.76);border-radius:999px;background:rgba(255,255,255,.56);color:#47759b;font-size:11px;font-weight:800}
        .world-start-heading{text-align:center;margin:0 auto 24px}
        .world-start-mark{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 12px;border:3px solid #fff;border-radius:20px;background:linear-gradient(145deg,#48c5ed,#6878ee);color:#fff;box-shadow:0 7px 0 rgba(70,102,175,.22),0 12px 25px rgba(62,107,170,.2);transform:rotate(-5deg)}
        .world-start-title{margin:0;color:#fff;font:1000 clamp(28px,6vw,48px)/1 var(--font-display,'Orbitron'),sans-serif;letter-spacing:.04em;-webkit-text-stroke:1px rgba(66,111,178,.45);text-shadow:0 4px 0 #628ed2,0 8px 0 rgba(60,102,168,.32),0 13px 22px rgba(49,81,136,.2)}
        .world-start-subtitle{margin:12px 0 0;color:#fff;font-size:clamp(13px,2vw,16px);font-weight:800;text-shadow:0 2px 6px rgba(52,88,139,.3)}
        .world-lobby{display:grid;grid-template-columns:minmax(230px,.78fr) minmax(0,1.45fr);gap:16px;align-items:stretch}
        .world-lobby-panel{padding:clamp(17px,2.7vw,25px);border:2px solid rgba(255,255,255,.9);border-radius:24px;background:rgba(255,255,255,.86);box-shadow:0 10px 0 rgba(66,100,154,.12),0 22px 48px rgba(57,95,148,.16);backdrop-filter:blur(10px)}
        .world-lobby-panel h2{margin:0 0 7px;color:#3b5f8c;font:900 15px var(--font-display,'Orbitron'),sans-serif}
        .world-lobby-intro{margin:0 0 16px;color:#6982a1;font-size:12px;font-weight:600;line-height:1.55}
        .world-island-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
        .world-island-card{position:relative;display:grid;grid-template-columns:43px minmax(0,1fr);align-items:center;gap:9px;min-height:76px;padding:10px;border:2px solid #dceaf6;border-radius:17px;background:linear-gradient(145deg,#fff,#f6fbff);color:#3d5d85;text-align:left;box-shadow:0 4px 0 rgba(74,114,165,.08);cursor:pointer;transition:transform .15s,border-color .15s,box-shadow .15s}
        .world-island-card:hover{transform:translateY(-2px);border-color:#a9d8f6}
        .world-island-card[aria-pressed="true"]{border-color:#5bbce9;background:linear-gradient(145deg,#f1fcff,#e2f4ff);box-shadow:0 4px 0 rgba(74,156,203,.2),0 0 0 3px rgba(91,188,233,.13)}
        .world-island-emoji{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:linear-gradient(145deg,#eff9ff,#dff1ff);font-size:25px}
        .world-island-name{display:block;font:900 10px var(--font-display,'Orbitron'),sans-serif;line-height:1.35}
        .world-island-description{display:block;margin-top:4px;color:#8195ad;font-size:10px;font-weight:600;line-height:1.25}
        .world-avatar-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;width:min(760px,100%);margin:0 auto 18px}
        .world-avatar-card{display:flex;flex-direction:column;align-items:stretch;min-width:0;padding:13px;border:2px solid #dceaf6;border-radius:18px;background:linear-gradient(145deg,#fff,#f6fbff);color:#3d5d85;text-align:left;box-shadow:0 4px 0 rgba(74,114,165,.08)}
        .world-avatar-card[data-selected="true"]{border-color:#5bbce9;background:linear-gradient(145deg,#f1fcff,#e2f4ff);box-shadow:0 4px 0 rgba(74,156,203,.2),0 0 0 3px rgba(91,188,233,.13)}
        .world-avatar-preview{position:relative;display:grid;place-items:center;height:154px;overflow:hidden;border-radius:13px;background:radial-gradient(ellipse at 50% 80%,#c5edfa 0 22%,transparent 23%),linear-gradient(150deg,#effaff,#dceeff)}
        .world-avatar-doll{position:relative;width:84px;height:135px}
        .world-avatar-head{position:absolute;z-index:2;top:7px;left:20px;width:44px;height:45px;border:2px solid rgba(51,64,75,.12);border-radius:13px;background:#f2c9a5}
        .world-avatar-hair{position:absolute;z-index:3;top:2px;left:18px;width:48px;height:23px;border-radius:17px 17px 7px 7px;background:#7a4a32}
        .world-avatar-shirt{position:absolute;top:49px;left:14px;width:56px;height:45px;border-radius:13px 13px 10px 10px;background:#e8c98a}
        .world-avatar-vest{position:absolute;z-index:1;top:52px;left:26px;width:32px;height:38px;border-radius:8px;background:#3b3f44}
        .world-avatar-legs{position:absolute;top:88px;left:20px;width:44px;height:35px;border-radius:7px 7px 9px 9px;background:#292c30}
        .world-avatar-shoes{position:absolute;top:118px;left:15px;width:27px;height:12px;border-radius:6px 6px 4px 4px;background:#c98b4e;box-shadow:30px 0 #c98b4e}
        .world-avatar-card[data-avatar="kacamata-hitam"] .world-avatar-head{background:#F3D2BC}
        .world-avatar-card[data-avatar="kacamata-hitam"] .world-avatar-hair{top:0;left:16px;width:52px;height:28px;border-radius:20px 19px 10px 9px;background:#14110F;box-shadow:-5px 8px 0 -2px #14110F,7px 9px 0 -2px #14110F}
        .world-avatar-card[data-avatar="kacamata-hitam"] .world-avatar-shirt{background:#F5F5F5}
        .world-avatar-card[data-avatar="kacamata-hitam"] .world-avatar-vest{z-index:2;top:49px;left:32px;width:5px;height:43px;border-radius:2px;background:#111;box-shadow:15px 0 #111}
        .world-avatar-card[data-avatar="kacamata-hitam"] .world-avatar-legs{left:18px;width:48px;background:#1A1A1A}
        .world-avatar-card[data-avatar="kacamata-hitam"] .world-avatar-shoes{background:#111;box-shadow:30px 0 #111}
        .world-avatar-card[data-avatar="cewek-streetwear"] .world-avatar-head{background:#F3D2BC}
        .world-avatar-card[data-avatar="cewek-streetwear"] .world-avatar-hair{z-index:1;top:8px;left:17px;width:50px;height:76px;border-radius:20px 20px 9px 9px;background:#14110F;box-shadow:-5px 24px 0 -2px #14110F,7px 28px 0 -2px #14110F}
        .world-avatar-card[data-avatar="cewek-streetwear"] .world-avatar-shirt{top:52px;left:19px;width:46px;height:29px;border-radius:9px;background:#151515}
        .world-avatar-card[data-avatar="cewek-streetwear"] .world-avatar-vest{z-index:3;top:48px;left:18px;width:11px;height:37px;border-radius:6px;background:#D63A2F;box-shadow:38px 0 #D63A2F}
        .world-avatar-card[data-avatar="cewek-streetwear"] .world-avatar-legs{left:17px;width:50px;height:40px;background:#1A1A1A}
        .world-avatar-card[data-avatar="cewek-streetwear"] .world-avatar-shoes{top:121px;background:#D63A2F;box-shadow:30px 0 #D63A2F}
        .world-avatar-card[data-avatar="roblox-slim"] .world-avatar-head{background:#F3D2BC}
        .world-avatar-card[data-avatar="roblox-slim"] .world-avatar-hair{top:2px;left:18px;width:48px;height:21px;border-radius:15px 15px 6px 6px;background:#171313;box-shadow:-4px 8px 0 -2px #171313,5px 8px 0 -2px #171313}
        .world-avatar-card[data-avatar="roblox-slim"] .world-avatar-shirt{top:49px;left:18px;width:48px;height:40px;border-radius:8px;background:#3188D8}
        .world-avatar-card[data-avatar="roblox-slim"] .world-avatar-vest{display:none}
        .world-avatar-card[data-avatar="roblox-slim"] .world-avatar-legs{top:87px;left:23px;width:38px;height:37px;border-radius:4px;background:#315C91}
        .world-avatar-card[data-avatar="roblox-slim"] .world-avatar-shoes{top:119px;left:14px;background:#F5F5F5;box-shadow:30px 0 #F5F5F5}
        .world-avatar-beanie{position:absolute;z-index:4;top:2px;left:15px;width:54px;height:20px;border:3px solid #1A1A1A;border-radius:16px 16px 7px 7px;background:#1A1A1A}
        .world-avatar-glasses{position:absolute;z-index:4;top:23px;left:22px;width:40px;height:12px;border:3px solid #111;border-radius:4px;box-shadow:17px 0 0 -2px #F3D2BC}
        .world-avatar-gum{position:absolute;z-index:4;top:42px;left:40px;width:9px;height:9px;border-radius:50%;background:#F4A3C0}
        .world-avatar-title{margin:12px 0 4px;font:900 12px var(--font-display,'Orbitron'),sans-serif}
        .world-avatar-description{min-height:30px;color:#8195ad;font-size:11px;font-weight:600;line-height:1.4}
        .world-avatar-pick{min-height:43px;margin-top:12px;border:0;border-radius:13px;background:linear-gradient(135deg,#29cda9,#16a991);color:#fff;font:900 11px var(--font-display,'Orbitron'),sans-serif;cursor:pointer}
        .world-avatar-pick:focus-visible,.world-avatar-change:focus-visible{outline:3px solid #ffbc58;outline-offset:3px}
        .world-avatar-change{display:flex;justify-content:center;align-items:center;width:100%;min-height:44px;margin-top:14px;border:2px solid #cce4f4;border-radius:14px;background:#f5fbff;color:#456b94;font:800 10px var(--font-display,'Orbitron'),sans-serif;cursor:pointer}
        .world-rules{display:grid;gap:11px;margin:16px 0 0;padding:14px;border:1px dashed #bfd7ea;border-radius:17px;background:#f5fbff}
        .world-rule{display:grid;grid-template-columns:27px 1fr;align-items:start;gap:8px;color:#607b9c;font-size:11px;font-weight:650;line-height:1.45}
        .world-rule-icon{display:grid;place-items:center;width:25px;height:25px;border-radius:9px;background:#e2f3ff;font-size:14px}
        .world-rule strong{color:#3f628d}
        .world-start-button{display:flex;justify-content:center;align-items:center;gap:10px;width:100%;min-height:54px;margin-top:15px;border:0;border-radius:17px;background:linear-gradient(135deg,#29cda9,#16a991);color:#fff;font:900 12px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.04em;box-shadow:0 6px 0 #168d7d,0 10px 20px rgba(28,174,148,.2);cursor:pointer;transition:transform .15s,filter .15s}
        .world-start-button:hover{transform:translateY(-2px);filter:brightness(1.05)}
        .world-start-button:active{transform:translateY(3px);box-shadow:0 3px 0 #168d7d}
        .world-start-button:focus-visible,.world-island-card:focus-visible,.world-start-back:focus-visible,.world-avatar-card:focus-visible{outline:3px solid #ffbc58;outline-offset:3px}
        @media(max-width:600px){.world-top{align-items:flex-start}.world-brand{gap:7px}.world-title{font-size:clamp(11px,3.2vw,17px)}.world-subtitle{display:none}.world-brand-mark{width:34px;height:34px}.world-back{min-height:36px;padding:7px 9px;font-size:9px}.world-score{min-height:36px;padding:7px 10px;font-size:11px}.world-bottom{bottom:102px;max-width:calc(100vw - 26px);font-size:10px}.world-mobile-controls{grid-template-columns:repeat(3,42px);grid-template-rows:repeat(2,42px);gap:4px;left:12px;bottom:14px}.world-jump{right:14px;bottom:20px;width:58px;height:58px}}
        @media(max-width:760px){.world-start-screen{place-items:start center;padding:14px}.world-start-content{margin:auto}.world-start-top{margin-bottom:13px}.world-start-heading{margin-bottom:16px}.world-start-mark{width:47px;height:47px;margin-bottom:9px;border-radius:16px}.world-lobby{grid-template-columns:1fr;gap:11px}.world-lobby-panel{padding:15px;border-radius:20px}.world-lobby-panel h2{font-size:13px}.world-lobby-intro{margin-bottom:12px;font-size:11px}.world-rules{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px;padding:10px}.world-rule{font-size:10px}.world-start-button{min-height:48px;margin-top:12px}.world-avatar-grid{grid-auto-flow:column;grid-auto-columns:minmax(250px,82vw);grid-template-columns:none;overflow-x:auto;padding:5px 4px 12px;scroll-snap-type:x mandatory;touch-action:pan-x}.world-avatar-card{scroll-snap-align:center;height:100%}.world-avatar-preview{height:142px}.world-avatar-pick{flex:none}}
        @media(max-width:390px){.world-island-grid{gap:7px}.world-island-card{grid-template-columns:34px minmax(0,1fr);gap:7px;min-height:66px;padding:8px}.world-island-emoji{width:34px;height:34px;font-size:21px}.world-island-name{font-size:9px}.world-island-description{font-size:9px}.world-start-badge{font-size:9px;padding:7px 9px}}
        @media(prefers-reduced-motion:reduce){.world-answer:hover{transform:none}}
      `}</style>
      <div ref={hostRef} className="absolute inset-0">
        {!gameStarted && (
          <section className="world-start-screen" aria-labelledby="world-start-title">
            <div className="world-start-content">
              <div className="world-start-top">
                <button className="world-start-back" onClick={() => navigate("/ruang-untuk-guru/numatik-game")} aria-label="Kembali ke menu Numatik Game">
                  <ArrowLeft size={15} /> MENU
                </button>
                <div className="world-start-badge"><Sparkles size={14} /> PETUALANGAN BELAJAR</div>
              </div>
              <header className="world-start-heading">
                <div className="world-start-mark"><Sparkles size={28} /></div>
                <h1 className="world-start-title" id="world-start-title">NUMATIK WORLD</h1>
                <p className="world-start-subtitle">{avatarPickerOpen ? "Pilih teman untuk menemani petualanganmu!" : `Pilih pulau, jelajahi dunia, dan cari ${TREASURE_COUNT} harta karun! ✨`}</p>
              </header>
              {avatarPickerOpen ? (
                <section aria-labelledby="world-avatar-title">
                  <div className="world-avatar-grid">
                    {AVATAR_PRESETS.map((preset) => (
                      <article
                        key={preset.id}
                        className="world-avatar-card"
                        data-avatar={preset.id}
                        data-selected={selectedAvatarId === preset.id}
                      >
                        <div className="world-avatar-preview" aria-hidden="true">
                          <div className="world-avatar-doll">
                            <span className="world-avatar-hair" />
                            <span className="world-avatar-head" />
                            {preset.id === "cewek-streetwear" && <span className="world-avatar-beanie" />}
                            <span className="world-avatar-shirt" />
                            <span className="world-avatar-vest" />
                            <span className="world-avatar-legs" />
                            <span className="world-avatar-shoes" />
                            {preset.id === "kacamata-hitam" && <><span className="world-avatar-glasses" /><span className="world-avatar-gum" /></>}
                          </div>
                        </div>
                        <h2 className="world-avatar-title" id={preset.id === "anak-cokelat" ? "world-avatar-title" : undefined}>{preset.name}</h2>
                        <span className="world-avatar-description">{preset.description}</span>
                        <button className="world-avatar-pick" type="button" aria-pressed={selectedAvatarId === preset.id} onClick={() => selectAvatar(preset.id)}>
                          {selectedAvatarId === preset.id ? "PILIH AVATAR INI" : "PILIH"}
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              ) : (
              <div className="world-lobby">
                <section className="world-lobby-panel" aria-labelledby="world-rules-title">
                  <h2 id="world-rules-title">CARA BERMAIN</h2>
                  <p className="world-lobby-intro">Siap jadi penjelajah cilik? Ikuti aturan mudah ini!</p>
                  <div className="world-rules">
                    <div className="world-rule"><span className="world-rule-icon">🕹️</span><span><strong>Jelajahi pulau</strong><br />WASD / tombol arah untuk bergerak, seret layar untuk melihat.</span></div>
                    <div className="world-rule"><span className="world-rule-icon">🦘</span><span><strong>Melompat</strong><br />Tekan SPACE atau tombol LOMPAT.</span></div>
                    <div className="world-rule"><span className="world-rule-icon">🧰</span><span><strong>Temukan harta karun</strong><br />Dekati peti harta untuk membuka soal matematika.</span></div>
                    <div className="world-rule"><span className="world-rule-icon">⭐</span><span><strong>Kumpulkan harta</strong><br />Jawab soal dengan benar untuk mendapatkan harta. Ada {TREASURE_COUNT} harta karun!</span></div>
                  </div>
                </section>
                <section className="world-lobby-panel" aria-labelledby="world-island-title">
                  <h2 id="world-island-title">PILIH PULAU PETUALANGAN</h2>
                  <p className="world-lobby-intro">Setiap pulau punya suasana dan kejutan yang berbeda.</p>
                  <div className="world-island-grid">
                    {ISLANDS.map((island) => (
                      <button
                        key={island.id}
                        className="world-island-card"
                        type="button"
                        aria-pressed={selectedIsland === island.id}
                        onClick={() => setSelectedIsland(island.id)}
                      >
                        <span className="world-island-emoji" aria-hidden="true">{island.emoji}</span>
                        <span>
                          <span className="world-island-name">{island.name}</span>
                          <span className="world-island-description">{island.description}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <button className="world-avatar-change" type="button" onClick={() => setAvatarPickerOpen(true)}>
                    GANTI AVATAR · {AVATAR_PRESETS.find((preset) => preset.id === selectedAvatarId)?.name}
                  </button>
                  <button className="world-start-button" type="button" onClick={() => setGameStarted(true)}>
                    <Sparkles size={17} /> MULAI PETUALANGAN <span aria-hidden="true">→</span>
                  </button>
                </section>
              </div>
              )}
            </div>
          </section>
        )}
        {gameStarted && !question && (
          <div className="world-hud">
            <header className="world-top">
              <div className="world-brand">
                <button className="world-back" onClick={() => navigate("/ruang-untuk-guru/numatik-game")} aria-label="Kembali ke menu Numatik Game">
                  <ArrowLeft size={15} /> MENU
                </button>
                <div className="world-brand-mark"><Sparkles size={21} /></div>
                <div>
                  <div className="world-title">NUMATIK WORLD</div>
                  <div className="world-subtitle">{ISLANDS.find(({ id }) => id === selectedIsland)?.emoji} {ISLANDS.find(({ id }) => id === selectedIsland)?.name} · cari {TREASURE_COUNT} harta karun!</div>
                </div>
              </div>
              <div className="world-score" aria-live="polite">🧰 HARTA {treasuresFound}/{TREASURE_COUNT} · {score} POIN</div>
            </header>
            <div className="world-bottom">
              Jelajahi pulau &nbsp; <kbd>W A S D</kbd> bergerak &nbsp; <kbd>SPACE</kbd> lompat &nbsp; seret layar untuk melihat
            </div>
            {mobile && (
              <>
                <div className="world-mobile-controls" aria-label="Kontrol gerak">
                  <button className="world-up" onPointerDown={holdKey("w")} onPointerUp={releaseKey("w")} onPointerCancel={releaseKey("w")} aria-label="Maju">▲</button>
                  <button className="world-left" onPointerDown={holdKey("a")} onPointerUp={releaseKey("a")} onPointerCancel={releaseKey("a")} aria-label="Kiri">◀</button>
                  <button className="world-down" onPointerDown={holdKey("s")} onPointerUp={releaseKey("s")} onPointerCancel={releaseKey("s")} aria-label="Mundur">▼</button>
                  <button className="world-right" onPointerDown={holdKey("d")} onPointerUp={releaseKey("d")} onPointerCancel={releaseKey("d")} aria-label="Kanan">▶</button>
                </div>
                <button className="world-jump" onPointerDown={() => { jumpRequestedRef.current = true; }}>LOMPAT</button>
              </>
            )}
          </div>
        )}
        {gameComplete && (
          <div className="world-question-layer">
            <section className="world-question-card" role="dialog" aria-modal="true" aria-labelledby="world-complete-title">
              <div className="world-question-kicker">🎉 PETUALANGAN SELESAI</div>
              <h2 className="world-question-title" id="world-complete-title">Semua harta ditemukan!</h2>
              <p className="world-lobby-intro">Kamu berhasil mengumpulkan {TREASURE_COUNT} harta karun dan mendapat {score} poin.</p>
              <button className="world-start-button" type="button" onClick={restartAdventure}>MAIN LAGI</button>
            </section>
          </div>
        )}
      </div>
      {question && (
        <div className="world-question-layer">
          <section className="world-question-card" role="dialog" aria-modal="true" aria-labelledby="world-question-title">
            <div className="world-question-kicker">🧰 HARTA KARUN</div>
            <h2 className="world-question-title" id="world-question-title">Jawab untuk mendapatkan harta!</h2>
            <div className="world-question-prompt">{question.prompt}</div>
            <div className="world-answer-grid">
              {question.options.map((option) => (
                <button key={option} className="world-answer" onClick={() => answerQuestion(option)}>{option}</button>
              ))}
            </div>
            <div className="world-feedback" role="status" aria-live="polite">{answerFeedback}</div>
          </section>
        </div>
      )}
    </main>
  );
};

export default NumatikWorldPage;
