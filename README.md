# Assignment 6 Updates

## Architecture

This project uses a hybrid architecture.

The country search and lookup system is deterministic. It uses stored country data, API routes, validation, and caching.

The explanation system is prompt-first because it sends structured country JSON to the model and asks for a short explanation.

## Why Not RAG?

RAG was not implemented because the dataset is small, structured, and already stored in JSON format. Retrieval would add extra complexity without much benefit at this stage.

RAG would become useful if the app later included large documents, travel guides, economic reports, or historical sources.

## Data Flow

Raw country data is stored in:

```bash
data/bronze/countries_raw.json