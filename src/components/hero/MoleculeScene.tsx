/**
 * MoleculeScene — a simplified aromatic drug molecule rotating in 3D.
 * Atom spheres connected by bond cylinders, plus orbital electrons.
 * Concept: the active pharmaceutical ingredient at the heart of every formulation.
 */
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Molecule definition ──────────────────────────────────────
// Simplified aromatic ring with substituent chains (like a drug API)
const RING_R = 0.52;

const RING_POSITIONS: [number, number, number][] = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
  return [Math.cos(a) * RING_R, Math.sin(a) * RING_R, 0];
});

// Side chains hanging off the ring
const CHAIN_ATOMS: { pos: [number, number, number]; r: number; color: string }[] = [
  // Chain 1 — top right (like a ketone C=O)
  { pos: [RING_R * 1.55, RING_R * 1.55, 0.15],  r: 0.11, color: "#FFD166" },
  { pos: [RING_R * 2.1,  RING_R * 1.9,  0.25],  r: 0.085, color: "#FFF0C0" }, // O
  // Chain 2 — bottom (like an OH or NH2)
  { pos: [0,              -RING_R * 1.6, -0.2],  r: 0.10, color: "#FFD166" },
  { pos: [-0.2,           -RING_R * 2.2, -0.3],  r: 0.08, color: "#FFF0C0" },
  // Chain 3 — left
  { pos: [-RING_R * 1.5,  RING_R * 0.5, 0.2],   r: 0.10, color: "#FFD166" },
  { pos: [-RING_R * 2.1,  RING_R * 0.8, 0.35],  r: 0.075, color: "#FFF0C0" },
];

const RING_BONDS: [number, number][] = Array.from({ length: 6 }, (_, i) => [i, (i + 1) % 6]);

const CHAIN_BONDS: [number, number, boolean][] = [
  // [ring atom index, chain atom index, double bond?]
  // using chain atom indices offset by 6
  [1, 0, false], [0, 1, true],   // chain 1 (double bond to O)
  [4, 2, false], [2, 3, false],  // chain 2
  [5, 4, false], [4, 5, false],  // chain 3
];

// Pre-compute bond mesh data
function bondData(
  a: [number, number, number],
  b: [number, number, number]
): { pos: THREE.Vector3; len: number; quat: THREE.Quaternion } {
  const va  = new THREE.Vector3(...a);
  const vb  = new THREE.Vector3(...b);
  const pos = va.clone().add(vb).multiplyScalar(0.5);
  const dir = vb.clone().sub(va);
  const len = dir.length();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.normalize()
  );
  return { pos, len, quat };
}

// Orbital electron specs
const ORBITALS = [
  { r: 1.85, speed: 0.65,  phase: 0,    rot: [1.1, 0, 0]    as [number,number,number] },
  { r: 2.20, speed: -0.42, phase: 2.1,  rot: [0.5, 0.8, 0.3] as [number,number,number] },
  { r: 1.60, speed: 0.90,  phase: 4.3,  rot: [1.7, 0.3, 0.9] as [number,number,number] },
];

// ─── Electron component ───────────────────────────────────────
const Electron = ({ r, speed, phase, rot }: typeof ORBITALS[0]) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * r, Math.sin(t) * r, 0);
  });
  return (
    <group rotation={rot}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#FFE566" emissive="#FFE566" emissiveIntensity={1.2} roughness={0.2} />
      </mesh>
    </group>
  );
};

