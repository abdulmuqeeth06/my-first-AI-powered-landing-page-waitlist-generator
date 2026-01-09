import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const schema = z.object({
  priceId: z.string().optional(),
  mode: z.enum(["payment", "subscription"]).default("payment"),
  pageId: z.string().min(1),
  successPath: z.string().optional(),
  cancelPath: z.string().optional(),
});

export async function POST(req: Request) {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { priceId, mode, pageId, successPath, cancelPath } = parsed.data;

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: priceId
        ? [{ price: priceId, quantity: 1 }]
        : [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "LaunchFast landing page",
                  metadata: { pageId },
                },
                unit_amount: 2900,
              },
              quantity: 1,
            },
          ],
      success_url: `${APP_URL}${successPath || "/dashboard"}?checkout=success`,
      cancel_url: `${APP_URL}${cancelPath || "/dashboard"}?checkout=cancel`,
      metadata: { pageId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Stripe error" },
      { status: 500 },
    );
  }
}

