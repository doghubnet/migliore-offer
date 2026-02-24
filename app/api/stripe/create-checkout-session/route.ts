// app/api/stripe/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";

/**
 * Safe Checkout Session creation route.
 * We deliberately avoid strict Stripe TypeScript currency enums to prevent type mismatches
 * across stripe-node versions in CI builds. Use runtime validation instead.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const amount = Number(body.amount);
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      return new NextResponse(JSON.stringify({ error: "Invalid amount" }), { status: 400 });
    }

    // Accept currency as a string (e.g. "usd"). We do basic runtime normalization to lowercase.
    const currency = (body.currency || "usd").toString().toLowerCase();

    const siteUrl = process.env.SITE_URL || "http://localhost:3000";

    // Build params as a plain object (typed as any to avoid strict Stripe type mismatches)
    const params: any = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: body.description || "Digital product",
              // optional: images: body.image ? [body.image] : undefined
            },
            unit_amount: Math.round(amount),
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
