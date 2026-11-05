import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, Gem, Sparkles } from "lucide-react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

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
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<WorldQuestion | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
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
    scene.background = new THREE.Color("#91ddff");
    scene.fog = new THREE.Fog("#91ddff", 65, 145);
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 180);
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
      grass: makeMaterial("#70cf66"),
      grassLight: makeMaterial("#9be36b"),
      water: makeMaterial("#42c7e8", 0.36),
      path: makeMaterial("#f6d58a"),
      wood: makeMaterial("#bd7951"),
      roof: makeMaterial("#ff806d"),
      blue: makeMaterial("#5495ef"),
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
      leaf: makeMaterial("#42b96b"),
      leafLight: makeMaterial("#85dc65"),
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

    addMesh(new THREE.PlaneGeometry(180, 180), mats.water, scene, [0, -1.45, 0]).rotation.x = -Math.PI / 2;
    addMesh(new THREE.CylinderGeometry(43, 46, 2.5, 64), mats.path, scene, [0, -0.5, 0]);
    addMesh(new THREE.CylinderGeometry(41.5, 42, 0.85, 64), mats.grass, scene, [0, 0.95, 0]);
    addMesh(new THREE.CylinderGeometry(38, 38, 0.12, 64), mats.grassLight, scene, [0, 1.4, 0]);

    const mainPath = addMesh(new THREE.BoxGeometry(6.5, 0.08, 52), mats.path, scene, [0, 1.48, 7]);
    mainPath.rotation.y = -0.08;
    const crossPath = addMesh(new THREE.BoxGeometry(52, 0.08, 5), mats.path, scene, [0, 1.48, -5]);
    crossPath.rotation.y = -0.08;

    const makeTree = (x: number, z: number, size: number, variant: number) => {
      const tree = new THREE.Group();
      tree.position.set(x, 1.45, z);
      scene.add(tree);
      addBox(tree, mats.trunk, [0, size * 0.72, 0], [size * 0.32, size * 1.45, size * 0.32]);
      addBox(tree, variant % 2 ? mats.leafLight : mats.leaf, [0, size * 1.82, 0], [size * 1.38, size * 0.95, size * 1.38]);
      addBox(tree, variant % 2 ? mats.leaf : mats.leafLight, [0, size * 2.42, 0], [size * 0.9, size * 0.82, size * 0.9]);
      addBox(tree, mats.grassLight, [0, size * 2.92, 0], [size * 0.45, size * 0.45, size * 0.45]);
    };
    [
      [-29, -26, 2.5], [-22, -33, 2], [-34, -9, 2.2], [-31, 14, 2.4],
      [29, -28, 2.2], [34, -5, 2.6], [30, 20, 2.1], [21, 31, 2.4],
      [-19, 31, 2], [-36, 24, 2.1], [12, -34, 2], [37, 12, 2],
    ].forEach(([x, z, size], index) => makeTree(x!, z!, size!, index));

    const makeHouse = (x: number, z: number, wall: THREE.Material, roof: THREE.Material) => {
      const house = new THREE.Group();
      house.position.set(x, 1.46, z);
      scene.add(house);
      addBox(house, wall, [0, 2, 0], [7, 4, 6]);
      addBox(house, roof, [0, 4.5, 0], [7.8, 1, 6.8]);
      addBox(house, mats.wood, [0, 0.9, 3.08], [1.35, 2.2, 0.14]);
      addBox(house, mats.blue, [-2.15, 2.35, 3.1], [1.1, 1.05, 0.13]);
      addBox(house, mats.blue, [2.15, 2.35, 3.1], [1.1, 1.05, 0.13]);
      addBox(house, mats.white, [0, 3.3, 3.12], [0.2, 1.2, 0.12]);
      addBox(house, mats.white, [0, 3.3, 3.12], [1.2, 0.2, 0.12]);
    };
    makeHouse(-17, -17, mats.yellow, mats.roof);
    makeHouse(18, -21, mats.white, mats.blue);
    makeHouse(18, 14, mats.roof, mats.yellow);

    const arch = new THREE.Group();
    arch.position.set(0, 1.5, 30);
    scene.add(arch);
    addBox(arch, mats.roof, [-5.1, 3.2, 0], [1.15, 6.4, 0.85]);
    addBox(arch, mats.blue, [5.1, 3.2, 0], [1.15, 6.4, 0.85]);
    addBox(arch, mats.yellow, [0, 6.2, 0], [11.4, 1.3, 0.9]);
    addBox(arch, mats.white, [0, 6.18, 0.5], [8.8, 0.38, 0.08]);

    const avatar = new THREE.Group();
    scene.add(avatar);
    const torso = new THREE.Group();
    torso.position.y = 1.9;
    avatar.add(torso);
    addBox(torso, mats.shirt, [0, 0, 0], [1.25, 1.3, 0.72]);
    addBox(torso, mats.yellow, [0, 0.45, 0.39], [0.42, 0.23, 0.055]);
    const head = new THREE.Group();
    head.position.y = 1.02;
    torso.add(head);
    addBox(head, mats.skin, [0, 0, 0], [0.9, 0.86, 0.82]);
    addBox(head, mats.hair, [0, 0.41, -0.02], [0.94, 0.2, 0.86]);
    addBox(head, mats.hair, [-0.38, 0.22, 0.19], [0.17, 0.4, 0.52]);
    addBox(head, mats.eye, [-0.2, 0.07, 0.425], [0.08, 0.12, 0.04]);
    addBox(head, mats.eye, [0.2, 0.07, 0.425], [0.08, 0.12, 0.04]);
    addBox(head, mats.white, [-0.2, 0.1, 0.45], [0.025, 0.035, 0.015]);
    addBox(head, mats.white, [0.2, 0.1, 0.45], [0.025, 0.035, 0.015]);
    addBox(head, mats.roof, [0.12, -0.18, 0.43], [0.24, 0.045, 0.04]);

    const makeLimb = (x: number, y: number, mat: THREE.Material, isArm: boolean) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, y, 0);
      avatar.add(pivot);
      addBox(pivot, mat, [0, -0.43, 0], [isArm ? 0.38 : 0.43, 0.9, 0.48]);
      if (!isArm) addBox(pivot, mats.shoes, [0, -0.89, 0.1], [0.54, 0.2, 0.72]);
      return pivot;
    };
    const leftArm = makeLimb(-0.88, 2.35, mats.shirt, true);
    const rightArm = makeLimb(0.88, 2.35, mats.shirt, true);
    const leftLeg = makeLimb(-0.34, 1.25, mats.pants, false);
    const rightLeg = makeLimb(0.34, 1.25, mats.pants, false);

    const crystalMats = [mats.crystal, mats.crystalPink, mats.crystalGold];
    const crystalPositions: Array<[number, number]> = [
      [-8, 13], [9, 14], [-15, 1], [15, -3], [-8, -13], [8, -25], [0, 23], [25, 3],
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

    const playerPosition = new THREE.Vector3(0, 1.46, 22);
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
    const maxIslandRadius = 38;

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
        if (playerPosition.y <= 1.46) {
          playerPosition.y = 1.46;
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
  }, []);

  const answerQuestion = (answer: number) => {
    if (!question || !pendingCrystalRef.current) return;
    if (answer !== question.answer) {
      setAnswerFeedback("Belum tepat. Coba hitung sekali lagi!");
      return;
    }
    const crystal = pendingCrystalRef.current;
    const angle = Math.random() * Math.PI * 2;
    const radius = 8 + Math.random() * 22;
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
        .world-page{position:relative;width:100%;height:100dvh;min-height:480px;overflow:hidden;background:#85dfff;color:#fff;font-family:var(--font-body,'Exo 2'),sans-serif}
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
        @media(max-width:600px){.world-top{align-items:flex-start}.world-brand{gap:7px}.world-title{font-size:clamp(11px,3.2vw,17px)}.world-subtitle{display:none}.world-brand-mark{width:34px;height:34px}.world-back{min-height:36px;padding:7px 9px;font-size:9px}.world-score{min-height:36px;padding:7px 10px;font-size:11px}.world-bottom{bottom:102px;max-width:calc(100vw - 26px);font-size:10px}.world-mobile-controls{grid-template-columns:repeat(3,42px);grid-template-rows:repeat(2,42px);gap:4px;left:12px;bottom:14px}.world-jump{right:14px;bottom:20px;width:58px;height:58px}}
        @media(prefers-reduced-motion:reduce){.world-answer:hover{transform:none}}
      `}</style>
      <div ref={hostRef} className="absolute inset-0">
        {!question && (
          <div className="world-hud">
            <header className="world-top">
              <div className="world-brand">
                <button className="world-back" onClick={() => navigate("/ruang-untuk-guru/numatik-game")} aria-label="Kembali ke menu Numatik Game">
                  <ArrowLeft size={15} /> MENU
                </button>
                <div className="world-brand-mark"><Sparkles size={21} /></div>
                <div>
                  <div className="world-title">NUMATIK WORLD</div>
                  <div className="world-subtitle">Jelajahi, temukan kristal, dan belajar!</div>
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
