// app/api/stripe/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";

/**
 * Create a Stripe Checkout Session (server-side).
 * Uses a runtime plain-object `params` (typed as `any`) to avoid TypeScript enum mismatches
 * across stripe-node versions in CI. This keeps runtime behavior correct while preventing build errors.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const amount = Number(body.amount);
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      return new NextResponse(JSON.stringify({ error: "Invalid amount" }), { status: 400 });
    }

    const currency = (body.currency || "usd").toString().toLowerCase();
    const siteUrl = process.env.SITE_URL || "http://localhost:3000";

    const params: any = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: body.description || "Digital product",
              // images: body.image ? [body.image] : undefined,
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
