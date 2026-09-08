import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AIChatDrawer from '@/components/AIChatDrawer';

export const metadata: Metadata = {
  title: 'Aqua Ventures Coorg | Just Meen, Pure Preserves & Farm Tours',
  description: 'Pure spring-water Tilapia, artisanal Coorg Kaipuli marmalade, authentic Kachampuli, fresh hydroponics, superfoods & agro-ecology farm tours in Siddapur, Coorg.',
  keywords: ['Aqua Ventures', 'Just Meen', 'Coorg Tilapia', 'Kachampuli', 'Kaipuli Marmalade', 'Coorg Farm Tour', 'Bangalore Cold Chain Fish Delivery', 'Mysore Fresh Fish', 'Commercial Fingerlings'],
  openGraph: {
    title: 'Aqua Ventures Coorg | Pure Spring Water Aquaculture & Artisan Preserves',
    description: 'Farm-fresh Tilapia fillets, traditional Kodava preserves, and immersive riverside tours in Siddapur, Coorg.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Aqua Ventures Coorg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-[#080d0b] text-[#f0fdf4]">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <AIChatDrawer />
        </CartProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
