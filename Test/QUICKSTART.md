# Test Quick Start Guide

## First Time Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright browsers**
   ```bash
   npm run playwright:install
   ```

## Running Tests

### Quick Test Commands

```bash
# Run all unit tests (fast)
npm run test:unit

# Run with watch mode (recommended for development)
npm run test:watch

# Run e2e tests
npm run test:e2e

# Run all tests
npm run test:all
```

### Development Workflow

1. **Write your code**
2. **Run tests in watch mode** (auto-runs on file save)
   ```bash
   npm run test:watch
   ```
3. **Before committing, run all tests**
   ```bash
   npm run test:all
   ```

## Common Issues

### Port 3000 already in use
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9
```

### Playwright fails to start
```bash
# Reinstall browsers
npm run playwright:install
```

### Tests fail with "module not found"
```bash
# Clean install
rm -rf node_modules
npm install
```

## Test Examples

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest';

describe('MyFunction', () => {
  it('returns expected value', () => {
    expect(myFunction()).toBe('expected');
  });
});
```

### Integration Test Example
```typescript
import { test, expect } from '@playwright/test';

test('user can navigate to page', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
```

## Next Steps

- Read full documentation: `Test/README.md`
- View CI configuration: `.github/workflows/test.yml`
- Check test helpers: `Test/helpers/`

