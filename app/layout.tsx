import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import { CartProvider } from '@/components/CartContext';
import { WishlistProvider } from '@/components/WishlistButton';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Spootfind - Discover Global Trends',
  description: 'Find trending products from around the world. Quality sourcing, global delivery.',
  keywords: ['trending products', 'global sourcing', 'dropshipping', 'wholesale', 'import', 'export'],
  metadataBase: new URL('https://spootfind.com'),
  openGraph: {
    title: 'Spootfind - Discover Global Trends',
    description: 'Find trending products from around the world. Quality sourcing, global delivery.',
    siteName: 'Spootfind',
    images: [{ url: '/logo.png', width: 1024, height: 1024 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
