'use client';
import { Pause, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { tracks, type Track } from '@/data/tracks';

const PANELS = tracks.length + 2; // ouverture + pistes + fin

function Wave({ on }: { on: boolean }) {
  return (
    <div aria-hidden className="flex h-14 items-center gap-[3px]">
      {Array.from({ length: 32 }, (_, i) => (
        <motion.span
          key={i}
          className="h-full w-[3px] origin-center rounded-full bg-ember"
          animate={on ? { scaleY: [0.25, 1, 0.35, 0.85, 0.25] } : { scaleY: 0.12 + ((i * 7) % 5) * 0.06 }}
          transition={on ? { duration: 0.8 + (i % 5) * 0.15, repeat: Infinity, delay: i * 0.03 } : { duration: 0.3 }}
        />
      ))}
    </div>
  );
}

export default function Bataillons() {
  const ref = useRef<HTMLElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(PANELS - 1) * 100}vw`]);
  const marker = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  const toggle = (t: Track) => {
    const a = audio.current;
    if (playing === t.id) { a?.pause(); setPlaying(null); return; }
    if (a && t.src) { a.src = t.src; void a.play(); } else a?.pause();
    setPlaying(t.id);
  };

  return (
    <section id="ecouter" ref={ref} aria-label="Formation des bataillons de marche" style={{ height: `${PANELS * 100}svh` }} className="relative">
      <audio ref={audio} onEnded={() => setPlaying(null)} className="hidden" />
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          <div className="flex w-screen shrink-0 items-center px-[clamp(1.1rem,6vw,6rem)]">
            <h2 className="max-w-[10em] font-fat text-[clamp(3rem,10vw,9.5rem)] leading-[.92] text-hi">Formation des bataillons de marche</h2>
          </div>

          {tracks.map((t) => (
            <div key={t.id} className="relative flex w-screen shrink-0 items-center justify-center px-6">
              <span aria-hidden className="pointer-events-none absolute font-fat text-[clamp(14rem,48vw,44rem)] leading-none text-transparent select-none [-webkit-text-stroke:1px_rgba(157,133,96,.4)]">
                {t.numeral}
              </span>
              <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-center">
                <h3 className="font-fat text-[clamp(2.4rem,7vw,6rem)] leading-none text-hi">{t.title}</h3>
                <p className="text-xl text-lo italic">{t.teaser}</p>
                <Wave on={playing === t.id} />
                <button
                  type="button"
                  onClick={() => toggle(t)}
                  aria-pressed={playing === t.id}
                  aria-label={playing === t.id ? 'Mettre en pause' : `Écouter la piste ${t.numeral}`}
                  className="grid size-20 place-items-center rounded-full bg-sepia text-ink transition hover:scale-105 hover:bg-hi aria-pressed:bg-ember"
                >
                  {playing === t.id ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="translate-x-0.5" />}
                </button>
              </div>
            </div>
          ))}

          <div className="flex w-screen shrink-0 items-center justify-end px-[clamp(1.1rem,6vw,6rem)] text-right">
            <h2 className="max-w-[9em] font-fat text-[clamp(3rem,10vw,9.5rem)] leading-[.92] text-hi">Fin de la campagne de France</h2>
          </div>
        </motion.div>

        {/* La route : Aristide avance de la formation à la fin de la campagne */}
        <div aria-hidden className="absolute inset-x-[clamp(1.1rem,6vw,6rem)] bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
          <div className="mb-3 flex justify-between gap-4 font-ui text-xs text-lo sm:text-sm">
            <span>Formation des bataillons de marche</span>
            <span className="text-right">Fin de la campagne de France</span>
          </div>
          <div className="relative h-px bg-lo/40">
            <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-ember" />
            {tracks.map((t, i) => (
              <span key={t.id} style={{ left: `${((i + 1) / (PANELS - 1)) * 100}%` }} className="absolute -top-1 h-2.5 w-px bg-lo" />
            ))}
            <motion.span style={{ left: marker }} className="absolute -top-1.5 size-3 -translate-x-1/2 rounded-full bg-ember2 shadow-[0_0_14px_#e0702f]" />
          </div>
        </div>
      </div>
    </section>
  );
}
