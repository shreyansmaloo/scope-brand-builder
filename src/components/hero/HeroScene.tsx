import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Shared material helper ───────────────────────────────────
const atomMat = (color: string, emissiveIntensity = 0.18) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive: new THREE.Color(color),
    emissiveIntensity,
    roughness: 0.45,
    metalness: 0.05,
  });

// ─── Nucleus — central pulsing sphere ────────────────────────
const Nucleus = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.04;
    ref.current.scale.setScalar(s);
    ref.current.rotation.y = clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial
          color="#F69A1E"
          emissive="#E07A00"
          emissiveIntensity={0.22}
          roughness={0.4}
          metalness={0.06}
        />
      </mesh>
    </Float>
  );
};

// ─── Electron orbital ring ────────────────────────────────────
const OrbitalRing = ({
  rotation,
  speed,
  color,
  radius = 1.85,
  tube = 0.022,
}: {
  rotation: [number, number, number];
  speed: number;
  color: string;
  radius?: number;
  tube?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 8, 120]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.55}
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// ─── Electron dot moving along an orbit ──────────────────────
const ElectronDot = ({
  orbitRadius,
  speed,
  phase,
  orbitRotation,
  color,
}: {
  orbitRadius: number;
  speed: number;
  phase: number;
  orbitRotation: [number, number, number];
  color: string;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * orbitRadius, Math.sin(t) * orbitRadius, 0);
  });

  return (
    <group ref={groupRef} rotation={orbitRotation}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
};

// ─── Benzene / hexagonal ring (organic chemistry) ─────────────
const BENZENE_POSITIONS: [number, number, number][] = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2;
  return [Math.cos(a) * 0.28, Math.sin(a) * 0.28, 0];
});

const BenzeneRing = ({
  pos,
  rot,
  color,
  speed,
  scale = 1,
}: {
  pos: [number, number, number];
  rot: [number, number, number];
  color: string;
  speed: number;
  scale?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Pre-compute bond geometry
  const bonds = useMemo(() => {
    return BENZENE_POSITIONS.map((p, i) => {
      const next = BENZENE_POSITIONS[(i + 1) % 6];
      const start = new THREE.Vector3(...p);
      const end = new THREE.Vector3(...next);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dir = end.clone().sub(start);
      const len = dir.length();
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.normalize()
      );
      return { mid, len, quat };
    });
  }, []);

  useFrame(({ clock }) => {
    groupRef.current.rotation.z = clock.elapsedTime * speed * 0.18;
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.0}>
      <group ref={groupRef} position={pos} rotation={rot} scale={scale}>
        {/* 6 carbon atoms */}
        {BENZENE_POSITIONS.map((p, i) => (
          <mesh key={`a${i}`} position={p}>
            <sphereGeometry args={[0.058, 10, 10]} />
            <primitive object={atomMat(color)} attach="material" />
          </mesh>
        ))}
        {/* C–C bonds */}
        {bonds.map(({ mid, len, quat }, i) => (
          <mesh key={`b${i}`} position={mid.toArray() as [number,number,number]} quaternion={quat}>
            <cylinderGeometry args={[0.014, 0.014, len, 6]} />
            <meshStandardMaterial color={color} transparent opacity={0.65} roughness={0.5} />
          </mesh>
        ))}
        {/* Dashed inner circle representing delocalised π electrons */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.16, 0.008, 6, 36]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} transparent opacity={0.55} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
};

const BENZENES: { pos: [number,number,number]; rot: [number,number,number]; color: string; speed: number; scale: number }[] = [
  { pos: [ 2.4,  0.6,  0.2], rot: [0.3, 0.1, 0.5],  color: "#F69A1E", speed: 1.2, scale: 1.15 },
  { pos: [-2.2, -0.3,  0.3], rot: [0.5, 0.4, 0.2],  color: "#FFD166", speed: 1.7, scale: 0.95 },
  { pos: [ 0.5,  2.6, -0.3], rot: [1.1, 0.2, 0.6],  color: "#F69A1E", speed: 1.4, scale: 1.05 },
  { pos: [-1.5, -2.0,  0.4], rot: [0.2, 0.8, 0.3],  color: "#FFD166", speed: 2.0, scale: 0.88 },
  { pos: [ 1.8, -1.4, -0.2], rot: [0.7, 0.3, 1.0],  color: "#F69A1E", speed: 1.3, scale: 1.0  },
];

// ─── Ball-and-stick molecule cluster ─────────────────────────
type AtomClusterProps = {
  pos: [number,number,number];
  color: string;
  atoms: [number,number,number][];
  speed: number;
};

