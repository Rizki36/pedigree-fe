# Pedigree Frontend - AI Coding Agent Instructions

## Project Overview
A React-based frontend for a pedigree management system built with TanStack Router, React Query, and shadcn/ui components. The app manages animal records, breeding information, and pedigree visualization.

## Architecture & Key Patterns

### Module-Based Structure
- **Modular organization**: Each feature lives in `src/modules/{feature}/` with consistent subdirectories:
  - `components/` - React components
  - `hooks/` - Custom hooks (queries, mutations)
  - `services/` - API service layer
  - `types/` - TypeScript type definitions
- **Common module**: `src/modules/common/` contains shared UI components, utilities, and contexts

### Routing & Navigation
- **TanStack Router**: File-based routing in `src/routes/` with type-safe navigation
- **Route generation**: `routeTree.gen.ts` is auto-generated - don't edit manually
- **Authentication**: Protected routes use `RouteGuard` component and auth context
- **Route context**: Auth state passed through router context for type safety

### State Management
- **React Query**: All server state managed through TanStack Query with 10min stale time
- **Custom hooks pattern**: Each API call has dedicated hook in `modules/{feature}/hooks/queries/`
- **Naming convention**: `use{Entity}{Action}Query` (e.g., `useAnimalListQuery`, `useUserQuery`)
- **Mutations**: Separate directory `hooks/mutations/` for write operations

### UI Components & Styling
- **shadcn/ui**: Components in `src/modules/common/components/ui/` with custom aliases configured
- **Form patterns**: React Hook Form + Zod validation with FormField/FormItem structure
- **Data tables**: TanStack Table with consistent column definitions and loading states
- **Date handling**: dayjs for formatting, react-day-picker for selection
- **Styling**: Tailwind CSS with custom CSS variables in `src/index.css`

## Development Workflows

### Testing
```bash
# Unit tests (Jest + Testing Library)
yarn test              # Run once
yarn test:watch        # Watch mode
yarn test:coverage     # With coverage

# E2E tests (Playwright)
yarn test:e2e          # Headless
yarn test:e2e:ui       # With UI
yarn test:e2e:debug    # Debug mode
```

### Code Quality
```bash
yarn lint              # Biome linting
yarn lint:fix          # Auto-fix issues
yarn check-types       # TypeScript check
```

### Build & Development
```bash
yarn dev               # Development server
yarn build             # Production build
yarn preview           # Preview build
```

## Critical Patterns

### API Integration
- **Fetch wrapper**: Use `fetchInstance` from `src/modules/common/lib/fetch-instance.ts`
- **Base URL**: Configured via `VITE_BASE_URL` environment variable
- **Cookies**: Credentials included automatically for authentication
- **Query serialization**: Uses `qs` library with comma-separated arrays

### Authentication Flow
- **Google OAuth**: Login redirects to `${BASE_URL}/v1/auth/google`
- **User context**: `AuthProvider` wraps app, provides user state via `useAuth`
- **Route protection**: `RouteGuard` handles unauthenticated redirects

### Data Fetching Patterns
```typescript
// Standard query hook pattern
const useAnimalListQuery = ({ query, options } = {}) => {
  return useQuery({
    queryKey: ["animal/list", query],
    queryFn: () => animalService.getAnimalList({ query }),
    ...options,
  });
};
```

### Form Patterns
- **React Hook Form + Zod**: Standard validation approach
- **Form components**: Use FormField, FormItem, FormLabel, FormControl, FormMessage
- **Date inputs**: Calendar component with dayjs formatting
- **Select inputs**: Radix Select with proper form integration

### Component Patterns
- **Loading states**: Skeleton components for initial load, "Loading..." text for actions
- **Empty states**: Consistent "No results" messaging in tables
- **Error handling**: Toast notifications via Sonner
- **Data tables**: Consistent structure with flexRender and pagination

## File Naming & Conventions
- **Components**: PascalCase (e.g., `AnimalTable.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useAnimalListQuery.ts`)
- **Services**: camelCase with service suffix (e.g., `animal.service.ts`)
- **Types**: PascalCase interfaces (e.g., `GetAnimalListResponse`)

## Environment & Dependencies
- **Node.js**: ^20.19.1 required
- **Package manager**: Yarn ^1.22.22
- **Key dependencies**: React 18, TanStack Router/Query, Radix UI, Tailwind CSS
- **Dev tools**: Biome for linting/formatting, SWC for fast compilation
- **Deployment**: Vercel with SPA routing configured

## Testing Notes
- **E2E**: Playwright tests use page object pattern in `tests/page-objects/`
- **Authentication**: Tests use `auth-state.json` for authenticated sessions
- **Unit tests**: Components tested with Testing Library, API hooks mocked
