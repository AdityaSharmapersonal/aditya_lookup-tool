export type CountryField =
  | "name"
  | "officialName"
  | "iso2"
  | "iso3"
  | "capital"
  | "region"
  | "subregion"
  | "population"
  | "area"
  | "languages"
  | "currencies"
  | "timezones"
  | "flagUrl";

export type Country = {
  name: string;
  officialName: string | null;
  iso2: string | null;
  iso3: string;
  capital: string | null;
  region: string | null;
  subregion: string | null;
  population: number | null;
  area: number | null;
  languages: string[];
  currencies: string[];
  timezones: string[];
  flagUrl: string | null;
};

export type CountrySearchResult = Pick<
  Country,
  "name" | "officialName" | "region" | "subregion" | "iso3" | "flagUrl"
> & {
  flagUrl: string;
};
