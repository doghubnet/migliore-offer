// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks: any[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  try {
    const buf = await buffer(req.body as unknown as Readable);
    const sig = req.headers.get("stripe-signature") || "";

    // Using `any` for event to avoid tight typing issues in CI
    let event: any;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed.", err?.message || err);
      return new NextResponse("Webhook Error: signature verification failed", { status: 400 });
    }

    // Handle relevant events
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Webhook: checkout.session.completed", session.id);
        // TODO: fulfill order, generate download token, send email, etc.
        break;
      }
      case "payment_intent.succeeded": {
        const pi = event.data.object;
        console.log("Webhook: payment_intent.succeeded", pi.id);
        break;
      }
      default:
        console.log("Unhandled stripe event type:", event.type);
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return new NextResponse(JSON.stringify({ error: err?.message || "Server error" }), { status: 500 });
  }
}
