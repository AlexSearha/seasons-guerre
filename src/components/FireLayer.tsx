"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  d: number;
};

export default function FireLayer() {
  const { scrollYProgress } = useScroll();
  const glow = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const cv = canvas.current;
    const cx = cv?.getContext("2d");
    if (!cv || !cx || reduce) return;
    let W = 0,
      H = 0,
      raf = 0;
    const ps: Ember[] = [];
    const size = () => {
      W = cv.width = innerWidth;
      H = cv.height = innerHeight;
    };
    size();
    addEventListener("resize", size);
    const loop = () => {
      cx.clearRect(0, 0, W, H);
      let spawn = 0.25 + scrollYProgress.get() * 2.2;
      while (spawn > 0) {
        if (Math.random() < spawn && ps.length < 220)
          ps.push({
            x: Math.random() * W,
            y: H + 10,
            vx: (Math.random() - 0.5) * 0.6,
            vy: -(0.5 + Math.random() * 1.6),
            r: 0.6 + Math.random() * 2,
            a: 0.9,
            d: 0.003 + Math.random() * 0.006,
          });
        spawn -= 1;
      }
      cx.globalCompositeOperation = "lighter";
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx + Math.sin(p.y * 0.02) * 0.3;
        p.y += p.vy;
        p.a -= p.d;
        if (p.a <= 0 || p.y < -10) {
          ps.splice(i, 1);
          continue;
        }
        cx.fillStyle = `rgba(240,${110 + ((p.a * 60) | 0)},50,${p.a})`;
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
    };
  }, [reduce, scrollYProgress]);

  return (
    <div aria-hidden className="pointer-events-none">
      {/* 1. Calque de lueur principale lié au scroll */}
      <motion.div
        style={{ opacity: glow }}
        className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_108%,rgba(224,112,47,.6),transparent_70%),radial-gradient(ellipse_50%_30%_at_15%_100%,rgba(180,50,20,.4),transparent_70%),radial-gradient(ellipse_50%_30%_at_85%_100%,rgba(180,50,20,.35),transparent_70%)]"
      />

      {/* 2. Image de fond fixe */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 z-1 h-[70vh] bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(
                to bottom,
                #120c08 0%,
                rgba(18, 12, 8, 0.92) 0%,
                rgba(18, 12, 8, 0.55) 30%,
                transparent 55%
            ),
            linear-gradient(
                rgba(0, 0, 0, 0.35),
                rgba(0, 0, 0, 0.35)
            ),
            url('/backdrop.png')
            `,
          backgroundPosition: "top, center, center bottom",
          backgroundSize: "100% 100%, 100% 100%, cover",
        }}
      />

      {/* 3. Calque de flammes/lumière scintillante en superposition */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 z-2 h-[70vh] bg-no-repeat mix-blend-color-dodge opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('/backdrop.png')`,
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.35, 0.55, 0.3],
          scale: [1, 1.02, 1, 1.01, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <canvas ref={canvas} className="fixed inset-0 z-2" />
    </div>
  );
}
