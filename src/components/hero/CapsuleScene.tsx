import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────
const R        = 0.46;   // capsule radius
const H        = 0.62;   // half-height of cylinder body
const N        = 320;    // particle count
const LOOP     = 11;     // animation loop seconds

// ─── Easing ──────────────────────────────────────────────────
const eio  = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
const eOut = (t: number) => 1 - Math.pow(1 - t, 3);

// ─── Phase helpers ────────────────────────────────────────────
// Returns [0,1] for a sub-range of the full loop normalised 0-1
function phase(t: number, start: number, end: number, fn = eio) {
  if (t < start || t > end) return t < start ? 0 : 1;
  return fn((t - start) / (end - start));
}

// ─── Pre-generate particle positions ─────────────────────────
function buildPositions(seed: number) {
  // simple LCG so positions are deterministic
  let s = seed;
  const rng = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };

  const inside  = new Float32Array(N * 3);
  const outside = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    // INSIDE — uniform points inside a capsule (cylinder + two caps)
    const theta = rng() * Math.PI * 2;
    const yRaw  = (rng() - 0.5) * (H * 2 + R * 2) * 0.85;
    const yAbs  = Math.abs(yRaw);
    const capOff = Math.max(0, yAbs - H);
    const maxR  = capOff > 0 ? Math.sqrt(Math.max(0, R*R - capOff*capOff)) : R;
    const r     = maxR * Math.sqrt(rng()) * 0.88;
    inside[i*3]   = Math.cos(theta) * r;
    inside[i*3+1] = yRaw;
    inside[i*3+2] = Math.sin(theta) * r;

    // OUTSIDE — powder poured from the opening, spreading downward
    const fallT   = rng();                        // 0 = near opening, 1 = far down
    const oy      = H + 0.18 + fallT * 3.2;       // positive = below capsule (scene Y flipped)
    const spread  = 0.06 + fallT * 1.05;
    const or      = spread * Math.sqrt(rng());
    const otheta  = rng() * Math.PI * 2;
    outside[i*3]   = Math.cos(otheta) * or;
    outside[i*3+1] = -oy;                          // negative Y = below capsule
    outside[i*3+2] = Math.sin(otheta) * or;
  }
  return { inside, outside };
}

// ─── Capsule + particle component ────────────────────────────
type CapsuleProps = { bodyColor: string; capColor: string };

const Capsule = ({ bodyColor, capColor }: CapsuleProps) => {
  const topRef  = useRef<THREE.Mesh>(null!);
  const geoRef  = useRef<THREE.BufferGeometry>(null!);

  // Deterministic positions (same every mount)
  const { inside, outside } = useMemo(() => buildPositions(42), []);
  const initArr = useMemo(() => new Float32Array(inside), [inside]);

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: bodyColor, roughness: 0.22, metalness: 0.08,
    transparent: true, opacity: 0.90,
    side: THREE.FrontSide,
  }), [bodyColor]);

  const capMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: capColor, roughness: 0.18, metalness: 0.10,
    transparent: true, opacity: 0.93,
  }), [capColor]);

  useFrame(({ clock }) => {
    const raw = clock.elapsedTime % LOOP;
    const t   = raw / LOOP;   // 0–1

    // === Animation timeline ===
    // 0.00–0.10  closed, static
    // 0.10–0.30  cap rises
    // 0.30–0.56  powder pours out
    // 0.56–0.68  powder floating dispersed
    // 0.68–0.88  powder rises back in
    // 0.88–1.00  cap closes

    const capOpen   = phase(t, 0.10, 0.30) - phase(t, 0.88, 1.00);
    const powderOut = Math.max(0, Math.min(1,
      phase(t, 0.30, 0.56)           // pours out
      - phase(t, 0.68, 0.88, eOut)   // sucked back
    ));

    // Move top cap
    if (topRef.current) {
      topRef.current.position.y = H + R + capOpen * 1.25;
    }

    // Update particle positions
    if (geoRef.current) {
      const attr = geoRef.current.attributes.position as THREE.BufferAttribute;
      const arr  = attr.array as Float32Array;
      for (let i = 0; i < N; i++) {
        const fi = i * 3;
        arr[fi]   = inside[fi]   + (outside[fi]   - inside[fi])   * powderOut;
        arr[fi+1] = inside[fi+1] + (outside[fi+1] - inside[fi+1]) * powderOut;
        arr[fi+2] = inside[fi+2] + (outside[fi+2] - inside[fi+2]) * powderOut;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.3}>
      <group>
        {/* ── Bottom hemisphere ── */}
        <mesh position={[0, -H, 0]} material={bodyMat}>
          <sphereGeometry args={[R, 56, 28, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
        </mesh>

        {/* ── Cylinder body ── */}
        <mesh position={[0, 0, 0]} material={bodyMat}>
          <cylinderGeometry args={[R, R, H*2, 56, 1, true]} />
        </mesh>

        {/* ── Top cap — rises when opening ── */}
        <mesh ref={topRef} position={[0, H + R, 0]} material={capMat}>
          <sphereGeometry args={[R, 56, 28, 0, Math.PI*2, 0, Math.PI/2]} />
        </mesh>

        {/* ── Powder particles ── */}
        <points>
          <bufferGeometry ref={geoRef}>
            <bufferAttribute
              attach="attributes-position"
              count={N}
              array={initArr}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.028}
            color="#FFE08A"
            transparent
            opacity={0.88}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      </group>
    </Float>
  );
};

// ─── Scene ───────────────────────────────────────────────────
type SceneProps = {
  fogColor: string;
  dark: boolean;
  bodyColor: string;
  capColor: string;
};

const Scene = ({ fogColor, dark, bodyColor, capColor }: SceneProps) => (
  <>
    <fog attach="fog" args={[fogColor, 9, 22]} />
    <Environment preset="studio" />
    <ambientLight intensity={dark ? 0.5 : 1.9} color={dark ? "#fff" : "#fff8ed"} />
    <directionalLight position={[1, 3, 5]} intensity={dark ? 3.2 : 2.6} color="#FFE8C0" castShadow={false} />
    <pointLight position={[-3, 2, 3]}  intensity={dark ? 2.0 : 1.8} color="#F69A1E" />
    <pointLight position={[ 3, -2, 2]} intensity={dark ? 1.2 : 1.0} color="#FFD166" />
    <Capsule bodyColor={bodyColor} capColor={capColor} />
  </>
);

// ─── Exported wrapper ─────────────────────────────────────────
export type CapsuleSceneProps = {
  fogColor?:      string;
  vignetteColor?: string;
  dark?:          boolean;
  bodyColor?:     string;
  capColor?:      string;
  fov?:           number;
  cameraZ?:       number;
};

const CapsuleScene = ({
  fogColor      = "#FAFAF8",
  vignetteColor = "rgba(250,250,248,",
  dark          = false,
  bodyColor     = "#E08010",
  capColor      = "#F6A820",
  fov           = 46,
  cameraZ       = 5.8,
}: CapsuleSceneProps) => (
  <div className="relative w-full h-full">
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ fov, position: [0, 0, cameraZ], near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene fogColor={fogColor} dark={dark} bodyColor={bodyColor} capColor={capColor} />
      </Suspense>
    </Canvas>

    {/* Edge vignette blends into background */}
    <div className="absolute inset-0 pointer-events-none" style={{
      background: `radial-gradient(ellipse at center, transparent 38%, ${vignetteColor}0.75) 100%)`,
    }} />
  </div>
);

export default CapsuleScene;
