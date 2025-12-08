// src/components/Contacto.jsx
// -----------------------------------------------------------------------------
// Sección "Contacto"
// -----------------------------------------------------------------------------
// Esta sección funciona como un "timeline" de cómo sería colaborar conmigo:
//   1) Idea inicial
//   2) Definición del proyecto
//   3) Lanzamiento
//   4) Iteración
//   5) Datos de contacto
//
// A nivel técnico muestra:
//   - Animaciones de entrada/salida con GSAP + ScrollTrigger
//   - Patrón zig-zag responsivo para las cards
//   - Efecto de pulso en los nodos de la línea temporal
//   - Integración con el sistema de i18n (useLang)
// -----------------------------------------------------------------------------

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles/Contacto.module.css";
import { useLang } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function Contacto() {
  // Ref de la sección completa (se usa como root para gsap.context)
  const sectionRef = useRef(null);

  // Ref para cada item del timeline (cards)
  const itemRefs = useRef([]);

  // Hook de traducciones
  const { t } = useLang();

  // ---------------------------------------------------------------------------
  // DATA: Pasos del timeline construidos desde el sistema de traducciones
  // ---------------------------------------------------------------------------
  const steps = [
    {
      id: 1,
      label: "01",
      icon: "💡",
      title: t("contact.s1.title"),
      text: t("contact.s1.text"),
    },
    {
      id: 2,
      label: "02",
      icon: "🛰️",
      title: t("contact.s2.title"),
      text: t("contact.s2.text"),
    },
    {
      id: 3,
      label: "03",
      icon: "🚀",
      title: t("contact.s3.title"),
      text: t("contact.s3.text"),
    },
    {
      id: 4,
      label: "04",
      icon: "🌌",
      title: t("contact.s4.title"),
      text: t("contact.s4.text"),
    },
    {
      id: 5,
      label: t("contact.tag"),
      icon: "📡",
      highlight: true,
      title: t("contact.s5.title"),
      text: t("contact.s5.text"),
      contact: true, // Paso final: contiene e-mail y redes
    },
  ];

  // ============================================================================
  // ANIMACIONES CON GSAP + SCROLLTRIGGER
  // ============================================================================
  useLayoutEffect(() => {
    // ctx asegura que los selectores y animaciones se limiten a esta sección
    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // 1) Animación del HEADER (título + párrafo)
      // -----------------------------------------------------------------------
      const header = sectionRef.current?.querySelector(".contact-header");

      if (header) {
        // Estado inicial
        gsap.set(header, { autoAlpha: 0, y: 24 });

        ScrollTrigger.create({
          trigger: header,
          start: "top 85%",
          end: "bottom 20%",

          // Entra cuando el header entra en viewport
          onEnter: () =>
            gsap.to(header, {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power2.out",
            }),

          // Se va hacia arriba cuando sale por abajo
          onLeave: () =>
            gsap.to(header, {
              y: -24,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),

          // Vuelve a aparecer al hacer scroll hacia arriba
          onEnterBack: () =>
            gsap.to(header, {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power2.out",
            }),

          // Se oculta hacia abajo al salir por la parte superior
          onLeaveBack: () =>
            gsap.to(header, {
              y: 24,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),
        });
      }

      // -----------------------------------------------------------------------
      // 2) Animación de las CARDS en patrón zig-zag (igual que en QuienSoy)
      // -----------------------------------------------------------------------
      itemRefs.current.forEach((el, index) => {
        if (!el) return;

        // Alternar entrada desde la izquierda / derecha
        const fromX = index % 2 === 0 ? -40 : 40;

        // Estado inicial de cada card
        gsap.set(el, {
          autoAlpha: 0,
          x: fromX,
          y: 30,
        });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 25%",

          // Entra con desplazamiento + fade in
          onEnter: () =>
            gsap.to(el, {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
            }),

          // Desaparece al salir por abajo
          onLeave: () =>
            gsap.to(el, {
              x: fromX * 0.6,
              y: -20,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),

          // Vuelve a entrar al hacer scroll hacia arriba
          onEnterBack: () =>
            gsap.to(el, {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
            }),

          // Desaparece hacia el lado contrario al salir por arriba
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

      // -----------------------------------------------------------------------
      // 3) Efecto de PULSO en los nodos de la línea temporal
      // -----------------------------------------------------------------------
      // Todos los elementos con clase .contact-node pulsan de forma infinita.
      gsap.to(".contact-node", {
        scale: 1.15,
        boxShadow: "0 0 12px rgba(0,240,255,0.8)",
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
        stagger: 0.2, // pequeños desfases entre nodos
      });

      // Seguridad por si hay cambios en layout (imágenes, fuentes, etc.)
      ScrollTrigger.refresh();
    }, sectionRef);

    // Limpieza al desmontar o cambiar idioma
    return () => ctx.revert();
  }, [t]);

  // ============================================================================
  // RENDER DEL COMPONENTE
  // ============================================================================
  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="min-h-screen flex flex-col pt-16 pb-20 px-6 md:px-10 mt-12 mb-12"
    >
      {/* --------------------------------------------------------------------- */}
      {/* Header de la sección (título + descripción corta)                    */}
      {/* --------------------------------------------------------------------- */}
      <div className="max-w-4xl mx-auto mb-12 contact-header">
        <p className="text-sm md:text-base tracking-[0.25em] uppercase text-accent mb-3 font-contenido">
          {t("contact.tag")}
        </p>

        <h2
          className={`${styles.mainTitle} font-titulos text-4xl md:text-5xl sm:text-3xl font-bold mb-12`}
        >
          {t("contact.title")}
        </h2>

        <p className="font-contenido text-base md:text-lg text-gray-300 leading-relaxed">
          {t("contact.p1")}
        </p>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* Timeline vertical (estructura visual)                                 */}
      {/* --------------------------------------------------------------------- */}
      <div className="relative max-w-5xl mx-auto">
        {/* Línea central (desktop) */}
        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-accent/20 via-accent/60 to-accent/20 pointer-events-none" />

        {/* Línea lateral (mobile) */}
        <div className="md:hidden absolute inset-y-0 left-4 w-[2px] bg-gradient-to-b from-accent/20 via-accent/60 to-accent/20 pointer-events-none" />

        {/* Lista de pasos (cards) */}
        <div className="space-y-10 md:space-y-14">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0; // alternar lado en desktop

            return (
              <div
                key={step.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="relative flex md:items-center"
              >
                {/* Nodo circular sobre la línea */}
                <div
                  className={`
                    contact-node
                    absolute
                    top-2
                    md:top-1/2 md:-translate-y-1/2
                    rounded-full
                    w-4 h-4
                    bg-accent
                    border border-white/40
                    shadow-[0_0_8px_rgba(0,240,255,0.6)]
                    left-4 md:left-1/2 md:-ml-2
                  `}
                />

                {/* Conector pequeño desde el nodo hacia la card (solo desktop) */}
                <div
                  className={`
                    hidden md:block
                    absolute
                    top-1/2 -translate-y-1/2
                    h-[2px] w-10
                    bg-accent/40
                    ${isLeft ? "left-1/2" : "right-1/2 md:-scale-x-100"}
                  `}
                />

                {/* Tarjeta de contenido del paso */}
                <div
                  className={`
                    relative
                    mt-4 md:mt-0
                    w-full md:w-[48%]
                    rounded-3xl
                    border
                    ${step.highlight ? "border-accent/60" : "border-white/10"}
                    bg-black/40
                    backdrop-blur-md
                    px-6 py-7 md:px-7 md:py-8
                    text-white
                    shadow-[0_0_20px_rgba(0,0,0,0.5)]
                    font-contenido
                    ${isLeft ? "md:mr-auto md:pl-7" : "md:ml-auto md:pr-7"}
                    ${isLeft ? "md:pr-4" : "md:pl-4"}
                    ml-10 md:ml-0
                  `}
                >
                  {/* Cabecera de la card (etiqueta + icono) */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-gray-400">
                      {step.label || "··"}
                    </span>
                    <span className="text-2xl md:text-3xl">{step.icon}</span>
                  </div>

                  {/* Título del paso */}
                  <h3
                    className={`
                      font-titulos text-lg md:text-xl font-semibold mb-3
                      ${step.highlight ? "text-accent" : "text-white"}
                    `}
                  >
                    {step.title}
                  </h3>

                  {/* Descripción del paso */}
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                    {step.text}
                  </p>

                  {/* Bloque especial del último paso: datos de contacto */}
                  {step.contact && (
                    <div className="space-y-4 text-sm md:text-base">
                      <div>
                        <p className="text-gray-400 mb-1">
                          {t("contact.emailLabel")}
                        </p>
                        <a
                          href="mailto:joel.cuascota@hotmail.com"
                          className="text-accent hover:underline break-all"
                        >
                          joel.cuascota@hotmail.com
                        </a>
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="text-gray-400">
                          {t("contact.socialLabel")}
                        </p>

                        <div className="flex gap-4">
                          <a
                            href="https://github.com/JACS002"
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent hover:underline"
                          >
                            {t("contact.github")}
                          </a>

                          <a
                            href="https://www.linkedin.com/in/joel-cuascota-b49284308"
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent hover:underline"
                          >
                            {t("contact.linkedin")}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
