const links = [
  { href: '#recit', label: 'Le récit' },
  { href: '#ecouter', label: 'Écouter' },
  { href: '#contact', label: 'Nous écrire' },
];

export default function Dock() {
  return (
    <nav
      aria-label="Navigation"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 z-80 flex -translate-x-1/2 gap-0.5 rounded-full border border-sepia/30 bg-bg/75 p-1 backdrop-blur-xl"
    >
      {links.map((l) => (
        <a key={l.href} href={l.href} className="whitespace-nowrap rounded-full px-3 py-2 font-ui text-sm font-semibold transition hover:bg-sepia hover:text-ink sm:px-4 sm:text-base">
          {l.label}
        </a>
      ))}
    </nav>
  );
}
