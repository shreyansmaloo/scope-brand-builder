/**
 * SwarmScene — 480 particles that smoothly morph between 3 shapes:
 *   → PILL  (a pharmaceutical capsule outline)   = Pharma industry
 *   → DROP  (a liquid teardrop/sphere)           = Cosmetics / personal care
 *   → HEXA  (a hexagonal molecular ring pattern) = Food / nutraceuticals
 *
 * Concept: one partner across three industries.
 */
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const N    = 480;
const LOOP = 13.5; // seconds for one full 3-shape cycle

// ─── Easing ──────────────────────────────────────────────────
const eio = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// ─── LCG random (deterministic) ──────────────────────────────
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 0xffffffff; };
}

// ─── Shape generators ─────────────────────────────────────────
function pillPositions(count: number, rng: () => number): Float32Array {
  const pos = new Float32Array(count * 3);
  const R = 0.46, H = 0.64; // capsule radius and half-height

  for (let i = 0; i < count; i++) {
    // Distribute on capsule surface
    const u = rng();
    const totalSurf = 2 * Math.PI * R * R + 2 * Math.PI * R * H * 2;
    const capSurf   = 2 * Math.PI * R * R; // both caps
    const isCapArea = u < capSurf / totalSurf;

    let x, y, z;
    if (isCapArea) {
      // Hemisphere cap
      const top    = rng() < 0.5;
      const theta  = rng() * Math.PI * 2;
      const phi    = rng() * Math.PI / 2;
      x = R * Math.sin(phi) * Math.cos(theta);
      y = (top ? 1 : -1) * (H + R * Math.cos(phi));
      z = R * Math.sin(phi) * Math.sin(theta);
    } else {
      // Cylinder body
      const theta = rng() * Math.PI * 2;
      x = R * Math.cos(theta);
      y = (rng() - 0.5) * H * 2;
      z = R * Math.sin(theta);
    }
    pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
  }
  return pos;
}

function dropPositions(count: number, rng: () => number): Float32Array {
  const pos = new Float32Array(count * 3);
  const R = 0.85;

  for (let i = 0; i < count; i++) {
    // Sphere surface distribution (Fibonacci)
    const theta = rng() * Math.PI * 2;
    const phi   = Math.acos(1 - 2 * rng());
    let x = R * Math.sin(phi) * Math.cos(theta);
    let y = R * Math.sin(phi) * Math.sin(theta);
    let z = R * Math.cos(phi);
    // Teardrop squish: slightly elongate bottom
    y *= y < 0 ? 1.25 : 0.85;
    pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
  }
  return pos;
}

function hexaPositions(count: number, rng: () => number): Float32Array {
  const pos = new Float32Array(count * 3);
  // Honeycomb of 3 concentric hexagonal rings (molecule net)
  const RINGS = [
    { r: 0,    n: 1  },
    { r: 0.72, n: 6  },
    { r: 1.44, n: 12 },
    { r: 2.16, n: 18 },
  ];
  let idx = 0;
  for (const ring of RINGS) {
    const perNode = Math.floor(count / 37) + 1; // spread particles per node
    for (let j = 0; j < ring.n; j++) {
      const a = (j / Math.max(ring.n, 1)) * Math.PI * 2;
      const nx = Math.cos(a) * ring.r;
      const ny = Math.sin(a) * ring.r;
      for (let k = 0; k < perNode && idx < count; k++, idx++) {
        const scatter = 0.06;
        pos[idx*3]   = nx + (rng() - 0.5) * scatter;
        pos[idx*3+1] = ny + (rng() - 0.5) * scatter;
        pos[idx*3+2] = (rng() - 0.5) * 0.12;
      }
    }
  }
  // Fill remainder with outer scatter
  while (idx < count) {
    const a = rng() * Math.PI * 2;
    const r = 2.0 + rng() * 0.4;
    pos[idx*3] = Math.cos(a) * r; pos[idx*3+1] = Math.sin(a) * r; pos[idx*3+2] = (rng()-0.5)*0.2;
    idx++;
  }
  return pos;
}

