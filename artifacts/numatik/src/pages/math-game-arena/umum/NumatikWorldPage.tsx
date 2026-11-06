import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, Gem, Sparkles } from "lucide-react";
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

type Crystal = {
  group: THREE.Group;
  home: THREE.Vector3;
  phase: number;
  collected: boolean;
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
  const pendingCrystalRef = useRef<Crystal | null>(null);
  const jumpRequestedRef = useRef(false);
  const [selectedIsland, setSelectedIsland] = useState<IslandId>("rainbow");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<WorldQuestion | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

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
      const value = new THREE.MeshStandardMaterial({ color, roughness });
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
      skin: makeMaterial("#f0b887"),
      hair: makeMaterial("#563b32"),
      shirt: makeMaterial("#27b99e"),
      pants: makeMaterial("#4778d5"),
      shoes: makeMaterial("#f8f2dc"),
      eye: makeMaterial("#293e61"),
      crystal: makeMaterial("#74eff1", 0.2),
      crystalPink: makeMaterial("#ff92c4", 0.2),
      crystalGold: makeMaterial("#ffe36b", 0.2),
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
        addMesh(new THREE.SphereGeometry(4.5, 20, 16), index ? mats.blue : mats.crystalPink, lollipop, [0, 13, 0]);
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
    const torso = new THREE.Group();
    torso.position.y = 1.9;
    avatar.add(torso);
    addMesh(new RoundedBoxGeometry(1.25, 1.3, 0.72, 4, 0.2), mats.shirt, torso, [0, 0, 0]);
    addMesh(new RoundedBoxGeometry(0.42, 0.23, 0.055, 3, 0.025), mats.yellow, torso, [0, 0.45, 0.38]);
    const head = new THREE.Group();
    head.position.y = 1.02;
    torso.add(head);
    addMesh(new RoundedBoxGeometry(0.9, 0.86, 0.82, 5, 0.24), mats.skin, head, [0, 0, 0]);
    addMesh(new THREE.SphereGeometry(0.5, 16, 12), mats.hair, head, [0, 0.31, -0.02], [1, 0.55, 1]);
    addMesh(new THREE.SphereGeometry(0.22, 12, 10), mats.hair, head, [-0.38, 0.17, 0.16], [0.7, 1.2, 1]);
    [-0.2, 0.2].forEach((x) => {
      addMesh(new THREE.SphereGeometry(0.09, 12, 10), mats.white, head, [x, 0.07, 0.397], [0.82, 1.15, 0.48]);
      addMesh(new THREE.SphereGeometry(0.052, 10, 8), mats.eye, head, [x, 0.065, 0.435], [0.85, 1.08, 0.48]);
    });
    const smile = addMesh(new THREE.TorusGeometry(0.12, 0.018, 6, 16, Math.PI), mats.roof, head, [0.12, -0.18, 0.4]);
    smile.rotation.z = Math.PI;

    const makeLimb = (x: number, y: number, mat: THREE.Material, isArm: boolean) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, y, 0);
      avatar.add(pivot);
      const width = isArm ? 0.38 : 0.43;
      addMesh(new RoundedBoxGeometry(width, 0.9, 0.48, 4, isArm ? 0.18 : 0.2), mat, pivot, [0, -0.43, 0]);
      if (!isArm) {
        addMesh(new RoundedBoxGeometry(0.54, 0.2, 0.72, 4, 0.09), mats.shoes, pivot, [0, -0.89, 0.1]);
      }
      return pivot;
    };
    const leftArm = makeLimb(-0.88, 2.35, mats.shirt, true);
    const rightArm = makeLimb(0.88, 2.35, mats.shirt, true);
    const leftLeg = makeLimb(-0.34, 1.25, mats.pants, false);
    const rightLeg = makeLimb(0.34, 1.25, mats.pants, false);

    const crystalMats = [mats.crystal, mats.crystalPink, mats.crystalGold];
    const crystalPositions: Array<[number, number]> = [
      [-18, 28], [20, 30], [-34, 3], [36, -7], [-19, -31], [17, -48], [2, 45], [45, 8],
    ];
    const crystals: Crystal[] = crystalPositions.map(([x, z], index) => {
      const group = new THREE.Group();
      group.position.set(x, 2.3, z);
      scene.add(group);
      const crystalGeometry = new THREE.IcosahedronGeometry(0.68, 0);
      const crystal = addMesh(crystalGeometry, crystalMats[index % crystalMats.length]!, group, [0, 0, 0]);
      crystal.rotation.y = Math.PI / 4;
      const halo = addMesh(new THREE.TorusGeometry(0.95, 0.055, 8, 24), mats.yellow, group, [0, 0, 0]);
      halo.rotation.x = Math.PI / 2;
      addMesh(new THREE.SphereGeometry(0.12, 10, 8), mats.white, group, [0, 0.82, 0]);
      return { group, home: group.position.clone(), phase: index * 0.8, collected: false };
    });

    const playerPosition = new THREE.Vector3(0, 1.68, 43);
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
      const dt = Math.min((now - lastFrameTime) / 1000, 0.04);
      lastFrameTime = now;
      const input = keysRef.current;
      const forward = Number(input.has("w") || input.has("arrowup")) - Number(input.has("s") || input.has("arrowdown"));
      const sideways = Number(input.has("d") || input.has("arrowright")) - Number(input.has("a") || input.has("arrowleft"));
      const moving = forward !== 0 || sideways !== 0;

      if (!pendingCrystalRef.current) {
        const direction = new THREE.Vector3(
          Math.sin(cameraYaw) * forward + Math.cos(cameraYaw) * sideways,
          0,
          -Math.cos(cameraYaw) * forward + Math.sin(cameraYaw) * sideways,
        );
        if (moving) {
          direction.normalize();
          const speed = input.has("shift") ? 10 : 6.2;
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
        const gait = now * 0.012;
        const stride = moving && grounded ? Math.sin(gait) * 0.55 : 0;
        leftLeg.rotation.x = stride;
        rightLeg.rotation.x = -stride;
        leftArm.rotation.x = -stride * 0.8;
        rightArm.rotation.x = stride * 0.8;
        torso.position.y = 1.9 + (moving && grounded ? Math.abs(Math.sin(gait)) * 0.045 : 0);

        const nearbyCrystal = crystals.find((crystal) => (
          !crystal.collected && crystal.group.position.distanceTo(playerPosition) < 2.15
        ));
        if (nearbyCrystal) {
          nearbyCrystal.collected = true;
          nearbyCrystal.group.visible = false;
          pendingCrystalRef.current = nearbyCrystal;
          setQuestion(makeQuestion());
          setAnswerFeedback(null);
        }
      }

      crystals.forEach((crystal) => {
        if (crystal.collected) return;
        crystal.group.rotation.y = now * 0.0007 + crystal.phase;
        crystal.group.position.y = crystal.home.y + Math.sin(now * 0.002 + crystal.phase) * 0.22;
      });
      cameraTarget.set(playerPosition.x, playerPosition.y + 1.45, playerPosition.z);
      const cameraDistance = 8.5;
      cameraPosition.set(
        playerPosition.x + Math.sin(cameraYaw) * Math.cos(cameraPitch) * cameraDistance,
        playerPosition.y + 2.1 + Math.sin(cameraPitch) * cameraDistance,
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
      renderer.dispose();
      renderer.domElement.remove();
      keysRef.current.clear();
    };
  }, [gameStarted, selectedIsland]);

  const answerQuestion = (answer: number) => {
    if (!question || !pendingCrystalRef.current) return;
    if (answer !== question.answer) {
      setAnswerFeedback("Belum tepat. Coba hitung sekali lagi!");
      return;
    }
    const crystal = pendingCrystalRef.current;
    const angle = Math.random() * Math.PI * 2;
    const radius = 16 + Math.random() * 38;
    crystal.home.set(Math.cos(angle) * radius, 2.3, Math.sin(angle) * radius);
    crystal.group.position.copy(crystal.home);
    crystal.group.visible = true;
    crystal.collected = false;
    pendingCrystalRef.current = null;
    setScore((value) => value + 10);
    setQuestion(null);
    setAnswerFeedback(null);
  };

  useEffect(() => {
    if (!question) pendingCrystalRef.current = null;
  }, [question]);

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
        .world-rules{display:grid;gap:11px;margin:16px 0 0;padding:14px;border:1px dashed #bfd7ea;border-radius:17px;background:#f5fbff}
        .world-rule{display:grid;grid-template-columns:27px 1fr;align-items:start;gap:8px;color:#607b9c;font-size:11px;font-weight:650;line-height:1.45}
        .world-rule-icon{display:grid;place-items:center;width:25px;height:25px;border-radius:9px;background:#e2f3ff;font-size:14px}
        .world-rule strong{color:#3f628d}
        .world-start-button{display:flex;justify-content:center;align-items:center;gap:10px;width:100%;min-height:54px;margin-top:15px;border:0;border-radius:17px;background:linear-gradient(135deg,#29cda9,#16a991);color:#fff;font:900 12px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.04em;box-shadow:0 6px 0 #168d7d,0 10px 20px rgba(28,174,148,.2);cursor:pointer;transition:transform .15s,filter .15s}
        .world-start-button:hover{transform:translateY(-2px);filter:brightness(1.05)}
        .world-start-button:active{transform:translateY(3px);box-shadow:0 3px 0 #168d7d}
        .world-start-button:focus-visible,.world-island-card:focus-visible,.world-start-back:focus-visible{outline:3px solid #ffbc58;outline-offset:3px}
        @media(max-width:600px){.world-top{align-items:flex-start}.world-brand{gap:7px}.world-title{font-size:clamp(11px,3.2vw,17px)}.world-subtitle{display:none}.world-brand-mark{width:34px;height:34px}.world-back{min-height:36px;padding:7px 9px;font-size:9px}.world-score{min-height:36px;padding:7px 10px;font-size:11px}.world-bottom{bottom:102px;max-width:calc(100vw - 26px);font-size:10px}.world-mobile-controls{grid-template-columns:repeat(3,42px);grid-template-rows:repeat(2,42px);gap:4px;left:12px;bottom:14px}.world-jump{right:14px;bottom:20px;width:58px;height:58px}}
        @media(max-width:760px){.world-start-screen{place-items:start center;padding:14px}.world-start-content{margin:auto}.world-start-top{margin-bottom:13px}.world-start-heading{margin-bottom:16px}.world-start-mark{width:47px;height:47px;margin-bottom:9px;border-radius:16px}.world-lobby{grid-template-columns:1fr;gap:11px}.world-lobby-panel{padding:15px;border-radius:20px}.world-lobby-panel h2{font-size:13px}.world-lobby-intro{margin-bottom:12px;font-size:11px}.world-rules{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px;padding:10px}.world-rule{font-size:10px}.world-start-button{min-height:48px;margin-top:12px}}
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
                <p className="world-start-subtitle">Pilih pulau, jelajahi dunia, kumpulkan kristal! ✨</p>
              </header>
              <div className="world-lobby">
                <section className="world-lobby-panel" aria-labelledby="world-rules-title">
                  <h2 id="world-rules-title">CARA BERMAIN</h2>
                  <p className="world-lobby-intro">Siap jadi penjelajah cilik? Ikuti aturan mudah ini!</p>
                  <div className="world-rules">
                    <div className="world-rule"><span className="world-rule-icon">🕹️</span><span><strong>Jelajahi pulau</strong><br />WASD / tombol arah untuk bergerak, seret layar untuk melihat.</span></div>
                    <div className="world-rule"><span className="world-rule-icon">🦘</span><span><strong>Melompat</strong><br />Tekan SPACE atau tombol LOMPAT.</span></div>
                    <div className="world-rule"><span className="world-rule-icon">💎</span><span><strong>Ambil kristal</strong><br />Dekati kristal untuk membuka soal matematika.</span></div>
                    <div className="world-rule"><span className="world-rule-icon">⭐</span><span><strong>Kumpulkan poin</strong><br />Jawaban benar mendapat 10 poin dan kristal baru!</span></div>
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
                  <button className="world-start-button" type="button" onClick={() => setGameStarted(true)}>
                    <Sparkles size={17} /> MULAI PETUALANGAN <span aria-hidden="true">→</span>
                  </button>
                </section>
              </div>
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
                  <div className="world-subtitle">{ISLANDS.find(({ id }) => id === selectedIsland)?.emoji} {ISLANDS.find(({ id }) => id === selectedIsland)?.name} · jelajahi dan kumpulkan kristal!</div>
                </div>
              </div>
              <div className="world-score" aria-live="polite"><Gem size={17} /> {score} POIN</div>
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
      </div>
      {question && (
        <div className="world-question-layer">
          <section className="world-question-card" role="dialog" aria-modal="true" aria-labelledby="world-question-title">
            <div className="world-question-kicker"><Gem size={15} /> KRISTAL MATEMATIKA</div>
            <h2 className="world-question-title" id="world-question-title">Jawab untuk kumpulkan!</h2>
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