const AtomCluster = ({ pos, color, atoms, speed }: AtomClusterProps) => {
  const ref = useRef<THREE.Group>(null!);

  const bonds = useMemo(() =>
    atoms.slice(1).map((apos) => {
      const s = new THREE.Vector3(...atoms[0]);
      const e = new THREE.Vector3(...apos);
      const mid = s.clone().add(e).multiplyScalar(0.5);
      const dir = e.clone().sub(s);
      const len = dir.length();
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      return { mid, len, q };
    }), [atoms]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.32;
    ref.current.rotation.x = clock.elapsedTime * 0.20;
  });

  return (
    <Float speed={speed} rotationIntensity={1.1} floatIntensity={1.2}>
      <group ref={ref} position={pos}>
        {atoms.map((apos, i) => (
          <mesh key={`a${i}`} position={apos}>
            <sphereGeometry args={[i === 0 ? 0.13 : 0.092, 16, 16]} />
            <primitive object={atomMat(color, i === 0 ? 0.22 : 0.14)} attach="material" />
          </mesh>
        ))}
        {bonds.map(({ mid, len, q }, i) => (
          <mesh key={`b${i}`} position={mid.toArray() as [number,number,number]} quaternion={q}>
            <cylinderGeometry args={[0.019, 0.019, len, 6]} />
            <meshStandardMaterial color={color} transparent opacity={0.62} roughness={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const CLUSTERS: AtomClusterProps[] = [
  {
    pos: [-2.1,  1.5,  0.5],
    color: "#FFD166",
    speed: 1.6,
    atoms: [[0,0,0],[0.38,0.25,0],[-0.35,0.28,0.1],[0.08,0.42,0.22]] as [number,number,number][],
  },
  {
    pos: [ 2.5, -1.4, -0.2],
    color: "#F69A1E",
    speed: 1.9,
    atoms: [[0,0,0],[0.40,0,0],[-0.38,0.05,0],[0.04,0.38,0.18],[0.04,-0.38,0.18]] as [number,number,number][],
  },
  {
    pos: [-0.8, -2.4,  0.3],
    color: "#FFD166",
    speed: 1.4,
    atoms: [[0,0,0],[0.36,0.22,0],[-0.30,0.30,0.15]] as [number,number,number][],
  },
];

// ─── Particle cloud (ingredient molecules) ────────────────────
const Particles = () => {
  const ref = useRef<THREE.Points>(null!);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 260;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4.5 + (i / count) * 1.5;
      const theta = (i / count) * Math.PI * 2 * 6.1803;
      const phi = Math.acos(1 - (2 * i) / count);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.5;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.016;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.046} color="#F69A1E" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// ─── Full scene ───────────────────────────────────────────────
type SceneProps = { fogColor?: string; lightIntensity?: number };

const Scene = ({ fogColor = "#FFF8ED", lightIntensity = 1 }: SceneProps) => (
  <>
    <fog attach="fog" args={[fogColor, 11, 24]} />
    <Environment preset="studio" />
    <ambientLight intensity={1.8 * lightIntensity} color="#fff8ed" />
    <directionalLight position={[0, 2, 6]}  intensity={2.2 * lightIntensity} color="#FFE8C0" />
    <pointLight position={[3, 4, 4]}   intensity={2.6 * lightIntensity} color="#F69A1E" />
    <pointLight position={[-3, -2, 3]} intensity={1.3 * lightIntensity} color="#FFD166" />
    <pointLight position={[0, 0, -4]}  intensity={0.5 * lightIntensity} color="#ffffff" />

    {/* Central nucleus (active ingredient) */}
    <Nucleus />

    {/* Three electron orbital rings — Bohr atom model */}
    <OrbitalRing rotation={[1.2, 0, 0]}     speed={ 0.42} color="#F69A1E" radius={1.82} tube={0.022} />
    <OrbitalRing rotation={[0.5, 0.8, 0.3]} speed={-0.25} color="#FFD166" radius={2.10} tube={0.016} />
    <OrbitalRing rotation={[1.7, 0.4, 0.9]} speed={ 0.18} color="#F69A1E" radius={2.40} tube={0.012} />

    {/* Electrons moving along orbits */}
    <ElectronDot orbitRadius={1.82} speed={1.1}  phase={0}    orbitRotation={[1.2, 0, 0]}     color="#FFE566" />
    <ElectronDot orbitRadius={2.10} speed={0.75} phase={2.1}  orbitRotation={[0.5, 0.8, 0.3]} color="#FFD166" />
    <ElectronDot orbitRadius={2.40} speed={0.55} phase={4.3}  orbitRotation={[1.7, 0.4, 0.9]} color="#F69A1E" />

    {/* Floating benzene / hexagonal rings */}
    {BENZENES.map((b, i) => <BenzeneRing key={i} {...b} />)}

    {/* Ball-and-stick molecule clusters */}
    {CLUSTERS.map((c, i) => <AtomCluster key={i} {...c} />)}

    {/* Ingredient particle cloud */}
    <Particles />
  </>
);

// ─── Canvas wrapper ───────────────────────────────────────────
type HeroSceneProps = {
  fogColor?: string;
  vignetteColor?: string;
  lightIntensity?: number;
  cameraX?: number;
};

const HeroScene = ({
  fogColor = "#FFF8ED",
  vignetteColor = "rgba(255,248,237,",
  lightIntensity = 1,
  cameraX = 0,
}: HeroSceneProps) => (
  <div className="relative w-full h-full">
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 52, position: [cameraX, 0, 6.5], near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene fogColor={fogColor} lightIntensity={lightIntensity} />
      </Suspense>
    </Canvas>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at center, transparent 42%, ${vignetteColor}0.72) 100%)`,
      }}
    />
  </div>
);

export default HeroScene;
