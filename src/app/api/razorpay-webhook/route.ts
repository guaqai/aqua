import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET || "";

    // Verify webhook signature if secret configured
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.warn("Razorpay webhook signature mismatch");
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    console.log("Razorpay Webhook Event: " + event);

    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;

      const paymentId = paymentEntity?.id || "N/A";
      const orderId = paymentEntity?.order_id || orderEntity?.id || "N/A";
      const amountPaise = paymentEntity?.amount || orderEntity?.amount || 0;
      const amountInr = amountPaise / 100;
      const notes = paymentEntity?.notes || orderEntity?.notes || {};
      const customerEmail = paymentEntity?.email || "aquaventures.coorg@gmail.com";
      const customerContact = paymentEntity?.contact || notes?.customer_phone || "N/A";
      const customerName = notes?.customer_name || "Customer";
      const deliveryAddress = notes?.delivery_address || "Coorg / Delivery Address in WhatsApp";
      const summaryText = notes?.order_summary || "Order from website";

      // 1. Log to local data/orders.json
      const logDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      const logFile = path.join(logDir, "orders.json");
      let existingOrders: any[] = [];
      if (fs.existsSync(logFile)) {
        try {
          existingOrders = JSON.parse(fs.readFileSync(logFile, "utf8"));
        } catch (e) {
          existingOrders = [];
        }
      }

      const isDuplicate = existingOrders.some((o: any) => o.paymentId === paymentId);
      if (!isDuplicate) {
        const newRecord = {
          timestamp: new Date().toISOString(),
          source: "Razorpay Server Webhook",
          event,
          paymentId,
          orderId,
          amount: amountInr,
          customer: {
            name: customerName,
            phone: customerContact,
            email: customerEmail,
            address: deliveryAddress
          },
          summary: summaryText,
          notes
        };
        existingOrders.push(newRecord);
        fs.writeFileSync(logFile, JSON.stringify(existingOrders, null, 2), "utf8");

        // 2. Alert Fastify HITL backend
        try {
          await fetch("http://192.168.1.200:4050/api/lead-alert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              source: "Razorpay Server Webhook",
              customerName,
              customerPhone: customerContact,
              amount: amountInr,
              paymentId,
              details: summaryText + " | Address: " + deliveryAddress
            }),
            signal: AbortSignal.timeout(3000)
          });
        } catch (backendErr) {
          console.warn("Fastify alert ping timed out or offline:", backendErr);
        }

        // 3. Dispatch FormSubmit.co email notification to aquaventures.coorg@gmail.com
        try {
          const fd = new FormData();
          fd.append("event", event);
          fd.append("payment_id", paymentId);
          fd.append("order_id", orderId);
          fd.append("amount", "₹" + amountInr.toLocaleString("en-IN"));
          fd.append("customer_name", customerName);
          fd.append("customer_phone", customerContact);
          fd.append("customer_email", customerEmail);
          fd.append("delivery_address", deliveryAddress);
          fd.append("order_summary", summaryText);
          fd.append("_captcha", "false");
          fd.append("_template", "table");
          fd.append("_subject", "VERIFIED ORDER (Webhook): ₹" + amountInr + " (" + paymentId + ") - " + customerName);

          await fetch("https://formsubmit.co/ajax/aquaventures.coorg@gmail.com", {
            method: "POST",
            body: fd,
            headers: { Accept: "application/json" }
          });
        } catch (emailErr) {
          console.warn("FormSubmit email ping failed:", emailErr);
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("Razorpay Webhook Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
