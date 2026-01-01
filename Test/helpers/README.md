# Test Helpers

Utility functions and helpers for writing tests.

## Available Helpers

### `renderWithProviders`
Renders a component with all necessary providers (Auth, Theme, etc.)

```typescript
import { renderWithProviders } from './helpers/render';

it('renders with auth context', () => {
  renderWithProviders(<MyComponent />);
});
```

### `mockFirebaseAuth`
Creates a mock Firebase auth instance

```typescript
import { mockFirebaseAuth } from './helpers/firebase';

const auth = mockFirebaseAuth({ signedIn: true });
```

### `waitForLoadingToFinish`
Waits for loading states to complete

```typescript
import { waitForLoadingToFinish } from './helpers/async';

await waitForLoadingToFinish();
```

