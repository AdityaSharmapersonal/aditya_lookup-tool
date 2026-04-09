"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function CountryErrorPage() {
  return (
    <ErrorState
      title="Country data is unavailable"
      description="The country details could not be loaded right now."
    />
  );
}
