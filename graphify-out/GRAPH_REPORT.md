# Graph Report - /Users/shiro/Documents/GitHub/pedigree-fe  (2026-08-02)

## Corpus Check
- Corpus is ~19,526 words - fits in a single context window. You may not need a graph.

## Summary
- 387 nodes · 914 edges · 19 communities (14 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

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
- Dashboard & Requirements
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
1. `cn()` - 48 edges
2. `generateServiceErrorMessage()` - 17 edges
3. `Button` - 12 edges
4. `useAuth()` - 11 edges
5. `useAnimalListQuery()` - 10 edges
6. `animalService` - 10 edges
7. `AnimalGender` - 10 edges
8. `fetchInstance()` - 8 edges
9. `useUpdateAnimalMutation()` - 7 edges
10. `Animal` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Step()` --calls--> `cn()`  [EXTRACTED]
  src/modules/breeding/components/main/Steps.tsx → src/modules/common/lib/utils.ts
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  src/modules/common/components/ui/breadcrumb.tsx → src/modules/common/lib/utils.ts
- `CommandShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/modules/common/components/ui/command.tsx → src/modules/common/lib/utils.ts
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/modules/common/components/ui/dropdown-menu.tsx → src/modules/common/lib/utils.ts
- `TreeNode()` --calls--> `cn()`  [EXTRACTED]
  src/modules/dashboard/components/main/TreeNode.tsx → src/modules/common/lib/utils.ts

## Import Cycles
- None detected.

## Communities (19 total, 5 thin omitted)

### Community 0 - "Forms & UI Components"
Cohesion: 0.06
Nodes (59): useAddAchievementMutation(), useUpdateAchievementMutation(), AchievementDialog(), AddState, EditState, formSchema, DetailsForm(), DetailsView() (+51 more)

### Community 1 - "App Shell & Auth"
Cohesion: 0.07
Nodes (29): InnerApp(), queryClient, Register, @tanstack/react-router, Login(), PrivacyAgreement(), SignButton(), mockLogin (+21 more)

### Community 2 - "Animal Data Services"
Cohesion: 0.14
Nodes (22): UseAddAnimalMutationProps, UseDeleteAnimalMutationProps, UseUpdateAnimalMutationProps, UseAnimalListQueryProps, UseDobRequirementQueryProps, UseGenderRequirementQueryProps, UseInfiniteAnimalListQueryProps, UseParentRequirementQueryProps (+14 more)

### Community 3 - "Tables & Data Display"
Cohesion: 0.14
Nodes (20): useAchievementListQuery(), Achievement, AchievementTable(), AchievementTableProps, DataSource, AnimalsTable(), DataSource, generateColumns() (+12 more)

### Community 4 - "Routing & Generated Routes"
Cohesion: 0.10
Nodes (22): Route, animalsSearchSchema, Route, Route, Route, AnimalsAnimalIdIndexRoute, AnimalsIndexRoute, BreedingIndexLazyImport (+14 more)

### Community 5 - "Animal Detail Views"
Cohesion: 0.13
Nodes (18): AchievementDialogProps, DeleteAnimalDialogProps, AchievementDialog, AnimalDetail(), DeleteAchievementDialog, DeleteAnimalDialog, MateType, useAnimal() (+10 more)

### Community 6 - "Pedigree & Parent Management"
Cohesion: 0.16
Nodes (17): formSchema, ParentForm(), ParentSection(), useUpdateAnimalMutation(), useAnimalListQuery(), useInfiniteAnimalListQuery(), Command, CommandEmpty (+9 more)

### Community 7 - "Layout & Navigation"
Cohesion: 0.14
Nodes (16): LanguageOption, MainLayout(), Sidebar(), Avatar, AvatarFallback, AvatarImage, DropdownMenuCheckboxItem, DropdownMenuContent (+8 more)

### Community 8 - "Achievement Services"
Cohesion: 0.25
Nodes (13): UseAddAchievementMutationProps, UseDeleteAchievementMutationProps, UseUpdateAchievementMutationProps, UseAchievementListQueryProps, achievementService, DeleteAchievementBody, DeleteAchievementResponse, GetAchievementListQuery (+5 more)

### Community 9 - "Dashboard & Requirements"
Cohesion: 0.16
Nodes (12): NoteForm(), useDobRequirementQuery(), useGenderRequirementQuery(), useParentRequirementQuery(), useStatusDistributionQuery(), generateServiceErrorMessage(), colors, Dashboard() (+4 more)

### Community 10 - "Delete Confirmations"
Cohesion: 0.26
Nodes (13): useDeleteAchievementMutation(), DeleteAchievementDialog(), DeleteAchievementDialogProps, DeleteAnimalDialog(), useDeleteAnimalMutation(), AlertDialogAction, AlertDialogCancel, AlertDialogContent (+5 more)

### Community 11 - "Pedigree Tree Visualization"
Cohesion: 0.21
Nodes (9): TooltipContent, PedigreeNodeProps, Tree(), VisitedNodesContext, UsePedigreeTreeQueryProps, pedigreeService, GetPedigreeTreeQuery, GetPedigreeTreeResponse (+1 more)

### Community 12 - "Breeding Module"
Cohesion: 0.16
Nodes (4): MatchingResult, Step(), Steps(), Route

### Community 13 - "Animal Type Services"
Cohesion: 0.42
Nodes (5): UseAnimalTypeListQueryProps, animalTypeService, GetAnimalTypeListQuery, GetAnimalTypeListResponse, AnimalType

## Knowledge Gaps
- **103 isolated node(s):** `@tanstack/react-router`, `queryClient`, `UseAddAchievementMutationProps`, `UseDeleteAchievementMutationProps`, `UseUpdateAchievementMutationProps` (+98 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Forms & UI Components` to `Tables & Data Display`, `Animal Detail Views`, `Pedigree & Parent Management`, `Layout & Navigation`, `Dashboard & Requirements`, `Delete Confirmations`, `Pedigree Tree Visualization`, `Breeding Module`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `App Shell & Auth` to `Layout & Navigation`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `fetchInstance()` connect `App Shell & Auth` to `Achievement Services`, `Animal Data Services`, `Pedigree Tree Visualization`, `Animal Type Services`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `@tanstack/react-router`, `queryClient`, `UseAddAchievementMutationProps` to the rest of the system?**
  _103 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Forms & UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05962059620596206 - nodes in this community are weakly interconnected._
- **Should `App Shell & Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Animal Data Services` be split into smaller, more focused modules?**
  _Cohesion score 0.14393939393939395 - nodes in this community are weakly interconnected._