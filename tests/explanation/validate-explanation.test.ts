import { describe, expect, it } from "vitest";

import { normalizeCountry } from "@/lib/country/normalize-country";
import { validateExplanationPayload } from "@/lib/explanation/validate-explanation";

describe("validateExplanationPayload", () => {
  const country = normalizeCountry({
    name: { common: "Japan", official: "Japan" },
    cca2: "JP",
    cca3: "JPN",
    capital: ["Tokyo"],
    region: "Asia",
    population: 123000000,
    timezones: ["UTC+09:00"]
  });

  it("accepts grounded explanation payloads", () => {
    const result = validateExplanationPayload(
      {
        summary: {
          text: "Japan is an Asian country with Tokyo as its capital and a population of 123,000,000.",
          fieldsUsed: ["name", "region", "capital", "population"]
        },
        insights: [
          { text: "It is located in Asia.", fieldsUsed: ["region"] },
          { text: "Its capital is Tokyo.", fieldsUsed: ["capital"] },
          { text: "Its population is 123,000,000.", fieldsUsed: ["population"] }
        ]
      },
      country
    );

    expect(result.insights).toHaveLength(3);
  });

  it("rejects citations to empty fields", () => {
    expect(() =>
      validateExplanationPayload(
        {
          summary: {
            text: "Japan has multiple languages.",
            fieldsUsed: ["languages"]
          },
          insights: [
            { text: "It is located in Asia.", fieldsUsed: ["region"] },
            { text: "Its capital is Tokyo.", fieldsUsed: ["capital"] },
            { text: "It has multiple languages.", fieldsUsed: ["languages"] }
          ]
        },
        country
      )
    ).toThrow('Explanation cited empty field "languages".');
  });
});
