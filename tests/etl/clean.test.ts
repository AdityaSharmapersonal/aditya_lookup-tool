import { describe, it, expect } from "vitest";
import { cleanCountry } from "../../etl/clean.js";

describe("cleanCountry", () => {
  it("produces clean country objects with name, capital, population, region and flag fields", () => {
    const rawCountry = {
      name: { common: "United States", official: "United States of America" },
      capital: ["Washington, D.C."],
      population: 331900000,
      region: "Americas",
      cca2: "US"
    };

    const cleaned = cleanCountry(rawCountry);

    expect(cleaned).toHaveProperty("name");
    expect(cleaned).toHaveProperty("capital");
    expect(cleaned).toHaveProperty("population");
    expect(cleaned).toHaveProperty("region");
    expect(cleaned).toHaveProperty("flag");

    expect(cleaned.name).toBe("United States");
    expect(cleaned.capital).toBe("Washington, D.C.");
    expect(cleaned.population).toBe(331900000);
    expect(cleaned.region).toBe("Americas");
    expect(cleaned.flag).toBe("🇺🇸");
  });

  it("handles missing or invalid data gracefully", () => {
    const rawCountry = {
      name: {},
      capital: null,
      population: "not a number",
      region: undefined,
      cca2: "X"  // invalid length
    };

    const cleaned = cleanCountry(rawCountry);

    expect(cleaned.name).toBeNull();
    expect(cleaned.capital).toBeNull();
    expect(cleaned.population).toBeNull();
    expect(cleaned.region).toBeNull();
    expect(cleaned.flag).toBeNull();
  });
});