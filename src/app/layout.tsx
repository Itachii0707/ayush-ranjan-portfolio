import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ayush Ranjan — AI Engineer & Software Developer',
    template: '%s | Ayush Ranjan',
  },
  description:
    'Computer Science student and AI Engineer based in Bangalore, India. Specializing in Computer Vision, Deep Learning, and Generative AI. Building intelligent solutions for real-world problems.',
  keywords: [
    'Ayush Ranjan',
    'AI Engineer',
    'Computer Vision',
    'Deep Learning',
    'Machine Learning',
    'Software Engineer',
    'Next.js',
    'Python',
    'TensorFlow',
    'OpenCV',
    'Bangalore',
    'India',
  ],
  authors: [{ name: 'Ayush Ranjan', url: 'https://github.com/Itachii0707' }],
  creator: 'Ayush Ranjan',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ayushranjan.dev',
    siteName: 'Ayush Ranjan Portfolio',
    title: 'Ayush Ranjan — AI Engineer & Software Developer',
    description:
      'Building intelligent solutions for real-world problems. Computer Vision, Deep Learning, Generative AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ayush Ranjan — AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Ranjan — AI Engineer',
    description: 'Building intelligent solutions for real-world problems.',
    images: ['/og-image.png'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-obsidian-900 text-silver-bright font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          <LenisProvider>
            <LoadingScreen />
            <NoiseOverlay />
            <FloatingOrbs />
            <CommandPalette />
            <Navbar />
            <ScrollToTop />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'rgba(13, 13, 26, 0.95)',
                  color: '#E8E8F0',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  backdropFilter: 'blur(12px)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                },
                success: {
                  iconTheme: {
                    primary: '#00E5FF',
                    secondary: '#030305',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#030305',
                  },
                },
              }}
            />
          </LenisProvider>
        </ThemeProvider>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ayush Ranjan',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ayushranjan.dev',
              jobTitle: 'AI Engineer & Software Developer',
              description:
                'Computer Science student specializing in Computer Vision, Deep Learning, and Generative AI.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bengaluru',
                addressRegion: 'Karnataka',
                addressCountry: 'IN',
              },
              sameAs: [
                'https://github.com/Itachii0707',
                'https://www.linkedin.com/in/ayush-ranjan-62628a3b2/',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
