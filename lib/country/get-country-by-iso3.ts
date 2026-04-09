import { notFound } from "next/navigation";

import { fetchCountryByCode } from "@/lib/country/country-api-client";
import { normalizeCountry } from "@/lib/country/normalize-country";

export async function getCountryByIso3(iso3: string) {
  try {
    const matches = await fetchCountryByCode(iso3.toUpperCase());
    const payload = matches[0];

    if (!payload) {
      notFound();
    }

    return normalizeCountry(payload as never);
  } catch {
    notFound();
  }
}
