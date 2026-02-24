// lib/stripe.ts
// Safe Stripe initializer for server-side usage.
// Avoid pinning apiVersion to prevent TypeScript literal mismatch with installed stripe types.

import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;
if (!secret) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment");
}

// Create Stripe instance without specifying apiVersion to avoid type mismatch errors during build.
export const stripe = new Stripe(secret);
export default stripe;
