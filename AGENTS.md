# AGENTS.md — Developer & AI Agent Operating Instructions

> **Repository**: `guaqai/aqua`  
> **Client**: Aqua Ventures Coorg (`Just Meen`)  
> **Founders**: Shyam Aiyappa & Pattada Namitha  
> **Target Audience**: Discerning consumers and hospitality/resort partners in Bangalore, Mysore, Mangalore, and Coorg.

---

## 1. Architectural Philosophy & Invariants

### A. Design System: "Coorg Heritage & Modern Purity"
- **Strict Aesthetic Mandate**: Avoid generic SaaS styling, neon glow badges, purple-tinted gradients, and cookie-cutter AI templates ("AI slop").
- **Core Color Palette**:
  - `coorg-green` (`#1b3b2b`): Deep, verdant estate forest green.
  - `earth-clay` (`#9b4922`): Terracotta/Kachampuli clay accent.
  - `misty-ivory` (`#f4f1ea`): Warm organic parchment canvas.
  - `warm-gold` (`#d4a373`): Refined heritage gold.
  - `ink-charcoal` (`#2a2b2a`): High-legibility body typography.
- **Typography Pairing**:
  - Headings & Accents: *Cormorant Garamond* (`var(--font-serif)`).
  - Body & Micro-Copy: *DM Sans* (`var(--font-sans)`).
- **Tailwind CSS v4 Configuration**:
  - Tailwind v4 does **NOT** use `tailwind.config.ts`.
  - All custom theme colors, fonts, and animation properties are declared directly inside the `@theme` block in `src/app/globals.css`.

---

## 2. Core Workflows & Data Flows

### A. Product Catalog & Data Layer
- Source of truth: `src/data/products.ts`.
- Exports:
  - `PRODUCTS`: 30 curated products with categories, pricing, unit, description, specs, and origin.
  - `FARM_TOUR`: Pricing, timing slots, schedule, and highlights.
  - `DELIVERY_ZONES`: City delivery lead times and free shipping thresholds.
- When adding or modifying SKUs, always regenerate `docs/catalog-descriptions.txt` and `docs/catalog-descriptions.md` using `scripts/generate-doc.js`.

### B. Cart & Tour Booking State
- Context provider: `src/lib/cart-context.tsx`.
- Persists shopping cart to `localStorage` key: `aqua_cart`.
- Manages dual cart state:
  - Physical product items with quantity modifiers.
  - Agro-tourism experience booking (date, slot, adult/child counts).
- Calculates tiered delivery fees:
  - Bangalore: Free above ₹1,500 (else ₹150).
  - Mysore: Free above ₹1,200 (else ₹100).
  - Mangalore: Free above ₹1,500 (else ₹180).
  - Coorg (Local): Free above ₹800 (else ₹60).

### C. Checkout & Payment Flow (Razorpay)
- Route: `src/app/api/checkout/route.ts`.
- **POST `/api/checkout`**:
  - Validates amount and items.
  - Instantiates `Razorpay` with `process.env.RAZORPAY_KEY_ID` and `process.env.RAZORPAY_KEY_SECRET`.
  - Creates an order in paise and returns `{ orderId, amount, currency, keyId }`.
- **GET `/api/checkout?amount=...`**:
  - Standalone fallback payment page with embedded Razorpay modal auto-trigger.
- **Client In-Drawer Trigger**:
  - Handled in `CartDrawer.tsx` via `window.Razorpay(options).open()`.

### D. Multi-Channel Order Notification Pipeline
On successful payment:
1. **FormSubmit.co Email Dispatch**:
   - Silent AJAX POST to `https://formsubmit.co/ajax/aquaventures.coorg@gmail.com`.
   - Headers: `{ Accept: 'application/json' }`.
   - Hidden honeypot `_honey` protection against spam bots.
   - Body includes Razorpay Payment ID, Order ID, amount, and items/tour summary.
2. **One-Tap WhatsApp Receipt**:
   - UI renders a prefilled WhatsApp link to Shyam Aiyappa (`+918123288564`).
3. **Audit Log & Fastify HITL Webhook**:
   - Dispatches to `/api/order-notify`, which appends to `data/orders.json` and alerts the Fastify backend at `http://192.168.1.200:4050/api/lead-alert`.

---

## 3. SEO, AEO & Crawlability Guidelines

- **Answer Engine Optimization (AEO)**:
  - Keep `jsonLdSchema` in `src/app/layout.tsx` updated with accurate FAQ items so AI search engines (Perplexity, ChatGPT Search, Gemini) can parse answers about Tilapia spring-water purity, cold-chain logistics, and farm tours.
- **`llms.txt`**:
  - Located in `public/llms.txt`. Conforms to the [llmstxt.org](https://llmstxt.org) standard.
  - Update whenever product prices, schedules, or contact details change.
- **Sitemap & Metadata**:
  - Managed via `src/app/sitemap.ts` and `metadata` object in `src/app/layout.tsx`.
  - Canonical URL is `https://aquaventurescoorg.com`.

---

## 4. Maintenance & Deployment Rules

1. **Environment Secrets**:
   - Never commit `.env.local` or raw secret keys to git.
   - Maintain `.env.example` as the documentation template.
2. **Verification Before Commits**:
   - Always run `pnpm run build` before pushing to confirm zero TypeScript compilation errors.
3. **Vercel Region**:
   - `vercel.json` designates `bom1` (Mumbai) to ensure single-digit millisecond latency to Karnataka users.
