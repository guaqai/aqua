import { NextResponse } from 'next/server';
import { getKnowledgeBase, buildSystemPromptForAI } from '@/lib/kb';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const kb = getKnowledgeBase();
    const systemPrompt = buildSystemPromptForAI(kb);

    const openRouterKey = process.env.OPENROUTER_API_KEY;

    if (openRouterKey) {
      try {
        const messages = [
          { role: 'system', content: systemPrompt },
          ...(history || []).map((h: any) => ({
            role: h.role === 'assistant' ? 'assistant' : 'user',
            content: h.text
          })),
          { role: 'user', content: message }
        ];

        const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://aquaventures.coorg',
            'X-Title': 'Aqua Ventures Concierge'
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.2-3b-instruct:free',
            messages,
            temperature: 0.5,
            max_tokens: 450
          })
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          const reply = aiData.choices?.[0]?.message?.content;
          if (reply) return NextResponse.json({ reply });
        }
      } catch (llmErr) {
        console.warn('OpenRouter chat fallback triggered:', llmErr);
      }
    }

    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('muddy') || lower.includes('smell') || lower.includes('taste')) {
      reply = 'Our Tilapia are raised in high-flow, oxygenated mountain spring water in clean concrete raceways with zero bottom mud or silt. This guarantees pure, sweet, clean white meat with absolutely zero muddy odor or taste!';
    } else if (lower.includes('bangalore') || lower.includes('mysore') || lower.includes('mangalore') || lower.includes('delivery')) {
      reply = 'We deliver across Bangalore, Mysore, Mangalore, and Coorg using certified sub-zero insulated thermocol packaging with dry ice packs.\n- Bangalore: Tuesdays, Thursdays, Saturdays (Free above ₹1,500)\n- Mysore: Next-day refrigerated van (Free above ₹1,200)\n- Mangalore: Coastal refrigerated run (Free above ₹1,500)\n- Coorg: Same-day / next-day direct farm dispatch.\n\nAll ambient preserves (Kachampuli, Kaipuli marmalade, pickles, honey) ship Pan-India!';
    } else if (lower.includes('kachampuli')) {
      reply = 'Kachampuli is the soul of Kodava cooking! It is a pure, woodfire-reduced extract of wild Garcinia gummi-gutta fruit with a glossy black color and rich fruity tartness. Add just 3-5 drops toward the end of cooking your curry to tenderize meats and balance flavors.';
    } else if (lower.includes('marmalade') || lower.includes('kaipuli')) {
      reply = 'Our Kaipuli (Bitter Lime) Marmalade is handcrafted from rare heritage wild Seville bitter limes that grow on our Coorg estate. Simmered with unrefined cane sugar in copper kettles, it delivers an exquisite sweet, tart, and bittersweet finish perfect for toast, scones, or pairing with sharp cheeses!';
    } else if (lower.includes('tour') || lower.includes('visit') || lower.includes('stay') || lower.includes('experience')) {
      reply = 'Our 3.5-hour Integrated Farm Tour & Riverbank Tasting costs ₹1,500/adult and ₹800/child (ages 5-12). It includes:\n1. Hands-on fish raceway tour & feeding\n2. Soilless hydroponics greenhouse masterclass\n3. Apiary beekeeping tour & raw honey tasting\n4. Lavish riverside farm-to-fork lunch by the Cauvery stream!\n\nYou can reserve directly on the page under "Farm Tour & Tasting" or WhatsApp us at +91 81232 88564.';
    } else if (lower.includes('fingerling') || lower.includes('seed') || lower.includes('catla') || lower.includes('rohu') || lower.includes('murrel') || lower.includes('bulk')) {
      reply = 'We supply pathogen-screened commercial fingerlings: Catla (₹2.20), Rohu (₹2.20), Grass Carp (₹2.20), and Murrel (₹10.00) with complete pond stocking guidance. For commercial farm supply or restaurant bulk orders (10kg+), submit our B2B form or connect directly with founder Shyam Aiyappa on WhatsApp: +91 81232 88564.';
    } else if (lower.includes('momos') || lower.includes('tikka') || lower.includes('croquette') || lower.includes('prawn')) {
      reply = 'Our frozen seafood ready-to-cook range features:\n- 100% Tilapia Fish Momos (₹300 / 10 pcs - steam in 6 mins)\n- Colossal Deveined Prawns (16/20 Grade, ₹650 / 500g)\n- Marinated Fish Tikka (₹300 / 350g - air fry or grill)\n- Crispy Fish Croquettes (₹300 / 10 pcs)\n\nAll items arrive rock-hard frozen in sub-zero insulated boxes!';
    } else {
      reply = `Thank you for reaching out to Aqua Ventures! We are an integrated 10-acre sustainable aqua-farm in Guyya Village, Siddapur, Coorg, co-founded by Shyam Aiyappa and Pattada Namitha.\n\nWhether you need our fresh boneless Tilapia fillets (₹600/kg), wild Kaipuli marmalade, wood-fired Kachampuli, farm tour bookings (₹1,500), or commercial fingerlings, we are ready to assist. You can also chat directly with Shyam on WhatsApp at +91 81232 88564!`;
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('Chat API error:', err);
    return NextResponse.json({ reply: 'Hello! You can also reach founder Shyam Aiyappa on WhatsApp at +91 81232 88564.' }, { status: 200 });
  }
}
