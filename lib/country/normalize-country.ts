import { countrySchema } from "@/lib/country/schema";
import type { Country, CountrySearchResult } from "@/lib/country/types";

type RestCountry = {
  name?: {
    common?: string;
    official?: string;
  };
  cca2?: string;
  cca3?: string;
  capital?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name?: string }>;
  timezones?: string[];
  flags?: {
    svg?: string;
    png?: string;
  };
};

export function normalizeCountry(payload: RestCountry): Country {
  const normalized: Country = {
    name: payload.name?.common?.trim() || "Unknown Country",
    officialName: payload.name?.official?.trim() || null,
    iso2: payload.cca2?.trim() || null,
    iso3: payload.cca3?.trim() || "UNK",
    capital: payload.capital?.[0]?.trim() || null,
    region: payload.region?.trim() || null,
    subregion: payload.subregion?.trim() || null,
    population: typeof payload.population === "number" ? payload.population : null,
    area: typeof payload.area === "number" ? payload.area : null,
    languages: Object.values(payload.languages ?? {}).filter(Boolean),
    currencies: Object.values(payload.currencies ?? {})
      .map((currency) => currency.name?.trim())
      .filter((currency): currency is string => Boolean(currency)),
    timezones: (payload.timezones ?? []).map((timezone) => timezone.trim()).filter(Boolean),
    flagUrl: payload.flags?.svg || payload.flags?.png || null
  };

  return countrySchema.parse(normalized);
}

export function toCountrySearchResult(country: Country): CountrySearchResult {
  return {
    name: country.name,
    officialName: country.officialName,
    region: country.region,
    subregion: country.subregion,
    iso3: country.iso3,
    flagUrl: country.flagUrl ?? ""
  };
}
