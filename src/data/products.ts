export interface Product {
  id: string;
  name: string;
  category: 'just-meen' | 'just-homemade' | 'just-fresh' | 'just-grow' | 'commercial';
  categoryLabel: string;
  price: number;
  unit: string;
  badge?: string;
  image: string;
  tagline: string;
  description: string;
  specs: {
    packaging: string;
    shelfLife: string;
    prepTime?: string;
    origin: string;
  };
  highlights: string[];
  inStock: boolean;
  popular?: boolean;
}

export const PRODUCTS: Product[] = [
  // JUST MEEN - Frozen & Ready to Cook Fish & Seafood
  {
    id: 'tilapia-fillet-1kg',
    name: 'Tilapia Boneless Fillets',
    category: 'just-meen',
    categoryLabel: 'Just Meen Seafood',
    price: 600,
    unit: '1 kg Pack',
    badge: 'Bestseller',
    image: '/products/tilapia-fillet-1kg.png',
    tagline: 'Spring-water raised, zero muddy flavor, pristine boneless white meat.',
    description: 'Raised in pure Coorg mountain runoff within our closed-loop bio-secure raceways. Hand-filleted, flash-frozen immediately post-harvest, and vacuum-sealed to preserve tender texture and natural sweetness. High in lean protein, low in fat, and zero chemical preservatives.',
    specs: {
      packaging: '1kg Vacuum-sealed frozen pouch (approx 6-8 fillets)',
      shelfLife: '6 months at -18°C',
      prepTime: 'Thaw 15 mins; Cook 6-8 mins',
      origin: 'Aqua Ventures Estate, Siddapur, Coorg'
    },
    highlights: ['Zero muddy flavor guarantee', 'Antibiotic & formalin free', '100% boneless yield', 'High protein (23g per serving)'],
    inStock: true,
    popular: true
  },
  {
    id: 'prawns-large-16-20',
    name: 'Jumbo Prawns (16/20 Grade)',
    category: 'just-meen',
    categoryLabel: 'Just Meen Seafood',
    price: 650,
    unit: '500g Net Pack',
    badge: 'Chef\'s Choice',
    image: '/products/prawns-large-16-20.png',
    tagline: 'Individually Quick Frozen (IQF), deveined, plump sweet meat.',
    description: 'Premium colossal prawns individually blast-frozen so you can take out only what you need without thawing the block. Peeled, deveined, and tail-on for restaurant-grade butter garlic roasts, Coorg pepper fries, and curries.',
    specs: {
      packaging: '500g Zip-lock IQF pouch',
      shelfLife: '6 months at -18°C',
      prepTime: 'Cooks in 4 minutes directly from chilled',
      origin: 'Coorg Cold-Chain Hub'
    },
    highlights: ['Zero glazed ice cheating (100% net weight)', 'Cleaned & deveined', 'Sweet ocean-crisp bite', 'Jumbo 16/20 count'],
    inStock: true,
    popular: true
  },
  {
    id: 'prawns-medium-iqf',
    name: 'IQF Medium Prawns',
    category: 'just-meen',
    categoryLabel: 'Just Meen Seafood',
    price: 600,
    unit: '500g Net Pack',
    image: '/products/prawns-medium-iqf.png',
    tagline: 'Everyday quick-fry prawns, peeled, deveined, and tender.',
    description: 'Perfect bite-sized succulent prawns for daily curries, biryanis, and stir-fries. Flash frozen individually to retain maximum oceanic moisture and natural snap.',
    specs: {
      packaging: '500g Zip-lock IQF pouch',
      shelfLife: '6 months at -18°C',
      prepTime: 'Flash sauté in 3 minutes',
      origin: 'Coorg Cold-Chain Hub'
    },
    highlights: ['Peeled and deveined ready-to-pan', 'Even cooking size', 'Zero preservatives'],
    inStock: true
  },
  {
    id: 'fish-momos',
    name: 'Handcrafted Fish Momos',
    category: 'just-meen',
    categoryLabel: 'Just Meen Seafood',
    price: 300,
    unit: 'Pack of 10 Pcs',
    badge: 'Trending',
    image: '/products/fish-momos.png',
    tagline: 'Juicy spiced farm tilapia encased in gossamer-thin handcrafted wrappers.',
    description: 'An artisanal farm delicacy created by our Coorg kitchen. Stuffed with seasoned minced tilapia, scallions, ginger, and subtle hill spices. Steam in 6 minutes or pan-crisp for an irresistible high-protein appetizer.',
    specs: {
      packaging: '10 pcs blast-frozen tray pack with spicy dipping dip',
      shelfLife: '3 months at -18°C',
      prepTime: 'Steam 6 minutes or pan fry',
      origin: 'Aqua Ventures Kitchen, Guyya'
    },
    highlights: ['Made with 100% real tilapia mince', 'No MSG or artificial binders', 'Kids and health-conscious favorite', 'Spicy dip included'],
    inStock: true,
    popular: true
  },
  {
    id: 'fish-tikka',
    name: 'Marinated Fish Tikka',
    category: 'just-meen',
    categoryLabel: 'Just Meen Seafood',
    price: 300,
    unit: '350g Marinated Pack',
    image: '/products/fish-tikka.png',
    tagline: 'Marinated in roasted spices and curd; grill or pan sear in minutes.',
    description: 'Thick succulent cubes of freshwater tilapia steeped in a traditional tandoori-style marinade with ginger, garlic, Kashmiri chili, and cold-pressed mustard oil. Ready to pop onto your stovetop griddle, air fryer, or skewers.',
    specs: {
      packaging: '350g Vacuum-sealed marinated pack',
      shelfLife: '3 months frozen',
      prepTime: 'Air fry or grill 7-9 minutes',
      origin: 'Aqua Ventures Estate Kitchen'
    },
    highlights: ['Zero mess preparation', 'Rich smokey flavor profile', 'High-protein appetizer'],
    inStock: true
  },
  {
    id: 'fish-croquettes',
    name: 'Crispy Fish Croquettes',
    category: 'just-meen',
    categoryLabel: 'Just Meen Seafood',
    price: 300,
    unit: 'Pack of 10 Pcs',
    image: '/products/fish-croquettes.png',
    tagline: 'Golden panko crusted, fluffy spiced fish filling inside.',
    description: 'Crispy on the outside, velvety and aromatic on the inside. Crafted from estate fish, herbed mashed potatoes, and crushed black pepper. The quintessential teatime or party snack for adults and kids alike.',
    specs: {
      packaging: '10 pieces frozen tray',
      shelfLife: '3 months frozen',
      prepTime: 'Deep fry or air-fry 5 minutes until golden',
      origin: 'Aqua Ventures Kitchen'
    },
    highlights: ['Super crunchy exterior', 'Comfort food classic', 'Quick snack for guests'],
    inStock: true
  },
  {
    id: 'fish-fingers',
    name: 'Gourmet Crumbed Fish Fingers',
    category: 'just-meen',
    categoryLabel: 'Just Meen Seafood',
    price: 300,
    unit: 'Pack of 10 Pcs',
    image: '/products/fish-fingers.png',
    tagline: 'Whole fish fillet batons in seasoned golden crumb coating.',
    description: 'Unlike commercial minced patties, our fish fingers are sliced from whole tilapia fillets, dipped in delicate batter, and rolled in seasoned golden crumbs. Bakes or fries to golden perfection with flaky white fish inside.',
    specs: {
      packaging: '10 pieces frozen tray',
      shelfLife: '3 months frozen',
      prepTime: 'Cook 4-5 minutes in oil or air fryer',
      origin: 'Aqua Ventures Kitchen'
    },
    highlights: ['Real whole fillet cut', 'Kid approved crunch', 'Great with tartar or mint mayo'],
    inStock: true
  },
  {
    id: 'kaimeen-pickle',
    name: 'Kaimeen Fish Pickle (Heritage Style)',
    category: 'just-meen',
    categoryLabel: 'Just Meen Seafood',
    price: 350,
    unit: '250g Glass Jar',
    badge: 'Heritage',
    image: '/products/kaimeen-pickle.png',
    tagline: 'Slow-fried fish chunks preserved in gingelly oil and roasted Coorg spices.',
    description: 'A traditional coastal-Kodava recipe featuring crisp-fried fish steep-matured in cold-pressed sesame oil, fresh curry leaves, garlic cloves, green chilies, and tangy spices. An intensely savory burst with steamed rice or parottas.',
    specs: {
      packaging: '250g Airtight glass jar',
      shelfLife: '9 months at room temperature',
      origin: 'Handmade in Siddapur, Coorg'
    },
    highlights: ['Slow-cured in cold-pressed oil', 'Generous chunks of real fish', 'No synthetic vinegars or colors'],
    inStock: true
  },

  // JUST HOMEMADE - Preserves, Sauces & Heritage Condiments
  {
    id: 'kaipuli-marmalade',
    name: 'Kaipuli (Bitter Lime) Marmalade',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 220,
    unit: '250g Glass Jar',
    badge: 'Signature',
    image: '/products/kaipuli-marmalade.png',
    tagline: 'Rare wild Coorg citrus simmered with unrefined sugar; sweet, tart, and gently bitter.',
    description: 'Crafted from indigenous Kaipuli (wild bitter Seville oranges) that grow wild across our Coorg estate. Hand-shredded peel and citrus juice are simmered slowly in small copper kettles with unrefined sugar until jammy and aromatic. The breakfast choice for toast, scones, and cheese boards.',
    specs: {
      packaging: '250g Sealed glass jar',
      shelfLife: '12 months',
      origin: 'Aqua Ventures Heritage Orchards'
    },
    highlights: ['100% wild estate citrus', 'Zero artificial pectin or preservatives', 'Complex bittersweet palate', 'Pairs exquisitely with sharp cheese'],
    inStock: true,
    popular: true
  },
  {
    id: 'kachampuli',
    name: 'Pure Authentic Kachampuli',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 800,
    unit: '300ml Glass Bottle',
    badge: 'Liquid Gold',
    image: '/products/kachampuli.png',
    tagline: 'Coorg\'s revered wild Garcinia gummi-gutta extract; thick, dark, and fruity-sour.',
    description: 'The soul of Kodava cuisine. Extracted exclusively from ripe fruits of wild Garcinia trees harvested in the Coorg rainforest, boiled down over wood fires for days into an inky, viscous, sour-fruity nectar. Just a few drops tenderize meats, elevate fish curries, and give iconic Coorg dishes their signature tang.',
    specs: {
      packaging: '300ml Premium dark glass bottle',
      shelfLife: 'Virtually indefinite (improves with age)',
      origin: 'Forest-foraged & brewed in Siddapur, Coorg'
    },
    highlights: ['100% single-ingredient reduction', 'Natural meat tenderizer and souring agent', 'Generational wood-fired process', 'Essential for Kodava cooking'],
    inStock: true,
    popular: true
  },
  {
    id: 'strawberry-preserve',
    name: 'Artisan Strawberry Preserve',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 300,
    unit: '250g Glass Jar',
    image: '/products/strawberry-preserve.png',
    tagline: 'Whole fruit chunks, sun-ripened berries, pure fruit goodness.',
    description: 'Loaded with dense chunks of sweet strawberries slowly reduced with fresh lemon juice and cane sugar. Spoon over yogurt, sourdough pancakes, or fresh pastries.',
    specs: {
      packaging: '250g Glass jar',
      shelfLife: '9 months',
      origin: 'Aqua Ventures Greenhouse & Orchards'
    },
    highlights: ['Over 70% whole fruit content', 'No high fructose corn syrup', 'Velvety texture with whole berry chunks'],
    inStock: true
  },
  {
    id: 'fresh-pesto',
    name: 'Farm-Fresh Basil Pesto',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 350,
    unit: '200g Jar',
    badge: 'Fresh Harvest',
    image: '/products/fresh-pesto.png',
    tagline: 'Fresh hydroponic Italian Genovese basil pounded with garlic, nuts & olive oil.',
    description: 'Prepared within 2 hours of harvesting our fragrant greenhouse basil. Blended with extra virgin olive oil, toasted nuts, garlic, and sea salt. Toss with warm pasta or spread over toasted sourdough.',
    specs: {
      packaging: '200g Refrigerated glass jar',
      shelfLife: '45 days chilled',
      origin: 'Hydroponic House, Aqua Ventures'
    },
    highlights: ['Harvest-to-jar in 2 hours', 'Fragrant Italian Genovese basil', 'Rich in extra virgin olive oil'],
    inStock: true
  },
  {
    id: 'pepper-and-lime-pickle',
    name: 'Coorg Black Pepper & Lime Pickle',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 250,
    unit: '250g Glass Jar',
    image: '/products/pepper-and-lime-pickle.png',
    tagline: 'Spicy, tangy, zesty crunch featuring fresh Coorg green peppercorns.',
    description: 'Sun-dried thin-skinned estate limes tossed with whole aromatic Coorg black pepper berries, bird’s eye chili, and roasted fenugreek in cold-pressed oil. An electrifying accompaniment to curd rice and rotis.',
    specs: {
      packaging: '250g Glass jar',
      shelfLife: '12 months',
      origin: 'Siddapur, Coorg'
    },
    highlights: ['Single-estate Coorg pepper', 'Aged under natural sunlight', 'Digestive and immunity booster'],
    inStock: true
  },
  {
    id: 'mango-pickle',
    name: 'Traditional Cut Mango Pickle',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 180,
    unit: '250g Glass Jar',
    image: '/products/mango-pickle.png',
    tagline: 'Tender sour green mango cubes in spicy aromatic mustard masala.',
    description: 'Hand-diced raw sour mangoes infused with roasted mustard, red chili, asafoetida, and sesame oil. Made in small seasonal batches following generational home recipes.',
    specs: {
      packaging: '250g Glass jar',
      shelfLife: '12 months',
      origin: 'Siddapur, Coorg'
    },
    highlights: ['Crisp crunchy mango pieces', 'Generous aromatic oil blend', 'No artificial colors or preservatives'],
    inStock: true
  },
  {
    id: 'kaipuli-pickle',
    name: 'Kaipuli (Wild Orange) Pickle',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 190,
    unit: '250g Glass Jar',
    image: '/products/kaipuli-pickle.png',
    tagline: 'Distinctive bitter-tangy citrus pickle unique to Kodagu households.',
    description: 'A prized condiment in Coorg homes. Ripe Kaipuli rinds and fruit chunks cured in roasted cumin, chili, and oil. The bitter-tart complexity stimulates digestion and adds depth to any meal.',
    specs: {
      packaging: '250g Glass jar',
      shelfLife: '12 months',
      origin: 'Siddapur, Coorg'
    },
    highlights: ['Unique Kodava heritage flavor', 'Natural antioxidant powerhouse', 'Deep bitter-tangy character'],
    inStock: true
  },
  {
    id: 'passion-fruit-squash',
    name: 'Estate Passion Fruit Squash',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 350,
    unit: '750ml Bottle',
    image: '/products/passion-fruit-squash.png',
    tagline: 'Exotic tropical aroma, pure estate fruit pulp; mix with chilled water or soda.',
    description: 'Extracted from purple passion fruits grown along our estate fence lines. Naturally bursting with exotic floral sweetness and lively acidity. Dilute with ice water or soda for the ultimate natural cooler.',
    specs: {
      packaging: '750ml Food-grade bottle',
      shelfLife: '6 months',
      origin: 'Aqua Ventures Orchards, Coorg'
    },
    highlights: ['Real passion fruit pulp', 'Makes 20+ glasses', 'Refreshing natural tropical beverage'],
    inStock: true
  },
  {
    id: 'forest-apiary-honey',
    name: 'Raw Forest & Apiary Honey',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 1250,
    unit: '1 kg Glass Jar',
    badge: 'Raw & Pure',
    image: '/products/forest-apiary-honey.png',
    tagline: 'Unheated, unfiltered multi-flora honey harvested from Coorg coffee blossoms.',
    description: 'Harvested directly from bee boxes nestled among coffee bushes, wild orange blossoms, and silver oak trees on our farm. Never boiled or ultra-filtered; retains all active enzymes, pollen grains, and rich floral aromas.',
    specs: {
      packaging: '1kg Heavy glass jar',
      shelfLife: 'Indefinite',
      origin: 'Aqua Ventures Apiary, Guyya'
    },
    highlights: ['100% unpasteurized raw honey', 'Rich in active bee pollen & propolis', 'Natural coffee blossom floral notes'],
    inStock: true,
    popular: true
  },
  {
    id: 'farm-fresh-paneer',
    name: 'Artisan Farm-Fresh Malai Paneer',
    category: 'just-homemade',
    categoryLabel: 'Just Homemade Preserves',
    price: 180,
    unit: '200g Vacuum Pack',
    image: '/products/farm-fresh-paneer.png',
    tagline: 'Soft, melt-in-mouth cottage cheese crafted from pure local cow milk.',
    description: 'Freshly curdled using natural lemon whey, gently pressed for an ultra-creamy, velvety texture that soaks in marinades and curries without becoming rubbery.',
    specs: {
      packaging: '200g Vacuum pack',
      shelfLife: '14 days chilled',
      origin: 'Siddapur Farmstead Dairy'
    },
    highlights: ['Ultra tender and creamy', 'Zero cornstarch or preservatives', 'Rich source of clean dairy protein'],
    inStock: true
  },

  // JUST FRESH - Clean Hydroponic Harvest
  {
    id: 'hydroponic-palak',
    name: 'Hydroponic Tender Palak (Spinach)',
    category: 'just-fresh',
    categoryLabel: 'Just Fresh Hydroponics',
    price: 40,
    unit: '250g Bunch',
    image: '/products/hydroponic-palak.png',
    tagline: 'Soil-less, zero grit, tender leaves harvested fresh on order dispatch day.',
    description: 'Grown in our controlled nutrient-film hydroponic greenhouses using pure mountain water. Crisp, vibrant green leaves with no mud, grit, or chemical pesticide sprays. Ready to rinse and toss straight into soups, curries, or smoothies.',
    specs: {
      packaging: '250g Breathable fresh pouch with roots intact',
      shelfLife: '7-10 days refrigerated',
      origin: 'Aqua Ventures Hydroponics, Siddapur'
    },
    highlights: ['100% pesticide spray-free', 'Zero mud or washing fatigue', 'Roots intact for maximum crisper longevity'],
    inStock: true
  },
  {
    id: 'hydroponic-lettuce',
    name: 'Hydroponic Butterhead & Romaine Lettuce',
    category: 'just-fresh',
    categoryLabel: 'Just Fresh Hydroponics',
    price: 50,
    unit: 'Head / 200g Pack',
    badge: 'Crunchy',
    image: '/products/hydroponic-lettuce.png',
    tagline: 'Incredibly crisp, sweet leaves for gourmet salads and burger wraps.',
    description: 'Grown in climate-optimized soilless channels with balanced mineral hydration. The result is lush, sweet heads of lettuce that stay crunchier for twice as long in your refrigerator compared to soil-grown varieties.',
    specs: {
      packaging: 'Eco-ventilated clamshell pack',
      shelfLife: '10-12 days refrigerated',
      origin: 'Aqua Ventures Hydroponics, Siddapur'
    },
    highlights: ['Sweet and crunchy leaves', 'Zero soil pathogens', 'Ideal for Caesar salads and wraps'],
    inStock: true,
    popular: true
  },







  // JUST GROW - Organic Liquid Fish Fertilizer (Zero-Waste Circular Bio-Nutrients)
  {
    id: 'just-grow-fertilizer-1l',
    name: 'Just Grow Organic Liquid Fish Fertilizer (1L)',
    category: 'just-grow',
    categoryLabel: 'Just Grow Bio-Nutrition',
    price: 400,
    unit: '1 Litre Can',
    badge: 'Circular Eco',
    image: '/products/just-grow-liquid-fish-fertilizer.png',
    tagline: 'Cold-enzymatically hydrolyzed fish protein for explosive root vitality, foliar vigor & soil microbiome.',
    description: 'Produced directly at the Aqua Ventures eco-facility from 100% pure freshwater fish biomass via cold-enzymatic hydrolysis. Enriched with natural macro-nutrients (N-P-K), micronutrients, 18+ free L-amino acids, and beneficial soil trace minerals. Perfect all-purpose bio-stimulant for coffee estates, pepper vines, cardamom, indoor plants, lawns, home gardens, and orchards.',
    specs: {
      packaging: '1 Litre HDPE Recyclable Bottle with measuring cap',
      shelfLife: '24 months',
      prepTime: 'Foliar Spray: 2.5ml - 3ml per Litre water | Soil Drench: 5ml per Litre water',
      origin: 'Aqua Ventures Circular Bio-Facility, Guyya, Coorg'
    },
    highlights: ['100% natural bio-stimulant & plant food', 'Promotes prolific flowering & robust root mass', 'Enriches beneficial soil microbes & worm activity', 'Zero synthetic chemicals or heavy metals'],
    inStock: true,
    popular: true
  },
  {
    id: 'just-grow-fertilizer-5l',
    name: 'Just Grow Organic Liquid Fish Fertilizer (5L)',
    category: 'just-grow',
    categoryLabel: 'Just Grow Bio-Nutrition',
    price: 1500,
    unit: '5 Litre Estate Can',
    badge: 'Planters Pack',
    image: '/products/just-grow-liquid-fish-fertilizer.png',
    tagline: 'Commercial estate-grade cold-hydrolyzed bio-fertilizer for plantations, orchards & large farms.',
    description: 'Economy estate canister designed for planters, coffee growers, polyhouse operators, and large organic farms. Compatible with automated drip irrigation, power sprayers, and soil drenching regimes.',
    specs: {
      packaging: '5 Litre Heavy-duty Canister with tamper-evident seal',
      shelfLife: '24 months',
      prepTime: 'Foliar: 2.5ml - 3ml / L water | Drench: 5ml / L water (Apply every 15-20 days)',
      origin: 'Aqua Ventures Circular Bio-Facility, Guyya, Coorg'
    },
    highlights: ['Cost-effective bulk volume for estate agriculture', 'Drip-irrigation compatible (filtered to prevent nozzle clogging)', 'Dramatically improves berry setting & pepper spike filling', 'Certified Kodagu circular eco-production'],
    inStock: true,
    popular: true
  }
];

