import { prisma } from "@/lib/db/prisma";

export async function getCachedExplanation(cacheKey: string): Promise<any | null> {
  const existing = await prisma.countryExplanation.findUnique({
    where: { cacheKey }
  });

  if (existing && existing.validationStatus === "valid") {
    return existing.payloadJson;
  }

  return null;
}

export async function saveExplanationToCache(
  cacheKey: string,
  iso3: string,
  canonicalDataHash: string,
  promptVersion: string,
  modelVersion: string,
  payloadJson: any,
  validationStatus: 'valid' | 'invalid' | 'failed'
): Promise<void> {
  await prisma.countryExplanation.upsert({
    where: { cacheKey },
    update: {
      payloadJson,
      validationStatus
    },
    create: {
      cacheKey,
      iso3,
      canonicalDataHash,
      promptVersion,
      modelVersion,
      payloadJson,
      validationStatus
    }
  });
}