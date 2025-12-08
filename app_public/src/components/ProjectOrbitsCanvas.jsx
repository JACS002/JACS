// src/components/ProjectOrbitsCanvas.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Html,
  useTexture,
  // Stars,
  useProgress,
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Colores fallback para las lunas (por si algún día falta textura)
const MOON_COLORS = [
  "#4f8cff",
  "#ff7043",
  "#ffd54f",
  "#26c6da",
  "#ab47bc",
  "#81c784",
  "#ffb3e6",
  "#9ccc65",
];

// ------------------ helpers ------------------------
function getMoonTexturePath(project) {
  const titleObj = project?.title || "";
  const title =
    typeof titleObj === "string"
      ? titleObj
      : (titleObj.en || titleObj.es || "").toLowerCase();

  if (title.includes("cenespe")) return "/images/projects/luna-cenespe.webp";
  if (title.includes("global print")) return "/images/projects/luna-global.webp";
  if (title.includes("nyc taxi analytics"))
    return "/images/projects/luna-nyc-taxi.webp";
  if (title.includes("taxifare")) return "/images/projects/luna-taxifare.webp";
  if (title.includes("tradingml")) return "/images/projects/luna-trading.webp";
  if (title.includes("portfolio")) return "/images/projects/luna-jacs.webp";

  // fallback: reutilizamos la de JACS
  return "/images/projects/luna-jacs.webp";
}

function getLocalizedField(field, lang) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return lang === "es" ? field.es || field.en || "" : field.en || field.es || "";
}

//Nombre corto y bonito para la etiqueta de cada luna
function getMoonLabel(project) {
  const titleObj = project?.title || "";
  const raw =
    typeof titleObj === "string"
      ? titleObj
      : titleObj.en || titleObj.es || "";

  const title = raw.toLowerCase();

  //Importante: condiciones bien específicas y sin solaparse

  // Cenespe Industrias
  if (title.includes("cenespe industrias") || title.includes("cenespe")) {
    return "Cenespe";
  }

  // Global Print
  if (title.includes("global print")) {
    return "Global Print";
  }

  // NYC Taxi Analytics
  if (title.includes("nyc taxi analytics")) {
    return "NYC Analytics";
  }

  // TaxiFare – aquí ya NO usamos "nyc taxi" genérico
  if (title.includes("taxifare")) {
    return "TaxiFare";
  }

  // TradingML
  if (title.includes("tradingml")) {
    return "TradingML";
  }

  // Portafolio JACS (en/es)
  if (
    title.includes("portafolio personal jacs") ||
    title.includes("jacs personal portfolio") ||
    title.includes("jacs")
  ) {
    return "JACS";
  }

  // fallback: usa el título completo
  return raw;
}