// ─── Main molecule ────────────────────────────────────────────
const MoleculeCore = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // All atom positions (ring + chain)
  const allAtoms = useMemo(() => [
    ...RING_POSITIONS.map((pos, i) => ({
      pos,
      r:     i % 2 === 0 ? 0.105 : 0.095,
      color: "#F69A1E",
    })),
    ...CHAIN_ATOMS,
  ], []);

  // All bond data
  const bonds = useMemo(() => {
    const list: { pos: THREE.Vector3; len: number; quat: THREE.Quaternion; double: boolean }[] = [];

    // Ring bonds (alternating single/double aromatic)
    RING_BONDS.forEach(([a, b], i) => {
      list.push({ ...bondData(allAtoms[a].pos, allAtoms[b].pos), double: i % 2 === 0 });
    });

    // Chain bonds
    CHAIN_BONDS.forEach(([ri, ci, dbl]) => {
      list.push({
        ...bondData(allAtoms[ri].pos, allAtoms[6 + ci].pos),
        double: dbl,
      });
    });

    return list;
  }, [allAtoms]);

  const bondMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#F69A1E", roughness: 0.4, metalness: 0.05, transparent: true, opacity: 0.75,
  }), []);

  const doubleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFD166", roughness: 0.3, metalness: 0.05, transparent: true, opacity: 0.70,
  }), []);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y  = clock.elapsedTime * 0.22;
    groupRef.current.rotation.x  = Math.sin(clock.elapsedTime * 0.14) * 0.18;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={groupRef}>
        {/* Atoms */}
        {allAtoms.map((atom, i) => (
          <mesh key={`a${i}`} position={atom.pos}>
            <sphereGeometry args={[atom.r, 20, 20]} />
            <meshStandardMaterial
              color={atom.color}
              emissive={atom.color}
              emissiveIntensity={0.18}
              roughness={0.35}
              metalness={0.05}
            />
          </mesh>
        ))}

        {/* Bonds */}
        {bonds.map(({ pos, len, quat, double }, i) => (
          <group key={`b${i}`}>
            {/* Main bond */}
            <mesh position={pos.toArray() as [number,number,number]} quaternion={quat} material={double ? doubleMat : bondMat}>
              <cylinderGeometry args={[0.022, 0.022, len, 8]} />
            </mesh>
            {/* Double bond offset line */}
            {double && (
              <mesh
                position={[pos.x + 0.05, pos.y, pos.z]}
                quaternion={quat}
                material={doubleMat}
              >
                <cylinderGeometry args={[0.012, 0.012, len * 0.92, 6]} />
              </mesh>
            )}
          </group>
        ))}

        {/* Delocalised ring indicator */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[RING_R * 0.68, 0.01, 6, 48]} />
          <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={0.6} transparent opacity={0.5} />
        </mesh>

        {/* Orbital rings */}
        {ORBITALS.map((o, i) => (
          <mesh key={`or${i}`} rotation={o.rot}>
            <torusGeometry args={[o.r, 0.010, 6, 80]} />
            <meshStandardMaterial color="#F69A1E" emissive="#F69A1E" emissiveIntensity={0.45} transparent opacity={0.55} />
          </mesh>
        ))}

        {/* Electrons */}
        {ORBITALS.map((o, i) => <Electron key={`e${i}`} {...o} />)}
      </group>
    </Float>
  );
};

// ─── Particle cloud ───────────────────────────────────────────
const ParticleCloud = () => {
  const ref = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + (i / count) * 1.2;
      const th = (i / count) * Math.PI * 2 * 5.618;
      const ph = Math.acos(1 - 2 * i / count);
      pos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      pos[i*3+1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      pos[i*3+2] = r * Math.cos(ph) * 0.5;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => { ref.current.rotation.y = clock.elapsedTime * 0.012; });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.04} color="#F69A1E" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// ─── Scene ────────────────────────────────────────────────────
const Scene = ({ fogColor, dark }: { fogColor: string; dark: boolean }) => (
  <>
    <fog attach="fog" args={[fogColor, 9, 22]} />
    <Environment preset="studio" />
    <ambientLight intensity={dark ? 0.6 : 2.0} color={dark ? "#fff" : "#fff8ed"} />
    <directionalLight position={[2, 4, 5]}  intensity={dark ? 3.5 : 2.8} color="#FFE8C0" />
    <pointLight position={[-3, 2, 3]}  intensity={dark ? 2.2 : 1.8} color="#F69A1E" />
    <pointLight position={[ 3,-2, 2]}  intensity={dark ? 1.2 : 0.9} color="#FFD166" />
    <MoleculeCore />
    <ParticleCloud />
  </>
);

// ─── Export ───────────────────────────────────────────────────
type Props = { fogColor?: string; vignetteColor?: string; dark?: boolean };

const MoleculeScene = ({
  fogColor      = "#F8F8F6",
  vignetteColor = "rgba(248,248,246,",
  dark          = false,
}: Props) => (
  <div className="relative w-full h-full">
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 48, position: [0, 0, 6], near: 0.1, far: 50 }}
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

export default MoleculeScene;
