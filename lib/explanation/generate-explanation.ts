import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

import type { Country } from "@/lib/country/types";
import { EXPLANATION_MODEL, buildExplanationMessages } from "@/lib/explanation/prompt";
import { explanationSchema } from "@/lib/explanation/schema";
import type { Explanation } from "@/lib/explanation/types";

export async function generateExplanation(country: Country): Promise<Explanation> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.parse({
    model: EXPLANATION_MODEL,
    messages: buildExplanationMessages(country),
    response_format: zodResponseFormat(explanationSchema, "country_explanation")
  });

  const parsed = completion.choices[0]?.message.parsed;
  if (!parsed) {
    throw new Error("Model did not return a structured explanation.");
  }

  return parsed;
}
