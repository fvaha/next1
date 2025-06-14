"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "./LanguageContext";
import { Feature } from "../types/feature";

/* ---------- language data ---------- */
import { features as featuresEn } from "../data/features.en";
import { features as featuresDe } from "../data/features.de";
import { features as featuresFr } from "../data/features.fr";
import { features as featuresAr } from "../data/features.ar";
import { features as featuresCr } from "../data/features.cr";
import { features as featuresNo } from "../data/features.no";
import { features as featuresRu } from "../data/features.ru";
import { features as featuresSp } from "../data/features.sp";

const featuresMap: Record<string, Feature[]> = {
  en: featuresEn,
  de: featuresDe,
  fr: featuresFr,
  ar: featuresAr,
  cr: featuresCr,
  no: featuresNo,
  ru: featuresRu,
  sp: featuresSp,
};

/* ---------- helpers ---------- */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function useWindowWidth() {
  // desktop fallback so SSR === first client render
  const [w, setW] = useState<number>(1024);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return w;
}

/* ---------- component ---------- */
export default function FeaturesGrid() {
  const { t, lang } = useLang();
  const mounted = useMounted();
  const width = useWindowWidth();
  const isMobile = mounted ? width < 640 : false; // always “desktop” on SSR

  const features = useMemo(() => featuresMap[lang] || featuresEn, [lang]);

  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const firstThree = features.slice(0, 3);
  const rest = features.slice(3);
  const visible = showAll ? features : firstThree;

  return (
    <div className="full-bleed w-full bg-white dark:bg-black transition-colors">
      <section
        id="features"
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6
                   px-6 py-16 sm:grid-cols-2 md:py-24 xl:grid-cols-3"
      >
        {visible.map((feature, i) => {
          const collapsed = isMobile && expanded !== i;

          return (
            <motion.div
              key={feature.title}
              whileHover={{
                y: -4,
                boxShadow: "0 10px 32px rgba(212,175,55,0.12)",
              }}
              className="relative flex flex-col rounded-xl border border-gold
                         bg-white p-6 shadow transition dark:bg-neutral-950"
              onClick={() => isMobile && setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center gap-3">
                <feature.icon className="h-6 w-6 text-gold" />
                <h2 className="text-xl font-bold text-gold">{feature.title}</h2>
              </div>

              <p className="mt-2 font-light text-neutral-700 dark:text-neutral-200">
                {feature.description}
              </p>

              {/* bullets: always rendered, just collapsed on mobile */}
              <ul
                className={`mt-4 space-y-2 overflow-hidden transition-[max-height,opacity] duration-300
                            ${
                              collapsed
                                ? "max-h-0 opacity-0"
                                : "max-h-96 opacity-100"
                            }`}
              >
                {feature.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2 text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="mt-1 text-gold">●</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {feature.image || feature.imageDark ? (
                <div className="pointer-events-none absolute bottom-4 right-4 w-20 opacity-50">
                  {feature.image && (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={80}
                      height={80}
                      unoptimized
                      className="block dark:hidden"
                    />
                  )}
                  {feature.imageDark && (
                    <Image
                      src={feature.imageDark}
                      alt={feature.title}
                      width={80}
                      height={80}
                      unoptimized
                      className="hidden dark:block"
                    />
                  )}
                </div>
              ) : null}
            </motion.div>
          );
        })}

        {!showAll && rest.length > 0 && (
          <button
            onClick={() => setShowAll(true)}
            className="btn col-span-full mx-auto mt-8"
          >
            {t.features.loadMore}
          </button>
        )}

        <p className="col-span-full mt-8 text-center text-xl tracking-tight text-neutral-500 dark:text-neutral-400 sm:text-2xl">
          <span className="font-semibold text-gold">
            {t.features.useOneOrAll}
          </span>{" "}
          {t.features.subtitle}
        </p>
      </section>
    </div>
  );
}
