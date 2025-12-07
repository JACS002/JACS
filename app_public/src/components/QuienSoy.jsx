// src/components/QuienSoy.jsx
// -----------------------------------------------------------------------------
// Sección "Quién soy" del portfolio
// - Texto + escena 3D de constelación de skills
// - Usa GSAP + ScrollTrigger para animaciones de entrada/salida con scroll
// -----------------------------------------------------------------------------

import React, {
  Suspense,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";               // 👈 NUEVO
import techColors from "../utils/techColors";
import styles from "./styles/QuienSoy.module.css";
import { useLang } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 3D: CONSTELACIÓN DE SKILLS
// ============================================================================

// Nodo de skill (núcleo + halo + etiqueta)
function SkillBubble({ name, position, size = 0.3 }) {
  const [hovered, setHovered] = React.useState(false);
  const coreRef = useRef();
  const haloRef = useRef();

  const baseColor = techColors[name] || "#9d6bff";

  // suavizamos el color base hacia blanco
  const softColor = useMemo(() => {
    const hex = baseColor.replace("#", "");
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const mix = (c) => Math.round(c + (255 - c) * 0.25);
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
  }, [baseColor]);

  // pequeña animación suave de escala núcleo/halo en hover
  useFrame(() => {
    const targetCore = hovered ? 1.1 : 1;
    const targetHalo = hovered ? 1.7 : 1.4;

    if (coreRef.current) {
      const s = THREE.MathUtils.lerp(coreRef.current.scale.x, targetCore, 0.12);
      coreRef.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      const s = THREE.MathUtils.lerp(haloRef.current.scale.x, targetHalo, 0.12);
      haloRef.current.scale.setScalar(s);
    }
  });

  return (
    <group
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
      {/* Halo / glow exterior */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={hovered ? 0.25 : 0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Núcleo más mate, sin look de plástico */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[size * 0.9, 32, 32]} />
        <meshStandardMaterial
          color={softColor}
          emissive={softColor}
          emissiveIntensity={hovered ? 0.7 : 0.35}
          roughness={0.80}      // más rugoso → menos “caricatura”
          metalness={0.15}      // poco metal
        />
      </mesh>

      {/* Etiqueta */}
      <Html
        distanceFactor={6}
        position={[0, size + 0.4, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            padding: "0.24rem 0.75rem",
            borderRadius: "999px",
            background: "rgba(0,0,0,0.9)",
            border: "1px solid rgba(199,210,254,0.45)",
            color: "#ffffff",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "0.55rem",
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            boxShadow: "0 0 12px rgba(0,0,0,0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          {name}
        </div>
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
      <lineBasicMaterial
        color="#a5b4fc"
        transparent
        opacity={0.65}
      />
    </lineSegments>
  );
}

// Escena principal de la constelación
function SkillConstellationScene() {
  const groupRef = useRef();
  const { mouse } = useThree();

  const nodes = useMemo(
    () => [
      { name: "React",      position: [ 1.9,  0.9,  0.3] },
      { name: "Node.js",    position: [ 1.0, -0.1,  0.9] },
      { name: "Express",    position: [ 0.1, -0.7,  0.4] },
      { name: "MongoDB",    position: [-1.0, -0.3,  0.1] },
      { name: "PostgreSQL", position: [-1.7,  0.4,  0.3] },
      { name: "Python",     position: [-1.0,  1.1,  0.7] },
      { name: "SQL",        position: [ 0.0,  1.6,  0.4] },
      { name: "Docker",     position: [ 1.4,  1.4, -0.1] },
      { name: "APIRest",    position: [ 0.7,  0.7, -0.9] },
      { name: "Git",        position: [ 2.1,  0.1, -0.6] },
    ],
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

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

      <group ref={groupRef} scale={0.95} position={[0, 0, 0]}>
        <SkillLinks nodes={nodes} />
        {nodes.map((node) => (
          <SkillBubble
            key={node.name}
            name={node.name}
            position={node.position}
          />
        ))}
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
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
  const paragraphRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      paragraphRefs.current.forEach((el, index) => {
        if (!el) return;
        const fromX = index % 2 === 0 ? -40 : 40;

        gsap.set(el, {
          autoAlpha: 0,
          x: fromX,
          y: 30,
        });

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

  return (
    <section
      id="quien-soy"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center mb-12"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* TEXTO */}
        <div className="text-white font-contenido px-8 py-9 md:px-10 md:py-6">
          <h1
            className={`about-title ${styles.mainTitle} font-titulos text-4xl md:text-5xl font-bold mb-12`}
          >
            {t("about.title")}
          </h1>

          <p
            ref={(el) => (paragraphRefs.current[0] = el)}
            className="about-paragraph text-base md:text-lg text-gray-300 leading-relaxed mb-6"
          >
            {t("about.p1.a")}{" "}
            <span className="text-accent font-semibold">
              {t("about.p1.b")}
            </span>{" "}
            {t("about.p1.c")}{" "}
            <span className="text-accent font-semibold">
              {t("about.p1.d")}
            </span>{" "}
            {t("about.p1.e")}
          </p>

          <p
            ref={(el) => (paragraphRefs.current[1] = el)}
            className="about-paragraph text-base md:text-lg text-gray-300 leading-relaxed mb-6"
          >
            {t("about.p2.a")}{" "}
            <span className="text-accent font-semibold">
              {t("about.p2.b")}
            </span>{" "}
            {t("about.p2.c")}{" "}
            <span className="text-accent font-semibold">
              {t("about.p2.d")}
            </span>{" "}
            {t("about.p2.e")}
          </p>

          <p
            ref={(el) => (paragraphRefs.current[2] = el)}
            className="about-paragraph text-base md:text-lg text-gray-400 leading-relaxed mb-6"
          >
            {t("about.p3.a")}{" "}
            <span className="font-semibold">{t("about.p3.b")}</span>{" "}
            {t("about.p3.c")}{" "}
            <span className="font-semibold">{t("about.p3.d")}</span>{" "}
            {t("about.p3.e")}{" "}
            <span className="font-semibold">{t("about.p3.f")}</span>{" "}
            {t("about.p3.g")}
          </p>

          <p
            ref={(el) => (paragraphRefs.current[3] = el)}
            className="about-paragraph text-base md:text-lg text-gray-400 leading-relaxed"
          >
            {t("about.p4.a")}{" "}
            <span className="font-semibold text-accent">
              {t("about.p4.b")}
            </span>{" "}
            {t("about.p4.c")}{" "}
            <span className="font-semibold text-accent">
              {t("about.p4.d")}
            </span>{" "}
            {t("about.p4.e")}{" "}
            <span className="font-semibold text-accent">
              {t("about.p4.f")}
            </span>{" "}
            {t("about.p4.g")}{" "}
            <span className="font-semibold text-accent">
              {t("about.p4.h")}
            </span>{" "}
            {t("about.p4.i")}{" "}
            <span className="font-semibold text-accent">
              {t("about.p4.j")}
            </span>{" "}
            {t("about.p4.k")}
          </p>
        </div>

        {/* CANVAS 3D */}
        <div className="about-canvas w-full h-[420px] sm:h-[460px] md:h-[520px] overflow-visible">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 48 }}
            gl={{ alpha: true }}
            style={{
              background: "transparent",
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          >
            <Suspense fallback={null}>
              <SkillConstellationScene />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
