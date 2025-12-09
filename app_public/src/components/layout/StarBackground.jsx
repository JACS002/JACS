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
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  // Detectar tamaño de pantalla
  useEffect(() => {
    const updateSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Eventos globales: scroll + mouse (siempre habilitado)
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      scrollRef.current.y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    // inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
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

      <CameraRig mouseRef={mouseRef} scrollRef={scrollRef} />
      <StarField scrollRef={scrollRef} screenSize={screenSize} />
    </Canvas>
  );
}

// -----------------------------------------------------------------------------
// Cámara: pequeño parallax + ligera respuesta al scroll
// -----------------------------------------------------------------------------
function CameraRig({ mouseRef, scrollRef }) {
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

    // Parallax del mouse (siempre habilitado, será 0,0 si no hay mouse)
    const mouseX = mouseRef.current.x * 0.8;
    const mouseY = mouseRef.current.y * 0.6;

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
function StarField({ scrollRef, screenSize }) {
  const groupRef = useRef();
  const lastScroll = useRef(0);

  // Calcular densidad de estrellas según tamaño de pantalla
  const getStarConfig = () => {
    const width = screenSize.width || 1920;
    
    // Móvil pequeño
    if (width <= 640) {
      return {
        deep: { count: 3000, radius: 180, depth: 90 },
        mid: { count: 1500, radius: 100, depth: 50 },
      };
    }
    // Tablet / laptop pequeño
    if (width <= 1024) {
      return {
        deep: { count: 4500, radius: 200, depth: 100 },
        mid: { count: 2200, radius: 120, depth: 60 },
      };
    }
    // Desktop / laptop grande
    if (width <= 1920) {
      return {
        deep: { count: 6000, radius: 220, depth: 110 },
        mid: { count: 3000, radius: 140, depth: 70 },
      };
    }
    // Pantallas muy grandes (4K+)
    return {
      deep: { count: 8000, radius: 250, depth: 120 },
      mid: { count: 4000, radius: 160, depth: 80 },
    };
  };

  const config = getStarConfig();

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
        radius={config.deep.radius}
        depth={config.deep.depth}
        count={config.deep.count}
        factor={4.2}
        saturation={0.2}
        speed={0.1}
        frustumCulled={false}
      />
      {/* Capa media */}
      <Stars
        radius={config.mid.radius}
        depth={config.mid.depth}
        count={config.mid.count}
        factor={2.4}
        saturation={0.4}
        speed={0.15}
        frustumCulled={false}
      />
    </group>
  );
}