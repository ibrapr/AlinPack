import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://alinpack.com'),
  title: {
    default: 'Alin Pack — Custom Packaging Machines Since 2007',
    template: '%s | Alin Pack',
  },
  description:
    'Alin Pack provides custom packaging machines and solutions for food, cosmetics, chemicals, and more — trusted by manufacturers since 2007.',
  applicationName: 'Alin Pack',
  authors: [{ name: 'Alin Pack' }],
  keywords: [
    'packaging machines',
    'filling machines',
    'capping machines',
    'sealing machines',
    'industrial packaging',
    'custom packaging solutions',
    'Alin Pack',
    'Israel',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Alin Pack',
    title: 'Alin Pack — Custom Packaging Machines',
    description: 'Custom packaging machines & solutions, trusted since 2007.',
    url: 'https://alinpack.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alin Pack — Custom Packaging Machines',
    description: 'Custom packaging machines & solutions, trusted since 2007.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1F3A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
