# Pedigree Frontend — Improvement Plan

> Generated from a full repository analysis: lint, type-check, build, test coverage, security audit, dependency outdated check, and graph-based architecture analysis.

## Executive Summary

| Aspect | Current Status |
| --- | --- |
| Lint (`yarn lint`) | ✅ Passes |
| Type Check (`yarn check-types`) | ✅ Passes |
| Build (`yarn build`) | ✅ Passes (with warnings) |
| Unit Tests | ❌ Fails because coverage threshold (80%) is not met. Actual coverage is ~3.13%. |
| Security Audit | ⚠️ 228 vulnerabilities (35 low, 76 moderate, 116 high, 1 critical) |
| Dependencies | ⚠️ Many packages are outdated, including major versions |

## 1. Testing — Critical Priority

### Findings

- **Unit-test coverage is extremely low**: 3.13% statements, 0.46% branches, 2.93% lines, 2.51% functions.
- Only **one unit-test file** exists: `src/modules/auth/components/login/__tests__/index.test.tsx`.
- E2E tests exist (5 spec files under `tests/`), but unit tests for hooks, services, components, and utilities are almost non-existent.
- Because `jest.config.ts` enforces a global 80% coverage threshold, `yarn test` always exits with an error.

### Recommendations

- Temporarily lower the global coverage threshold (or remove it) until the test suite is rebuilt, OR switch to per-module thresholds so that new features are tested without blocking CI.
- Add unit tests for critical, high-impact modules first:
  - `src/modules/common/lib/fetch-instance.ts`
  - `src/modules/common/lib/utils.ts` (`cn`, `generateServiceErrorMessage`)
  - `src/modules/auth/contexts/AuthContext.tsx`
  - `src/modules/auth/components/RouteGuard.tsx`
  - Service layers (`animal.ts`, `achievement.ts`, `pedigree.ts`, `animalType.ts`)
  - Reusable mutation hooks (they follow a repeated pattern, so one test can be templated)
- Mock `fetch`/`fetchInstance` consistently so service and hook tests are deterministic and fast.
- Consider adding a `test:ci` script that runs with `--coverage --watchAll=false` for CI.

## 2. Security & Dependencies — High Priority

### Findings

- `yarn audit` reports **228 vulnerabilities**, including **116 high** and **1 critical**.
  - Most stem from transitive `minimatch` via `jest`.
- `yarn outdated` shows many packages are behind:
  - `@biomejs/biome` 1.9.4 → 2.5.6
  - `vite` 5.4.9 → 8.2.0
  - `@tanstack/react-router` 1.70.1 → 1.170.18
  - `@tanstack/react-query` 5.60.5 → 5.101.4
  - `@tanstack/react-table` 8.20.5 → 8.21.3
  - `lucide-react` 0.507.0 → 1.28.0
  - `react` 18.3.1 → 19.2.8
  - `typescript` 5.6.3 → 5.9.3 (or 7.0.2)
- `browserslist`/`caniuse-lite` is **22 months old**; build emits a warning to run `npx update-browserslist-db@latest`.

### Recommendations

- Run `yarn upgrade` for patch/minor updates first; this alone may fix many vulnerabilities.
- Update `caniuse-lite` immediately: `npx update-browserslist-db@latest`.
- Evaluate major upgrades incrementally:
  - **Biome v1 → v2**: Breaking config changes likely; budget time for config migration.
  - **Vite 5 → 8**: Large jump; verify all plugins and custom config still work.
  - **React 18 → 19**: Hold off unless there is a clear need; test thoroughly before upgrading.
  - **TanStack Router**: Staying far behind may cause type-safety regressions; prioritize this.
- After updates, re-run `yarn audit`, `yarn lint`, `yarn check-types`, `yarn test`, and `yarn build` in that order.

## 3. Code Quality & Developer Experience — Medium-High Priority

### Findings

- **Two date libraries are used together**: `dayjs` (many components/forms) and `date-fns` (only in `PedigreeTree.tsx`).
- `console.error` statements are present in production code paths:
  - `src/modules/pedigree/components/main/PedigreeTree.tsx`
  - `src/modules/pedigree/components/main/index.tsx`
  - `src/modules/animal/components/main/AddAnimalDialog.tsx`
  - `src/modules/animal/components/detail/DetailsSection.tsx`
  - `src/modules/animal/components/detail/ParentSection.tsx`
  - `src/modules/animal/components/detail/DeleteAnimalDialog.tsx`
  - `src/modules/animal/components/detail/DeleteAchievementDialog.tsx`
  - `src/modules/animal/components/detail/NoteSection.tsx`
  - `src/modules/animal/components/detail/AchievementDialog.tsx`
  - `src/modules/auth/contexts/AuthContext.tsx`
- `Biome` disables several useful rules:
  - `noExplicitAny: off` → `fetchInstance.ts` and `generateServiceErrorMessage` use `any`.
  - `useExhaustiveDependencies: off` → increases risk of stale closures in `useEffect`.
  - `noNonNullAssertion: off` → e.g. `document.getElementById("root")!`.
- ESLint packages (`@eslint/js`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `typescript-eslint`) are installed but unused; Biome is the active linter.

### Recommendations

