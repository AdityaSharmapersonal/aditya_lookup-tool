import type { Country, CountryField } from "@/lib/country/types";
import type { Explanation } from "@/lib/explanation/types";

type ExplanationFact = {
  text: string;
  fieldsUsed: CountryField[];
};

export function buildMockExplanation(country: Country): Explanation {
  const summaryParts: ExplanationFact[] = [];

  summaryParts.push({
    text: `${country.name} is listed in the dataset`,
    fieldsUsed: ["name"]
  });

  if (country.subregion) {
    summaryParts.push({
      text: `within ${country.subregion}`,
      fieldsUsed: ["subregion"]
    });
  } else if (country.region) {
    summaryParts.push({
      text: `within ${country.region}`,
      fieldsUsed: ["region"]
    });
  }

  if (country.capital) {
    summaryParts.push({
      text: `with ${country.capital} as its capital`,
      fieldsUsed: ["capital"]
    });
  }

  if (country.population !== null) {
    summaryParts.push({
      text: `and a population of ${country.population.toLocaleString()}`,
      fieldsUsed: ["population"]
    });
  }

  return {
    summary: {
      text: `${summaryParts.map((part) => part.text).join(" ")}.`,
      fieldsUsed: [...new Set(summaryParts.flatMap((part) => part.fieldsUsed))]
    },
    insights: buildInsights(country)
  };
}

function buildInsights(country: Country): ExplanationFact[] {
  const insights: ExplanationFact[] = [];

  if (country.region) {
    insights.push({
      text: `${country.name} is grouped under the ${country.region} region.`,
      fieldsUsed: ["name", "region"]
    });
  }

  if (country.subregion) {
    insights.push({
      text: `Its subregion is listed as ${country.subregion}.`,
      fieldsUsed: ["subregion"]
    });
  }

  if (country.capital) {
    insights.push({
      text: `${country.capital} is the listed capital.`,
      fieldsUsed: ["capital"]
    });
  }

  if (country.population !== null) {
    insights.push({
      text: `The recorded population is ${country.population.toLocaleString()}.`,
      fieldsUsed: ["population"]
    });
  }

  if (country.area !== null) {
    insights.push({
      text: `Its area is ${country.area.toLocaleString()} square kilometers.`,
      fieldsUsed: ["area"]
    });
  }

  if (country.languages.length > 0) {
    insights.push({
      text: `Listed languages include ${joinNatural(country.languages)}.`,
      fieldsUsed: ["languages"]
    });
  }

  if (country.currencies.length > 0) {
    insights.push({
      text: `Listed currencies include ${joinNatural(country.currencies)}.`,
      fieldsUsed: ["currencies"]
    });
  }

  if (country.timezones.length > 0) {
    insights.push({
      text: `The dataset includes timezones such as ${joinNatural(country.timezones.slice(0, 3))}.`,
      fieldsUsed: ["timezones"]
    });
  }

  insights.push({
    text: `${country.name} uses the ISO alpha-3 code ${country.iso3}.`,
    fieldsUsed: ["name", "iso3"]
  });

  return dedupeInsights(insights).slice(0, 5);
}

function joinNatural(values: string[]): string {
  if (values.length === 1) {
    return values[0] ?? "";
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
}

function dedupeInsights(insights: ExplanationFact[]): ExplanationFact[] {
  const seen = new Set<string>();

  return insights.filter((insight) => {
    if (seen.has(insight.text)) {
      return false;
    }

    seen.add(insight.text);
    return true;
  });
}
