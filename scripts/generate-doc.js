const fs = require('fs');
const { PRODUCTS, FARM_TOUR } = require('./dist/products.js');

let textDoc = `=================================================================
           AQUA VENTURES COORG — COMPLETE PRODUCT CATALOG        
            "Just Meen" Seafood, Preserves, Hydroponics & Agri    
                   Founder Copy Review Document                  
=================================================================

Estate Location: Guyya Village, Siddapur, Kodagu (Coorg), Karnataka - 571253
Founders: Shyam Aiyappa & Pattada Namitha
Phone / WhatsApp: +91 81232 88564 / +91 97317 84873
Email: aquaventures.coorg@gmail.com
Total Curated Offerings: ${PRODUCTS.length} Products + Agro-Tourism Experiences
=================================================================
`;

let mdDoc = `# Aqua Ventures Coorg — Complete Product Catalog & Copy Document

> **Brand**: Just Meen & Aqua Ventures Coorg  
> **Founders**: Shyam Aiyappa & Pattada Namitha  
> **Location**: Guyya Village, Siddapur, Kodagu (Coorg), Karnataka – 571253  
> **Direct Contact**: +91 81232 88564 | aquaventures.coorg@gmail.com  
> **Total Products**: ${PRODUCTS.length}

---
`;

let currentCat = '';
PRODUCTS.forEach((p, idx) => {
  if (currentCat !== p.categoryLabel) {
    currentCat = p.categoryLabel;
    textDoc += `\n-----------------------------------------------------------------\nCATEGORY: ${currentCat.toUpperCase()}\n-----------------------------------------------------------------\n\n`;
    mdDoc += `\n## ${currentCat}\n\n`;
  }

  textDoc += `${idx + 1}. ${p.name} (${p.unit})\n`;
  textDoc += `   Price: ₹${p.price.toLocaleString('en-IN')} per ${p.unit}\n`;
  if (p.badge) textDoc += `   Badge: [${p.badge}]\n`;
  textDoc += `   Tagline: ${p.tagline}\n`;
  textDoc += `   Description: ${p.description}\n`;
  textDoc += `   Packaging: ${p.specs.packaging}\n`;
  textDoc += `   Shelf Life: ${p.specs.shelfLife}\n`;
  if (p.specs.prepTime) textDoc += `   Preparation / Cooking: ${p.specs.prepTime}\n`;
  textDoc += `   Origin: ${p.specs.origin}\n`;
  if (p.highlights && p.highlights.length) {
    textDoc += `   Highlights: ${p.highlights.join(' • ')}\n`;
  }
  textDoc += `\n`;

  mdDoc += `### ${idx + 1}. ${p.name}\n`;
  mdDoc += `- **Price**: ₹${p.price.toLocaleString('en-IN')} / ${p.unit}\n`;
  if (p.badge) mdDoc += `- **Tag**: \`${p.badge}\`\n`;
  mdDoc += `- **Tagline**: *${p.tagline}*\n`;
  mdDoc += `- **Description**: ${p.description}\n`;
  mdDoc += `- **Packaging**: ${p.specs.packaging}\n`;
  mdDoc += `- **Shelf Life**: ${p.specs.shelfLife}\n`;
  if (p.specs.prepTime) mdDoc += `- **Preparation**: ${p.specs.prepTime}\n`;
  mdDoc += `- **Origin**: ${p.specs.origin}\n`;
  if (p.highlights && p.highlights.length) {
    mdDoc += `- **Key Highlights**: ${p.highlights.join(', ')}\n`;
  }
  mdDoc += `\n`;
});

// Experiences
textDoc += `\n-----------------------------------------------------------------
EXPERIENCES: INTEGRATED AGRO-ECOLOGY FARM TOUR & TASTING
-----------------------------------------------------------------
Pricing: ₹${FARM_TOUR.pricePerAdult} per Adult | ₹${FARM_TOUR.pricePerChild} per Child (5-12 yrs)
Duration: 3.5 Hours
Slots:
  - Morning (10:00 AM - 1:30 PM) · Includes Farm-to-Fork Lunch
  - Evening (3:00 PM - 6:30 PM) · Includes Riverside High Tea
Location: Aqua Ventures Sanctuary, Guyya Village, Siddapur, Coorg
Highlights:
${FARM_TOUR.highlights.map(h => '  - ' + h).join('\n')}

Schedule Breakdown:
${FARM_TOUR.schedule.map(s => '  - ' + s.time + ': ' + s.activity).join('\n')}
`;

mdDoc += `\n## Experiences: Integrated Agro-Ecology Farm Tour & Tasting

- **Price**: ₹${FARM_TOUR.pricePerAdult} / Adult | ₹${FARM_TOUR.pricePerChild} / Child (5-12 yrs)
- **Duration**: 3.5 Hours
- **Available Slots**:
  - **Morning**: 10:00 AM – 1:30 PM (Includes Farm-Fresh Lunch Feast)
  - **Evening**: 3:00 PM – 6:30 PM (Includes Riverside High Tea & Sunset)
- **Location**: Aqua Ventures Sanctuary, Guyya Village, Siddapur, Coorg
- **Highlights**:
${FARM_TOUR.highlights.map(h => '  - ' + h).join('\n')}

### Typical Tour Schedule
| Time | Activity |
| :--- | :--- |
${FARM_TOUR.schedule.map(s => `| **${s.time}** | ${s.activity} |`).join('\n')}
`;

if (!fs.existsSync('docs')) fs.mkdirSync('docs');
fs.writeFileSync('docs/catalog-descriptions.txt', textDoc, 'utf8');
fs.writeFileSync('docs/catalog-descriptions.md', mdDoc, 'utf8');
console.log(`SUCCESS: Exported all ${PRODUCTS.length} products to docs/catalog-descriptions.txt and docs/catalog-descriptions.md`);
