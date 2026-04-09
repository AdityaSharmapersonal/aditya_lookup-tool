import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/country/search-countries", () => ({
  searchCountries: vi.fn()
}));

import { GET } from "@/app/api/search/route";
import { searchCountries } from "@/lib/country/search-countries";

describe("GET /api/search", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty results for empty queries", async () => {
    const response = await GET(new Request("http://localhost/api/search"));
    const data = await response.json();

    expect(data).toEqual({ results: [] });
    expect(searchCountries).not.toHaveBeenCalled();
  });

  it("returns normalized search results", async () => {
    vi.mocked(searchCountries).mockResolvedValue([
      {
        name: "Canada",
        officialName: "Canada",
        region: "Americas",
        subregion: "North America",
        iso3: "CAN",
        flagUrl: "https://flagcdn.com/ca.svg"
      }
    ]);

    const response = await GET(new Request("http://localhost/api/search?q=canada"));
    const data = await response.json();

    expect(searchCountries).toHaveBeenCalledWith("canada");
    expect(data.results).toHaveLength(1);
  });
});