export interface TourPackage {
  id: string;
  name: string;
  pricePerAdult: number;
  pricePerChild: number;
  duration: string;
  timings: string;
  tagline: string;
  description: string;
  highlights: string[];
  schedule: { time: string; activity: string }[];
}

export const FARM_TOUR: TourPackage = {
  id: 'integrated-farm-tour',
  name: 'Integrated Farm Tour & Riverbank Tasting Experience',
  pricePerAdult: 1500,
  pricePerChild: 800,
  duration: '3.5 Hours',
  timings: 'Morning Slot: 10:00 AM - 1:30 PM | Evening Slot: 3:00 PM - 6:30 PM',
  tagline: 'A sensorial journey into circular aquaculture, hydroponics, apiaries, and farm-to-fork dining.',
  description: 'Step into the tranquil 10-acre riverside sanctuary of Aqua Ventures in Guyya Village, Siddapur. The founding team — Shyam Aiyappa, Pattada Namitha, Mukul Appaiah, and Naina Ballachanda — take you behind the scenes of India\'s leading integrated farm model. Feed massive schools of jumping Tilapia, harvest crisp hydroponic greens, inspect buzzing honeybee hives, and cap off your journey with a lavish, freshly cooked farm lunch right by the river.',
  highlights: [
    'Hands-on Aquaculture: Tour bio-secure fish raceways and feed feeding schools',
    'Soilless Hydroponics: Masterclass on automated nutrient film and CEA greens',
    'Apiary & Beekeeping: Learn hive dynamics and taste raw unpasteurized honey',
    'Farm-to-Fork Lunch: Freshly harvested grilled fish or vegetarian paneer platter with traditional Coorg delicacies',
    'Riverside Relaxation: Secluded deck along the Cauvery tributary for coffee and contemplation'
  ],
  schedule: [
    { time: '10:00 AM', activity: 'Warm Welcome & Estate Herbal Welcome Drink' },
    { time: '10:20 AM', activity: 'Aquaculture Tour & Interactive Fish Feeding' },
    { time: '11:10 AM', activity: 'Hydroponics Greenhouse & Fresh Greens Harvesting' },
    { time: '11:50 AM', activity: 'Beekeeping, Apiary Inspection & Raw Honey Tasting' },
    { time: '12:30 PM', activity: 'Riverside Farm-to-Fork Lunch / Tasting Platter' },
    { time: '01:15 PM', activity: 'Farm Store Visit, Q&A with Shyam, and Departure' }
  ]
};

