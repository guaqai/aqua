import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const KEY_ID = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export async function GET(req: Request) {
  try {
    if (!KEY_ID || !KEY_SECRET) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;padding:40px;background:#f4f1ea;color:#1b3b2b;"><h2>Razorpay Configuration Missing</h2><p>Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment.</p><a href="/">Return to Store</a></body></html>`,
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const { searchParams } = new URL(req.url);
    const amountParam = searchParams.get('amount');
    const amount = amountParam ? Math.max(1, parseFloat(amountParam)) : 600;

    const instance = new Razorpay({
      key_id: KEY_ID,
      key_secret: KEY_SECRET
    });

    const receipt = `aqua_web_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const order = await instance.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt,
      notes: {
        source: 'Web Direct Checkout',
        amount_inr: amount
      }
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Aqua Ventures Coorg — Secure Checkout</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'DM Sans', sans-serif;
      background-color: #f4f1ea;
      color: #2a2b2a;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
    }
    .card {
      background: #ffffff;
      border: 1px solid rgba(42, 43, 42, 0.08);
      border-radius: 4px;
      padding: 48px 36px;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 24px 48px -12px rgba(27, 59, 43, 0.12);
      text-align: center;
    }
    .badge {
      display: inline-block;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      color: #9b4922;
      font-weight: 700;
      margin-bottom: 12px;
    }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      color: #1b3b2b;
      font-size: 32px;
      font-weight: 600;
      margin: 0 0 8px;
    }
    .subtext {
      color: #666;
      font-size: 13px;
      margin: 0 0 24px;
      font-weight: 300;
    }
    .amount-box {
      background: #fbf9f5;
      border: 1px solid rgba(27, 59, 43, 0.08);
      border-radius: 4px;
      padding: 20px;
      margin-bottom: 28px;
    }
    .amount-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #888;
      margin-bottom: 4px;
    }
    .amount-val {
      font-family: 'Cormorant Garamond', serif;
      font-size: 42px;
      font-weight: 600;
      color: #1b3b2b;
      line-height: 1;
    }
    .btn {
      display: block;
      width: 100%;
      background: #1b3b2b;
      color: #f4f1ea;
      padding: 18px;
      border: none;
      border-radius: 2px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #9b4922;
    }
    .whatsapp-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      background: #25D366;
      color: #000000;
      padding: 16px;
      border: none;
      border-radius: 2px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      margin-top: 14px;
      transition: opacity 0.2s;
    }
    .whatsapp-btn:hover {
      opacity: 0.9;
    }
    .back {
      margin-top: 20px;
      display: inline-block;
      font-size: 12px;
      color: #777;
      text-decoration: none;
      letter-spacing: 0.05em;
    }
    .back:hover {
      color: #1b3b2b;
      text-decoration: underline;
    }
    .test-mode {
      margin-top: 24px;
      font-size: 11px;
      color: #9b4922;
      background: rgba(155, 73, 34, 0.08);
      padding: 8px 12px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <div class="card" id="main-card">
    <div class="badge">Aqua Ventures · Coorg</div>
    <h1>Complete Checkout</h1>
    <p class="subtext">Just Meen Seafood, Artisan Preserves & Farm Tours</p>
    
    <div class="amount-box">
      <div class="amount-label">Payable Amount</div>
      <div class="amount-val">₹${amount.toLocaleString('en-IN')}</div>
    </div>

    <button id="pay-btn" class="btn">Proceed to Razorpay</button>
    <a href="/" class="back">← Return to Store</a>

    <div class="test-mode">
      ⚡ Razorpay Secure Checkout
    </div>
  </div>

  <script>
    var options = {
      key: "${KEY_ID}",
      amount: ${order.amount},
      currency: "${order.currency}",
      name: "Aqua Ventures Coorg",
      description: "Order #${order.id}",
      order_id: "${order.id}",
      handler: function (response) {
        var fd = new FormData();
        fd.append('payment_id', response.razorpay_payment_id);
        fd.append('order_id', response.razorpay_order_id);
        fd.append('amount_inr', '₹${amount.toLocaleString('en-IN')}');
        fd.append('_captcha', 'false');
        fd.append('_template', 'table');
        fd.append('_subject', '🚨 NEW PAID ORDER / BOOKING: ₹${amount} (' + response.razorpay_payment_id + ')');
        
        try {
          fetch('https://formsubmit.co/ajax/aquaventures.coorg@gmail.com', {
            method: 'POST',
            body: fd,
            headers: { 'Accept': 'application/json' }
          });
          
          fetch('/api/order-notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: ${amount}
            })
          });
        } catch(e) {}

        var waText = encodeURIComponent('Namaskara Shyam! I have completed payment for my order from Aqua Ventures.\\nAmount: ₹${amount.toLocaleString('en-IN')}\\nRazorpay Payment ID: ' + response.razorpay_payment_id + '\\nOrder ID: ' + response.razorpay_order_id + '\\nPlease confirm dispatch/booking.');
        var waUrl = 'https://wa.me/918123288564?text=' + waText;

        document.getElementById('main-card').innerHTML = '<div class=\"badge\" style=\"color:#1b3b2b\">Payment Verified</div>' +
          '<h1 style=\"margin-top:12px;\">Namaskara!</h1>' +
          '<p style=\"color:#555;font-size:14px;line-height:1.6;margin:12px 0 20px;\">Your payment of <strong>₹${amount.toLocaleString('en-IN')}</strong> has been confirmed.<br>' +
          'Razorpay Payment ID: <br><code style=\"background:#f4f1ea;padding:4px 8px;font-size:12px;color:#1b3b2b;border-radius:4px;display:inline-block;margin-top:6px;\">' + response.razorpay_payment_id + '</code><br><br>' +
          'An automated dispatch notification has been emailed to <strong>aquaventures.coorg@gmail.com</strong>.</p>' +
          '<a href=\"' + waUrl + '\" target=\"_blank\" class=\"whatsapp-btn\"><span>Send Receipt to Shyam on WhatsApp</span></a>' +
          '<a href=\"/\" class=\"btn\" style=\"margin-top:12px;text-decoration:none;display:inline-block;\">Return to Home</a>';
      },
      prefill: {
        name: "Valued Customer",
        email: "aquaventures.coorg@gmail.com",
        contact: "9876543210"
      },
      notes: {
        address: "Guyya Village, Siddapur, Coorg"
      },
      theme: {
        color: "#1b3b2b"
      }
    };

    var rzp1 = new Razorpay(options);
    document.getElementById('pay-btn').onclick = function(e){
      rzp1.open();
      e.preventDefault();
    };

    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        try { rzp1.open(); } catch(err) {}
      }, 600);
    });
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } catch (err: any) {
    console.error('Razorpay GET checkout error:', err);
    return new NextResponse(
      `<html><body style="font-family:sans-serif;padding:40px;background:#f4f1ea;color:#1b3b2b;"><h2>Payment Initialization Failed</h2><p>${err.message || 'Razorpay order error'}</p><a href="/">Back to store</a></body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!KEY_ID || !KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay credentials not configured in environment' },
        { status: 500 }
      );
    }

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
