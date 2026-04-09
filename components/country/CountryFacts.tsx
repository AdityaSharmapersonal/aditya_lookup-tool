import type { Country } from "@/lib/country/types";
import { isEmptyValue } from "@/lib/utils/is-empty-value";

const FACT_LABELS: Record<string, string> = {
  capital: "Capital",
  region: "Region",
  subregion: "Subregion",
  population: "Population",
  area: "Area (km²)",
  languages: "Languages",
  currencies: "Currencies",
  timezones: "Timezones",
  iso2: "ISO alpha-2"
};

export function CountryFacts({ country }: { country: Country }) {
  const entries: Array<[keyof typeof FACT_LABELS, string]> = [
    ["capital", country.capital],
    ["region", country.region],
    ["subregion", country.subregion],
    ["population", country.population?.toLocaleString() ?? null],
    ["area", country.area?.toLocaleString() ?? null],
    ["languages", country.languages.length ? country.languages.join(", ") : null],
    ["currencies", country.currencies.length ? country.currencies.join(", ") : null],
    ["timezones", country.timezones.length ? country.timezones.join(", ") : null],
    ["iso2", country.iso2]
  ].filter((entry): entry is [keyof typeof FACT_LABELS, string] => !isEmptyValue(entry[1]));

  return (
    <section className="panel fact-card">
      <div className="facts-grid">
        {entries.map(([label, value]) => (
          <div key={label}>
            <div className="fact-label">{FACT_LABELS[label]}</div>
            <div className="fact-value">{String(value)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
