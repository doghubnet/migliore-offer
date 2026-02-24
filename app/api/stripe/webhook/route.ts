import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createDownloadToken } from '@/lib/downloads';

const fulfilledOrders = new Map<string, string>();

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing webhook signature config' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const productId = session.metadata?.productId || 'offer-basic';
    const token = createDownloadToken({ productId, sessionId: session.id, orderId: session.payment_intent as string });
    fulfilledOrders.set(session.id, token);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as any;
    const productId = intent.metadata?.productId || 'offer-basic';
    const token = createDownloadToken({ productId, orderId: intent.id });
    fulfilledOrders.set(intent.id, token);
  }

  return NextResponse.json({ received: true });
}

export const dynamic = 'force-dynamic';
