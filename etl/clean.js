const fs = require("node:fs");
const path = require("node:path");

const inputPath = path.join(__dirname, "..", "data", "bronze", "countries_raw.json");
const outputPath = path.join(__dirname, "..", "data", "gold", "countries.json");

function iso2ToFlagEmoji(iso2) {
  if (typeof iso2 !== "string" || iso2.length !== 2) {
    return null;
  }

  const upper = iso2.toUpperCase();
  const chars = [...upper].map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...chars);
}

function cleanCountry(country) {
  return {
    name: country?.name?.common ?? null,
    capital: Array.isArray(country?.capital) ? (country.capital[0] ?? null) : null,
    population: typeof country?.population === "number" ? country.population : null,
    region: country?.region ?? null,
    flag: iso2ToFlagEmoji(country?.cca2)
  };
}

module.exports = { cleanCountry };

function main() {
  const raw = fs.readFileSync(inputPath, "utf8");
  const countries = JSON.parse(raw);
  const cleaned = countries.map(cleanCountry);

  fs.writeFileSync(outputPath, `${JSON.stringify(cleaned, null, 2)}\n`, "utf8");
  console.log(`Wrote ${cleaned.length} countries to ${outputPath}`);
}

main();
