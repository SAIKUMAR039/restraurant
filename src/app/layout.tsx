import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';
import {Toaster} from '@/components/ui/toaster';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TableTop Reservations',
  description: 'Manage your restaurant reservations with ease.',
  keywords: ['restaurant', 'reservation', 'table management', 'booking'],
  authors: [{ name: 'Firebase Studio' }],
  openGraph: {
    title: 'TableTop Reservations',
    description: 'Manage your restaurant reservations with ease.',
    url: 'https://your-app-url.com', // Replace with your actual URL
    siteName: 'TableTop Reservations',
    images: [
      {
        url: 'https://picsum.photos/1200/630', // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: 'TableTop Reservations - Manage Reservations Easily',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TableTop Reservations',
    description: 'Manage your restaurant reservations with ease.',
    images: ['https://picsum.photos/1200/630'], // Replace with your actual image URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google', // Replace with your actual verification content
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        {children}
        <Toaster />
          <footer className="bg-secondary p-4 text-center">
            <div className="container mx-auto">
              <Link href="/admin/login" className="hover:text-primary">
                Admin Login
              </Link>
            </div>
          </footer>
      </body>
    </html>
  );
}
