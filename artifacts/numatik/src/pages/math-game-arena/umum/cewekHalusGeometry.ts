import * as THREE from "three";

export const CEWEK_HALUS_BONE_NAMES = [
  "pelvis", "spine1", "spine2", "neck", "head", "ponytail",
  "leftClavicle", "leftUpperArm", "leftForearm", "leftHand", "leftThigh", "leftShin", "leftFoot", "leftToe",
  "rightClavicle", "rightUpperArm", "rightForearm", "rightHand", "rightThigh", "rightShin", "rightFoot", "rightToe",
] as const;

export type CewekHalusGeometryConfig = {
  skinColor: string;
  gridStep: number;
  bounds: { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number };
  bodyBlend: number;
  shoulderBlend: number;
  elbowBlend: number;
  wristBlend: number;
  hipBlend: number;
  kneeBlend: number;
  ankleBlend: number;
  blendBand: number;
  blendFraction: number;
  hipWeightFraction: number;
  groundOffset: number;
  shoulderBindEndY: number;
  capsules?: readonly CewekHalusCapsule[];
  armWeightZone?: { minY: number; maxY: number; minAbsX: number };
  legWeightZone?: { minY: number; maxY: number; minAbsX: number };
  shoulderBlendRamp?: readonly [number, number];
  hipBlendRamp?: readonly [number, number];
  minimumThighGap?: number;
  includeTriangleDiagnostics?: boolean;
  colorAt?: (point: readonly [number, number, number], target: THREE.Color) => void;
  uvAt?: (point: readonly [number, number, number], target: THREE.Vector2) => void;
};

export type CewekHalusSegmentGroup = "body" | "leftArm" | "rightArm" | "leftLeg" | "rightLeg";

export type CewekHalusCapsule = {
  group: CewekHalusSegmentGroup;
  start: [number, number, number];
  end: [number, number, number];
  startRadius: [number, number];
  endRadius: [number, number];
  owner: string;
  proximal: string;
  distal: string;
};

type Capsule = CewekHalusCapsule;
type CapsuleDistance = { distance: number; t: number };
export type CewekHalusArmPose = {
  upperArmRotationX: number;
  upperArmRotationZ: number;
  forearmRotationX: number;
  handRotationX: number;
};

export type CewekHalusGeometryResult = {
  geometry: THREE.BufferGeometry;
  triangleCount: number;
  vertexCount: number;
  elapsedMs: number;
  minimumArmBodyGap: number;
  minimumThighGap: number;
  zeroWeightVertexCount: number;
  invalidWeightVertexCount: number;
  verticesInsideMultipleCapsules: number;
  armWeightLeakVertexCount: number;
  inwardTriangleCount?: number;
};

const smoothStep = (value: number) => {
  const t = THREE.MathUtils.clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};

const smoothMinimum = (first: number, second: number, blend: number) => {
  if (blend <= 0) return Math.min(first, second);
  const h = Math.max(blend - Math.abs(first - second), 0) / blend;
  return Math.min(first, second) - h * h * blend * 0.25;
};

const makeCapsule = (
  group: CewekHalusSegmentGroup,
  start: [number, number, number],
  end: [number, number, number],
  startRadius: [number, number],
  endRadius: [number, number],
  owner: string,
  proximal: string,
  distal: string,
): Capsule => ({ group, start, end, startRadius, endRadius, owner, proximal, distal });

