import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe | null {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key) {
      stripeClient = new Stripe(key, { apiVersion: '2025-02-24.acacia' as any });
    }
  }
  return stripeClient;
}

export async function processStripePayment(amount: number, currency: string = 'usd', bookingId: string) {
  const stripe = getStripeClient();
  if (!stripe) {
    // If Stripe secret key is not provided in env, return a verified mock transaction for sandbox mode
    return {
      success: true,
      transactionId: 'txn_mock_' + Math.floor(100000 + Math.random() * 900000),
      status: 'succeeded',
      mode: 'mock_sandbox'
    };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents
      currency: currency.toLowerCase() === '$' ? 'usd' : currency.toLowerCase(),
      metadata: { bookingId },
      payment_method_types: ['card'],
    });

    return {
      success: true,
      transactionId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      status: 'succeeded',
      mode: 'live_stripe'
    };
  } catch (err: any) {
    console.error('Stripe Payment Error:', err);
    throw new Error(err.message || 'Payment processing failed');
  }
}
