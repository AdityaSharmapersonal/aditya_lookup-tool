import type { Country } from "@/lib/country/types";
import { explanationSchema } from "@/lib/explanation/schema";
import type { Explanation } from "@/lib/explanation/types";
import { isEmptyValue } from "@/lib/utils/is-empty-value";

export function validateExplanationPayload(payload: unknown, country: Country): Explanation {
  const parsed = explanationSchema.parse(payload);

  assertFieldsUsed(parsed.summary.fieldsUsed, country);
  for (const insight of parsed.insights) {
    assertFieldsUsed(insight.fieldsUsed, country);
  }

  return parsed;
}

function assertFieldsUsed(fieldsUsed: string[], country: Country) {
  for (const field of fieldsUsed) {
    const value = country[field as keyof Country];
    if (isEmptyValue(value)) {
      throw new Error(`Explanation cited empty field "${field}".`);
    }
  }
}
