import Link from "next/link";

import type { CountrySearchResult } from "@/lib/country/types";

export function SearchResultCard({ result }: { result: CountrySearchResult }) {
  return (
    <Link href={`/country/${result.iso3}`} className="panel result-card">
      <div className="result-top">
        <img className="flag" src={result.flagUrl} alt={`${result.name} flag`} />
        <div>
          <strong>{result.name}</strong>
          {result.officialName && result.officialName !== result.name ? (
            <p className="muted">{result.officialName}</p>
          ) : null}
        </div>
      </div>
      <div className="meta-row">
        <span>
          {result.region}
          {result.subregion ? ` / ${result.subregion}` : ""}
        </span>
        <span>{result.iso3}</span>
      </div>
    </Link>
  );
}
