'use client';

import { useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function InnerForm({ onSuccess }: { onSuccess?: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
      redirect: 'if_required'
    });

    if (result.error) {
      setStatus(result.error.message || 'Payment failed');
      return;
    }

    setStatus('Payment successful. Your download link will be emailed shortly.');
    onSuccess?.();
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <PaymentElement />
      <button className="btn-hover rounded-full bg-brand-500 px-4 py-2 text-white" type="submit">Buy (embedded)</button>
      <p aria-live="polite" className="text-sm text-slate-700">{status}</p>
    </form>
  );
}

export default function PaymentForm({ amount, currency = 'usd', description = 'Order', onSuccess }: { amount: number; currency?: string; description?: string; onSuccess?: () => void }) {
  const [clientSecret, setClientSecret] = useState<string>();
  const [loading, setLoading] = useState(false);

  const initPayment = async () => {
    setLoading(true);
    const response = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency, metadata: { description } })
    });
    const data = await response.json();
    setClientSecret(data.clientSecret);
    setLoading(false);
  };

  return (
    <div>
      {!clientSecret ? (
        <button onClick={initPayment} className="btn-hover rounded-full border px-4 py-2">{loading ? 'Preparing...' : 'Start embedded checkout'}</button>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <InnerForm onSuccess={onSuccess} />
        </Elements>
      )}
    </div>
  );
}
