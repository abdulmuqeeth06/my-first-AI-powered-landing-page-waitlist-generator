import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const schema = z.object({
  productName: z.string().min(2),
  description: z.string().min(10),
  audience: z.string().min(2),
  pricing: z.enum(["free", "one-time", "subscription", "undecided"]),
});

export async function POST(req: Request) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI key is not configured" },
      { status: 500 },
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { productName, description, audience, pricing } = parsed.data;

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const prompt = `
You are a concise SaaS landing page copywriter. Generate JSON only.

Product name: ${productName}
Product description: ${description}
Target audience: ${audience}
Pricing idea: ${pricing}

Return JSON with:
- headline
- subheadline
- benefits: 3 to 5 short bullet strings
- cta: strong CTA text
- faq: 0 to 2 objects with { question, answer }

Tone: clear, modern, confident. No hype. No filler.
  `.trim();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You write modern SaaS landing copy." },
      { role: "user", content: prompt },
    ],
    temperature: 0.6,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    return NextResponse.json(
      { error: "No content from OpenAI" },
      { status: 500 },
    );
  }

  const clean = content.replace(/```json|```/g, "").trim();

  try {
    const data = JSON.parse(clean);
    return NextResponse.json({ copy: data });
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response" },
      { status: 500 },
    );
  }
}

