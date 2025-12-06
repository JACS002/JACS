// QuienSoy.jsx
import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Html,
  Points,
  PointMaterial,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import techColors from "../utils/techColors";
import styles from "./styles/QuienSoy.module.css";
import { useLang } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

// ---- helpers ----
function softenColor(hex, amount = 0.2) {
  if (!hex) return "#ffffff";
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

// ---------- PLANETA CENTRAL ----------
const MainPlanet = forwardRef(function MainPlanet(_props, ref) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[1.2, 48, 48]} />
          <meshStandardMaterial
            color="#9d6bff"
            emissive="#864cef"
            emissiveIntensity={1.5}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.04, 24, 96]} />
          <meshStandardMaterial color="#c7d2fe" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
});

// ---------- LUNA / SKILL ----------
const SkillMoon = forwardRef(function SkillMoon(
  { name, color, position },
  ref
) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float
      speed={hovered ? 3 : 2}
      rotationIntensity={1.0}
      floatIntensity={hovered ? 1.8 : 1.2}
    >
      <mesh
        ref={ref}
        position={position}
        scale={hovered ? 1.2 : 1}
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
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.1 : 0.7}
          roughness={0.35}
          metalness={0.35}
        />

        <Html distanceFactor={8} position={[0, 0.6, 0]}>
          <div className="px-2 py-1 rounded-full bg-black/80 text-[10px] text-white border border-white/10">
            {name}
          </div>
        </Html>
      </mesh>
    </Float>
  );
});

// ---------- ESTRELLAS INTERNAS ----------
function InnerStars() {
  const groupRef = useRef();
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 2.2;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.4;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          size={0.04}
          sizeAttenuation
          depthWrite={false}
          transparent
          opacity={0.35}
          color="#ffffff"
        />
      </Points>
    </group>
  );
}

// ---------- SISTEMA DE ÓRBITAS ----------
function OrbitingSkills({ moonsRef }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  const skills = [
    { name: "React", position: [2.3, 0.4, 0] },
    { name: "Node.js", position: [-2.1, -0.3, 0.4] },
    { name: "Express", position: [0.2, 1.9, -0.6] },
    { name: "MongoDB", position: [1.4, -1.7, -0.3] },
    { name: "Docker", position: [-1.8, 1.4, 0.7] },
    { name: "AWS", position: [0.5, -2.2, 1.1] },
  ];

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => {
        const baseColor = techColors[skill.name] || "#ffffff";
        const softColor = softenColor(baseColor, 0.2);

        return (
          <SkillMoon
            key={skill.name}
            name={skill.name}
            color={softColor}
            position={skill.position}
            ref={(el) => (moonsRef.current[i] = el)}
          />
        );
      })}
    </group>
  );
}

