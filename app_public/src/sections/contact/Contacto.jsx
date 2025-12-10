// src/components/Contacto.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contacto.module.css";
import { useLang } from "../../context/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Contacto() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const { t } = useLang();

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
      contact: true,
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // HEADER
      const header = sectionRef.current?.querySelector(".contact-header");

      if (header) {
        gsap.set(header, { autoAlpha: 0, y: 24 });

        ScrollTrigger.create({
          trigger: header,
          start: "top 85%",
          end: "bottom 20%",
          onEnter: () =>
            gsap.to(header, {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power2.out",
            }),
          onLeave: () =>
            gsap.to(header, {
              y: -24,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),
          onEnterBack: () =>
            gsap.to(header, {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power2.out",
            }),
          onLeaveBack: () =>
            gsap.to(header, {
              y: 24,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.inOut",
            }),
        });
      }

      // CARDS EN ZIG-ZAG
      itemRefs.current.forEach((el, index) => {
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

      // Ya no animamos .contact-node con GSAP: lo hace el CSS
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="min-h-screen flex flex-col pt-16 pb-20 px-6 md:px-10 mt-12 mb-12"
    >
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-12 contact-header">
        <p className="text-sm md:text-base tracking-[0.25em] uppercase text-accent mb-3 font-contenido">
          {t("contact.tag")}
        </p>

        <h2
          className={`${styles.mainTitle} font-titulos text-4xl md:text-5xl sm:text-3xl font-bold mb-12`}
        >
          {t("contact.title")}
        </h2>

        <p className="font-contenido text-base md:text-base text-gray-300 leading-relaxed">
          {t("contact.p1")}
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-5xl mx-auto">
        {/* Línea central desktop */}
        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-accent/20 via-accent/60 to-accent/20 pointer-events-none" />

        {/* Línea lateral mobile */}
        <div className="md:hidden absolute inset-y-0 left-4 w-[2px] bg-gradient-to-b from-accent/20 via-accent/60 to-accent/20 pointer-events-none" />

        <div className="space-y-10 md:space-y-14">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={step.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="relative flex md:items-center"
              >
                {/* Nodo */}
                <div className={`contact-node ${styles.contactNode}`} />

                {/* Conector (desktop) */}
                <div
                  className={`${styles.connector} ${
                    isLeft ? styles.connectorLeft : styles.connectorRight
                  }`}
                />

                {/* Card */}
                <div
                  className={`
                    ${styles.stepCard}
                    ${step.highlight ? styles.stepCardHighlight : styles.stepCardNormal}
                    ${isLeft ? styles.stepCardLeft : styles.stepCardRight}
                    font-contenido
                  `}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-gray-400">
                      {step.label || "··"}
                    </span>
                    <span className="text-2xl md:text-3xl">{step.icon}</span>
                  </div>

                  <h3
                    className={`
                      ${styles.stepTitle}
                      ${step.highlight ? styles.stepTitleHighlight : ""}
                      font-titulos
                    `}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                    {step.text}
                  </p>

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
