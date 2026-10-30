"use client";
import { Play } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center px-4 pt-14 pb-26 text-center">
      <p className="mb-2 flex items-center gap-4 font-ui text-base text-lo before:h-px before:w-12 before:bg-lo after:h-px after:w-12 after:bg-lo uppercase">
        seasons présente
      </p>
      <h1
        aria-label="1871"
        className="flex font-fat text-[clamp(9rem,38vw,32rem)] leading-[.82] tracking-[-.008em] text-hi [text-shadow:0_0_120px_rgba(224,112,47,.35)]"
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
      <p className="mx-auto mt-4 max-w-2xl text-[clamp(1.15rem,2vw,1.55rem)] leading-snug text-hi italic">
        Un projet musical, visuel et narratif : le carnet de route d’Aristide,
        soldat versaillais, pendant la Commune de Paris.
      </p>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">
        <li
          key="Musique orchestrale et Metal"
          className="rounded-full border border-sepia/35 bg-bg/50 px-3.5 py-1.5 font-ui text-sm font-semibold backdrop-blur-md"
        >
          Musique orchestrale et Metal
        </li>
        <li
          key="Narration sonore et visuelle"
          className="rounded-full border border-sepia/35 bg-bg/50 px-3.5 py-1.5 font-ui text-sm font-semibold backdrop-blur-md"
        >
          Narration sonore et visuelle
        </li>
        <li
          key="Inspiré d’une histoire vraie"
          className="rounded-full border border-sepia/35 bg-bg/50 px-3.5 py-1.5 font-ui text-sm font-semibold backdrop-blur-md"
        >
          Inspiré d’une histoire vraie
        </li>
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
        <a
          href="#ecouter"
          className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-sepia py-3 pr-6 pl-3 font-ui font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-hi"
        >
          <span className="grid size-9 place-items-center rounded-full bg-ink text-sepia">
            <Play size={16} fill="currentColor" />
          </span>
          Écouter l’histoire
        </a>
        <a
          href="#recit"
          className="font-ui font-semibold text-sepia underline underline-offset-[5px] hover:text-hi"
        >
          Lire le récit
        </a>
      </div>
    </header>
  );
}
