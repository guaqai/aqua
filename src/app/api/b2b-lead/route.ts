import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'src', 'data', 'leads.json');
const BACKEND_ALERT_URL = process.env.AQUA_BACKEND_ALERT_URL || 'http://192.168.1.200:4050/api/alerts/hitl';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, businessName, phone, location, interest, quantity, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const leadRecord = {
      id: `lead_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name,
      businessName: businessName || 'Individual Buyer',
      phone,
      location: location || 'Not specified',
      interest: interest || 'General Bulk Inquiry',
      quantity: quantity || 'Not specified',
      notes: notes || '',
      status: 'pending_contact'
    };

    // 1. Persist lead locally
    try {
      let currentLeads = [];
      if (fs.existsSync(LEADS_FILE)) {
        const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
        currentLeads = JSON.parse(raw);
      }
      currentLeads.unshift(leadRecord);
      fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error persisting lead file:', e);
    }

    // 2. Dispatch HITL alert to backend if reachable
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      await fetch(BACKEND_ALERT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadRecord),
        signal: controller.signal
      }).catch(err => {
        console.warn('Direct backend alert notification timed out or skipped (lead saved locally):', err.message);
      });
      clearTimeout(timeoutId);
    } catch (err: any) {
      console.warn('Backend alert warning:', err.message);
    }

    return NextResponse.json({
      success: true,
      leadId: leadRecord.id,
      message: 'B2B lead recorded and alerted to Shyam Aiyappa (+91 81232 88564)'
    });
  } catch (err: any) {
    console.error('B2B Lead API error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
