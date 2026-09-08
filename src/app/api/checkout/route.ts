import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TZfNbISwH2L3ej';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'vljPV6H7YWNqYI5iHKtmZE2V';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customer, items, tourBooking, city } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid order amount' }, { status: 400 });
    }

    const instance = new Razorpay({
      key_id: KEY_ID,
      key_secret: KEY_SECRET
    });

    const receipt = `aqua_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const options = {
      amount: Math.round(amount * 100), // in paise
      currency: 'INR',
      receipt,
      notes: {
        customer_name: customer?.name || 'Customer',
        customer_phone: customer?.phone || '',
        customer_city: city || '',
        has_tour: tourBooking ? 'yes' : 'no'
      }
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: KEY_ID
    });
  } catch (err: any) {
    console.error('Razorpay order creation error:', err);
    return NextResponse.json(
      { error: err?.error?.description || err.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
