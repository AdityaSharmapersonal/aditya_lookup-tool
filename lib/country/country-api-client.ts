const REST_COUNTRIES_BASE_URL = "https://restcountries.com/v3.1";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${REST_COUNTRIES_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    next: {
      revalidate: 86400
    }
  });

  if (!response.ok) {
    throw new Error(`Country API request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export function fetchCountriesByName(query: string) {
  return fetchJson<unknown[]>(`/name/${encodeURIComponent(query)}`);
}

export function fetchCountryByCode(code: string) {
  return fetchJson<unknown[]>(`/alpha/${encodeURIComponent(code)}`);
}
