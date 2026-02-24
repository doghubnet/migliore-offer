'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function BuyButton({ amount, description, currency = 'usd', metadata }: { amount: number; description: string; currency?: string; metadata?: Record<string, string> }) {
  const handleCheckout = async () => {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, description, currency, metadata })
    });
    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
  };

  return <button onClick={handleCheckout} className="btn-hover w-full rounded-full bg-brand-500 px-4 py-2 text-white md:w-auto">Pay with Checkout</button>;
}
