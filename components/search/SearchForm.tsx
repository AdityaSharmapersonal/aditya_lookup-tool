"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();

    startTransition(() => {
      if (!query) {
        router.push("/search");
        return;
      }

      router.push(`/search?q=${encodeURIComponent(query)}`);
    });
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Try Canada, Democratic Republic of the Congo, or JPN"
      />
      <button className="button" type="submit" disabled={isPending}>
        {isPending ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
