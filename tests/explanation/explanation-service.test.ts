import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    countryExplanation: {
      findUnique: vi.fn(),
      upsert: vi.fn()
    }
  }
}));

vi.mock("@/lib/explanation/generate-explanation", () => ({
  generateExplanation: vi.fn()
}));

import { prisma } from "@/lib/db/prisma";
import { normalizeCountry } from "@/lib/country/normalize-country";
import { getExplanationForCountry } from "@/lib/explanation/explanation-service";
import { generateExplanation } from "@/lib/explanation/generate-explanation";

describe("getExplanationForCountry", () => {
  const country = normalizeCountry({
    name: { common: "Japan", official: "Japan" },
    cca2: "JP",
    cca3: "JPN",
    capital: ["Tokyo"],
    region: "Asia",
    population: 123000000
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a cached valid explanation", async () => {
    vi.mocked(prisma.countryExplanation.findUnique).mockResolvedValue({
      cacheKey: "cached",
      iso3: "JPN",
      canonicalDataHash: "hash",
      promptVersion: "country-explainer-v1",
      modelVersion: "gpt-5-mini",
      payloadJson: {
        summary: {
          text: "Japan is in Asia with Tokyo as its capital.",
          fieldsUsed: ["name", "region", "capital"]
        },
        insights: [
          { text: "It is in Asia.", fieldsUsed: ["region"] },
          { text: "Its capital is Tokyo.", fieldsUsed: ["capital"] },
          { text: "Its population is 123,000,000.", fieldsUsed: ["population"] }
        ]
      },
      validationStatus: "valid",
      createdAt: new Date(),
      id: "1"
    });

    const result = await getExplanationForCountry(country);

    expect(result.status).toBe("ready");
    expect(generateExplanation).not.toHaveBeenCalled();
  });

  it("returns unavailable after two failed generations", async () => {
    vi.mocked(prisma.countryExplanation.findUnique).mockResolvedValue(null);
    vi.mocked(generateExplanation).mockRejectedValue(new Error("generation failed"));

    const result = await getExplanationForCountry(country);

    expect(result.status).toBe("ready");
    if (result.status === "ready") {
      expect(result.explanation.summary.text).toContain("Japan");
      expect(result.explanation.insights.length).toBeGreaterThanOrEqual(3);
    }
    expect(prisma.countryExplanation.upsert).toHaveBeenCalledTimes(1);
  });
});
