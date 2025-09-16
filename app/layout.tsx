import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'GigFlow - Your curated pipeline for side hustle success',
  description: 'A Base MiniApp for freelancers and gig workers to discover niche opportunities, connect with clients, and manage their income efficiently.',
  openGraph: {
    title: 'GigFlow',
    description: 'Your curated pipeline for side hustle success',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <Providers>
          <main className="max-w-3xl mx-auto px-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
