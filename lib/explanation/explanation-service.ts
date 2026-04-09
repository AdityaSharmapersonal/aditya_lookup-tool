import type { Country } from "@/lib/country/types";
import { buildCountryHash } from "@/lib/country/country-hash";
import { prisma } from "@/lib/db/prisma";
import { generateExplanation } from "@/lib/explanation/generate-explanation";
import { buildMockExplanation } from "@/lib/explanation/mock-explanation";
import { EXPLANATION_MODEL, EXPLANATION_PROMPT_VERSION } from "@/lib/explanation/prompt";
import type { ExplanationResponse } from "@/lib/explanation/types";
import { validateExplanationPayload } from "@/lib/explanation/validate-explanation";

export async function getExplanationForCountry(country: Country): Promise<ExplanationResponse> {
  const canonicalDataHash = buildCountryHash(country);
  const cacheKey = `${country.iso3}:${canonicalDataHash}:${EXPLANATION_PROMPT_VERSION}:${EXPLANATION_MODEL}`;

  const existing = await prisma.countryExplanation.findUnique({
    where: { cacheKey }
  });

  if (existing && existing.validationStatus === "valid") {
    return {
      status: "ready",
      explanation: validateExplanationPayload(existing.payloadJson, country),
      cacheKey
    };
  }

  const fallbackExplanation = validateExplanationPayload(buildMockExplanation(country), country);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const explanation = validateExplanationPayload(await generateExplanation(country), country);

      await prisma.countryExplanation.upsert({
        where: { cacheKey },
        create: {
          cacheKey,
          iso3: country.iso3,
          canonicalDataHash,
          promptVersion: EXPLANATION_PROMPT_VERSION,
          modelVersion: EXPLANATION_MODEL,
          payloadJson: explanation,
          validationStatus: "valid"
        },
        update: {
          payloadJson: explanation,
          validationStatus: "valid"
        }
      });

      return {
        status: "ready",
        explanation,
        cacheKey
      };
    } catch (error) {
      if (attempt === 1) {
        await prisma.countryExplanation.upsert({
          where: { cacheKey },
          create: {
            cacheKey,
            iso3: country.iso3,
            canonicalDataHash,
            promptVersion: EXPLANATION_PROMPT_VERSION,
            modelVersion: EXPLANATION_MODEL,
            payloadJson: { error: String(error) },
            validationStatus: "failed"
          },
          update: {
            payloadJson: { error: String(error) },
            validationStatus: "failed"
          }
        });

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
