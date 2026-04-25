import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS: Record<string, string> = {
  standard: process.env.STRIPE_STANDARD_PRICE_ID!,
  premium: process.env.STRIPE_PREMIUM_PRICE_ID!,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { tier, customerId, email } = req.body as {
    tier: 'standard' | 'premium';
    customerId?: string;
    email?: string;
  };

  const priceId = PRICE_IDS[tier];
  if (!priceId) {
    return res.status(400).json({ error: 'Invalid tier' });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer: customerId,
    customer_email: customerId ? undefined : email,
    success_url: `${process.env.APP_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.APP_URL}/membership`,
    subscription_data: {
      metadata: { tier },
    },
    allow_promotion_codes: true,
  });

  return res.status(200).json({ url: session.url });
}
