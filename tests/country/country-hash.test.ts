import { describe, expect, it } from "vitest";

import { buildCountryHash } from "@/lib/country/country-hash";
import { normalizeCountry } from "@/lib/country/normalize-country";

describe("buildCountryHash", () => {
  it("changes when canonical country data changes", () => {
    const base = normalizeCountry({
      name: { common: "Japan", official: "Japan" },
      cca2: "JP",
      cca3: "JPN"
    });

    const changed = { ...base, capital: "Tokyo" };

    expect(buildCountryHash(base)).not.toBe(buildCountryHash(changed));
  });
});
