# Architecture Changes Summary

## Before
- Versioning constants (`EXPLANATION_PROMPT_VERSION`, `EXPLANATION_MODEL`) scattered across multiple files
- Cache key construction done inline with string concatenation in `explanation-service.ts`
- Cache lookup and persistence logic mixed directly in the explanation service with Prisma calls
- Unit tests included E2E Playwright tests, causing conflicts

## After
- Centralized versioning logic in `lib/versioning/version-config.ts` and `lib/versioning/cache-key-builder.ts`
- Separated cache concerns into `lib/explanation/cache-manager.ts` with dedicated `getCachedExplanation()` and `saveExplanationToCache()` functions
- Explanation service now focuses on orchestration, delegating cache operations to the manager
- Unit test configuration excludes E2E tests, preventing conflicts between Vitest and Playwright

These changes improve modularity, testability, and separation of concerns by deepening shallow modules and centralizing cross-cutting logic.