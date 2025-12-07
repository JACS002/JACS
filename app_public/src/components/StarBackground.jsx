// src/components/StarBackground.jsx
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// -----------------------------------------------------------------------------
// Componente principal: canvas fijo con fondo estrellado
// -----------------------------------------------------------------------------
export default function StarBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef({ y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  // Detectar dispositivo táctil
  useEffect(() => {
    const touch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
  }, []);

  // Eventos globales: scroll + mouse (solo desktop)
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      scrollRef.current.y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let handleMouseMove;
    if (!isTouch) {
      // Desktop: parallax con mouse
      handleMouseMove = (e) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("mousemove", handleMouseMove);
    }

    // inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isTouch]);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1000,
        pointerEvents: "none",
      }}
    >
      <color attach="background" args={["#02030a"]} />

      <CameraRig
        mouseRef={mouseRef}
        scrollRef={scrollRef}
        isTouch={isTouch}
      />
      <StarField scrollRef={scrollRef} />
    </Canvas>
  );
}

// -----------------------------------------------------------------------------
// Cámara: pequeño parallax + ligera respuesta al scroll
// -----------------------------------------------------------------------------
function CameraRig({ mouseRef, scrollRef, isTouch }) {
  const { camera } = useThree();

  useFrame(() => {
    const scrollY = scrollRef.current?.y || 0;

    // normalizamos ligeramente el scroll para dar un poco de movimiento
    const maxScrollApprox = 2000;
    const t = Math.min(scrollY / maxScrollApprox, 1);
    const warp = t * 0.8;

    const baseZ = 8;
    const targetZ = baseZ - warp * 1.2;
    const targetY = warp * 0.6;

    let mouseX = 0;
    let mouseY = 0;

    if (!isTouch) {
      mouseX = mouseRef.current.x * 0.8;
      mouseY = mouseRef.current.y * 0.6;
    }

    // mezcla suave
    camera.position.x += (mouseX - camera.position.x) * 0.06;
    camera.position.y += (targetY + mouseY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.06;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// -----------------------------------------------------------------------------
// Campo estelar: rotación suave según velocidad de scroll
// -----------------------------------------------------------------------------
function StarField({ scrollRef }) {
  const groupRef = useRef();
  const lastScroll = useRef(0);

  useFrame(() => {
    const scrollY = scrollRef.current?.y || 0;

    // diferencia de scroll entre frames → "velocidad"
    const deltaScroll = scrollY - lastScroll.current;
    lastScroll.current = scrollY;

    // intensidad limitada (para evitar locuras)
    const intensity = Math.max(Math.min(deltaScroll / 300, 0.05), -0.05);

    if (!groupRef.current) return;

    // extra por scroll: girar en los 3 ejes tipo "globo espacial"
    groupRef.current.rotation.y += intensity * 0.02; // giro horizontal
    groupRef.current.rotation.x += intensity * 0.01; // inclinación vertical
    groupRef.current.rotation.z += intensity * 0.05; // torsión leve
  });

  return (
    <group ref={groupRef}>
      {/* Capa profunda */}
      <Stars
        radius={180}
        depth={90}
        count={3000}
        factor={4.2}
        saturation={0.2}
        speed={0.1}
        frustumCulled={false}
      />
      {/* Capa media */}
      <Stars
        radius={100}
        depth={50}
        count={1500}
        factor={2.4}
        saturation={0.4}
        speed={0.15}
        frustumCulled={false}
      />
    </group>
  );
}
