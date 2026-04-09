import type { Country } from "@/lib/country/types";

export const EXPLANATION_PROMPT_VERSION = "country-explainer-v1";
export const EXPLANATION_MODEL = "gpt-5-mini";

export function buildExplanationMessages(country: Country) {
  return [
    {
      role: "system" as const,
      content:
        "You explain countries using only the provided JSON. Return valid structured output. Use only supplied facts. Do not add external information. Use commas in large numbers. Use country names exactly as provided. Omit unsupported claims."
    },
    {
      role: "user" as const,
      content: `Create one short summary paragraph and 3 to 5 bullet insights for this country JSON: ${JSON.stringify(country)}`
    }
  ];
}
