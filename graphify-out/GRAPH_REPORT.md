# Graph Report - pedigree-fe  (2026-08-02)

## Corpus Check
- 96 files · ~19,514 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 387 nodes · 700 edges · 20 communities (13 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c03a4b16`
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
- select.tsx
- Delete Confirmations
- Pedigree Tree Visualization
- Breeding Module
- Animal Type Services
- Privacy Policy
- Vite Environment
- Indonesian Flag Asset
- React Logo Asset
- English Flag Asset
- DeleteAnimalDialog.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 41 edges
2. `useAnimalListQuery()` - 10 edges
3. `animalService` - 9 edges
4. `generateServiceErrorMessage()` - 9 edges
5. `fetchInstance()` - 8 edges
6. `useAuth()` - 7 edges
7. `ParentForm()` - 6 edges
8. `Animal` - 6 edges
9. `Button` - 6 edges
10. `Dashboard()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `InnerApp()` --calls--> `useAuth()`  [EXTRACTED]
  src/main.tsx → src/modules/auth/contexts/AuthContext.tsx
- `Step()` --calls--> `cn()`  [EXTRACTED]
  src/modules/breeding/components/main/Steps.tsx → src/modules/common/lib/utils.ts
- `Tree()` --calls--> `cn()`  [EXTRACTED]
  src/modules/pedigree/components/main/PedigreeTree.tsx → src/modules/common/lib/utils.ts
- `DeleteAchievementDialog()` --calls--> `generateServiceErrorMessage()`  [EXTRACTED]
  src/modules/animal/components/detail/DeleteAchievementDialog.tsx → src/modules/common/lib/utils.ts
- `ParentForm()` --calls--> `cn()`  [EXTRACTED]
  src/modules/animal/components/detail/ParentSection.tsx → src/modules/common/lib/utils.ts

## Import Cycles
- None detected.

## Communities (20 total, 7 thin omitted)

### Community 0 - "Forms & UI Components"
Cohesion: 0.05
Nodes (42): Avatar, AvatarFallback, AvatarImage, Badge(), BadgeProps, badgeVariants, Breadcrumb, BreadcrumbEllipsis() (+34 more)

### Community 1 - "App Shell & Auth"
Cohesion: 0.09
Nodes (21): Login(), PrivacyAgreement(), SignButton(), mockLogin, mockNavigate, publicRoutes, RouteGuard(), AuthContext (+13 more)

### Community 2 - "Animal Data Services"
Cohesion: 0.09
Nodes (30): UseAddAnimalMutationProps, UseDeleteAnimalMutationProps, UseUpdateAnimalMutationProps, UseAnimalListQueryProps, useDobRequirementQuery(), UseDobRequirementQueryProps, useGenderRequirementQuery(), UseGenderRequirementQueryProps (+22 more)

### Community 3 - "Tables & Data Display"
Cohesion: 0.14
Nodes (18): Achievement, AnimalsTable(), DataSource, generateColumns(), Animal, AnimalGender, AnimalStatus, IsoDateString (+10 more)

### Community 4 - "Routing & Generated Routes"
Cohesion: 0.07
Nodes (26): InnerApp(), queryClient, Register, @tanstack/react-router, SidebarContext, SidebarContextType, SidebarProvider(), router (+18 more)

### Community 5 - "Animal Detail Views"
Cohesion: 0.10
Nodes (13): AchievementDialogProps, AddState, EditState, formSchema, AchievementTableProps, DataSource, formSchema, AchievementDialog (+5 more)

### Community 6 - "Pedigree & Parent Management"
Cohesion: 0.07
Nodes (37): formSchema, NoteForm(), formSchema, ParentForm(), ParentSection(), useUpdateAnimalMutation(), useAnimalListQuery(), useInfiniteAnimalListQuery() (+29 more)

### Community 8 - "Achievement Services"
Cohesion: 0.19
Nodes (13): UseAddAchievementMutationProps, UseDeleteAchievementMutationProps, UseUpdateAchievementMutationProps, UseAchievementListQueryProps, achievementService, DeleteAchievementBody, DeleteAchievementResponse, GetAchievementListQuery (+5 more)

### Community 9 - "select.tsx"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 10 - "Delete Confirmations"
Cohesion: 0.26
Nodes (11): useDeleteAchievementMutation(), DeleteAchievementDialog(), DeleteAchievementDialogProps, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter() (+3 more)

### Community 11 - "Pedigree Tree Visualization"
Cohesion: 0.21
Nodes (9): TooltipContent, PedigreeNodeProps, Tree(), VisitedNodesContext, UsePedigreeTreeQueryProps, pedigreeService, GetPedigreeTreeQuery, GetPedigreeTreeResponse (+1 more)

### Community 12 - "Breeding Module"
Cohesion: 0.08
Nodes (10): AddAnimalDialogProps, formSchema, AddAnimalDialog, Animals(), MatchingResult, Step(), Steps(), LanguageOption (+2 more)

### Community 13 - "Animal Type Services"
Cohesion: 0.36
Nodes (5): UseAnimalTypeListQueryProps, animalTypeService, GetAnimalTypeListQuery, GetAnimalTypeListResponse, AnimalType

## Knowledge Gaps
- **125 isolated node(s):** `AddState`, `EditState`, `formSchema`, `DataSource`, `AchievementTableProps` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `fetchInstance()` connect `App Shell & Auth` to `Achievement Services`, `Animal Data Services`, `Pedigree Tree Visualization`, `Animal Type Services`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `cn()` connect `Forms & UI Components` to `Animal Data Services`, `Tables & Data Display`, `Pedigree & Parent Management`, `select.tsx`, `Delete Confirmations`, `Pedigree Tree Visualization`, `Breeding Module`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `AuthProvider()` connect `App Shell & Auth` to `Routing & Generated Routes`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `AddState`, `EditState`, `formSchema` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Forms & UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05194805194805195 - nodes in this community are weakly interconnected._
- **Should `App Shell & Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.0945945945945946 - nodes in this community are weakly interconnected._
- **Should `Animal Data Services` be split into smaller, more focused modules?**
  _Cohesion score 0.09250693802035152 - nodes in this community are weakly interconnected._