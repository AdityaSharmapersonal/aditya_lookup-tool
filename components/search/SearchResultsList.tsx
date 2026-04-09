import { SearchResultCard } from "@/components/search/SearchResultCard";
import type { CountrySearchResult } from "@/lib/country/types";

export function SearchResultsList({
  query,
  results
}: {
  query: string;
  results: CountrySearchResult[];
}) {
  return (
    <section className="stack">
      <div>
        <p className="muted">
          {results.length} result{results.length === 1 ? "" : "s"} for "{query}"
        </p>
      </div>
      <div className="results-grid">
        {results.map((result) => (
          <SearchResultCard key={result.iso3} result={result} />
        ))}
      </div>
    </section>
  );
}
