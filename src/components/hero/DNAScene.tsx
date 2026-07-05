import { useRef, useMemo, useCallback, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Config ────────────────────────────────────────────────────
const TURNS       = 3.2;
const RADIUS      = 1.35;
const HEIGHT      = 11.0;
const SMALL_PER   = 1100;   // tiny dots per strand
const BRIDGE_N    = 60;     // base-pair rungs
const BRIDGE_DOTS = 6;      // points per rung
const LARGE_PER   = 110;    // colored spheres per strand
const AMBIENT     = 50;     // scattered ambient particles
const MAX_BUBBLES = 45;

// Strand 0 = amber family, Strand 1 = blue family
const CA1 = new THREE.Color("#F69A1E");
const CA2 = new THREE.Color("#D97B0A");
const CB1 = new THREE.Color("#5B8DEF");
const CB2 = new THREE.Color("#3B7DD8");

// ── Helix position helper ─────────────────────────────────────
function helixPt(t: number, strand: 0 | 1, sr = 0.16): [number, number, number] {
  const a = t * TURNS * Math.PI * 2 + strand * Math.PI;
  return [
    RADIUS * Math.cos(a) + (Math.random() - 0.5) * sr,
    t * HEIGHT - HEIGHT / 2 + (Math.random() - 0.5) * sr * 0.45,
    RADIUS * Math.sin(a) + (Math.random() - 0.5) * sr,
  ];
}

// ── Build tiny-particle geometry ──────────────────────────────
function buildSmallGeo(): THREE.BufferGeometry {
  const total = SMALL_PER * 2 + BRIDGE_N * BRIDGE_DOTS + AMBIENT;
  const pos   = new Float32Array(total * 3);
  let k = 0;

  // Two helical strands
  for (let s = 0; s < 2; s++) {
    for (let p = 0; p < SMALL_PER; p++) {
      const [x, y, z] = helixPt(p / SMALL_PER, s as 0 | 1);
      pos[k++] = x; pos[k++] = y; pos[k++] = z;
    }
  }

  // Base-pair rungs (bridges)
  for (let b = 0; b < BRIDGE_N; b++) {
    const t  = b / BRIDGE_N;
    const a  = t * TURNS * Math.PI * 2;
    const y  = t * HEIGHT - HEIGHT / 2;
    for (let p = 0; p < BRIDGE_DOTS; p++) {
      const f  = p / (BRIDGE_DOTS - 1);
      const sc = 1 - 2 * f; // +1 → 0 → -1 (strand 0 to strand 1)
      pos[k++] = RADIUS * sc * Math.cos(a) + (Math.random() - 0.5) * 0.07;
      pos[k++] = y                          + (Math.random() - 0.5) * 0.05;
      pos[k++] = RADIUS * sc * Math.sin(a) + (Math.random() - 0.5) * 0.07;
    }
  }

  // Ambient scattered particles
  for (let i = 0; i < AMBIENT; i++) {
    const ang = Math.random() * Math.PI * 2;
    const r   = 2.4 + Math.random() * 2.2;
    pos[k++] = r * Math.cos(ang);
    pos[k++] = (Math.random() - 0.5) * HEIGHT * 1.25;
    pos[k++] = r * Math.sin(ang) * 0.32;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos.subarray(0, k), 3));
  return geo;
}

// ── Bubble state ──────────────────────────────────────────────
interface Bubble {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  age: number;
  maxAge: number;
  maxScale: number;
  alive: boolean;
}

const mkBubble = (): Bubble => ({
  pos: new THREE.Vector3(), vel: new THREE.Vector3(),
  age: 0, maxAge: 80, maxScale: 0.1, alive: false,
});

