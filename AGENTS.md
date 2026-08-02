# Pedigree Frontend — Agent Notes

## Quickstart
- Node.js ^20.19.1, Yarn ^1.22.22 (classic).
- Install: `yarn install`
- Dev: `yarn dev` (uses `PORT` from `.env`)
- Build: `yarn build` (runs `tsc -b && vite build`)

## Verification Order
Run in this order when validating changes:
1. `yarn lint` (Biome, lints only `./src`)
2. `yarn check-types` (TypeScript project references)
3. `yarn test` (Jest)
4. `yarn build`

No formatting script exists; use `yarn lint:fix` for auto-fixable lint issues only.

## Test Commands
- Unit: `yarn test`, `yarn test:watch`, `yarn test:coverage`
- E2E: `yarn test:e2e`, `yarn test:e2e:ui`, `yarn test:e2e:debug`
- Run a single Jest test: `yarn test -- path/to/file.test.tsx`
- Run a single Playwright test: `yarn test:e2e -- path/to/file.spec.ts`

## E2E Prerequisites
- `yarn test:e2e` starts a dev server via `yarn dev` on port `3010` automatically.
- E2E auth requires the backend running on `http://localhost:3011` and `VITE_TEST_EMAIL` set.
- `tests/setup/auth-setup.ts` calls `POST /v1/auth/test-login` to create `tests/auth-state.json` (gitignored).
- Auth setup loads `.env.local` first, then `.env` as fallback.

## Architecture
- Vite + React 18 + TypeScript + SWC.
- Routing: TanStack Router file-based routes in `src/routes/`; entry route file `src/routes/__root.tsx`. Auto-generated file `src/routeTree.gen.ts` — do not edit.
- State: TanStack Query (React Query) with default stale time 10 min, gc time 15 min.
- UI: shadcn/ui components live in `src/modules/common/components/ui/`.
- Feature modules: `src/modules/{feature}/` with `components/`, `hooks/`, `services/`, `types/` (and `contexts/` where needed).
- Shared code: `src/modules/common/` (components, constants, contexts, lib).
- Entry point: `src/main.tsx`.
- Alias `@/*` resolves to `./src/*` in Vite, TypeScript, and Jest.

## API & Auth
- Use `fetchInstance` from `src/modules/common/lib/fetch-instance.ts` for all HTTP calls.
- Base URL: `VITE_BASE_URL` (default `http://localhost:3011`).
- Credentials/cookies are included by default in `fetchInstance`.
- Auth: `AuthProvider` + `useAuth` context; protected routes use `RouteGuard`.
- Login: Google OAuth redirect to `${BASE_URL}/v1/auth/google`.

## Important Tooling Details
- `vite.config.ts` reads `PORT` from `.env` via `loadEnv`; dev server runs on that port.
- `allowImportingTsExtensions` is enabled; do not add `.js` extensions on TS imports.
- Biome linter is configured but **not** used as a formatter; there is no `yarn format`.
- Biome disables `useExhaustiveDependencies` and `noExplicitAny`.
- Tailwind uses CSS variables defined in `src/index.css`.
- Jest uses `@swc/jest`, `jsdom`, and mocks `matchMedia`, `IntersectionObserver`, router `Link`, and auth hooks in `jest.setup.ts`. Unit tests match `src/**/*.{spec,test}.{ts,tsx}`.
- Coverage thresholds are set at 80% for statements/branches/functions/lines.

## Environment Variables
- `PORT` — dev/preview server port (default `3010`)
- `VITE_BASE_URL` — backend API URL
- `VITE_TEST_EMAIL` — test account used by E2E auth setup

## Deployment
- Vercel with SPA routing fallback (`vercel.json` rewrites everything to `/`).
- `Dockerfile` is currently empty.

## Related Repos
- Backend: https://github.com/Rizki36/pedigree-be
- Monorepo: https://github.com/Rizki36/pedigree

## Existing Instructions
- More detailed conventions are in `.github/copilot-instructions.md`.
