# Assignment 6 Evaluation Results

## System Being Evaluated

The system is a country lookup tool that allows users to search for a country, open a details page, and view an AI-generated explanation based on stored country data.

## Architecture Category

The system is best classified as a hybrid architecture.

It uses deterministic logic for:
- country search
- country lookup
- data cleaning
- schema validation
- explanation caching

It uses prompt-first AI for:
- generating a short country explanation from structured JSON

It is not a full RAG system because it does not retrieve document chunks. The dataset is small and structured, so direct lookup is simpler and easier to debug.

## Evaluation Metrics

### 1. Output Quality

Scored from 1 to 5.

- 5 = accurate, clear, uses only provided data
- 4 = mostly correct, minor wording issue
- 3 = usable but missing detail
- 2 = unclear or partly wrong
- 1 = failed output

### 2. End-to-End Task Success

Pass or Fail.

A task passes if the user can complete the full flow:
search → select country → view facts → view explanation.

### 3. Upstream Component Evaluation

I evaluated the search component before the final AI output.

The search component passes if the correct country appears for exact or partial input.

## Representative Cases

| Case | Input | Output Quality | End-to-End Success | Notes |
|---|---|---:|---|---|
| 1 | Canada | 5/5 | Pass | Search and explanation worked correctly. |
| 2 | can | 4/5 | Pass | Partial search worked, but multiple results may require user selection. |
| 3 | India | 5/5 | Pass | Details and explanation were clear. |
| 4 | Japan | 4/5 | Pass | Explanation was useful but could be more structured. |
| 5 | Brazil | 5/5 | Pass | Country page loaded successfully. |

## Failure Cases

| Case | Input | Result | Problem |
|---|---|---|---|
| 6 | Atlantis | Fail handled | No results appeared, but message could be clearer. |
| 7 | Empty input | Weak handling | App should guide the user instead of doing nothing or showing unclear output. |

## Upstream Component Evaluation: Search

| Input | Expected | Result |
|---|---|---|
| Canada | Canada appears | Pass |
| can | Matching countries appear | Pass |
| India | India appears | Pass |
| Atlantis | No results | Pass, but message needs improvement |
| Empty input | Helpful message | Needs improvement |

## Main Weakness Found

The biggest weakness was user guidance during failure cases. When a user searched for a fake country or submitted an empty query, the system did not explain clearly what happened.

## Improvement Made

I improved the empty and no-result states in the UI so users understand what to do next.

Before:
- empty or failed searches were confusing

After:
- the app gives a clearer message
- users are guided to search using a valid country name

## Remaining Weakness

The AI explanation still depends on the quality of the stored country data. If the stored data is incomplete, the explanation may be limited.