// ── DNA inner component ───────────────────────────────────────
const DNACore = () => {
  const groupRef  = useRef<THREE.Group>(null!);
  const largeRef  = useRef<THREE.InstancedMesh>(null!);
  const bubbleRef = useRef<THREE.InstancedMesh>(null!);
  const { gl }    = useThree();
  const dummy     = useMemo(() => new THREE.Object3D(), []);

  const drag = useRef({ on: false, lx: 0, ly: 0, vx: 0, vy: 0, ry: 0, rx: 0 });
  const bubblesRef = useRef<Bubble[]>(Array.from({ length: MAX_BUBBLES }, mkBubble));

  const smallGeo  = useMemo(() => buildSmallGeo(), []);

  const LARGE_TOTAL = LARGE_PER * 2;
  const largeData = useMemo(() => (
    Array.from({ length: LARGE_TOTAL }, (_, i) => {
      const strand = (i < LARGE_PER ? 0 : 1) as 0 | 1;
      const t      = (i % LARGE_PER) / LARGE_PER;
      const [x, y, z] = helixPt(t, strand, 0.26);
      const c = strand === 0
        ? (Math.random() > 0.38 ? CA1 : CA2)
        : (Math.random() > 0.38 ? CB1 : CB2);
      return { pos: new THREE.Vector3(x, y, z), scale: 0.055 + Math.random() * 0.2, color: c.clone() };
    })
  ), []);

  // Seed InstancedMesh transforms + colors
  useEffect(() => {
    largeData.forEach((d, i) => {
      dummy.position.copy(d.pos);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      largeRef.current.setMatrixAt(i, dummy.matrix);
      largeRef.current.setColorAt(i, d.color);
    });
    largeRef.current.instanceMatrix.needsUpdate = true;
    if (largeRef.current.instanceColor)
      largeRef.current.instanceColor.needsUpdate = true;

    // Hide all bubble slots initially
    dummy.scale.setScalar(0);
    dummy.updateMatrix();
    for (let i = 0; i < MAX_BUBBLES; i++)
      bubbleRef.current.setMatrixAt(i, dummy.matrix);
    bubbleRef.current.instanceMatrix.needsUpdate = true;
  }, [largeData, dummy]);

  // Emit bubbles at click position
  const emitAt = useCallback((cx: number, cy: number) => {
    const rect  = gl.domElement.getBoundingClientRect();
    const ndcX  = ((cx - rect.left) / rect.width)  * 2 - 1;
    const ndcY  = -((cy - rect.top)  / rect.height) * 2 + 1;
    const origin = new THREE.Vector3(ndcX * 2.1, ndcY * (HEIGHT * 0.44), 0);
    let n = 0;
    for (const b of bubblesRef.current) {
      if (!b.alive && n < 13) {
        b.alive    = true;
        b.age      = 0;
        b.maxAge   = 55 + Math.random() * 65;
        b.maxScale = 0.055 + Math.random() * 0.19;
        b.pos.copy(origin);
        b.vel.set(
          (Math.random() - 0.5) * 0.068,
          0.013 + Math.random() * 0.042,
          (Math.random() - 0.5) * 0.068,
        );
        n++;
      }
    }
  }, [gl]);

  // Pointer event listeners
  useEffect(() => {
    const el = gl.domElement;

    const onDown = (e: PointerEvent) => {
      drag.current.on = true;
      drag.current.lx = e.clientX;
      drag.current.ly = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.on) return;
      const dx = e.clientX - drag.current.lx;
      const dy = e.clientY - drag.current.ly;
      drag.current.vx = dx * 0.013;
      drag.current.vy = dy * 0.007;
      drag.current.ry += drag.current.vx;
      drag.current.rx  = Math.max(-0.52, Math.min(0.52, drag.current.rx + drag.current.vy));
      drag.current.lx  = e.clientX;
      drag.current.ly  = e.clientY;
    };
    const onUp = () => {
      drag.current.on = false;
      el.style.cursor = "grab";
    };
    const onClick = (e: MouseEvent) => emitAt(e.clientX, e.clientY);

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup",   onUp);
    el.addEventListener("click",       onClick);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup",   onUp);
      el.removeEventListener("click",       onClick);
    };
  }, [gl, emitAt]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const d = drag.current;

    // Inertia + auto-rotation
    if (!d.on) {
      d.vx *= 0.92; d.vy *= 0.92;
      d.ry += d.vx;
      d.rx += d.vy;
      d.rx *= 0.986;
    }
    groupRef.current.rotation.y = d.ry + t * 0.07;
    groupRef.current.rotation.x = d.rx;

    // Bubble physics + render
    bubblesRef.current.forEach((b, i) => {
      if (!b.alive) {
        dummy.scale.setScalar(0);
        dummy.position.set(0, 0, 0);
        dummy.updateMatrix();
        bubbleRef.current.setMatrixAt(i, dummy.matrix);
        return;
      }
      b.age++;
      b.pos.addScaledVector(b.vel, 1);
      b.vel.y -= 0.00028; // gentle gravity
      const prog = b.age / b.maxAge;
      if (prog >= 1) {
        b.alive = false;
        dummy.scale.setScalar(0);
        dummy.position.set(0, 0, 0);
      } else {
        dummy.position.copy(b.pos);
        dummy.scale.setScalar(b.maxScale * Math.sin(prog * Math.PI));
      }
      dummy.updateMatrix();
      bubbleRef.current.setMatrixAt(i, dummy.matrix);
    });
    bubbleRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Tiny particle cloud — cream white, forms the helical backbone */}
      <points geometry={smallGeo}>
        <pointsMaterial
          size={0.026}
          color="#FFF0D8"
          transparent opacity={0.62}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Larger colored spheres — amber strand + blue strand */}
      <instancedMesh ref={largeRef} args={[undefined, undefined, LARGE_TOTAL]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial roughness={0.42} metalness={0.08} transparent opacity={0.9} />
      </instancedMesh>

      {/* Bubble particles emitted on click */}
      <instancedMesh ref={bubbleRef} args={[undefined, undefined, MAX_BUBBLES]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="#F69A1E" roughness={0.28} metalness={0.22} transparent opacity={0.8} />
      </instancedMesh>
    </group>
  );
};

// ── Lights + fog ──────────────────────────────────────────────
const DNASceneInner = ({ fogColor }: { fogColor: string }) => (
  <>
    <fog attach="fog" args={[fogColor, 15, 32]} />
    <ambientLight intensity={2.8}  color="#fff8f0" />
    <directionalLight position={[4, 8, 6]}  intensity={1.9}  color="#FFE4A0" />
    <pointLight       position={[-3, 3, 5]} intensity={2.4}  color="#F69A1E" />
    <pointLight       position={[3, -3, 4]} intensity={1.8}  color="#7BAEFF" />
    <DNACore />
  </>
);

// ── Public component ──────────────────────────────────────────
type Props = { fogColor?: string; vignetteColor?: string };

const DNAScene = ({
  fogColor      = "#FFF8ED",
  vignetteColor = "rgba(255,248,237,",
}: Props) => (
  <div className="relative w-full h-full" style={{ cursor: "grab" }}>
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 54, position: [0, 0, 8.5], near: 0.1, far: 60 }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <DNASceneInner fogColor={fogColor} />
      </Suspense>
    </Canvas>
    {/* Soft vignette to blend edges into the hero background */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at center, transparent 44%, ${vignetteColor}0.58) 100%)`,
      }}
    />
  </div>
);

export default DNAScene;
