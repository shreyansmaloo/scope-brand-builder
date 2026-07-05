/**
 * DropletScene — a large liquid serum/oil droplet with orbiting micro-droplets.
 * The main blob slowly morphs shape via MeshDistortMaterial.
 * Satellite droplets orbit at different planes and speeds.
 * Concept: premium cosmetic actives, liquid drug delivery, food-grade oils.
 */
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Main liquid blob ─────────────────────────────────────────
const MainDrop = ({ dark }: { dark: boolean }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.10;
    ref.current.rotation.z = clock.elapsedTime * 0.06;
  });

  return (
    <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.4}>
      <mesh ref={ref} castShadow={false}>
        <sphereGeometry args={[1.0, 128, 128]} />
        <MeshDistortMaterial
          color={dark ? "#F69A1E" : "#E07B0A"}
          distort={0.45}
          speed={1.4}
          roughness={0.06}
          metalness={0.0}
          transparent
          opacity={0.88}
          emissive={dark ? "#E06000" : "#C05000"}
          emissiveIntensity={0.14}
        />
      </mesh>
    </Float>
  );
};

// ─── Satellite droplet ────────────────────────────────────────
type SatProps = {
  orbitR:   number;
  rot:      [number, number, number];
  speed:    number;
  phase:    number;
  size:     number;
  color:    string;
  opacity?: number;
};

const Satellite = ({ orbitR, rot, speed, phase, size, color, opacity = 0.78 }: SatProps) => {
  const ref = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * orbitR, Math.sin(t) * orbitR, 0);
    meshRef.current.rotation.y = clock.elapsedTime * 0.4;
  });

  return (
    <group rotation={rot}>
      <group ref={ref}>
        <mesh ref={meshRef} castShadow={false}>
          <sphereGeometry args={[size, 24, 24]} />
          <MeshDistortMaterial
            color={color}
            distort={0.28}
            speed={2.0}
            roughness={0.08}
            metalness={0.0}
            transparent
            opacity={opacity}
            emissive={color}
            emissiveIntensity={0.10}
          />
        </mesh>
      </group>
    </group>
  );
};

const SATELLITES: SatProps[] = [
  { orbitR: 1.85, rot: [1.1, 0, 0],     speed:  0.55, phase: 0,    size: 0.22, color: "#F6A820" },
  { orbitR: 2.30, rot: [0.4, 0.7, 0.2], speed: -0.38, phase: 2.1,  size: 0.16, color: "#FFD166" },
  { orbitR: 1.60, rot: [1.6, 0.3, 0.8], speed:  0.72, phase: 4.3,  size: 0.13, color: "#FFF0C0", opacity: 0.6 },
  { orbitR: 2.10, rot: [0.8, 1.2, 0.4], speed: -0.48, phase: 1.5,  size: 0.18, color: "#F69A1E" },
  { orbitR: 2.60, rot: [0.2, 0.5, 1.1], speed:  0.30, phase: 5.8,  size: 0.10, color: "#FFD166", opacity: 0.5 },
];

// ─── Orbital ring trails ──────────────────────────────────────
const OrbitalTrails = () => (
  <>
    {[
      { rot: [1.1, 0, 0]    as [number,number,number], r: 1.85, op: 0.35 },
      { rot: [0.4, 0.7, 0.2] as [number,number,number], r: 2.30, op: 0.20 },
      { rot: [1.6, 0.3, 0.8] as [number,number,number], r: 1.60, op: 0.22 },
    ].map((o, i) => (
      <mesh key={i} rotation={o.rot}>
        <torusGeometry args={[o.r, 0.008, 6, 80]} />
        <meshStandardMaterial color="#F69A1E" emissive="#F69A1E" emissiveIntensity={0.5} transparent opacity={o.op} />
      </mesh>
    ))}
  </>
);

// ─── Floating micro-particles ─────────────────────────────────
const MicroParticles = () => {
  const ref = useRef<THREE.Points>(null!);
  const geo = (() => {
    const g = new THREE.BufferGeometry();
    const count = 180;
    const pos   = new Float32Array(count * 3);
    let s = 99;
    const rng = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 0xffffffff; };
    for (let i = 0; i < count; i++) {
      const r  = 3.2 + rng() * 1.4;
      const th = rng() * Math.PI * 2;
      const ph = Math.acos(1 - 2 * rng());
      pos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      pos[i*3+1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      pos[i*3+2] = r * Math.cos(ph) * 0.55;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  })();

  useFrame(({ clock }) => { ref.current.rotation.y = clock.elapsedTime * 0.014; });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.038} color="#F69A1E" transparent opacity={0.40} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// ─── Scene ────────────────────────────────────────────────────
const Scene = ({ fogColor, dark }: { fogColor: string; dark: boolean }) => (
  <>
    <fog attach="fog" args={[fogColor, 9, 22]} />
    <Environment preset="studio" />
    <ambientLight intensity={dark ? 0.5 : 1.8} color={dark ? "#fff" : "#fff8ed"} />
    <directionalLight position={[1, 3, 5]}  intensity={dark ? 3.2 : 2.6} color="#FFE8C0" />
    <pointLight position={[ 2, 3, 4]}  intensity={dark ? 2.8 : 2.0} color="#F69A1E" />
    <pointLight position={[-2,-2, 3]}  intensity={dark ? 1.5 : 1.1} color="#FFD166" />
    <MainDrop dark={dark} />
    {SATELLITES.map((s, i) => <Satellite key={i} {...s} />)}
    <OrbitalTrails />
    <MicroParticles />
  </>
);

// ─── Export ───────────────────────────────────────────────────
type Props = { fogColor?: string; vignetteColor?: string; dark?: boolean };

const DropletScene = ({
  fogColor      = "#F8F8F6",
  vignetteColor = "rgba(248,248,246,",
  dark          = false,
}: Props) => (
  <div className="relative w-full h-full">
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 48, position: [0, 0, 6.2], near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene fogColor={fogColor} dark={dark} />
      </Suspense>
    </Canvas>
    <div className="absolute inset-0 pointer-events-none" style={{
      background: `radial-gradient(ellipse at center, transparent 40%, ${vignetteColor}0.75) 100%)`,
    }} />
  </div>
);

export default DropletScene;
