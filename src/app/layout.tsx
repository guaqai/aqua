import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AIChatDrawer from '@/components/AIChatDrawer';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aquaventurescoorg.com'),
  title: {
    default: 'Aqua Ventures Coorg | Just Meen Seafood, Artisan Preserves & Farm Tours',
    template: '%s | Aqua Ventures Coorg'
  },
  description: 'FSSAI-certified closed-loop spring-water Tilapia fillets, jumbo IQF prawns, traditional Coorg Kaipuli marmalade, wood-fired Kachampuli vinegar, hydroponics, and organic fish fertilizer from Siddapur, Coorg. Parent holding for Just Meen, Just Homemade, Just Fresh, and Just Grow.',
  keywords: [
    'Aqua Ventures Coorg',
    'Just Meen Seafood',
    'Just Homemade Preserves',
    'Just Fresh Hydroponics',
    'Just Grow Fertilizer',
    'FSSAI 11223319000027',
    'Coorg Tilapia fish fillets',
    'Sub-zero cold chain seafood delivery',
    'Authentic Coorg Kachampuli',
    'Kaipuli marmalade',
    'Coorg Farm Tour',
    'Kodagu agro tourism',
    'Commercial Tilapia fingerlings Karnataka',
    'Shyam Aiyappa',
    'Pattada Namitha',
    'Mukul Appaiah',
    'Naina Ballachanda'
  ],
  authors: [{ name: 'Shyam Aiyappa, Pattada Namitha, Mukul Appaiah & Naina Ballachanda' }],
  creator: 'Aqua Ventures Coorg',
  publisher: 'Aqua Ventures Coorg',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon.svg' }
    ],
  },
  openGraph: {
    title: 'Aqua Ventures Coorg | Pure Mountain Spring Water Harvest & Artisan Preserves',
    description: 'Pristine flowing spring-water Tilapia fillets, colossal prawns, wild Kaipuli marmalade, pure wood-fired Kachampuli, and organic fish fertilizer. FSSAI Lic. No. 11223319000027.',
    url: 'https://aquaventurescoorg.com',
    siteName: 'Aqua Ventures Coorg',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aqua Ventures Coorg — Sustainable Aquaculture and Kodava Heritage Preserves'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqua Ventures Coorg | Just Meen & Artisan Preserves',
    description: 'Closed-loop spring-water Tilapia fillets, traditional Kodava preserves, and immersive agro-ecology tours in Siddapur, Coorg.',
    images: ['/og-image.jpg'],
    creator: '@aquaventures'
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
  alternates: {
    canonical: 'https://aquaventurescoorg.com',
  },
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Siddapur, Kodagu, Coorg',
    'geo.position': '12.3023;75.9087',
    'ICBM': '12.3023, 75.9087'
  }
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://aquaventurescoorg.com/#business',
      'name': 'Aqua Ventures Coorg',
      'alternateName': 'Just Meen',
      'url': 'https://aquaventurescoorg.com',
      'logo': 'https://aquaventurescoorg.com/favicon.svg',
      'image': 'https://aquaventurescoorg.com/og-image.jpg',
      'description': 'FSSAI State License No: 11223319000027. Closed-loop spring-water aquaculture facility, hydroponics, and Kodagu artisan preserves in Siddapur, Coorg.',
      'telephone': '+918123288564',
      'email': 'aquaventures.coorg@gmail.com',
      'priceRange': '₹₹',
      'founders': [
        { '@type': 'Person', 'name': 'Shyam Aiyappa' },
        { '@type': 'Person', 'name': 'Pattada Namitha' },
        { '@type': 'Person', 'name': 'Mukul Appaiah' },
        { '@type': 'Person', 'name': 'Naina Ballachanda' }
      ],
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Guyya Village, Siddapur',
        'addressLocality': 'Kodagu (Coorg)',
        'addressRegion': 'Karnataka',
        'postalCode': '571253',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 12.3023,
        'longitude': 75.9087
      },
      'areaServed': ['Karnataka', 'South India', 'India']
    },
    {
      '@type': 'TouristAttraction',
      '@id': 'https://aquaventurescoorg.com/#tour',
      'name': 'Aqua Ventures Integrated Agro-Ecology Farm Tour & Tasting',
      'description': '3.5-hour immersive agritourism experience through bio-secure fish raceways, hydroponics greenhouses, honey apiaries, and farm-to-fork lunch on the Cauvery riverbanks.',
      'url': 'https://aquaventurescoorg.com/#tour',
      'isAccessibleForFree': false,
      'publicAccess': true,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Guyya Village, Siddapur',
        'addressLocality': 'Kodagu (Coorg)',
        'addressRegion': 'Karnataka',
        'postalCode': '571253',
        'addressCountry': 'IN'
      }
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Does Aqua Ventures Tilapia have a muddy or earthy taste?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Our Tilapia are raised in bio-secure concrete raceways continuously aerated with flowing Cauvery headwater stream runoff. Unlike pond-raised fish, there is zero mud or stagnant sediment, guaranteeing 100% clean, sweet, firm white fillets.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does cold-chain delivery work to Bangalore, Mysore, and Mangalore?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We pack our flash-frozen seafood inside insulated thermocol containers packed with sub-zero food-grade dry ice packs. Products arrive rock-solid frozen (-18°C) at your doorstep via regular scheduled runs.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can visitors tour the Aqua Ventures farm in Coorg?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. We offer daily 3.5-hour guided farm tours at ₹1,500 per adult (₹800 per child). Guests explore raceway fish tanks, automated hydroponic greenhouses, honey apiaries, and enjoy a farm-fresh lunch on the riverside deck.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is authentic Coorg Kachampuli?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Kachampuli is an ancient Kodava dark fruit vinegar made by slow-simmering the extract of wild Garcinia gummi-gutta fruits in wood-fired copper vats until it reduces into a thick, tangy, antioxidant-rich dark glaze.'
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased min-h-screen flex flex-col bg-misty-ivory text-ink-charcoal`}>
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
