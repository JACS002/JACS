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

  if (title.includes("cenespe industrias") || title.includes("cenespe"))
    return "Cenespe";

  if (title.includes("global print")) return "Global Print";
  if (title.includes("nyc taxi analytics")) return "NYC Analytics";
  if (title.includes("taxifare")) return "TaxiFare";
  if (title.includes("tradingml")) return "TradingML";
  if (
    title.includes("portafolio personal jacs") ||
    title.includes("jacs personal portfolio") ||
    title.includes("jacs")
  )
    return "JACS";

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
    orbitParamsRef.current = projects.map((_, i) => ({
      radius: baseRadius + i * radiusStep,
      speed: 0.25 + i * 0.05,
      tilt: new THREE.Euler(
        (Math.random() - 0.5) * Math.PI * 0.6,
        0,
        (Math.random() - 0.5) * Math.PI * 0.6
      ),
    }));
  }

  useFrame((_, delta) => {
    const paused = hoveredIndex !== null;

    orbitRefs.current.forEach((group, index) => {
      if (!group) return;
      const { speed } = orbitParamsRef.current[index];
      if (!paused) group.rotation.y += delta * speed;
    });

    moonRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const isActive = index === activeIndex;
      const isHovered = index === hoveredIndex;
      const target = isHovered ? 1.7 : isActive ? 1.3 : 1.0;

      const current = mesh.scale.x;
      const next = THREE.MathUtils.lerp(current, target, 0.15);
      mesh.scale.setScalar(next);
    });
  });

  return (
    <group>
      {projects.map((project, index) => {
        const params = orbitParamsRef.current[index];
        const texture = moonTextures[index];
        const label = getMoonLabel(project);
        const color = MOON_COLORS[index % MOON_COLORS.length];

        return (
          <Float
            key={project._id || index}
            speed={1.2}
            floatIntensity={0.9}
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
                        color: "#fff",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        boxShadow: "0 0 14px rgba(0,0,0,0.8)",
                        backdropFilter: "blur(10px)",
                        textShadow: "0 0 6px #000",
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

// =============================== ESCENA ==================
function Scene({
  projects,
  activeIndex,
  onSelect,
  lang,
  externalHoverIndex = null,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Solo true si el navegador detecta pointerType === "mouse"
  const [hasPointerDevice, setHasPointerDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePointerDown = (event) => {
      if (event.pointerType === "mouse") {
        setHasPointerDevice(true);
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === "mouse") {
        setHasPointerDevice(true);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const effectiveHover =
    externalHoverIndex !== null ? externalHoverIndex : hoveredIndex;

  const hoveredProject =
    effectiveHover != null ? projects[effectiveHover] : null;

  const handleHoverChange = (index) => {
    if (externalHoverIndex !== null) return;
    setHoveredIndex(index);
  };

  return (
    <>
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
              padding:
                "clamp(0.6rem, 1.5vw, 0.9rem) clamp(1.2rem, 3vw, 2.2rem)",
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
      onAssetsLoaded();
    }
  }, [active, onAssetsLoaded]);

  return null;
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
      <AssetProgress onAssetsLoaded={onAssetsLoaded} />
      <TextureLoadingOverlay lang={lang} />

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
