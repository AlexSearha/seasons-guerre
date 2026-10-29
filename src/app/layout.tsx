import type { Metadata, Viewport } from 'next';
import { Abril_Fatface, Archivo, Newsreader } from 'next/font/google';
import './globals.css';

const fat = Abril_Fatface({ weight: '400', subsets: ['latin'], variable: '--nf-fat' });
const txt = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--nf-txt' });
const ui = Archivo({ subsets: ['latin'], variable: '--nf-ui' });

export const metadata: Metadata = {
  title: '1871 : les cendres et le sang',
  description:
    'Un projet musical, visuel et narratif : le carnet de route d’Aristide, soldat versaillais, pendant la Commune de Paris.',
};
export const viewport: Viewport = { themeColor: '#110b07', viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fat.variable} ${txt.variable} ${ui.variable}`}>
      <body>{children}</body>
    </html>
  );
}
