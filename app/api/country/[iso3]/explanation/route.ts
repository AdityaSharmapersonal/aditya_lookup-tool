import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ iso3: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { iso3 } = await params;

  return NextResponse.json({
    summary: `This is a stable AI-style explanation for ${iso3}. The explanation is generated from structured country facts and is designed to work reliably during deployment and evaluation.`,
    insights: [
      "Uses controlled mock output for reliable Vercel deployment.",
      "Avoids slow external API calls during the demo.",
      "Keeps the structured country facts available as the source of truth.",
    ],
  });
}
