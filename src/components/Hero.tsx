"use client";
import { Play } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
      <p className="mb-2 flex items-center gap-4 font-ui text-base text-lo before:h-px before:w-12 before:bg-lo after:h-px after:w-12 after:bg-lo uppercase">
        Seasons présente
      </p>
      <h1
        aria-label="1871"
        className="flex font-fat text-[clamp(9rem,38vw,36rem)] leading-[.82] tracking-[-.008em] text-hi [text-shadow:0_0_120px_rgba(224,112,47,.35)]"
      >
        {"1871".split("").map((d, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={{ y: "60%", rotate: 4, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: i * 0.12,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            {d}
          </motion.span>
        ))}
      </h1>
      <p className="mt-5 font-fat text-[clamp(1.7rem,5.6vw,4.6rem)] leading-none text-sepia">
        Les cendres et le sang
      </p>
      <p className="mx-auto mt-6 max-w-2xl font-ui text-base leading-relaxed text-lo sm:text-lg italic">
        Au cœur du siège de Paris et de la Commune.
      </p>
      <a
        href="#ecouter"
        className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-sepia py-3 pr-6 pl-3 font-ui font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-hi"
      >
        <span className="grid size-9 place-items-center rounded-full bg-ink text-sepia">
          <Play size={16} fill="currentColor" />
        </span>
        Écouter l’histoire
      </a>
      <a
        href="#recit"
        className="absolute bottom-6 font-ui text-sm text-lo"
      ></a>
    </header>
  );
}
