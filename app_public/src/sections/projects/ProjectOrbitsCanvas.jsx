import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Html,
  useTexture,
  useProgress,
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Colores fallback
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

// ---------------- helpers ----------------
function getMoonTexturePath(project) {
  if (!project) return "/images/projects/luna-jacs.webp";

  // Usar shortLabel directamente (más confiable)
  const label = (project.shortLabel || "").toLowerCase();

  if (label === "cenespe") return "/images/projects/luna-cenespe.webp";
  if (label === "globalprint") return "/images/projects/luna-global.webp";
  if (label === "nyc analytics") return "/images/projects/luna-nyc-taxi.webp";
  if (label === "taxifare") return "/images/projects/luna-taxifare.webp";
  if (label === "tradingml") return "/images/projects/luna-trading.webp";
  if (label === "jacs") return "/images/projects/luna-jacs.webp";

  return "/images/projects/luna-jacs.webp";
}

function getLocalizedField(field, lang) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return lang === "es" ? field.es || field.en || "" : field.en || field.es || "";
}


function getMoonLabel(project) {
  if (!project) return "";

  // Si existe shortLabel
  if (project.shortLabel) return project.shortLabel;

  // Fallback en caso de que algún proyecto viejo no tenga shortLabel
  const title = project.title?.en || project.title?.es || "";
  return title;
}



// =============================== SATURNO ===============================
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
      uvAttribute.setXY(i, cropStart + u * cropRange, cropStart + v * cropRange);
    }
    uvAttribute.needsUpdate = true;
  };

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.25;
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

      <mesh ref={ringMeshRef} rotation={[Math.PI / 2.6, 0, 0]}>
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

// =============================== LUNAS ===============================
function SaturnMoons({
  projects,
  activeIndex,
  hoveredIndex,
  onSelect,
  onHoverChange,
  lang,
  onDragStart,
}) {
  const orbitRefs = useRef([]);
  const moonRefs = useRef([]);
  const orbitParamsRef = useRef([]);

  const baseRadius = 2.8;
  const radiusStep = 0.5;

  const moonTextures = useTexture(projects.map(getMoonTexturePath));

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

    orbitRefs.current.forEach((group, i) => {
      if (group && !paused)
        group.rotation.y += delta * orbitParamsRef.current[i].speed;
    });

    moonRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const isActive = i === activeIndex;
      const isHovered = i === hoveredIndex;
      const target = isHovered ? 1.7 : isActive ? 1.3 : 1.0;
      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, target, 0.15));
    });
  });

  return (
    <group>
      {projects.map((project, i) => {
        const params = orbitParamsRef.current[i];
        const label = getMoonLabel(project);

        return (
          <Float
            key={i}
            speed={1.2}
            floatIntensity={0.9}
            rotationIntensity={0.7}
          >
            <group
              ref={(el) => (orbitRefs.current[i] = el)}
              rotation={params.tilt}
            >
              <mesh
                ref={(el) => (moonRefs.current[i] = el)}
                position={[params.radius, 0, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(i);
                }}
                onPointerDown={(e) => {
                  if (e.pointerType === "mouse") {
                    onDragStart?.();
                  }
                }}
                onPointerOver={() => {
                  onHoverChange(i);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  onHoverChange(null);
                  document.body.style.cursor = "default";
                }}
              >
                <sphereGeometry args={[0.4, 28, 28]} />
                <meshBasicMaterial
                  map={moonTextures[i] || null}
                  color={
                    !moonTextures[i]
                      ? MOON_COLORS[i % MOON_COLORS.length]
                      : null
                  }
                />

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
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                        textTransform: "uppercase",
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

// =============================== ESCENA ===============================
function Scene({
  projects,
  activeIndex,
  onSelect,
  lang,
  externalHoverIndex = null,
  onDetectMouse,
  onDragStart,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hasPointerDevice, setHasPointerDevice] = useState(false);

  useEffect(() => {
    const detect = (event) => {
      if (event.pointerType === "mouse") {
        setHasPointerDevice(true);
        onDetectMouse?.();
      }
    };

    window.addEventListener("pointerdown", detect);
    window.addEventListener("pointermove", detect);

    return () => {
      window.removeEventListener("pointerdown", detect);
      window.removeEventListener("pointermove", detect);
    };
  }, [onDetectMouse]);

  const effectiveHover =
    externalHoverIndex !== null ? externalHoverIndex : hoveredIndex;

  const hoveredProject =
    effectiveHover != null ? projects[effectiveHover] : null;

  return (
    <>
      <ambientLight intensity={0.4} />

      <Saturn />

      <SaturnMoons
        projects={projects}
        activeIndex={activeIndex}
        hoveredIndex={effectiveHover}
        onSelect={onSelect}
        onHoverChange={setHoveredIndex}
        lang={lang}
        onDragStart={onDragStart}
      />

      {hoveredProject && (
        <Html
          fullscreen
          style={{
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding:
                "clamp(0.6rem, 1.5vw, 0.9rem) clamp(1.2rem, 3vw, 2.2rem)",
              borderRadius: "999px",
              background: "rgba(0,0,0,0.9)",
              border: "1px solid rgba(156,101,242,0.95)",
              color: "#fff",
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

// =============================== LOADING ===============================
function AssetProgress({ onAssetsLoaded }) {
  const { active } = useProgress();

  useEffect(() => {
    if (!active && onAssetsLoaded) onAssetsLoaded();
  }, [active, onAssetsLoaded]);

  return null;
}

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
      }}
    >
      <div
        style={{
          padding: "1rem 2rem",
          background: "rgba(0,0,0,0.85)",
          borderRadius: "999px",
        }}
      >
        {lang === "es" ? "Cargando texturas..." : "Loading textures..."}{" "}
        {Math.round(progress)}%
      </div>
    </Html>
  );
}

// =============================== CANVAS WRAPPER ===============================
export default function ProjectOrbitsCanvas({
  projects,
  activeIndex,
  onSelect,
  lang,
  externalHoverIndex = null,
  onAssetsLoaded,
  onDetectMouse,
  onDragStart,
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
    >
      <AssetProgress onAssetsLoaded={onAssetsLoaded} />
      <TextureLoadingOverlay lang={lang} />

      <Scene
        projects={projects}
        activeIndex={activeIndex}
        onSelect={onSelect}
        lang={lang}
        externalHoverIndex={externalHoverIndex}
        onDetectMouse={onDetectMouse}
        onDragStart={onDragStart}
      />
    </Canvas>
  );
}
