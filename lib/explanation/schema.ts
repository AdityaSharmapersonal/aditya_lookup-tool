import { z } from "zod";

import { countrySchema } from "@/lib/country/schema";

const countryFieldEnum = z.enum(
  Object.keys(countrySchema.shape) as [keyof typeof countrySchema.shape, ...(keyof typeof countrySchema.shape)[]]
);

const explanationPartSchema = z.object({
  text: z.string().min(1),
  fieldsUsed: z.array(countryFieldEnum).min(1)
});

export const explanationSchema = z.object({
  summary: explanationPartSchema,
  insights: z.array(explanationPartSchema).min(3).max(5)
});

export type ExplanationSchema = z.infer<typeof explanationSchema>;
