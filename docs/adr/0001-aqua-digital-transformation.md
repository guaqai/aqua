# ADR 0001: Aqua Ventures Digital Transformation Architecture

## Status
Accepted

## Context
Aqua Ventures is a high-yield integrated aqua-farm in Guyya Village, Siddapur, Coorg (Kodagu, Karnataka) producing fresh/frozen Tilapia, seafood, traditional preserves (Kachampuli, Kaipuli marmalade), hydroponic produce, Vinessence sprouted millet mixes, commercial aquaculture fingerlings, and offering eco-agritourism farm tours.
They are running ad campaigns across Bangalore, Mysore, Mangalore, and Coorg, and receiving inbound inquiries via WhatsApp Business and social channels. The goal is to replace human bottlenecks in retail ordering while providing automated lead qualification and Human-In-The-Loop (HITL) handoffs to founder Shyam Aiyappa (+918123288564) for high-value B2B/bulk deals.

## Decision
1. **Frontend Experience**:
   - Modern Next.js 15 (App Router) with Tailwind CSS, Framer Motion, and Lucide Icons.
   - Built to meet Awwwards-tier visual design: Dark luxury emerald/aquatic aesthetic with micro-interactions, responsive sticky header, catalog filtering, interactive cart drawer, and interactive farm tour booking.
   - Seamless Razorpay checkout integration with test keys (rzp_test_TZfNbISwH2L3ej), switchable via environment variables to live keys on deployment.
   - Admin Knowledge Base control view (/admin) for instant updates of FAQs, delivery schedules, and product notes.

2. **Backend Engine (buddywhitman@192.168.1.200 ~/guaq-ai/clients/aqua)**:
   - Fastify/Node.js modular API running on port 4050 attached to the existing guaq_net network.
   - Zero interference with existing tenant containers (events-api, redis, mariadb, litellm).
   - Knowledge Base with dynamic update triggers:
     * Web Admin endpoint (POST /api/kb/update).
     * Direct WhatsApp commands from authorized founder number +918123288564 (!kb, !price, !stock).
     * PDF and text document ingestion parser.
   - AI Lead Qualification:
     * Inbound classification: B2C retail vs. B2B bulk/fingerling buyers.
     * B2C: automated recommendations, cooking advice, and Razorpay payment link generation.
     * B2B: instant high-priority alert to +918123288564 with direct WhatsApp click-to-chat.

## Consequences
- Single unified product catalog for both WhatsApp and Web channels.
- Full automation of consumer e-commerce transactions while safeguarding high-touch B2B hospitality relationships.
- Clean separation between Vercel-hosted frontend and on-premise private AI engine.
