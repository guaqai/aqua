# Aqua Ventures Coorg — E-Commerce, Concierge & Digital Transformation

> **Pristine Mountain Spring Water Aquaculture, Kodava Preserves & Circular Agro-Ecology Sanctuary**  
> Guyya Village, Siddapur, Kodagu (Coorg), Karnataka – 571253  
> Founding Team: Shyam Aiyappa, Pattada Namitha, Mukul Appaiah & Naina Ballachanda  
> FSSAI License: `11223319000027`  
> Dedicated D2C Brands: **Just Meen**, **Just Homemade**, **Just Fresh**, **Just Grow**

---

## Overview

This repository powers the digital presence, artisanal catalog, automated cold-chain logistics, agro-tourism bookings, and AI concierge for **Aqua Ventures Coorg** (parent holding company).

The system replaces manual lead qualification and order taking with an automated, high-conversion web platform designed around an editorial **"Coorg Heritage & Modern Purity"** aesthetic tailored for premium consumers, home chefs, and hospitality partners across South India and nationwide.

---

## Key Capabilities

1. **Artisanal D2C Product Catalog**:
   - Curated products across 4 dedicated consumer brands:
     - **Just Meen Seafood**: Spring-water raceway Tilapia boneless fillets, colossal 16/20 IQF prawns, handcrafted fish momos, marinated fish tikka, fish fingers, and Kaimeen pickle.
     - **Just Homemade Preserves**: Wild Kaipuli (bitter orange) marmalade, authentic wood-fired dark Kachampuli vinegar, pickles, estate passion fruit squash, artisan malai paneer, and unpasteurized raw forest honey.
     - **Just Fresh Hydroponics**: Automated nutrient-film soilless butterhead & romaine lettuces, crisp palak, and fresh Genovese basil pesto.
     - **Just Grow Bio-Nutrition**: Organic cold-enzymatically hydrolyzed liquid fish fertilizer (1L and 5L estate cans) for zero-waste circular plant nutrition.
     - **Commercial Aquaculture**: High-vigor fingerlings (Catla, Rohu, Grass Carp, Murrel) for aquaculture farmers.
   - Complete product specs, cooking directions, shelf-life, and packaging details for every SKU.

2. **Certified Cold-Chain Delivery Engine**:
   - Sub-zero insulated packaging (thermocol coolers + food-grade dry ice packs at -18°C).
   - Flexible regional logistics tiers (Local Kodagu doorstep, Regional Express Cold-Chain, Wholesale Hospitality Reefer, and Pan-India Ambient).
   - Pan-India express courier routing for shelf-stable preserves and honey.

3. **Agro-Ecology Farm Tour & Tasting Reservation**:
   - Interactive 3.5-hour tour booking interface with morning (lunch) and evening (high tea) slots.
   - Dynamic adult and child headcount calculations with instant reservation checkout.

4. **Frictionless Payments (Razorpay Sandbox & Live)**:
   - Client-side in-drawer Razorpay modal integration (`checkout.js`).
   - Server-side fallback route at `/api/checkout` that creates cryptographically signed orders and renders a branded payment portal.
   - Switchable between Test Sandbox and Live mode purely via environment variables.

5. **Multi-Channel Order & Booking Notification Pipeline**:
   - **FormSubmit.co Email Dispatch**: Automated silent JSON payload delivered directly to `aquaventures.coorg@gmail.com` with full order breakdown, customer details, and Razorpay confirmation IDs.
   - **One-Tap WhatsApp Receipt**: Post-payment modal displays a pre-filled WhatsApp link directly addressing Shyam Aiyappa (`+918123288564`) with the customer order receipt.
   - **HITL Fastify Integration**: Webhook notification to backend agent for logging and WhatsApp automation.

