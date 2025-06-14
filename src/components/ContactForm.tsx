"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageContext";

export default function Contact() {
  const { t } = useLang();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isDark, setIsDark] = useState(false);

  /* sync dark / light */
  useEffect(() => {
    const sync = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  /* Cloudflare Turnstile */
  useEffect(() => {
    // @ts-expect-error injected by CF script
    const turnstile = window.turnstile;
    const node = document.getElementById("turnstile-widget");
    if (node && turnstile) {
      node.innerHTML = "";
      turnstile.render(node, {
        sitekey: "0x4AAAAAABgxYdNBr1gcmk5n",
        theme: isDark ? "dark" : "light",
      });
    }
  }, [isDark]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.contact.success);
  };

  const sectionStyle = isDark
    ? {
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.6), #000), url('/contact-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : { backgroundColor: "#fff" };

  return (
    <section
      id="contact"
      className="full-bleed relative pt-24 pb-0 px-6 md:px-16 transition-colors"
      style={sectionStyle}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-5xl pb-16"
      >
        <h2 className="mb-8 text-center text-4xl font-bold text-gold">
          {t.contact.heading}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          suppressHydrationWarning
        >
          <div className="grid gap-6 md:grid-cols-2">
            <input
              suppressHydrationWarning /* 👈 */
              name="name"
              type="text"
              required
              placeholder={t.contact.namePlaceholder}
              onChange={handleChange}
              className={`w-full rounded-lg border border-gold p-4 focus:border-gold ${
                isDark
                  ? "bg-neutral-900 text-white placeholder:text-neutral-400"
                  : "bg-white text-black placeholder:text-neutral-500"
              }`}
            />

            <input
              suppressHydrationWarning /* 👈 */
              name="email"
              type="email"
              required
              placeholder={t.contact.emailPlaceholder}
              onChange={handleChange}
              className={`w-full rounded-lg border border-gold p-4 focus:border-gold ${
                isDark
                  ? "bg-neutral-900 text-white placeholder:text-neutral-400"
                  : "bg-white text-black placeholder:text-neutral-500"
              }`}
            />
          </div>

          <textarea
            suppressHydrationWarning /* 👈 */
            name="message"
            rows={6}
            required
            placeholder={t.contact.messagePlaceholder}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gold p-4 focus:border-gold ${
              isDark
                ? "bg-neutral-900 text-white placeholder:text-neutral-400"
                : "bg-white text-black placeholder:text-neutral-500"
            }`}
          />

          <div className="flex justify-center">
            <div id="turnstile-widget" />
          </div>

          <div className="text-center">
            <button type="submit" className="btn mx-auto">
              {t.contact.send}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