// =============================== SATURNO =====================================
function Saturn() {
  const groupRef = useRef();
  const ringMeshRef = useRef();

  const saturnMap = useTexture("/images/projects/saturno.webp");
  const ringMap = useTexture("/images/projects/anillo.webp");

  const setupRingUVs = () => {
    if (!ringMeshRef.current) return;

    const geometry = ringMeshRef.current.geometry;
    const uvAttribute = geometry.attributes.uv;

    const cropStart = 0.1;
    const cropEnd = 0.9;
    const cropRange = cropEnd - cropStart;

    for (let i = 0; i < uvAttribute.count; i++) {
      const u = uvAttribute.getX(i);
      const v = uvAttribute.getY(i);
      const newU = cropStart + u * cropRange;
      const newV = cropStart + v * cropRange;
      uvAttribute.setXY(i, newU, newV);
    }

    uvAttribute.needsUpdate = true;
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;

    if (ringMeshRef.current && !ringMeshRef.current.userData.uvsConfigured) {
      setupRingUVs();
      ringMeshRef.current.userData.uvsConfigured = true;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshBasicMaterial map={saturnMap} />
      </mesh>

      <mesh
        ref={ringMeshRef}
        rotation={[Math.PI / 2.6, 0, 0]}
        position={[0, 0, 0]}
      >
        <ringGeometry args={[1.9, 2.9, 125]} />
        <meshBasicMaterial
          map={ringMap}
          transparent
          alphaTest={0.2}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// =============================== LUNAS / PROYECTOS ===========================
function SaturnMoons({
  projects,
  activeIndex,
  hoveredIndex,
  onSelect,
  onHoverChange,
  lang,
}) {
  const orbitRefs = useRef([]);
  const moonRefs = useRef([]);
  const orbitParamsRef = useRef([]);

  const baseRadius = 2.8;
  const radiusStep = 0.5;

  const moonTexturePaths = projects.map(getMoonTexturePath);
  const moonTextures = useTexture(moonTexturePaths);

  if (orbitParamsRef.current.length !== projects.length) {
    orbitParamsRef.current = projects.map((_, i) => {
      const radius = baseRadius + i * radiusStep;
      const speed = 0.25 + i * 0.05;
      const tiltX = (Math.random() - 0.5) * Math.PI * 0.6;
      const tiltZ = (Math.random() - 0.5) * Math.PI * 0.6;
      return {
        radius,
        speed,
        tilt: new THREE.Euler(tiltX, 0, tiltZ),
      };
    });
  }

  useFrame((_, delta) => {
    const paused = hoveredIndex !== null;

    orbitRefs.current.forEach((group, index) => {
      if (!group) return;
      const { speed } = orbitParamsRef.current[index];
      if (!paused) {
        group.rotation.y += delta * speed;
      }
    });

    moonRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const isActive = index === activeIndex;
      const isHovered = index === hoveredIndex;
      const targetScale = isHovered ? 1.7 : isActive ? 1.3 : 1.0;

      const current = mesh.scale.x;
      const next = THREE.MathUtils.lerp(current, targetScale, 0.15);
      mesh.scale.setScalar(next);
    });
  });

  return (
    <group>
      {projects.map((project, index) => {
        const isHovered = index === hoveredIndex;
        const color = MOON_COLORS[index % MOON_COLORS.length];
        const params = orbitParamsRef.current[index];
        const texture = moonTextures[index];
        const label = getMoonLabel(project);

        return (
          <Float
            key={project._id || index}
            speed={isHovered ? 2 : 1.2}
            floatIntensity={isHovered ? 1.5 : 0.9}
            rotationIntensity={0.7}
          >
            <group
              ref={(el) => (orbitRefs.current[index] = el)}
              rotation={params.tilt}
            >
              <mesh
                ref={(el) => (moonRefs.current[index] = el)}
                position={[params.radius, 0, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(index);
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  onHoverChange(index);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  onHoverChange(null);
                  document.body.style.cursor = "default";
                }}
              >
                <sphereGeometry args={[0.4, 28, 28]} />
                {texture ? (
                  <meshBasicMaterial map={texture} />
                ) : (
                  <meshBasicMaterial color={color} />
                )}

                {/* Etiqueta grande sobre cada luna */}
                {hoveredIndex === null && (
                  <Html
                    distanceFactor={10}
                    position={[0, 0.75, 0]}
                    style={{ pointerEvents: "none" }}
                  >
                    <div
                      style={{
                        padding: "clamp(0.3rem, 0.8vw, 1rem)",
                        borderRadius: "999px",
                        background: "rgba(0,0,0,0.9)",
                        border: "1px solid rgba(156,101,242,0.95)",
                        color: "#ffffff",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        boxShadow: "0 0 14px rgba(0,0,0,0.8)",
                        backdropFilter: "blur(10px)",
                        textShadow: "0 0 6px #000000",
                      }}
                    >
                      {label}
                    </div>
                  </Html>
                )}
              </mesh>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

// =============================== ESCENA (dentro del Canvas) ==================
function Scene({
  projects,
  activeIndex,
  onSelect,
  lang,
  externalHoverIndex = null,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // detectar si hay un mouse/pointer disponible
  const [hasPointerDevice, setHasPointerDevice] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPointerCapability = () => {
      // Detectar si hay un dispositivo de puntero fino (mouse, trackpad, stylus)
      // matchMedia con 'pointer: fine' detecta mouse/trackpad
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      
      // También detectar si hay ANY pointer device (incluye touch)
      const hasAnyPointer = window.matchMedia("(any-pointer: fine)").matches;
      
      // Si tiene pointer fino O any-pointer fino, activar controles
      setHasPointerDevice(hasFinePointer || hasAnyPointer);
    };

    checkPointerCapability();
    
    // Escuchar cambios (por ejemplo, conectar/desconectar mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const anyPointerQuery = window.matchMedia("(any-pointer: fine)");
    
    mediaQuery.addEventListener("change", checkPointerCapability);
    anyPointerQuery.addEventListener("change", checkPointerCapability);
    
    return () => {
      mediaQuery.removeEventListener("change", checkPointerCapability);
      anyPointerQuery.removeEventListener("change", checkPointerCapability);
    };
  }, []);

  // si viene un hover desde la lista, tiene prioridad
  const effectiveHover =
    externalHoverIndex !== null ? externalHoverIndex : hoveredIndex;

  const hoveredProject =
    effectiveHover != null ? projects[effectiveHover] : null;

  const handleHoverChange = (index) => {
    // si la lista está controlando el hover, ignoramos el del mouse
    if (externalHoverIndex !== null) return;
    setHoveredIndex(index);
  };

  return (
    <>
      {/* Fondo de estrellas opcional */}
      {/* <Stars
        radius={60}
        depth={40}
        count={8000}
        factor={2}
        saturation={0}
        fade
      /> */}

      <ambientLight intensity={0.4} />

      <Saturn />

      <SaturnMoons
        projects={projects}
        activeIndex={activeIndex}
        hoveredIndex={effectiveHover}
        onSelect={onSelect}
        onHoverChange={handleHoverChange}
        lang={lang}
      />

      {/*Nombre del proyecto al centro cuando está hover */}
      {hoveredProject && (
        <Html
          fullscreen
          style={{
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              padding: "clamp(0.6rem, 1.5vw, 0.9rem) clamp(1.2rem, 3vw, 2.2rem)",
              borderRadius: "999px",
              background: "rgba(0,0,0,0.9)",
              border: "1px solid rgba(156,101,242,0.95)",
              color: "#ffffff",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.85rem, 2.2vw, 1.5rem)",
              whiteSpace: "nowrap",
              boxShadow: "0 0 18px rgba(0,0,0,0.8)",
              backdropFilter: "blur(14px)",
              textShadow: "0 0 10px #000000",
            }}
          >
            {getLocalizedField(hoveredProject.title, lang)}
          </div>
        </Html>
      )}

      {/* Mostrar OrbitControls solo si hay dispositivo de puntero fino (mouse) */}
      {hasPointerDevice && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!effectiveHover}
          autoRotateSpeed={0.25}
          target={[0, 0, 0]}
        />
      )}
    </>
  );
}

// =================== COMPONENTE PARA AVISAR AL PADRE ========================
function AssetProgress({ onAssetsLoaded }) {
  const { active } = useProgress();

  useEffect(() => {
    if (!active && onAssetsLoaded) {
      onAssetsLoaded(); // ✅ ya cargaron texturas / assets
    }
  }, [active, onAssetsLoaded]);

  return null; // no dibuja nada dentro del canvas
}

// ===================== OVERLAY "CARGANDO TEXTURAS" ===========================
function TextureLoadingOverlay({ lang }) {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <Html
      fullscreen
      style={{
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
      }}
    >
      <div
        style={{
          padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)",
          borderRadius: "999px",
          background: "rgba(0,0,0,0.85)",
          border: "1px solid rgba(156,101,242,0.95)",
          color: "#ffffff",
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(0.75rem, 1.8vw, 1rem)",
          boxShadow: "0 0 18px rgba(0,0,0,0.8)",
          backdropFilter: "blur(14px)",
          textShadow: "0 0 10px #000000",
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        <span>
          {lang === "es" ? "Cargando texturas..." : "Loading textures..."}
        </span>
        <span style={{ opacity: 0.8 }}>{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

// =============================== WRAPPER DEL CANVAS ==========================
export default function ProjectOrbitsCanvas({
  projects,
  activeIndex,
  onSelect,
  lang,
  externalHoverIndex = null,
  onAssetsLoaded,
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{
        width: "100%",
        height: "100%",
        touchAction: "pan-y",
      }}
    >
      {/* escucha progreso de carga y avisa al padre */}
      <AssetProgress onAssetsLoaded={onAssetsLoaded} />

      {/* overlay de carga de texturas */}
      <TextureLoadingOverlay lang={lang} />

      {/* Escena principal */}
      <Scene
        projects={projects}
        activeIndex={activeIndex}
        onSelect={onSelect}
        lang={lang}
        externalHoverIndex={externalHoverIndex}
      />
    </Canvas>
  );
}