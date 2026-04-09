import { createHash } from "node:crypto";

import type { Country } from "@/lib/country/types";

export function buildCountryHash(country: Country): string {
  return createHash("sha256").update(JSON.stringify(country)).digest("hex");
}
