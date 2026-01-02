# GetLowLevel.io Test Suite

Comprehensive testing suite for GetLowLevel.io using Vitest for unit tests and Playwright for integration/e2e tests.

## Overview

This test suite provides coverage for:
- **Unit Tests**: Auth utilities, contexts, data models, page components
- **Integration Tests**: Dashboard navigation, page interactions, user flows
- **E2E Tests**: Critical user journeys from start to finish

## Test Structure

```
Test/
├── Unit/              # Unit tests with Vitest
│   ├── auth.test.ts
│   ├── AuthContext.test.tsx
│   ├── utils.test.ts
│   ├── questions.test.ts
│   ├── problems-page.test.tsx
│   ├── questions-page.test.tsx
│   └── leaderboard-page.test.tsx
├── Integration/       # Integration tests with Playwright
│   ├── dashboard-navigation.test.ts
│   ├── dashboard-pages.test.ts
│   └── user-flows.test.ts
└── setup.ts          # Test configuration
```

## Running Tests

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test:unit

# Watch mode (re-run on file changes)
npm run test:watch

# Interactive mode
npm test

# Coverage report
npm run test:coverage
```

### Integration/E2E Tests (Playwright)

```bash
# Run all e2e tests
npm run test:e2e

# Run with UI (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test dashboard-navigation
```

### Run All Tests

```bash
npm run test:all
```

## Test Coverage

### Core Features Covered

#### 1. Authentication (Firebase Auth)
- ✅ Google sign-in flow
- ✅ GitHub sign-in flow
- ✅ Logout functionality
- ✅ Auth state management
- ✅ Protected route handling

#### 2. Questions Catalog
- ✅ Data loading from JSON
- ✅ Question structure validation
- ✅ Difficulty filtering
- ✅ Language filtering
- ✅ Topic filtering
- ✅ Statistics calculation

#### 3. Dashboard Pages
- ✅ Problems page rendering
- ✅ Questions page rendering
- ✅ Leaderboard rendering
- ✅ Progress tracking display
- ✅ Explore page

#### 4. Navigation
- ✅ Dashboard navigation flow
- ✅ Layout persistence
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Performance benchmarks

#### 5. Error Handling
- ✅ Non-existent routes
- ✅ Auth failures
- ✅ Network errors
- ✅ Graceful degradation

## Writing New Tests

### Unit Test Template

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('Feature Name', () => {
  it('does something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### Integration Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Flow', () => {
  test('completes user action', async ({ page }) => {
    await page.goto('/page');
    await page.click('text=Button');
    await expect(page).toHaveURL(/expected/);
  });
});
```

## Configuration

### Vitest Config (`vitest.config.ts`)
- Environment: jsdom (React components)
- Coverage provider: v8
- Path aliases: `@/` → project root

### Playwright Config (`playwright.config.ts`)
- Browser: Chromium
- Base URL: `http://localhost:3000`
- Auto-starts dev server
- Screenshots on failure
- Trace on first retry

## Best Practices

### 1. Test Isolation
- Each test should be independent
- Use `beforeEach` for setup
- Clean up after tests

### 2. Descriptive Names
```typescript
// ✅ Good
it('displays error when login fails')

// ❌ Bad
it('test login')
```

### 3. Test User Behavior
Focus on what users see/do, not implementation:
```typescript
// ✅ Good
await page.click('text=Sign In');

// ❌ Bad (brittle)
await page.click('#auth-button-123');
```

### 4. Keep Tests Fast
- Mock external services
- Minimize network calls
- Use test data fixtures

### 5. Test Edge Cases
- Empty states
- Error conditions
- Boundary values
- Permission denied scenarios

## Mocking

### Firebase Mock
```typescript
vi.mock('@/lib/firebase/config', () => ({
  auth: {},
  db: {},
}));
```

### Next.js Router Mock
```typescript
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));
```

## CI/CD Integration

See `.github/workflows/test.yml` for CI configuration.

Tests run automatically on:
- Pull requests
- Push to main branch
- Nightly builds

## Debugging Tests

### Vitest
```bash
# Run specific test file
npx vitest auth.test.ts

# Run tests matching pattern
npx vitest --grep "auth"

# UI mode
npx vitest --ui
```

### Playwright
```bash
# Debug mode
npx playwright test --debug

# Headed mode
npm run test:e2e:headed

# Generate test
npx playwright codegen http://localhost:3000
```

## Coverage Goals

Current coverage targets:
- Overall: 80%
- Critical paths: 100%
- UI components: 70%

View coverage report:
```bash
npm run test:coverage
# Open: coverage/index.html
```

## Troubleshooting

### "Module not found" errors
```bash
# Ensure dependencies are installed
npm install
```

### Playwright browser issues
```bash
# Reinstall browsers
npm run playwright:install
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Tests timing out
- Increase timeout in config
- Check if dev server is running
- Verify network connectivity

## Future Additions

Planned test coverage:
- [ ] Judge0 code execution integration
- [ ] Firestore progress tracking
- [ ] WebSocket real-time updates
- [ ] Payment/subscription flows
- [ ] Admin dashboard features
- [ ] Performance benchmarks
- [ ] Accessibility audits
- [ ] Security testing

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

