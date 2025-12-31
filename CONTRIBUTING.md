# Contributing Guide

This document outlines the contribution philosophy, conventions, and processes for this repository.

## Contribution Philosophy

This is a starter template repository. Contributions should:
- Maintain backward compatibility with the existing setup
- Follow established patterns and conventions
- Improve developer experience without adding unnecessary complexity
- Keep the template minimal and focused

## Branching Strategy

- **`main`**: Production-ready code. All commits should be tested and working.
- **Feature branches**: Use descriptive names like `feat/add-dark-mode-toggle` or `fix/router-config`
- **No long-lived branches**: Merge or delete feature branches promptly

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config)
- `perf`: Performance improvements

### Scope

Use kebab-case for scope (enforced by Commitlint). Examples:
- `router`: TanStack Router changes
- `ui`: UI component changes
- `theme`: Theme/styling changes
- `config`: Configuration file changes

### Examples

```bash
feat(router): add nested route support
fix(ui): correct button loading state
docs(readme): update installation instructions
chore(deps): update react to 19.2.0
```

## Code Style and Formatting

### Biome Configuration

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Configuration is in `biome.json`.

### Key Rules

1. **File Naming**: kebab-case for all files (enforced)
2. **No Default Exports**: Use named exports except for:
   - Route files (`src/routes/**/*.tsx`)
   - Page components (`src/lib/pages/**/index.tsx`)
   - Entry files (`src/*.ts`, `*.ts` config files)
3. **Import Organization**: Automatic import sorting with groups:
   - External packages (URL, Node, npm packages)
   - Path aliases (`@/*`)
   - Relative paths
4. **Quote Style**: Single quotes for JavaScript/TypeScript
5. **Indentation**: Spaces (not tabs)

### Running Formatting

```bash
# Check for issues
pnpm biome:check

# Auto-fix issues
pnpm biome:fix
```

### Pre-commit Hooks

Lint-staged runs Biome checks on staged files before commits. Configured in `.lintstagedrc.json`.

## TypeScript Guidelines

### Type Safety

- Use strict TypeScript settings (enforced in `tsconfig.json`)
- Avoid `any` types
- Use proper type inference where possible
- Export types/interfaces for reusable components

### Path Aliases

Always use path aliases (`@/*`) instead of relative imports for `src/` files:

```tsx
// ✅ Good
import { Button } from '@/lib/components/ui/button';

// ❌ Bad
import { Button } from '../../../lib/components/ui/button';
```

## Testing Expectations

### Test Coverage

- Utility functions (`src/lib/utils/`) should have tests
- Aim for meaningful test coverage, not 100% coverage for its own sake
- Tests use Vitest with coverage reporting

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:ui

# Coverage report
pnpm test:coverage
```

### Test File Location

- Co-locate test files with source: `sample.test.ts` next to `sample.ts`
- Or use `__tests__` directories for complex test suites

## Component Patterns

### Component Structure

1. **Props Interface**: Define props interface/type at top
2. **Component Definition**: Use function declarations or `forwardRef` for DOM components
3. **Exports**: Named exports for components, types exported separately if needed

```tsx
interface ButtonProps extends ChakraButtonProps {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    // implementation
  }
);
```

### Chakra UI Components

- Use Chakra UI primitives from `@chakra-ui/react`
- Extend Chakra props when creating wrapper components
- Use theme tokens for spacing, colors, etc.

### Client Components

Mark components that use browser APIs with `'use client'` directive:

```tsx
'use client';

export function ColorModeProvider(props: ThemeProviderProps) {
  // uses browser APIs
}
```

## Route Development

### Adding Routes

1. Create route file in `src/routes/`
2. Use `createFileRoute` from `@tanstack/react-router`
3. Route tree auto-generates (do not edit `routeTree.gen.ts`)

### Route File Pattern

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { PageComponent } from '@/lib/pages/page-name';

export const Route = createFileRoute('/path')({
  component: PageComponent,
});
```

## Review and PR Process

### Before Submitting

1. Run all checks: `pnpm check:turbo`
2. Ensure tests pass: `pnpm test`
3. Verify build succeeds: `pnpm build`
4. Check for unused code: `pnpm knip`

### Pull Request Guidelines

1. **Clear Description**: Explain what and why, not just how
2. **Small Changes**: Prefer multiple small PRs over one large PR
3. **Update Documentation**: Update relevant docs if behavior changes
4. **No Generated Files**: Do not commit generated files unless necessary:
   - `routeTree.gen.ts` (auto-generated, but tracked for type safety)
   - Build artifacts
   - `node_modules/`

### Review Checklist

Reviewers should verify:
- [ ] Code follows style guidelines
- [ ] Tests pass and coverage is adequate
- [ ] TypeScript compiles without errors
- [ ] No breaking changes (or clearly documented)
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventions

## Dependency Management

### Adding Dependencies

```bash
# Production dependency
pnpm add <package>

# Development dependency
pnpm add -D <package>
```

### Updating Dependencies

```bash
# Interactive update
pnpm up-interactive

# Update to latest
pnpm up-latest
```

### Dependency Philosophy

- Prefer minimal dependencies
- Use established, well-maintained packages
- Document why non-obvious dependencies are needed

## Known Pitfalls

### Route Tree Generation

- Do not manually edit `src/routeTree.gen.ts`
- Route tree regenerates on file save during development
- If routes don't appear, check file naming and `createFileRoute` usage

### TypeScript Path Aliases

- Path aliases work in source code, not in config files
- Use relative paths in `vite.config.ts`, `vitest.config.ts`, etc.

### Biome Exclusions

Some files are excluded from Biome checks (see `biome.json`):
- Generated files (`*.gen.ts`)
- UI component library files (`src/lib/components/ui/**/*`)
- Type definition files (`*.d.ts`)

## Questions?

If you're unsure about a contribution approach:
1. Check existing code for patterns
2. Review this guide and related documentation
3. Open an issue for discussion before large changes

