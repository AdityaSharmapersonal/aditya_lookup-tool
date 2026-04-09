import { SearchForm } from "@/components/search/SearchForm";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { EmptyState } from "@/components/ui/EmptyState";
import { searchCountries } from "@/lib/country/search-countries";

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = (params.q ?? "").trim();
  const results = query ? await searchCountries(query) : [];

  return (
    <div className="stack">
      <section className="panel hero">
        <p className="muted">Structured facts first. Grounded AI second.</p>
        <h1>Search any country by name or ISO code.</h1>
        <p className="lede">
          Every result resolves to a stable ISO alpha-3 detail page with structured facts and a
          validated AI explanation.
        </p>
        <SearchForm initialQuery={query} />
      </section>

      {!query ? (
        <EmptyState
          title="Enter a country name or ISO code"
          description="Search supports common names, official names, ISO alpha-2, and ISO alpha-3."
        />
      ) : results.length === 0 ? (
        <EmptyState title="No countries found" description={`No matches for "${query}".`} />
      ) : (
        <SearchResultsList query={query} results={results} />
      )}
    </div>
  );
}
