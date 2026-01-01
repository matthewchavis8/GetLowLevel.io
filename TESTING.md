# 🧪 Testing GetLowLevel.io

This project has a comprehensive test suite covering unit tests and integration tests.

## Quick Start

```bash
# Run all unit tests
npm run test:unit

# Watch mode (recommended for development)
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all

# Coverage report
npm run test:coverage
```

## Test Structure

- **Test/Unit/** - Unit tests with Vitest (41 tests)
- **Test/Integration/** - E2E tests with Playwright
- **Test/fixtures/** - Test data and mocks
- **Test/helpers/** - Reusable test utilities

## Documentation

- 📘 **[Test/README.md](./Test/README.md)** - Comprehensive testing guide
- 🚀 **[Test/QUICKSTART.md](./Test/QUICKSTART.md)** - Quick reference
- ✅ **[Test/IMPLEMENTATION_COMPLETE.md](./Test/IMPLEMENTATION_COMPLETE.md)** - Setup summary

## Current Status

✅ **41 tests passing**  
✅ **0 linter errors**  
✅ **CI/CD configured**  
⏱️ **~1.13s execution time**

## Test Coverage

- ✅ Firebase Authentication
- ✅ Auth Context & State Management
- ✅ Question Data & Filtering
- ✅ Dashboard Pages (Problems, Questions, Leaderboard)
- ✅ Utility Functions
- 🔄 E2E User Flows (ready to run)

## Development Workflow

1. Start dev server: `npm run dev`
2. In another terminal: `npm run test:watch`
3. Write code - tests auto-run on save!

## Need Help?

See [Test/README.md](./Test/README.md) for comprehensive documentation.

