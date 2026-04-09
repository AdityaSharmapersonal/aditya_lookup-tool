import { z } from "zod";

export const countrySchema = z.object({
  name: z.string().min(1),
  officialName: z.string().nullable(),
  iso2: z.string().nullable(),
  iso3: z.string().length(3),
  capital: z.string().nullable(),
  region: z.string().nullable(),
  subregion: z.string().nullable(),
  population: z.number().nullable(),
  area: z.number().nullable(),
  languages: z.array(z.string()),
  currencies: z.array(z.string()),
  timezones: z.array(z.string()),
  flagUrl: z.string().url().nullable()
});

export type CountrySchema = z.infer<typeof countrySchema>;
