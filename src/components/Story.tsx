"use client";
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { aproposA, aproposB, intro, projet, type Para } from "@/data/story";
import Image from "next/image";

type W = { w: string; b?: boolean };

function Word({
  w,
  b,
  p,
  i,
  n,
}: W & { p: MotionValue<number>; i: number; n: number }) {
  const start = (i / n) * 0.88;
  const range = [start, start + 0.12];
  const opacity = useTransform(p, range, [0.17, 1]);
  const color = useTransform(p, range, ["#9d8560", b ? "#f0a45e" : "#f4e7c9"]);
  return <motion.span style={{ opacity, color }}>{w} </motion.span>;
}

function Paragraph({ segs, shift }: { segs: Para; shift: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words: W[] = segs.flatMap((sg) =>
    sg.t
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, b: sg.b })),
  );
  return (
    <p
      ref={ref}
      className={`mb-[14vh] max-w-[23em] text-[clamp(1.55rem,3.4vw,2.7rem)] leading-[1.26] tracking-[-.01em] ${shift ? "md:ml-auto" : ""}`}
    >
      {reduce
        ? words.map((x, i) => (
            <span key={i} className={x.b ? "text-ember2" : "text-hi"}>
              {x.w}{" "}
            </span>
          ))
        : words.map((x, i) => (
            <Word key={i} {...x} p={scrollYProgress} i={i} n={words.length} />
          ))}
    </p>
  );
}

const Chapter = ({ paras }: { paras: Para[] }) => (
  <>
    {paras.map((p, i) => (
      <Paragraph key={i} segs={p} shift={i % 2 === 1} />
    ))}
  </>
);

const Ornament = () => (
  <div
    aria-hidden
    className="mx-auto mt-[2vh] mb-[16vh] flex max-w-140 items-center gap-5 before:h-[5px] before:flex-1 before:border-y before:border-lo after:h-[5px] after:flex-1 after:border-y after:border-lo"
  >
    <b className="grid size-[4.5rem] place-items-center rounded-full border border-lo font-fat text-2xl font-normal text-hi">
      1871
    </b>
  </div>
);

function Livret() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });
  return (
    <motion.figure
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mb-[14vh] flex w-full max-w-135 items-center gap-6 bg-sepia p-5 text-ink shadow-[0_30px_60px_rgba(0,0,0,.6)] outline outline-1 -outline-offset-8 outline-ink max-sm:flex-col max-sm:items-start"
    >
      <div
        role="img"
        aria-label="Portrait gravé d’Aristide Fidel"
        className="relative aspect-4/5 w-[36%] shrink-0 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#8a6838,#2a1f16_85%)] max-sm:w-1/2"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/aristide.webp')",
          }}
        />
      </div>
      <figcaption>
        <h3 className="mb-1 font-fat text-[clamp(1.7rem,4vw,2.4rem)] leading-none font-normal">
          Aristide Fidel
        </h3>
        <p className="font-ui text-base leading-snug">
          Soldat de l’armée versaillaise. Carnet de route, 1871.
        </p>
      </figcaption>
      <span
        aria-hidden
        className="absolute -right-3 -bottom-4 rotate-[-8deg] border-[3px] border-[#8a2a12] bg-hi/85 px-3 font-fat text-xl text-[#8a2a12]"
      >
        1871
      </span>
    </motion.figure>
  );
}

export default function Story() {
  const logoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: logoRef,
    offset: ["start 0.9", "center 0.6"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <article
      id="recit"
      aria-label="Le récit"
      className="mx-auto max-w-295 px-[clamp(1.1rem,5vw,3rem)] pt-[6vh] pb-[20vh]"
    >
      <Chapter paras={intro} />
      <Ornament />
      <Chapter paras={projet} />
      <Ornament />
      <Chapter paras={aproposA} />
      <Livret />
      <Chapter paras={aproposB} />

      {/* Section Finale - Effet Wouah Immersif optimisé mobile */}
      <div
        ref={logoRef}
        className="relative mt-[8vh] md:mt-[16vh] flex flex-col justify-center items-center py-10 md:py-20 overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(138,42,18,0.25)_0%,transparent_70%)]"
      >
        {/* Lueur incandescente adaptée au mobile */}
        <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-ember/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 flex flex-col items-center text-center px-4"
        >
          {/* Logo redimensionné dynamiquement (plus petit sur mobile) */}
          <div className="drop-shadow-[0_0_25px_rgba(224,112,47,0.3)] transition-transform duration-700 hover:scale-105">
            <Image
              src="/logo-seasons.png"
              alt="Seasons"
              width={260}
              height={260}
              priority
              className="w-auto h-auto max-w-[170px] md:max-w-[260px]"
            />
          </div>

          <div className="w-12 md:w-16 h-px bg-lo/40 my-4 md:my-6" />

          <span className="text-xs md:text-base tracking-[0.2em] md:tracking-[0.25em] uppercase text-lo font-ui opacity-90">
            Une création originale par seasons
          </span>
        </motion.div>
      </div>
    </article>
  );
}
