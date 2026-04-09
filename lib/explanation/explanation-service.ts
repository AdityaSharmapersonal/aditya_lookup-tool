import type { Country } from "@/lib/country/types";
import { buildCountryHash } from "@/lib/country/country-hash";
import { generateExplanation } from "@/lib/explanation/generate-explanation";
import { buildMockExplanation } from "@/lib/explanation/mock-explanation";
import type { ExplanationResponse } from "@/lib/explanation/types";
import { validateExplanationPayload } from "@/lib/explanation/validate-explanation";
import { buildExplanationCacheKey } from "@/lib/versioning/cache-key-builder";
import { getCachedExplanation, saveExplanationToCache } from "@/lib/explanation/cache-manager";
import { EXPLANATION_PROMPT_VERSION, EXPLANATION_MODEL } from "@/lib/versioning/version-config";

export async function getExplanationForCountry(country: Country): Promise<ExplanationResponse> {
  const canonicalDataHash = buildCountryHash(country);
  const cacheKey = buildExplanationCacheKey(country.iso3, canonicalDataHash);

  const cachedPayload = await getCachedExplanation(cacheKey);
  if (cachedPayload) {
    return {
      status: "ready",
      explanation: validateExplanationPayload(cachedPayload, country),
      cacheKey
    };
  }

  const fallbackExplanation = validateExplanationPayload(buildMockExplanation(country), country);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const explanation = validateExplanationPayload(await generateExplanation(country), country);

      await saveExplanationToCache(
        cacheKey,
        country.iso3,
        canonicalDataHash,
        EXPLANATION_PROMPT_VERSION,
        EXPLANATION_MODEL,
        explanation,
        "valid"
      );

      return {
        status: "ready",
        explanation,
        cacheKey
      };
    } catch (error) {
      if (attempt === 1) {
        await saveExplanationToCache(
          cacheKey,
          country.iso3,
          canonicalDataHash,
          EXPLANATION_PROMPT_VERSION,
          EXPLANATION_MODEL,
          { error: String(error) },
          "failed"
        );

        return {
          status: "ready",
          explanation: fallbackExplanation,
          cacheKey
        };
      }
    }
  }

  return {
    status: "ready",
    explanation: fallbackExplanation,
    cacheKey
  };
}
