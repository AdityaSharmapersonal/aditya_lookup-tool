import { describe, expect, it } from "vitest";

import { normalizeCountry } from "@/lib/country/normalize-country";

describe("normalizeCountry", () => {
  it("maps public API payloads into the canonical schema", () => {
    const country = normalizeCountry({
      name: { common: "Canada", official: "Canada" },
      cca2: "CA",
      cca3: "CAN",
      capital: ["Ottawa"],
      region: "Americas",
      subregion: "North America",
      population: 40000000,
      area: 9984670,
      languages: { eng: "English", fra: "French" },
      currencies: { CAD: { name: "Canadian dollar" } },
      timezones: ["UTC-08:00", "UTC-05:00"],
      flags: { svg: "https://flagcdn.com/ca.svg" }
    });

    expect(country).toEqual({
      name: "Canada",
      officialName: "Canada",
      iso2: "CA",
      iso3: "CAN",
      capital: "Ottawa",
      region: "Americas",
      subregion: "North America",
      population: 40000000,
      area: 9984670,
      languages: ["English", "French"],
      currencies: ["Canadian dollar"],
      timezones: ["UTC-08:00", "UTC-05:00"],
      flagUrl: "https://flagcdn.com/ca.svg"
    });
  });
});
