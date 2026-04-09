## Problem Statement

Users who need quick, reliable country information currently have to piece it together from multiple sources, often wading through long articles or cluttered pages to find a few basic facts. This is especially inefficient for students, job applicants, trivia learners, general users, and secondary users like developers or analysts who need fast reference data. They want a single, predictable lookup flow that returns a country's capital, population, region, and flag immediately, plus a short explanation that helps interpret those facts without requiring another search.

## Solution

Build a focused country lookup tool where users enter a country name or ISO code, submit the query, review a results list when necessary, and select a specific country to view a concise fact panel. The fact panel shows only the country name, capital, population, region, and flag. After selection, the app automatically loads a short explanation derived only from the displayed facts. The explanation is a single short paragraph, kept concise, consistent, and grounded. If live AI generation fails or is unavailable, the system returns a deterministic fallback explanation derived from the same facts so the experience remains usable and low-friction.

## User Stories

1. As a student, I want to search for a country by name, so that I can quickly find core facts for classwork.
2. As a student, I want to search by ISO code, so that I can use the app for structured assignments or datasets.
3. As a job applicant, I want to quickly look up a country before an interview or application, so that I can prepare without reading long articles.
4. As a trivia learner, I want a fast lookup flow, so that I can satisfy curiosity in one interaction.
5. As a general user, I want a simple country search experience, so that I can find facts without navigating cluttered websites.
6. As a developer, I want ISO code search support, so that I can use the app as a quick technical reference.
7. As an analyst, I want reliable country facts in a consistent format, so that I can reference them efficiently.
8. As a user, I want to submit a query and see matching results, so that ambiguous country names do not return the wrong country.
9. As a user, I want an intermediate results list for ambiguous searches, so that I can choose the exact country I meant.
10. As a user, I want exact and near-exact searches to behave consistently, so that the app feels predictable.
11. As a user, I want the result view limited to the most important facts, so that I do not get distracted by unnecessary details.
12. As a user, I want to see the country name clearly, so that I know which result I selected.
13. As a user, I want to see the capital immediately, so that I can answer common lookup questions fast.
14. As a user, I want to see the population immediately, so that I can understand the country's scale.
15. As a user, I want to see the region immediately, so that I can place the country geographically.
16. As a user, I want to see the flag, so that I can visually confirm the selected country.
17. As a user, I want the explanation to load automatically after I select a country, so that I do not need an extra step.
18. As a user, I want the explanation to be short, so that I can absorb it quickly.
19. As a user, I want the explanation to be grounded in the facts on screen, so that I can trust it.
20. As a user, I do not want the explanation to speculate or hallucinate, so that I am not misled.
21. As a user, I want the explanation to avoid political opinions, so that the app remains neutral and focused.
22. As a user, I want the explanation to avoid deep historical timelines, so that it stays concise.
23. As a user, I want the explanation to avoid real-time information, so that the app remains stable and fast.
24. As a user, I want a consistent explanation format, so that repeated use feels predictable.
25. As a user, I want the app to remain useful even if live AI is unavailable, so that I am not blocked by external service failures.
26. As a user, I want a fallback explanation instead of an empty state, so that I still leave with a meaningful takeaway.
27. As a user, I want the explanation label to be minimal and unobtrusive, so that the UI stays clean.
28. As a user, I want the app to work well on mobile, so that I can look up countries on my phone.
29. As a user, I want the app to work well on desktop, so that I can use it during study or work sessions.
30. As a user, I want search results to appear quickly, so that the app feels responsive.
31. As a user, I want country facts to appear quickly after selection, so that I can confirm the result immediately.
32. As a user, I want the explanation to appear quickly after the facts load, so that the overall experience remains smooth.
33. As a user, I do not want to ask follow-up questions, so that the app remains a one-shot lookup tool.
34. As a product owner, I want the explanation cached and persisted by country data version, so that the app stays fast and consistent across repeat visits.
35. As a product owner, I want the explanation source bounded to the displayed facts only, so that trust remains high and validation stays simple.
36. As a product owner, I want the app scope explicitly limited, so that it does not drift into weather, news, maps, or chat.
37. As a product owner, I want low operational complexity, so that the app can ship with a clear and stable v1 surface.
38. As a product owner, I want deterministic fallback behavior, so that the product remains resilient under quota or provider failures.

## Implementation Decisions

- The visible country fact surface is limited to country name, capital, population, region, and flag.
- Search supports both country names and ISO codes.
- Search is submit-based, not live typeahead.
- Ambiguous queries return a results list; the explanation is generated only after a specific country is selected.
- The selected country view is the primary detail surface and is reachable from search results.
- The explanation loads automatically after country selection.
- The explanation is one short paragraph only, typically 1 to 3 sentences.
- The explanation may interpret facts but may not introduce facts outside the displayed data.
- The explanation uses only country name, capital, population, and region as inputs. The flag is display-only in v1.
- The app includes whatever country-like entities the canonical dataset returns, including territories, as long as they are consistently labeled and searchable.
- The app must work on both desktop and mobile with the same core interaction flow.
- Performance targets should be treated as product requirements:
  - search results visible within 1 second under normal conditions
  - country facts visible within 1 second after selection under normal conditions
  - explanation visible within 2 seconds when cached and within 4 seconds when generated live under normal conditions
- Explanations are cached and durably persisted per country/data version to improve latency and consistency.
- If live AI generation fails, the system returns a deterministic fallback explanation derived from the same facts.
- Explanation source status may be tracked internally, but fallback disclosure to users should remain minimal in v1.
- The implementation should center on these deep modules:
  - Country Search Module
  - Country Facts Module
  - Explanation Module
  - Explanation Cache Module
  - Result Presentation Module
- The app is explicitly a one-shot lookup tool and does not support multi-turn conversational interaction.

## Testing Decisions

- Good tests should verify externally observable behavior and stable contracts, not internal implementation details.
- Tests should prioritize correctness of search behavior, visible fact resolution, explanation grounding, caching behavior, and fallback behavior.
- The Country Search Module should be tested for submit-driven queries, ISO search support, name search support, and ambiguous-result handling.
- The Country Facts Module should be tested for correct extraction and presentation of the visible fact set.
- The Explanation Module should be tested for paragraph-only output, grounding to visible facts only, and deterministic fallback behavior when live AI fails.
- The Explanation Cache Module should be tested for versioned persistence and reuse behavior.
- The Result Presentation Module should be tested for results-list behavior, automatic explanation loading, and responsive empty/loading/error states.
- UI tests should focus on user-visible behavior rather than styling implementation.
- Prior art in this codebase should come from the existing normalization, search, explanation validation, and route/service behavior tests already present.

## Out of Scope

- Weather data
- News data
- Maps
- Real-time data dependencies
- Political opinions
- Deep historical timelines
- Follow-up questions
- Chat or conversational AI
- Long-form explanations
- Hidden-data explanations based on non-visible fields
- Freeform external world knowledge in explanations
- Personalized recommendations
- Rich discovery or exploratory browsing workflows

## Further Notes

- The core product value is fast, predictable reference lookup with minimal friction.
- Trust is more important than breadth. If a fact cannot be shown and verified in the visible result, it should not support the explanation.
- The app should favor consistency and low latency over maximal richness.
- Fallback explanation behavior is part of the product, not just an error path.
- The product should remain tightly scoped to avoid turning into a general country-information portal.
