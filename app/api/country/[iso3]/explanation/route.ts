import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ iso3: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { iso3 } = await params;
  const code = iso3.toUpperCase();

  return NextResponse.json({
    explanation: {
      summary: `${code} has a structured country profile generated from stored country facts. This explanation is stable for deployment and demonstration purposes.`,
      insights: [
        "The explanation uses controlled mock output for reliable Vercel deployment.",
        "The structured country facts remain the main source of truth.",
        "This avoids slow external API calls during the final demo.",
      ],
    },
    metadata: {
      mode: "mock",
      iso3: code,
    },
  });
}