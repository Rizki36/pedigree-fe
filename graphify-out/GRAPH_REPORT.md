# Graph Report - pedigree-fe  (2026-08-02)

## Corpus Check
- 96 files · ~19,490 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 387 nodes · 816 edges · 18 communities (12 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `94c0cdf4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Forms & UI Components
- App Shell & Auth
- Animal Data Services
- Tables & Data Display
- Routing & Generated Routes
- Animal Detail Views
- Pedigree & Parent Management
- Layout & Navigation
- Achievement Services
- Delete Confirmations
- Pedigree Tree Visualization
- Breeding Module
- Animal Type Services
- Privacy Policy
- Vite Environment
- Indonesian Flag Asset
- React Logo Asset
- English Flag Asset

## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `generateServiceErrorMessage()` - 13 edges
3. `useAnimalListQuery()` - 10 edges
4. `animalService` - 10 edges
5. `Button` - 9 edges
6. `fetchInstance()` - 8 edges
7. `useUpdateAnimalMutation()` - 7 edges
8. `AnimalGender` - 7 edges
9. `Animal` - 7 edges
10. `useAuth()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `InnerApp()` --calls--> `useAuth()`  [EXTRACTED]
  src/main.tsx → src/modules/auth/contexts/AuthContext.tsx
- `Step()` --calls--> `cn()`  [EXTRACTED]
  src/modules/breeding/components/main/Steps.tsx → src/modules/common/lib/utils.ts
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  src/modules/common/components/ui/breadcrumb.tsx → src/modules/common/lib/utils.ts
- `CommandShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/modules/common/components/ui/command.tsx → src/modules/common/lib/utils.ts
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/modules/common/components/ui/dropdown-menu.tsx → src/modules/common/lib/utils.ts

## Import Cycles
- None detected.

## Communities (18 total, 6 thin omitted)

### Community 0 - "Forms & UI Components"
Cohesion: 0.05
Nodes (55): useAddAchievementMutation(), useUpdateAchievementMutation(), AchievementDialog(), AddState, EditState, formSchema, DetailsForm(), DetailsView() (+47 more)

### Community 1 - "App Shell & Auth"
Cohesion: 0.09
Nodes (21): Login(), PrivacyAgreement(), SignButton(), mockLogin, mockNavigate, publicRoutes, RouteGuard(), AuthContext (+13 more)

### Community 2 - "Animal Data Services"
Cohesion: 0.09
Nodes (31): UseAddAnimalMutationProps, UseDeleteAnimalMutationProps, UseUpdateAnimalMutationProps, UseAnimalListQueryProps, useDobRequirementQuery(), UseDobRequirementQueryProps, useGenderRequirementQuery(), UseGenderRequirementQueryProps (+23 more)

### Community 3 - "Tables & Data Display"
Cohesion: 0.13
Nodes (21): useAchievementListQuery(), Achievement, AchievementTable(), AchievementTableProps, DataSource, AnimalsTable(), DataSource, generateColumns() (+13 more)

### Community 4 - "Routing & Generated Routes"
Cohesion: 0.07
Nodes (26): InnerApp(), queryClient, Register, @tanstack/react-router, SidebarContext, SidebarContextType, SidebarProvider(), router (+18 more)

### Community 5 - "Animal Detail Views"
Cohesion: 0.08
Nodes (27): AchievementDialogProps, DeleteAnimalDialogProps, AchievementDialog, AnimalDetail(), DeleteAchievementDialog, DeleteAnimalDialog, MateType, useAnimal() (+19 more)

### Community 6 - "Pedigree & Parent Management"
Cohesion: 0.13
Nodes (20): NoteForm(), formSchema, ParentForm(), ParentSection(), useUpdateAnimalMutation(), useAnimalListQuery(), useInfiniteAnimalListQuery(), Command (+12 more)

### Community 8 - "Achievement Services"
Cohesion: 0.25
Nodes (13): UseAddAchievementMutationProps, UseDeleteAchievementMutationProps, UseUpdateAchievementMutationProps, UseAchievementListQueryProps, achievementService, DeleteAchievementBody, DeleteAchievementResponse, GetAchievementListQuery (+5 more)

### Community 10 - "Delete Confirmations"
Cohesion: 0.26
Nodes (11): useDeleteAchievementMutation(), DeleteAchievementDialog(), DeleteAchievementDialogProps, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter() (+3 more)

### Community 11 - "Pedigree Tree Visualization"
Cohesion: 0.19
Nodes (10): TooltipContent, PedigreeNodeProps, Tree(), VisitedNodesContext, usePedigreeTreeQuery(), UsePedigreeTreeQueryProps, pedigreeService, GetPedigreeTreeQuery (+2 more)

### Community 12 - "Breeding Module"
Cohesion: 0.08
Nodes (11): AddAnimalDialogProps, formSchema, AddAnimalDialog, Animals(), MatchingResult, Step(), Steps(), LanguageOption (+3 more)

### Community 13 - "Animal Type Services"
Cohesion: 0.42
Nodes (5): UseAnimalTypeListQueryProps, animalTypeService, GetAnimalTypeListQuery, GetAnimalTypeListResponse, AnimalType

## Knowledge Gaps
- **111 isolated node(s):** `formSchema`, `AddAnimalDialog`, `LanguageOption`, `IndexLazyRouteImport`, `BreedingIndexLazyRouteImport` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `fetchInstance()` connect `App Shell & Auth` to `Achievement Services`, `Animal Data Services`, `Pedigree Tree Visualization`, `Animal Type Services`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `cn()` connect `Forms & UI Components` to `Animal Data Services`, `Tables & Data Display`, `Animal Detail Views`, `Pedigree & Parent Management`, `Delete Confirmations`, `Pedigree Tree Visualization`, `Breeding Module`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `AuthProvider()` connect `App Shell & Auth` to `Routing & Generated Routes`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `formSchema`, `AddAnimalDialog`, `LanguageOption` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Forms & UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.052614052614052616 - nodes in this community are weakly interconnected._
- **Should `App Shell & Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.0945945945945946 - nodes in this community are weakly interconnected._
- **Should `Animal Data Services` be split into smaller, more focused modules?**
  _Cohesion score 0.09308510638297872 - nodes in this community are weakly interconnected._