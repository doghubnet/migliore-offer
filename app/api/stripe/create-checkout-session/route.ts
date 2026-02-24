// app/api/stripe/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import Stripe from "stripe";

/**
 * Create a Checkout Session (server-side).
 * Uses Stripe.Checkout.SessionCreateParams to satisfy TypeScript types.
 * IMPORTANT: do NOT expose STRIPE_SECRET_KEY to client. This route runs server-side.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const amount = Number(body.amount);
    if (!amount || amount <= 0) {
      return new NextResponse(JSON.stringify({ error: "Invalid amount" }), { status: 400 });
    }

    const currency = (body.currency || "usd") as Stripe.Currency;
    const siteUrl = process.env.SITE_URL || "http://localhost:3000";

    // Build params using Stripe types
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: body.description || "Digital product",
              // optional: add images: [body.image] if you pass one
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],

      allow_promotion_codes: true,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout?canceled=true`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error("create-checkout-session error:", err);
    return new NextResponse(JSON.stringify({ error: err?.message || "Server error" }), { status: 500 });
  }
}
