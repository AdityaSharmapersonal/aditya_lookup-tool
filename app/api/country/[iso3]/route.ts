import { NextResponse } from "next/server";

import { getCountryByIso3 } from "@/lib/country/get-country-by-iso3";

type RouteContext = {
  params: Promise<{ iso3: string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const { iso3 } = await params;
  const country = await getCountryByIso3(iso3);
  return NextResponse.json(country);
}
