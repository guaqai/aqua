import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    const { paymentId, orderId, signature, amount, customer, items, tourBooking, city } = orderData;

    // 1. Verify cryptographic signature if RAZORPAY_KEY_SECRET is set
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    let signatureValid = false;
    if (keySecret && signature && orderId && paymentId) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        console.warn('Razorpay payment signature verification failed!');
        return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
      }
      signatureValid = true;
    }

    // 2. Log locally to orders audit file
    const logDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, 'orders.json');
    let existingOrders: any[] = [];
    if (fs.existsSync(logFile)) {
      try {
        existingOrders = JSON.parse(fs.readFileSync(logFile, 'utf8'));
      } catch (e) {
        existingOrders = [];
      }
    }

    const isDuplicate = existingOrders.some((o: any) => o.paymentId === paymentId);
    if (!isDuplicate) {
      const newRecord = {
        timestamp: new Date().toISOString(),
        source: 'Client In-Drawer Checkout',
        paymentId,
        orderId,
        amount,
        customer,
        items,
        tourBooking,
        city,
        verified: signatureValid
      };
      existingOrders.push(newRecord);
      fs.writeFileSync(logFile, JSON.stringify(existingOrders, null, 2), 'utf8');
    }

    // 3. Forward to Fastify HITL backend on 192.168.1.200:4050
    try {
      const summaryText = tourBooking
        ? `Tour on ${tourBooking.date} (${tourBooking.slot}) for ${tourBooking.adults} Adults, ${tourBooking.children} Kids`
        : `${(items || []).length} items to ${customer?.address || city || 'Coorg/Bangalore'}`;

      await fetch('http://192.168.1.200:4050/api/lead-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Razorpay Verified Payment',
          customerName: customer?.name || 'Customer',
          customerPhone: customer?.phone || '9876543210',
          amount: amount,
          paymentId: paymentId,
          details: summaryText
        }),
        signal: AbortSignal.timeout(3000)
      });
    } catch (backendErr) {
      console.warn('Fastify alert ping timed out or offline:', backendErr);
    }

    return NextResponse.json({ success: true, logged: true });
  } catch (err: any) {
    console.error('Order notify error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
