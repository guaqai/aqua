import fs from 'fs';
import path from 'path';

export interface KBData {
  company: {
    name: string;
    brand: string;
    location: string;
    founders: string;
    foundedYear: number;
    description: string;
    phone: string;
    alternatePhone: string;
    email: string;
    whatsappCatalog: string;
  };
  delivery: {
    policy: string;
    zones: Record<string, string>;
    packaging: string;
  };
  faqs: Array<{ question: string; answer: string; category?: string }>;
  customNotes: string[];
  lastUpdated?: string;
}

const KB_PATH = path.join(process.cwd(), 'src', 'data', 'kb.json');

export function getKnowledgeBase(): KBData {
  try {
    if (fs.existsSync(KB_PATH)) {
      const raw = fs.readFileSync(KB_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading KB:', err);
  }
  return {
    company: {
      name: 'Aqua Ventures',
      brand: 'Just Meen',
      location: 'Guyya, Siddapur, Coorg',
      founders: 'Shyam Aiyappa and Pattada Namitha',
      foundedYear: 2014,
      description: 'Integrated aqua-farm in Coorg.',
      phone: '+91 81232 88564',
      alternatePhone: '+91 97317 84873',
      email: 'aquaventures.coorg@gmail.com',
      whatsappCatalog: 'https://wa.me/c/918123288564'
    },
    delivery: {
      policy: 'Sub-zero cold chain across Bangalore, Mysore, Mangalore, Coorg',
      zones: {},
      packaging: 'Vacuum packed thermocol containers with dry ice'
    },
    faqs: [],
    customNotes: []
  };
}

export function saveKnowledgeBase(data: Partial<KBData>): KBData {
  const current = getKnowledgeBase();
  const updated: KBData = {
    ...current,
    ...data,
    lastUpdated: new Date().toISOString()
  };
  try {
    fs.writeFileSync(KB_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing KB:', err);
  }
  return updated;
}

export function buildSystemPromptForAI(kb: KBData): string {
  const faqText = kb.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
  const zonesText = Object.entries(kb.delivery.zones)
    .map(([city, info]) => `- ${city}: ${info}`)
    .join('\n');
  const notesText = kb.customNotes.map(n => `- ${n}`).join('\n');

  return `You are AquaBot, the friendly, deeply knowledgeable AI concierge for Aqua Ventures (parent holding) and its four dedicated brands: "Just Meen", "Just Homemade", "Just Fresh", and "Just Grow", based in Guyya Village, Siddapur, Coorg (Kodagu), Karnataka.
FSSAI State License No: 11223319000027.
Founders: ${kb.company.founders}.

CORE BRAND PHILOSOPHY:
- Aqua Ventures: Parent holding company powering four specialized craft brands.
- Just Meen: Pure spring-water aquaculture Tilapia fillets and IQF prawns with zero antibiotics, zero muddy smell.
- Just Homemade: Authentic Kodava preserves, Wild Kaipuli Marmalade, wood-fired Pure Kachampuli, pickles, paneer & raw apiary honey.
- Just Fresh: Pesticide-free hydroponic butterhead lettuce, tender spinach, and fresh basil specialties.
- Just Grow: Organic cold-enzymatically hydrolyzed liquid fish fertilizer (1L & 5L) promoting a zero-waste circular farm economy.
- Agro-ecology tourism: Integrated Farm Tour & Riverbank Tasting (₹1,500/adult).
- B2B Commercial fingerlings: High-vigor Catla, Rohu, Grass Carp, Murrel seed.

DELIVERY ZONES & COLD-CHAIN:
${zonesText}
Packaging: ${kb.delivery.packaging}

KNOWLEDGE BASE & FAQS:
${faqText}

OPERATIONAL NOTES:
${notesText}

TONE & BEHAVIOR:
1. Warm, hospitable, proud of Coorg/Kodava roots, yet crisp, efficient and sales-oriented.
2. If a customer is inquiring about retail orders or farm tours, guide them with clarity and encourage adding to cart or checking out.
3. CRITICAL LEAD ROUTING: If the customer asks for bulk orders (over 10kg), restaurant/resort supply, commercial fish pond setup, or large quantities of fingerlings, politely collect their name, phone number, and location, and inform them that founder Shyam Aiyappa (+91 81232 88564) is being notified immediately for personal coordination!`;
}