const capsuleDistance = (point: [number, number, number], capsule: Capsule): CapsuleDistance => {
  const deltaX = capsule.end[0] - capsule.start[0];
  const deltaY = capsule.end[1] - capsule.start[1];
  const deltaZ = capsule.end[2] - capsule.start[2];
  const lengthSquared = deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;
  const length = Math.sqrt(lengthSquared);
  const rawT = lengthSquared > 1e-10
    ? ((point[0] - capsule.start[0]) * deltaX
      + (point[1] - capsule.start[1]) * deltaY
      + (point[2] - capsule.start[2]) * deltaZ) / lengthSquared
    : 0;
  const t = THREE.MathUtils.clamp(rawT, 0, 1);
  const centerX = capsule.start[0] + deltaX * t;
  const centerY = capsule.start[1] + deltaY * t;
  const centerZ = capsule.start[2] + deltaZ * t;
  const radiusX = THREE.MathUtils.lerp(capsule.startRadius[0], capsule.endRadius[0], t);
  const radiusZ = THREE.MathUtils.lerp(capsule.startRadius[1], capsule.endRadius[1], t);
  const offsetX = point[0] - centerX;
  const offsetZ = point[2] - centerZ;
  if (rawT < 0 || rawT > 1) {
    const capRadius = Math.min(radiusX, radiusZ);
    const axial = (rawT < 0 ? -rawT : rawT - 1) * length;
    const capDistance = (Math.sqrt((offsetX / radiusX) ** 2 + (offsetZ / radiusZ) ** 2 + (axial / capRadius) ** 2) - 1) * capRadius;
    return { distance: capDistance, t };
  }
  const radial = (Math.hypot(offsetX / radiusX, offsetZ / radiusZ) - 1) * Math.min(radiusX, radiusZ);
  return { distance: radial, t };
};

const capsuleFieldDistance = (x: number, y: number, z: number, capsule: Capsule) => {
  const deltaX = capsule.end[0] - capsule.start[0];
  const deltaY = capsule.end[1] - capsule.start[1];
  const deltaZ = capsule.end[2] - capsule.start[2];
  const lengthSquared = deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;
  const length = Math.sqrt(lengthSquared);
  const rawT = lengthSquared > 1e-10
    ? ((x - capsule.start[0]) * deltaX + (y - capsule.start[1]) * deltaY + (z - capsule.start[2]) * deltaZ) / lengthSquared
    : 0;
  const t = THREE.MathUtils.clamp(rawT, 0, 1);
  const centerX = capsule.start[0] + deltaX * t;
  const centerZ = capsule.start[2] + deltaZ * t;
  const radiusX = THREE.MathUtils.lerp(capsule.startRadius[0], capsule.endRadius[0], t);
  const radiusZ = THREE.MathUtils.lerp(capsule.startRadius[1], capsule.endRadius[1], t);
  const offsetX = x - centerX;
  const offsetZ = z - centerZ;
  if (rawT < 0 || rawT > 1) {
    const capRadius = Math.min(radiusX, radiusZ);
    const axial = (rawT < 0 ? -rawT : rawT - 1) * length;
    return (Math.sqrt((offsetX / radiusX) ** 2 + (offsetZ / radiusZ) ** 2 + (axial / capRadius) ** 2) - 1) * capRadius;
  }
  return (Math.hypot(offsetX / radiusX, offsetZ / radiusZ) - 1) * Math.min(radiusX, radiusZ);
};

