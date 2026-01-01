# Test Fixtures

This directory contains test data and fixtures for the test suite.

## Structure

```
fixtures/
├── questions/          # Sample question data
├── users/             # Mock user data
└── responses/         # Mock API responses
```

## Usage

Import fixtures in your tests:

```typescript
import { mockQuestion } from './fixtures/questions/sample';

describe('Question Display', () => {
  it('renders question correctly', () => {
    render(<Question data={mockQuestion} />);
    // assertions...
  });
});
```

## Guidelines

1. Keep fixtures minimal and focused
2. Use realistic data that represents edge cases
3. Document any special characteristics
4. Version control fixtures for reproducibility