export const B2B_FINGERLINGS = [
  {
    species: 'Catla (Indian Major Carp)',
    price: '₹2.20 / pc',
    minOrder: '1,000 Fingerlings',
    description: 'High survival rate, surface feeder, pathogen-screened nursery batch.'
  },
  {
    species: 'Rohu (Labeo rohita)',
    price: '₹2.20 / pc',
    minOrder: '1,000 Fingerlings',
    description: 'Column feeder with rapid growth conversion in composite fish culture.'
  },
  {
    species: 'Grass Carp (Ctenopharyngodon)',
    price: '₹2.20 / pc',
    minOrder: '500 Fingerlings',
    description: 'Exceptional weed-clearing and rapid biomass gain in pond ecosystems.'
  },
  {
    species: 'Murrel (Channa striata / Snakehead)',
    price: '₹10.00 / pc',
    minOrder: '200 Fingerlings',
    description: 'High-value air-breathing carnivore with supreme market culinary demand.'
  }
];

export const DELIVERY_ZONES = [
  {
    city: 'Local Coorg / Kodagu Doorstep',
    leadTime: 'Same-Day / Next-Day Farm Dispatch',
    type: 'Direct Farm Courier / Estate Doorstep & Farm Pickup Available',
    freeAbove: '₹800'
  },
  {
    city: 'Regional Next-Day Express',
    leadTime: 'Guaranteed Next-Day Morning Delivery',
    type: 'Sub-Zero Insulated Cold-Chain with Dry Ice / Temperature Monitoring',
    freeAbove: '₹1,500'
  },
  {
    city: 'Direct Farm-to-Kitchen Wholesale Route',
    leadTime: 'Scheduled Bulk Reefer Logistics',
    type: 'Temperature-Controlled Reefer Vehicles for Hospitality & Retail Partners',
    freeAbove: '₹3,000'
  },
  {
    city: 'Pan-India Ambient Shipping',
    leadTime: '2 - 4 Business Days Air/Surface Cargo',
    type: 'Eco-Protective Courier Dispatch for Just Homemade & Just Grow lines',
    freeAbove: '₹1,200'
  }
];
