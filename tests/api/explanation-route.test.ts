import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/country/get-country-by-iso3", () => ({
  getCountryByIso3: vi.fn()
}));

vi.mock("@/lib/explanation/explanation-service", () => ({
  getExplanationForCountry: vi.fn()
}));

import { GET } from "@/app/api/country/[iso3]/explanation/route";
import { getCountryByIso3 } from "@/lib/country/get-country-by-iso3";
import { getExplanationForCountry } from "@/lib/explanation/explanation-service";

describe("GET /api/country/[iso3]/explanation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns explanation payloads for a country", async () => {
    vi.mocked(getCountryByIso3).mockResolvedValue({
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
      timezones: ["UTC-05:00"],
      flagUrl: "https://flagcdn.com/ca.svg"
    });

    vi.mocked(getExplanationForCountry).mockResolvedValue({
      status: "ready",
      cacheKey: "cache",
      explanation: {
        summary: {
          text: "Canada is in North America.",
          fieldsUsed: ["name", "subregion"]
        },
        insights: [
          { text: "Its capital is Ottawa.", fieldsUsed: ["capital"] },
          { text: "It is in the Americas.", fieldsUsed: ["region"] },
          { text: "Its population is 40,000,000.", fieldsUsed: ["population"] }
        ]
      }
    });

    const response = await GET(new Request("http://localhost/api/country/CAN/explanation"), {
      params: Promise.resolve({ iso3: "CAN" })
    });
    const data = await response.json();

    expect(getCountryByIso3).toHaveBeenCalledWith("CAN");
    expect(getExplanationForCountry).toHaveBeenCalled();
    expect(data.status).toBe("ready");
  });
});
