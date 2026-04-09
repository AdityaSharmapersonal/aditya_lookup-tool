import { NextResponse } from "next/server";

import { searchCountries } from "@/lib/country/search-countries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchCountries(q);
  return NextResponse.json({ results });
}
