import Link from "next/link";
import { SearchForm } from "@/components/search/SearchForm";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { EmptyState } from "@/components/ui/EmptyState";
import { searchCountries } from "@/lib/country/search-countries";

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

function SuggestedSearches() {
  const countries = ["Canada", "India", "Japan", "Brazil", "France", "Australia"];

  return (
    <div className="suggestions">
      {countries.map((country) => (
        <Link key={country} href={`/search?q=${country}`} className="suggestion-pill">
          {country}
        </Link>
      ))}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "1. Search",
      text: "Enter a country name or ISO code.",
    },
    {
      title: "2. View Facts",
      text: "The app shows structured country data from the cleaned dataset.",
    },
    {
      title: "3. Read AI Explanation",
      text: "The AI creates a grounded explanation using the stored country facts.",
    },
  ];

  return (
    <section className="how-it-works">
      {steps.map((step) => (
        <div key={step.title} className="how-card">
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      ))}
    </section>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = (params.q ?? "").trim();
  const results = query ? await searchCountries(query) : [];

  return (
    <main className="search-page">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />

      <section className="search-hero">
        <p className="eyebrow">COUNTRY LOOKUP</p>

        <div className="hero-card">
          <p className="muted">Structured facts first. Grounded AI second.</p>

          <h1>Explore any country with clean facts and AI explanation.</h1>

          <p className="lede">
            Search by country name, ISO alpha-2, or ISO alpha-3 code. Every result opens a stable
            country detail page with structured data and a grounded explanation.
          </p>

          <SearchForm initialQuery={query} />

          <div className="quick-search-block">
            <p>Quick searches</p>
            <SuggestedSearches />
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="results-section">
        {!query ? (
          <div className="animated-state">
            <EmptyState
              title="Start by entering a country name"
              description="Try Canada, India, Japan, Brazil, or an ISO code like CAN."
            />
          </div>
        ) : results.length === 0 ? (
          <div className="animated-state">
            <EmptyState
              title="No countries found"
              description={`No matches for "${query}". Try a different spelling or use one of the suggestions above.`}
            />
          </div>
        ) : (
          <div className="results-wrapper">
            <p className="result-label">Results for “{query}”</p>
            <SearchResultsList query={query} results={results} />
          </div>
        )}
      </section>
    </main>
  );
}