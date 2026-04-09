import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/country/country-api-client", () => ({
  fetchCountriesByName: vi.fn(),
  fetchCountryByCode: vi.fn()
}));

import {
  fetchCountriesByName,
  fetchCountryByCode
} from "@/lib/country/country-api-client";
import { searchCountries } from "@/lib/country/search-countries";

describe("searchCountries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("combines ISO and name matches without duplicates", async () => {
    vi.mocked(fetchCountryByCode).mockResolvedValue([
      {
        name: { common: "Canada", official: "Canada" },
        cca2: "CA",
        cca3: "CAN",
        flags: { svg: "https://flagcdn.com/ca.svg" }
      }
    ]);

    vi.mocked(fetchCountriesByName).mockResolvedValue([
      {
        name: { common: "Canada", official: "Canada" },
        cca2: "CA",
        cca3: "CAN",
        region: "Americas",
        subregion: "North America",
        flags: { svg: "https://flagcdn.com/ca.svg" }
      }
    ]);

    const results = await searchCountries("CA");

    expect(fetchCountryByCode).toHaveBeenCalledWith("CA");
    expect(fetchCountriesByName).toHaveBeenCalledWith("CA");
    expect(results).toHaveLength(1);
    expect(results[0]?.iso3).toBe("CAN");
  });

  it("returns name matches when code lookup fails", async () => {
    vi.mocked(fetchCountryByCode).mockRejectedValue(new Error("not found"));
    vi.mocked(fetchCountriesByName).mockResolvedValue([
      {
        name: { common: "Japan", official: "Japan" },
        cca2: "JP",
        cca3: "JPN",
        region: "Asia",
        flags: { svg: "https://flagcdn.com/jp.svg" }
      }
    ]);

    const results = await searchCountries("JP");

    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe("Japan");
  });

  it("correctly finds a country by name", async () => {
    vi.mocked(fetchCountryByCode).mockRejectedValue(new Error("not found"));
    vi.mocked(fetchCountriesByName).mockResolvedValue([
      {
        name: { common: "France", official: "French Republic" },
        cca2: "FR",
        cca3: "FRA",
        region: "Europe",
        flags: { svg: "https://flagcdn.com/fr.svg" }
      }
    ]);

    const results = await searchCountries("France");

    expect(fetchCountriesByName).toHaveBeenCalledWith("France");
    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe("France");
    expect(results[0]?.iso3).toBe("FRA");
  });
});
