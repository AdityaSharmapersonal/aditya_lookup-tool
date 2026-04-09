import { fetchCountriesByName, fetchCountryByCode } from "@/lib/country/country-api-client";
import { normalizeCountry, toCountrySearchResult } from "@/lib/country/normalize-country";
import type { CountrySearchResult } from "@/lib/country/types";

export async function searchCountries(query: string): Promise<CountrySearchResult[]> {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return [];
  }

  const candidates: CountrySearchResult[] = [];
  const seen = new Set<string>();
  const codeCandidate = normalizedQuery.toUpperCase();

  if (codeCandidate.length === 2 || codeCandidate.length === 3) {
    try {
      const exactMatches = await fetchCountryByCode(codeCandidate);
      for (const match of exactMatches) {
        const country = normalizeCountry(match as never);
        if (!seen.has(country.iso3)) {
          seen.add(country.iso3);
          candidates.push(toCountrySearchResult(country));
        }
      }
    } catch {
      // Ignore code lookup failures and fall back to name search.
    }
  }

  try {
    const matches = await fetchCountriesByName(normalizedQuery);

    for (const match of matches) {
      const country = normalizeCountry(match as never);
      if (!seen.has(country.iso3)) {
        seen.add(country.iso3);
        candidates.push(toCountrySearchResult(country));
      }
    }
  } catch {
    return candidates;
  }

  return candidates.sort((left, right) => left.name.localeCompare(right.name));
}
