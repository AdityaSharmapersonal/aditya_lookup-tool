import { notFound } from "next/navigation";
import type { Country } from "@/lib/country/types";

const countries: Record<string, Country> = {
  CAN: {
    name: "Canada",
    officialName: "Canada",
    iso2: "CA",
    iso3: "CAN",
    capital: "Ottawa",
    region: "Americas",
    subregion: "North America",
    population: 41651653,
    area: 9984670,
    languages: ["English", "French"],
    currencies: ["Canadian dollar"],
    timezones: ["UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:30"],
    flagUrl: "https://flagcdn.com/ca.svg",
  },

  IND: {
    name: "India",
    officialName: "Republic of India",
    iso2: "IN",
    iso3: "IND",
    capital: "New Delhi",
    region: "Asia",
    subregion: "Southern Asia",
    population: 1428627663,
    area: 3287590,
    languages: ["Hindi", "English"],
    currencies: ["Indian rupee"],
    timezones: ["UTC+05:30"],
    flagUrl: "https://flagcdn.com/in.svg",
  },

  JPN: {
    name: "Japan",
    officialName: "Japan",
    iso2: "JP",
    iso3: "JPN",
    capital: "Tokyo",
    region: "Asia",
    subregion: "Eastern Asia",
    population: 124516650,
    area: 377930,
    languages: ["Japanese"],
    currencies: ["Japanese yen"],
    timezones: ["UTC+09:00"],
    flagUrl: "https://flagcdn.com/jp.svg",
  },

  BRA: {
    name: "Brazil",
    officialName: "Federative Republic of Brazil",
    iso2: "BR",
    iso3: "BRA",
    capital: "Brasília",
    region: "Americas",
    subregion: "South America",
    population: 203080756,
    area: 8515767,
    languages: ["Portuguese"],
    currencies: ["Brazilian real"],
    timezones: ["UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00"],
    flagUrl: "https://flagcdn.com/br.svg",
  },

  FRA: {
    name: "France",
    officialName: "French Republic",
    iso2: "FR",
    iso3: "FRA",
    capital: "Paris",
    region: "Europe",
    subregion: "Western Europe",
    population: 68170228,
    area: 551695,
    languages: ["French"],
    currencies: ["Euro"],
    timezones: ["UTC-10:00", "UTC-09:30", "UTC-09:00", "UTC-08:00", "UTC-04:00", "UTC+01:00"],
    flagUrl: "https://flagcdn.com/fr.svg",
  },

  AUS: {
    name: "Australia",
    officialName: "Commonwealth of Australia",
    iso2: "AU",
    iso3: "AUS",
    capital: "Canberra",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    population: 26005540,
    area: 7692024,
    languages: ["English"],
    currencies: ["Australian dollar"],
    timezones: ["UTC+05:00", "UTC+06:30", "UTC+07:00", "UTC+08:00", "UTC+09:30", "UTC+10:00"],
    flagUrl: "https://flagcdn.com/au.svg",
  },
};

export async function getCountryByIso3(iso3: string): Promise<Country> {
  const code = iso3.toUpperCase();
  const country = countries[code];

  if (!country) {
    notFound();
  }

  return country;
}