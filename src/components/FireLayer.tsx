"use client";
import { motion, useScroll, useTransform } from "motion/react";

export default function FireLayer() {
  const { scrollYProgress } = useScroll();
  const glow = useTransform(scrollYProgress, [0, 1], [0.12, 1]);

  return (
    <div aria-hidden className="pointer-events-none">
      <motion.div
        style={{ opacity: glow }}
        className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_108%,rgba(224,112,47,.6),transparent_70%),radial-gradient(ellipse_50%_30%_at_15%_100%,rgba(180,50,20,.4),transparent_70%),radial-gradient(ellipse_50%_30%_at_85%_100%,rgba(180,50,20,.35),transparent_70%)]"
      />
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
    </div>
  );
}
