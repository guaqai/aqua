# ADR 0002: Brand Architecture Realignment, FSSAI Compliance & Circular Economy Focus

## Status
Accepted

## Context
Aqua Ventures required a strategic brand realignment to clarify its position in the market:
1. **Parent Holding vs. D2C Brands**: Aqua Ventures is the parent holding umbrella entity rather than a retail consumer brand. The four consumer-facing brands are:
   - **Just Meen**: Pure spring-water fisheries, boneless tilapia fillets, and flash-frozen seafood.
   - **Just Homemade**: Packaged traditional preserves, wood-fired Kachampuli vinegar, wild Kaipuli marmalade, pickles, artisan malai paneer, and pure apiary honey.
   - **Just Fresh**: Perishable fresh produce (hydroponic lettuce, tender palak, fresh pesto) developed in collaboration with local partner entrepreneurs.
   - **Just Grow**: Cold-enzymatically hydrolyzed liquid fish fertilizer (1L & 5L) upcycling aquaculture biomass into high-potency organic plant nutrients for coffee plantations, orchards, and home gardens.
2. **Category Decommissioning**: The legacy 'Vinessence' product line (millet pastas, dosa mixes) was decommissioned and fully removed across the catalog, data files, and documentation.
3. **FSSAI Compliance**: State License No: 11223319000027 displayed prominently across the Hero, SEO schema, metadata, and footer.
4. **Founding Team Realignment**: Acknowledged all four co-founders (Shyam Aiyappa, Pattada Namitha, Mukul Appaiah, and Naina Ballachanda) highlighting women-led entrepreneurship, technical agro-ecology, and community-first Kodava values.
5. **Operational Evolution over Heritage Clichés**: Shifted brand narrative away from generic 'Est. 2014' and generational tropes, anchoring modern operations around the 2022 transformation into a circular agro-ecology model.
6. **Logistics Flexibility**: Generalized cold-chain logistics from fixed city lists to regional and national tiers (Local Kodagu, Regional Express Cold-Chain, Direct Farm-to-Kitchen Wholesale, Pan-India Ambient).

## Decision
- Updated `src/data/products.ts`, `src/components/ProductCatalog.tsx`, `src/components/Hero.tsx`, `src/components/AboutSection.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, and `src/lib/cart-context.tsx`.
- Integrated official Aqua Ventures parent logo and brand logos for Just Meen, Just Homemade, Just Fresh, and Just Grow.
- Updated SVG favicons, SEO metadata, JSON-LD schemas, and llms.txt.
- Re-exported catalog descriptions to `docs/catalog-descriptions.txt` and `docs/catalog-descriptions.md`.

## Consequences
- Clean brand hierarchy that elevates consumer D2C brands without cluttering the buyer journey with parent corporate or B2B concerns.
- Complete removal of obsolete SKUs with zero broken links or missing assets.
- Robust compliance with Indian food safety standards and transparent founder attribution.
