# Graph Report - .  (2026-08-02)

## Corpus Check
- Corpus is ~24,547 words - fits in a single context window. You may not need a graph.

## Summary
- 810 nodes · 1356 edges · 96 communities (24 shown, 72 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Common UI
- Animal UI
- Project Docs
- Auth UI
- Animal Hooks
- Animal UI
- Biome Config
- E2E Tests
- TypeScript Config
- Routing
- Common UI
- E2E Tests
- E2E Tests
- Config
- Achievement Services
- TypeScript Config
- Tailwind Config
- Breeding UI
- E2E Tests
- E2E Tests
- React Dependency
- Biomejs Dependency
- Animal Type Services
- Jest Config
- TypeScript Config
- Policy UI
- E2E Tests
- React Dependency
- Playwright Config
- Vite Config
- Autoprefixer Dependency
- Clsx Dependency
- Cmdk Dependency
- Date Dependency
- Dayjs Dependency
- Dotenv Dependency
- Eslint Dependency
- Eslint Dependency
- Eslint Dependency
- Eslint Dependency
- Globals Dependency
- Hookform Dependency
- Identity Dependency
- Jest Dependency
- Jest Dependency
- Jest Dependency
- Lucide Dependency
- Next Dependency
- Qs Dependency
- Radix Dependency
- Radix Dependency
- Radix Dependency
- Radix Dependency
- Radix Dependency
- Radix Dependency
- Radix Dependency
- Radix Dependency
- Radix Dependency
- React Dependency
- React Dependency
- Sonner Dependency
- Tailwind Dependency
- Tailwindcss Dependency
- Tanstack Dependency
- Tanstack Dependency
- Tanstack Dependency
- Tanstack Dependency
- Tanstack Dependency
- Usehooks Dependency
- Zod Dependency
- Playwright Dependency
- Postcss Dependency
- Swc Dependency
- Tanstack Dependency
- Tanstack Dependency
- Testing Dependency
- Testing Dependency
- Testing Dependency
- Ts Dependency
- Types Dependency
- Types Dependency
- Types Dependency
- Types Dependency
- Typescript Dependency
- Typescript Dependency
- Vite Dependency
- Vitejs Dependency
- Vite Config
- Assets
- Assets
- Vercel Config
- Assets

## God Nodes (most connected - your core abstractions)
1. `cn()` - 48 edges
2. `AnimalDetailPage` - 30 edges
3. `AnimalPage` - 23 edges
4. `DashboardPage` - 22 edges
5. `compilerOptions` - 18 edges
6. `Pedigree Frontend` - 18 edges
7. `generateServiceErrorMessage()` - 17 edges
8. `Pedigree Frontend` - 15 edges
9. `scripts` - 14 edges
10. `BasePage` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Pedigree Frontend` --semantically_similar_to--> `Pedigree Frontend`  [INFERRED] [semantically similar]
  .github/copilot-instructions.md → AGENTS.md
- `Pedigree Frontend` --semantically_similar_to--> `Pedigree Frontend`  [INFERRED] [semantically similar]
  .github/copilot-instructions.md → README.md
- `src/main.tsx` --semantically_similar_to--> `Pedigree Frontend`  [INFERRED] [semantically similar]
  index.html → .github/copilot-instructions.md
- `TanStack Router` --semantically_similar_to--> `TanStack Router`  [INFERRED] [semantically similar]
  .github/copilot-instructions.md → AGENTS.md
- `RouteGuard` --semantically_similar_to--> `RouteGuard`  [INFERRED] [semantically similar]
  .github/copilot-instructions.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pedigree Frontend Project Documentation** — github_copilot_instructions_pedigree_frontend, agents_pedigree_frontend, readme_pedigree_frontend, index_html_entry_point [INFERRED 0.95]
- **Authentication Flow** — github_copilot_instructions_auth_provider, github_copilot_instructions_use_auth, github_copilot_instructions_route_guard, github_copilot_instructions_google_oauth, agents_auth_provider, agents_use_auth, agents_route_guard, agents_google_oauth [INFERRED 0.85]
- **Testing Ecosystem** — github_copilot_instructions_jest, github_copilot_instructions_playwright, github_prompts_javascript_typescript_jest_jest_testing_best_practices, github_prompts_javascript_typescript_jest_react_testing_library, agents_jest, agents_eighty_percent_coverage [INFERRED 0.85]

## Communities (96 total, 72 thin omitted)

### Community 0 - "Common UI"
Cohesion: 0.05
Nodes (72): useAddAchievementMutation(), useUpdateAchievementMutation(), AchievementDialog(), AddState, EditState, formSchema, DetailsForm(), DetailsView() (+64 more)

### Community 1 - "Animal UI"
Cohesion: 0.07
Nodes (36): useAchievementListQuery(), Achievement, AchievementTable(), AchievementTableProps, DataSource, AddAnimalDialogProps, AnimalsTable(), DataSource (+28 more)

### Community 2 - "Project Docs"
Cohesion: 0.06
Nodes (49): AuthProvider, Biome, 80% Coverage Threshold, fetchInstance, Google OAuth, Jest, Node.js, pedigree-be Backend (+41 more)

### Community 3 - "Auth UI"
Cohesion: 0.07
Nodes (29): InnerApp(), queryClient, Register, @tanstack/react-router, Login(), PrivacyAgreement(), SignButton(), mockLogin (+21 more)

### Community 4 - "Animal Hooks"
Cohesion: 0.09
Nodes (32): UseAddAnimalMutationProps, UseDeleteAnimalMutationProps, UseUpdateAnimalMutationProps, UseAnimalListQueryProps, useDobRequirementQuery(), UseDobRequirementQueryProps, useGenderRequirementQuery(), UseGenderRequirementQueryProps (+24 more)

### Community 5 - "Animal UI"
Cohesion: 0.09
Nodes (31): useDeleteAchievementMutation(), AchievementDialogProps, DeleteAchievementDialog(), DeleteAchievementDialogProps, DeleteAnimalDialog(), DeleteAnimalDialogProps, AchievementDialog, AnimalDetail() (+23 more)

### Community 6 - "Biome Config"
Cohesion: 0.05
Nodes (36): noSvgWithoutTitle, useSemanticElements, noUnusedImports, useExhaustiveDependencies, files, ignore, ignoreUnknown, formatter (+28 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2020, jest.setup.ts, src, compilerOptions, allowImportingTsExtensions, baseUrl (+16 more)

### Community 9 - "Routing"
Cohesion: 0.11
Nodes (21): animalsSearchSchema, Route, Route, Route, AnimalsAnimalIdIndexRoute, AnimalsIndexRoute, BreedingIndexLazyImport, BreedingIndexLazyRoute (+13 more)

### Community 10 - "Common UI"
Cohesion: 0.14
Nodes (16): LanguageOption, MainLayout(), Sidebar(), Avatar, AvatarFallback, AvatarImage, DropdownMenuCheckboxItem, DropdownMenuContent (+8 more)

### Community 13 - "Config"
Cohesion: 0.11
Nodes (18): name, private, scripts, build, check-types, dev, lint, lint:fix (+10 more)

### Community 14 - "Achievement Services"
Cohesion: 0.25
Nodes (13): UseAddAchievementMutationProps, UseDeleteAchievementMutationProps, UseUpdateAchievementMutationProps, UseAchievementListQueryProps, achievementService, DeleteAchievementBody, DeleteAchievementResponse, GetAchievementListQuery (+5 more)

### Community 15 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): ES2023, vite.config.ts, compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection (+9 more)

### Community 16 - "Tailwind Config"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 17 - "Breeding UI"
Cohesion: 0.16
Nodes (4): MatchingResult, Step(), Steps(), Route

### Community 20 - "React Dependency"
Cohesion: 0.18
Nodes (11): class-variance-authority, html-to-image, dependencies, class-variance-authority, html-to-image, @radix-ui/react-slot, react-day-picker, react-zoom-pan-pinch (+3 more)

### Community 21 - "Biomejs Dependency"
Cohesion: 0.22
Nodes (9): @biomejs/biome, devDependencies, @biomejs/biome, tailwindcss, @testing-library/dom, @types/react, tailwindcss, @testing-library/dom (+1 more)

### Community 22 - "Animal Type Services"
Cohesion: 0.42
Nodes (5): UseAnimalTypeListQueryProps, animalTypeService, GetAnimalTypeListQuery, GetAnimalTypeListResponse, AnimalType

### Community 24 - "TypeScript Config"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, files, references

### Community 27 - "React Dependency"
Cohesion: 0.67
Nodes (3): react, react, useFormField()

## Knowledge Gaps
- **283 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+278 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **72 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `React Dependency` to `Config`, `React Dependency`, `Clsx Dependency`, `Cmdk Dependency`, `Date Dependency`, `Dayjs Dependency`, `Hookform Dependency`, `Lucide Dependency`, `Next Dependency`, `Qs Dependency`, `Radix Dependency`, `Radix Dependency`, `Radix Dependency`, `Radix Dependency`, `Radix Dependency`, `Radix Dependency`, `Radix Dependency`, `Radix Dependency`, `Radix Dependency`, `React Dependency`, `React Dependency`, `Sonner Dependency`, `Tailwind Dependency`, `Tailwindcss Dependency`, `Tanstack Dependency`, `Tanstack Dependency`, `Tanstack Dependency`, `Tanstack Dependency`, `Tanstack Dependency`, `Usehooks Dependency`, `Zod Dependency`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **Why does `useFormField()` connect `React Dependency` to `Common UI`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `react` connect `React Dependency` to `React Dependency`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _283 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Common UI` be split into smaller, more focused modules?**
  _Cohesion score 0.05428150641699979 - nodes in this community are weakly interconnected._
- **Should `Animal UI` be split into smaller, more focused modules?**
  _Cohesion score 0.07013574660633484 - nodes in this community are weakly interconnected._
- **Should `Project Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.055272108843537414 - nodes in this community are weakly interconnected._