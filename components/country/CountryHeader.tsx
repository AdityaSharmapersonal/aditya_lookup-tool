import type { Country } from "@/lib/country/types";

export function CountryHeader({ country }: { country: Country }) {
  return (
    <section className="panel hero">
      <div className="result-top">
        <img className="flag" src={country.flagUrl ?? ""} alt={`${country.name} flag`} />
        <div>
          <p className="muted">{country.iso3}</p>
          <h1>{country.name}</h1>
          {country.officialName && country.officialName !== country.name ? (
            <p className="lede">{country.officialName}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