// ─── Swarm component ──────────────────────────────────────────
const Swarm = () => {
  const geoRef = useRef<THREE.BufferGeometry>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const { A, B, C, init } = useMemo(() => {
    const r1 = lcg(7);
    const r2 = lcg(13);
    const r3 = lcg(42);
    const A = pillPositions(N, r1);
    const B = dropPositions(N, r2);
    const C = hexaPositions(N, r3);
    const init = new Float32Array(A);
    return { A, B, C, init };
  }, []);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime % LOOP) / LOOP; // 0–1

    // Timeline:
    // 0.00–0.08  hold PILL
    // 0.08–0.28  PILL → DROP
    // 0.28–0.40  hold DROP
    // 0.40–0.60  DROP → HEXA
    // 0.60–0.72  hold HEXA
    // 0.72–0.90  HEXA → PILL
    // 0.90–1.00  hold PILL

    let from: Float32Array, to: Float32Array, mix: number;

    if (t < 0.08) {
      from = A; to = A; mix = 0;
    } else if (t < 0.28) {
      from = A; to = B; mix = eio((t - 0.08) / 0.20);
    } else if (t < 0.40) {
      from = B; to = B; mix = 0;
    } else if (t < 0.60) {
      from = B; to = C; mix = eio((t - 0.40) / 0.20);
    } else if (t < 0.72) {
      from = C; to = C; mix = 0;
    } else if (t < 0.90) {
      from = C; to = A; mix = eio((t - 0.72) / 0.18);
    } else {
      from = A; to = A; mix = 0;
    }

    // Rotate whole swarm slowly
    groupRef.current.rotation.y = clock.elapsedTime * 0.18;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.11) * 0.12;

    // Update positions
    if (geoRef.current) {
      const attr = geoRef.current.attributes.position as THREE.BufferAttribute;
      const arr  = attr.array as Float32Array;
      for (let i = 0; i < N * 3; i++) {
        arr[i] = from[i] + (to[i] - from[i]) * mix;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute
            attach="attributes-position"
            count={N}
            array={init}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.036}
          color="#F69A1E"
          transparent
          opacity={0.88}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Connecting lines between nearby nodes when in HEXA shape — rendered as a faint torus */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.72, 0.006, 6, 60]} />
        <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={0.4} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.44, 0.006, 6, 80]} />
        <meshStandardMaterial color="#F69A1E" emissive="#F69A1E" emissiveIntensity={0.35} transparent opacity={0.18} />
      </mesh>
    </group>
  );
};

// ─── Phase label (shown as a CSS overlay, outside canvas) ─────
export const PHASE_LABELS = ["Pharmaceutical", "Personal Care", "Food & Nutra"];
export const PHASE_DURATION_RATIO = [0.35, 0.35, 0.30]; // fraction of LOOP

// ─── Scene ────────────────────────────────────────────────────
const Scene = ({ fogColor, dark }: { fogColor: string; dark: boolean }) => (
  <>
    <fog attach="fog" args={[fogColor, 10, 24]} />
    <Environment preset="studio" />
    <ambientLight intensity={dark ? 0.7 : 2.2} />
    <directionalLight position={[2, 4, 5]} intensity={dark ? 3.5 : 2.5} color="#FFE8C0" />
    <pointLight position={[-3, 2, 3]} intensity={dark ? 2.0 : 1.6} color="#F69A1E" />
    <Swarm />
  </>
);

// ─── Export ───────────────────────────────────────────────────
type Props = { fogColor?: string; vignetteColor?: string; dark?: boolean };

const SwarmScene = ({
  fogColor      = "#F8F8F6",
  vignetteColor = "rgba(248,248,246,",
  dark          = false,
}: Props) => (
  <div className="relative w-full h-full">
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 46, position: [0, 0, 6.2], near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene fogColor={fogColor} dark={dark} />
      </Suspense>
    </Canvas>
    <div className="absolute inset-0 pointer-events-none" style={{
      background: `radial-gradient(ellipse at center, transparent 38%, ${vignetteColor}0.78) 100%)`,
    }} />
  </div>
);

export default SwarmScene;
