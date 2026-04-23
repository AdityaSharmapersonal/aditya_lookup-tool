"use client";

import { useEffect, useState, useTransition } from "react";

import { RetryButton } from "@/components/country/RetryButton";
import { ErrorState } from "@/components/ui/ErrorState";
import type { ExplanationResponse } from "@/lib/explanation/types";

export function ExplanationPanel({ iso3 }: { iso3: string }) {
  const [data, setData] = useState<ExplanationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function loadExplanation() {
    setError(null);

    try {
      const response = await fetch(`/api/country/${iso3}/explanation`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Explanation request failed.");
      }

      const payload = (await response.json()) as ExplanationResponse;
      setData(payload);
    } catch {
      setError("AI explanation unavailable right now.");
    }
  }

  useEffect(() => {
    startTransition(() => {
      void loadExplanation();
    });
  }, [iso3]);

  if (isPending && !data && !error) {
    return (
      <section className="panel explanation-card">
        <p className="muted">Generating grounded explanation...</p>
      </section>
    );
  }

  if (error || !data || data.status === "unavailable") {
    return (
      <section className="panel explanation-card">
        <ErrorState
          title="AI explanation unavailable right now"
          description="Structured facts are still available above."
        />
        <div className="actions-row">
          <RetryButton
            isPending={isPending}
            onClick={() => startTransition(() => void loadExplanation())}
          />
        </div>
      </section>
    );
  }

  const explanation = data.explanation as any;

  const summary =
    typeof explanation.summary === "string"
      ? explanation.summary
      : explanation.summary?.text ?? "No explanation summary available.";

  const insights = Array.isArray(explanation.insights)
    ? explanation.insights.map((insight: any) =>
        typeof insight === "string" ? insight : insight?.text ?? ""
      )
    : [];

  return (
    <section className="panel explanation-card">
      <p className="fact-label">AI Explanation</p>

      <p className="explanation-summary">{summary}</p>

      <ul className="insights-list">
        {insights.map((insight: string, index: number) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </section>
  );
}