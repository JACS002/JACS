// src/components/QuienSoy.jsx
// -----------------------------------------------------------------------------
// Sección "Quién soy" del portfolio
// - Texto + escena 3D de constelación de skills
// - Usa GSAP + ScrollTrigger para animaciones de entrada/salida con scroll
// - Canvas 3D optimizado: solo se monta cuando entra en viewport y
//   reduce trabajo cuando no está visible.
// -----------------------------------------------------------------------------

import {
  Suspense,
  useRef,
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import styles from "./QuienSoy.module.css";
import { useLang } from "../../context/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// HELPER: RICH TEXT PARSER
// Parsea texto con etiquetas <h>...</h> (highlight) y <b>...</b> (bold)
// ============================================================================
const RichText = ({ text }) => {
  if (!text) return null;
  // Separa por etiquetas manteniendo los delimitadores
  const parts = text.split(/(<h>.*?<\/h>|<b>.*?<\/b>)/g);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith("<h>") && part.endsWith("</h>")) {
          return (
            <span key={index} className="text-accent font-semibold">
              {part.replace(/<\/?h>/g, "")}
            </span>
          );
        }
        if (part.startsWith("<b>") && part.endsWith("</b>")) {
          return (
            <span key={index} className="font-semibold text-white/90">
              {part.replace(/<\/?b>/g, "")}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};

// ============================================================================
// 3D: CONSTELACIÓN DE SKILLS
// ============================================================================

// Nodo de skill: esfera con cross-fade de texturas + etiqueta
function SkillBubble({
  name,
  position,
  size = 0.15,
  baseTexture,
  hoverTexture,
}) {
  const [hovered, setHovered] = useState(false);

  const groupRef = useRef();
  const blendRef = useRef(0); // 0 = solo base, 1 = solo hover
  const baseMatRef = useRef();
  const hoverMatRef = useRef();

  useFrame(() => {
    const target = hovered ? 1 : 0;
    // mezcla suave entre base y hover
    blendRef.current = THREE.MathUtils.lerp(blendRef.current, target, 0.12);

    const b = 1 - blendRef.current; // opacidad base
    const h = blendRef.current; // opacidad hover

    if (baseMatRef.current) baseMatRef.current.opacity = b;
    if (hoverMatRef.current) hoverMatRef.current.opacity = h;

    // pequeño scale suave en hover
    if (groupRef.current) {
      const targetScale = 1 + blendRef.current * 0.06;
      const s = THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        targetScale,
        0.12,
      );
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Esfera base */}
      <mesh>
        <sphereGeometry args={[size, 20, 20]} />
        <meshBasicMaterial
          ref={baseMatRef}
          map={baseTexture}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Esfera hover (encima de la base) */}
      <mesh>
        <sphereGeometry args={[size, 20, 20]} />
        <meshBasicMaterial
          ref={hoverMatRef}
          map={hoverTexture}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* Etiqueta */}
      <Html distanceFactor={6} position={[0, size + 0.4, 0]}>
        <div className={styles.skillLabel}>{name}</div>
      </Html>
    </group>
  );
}

// Líneas que conectan los nodos de la constelación
function SkillLinks({ nodes }) {
  const lineRef = useRef();

  const edges = useMemo(() => {
    const e = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      e.push([i, i + 1]);
    }
    if (nodes.length > 4) {
      const mid = Math.floor(nodes.length / 2);
      e.push([0, mid]);
      e.push([mid, nodes.length - 1]);
    }
    return e;
  }, [nodes]);

  const positions = useMemo(() => {
    const arr = [];
    edges.forEach(([a, b]) => {
      const pa = nodes[a].position;
      const pb = nodes[b].position;
      arr.push(pa[0], pa[1], pa[2], pb[0], pb[1], pb[2]);
    });
    return new Float32Array(arr);
  }, [edges, nodes]);

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#a5b4fc" transparent opacity={0.65} />
    </lineSegments>
  );
}

