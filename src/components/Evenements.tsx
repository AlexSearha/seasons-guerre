"use client";
import { ArrowUpRight } from "lucide-react";
import { EventItem, events } from "../../data/events";

const MONTHS = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

const parse = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return { y, m, day };
};
const daysUntil = (d: string) => {
  const { y, m, day } = parse(d);
  return Math.ceil((new Date(y, m - 1, day).getTime() - Date.now()) / 864e5);
};
const countdown = (j: number) =>
  j <= 0 ? "Aujourd’hui" : j === 1 ? "Demain" : `J−${j}`;

function Ticket({ e, i }: { e: EventItem; i: number }) {
  const { y, m, day } = parse(e.date);
  return (
    <li
      style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}
      className={`sticky mb-[14vh] flex bg-sepia text-ink shadow-[0_30px_60px_rgba(0,0,0,.55)] outline outline-1 -outline-offset-8 outline-ink max-sm:flex-col ${i % 2 ? "rotate-[.8deg]" : "-rotate-[.8deg]"}`}
    >
      <div className="relative flex w-44 shrink-0 flex-col items-center justify-center border-r-2 border-dashed border-ink/40 px-4 py-7 max-sm:w-full max-sm:flex-row max-sm:gap-3 max-sm:border-r-0 max-sm:border-b-2 max-sm:py-4">
        <span
          aria-hidden
          className="absolute -top-4 -right-4 size-8 rounded-full bg-bg max-sm:hidden"
        />
        <span
          aria-hidden
          className="absolute -right-4 -bottom-4 size-8 rounded-full bg-bg max-sm:hidden"
        />
        <span className="font-ui text-lg font-semibold">{MONTHS[m - 1]}</span>
        <time
          dateTime={e.date}
          className="font-fat text-7xl leading-none max-sm:text-5xl"
        >
          {day}
        </time>
        <span className="font-ui font-semibold opacity-70">{y}</span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">
        <div>
          <h3 className="pr-20 font-fat text-[clamp(1.8rem,4vw,3.2rem)] leading-none">
            {e.title}
          </h3>
          <p className="mt-2 text-xl italic">
            {e.venue}, {e.city}
            {e.time ? ` · ${e.time}` : ""}
          </p>
        </div>
        {e.url && (
          <a
            href={e.url}
            className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-3 font-ui font-semibold text-sepia transition hover:bg-black"
          >
            Réserver <ArrowUpRight size={18} />
          </a>
        )}
      </div>
      <span
        suppressHydrationWarning
        className="absolute top-4 right-5 rotate-[8deg] border-[3px] border-[#8a2a12] px-3 font-fat text-xl text-[#8a2a12]"
      >
        {countdown(daysUntil(e.date))}
      </span>
    </li>
  );
}

export default function Evenements() {
  const upcoming = events
    .filter((e) => daysUntil(e.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <section
      id="events"
      aria-label="Événements"
      className="relative px-[clamp(1.1rem,5vw,3rem)] py-[14vh]"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="font-fat text-[clamp(3.4rem,12vw,10rem)] leading-[.88] text-hi">
          Événements
        </h2>
        {upcoming.length > 0 ? (
          <ul className="mt-[8vh]">
            {upcoming.map((e, i) => (
              <Ticket key={e.id} e={e} i={i} />
            ))}
          </ul>
        ) : (
          <div className="mt-[8vh] text-center">
            <p className="font-fat text-[clamp(2rem,6vw,4.5rem)] leading-none text-hi">
              Nul tambour ne résonne pour l’instant
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-sepia px-6 font-ui font-semibold text-ink transition hover:bg-hi"
            >
              Nous contacter
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
