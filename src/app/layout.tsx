import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MONO // ATELIER — Minimalist Objects & Curated Living',
  description: 'A curated selection of precision-engineered workspace tools, acoustic audio, and minimalist essentials designed for focus and calm.',
  keywords: ['minimalist storefront', 'workspace tools', 'minimalist design', 'desk setup', 'audio gear', 'ergonomics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased selection:bg-zinc-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}