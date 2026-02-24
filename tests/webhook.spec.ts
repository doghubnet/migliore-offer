import { stripe } from '@/lib/stripe';

describe('webhook signature handling', () => {
  it('exposes constructEvent function', () => {
    expect(typeof stripe.webhooks.constructEvent).toBe('function');
  });
});
