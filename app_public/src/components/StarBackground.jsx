// src/components/StarBackground.jsx
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// -----------------------------------------------------------------------------
// Componente principal: canvas fijo con fondo estrellado
// -----------------------------------------------------------------------------
export default function StarBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });

  // Parallax SOLO con el mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      {/* Cámara que se mueve suave según el mouse */}
      <CameraRig mouseRef={mouseRef} />
      <StarField />
    </Canvas>
  );
}

// -----------------------------------------------------------------------------
// Cámara con parallax por movimiento de mouse
// -----------------------------------------------------------------------------
function CameraRig({ mouseRef }) {
  const { camera } = useThree();

  useFrame(() => {
    const { x, y } = mouseRef.current;

    // Target muy sutil (no queremos marear)
    const targetX = x * 1;  // cuánto se desplaza en X
    const targetY = y * 0.8;  // cuánto se desplaza en Y

    // Lerping suave
    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// -----------------------------------------------------------------------------
// Campo de estrellas en dos capas (cercana y lejana), estáticas
// -----------------------------------------------------------------------------
function StarField() {
  return (
    <>
      {/*Fondo profundo – estrellas grandes y suaves */}
      <Stars
        radius={180}
        depth={90}
        count={3000}
        factor={4.2}         // más grandes
        saturation={0.2}      // leve tono azulado
        // fade
        speed={0.1}
        frustumCulled={false}
      />

      {/*Capa media – estrellas más brillantes y notorias */}
      <Stars
        radius={100}
        depth={50}
        count={1500}
        factor={2.4}         // las hace más visibles sin exagerar
        saturation={0.4}
        // fade
        speed={0.15}
        frustumCulled={false}
      />
    </>
  );
}

