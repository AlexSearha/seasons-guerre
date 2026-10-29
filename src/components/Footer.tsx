import { ArrowUp } from "lucide-react";

const nav = [
  { href: "#recit", label: "Le récit" },
  { href: "#ecouter", label: "Écouter" },
  { href: "#contact", label: "Nous écrire" },
];
const socials = [
  { href: "https://www.youtube.com/seasonsnovel", label: "YouTube" },
  { href: "https://www.instagram.com/seasonsnovel", label: "Instagram" },
  { href: "https://seasonsnovel.bandcamp.com/", label: "Bandcamp" },
  {
    href: "https://open.spotify.com/intl-fr/artist/5lIZXhYxICgb6vQlkLeJYJ",
    label: "Spotify",
  },
  { href: "https://www.deezer.com/fr/artist/235497731", label: "Deezer" },
];

const link =
  "inline-block py-1 text-lg text-sepia transition hover:translate-x-1 hover:text-hi";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-sepia/20 bg-bg/80 backdrop-blur-xl">
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-2vw] bottom-[-.18em] font-fat text-[clamp(10rem,32vw,30rem)] leading-none text-transparent select-none [-webkit-text-stroke:1px_rgba(157,133,96,.22)]"
      >
        1871
      </span>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-[clamp(1.1rem,5vw,3rem)] pt-16 pb-28 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="font-fat text-5xl text-hi">Seasons</p>
          <p className="mt-3 max-w-xs text-lg text-lo italic">
            1871 : les cendres et le sang. Nous faisons parler la mémoire.
          </p>
        </div>
        <nav aria-label="Pied de page">
          <h2 className="mb-3 font-ui text-sm font-semibold text-lo">
            Explorer
          </h2>
          <ul>
            {nav.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 font-ui text-sm font-semibold text-lo">
            Nous suivre
          </h2>
          <ul>
            {socials.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-sepia/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-[clamp(1.1rem,5vw,3rem)] py-5 pb-24 font-ui text-sm text-lo">
          <p>©{new Date().getFullYear()} Tous droits réservés</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-sepia/30 px-4 py-2 text-sepia transition hover:bg-sepia hover:text-ink"
          >
            Retour en haut <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
