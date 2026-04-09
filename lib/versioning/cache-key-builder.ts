import { EXPLANATION_PROMPT_VERSION, EXPLANATION_MODEL } from "./version-config";

export function buildExplanationCacheKey(countryIso3: string, dataHash: string): string {
  return `${countryIso3}:${dataHash}:${EXPLANATION_PROMPT_VERSION}:${EXPLANATION_MODEL}`;
}