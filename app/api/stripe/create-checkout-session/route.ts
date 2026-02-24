import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

// Server side only — uses STRIPE_SECRET_KEY to avoid exposing secrets; returns sessionId for client redirect.
export async function POST(request: Request) {
  const { amount, description, currency = 'usd', metadata = {} } = await request.json();
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout?canceled=true`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: amount,
          product_data: { name: description }
        }
      }
    ],
    metadata,
    payment_intent_data: {
      automatic_payment_methods: { enabled: true }
    }
  });

  return NextResponse.json({ sessionId: session.id });
}
