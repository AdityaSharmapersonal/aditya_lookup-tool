import { CountryFacts } from "@/components/country/CountryFacts";
import { CountryHeader } from "@/components/country/CountryHeader";
import { ExplanationPanel } from "@/components/country/ExplanationPanel";
import { getCountryByIso3 } from "@/lib/country/get-country-by-iso3";

type CountryPageProps = {
  params: Promise<{ iso3: string }>;
};

export default async function CountryPage({ params }: CountryPageProps) {
  const { iso3 } = await params;
  const country = await getCountryByIso3(iso3);

  return (
    <div className="country-grid">
      <section className="stack">
        <CountryHeader country={country} />
        <CountryFacts country={country} />
      </section>
      <ExplanationPanel iso3={country.iso3} />
    </div>
  );
}
