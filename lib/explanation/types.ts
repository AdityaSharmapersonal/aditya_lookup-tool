import type { CountryField } from "@/lib/country/types";

export type ExplanationPart = {
  text: string;
  fieldsUsed: CountryField[];
};

export type Explanation = {
  summary: ExplanationPart;
  insights: ExplanationPart[];
};

export type ExplanationResponse =
  | {
      status: "ready";
      explanation: Explanation;
      cacheKey: string;
    }
  | {
      status: "unavailable";
      reason: string;
    };
