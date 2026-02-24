// app/api/stripe/create-payment-intent/route.ts
import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";

/**
 * Create a PaymentIntent for embedded Payment Element usage.
 * Build params as `any` to avoid strict typing differences across stripe-node versions.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const amount = Math.round(Number(body.amount || 0));
    if (!amount || amount <= 0) {
      return new NextResponse(JSON.stringify({ error: "Invalid amount" }), { status: 400 });
    }

    const currency = (body.currency || "usd").toString().toLowerCase();
    const params: any = {
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: body.metadata || {},
      description: body.description || "Digital purchase",
    };

    const pi = await stripe.paymentIntents.create(params);
    return NextResponse.json({ clientSecret: pi.client_secret });
  } catch (err: any) {
    console.error("create-payment-intent error:", err);
    return new NextResponse(JSON.stringify({ error: err?.message || "Server error" }), { status: 500 });
  }
}
