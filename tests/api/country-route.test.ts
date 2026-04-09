import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/country/get-country-by-iso3", () => ({
  getCountryByIso3: vi.fn()
}));

import { GET } from "@/app/api/country/[iso3]/route";
import { getCountryByIso3 } from "@/lib/country/get-country-by-iso3";

describe("GET /api/country/[iso3]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns country data for the route param", async () => {
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

    const response = await GET(new Request("http://localhost/api/country/CAN"), {
      params: Promise.resolve({ iso3: "CAN" })
    });
    const data = await response.json();

    expect(getCountryByIso3).toHaveBeenCalledWith("CAN");
    expect(data.iso3).toBe("CAN");
  });
});