// ---------- ESCENA 3D CON PARALLAX + GSAP ----------
function OrbitScene() {
  const planetRef = useRef();
  const moonsRef = useRef([]);
  const sceneGroupRef = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (!sceneGroupRef.current) return;
    const targetRotX = mouse.y * 0.1;
    const targetRotY = mouse.x * 0.15;

    sceneGroupRef.current.rotation.x +=
      (targetRotX - sceneGroupRef.current.rotation.x) * 0.08;
    sceneGroupRef.current.rotation.y +=
      (targetRotY - sceneGroupRef.current.rotation.y) * 0.08;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!planetRef.current) return;

      const tl = gsap.timeline({ paused: true });

      planetRef.current.position.z = -2;
      planetRef.current.scale.set(0.8, 0.8, 0.8);
      moonsRef.current.forEach((moon) => {
        if (moon) moon.scale.set(0, 0, 0);
      });

      tl.to(
        planetRef.current.position,
        {
          z: 0,
          duration: 1.6,
          ease: "power2.out",
        },
        0
      ).to(
        planetRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.6,
          ease: "power2.out",
        },
        0
      );

      moonsRef.current.forEach((moon, index) => {
        if (!moon) return;
        tl.to(
          moon.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
          },
          0.3 + index * 0.12
        );
      });

      ScrollTrigger.create({
        trigger: "#quien-soy",
        start: "top 70%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 2]} intensity={0.5} />
      <pointLight position={[-3, -2, -3]} intensity={0.3} />

      <group ref={sceneGroupRef} scale={0.85} position={[0, -0.1, 0]}>
        <MainPlanet ref={planetRef} />
        <OrbitingSkills moonsRef={moonsRef} />
        <InnerStars />
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// ---------- SECCIÓN COMPLETA ----------
// ---------- SECCIÓN COMPLETA ----------
export default function QuienSoy() {
  const { t } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título
      const title = document.querySelector(".sobre-mi-title");
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
              duration: 0.6,
              ease: "power2.out",
            }),
          // cuando se va por abajo
          onLeave: () =>
            gsap.to(title, {
              y: -24,
              autoAlpha: 0,
              duration: 0.4,
              ease: "power2.inOut",
            }),
          // cuando vuelves a subir y vuelve a entrar
          onEnterBack: () =>
            gsap.to(title, {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power2.out",
            }),
          // cuando se va por arriba
          onLeaveBack: () =>
            gsap.to(title, {
              y: 24,
              autoAlpha: 0,
              duration: 0.4,
              ease: "power2.inOut",
            }),
        });
      }

      // Párrafos
      gsap.utils.toArray(".sobre-mi-paragraph").forEach((el, index) => {
        gsap.set(el, { autoAlpha: 0, y: 24 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          end: "bottom 15%",
          onEnter: () =>
            gsap.to(el, {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              ease: "power2.out",
              delay: index * 0.03,
            }),
          // sale por abajo
          onLeave: () =>
            gsap.to(el, {
              y: -24,
              autoAlpha: 0,
              duration: 0.4,
              ease: "power2.inOut",
            }),
          // vuelve a entrar desde abajo al hacer scroll hacia arriba
          onEnterBack: () =>
            gsap.to(el, {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              ease: "power2.out",
              delay: index * 0.03,
            }),
          // sale por arriba
          onLeaveBack: () =>
            gsap.to(el, {
              y: 24,
              autoAlpha: 0,
              duration: 0.4,
              ease: "power2.inOut",
            }),
        });
      });
    }, "#quien-soy");

    return () => ctx.revert();
  }, []);



  return (
    <section
      id="quien-soy"
      className="
        min-h-screen
        flex items-center justify-center
        mb-12
      "
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div className="text-white font-contenido px-8 py-9 md:px-10 md:py-6">
          <h1
            className={`sobre-mi-title ${styles.mainTitle} font-titulos text-4xl md:text-5xl font-bold mb-12`}
          >
            {t("about.title")}
          </h1>

          <p className="sobre-mi-paragraph text-base md:text-lg text-gray-300 leading-relaxed mb-6">
            {t("about.p1.a")}
            <span className="text-accent font-semibold">
              {t("about.p1.b")}
            </span>
            {t("about.p1.c")}
            <span className="text-accent font-semibold">
              {t("about.p1.d")}
            </span>
            {t("about.p1.e")}
          </p>

          <p className="sobre-mi-paragraph text-base md:text-lg text-gray-300 leading-relaxed mb-6">
            {t("about.p2.a")}
            <span className="text-accent font-semibold">
              {t("about.p2.b")}
            </span>
            {t("about.p2.c")}
            <span className="text-accent font-semibold">
              {t("about.p2.d")}
            </span>
            {t("about.p2.e")}
          </p>

          <p className="sobre-mi-paragraph text-base md:text-lg text-gray-400 leading-relaxed mb-6">
            {t("about.p3.a")}
            <span className="font-semibold">{t("about.p3.b")}</span>
            {t("about.p3.c")}
            <span className="font-semibold">{t("about.p3.d")}</span>
            {t("about.p3.e")}
            <span className="font-semibold">{t("about.p3.f")}</span>
            {t("about.p3.g")}
          </p>

          <p className="sobre-mi-paragraph text-base md:text-lg text-gray-400 leading-relaxed">
            {t("about.p4.a")}
            <span className="font-semibold text-accent">
              {t("about.p4.b")}
            </span>
            {t("about.p4.c")}
            <span className="font-semibold text-accent">
              {t("about.p4.d")}
            </span>
            {t("about.p4.e")}
            <span className="font-semibold text-accent">
              {t("about.p4.f")}
            </span>
            {t("about.p4.g")}
            <span className="font-semibold text-accent">
              {t("about.p4.h")}
            </span>
            {t("about.p4.i")}
            <span className="font-semibold text-accent">
              {t("about.p4.j")}
            </span>
            {t("about.p4.k")}
          </p>
        </div>

        {/* Canvas 3D */}
        <div className="w-full h-[360px] sm:h-[400px] md:h-[480px] overflow-visible canvas-orbit-card">
          <Canvas
            camera={{ position: [0, 0, 5.6], fov: 45 }}
            gl={{ alpha: true }}
            style={{ background: "transparent", width: "100%", height: "100%", zIndex:0}}
          >
            <Suspense fallback={null}>
              <OrbitScene />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