- **Standardize on one date library**. `dayjs` is already used more widely and is smaller; consider replacing the single `date-fns` usage in `PedigreeTree.tsx` with `dayjs`.
- Remove or replace `console.error` calls in production code. Prefer user-facing error feedback (Sonner toast) or structured error logging.
- Tighten Biome rules incrementally:
  - Re-enable `noExplicitAny` and replace explicit `any` with `unknown` + type guards.
  - Re-enable `useExhaustiveDependencies` and fix the reported issues.
  - Re-enable `noNonNullAssertion` and use safe runtime checks or non-null assertions only when truly justified.
- Decide on ESLint vs Biome:
  - If Biome is the single source of truth, remove the unused ESLint dependencies to reduce install size and confusion.
  - If ESLint is kept as a safety net, add an `eslint.config.js` and an `eslint` script.

## 4. Tooling & Deployment — Medium Priority

### Findings

- `Dockerfile` is **empty** (0 bytes), despite being mentioned in `AGENTS.md`.
- `vercel.json` has the SPA fallback, but no caching or security headers.
- `.gitignore` only excludes `graphify-out/cost.json`; other graphify outputs (`GRAPH_REPORT.md`, `graph.json`, etc.) are tracked in the repo.
- There is no `format` script in `package.json`; only `lint:fix` exists.
- No pre-commit hooks are configured (e.g. Husky + lint-staged).

### Recommendations

- Fill in the `Dockerfile` with a multi-stage build for the Vite/React app, or remove it if Vercel is the only deployment target.
- Improve `vercel.json`:
  - Add caching headers for static assets.
  - Add security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
- Clean up `.gitignore`:
  - Either ignore all of `graphify-out/` or commit only the report if it is intentionally documentation.
- Add a `format` script: `"format": "biome format ./src"`.
- Add a pre-commit hook (Husky + lint-staged) that runs `biome check` and `tsc --noEmit` on staged files.

## 5. Architecture & Maintainability — Medium Priority

### Findings (from Graphify analysis)

- 19 communities detected, but several have low cohesion:
  - `Forms & UI Components`: 0.06
  - `App Shell & Auth`: 0.07
  - `Animal Data Services`: 0.14
- 103 isolated nodes detected — likely many types/props that are loosely connected.
- `cn()` is a cross-community bridge (expected for a utility).
- `useAuth()` and `fetchInstance()` also bridge multiple communities.
- Several components are large and mix UI, form logic, and data fetching:
  - `DetailsSection.tsx` (~392 lines)
  - `ParentSection.tsx` (~434 lines)
  - `PedigreeTree.tsx` (~348 lines)

### Recommendations

- Split large components into smaller, focused pieces:
  - Presentational sub-components
  - Custom hooks for form/mutation logic
  - Pure helper functions extracted to `lib/` or `utils/`
- Improve cohesion in the `Forms & UI Components` community by extracting shared form primitives and reusable field wrappers.
- Evaluate whether `animalType` should remain a separate module or be merged into `animal`.
- Document the module conventions (already in `copilot-instructions.md`) and ensure they are enforced during code review.

## 6. Performance — Low-Medium Priority

### Findings

- The main bundle chunk is large: `index-B7a1BKay.js` = **361 KB (109 KB gzip)**.
- Other large vendor chunks:
  - `dialog` ~32 KB
  - `tooltip` ~53 KB
  - `useInfiniteAnimalListQuery` ~64 KB

### Recommendations

- Run `npx vite-bundle-visualizer` to inspect the bundle composition.
- Apply more granular lazy loading for dialogs, heavy forms, and the pedigree tree.
- Audit whether every Radix UI primitive is needed; some may be unused.
- Verify that `react-query-devtools` is fully excluded from production builds (current code lazy-loads it, which is good).
- Consider code-splitting routes at the route level if not already done.

## 7. Documentation — Low Priority

### Findings

- `README.md` is very minimal (only installation and run commands).
- No `CONTRIBUTING.md`, API contract docs, or changelog.

### Recommendations

- Expand `README.md` with:
  - Project overview and features
  - Folder structure
  - How to add a new module
  - Required environment variables
  - How to run E2E tests
  - How to run the full verification pipeline (`lint` → `check-types` → `test` → `build`)
- Add a `CONTRIBUTING.md` if external contributors are expected.
- Keep `AGENTS.md` and `copilot-instructions.md` in sync after any convention or tooling changes.

## Suggested Execution Order

1. **Testing**: Lower or restructure coverage thresholds, then add critical unit tests.
2. **Security & Dependencies**: Update patch/minor dependencies, fix `minimatch` vulnerabilities, update `browserslist`.
3. **Code Quality**: Remove `console.error` calls, standardize date libraries, tighten Biome rules.
4. **Tooling**: Fill `Dockerfile`, clean up `.gitignore`, add `format` script and pre-commit hooks.
5. **Architecture**: Refactor large components into smaller, cohesive pieces.
6. **Performance**: Bundle analysis and further lazy loading.
7. **Documentation**: Expand `README.md` and add contribution guidelines.

## Next Steps / Decisions Needed

Before starting implementation, clarify the following:

1. Should the 80% global coverage threshold be kept, lowered temporarily, or replaced with per-feature thresholds?
2. Which major dependency upgrades are acceptable to attempt now (Biome 2, Vite 8, React 19, TanStack Router latest)?
3. Should the project commit to **Biome only**, or keep **ESLint + Biome** together?
4. Should the `Dockerfile` be implemented for containerized deployment, or removed because Vercel is the target?
5. Which area should be prioritized first: testing, security updates, or code-quality cleanup?