6. **Search & AI Engine Optimization (SEO / AEO / GEO)**:
   - **AEO**: Schema.org JSON-LD structured data (`LocalBusiness`, `TouristAttraction`, `FAQPage`) answering high-intent questions for ChatGPT, Perplexity, Gemini, and Google AI Overviews.
   - **GEO**: Targeted Kodagu/Coorg geographic coordinates (`12.3023;75.9087`) and `IN-KA` region headers.
   - **`llms.txt`**: Implements the [llmstxt.org](https://llmstxt.org) standard at `/llms.txt` for AI web agents and scrapers.
   - **Social Cards**: High-resolution OpenGraph and Twitter cards at `/og-image.jpg`.
   - **Sitemap & Robots**: Dynamic Next.js sitemap at `/sitemap.xml` and compliant `/robots.txt`.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with bespoke `@theme` tokens:
  - `coorg-green` (`#1b3b2b`)
  - `earth-clay` (`#9b4922`)
  - `misty-ivory` (`#f4f1ea`)
  - `warm-gold` (`#d4a373`)
  - `ink-charcoal` (`#2a2b2a`)
- **Typography**: *Cormorant Garamond* (Serif) & *DM Sans* (Sans-serif) via `next/font/google`
- **Animations & Icons**: [Framer Motion](https://www.framer.com/motion/) & [Lucide React](https://lucide.dev/)
- **Payments**: [Razorpay SDK](https://razorpay.com/)
- **Lead Capture & Anti-Spam**: FormSubmit.co with hidden honeypot spam protection

---

## Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+
- `pnpm` (recommended), `npm`, or `yarn`

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx

# AI Concierge & Knowledge Base
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SITE_URL=https://aquaventurescoorg.com

# FormSubmit & Founder Contacts
FOUNDER_EMAIL=aquaventures.coorg@gmail.com
SHYAM_ALERT_PHONE=+918123288564
```

### 3. Installation & Development
```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) (or `--port 3030`) in your browser.

---

## Project Structure

```
aqua/
├── docs/
│   ├── adr/                         # Architectural Decision Records
│   ├── catalog-descriptions.txt     # Complete 30-product copy review document
│   └── catalog-descriptions.md      # Formatted Markdown product copy
├── public/
│   ├── favicon.svg                  # Brand SVG monogram icon
│   ├── llms.txt                     # LLM agent indexing standard
│   ├── og-image.jpg                 # 1200x630 social preview card
│   ├── products/                    # 30 high-res cropped product packshots
│   └── robots.txt                   # Crawler directives
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── b2b-lead/            # Commercial partnership intake
│   │   │   ├── chat/                # AI Concierge rag endpoint
│   │   │   ├── checkout/            # Razorpay order generation & fallback checkout
│   │   │   ├── kb/                  # Knowledge base management
│   │   │   └── order-notify/        # Post-payment internal logging
│   │   ├── globals.css              # Tailwind v4 theme definitions
│   │   ├── layout.tsx               # Root layout, fonts, meta & JSON-LD
│   │   ├── page.tsx                 # Main landing page
│   │   └── sitemap.ts               # Dynamic XML sitemap
│   ├── components/
│   │   ├── AboutSection.tsx         # Founders story & agro-ecology philosophy
│   │   ├── AIChatDrawer.tsx         # Estate Concierge chat interface
│   │   ├── B2BEnquirySection.tsx    # Wholesale & resort partnership form
│   │   ├── CartDrawer.tsx           # Slide-out cart & checkout trigger
│   │   ├── DeliveryZonesBanner.tsx  # Bangalore/Mysore/Mangalore cold-chain schedules
│   │   ├── Footer.tsx               # Grounding brand footer & links
│   │   ├── Hero.tsx                 # Editorial hero with Western Ghats imagery
│   │   ├── Navbar.tsx               # Adaptive transparent/solid header
│   │   ├── ProductCatalog.tsx       # Filterable 30-item product catalog
│   │   └── TourBookingSection.tsx   # Integrated Farm Tour reservation module
│   ├── data/
│   │   ├── kb.json                  # Vector knowledge base for AI bot
│   │   └── products.ts              # 30 products, delivery zones, tour specs
│   └── lib/
│       ├── cart-context.tsx         # React Cart & Tour state provider
│       └── kb.ts                    # Semantic search & knowledge loader
└── vercel.json                      # Vercel deployment configuration (bom1 region)
```

---

## Vercel Deployment

1. Import this repository into [Vercel](https://vercel.com/).
2. Select **Next.js** framework preset.
3. Configure the environment variables from `.env.example` in the Vercel Dashboard under **Project Settings → Environment Variables**.
4. Set custom domain (e.g. `aquaventurescoorg.com` or `justmeen.com`).
5. Deploy. `vercel.json` ensures deployment routes to Mumbai (`bom1`) for low latency across South India.

---

## License

© 2026 Aqua Ventures Coorg. All rights reserved. Just Meen is a registered brand.