export const measureCewekHalusArmBodyClearance = (
  capsules: readonly CewekHalusCapsule[],
  bodyBlend: number,
  side: "left" | "right",
  pose: CewekHalusArmPose,
) => {
  const bodyCapsules = capsules.filter((capsule) => capsule.group === "body");
  const armCapsules = capsules.filter((capsule) => capsule.group === `${side}Arm`);
  const upperArm = armCapsules.find((capsule) => capsule.owner === `${side}UpperArm`);
  const forearm = armCapsules.find((capsule) => capsule.owner === `${side}Forearm`);
  const hand = armCapsules.find((capsule) => capsule.owner === `${side}Hand`);
  if (!upperArm || !forearm || !hand || bodyCapsules.length === 0) {
    throw new Error(`Kapsul lengan atau tubuh ${side} tidak lengkap untuk pengukuran celah.`);
  }

  const upperOrigin = new THREE.Vector3(...upperArm.start);
  const upperRotation = new THREE.Euler(
    pose.upperArmRotationX,
    0,
    pose.upperArmRotationZ,
    "XYZ",
  );
  const forearmRotation = new THREE.Euler(pose.forearmRotationX, 0, 0, "XYZ");
  const handRotation = new THREE.Euler(pose.handRotationX, 0, 0, "XYZ");
  const forearmOrigin = new THREE.Vector3(...forearm.start)
    .sub(upperOrigin)
    .applyEuler(upperRotation)
    .add(upperOrigin);
  const handOrigin = new THREE.Vector3(...hand.start)
    .sub(upperOrigin)
    .applyEuler(upperRotation)
    .add(upperOrigin)
    .sub(forearmOrigin)
    .applyEuler(forearmRotation)
    .add(forearmOrigin);
  const transformPoint = (source: THREE.Vector3, owner: string) => {
    if (owner.endsWith("Clavicle")) return source.clone();
    const point = source.sub(upperOrigin).applyEuler(upperRotation).add(upperOrigin);
    if (owner.endsWith("Forearm") || owner.endsWith("Hand")) {
      point.sub(forearmOrigin).applyEuler(forearmRotation).add(forearmOrigin);
    }
    if (owner.endsWith("Hand")) {
      point.sub(handOrigin).applyEuler(handRotation).add(handOrigin);
    }
    return point;
  };
  const bodyDistance = (point: THREE.Vector3) => bodyCapsules.reduce((distance, capsule, index) => {
    const current = capsuleFieldDistance(point.x, point.y, point.z, capsule);
    return index === 0 ? current : smoothMinimum(distance, current, bodyBlend);
  }, Number.POSITIVE_INFINITY);

  let minimumGap = Number.POSITIVE_INFINITY;
  armCapsules.forEach((capsule) => {
    if (capsule.owner.endsWith("Clavicle")) return;
    const firstSample = capsule.owner.endsWith("UpperArm") ? 0.25 : 0;
    for (let sample = 0; sample <= 96; sample += 1) {
      const t = firstSample + (1 - firstSample) * sample / 96;
      const source = new THREE.Vector3(
        THREE.MathUtils.lerp(capsule.start[0], capsule.end[0], t),
        THREE.MathUtils.lerp(capsule.start[1], capsule.end[1], t),
        THREE.MathUtils.lerp(capsule.start[2], capsule.end[2], t),
      );
      const point = transformPoint(source, capsule.owner);
      const radius = Math.max(
        THREE.MathUtils.lerp(capsule.startRadius[0], capsule.endRadius[0], t),
        THREE.MathUtils.lerp(capsule.startRadius[1], capsule.endRadius[1], t),
      );
      minimumGap = Math.min(minimumGap, bodyDistance(point) - radius);
    }
  });
  return minimumGap;
};

