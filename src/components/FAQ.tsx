"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageContext";
import { FaqItem } from "../types/faq";

/* ---------- language data ---------- */
import { faqItems as faqEn } from "../data/faq.en";
import { faqItems as faqDe } from "../data/faq.de";
import { faqItems as faqFr } from "../data/faq.fr";
import { faqItems as faqAr } from "../data/faq.ar";
import { faqItems as faqCr } from "../data/faq.cr";
import { faqItems as faqNo } from "../data/faq.no";
import { faqItems as faqRu } from "../data/faq.ru";
import { faqItems as faqSp } from "../data/faq.sp";

const faqMap: Record<string, FaqItem[]> = {
  en: faqEn,
  de: faqDe,
  fr: faqFr,
  ar: faqAr,
  cr: faqCr,
  no: faqNo,
  ru: faqRu,
  sp: faqSp,
};

export default function FAQGrid() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const faqs = useMemo(() => faqMap[lang] || faqEn, [lang]);

  const toggle = (idx: number) => setActive(active === idx ? null : idx);

  return (
    <div className="full-bleed w-full bg-white dark:bg-black transition-colors">
      <section
        id="faq"
        className="mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-4 px-4 py-12
                   sm:px-6 md:grid-cols-2 md:gap-5 md:py-20 lg:grid-cols-3"
      >
        <h2 className="md:col-span-2 lg:col-span-3 mb-8 text-center text-3xl font-bold text-gold md:mb-12 md:text-4xl">
          {t.faq.heading}
        </h2>

        {faqs.map((faq, i) => {
          const open = active === i;

          return (
            <motion.div
              key={faq.question}
              whileHover={{
                y: -4,
                boxShadow: "0 10px 32px rgba(212,175,55,0.12)",
              }}
              onClick={() => toggle(i)}
              className="flex flex-col cursor-pointer rounded-xl border border-gold
                         bg-white p-5 shadow transition dark:bg-neutral-950"
            >
              {/* question row */}
              <div className="flex items-start gap-3">
                <span className="text-lg font-bold text-gold md:text-xl">
                  Q{i + 1}.
                </span>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gold md:text-xl">
                    {faq.question}
                  </h3>

                  {/* answer (always rendered; collapses via CSS) */}
                  <div
                    className={`pt-3 overflow-hidden transition-[max-height,opacity] duration-300
                                ${
                                  open
                                    ? "max-h-[800px] opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                  >
                    {faq.answer.map((p) => (
                      <p
                        key={p}
                        className="text-sm text-neutral-700 dark:text-neutral-300 md:text-base"
                      >
                        {p}
                      </p>
                    ))}

                    {faq.points && (
                      <ul className="mt-3 space-y-1.5">
                        {faq.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex items-start gap-2 text-sm text-neutral-700
                                       dark:text-neutral-300 md:text-base"
                          >
                            <span className="mt-1 text-gold">●</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* arrow */}
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 mt-0.5 text-xl text-gold"
                >
                  ▼
                </motion.span>
              </div>
            </motion.div>
          );
        })}

        <p className="md:col-span-2 lg:col-span-3 mt-8 text-center text-base tracking-tight text-neutral-500 dark:text-neutral-400 md:text-lg">
          <span className="font-semibold text-gold">{t.faq.moreInfo}</span>{" "}
          {t.faq.contactCTA}
        </p>
      </section>
    </div>
  );
}
