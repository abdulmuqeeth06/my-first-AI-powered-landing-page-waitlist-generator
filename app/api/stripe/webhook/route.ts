import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook not configured" },
      { status: 400 },
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2024-11-20.acacia",
    });
    const event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      STRIPE_WEBHOOK_SECRET,
    );

    // In a real app, persist subscription/payment status to Supabase here.
    // We return 200 to acknowledge receipt.
    return NextResponse.json({ received: true, type: event.type });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Webhook error" },
      { status: 400 },
    );
  }
}