export const buildCewekHalusGeometry = async (
  config: CewekHalusGeometryConfig,
  boneIndices: ReadonlyMap<string, number>,
  onProgress?: (progress: number) => void,
  shouldCancel?: () => boolean,
): Promise<CewekHalusGeometryResult | null> => {
  const startedAt = performance.now();
  const { bounds } = config;
  const step = config.gridStep;
  const nx = Math.ceil((bounds.maxX - bounds.minX) / step);
  const ny = Math.ceil((bounds.maxY - bounds.minY) / step);
  const nz = Math.ceil((bounds.maxZ - bounds.minZ) / step);
  const strideX = nx + 1;
  const strideY = ny + 1;
  const gridIndex = (x: number, y: number, z: number) => (z * strideY + y) * strideX + x;
  const cellIndex = (x: number, y: number, z: number) => (z * ny + y) * nx + x;

  const defaultCapsules: Capsule[] = [
    makeCapsule("body", [0, 0.77, 0], [0, 0.97, 0], [0.18, 0.14], [0.17, 0.135], "pelvis", "pelvis", "spine1"),
    makeCapsule("body", [0, 0.94, 0], [0, 1.17, 0], [0.145, 0.12], [0.14, 0.115], "spine1", "pelvis", "spine2"),
    makeCapsule("body", [0, 1.14, 0], [0, 1.4, 0], [0.15, 0.12], [0.14, 0.11], "spine2", "spine1", "neck"),
    makeCapsule("body", [0, 1.36, 0], [0, 1.62, 0], [0.08, 0.075], [0.075, 0.07], "neck", "spine2", "head"),
    makeCapsule("body", [0, 1.61, 0], [0, 1.82, 0], [0.30, 0.235], [0.30, 0.235], "head", "neck", "head"),
  ];
  const generatedCapsules = [...defaultCapsules];

  for (const side of [-1, 1] as const) {
    const prefix = side < 0 ? "left" : "right";
    const group: CewekHalusSegmentGroup = side < 0 ? "leftArm" : "rightArm";
    const legGroup: CewekHalusSegmentGroup = side < 0 ? "leftLeg" : "rightLeg";
    const x = (value: number) => side * value;
    generatedCapsules.push(
      makeCapsule(group, [x(0.14), 1.34, 0], [x(0.27), 1.31, 0], [0.04, 0.04], [0.043, 0.04], `${prefix}Clavicle`, "spine2", `${prefix}UpperArm`),
      makeCapsule(group, [x(0.27), 1.31, 0], [x(0.30), 1.04, 0], [0.043, 0.04], [0.04, 0.038], `${prefix}UpperArm`, `${prefix}Clavicle`, `${prefix}Forearm`),
      makeCapsule(group, [x(0.30), 1.04, 0], [x(0.32), 0.81, 0], [0.04, 0.038], [0.033, 0.031], `${prefix}Forearm`, `${prefix}UpperArm`, `${prefix}Hand`),
      makeCapsule(group, [x(0.32), 0.81, 0], [x(0.325), 0.74, 0], [0.033, 0.031], [0.027, 0.027], `${prefix}Hand`, `${prefix}Forearm`, `${prefix}Hand`),
      makeCapsule(legGroup, [x(0.15), 0.86, 0], [x(0.18), 0.5, 0], [0.06, 0.055], [0.058, 0.053], `${prefix}Thigh`, "pelvis", `${prefix}Shin`),
      makeCapsule(legGroup, [x(0.18), 0.5, 0], [x(0.18), 0.16, 0], [0.053, 0.05], [0.038, 0.037], `${prefix}Shin`, `${prefix}Thigh`, `${prefix}Foot`),
      makeCapsule(legGroup, [x(0.18), 0.16, 0], [x(0.18), 0.075, 0.14], [0.06, 0.052], [0.035, 0.038], `${prefix}Foot`, `${prefix}Shin`, `${prefix}Toe`),
    );
  }
  const capsules = config.capsules?.map((capsule) => ({ ...capsule })) ?? generatedCapsules;

  const groupedCapsules = new Map<CewekHalusSegmentGroup, Capsule[]>();
  capsules.forEach((capsule) => {
    const group = groupedCapsules.get(capsule.group) ?? [];
    group.push(capsule);
    groupedCapsules.set(capsule.group, group);
  });
  const groupDistance = (x: number, y: number, z: number, group: CewekHalusSegmentGroup, joinBlend: number | readonly number[]) => {
    const segments = groupedCapsules.get(group)!;
    let distance = Number.POSITIVE_INFINITY;
    segments.forEach((capsule, index) => {
      const current = capsuleFieldDistance(x, y, z, capsule);
      const blend = Array.isArray(joinBlend) ? joinBlend[index - 1] ?? 0 : joinBlend;
      distance = index === 0 ? current : smoothMinimum(distance, current, blend);
    });
    return distance;
  };
  const bodyDistance = (x: number, y: number, z: number) => groupDistance(x, y, z, "body", config.bodyBlend);
  const fieldAt = (x: number, y: number, z: number) => {
    const body = bodyDistance(x, y, z);
    const [shoulderStart, shoulderEnd] = config.shoulderBlendRamp ?? [1.17, 1.36];
    const [hipStart, hipEnd] = config.hipBlendRamp ?? [0.62, 0.86];
    const shoulderBlend = config.shoulderBlend * smoothStep((y - shoulderStart) / (shoulderEnd - shoulderStart));
    const hipBlend = config.hipBlend * smoothStep((y - hipStart) / (hipEnd - hipStart));
    const leftArm = smoothMinimum(
      body,
      groupDistance(x, y, z, "leftArm", [config.elbowBlend, config.wristBlend]),
      shoulderBlend,
    );
    const rightArm = smoothMinimum(
      body,
      groupDistance(x, y, z, "rightArm", [config.elbowBlend, config.wristBlend]),
      shoulderBlend,
    );
    const leftLeg = smoothMinimum(
      body,
      groupDistance(x, y, z, "leftLeg", [config.kneeBlend, config.ankleBlend]),
      hipBlend,
    );
    const rightLeg = smoothMinimum(
      body,
      groupDistance(x, y, z, "rightLeg", [config.kneeBlend, config.ankleBlend]),
      hipBlend,
    );
    return Math.min(body, leftArm, rightArm, leftLeg, rightLeg);
  };

  let minimumArmBodyGap = Number.POSITIVE_INFINITY;
  capsules.filter(({ group }) => group === "leftArm" || group === "rightArm").forEach((capsule) => {
    for (let sample = 0; sample <= 64; sample += 1) {
      const t = sample / 64;
      const y = THREE.MathUtils.lerp(capsule.start[1], capsule.end[1], t);
      if (y > config.shoulderBindEndY) continue;
      const point: [number, number, number] = [
        THREE.MathUtils.lerp(capsule.start[0], capsule.end[0], t),
        y,
        THREE.MathUtils.lerp(capsule.start[2], capsule.end[2], t),
      ];
      const radius = THREE.MathUtils.lerp(capsule.startRadius[0], capsule.endRadius[0], t);
      minimumArmBodyGap = Math.min(minimumArmBodyGap, bodyDistance(point[0], point[1], point[2]) - radius);
    }
  });
  const minimumThighGap = config.minimumThighGap ?? 2 * (0.18 - 0.058);

  const scalar = new Float32Array(strideX * strideY * (nz + 1));
  for (let z = 0; z <= nz; z += 1) {
    const worldZ = bounds.minZ + z * step;
    for (let y = 0; y <= ny; y += 1) {
      const worldY = bounds.minY + y * step;
      for (let x = 0; x <= nx; x += 1) {
        scalar[gridIndex(x, y, z)] = fieldAt(bounds.minX + x * step, worldY, worldZ);
      }
    }
    if (z % 2 === 1) {
      onProgress?.(z / nz * 0.55);
      if (shouldCancel?.()) return null;
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }

  const cellVertices = new Int32Array(nx * ny * nz);
  cellVertices.fill(-1);
  const positions: number[] = [];
  const colors: number[] = [];
  const skinIndices: number[] = [];
  const skinWeights: number[] = [];
  const uvs: number[] = [];
  let zeroWeightVertexCount = 0;
  let invalidWeightVertexCount = 0;
  let verticesInsideMultipleCapsules = 0;
  let armWeightLeakVertexCount = 0;
  const cornerOffsets: ReadonlyArray<readonly [number, number, number]> = [
    [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
    [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
  ];
  const cubeEdges: ReadonlyArray<readonly [number, number]> = [
    [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  const skinColor = new THREE.Color(config.skinColor);
  const outputColor = new THREE.Color();
  const outputUv = new THREE.Vector2();
  const addSurfaceVertex = (point: [number, number, number]) => {
    const index = positions.length / 3;
    positions.push(...point);
    if (config.uvAt) {
      config.uvAt(point, outputUv);
      uvs.push(outputUv.x, outputUv.y);
    }
    const side = point[0] < 0 ? "left" : "right";
    const armZone = config.armWeightZone ?? { minY: 0.72, maxY: 1.4, minAbsX: 0.2 };
    const legZone = config.legWeightZone ?? { minY: -0.08, maxY: 1, minAbsX: 0.12 };
    const armCandidates = capsules.filter((capsule) => (
      capsule.group === `${side}Arm`
      && point[1] >= armZone.minY
      && point[1] <= armZone.maxY
      && Math.abs(point[0]) >= armZone.minAbsX
    ));
    const nearestArm = armCandidates
      .map((capsule) => ({ capsule, ...capsuleDistance(point, capsule) }))
      .sort((first, second) => first.distance - second.distance)[0];
    const armField = armCandidates.length > 0
      ? groupDistance(point[0], point[1], point[2], `${side}Arm`, [config.elbowBlend, config.wristBlend])
      : Number.POSITIVE_INFINITY;
    const bodyField = armCandidates.length > 0
      ? bodyDistance(point[0], point[1], point[2])
      : Number.POSITIVE_INFINITY;
    const isShoulderRoot = (nearestArm?.capsule.owner.endsWith("Clavicle") && nearestArm.t >= 0.75)
      || (nearestArm?.capsule.owner.endsWith("UpperArm") && nearestArm.t <= 0.25);
    const shoulderBlendWidth = config.shoulderBlend + step * 0.1;
    const armWeightAllowed = armCandidates.length > 0 && (
      armField <= bodyField
      || (isShoulderRoot && armField - bodyField <= shoulderBlendWidth)
    );
    const allowed = capsules.filter((capsule) => {
      if (capsule.group === "body") return true;
      if (capsule.group.endsWith("Arm")) {
        return armWeightAllowed && capsule.group === `${side}Arm` && armCandidates.includes(capsule);
      }
      const inLegZone = point[1] >= legZone.minY
        && point[1] <= legZone.maxY
        && Math.abs(point[0]) >= legZone.minAbsX;
      return capsule.group === `${side}Leg` && inLegZone;
    });
    const nearest = allowed
      .map((capsule) => ({ capsule, ...capsuleDistance(point, capsule) }))
      .sort((first, second) => first.distance - second.distance)
      .slice(0, 2);
    const contributions = new Map<string, number>();
    if (nearest.length > 0) {
      const delta = nearest.length > 1 ? nearest[1]!.distance - nearest[0]!.distance : Number.POSITIVE_INFINITY;
      const blend = delta < config.blendBand ? 0.5 * (1 - smoothStep(delta / config.blendBand)) : 0;
      nearest.forEach(({ capsule, t }, capsuleIndex) => {
        const capsuleWeight = capsuleIndex === 0 ? 1 - blend : blend;
        if (capsuleWeight <= 0) return;
        const proximalFraction = capsule.owner.endsWith("Thigh")
          ? config.hipWeightFraction
          : config.blendFraction;
        const proximalWeight = t < proximalFraction
          ? 1 - smoothStep(t / proximalFraction)
          : 0;
        const distalWeight = t > 1 - config.blendFraction
          ? smoothStep((t - (1 - config.blendFraction)) / config.blendFraction)
          : 0;
        const ownerWeight = Math.max(0, 1 - proximalWeight - distalWeight);
        [[capsule.proximal, proximalWeight], [capsule.owner, ownerWeight], [capsule.distal, distalWeight]].forEach(([name, weight]) => {
          if (typeof name !== "string" || typeof weight !== "number" || weight <= 0) return;
          contributions.set(name, (contributions.get(name) ?? 0) + capsuleWeight * weight);
        });
      });
    }
    let strongest = [...contributions.entries()].sort((first, second) => second[1] - first[1]).slice(0, 4);
    if (strongest.length === 0 && allowed.length > 0) {
      const owner = allowed
        .map((capsule) => ({ capsule, ...capsuleDistance(point, capsule) }))
        .sort((first, second) => first.distance - second.distance)[0]!.capsule.owner;
      strongest = [[owner, 1]];
    }
    const totalWeight = strongest.reduce((sum, [, weight]) => sum + weight, 0);
    if (!armWeightAllowed && strongest.some(([name]) => /^(left|right)(Clavicle|UpperArm|Forearm|Hand)$/.test(name))) {
      armWeightLeakVertexCount += 1;
    }
    const normalized: Array<readonly [number, number]> = totalWeight > 0
      ? strongest.map(([name, weight]) => [boneIndices.get(name) ?? 0, weight / totalWeight] as const)
      : [[0, 1]];
    const paddingCount = 4 - normalized.length;
    const paddingWeight = 1e-6;
    const retainedWeight = 1 - paddingCount * paddingWeight;
    normalized.forEach(([bone, weight]) => {
      skinIndices.push(bone);
      skinWeights.push(weight * retainedWeight);
    });
    for (let influence = 0; influence < paddingCount; influence += 1) {
      skinIndices.push(normalized[0]![0]);
      skinWeights.push(paddingWeight);
    }

    let vertexWeightSum = 0;
    let invalidWeight = false;
    let hasZeroWeight = false;
    for (let influence = 0; influence < 4; influence += 1) {
      const weight = skinWeights[skinWeights.length - 4 + influence]!;
      vertexWeightSum += weight;
      if (!Number.isFinite(weight)) invalidWeight = true;
      if (weight <= 0) hasZeroWeight = true;
    }
    if (Math.abs(vertexWeightSum - 1) > 1e-4) invalidWeight = true;
    if (invalidWeight) invalidWeightVertexCount += 1;
    if (hasZeroWeight) zeroWeightVertexCount += 1;
    let containingCapsules = 0;
    capsules.forEach((capsule) => {
      if (capsuleFieldDistance(point[0], point[1], point[2], capsule) < 0) containingCapsules += 1;
    });
    if (containingCapsules > 1) {
      verticesInsideMultipleCapsules += 1;
    }

    if (config.colorAt) {
      config.colorAt(point, outputColor);
      colors.push(outputColor.r, outputColor.g, outputColor.b);
    } else {
      const cheek = Math.exp(-((Math.abs(point[0]) - 0.19) ** 2 / 0.012 + (point[1] - 1.78) ** 2 / 0.01 + (point[2] - 0.16) ** 2 / 0.02));
      const elbow = Math.exp(-((Math.abs(point[0]) - 0.27) ** 2 / 0.002 + (point[1] - 1.0) ** 2 / 0.005));
      const knee = Math.exp(-((Math.abs(point[0]) - 0.18) ** 2 / 0.002 + (point[1] - 0.48) ** 2 / 0.006));
      const blush = Math.min(0.16, cheek * 0.13 + elbow * 0.035 + knee * 0.045);
      colors.push(
        THREE.MathUtils.lerp(skinColor.r, 1, blush),
        THREE.MathUtils.lerp(skinColor.g, 0.68, blush),
        THREE.MathUtils.lerp(skinColor.b, 0.72, blush),
      );
    }
    return index;
  };

  const values = new Float32Array(8);
  const intersections: [number, number, number][] = [];
  for (let z = 0; z < nz; z += 1) {
    for (let y = 0; y < ny; y += 1) {
      for (let x = 0; x < nx; x += 1) {
        let inside = false;
        let outside = false;
        for (let corner = 0; corner < 8; corner += 1) {
          const [dx, dy, dz] = cornerOffsets[corner]!;
          const value = scalar[gridIndex(x + dx, y + dy, z + dz)]!;
          values[corner] = value;
          inside ||= value < 0;
          outside ||= value >= 0;
        }
        if (!inside || !outside) continue;
        intersections.length = 0;
        for (const [first, second] of cubeEdges) {
          const firstValue = values[first]!;
          const secondValue = values[second]!;
          if ((firstValue < 0) === (secondValue < 0)) continue;
          const firstOffset = cornerOffsets[first]!;
          const secondOffset = cornerOffsets[second]!;
          const amount = firstValue / (firstValue - secondValue);
          intersections.push([
            bounds.minX + (x + THREE.MathUtils.lerp(firstOffset[0], secondOffset[0], amount)) * step,
            bounds.minY + (y + THREE.MathUtils.lerp(firstOffset[1], secondOffset[1], amount)) * step,
            bounds.minZ + (z + THREE.MathUtils.lerp(firstOffset[2], secondOffset[2], amount)) * step,
          ]);
        }
        const average: [number, number, number] = [0, 0, 0];
        intersections.forEach((point) => {
          average[0] += point[0] / intersections.length;
          average[1] += point[1] / intersections.length;
          average[2] += point[2] / intersections.length;
        });
        cellVertices[cellIndex(x, y, z)] = addSurfaceVertex(average);
      }
    }
    if (z % 3 === 2) {
      onProgress?.(0.55 + z / nz * 0.35);
      if (shouldCancel?.()) return null;
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }

  const indices: number[] = [];
  const addQuad = (vertices: [number, number, number, number], flip: boolean) => {
    if (vertices.some((vertex) => vertex < 0)) return;
    if (flip) indices.push(vertices[0], vertices[2], vertices[1], vertices[0], vertices[3], vertices[2]);
    else indices.push(vertices[0], vertices[1], vertices[2], vertices[0], vertices[2], vertices[3]);
  };
  for (let z = 1; z < nz; z += 1) {
    for (let y = 1; y < ny; y += 1) {
      for (let x = 0; x < nx; x += 1) {
        const first = scalar[gridIndex(x, y, z)]!;
        const second = scalar[gridIndex(x + 1, y, z)]!;
        if ((first < 0) === (second < 0)) continue;
        addQuad([
          cellVertices[cellIndex(x, y - 1, z - 1)]!,
          cellVertices[cellIndex(x, y, z - 1)]!,
          cellVertices[cellIndex(x, y, z)]!,
          cellVertices[cellIndex(x, y - 1, z)]!,
        ], first >= 0);
      }
    }
    onProgress?.(0.9 + z / nz * 0.1);
    if (z % 3 === 2) {
      if (shouldCancel?.()) return null;
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }
  for (let z = 1; z < nz; z += 1) {
    for (let y = 0; y < ny; y += 1) {
      for (let x = 1; x < nx; x += 1) {
        const first = scalar[gridIndex(x, y, z)]!;
        const second = scalar[gridIndex(x, y + 1, z)]!;
        if ((first < 0) === (second < 0)) continue;
        addQuad([
          cellVertices[cellIndex(x - 1, y, z - 1)]!,
          cellVertices[cellIndex(x - 1, y, z)]!,
          cellVertices[cellIndex(x, y, z)]!,
          cellVertices[cellIndex(x, y, z - 1)]!,
        ], first >= 0);
      }
    }
  }
  for (let z = 0; z < nz; z += 1) {
    for (let y = 1; y < ny; y += 1) {
      for (let x = 1; x < nx; x += 1) {
        const first = scalar[gridIndex(x, y, z)]!;
        const second = scalar[gridIndex(x, y, z + 1)]!;
        if ((first < 0) === (second < 0)) continue;
        addQuad([
          cellVertices[cellIndex(x - 1, y - 1, z)]!,
          cellVertices[cellIndex(x, y - 1, z)]!,
          cellVertices[cellIndex(x, y, z)]!,
          cellVertices[cellIndex(x - 1, y, z)]!,
        ], first >= 0);
      }
    }
  }

  if (shouldCancel?.()) return null;
  let inwardTriangleCount: number | undefined;
  if (config.includeTriangleDiagnostics) {
    inwardTriangleCount = 0;
    const normalProbe = step * 0.25;
    for (let triangle = 0; triangle < indices.length; triangle += 3) {
      const first = indices[triangle]! * 3;
      const second = indices[triangle + 1]! * 3;
      const third = indices[triangle + 2]! * 3;
      const edge1X = positions[second]! - positions[first]!;
      const edge1Y = positions[second + 1]! - positions[first + 1]!;
      const edge1Z = positions[second + 2]! - positions[first + 2]!;
      const edge2X = positions[third]! - positions[first]!;
      const edge2Y = positions[third + 1]! - positions[first + 1]!;
      const edge2Z = positions[third + 2]! - positions[first + 2]!;
      const faceNormalX = edge1Y * edge2Z - edge1Z * edge2Y;
      const faceNormalY = edge1Z * edge2X - edge1X * edge2Z;
      const faceNormalZ = edge1X * edge2Y - edge1Y * edge2X;
      const centerX = (positions[first]! + positions[second]! + positions[third]!) / 3;
      const centerY = (positions[first + 1]! + positions[second + 1]! + positions[third + 1]!) / 3;
      const centerZ = (positions[first + 2]! + positions[second + 2]! + positions[third + 2]!) / 3;
      const gradientX = fieldAt(centerX + normalProbe, centerY, centerZ) - fieldAt(centerX - normalProbe, centerY, centerZ);
      const gradientY = fieldAt(centerX, centerY + normalProbe, centerZ) - fieldAt(centerX, centerY - normalProbe, centerZ);
      const gradientZ = fieldAt(centerX, centerY, centerZ + normalProbe) - fieldAt(centerX, centerY, centerZ - normalProbe);
      if (faceNormalX * gradientX + faceNormalY * gradientY + faceNormalZ * gradientZ < 0) {
        inwardTriangleCount += 1;
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  if (config.uvAt) geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndices, 4));
  geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeights, 4));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  onProgress?.(1);

  return {
    geometry,
    triangleCount: indices.length / 3,
    vertexCount: positions.length / 3,
    elapsedMs: performance.now() - startedAt,
    minimumArmBodyGap,
    minimumThighGap,
    zeroWeightVertexCount,
    invalidWeightVertexCount,
    verticesInsideMultipleCapsules,
    armWeightLeakVertexCount,
    inwardTriangleCount,
  };
};