// Escena principal de la constelación (recibe isActive para pausar animación)
function SkillConstellationScene({ isActive }) {
  const groupRef = useRef();
  const { mouse } = useThree();

  const baseTexture = useTexture("/images/projects/estrellabase.webp");
  const hoverTexture = useTexture("/images/projects/estrellahover.webp");

  baseTexture.colorSpace = THREE.SRGBColorSpace;
  hoverTexture.colorSpace = THREE.SRGBColorSpace;

  // Nodos de skills (ACTUALIZADOS A TU STACK)
  const nodes = useMemo(
    () => [
      // Frontend Core
      { name: "React", position: [-2.2, -1.6, 0.2] },

      // Backend (Node & Python ecosystem)
      { name: "Node.js", position: [-0.8, -0.9, 1.0] },
      { name: "FastAPI", position: [1.0, -0.3, -0.7] },
      { name: "Django", position: [0.8, 1.5, -0.5] },

      // Data & DB
      { name: "MongoDB", position: [2.3, -1.2, 0.4] },
      { name: "PostgreSQL", position: [2.5, 0.7, 0.9] },

      // DevOps & Tools
      { name: "Docker", position: [-2.6, 0.4, -1.0] },
      { name: "AWS", position: [-1.4, 2.0, 0.4] },
      { name: "Spark", position: [0.0, 0.1, 1.4] },
      { name: "Git", position: [-0.5, -2.2, -0.6] },
    ],
    [],
  );

  useFrame((_, delta) => {
    if (!groupRef.current || !isActive) return;

    const targetX = mouse.y * 0.25;
    const targetY = mouse.x * 0.4;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.08;

    groupRef.current.rotation.z += delta * 0.02; // giro global suave
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={0.3} />
      <pointLight position={[-3, -2, -3]} intensity={0.2} />

      <group ref={groupRef} scale={1.4} position={[0, 0, 0]}>
        <SkillLinks nodes={nodes} />
        {nodes.map((node) => (
          <SkillBubble
            key={node.name}
            name={node.name}
            position={node.position}
            baseTexture={baseTexture}
            hoverTexture={hoverTexture}
          />
        ))}
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={isActive}
        autoRotateSpeed={0.35}
      />
    </>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL: SECCIÓN "QUIÉN SOY"
// ============================================================================

export default function QuienSoy() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const paragraphRefs = useRef([]); // Array de refs dinámicos

  const [hasEntered, setHasEntered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Claves de los párrafos en el JSON de traducciones
  const paragraphKeys = ["about.p1", "about.p2", "about.p3", "about.p4"];

  // --------------------------
  // GSAP ScrollTrigger para título, párrafos y canvas
  // --------------------------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Título
      const title = sectionRef.current?.querySelector(".about-title");
      if (title) {
        gsap.set(title, { autoAlpha: 0, y: 24 });
        ScrollTrigger.create({
          trigger: title,
          start: "top 85%",
          end: "bottom 20%",
          onEnter: () =>
            gsap.to(title, {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power2.out",
            }),
          onLeave: () =>
            gsap.to(title, {
              y: -24,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),
          onEnterBack: () =>
            gsap.to(title, {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power2.out",
            }),
          onLeaveBack: () =>
            gsap.to(title, {
              y: 24,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),
        });
      }

      // 2. Párrafos (Loop optimizado)
      paragraphRefs.current.forEach((el, index) => {
        if (!el) return;
        const fromX = index % 2 === 0 ? -40 : 40;

        gsap.set(el, { autoAlpha: 0, x: fromX, y: 30 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 25%",
          onEnter: () =>
            gsap.to(el, {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
            }),
          onLeave: () =>
            gsap.to(el, {
              x: fromX * 0.6,
              y: -20,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),
          onEnterBack: () =>
            gsap.to(el, {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
            }),
          onLeaveBack: () =>
            gsap.to(el, {
              x: fromX * 0.6,
              y: 20,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),
        });
      });

      // 3. Canvas Container
      const canvasContainer =
        sectionRef.current?.querySelector(".about-canvas");
      if (canvasContainer) {
        gsap.set(canvasContainer, { autoAlpha: 0, y: 40 });
        ScrollTrigger.create({
          trigger: canvasContainer,
          start: "top 85%",
          end: "bottom 20%",
          onEnter: () =>
            gsap.to(canvasContainer, {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power2.out",
            }),
          onLeave: () =>
            gsap.to(canvasContainer, {
              y: -30,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.inOut",
            }),
          onEnterBack: () =>
            gsap.to(canvasContainer, {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power2.out",
            }),
          onLeaveBack: () =>
            gsap.to(canvasContainer, {
              y: 30,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.inOut",
            }),
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  // --------------------------
  // IntersectionObserver: visibilidad de la sección
  // --------------------------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setHasEntered(true); // montamos Canvas desde ahora
            setIsVisible(true); // está visible ahora
          } else {
            setIsVisible(false); // pausamos animación, pero no desmontamos
          }
        });
      },
      { threshold: [0.2] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="quien-soy"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center mb-12"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* TEXTO (Ahora dinámico y limpio) */}
        <div className="text-white font-contenido px-8 py-9 md:px-10 md:py-6">
          <h1
            className={`about-title ${styles.mainTitle} font-titulos text-4xl md:text-5xl sm:text-3xl font-bold mb-12`}
          >
            {t("about.title")}
          </h1>

          {paragraphKeys.map((key, index) => (
            <p
              key={key}
              ref={(el) => (paragraphRefs.current[index] = el)}
              className="about-paragraph text-base md:text-base text-gray-300 leading-relaxed mb-6 last:mb-0"
            >
              <RichText text={t(key)} />
            </p>
          ))}
        </div>

        {/* CANVAS 3D */}
        <div className="about-canvas w-full h-[520px] sm:h-[580px] md:h-[700px] lg:h-[800px] overflow-visible">
          {hasEntered && (
            <Canvas
              camera={{ position: [0, 0, 14], fov: 50 }}
              gl={{ alpha: true }}
              frameloop={isVisible ? "always" : "demand"}
              style={{
                background: "transparent",
                width: "100%",
                height: "100%",
                zIndex: 0,
              }}
            >
              <Suspense fallback={null}>
                <SkillConstellationScene isActive={isVisible} />
              </Suspense>
            </Canvas>
          )}
        </div>
      </div>
    </section>
  );
}
