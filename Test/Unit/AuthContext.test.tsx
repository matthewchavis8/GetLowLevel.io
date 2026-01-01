import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  GithubAuthProvider: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));

vi.mock('@/lib/firebase/config', () => ({
  auth: {},
  db: {},
}));

// Mock the syncUserToFirestore function to prevent it from running
vi.mock('@/lib/firebase/auth', async () => {
  const actual = await vi.importActual('@/lib/firebase/auth');
  return {
    ...actual,
    syncUserToFirestore: vi.fn(),
  };
});

const TestComponent = () => {
  const { user, loading } = useAuth();
  return (
    <div>
      <div data-testid="loading">{loading ? 'loading' : 'not-loading'}</div>
      <div data-testid="user">{user ? user.email : 'no-user'}</div>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initially shows loading state', () => {
    let unsubscribe = vi.fn();
    (onAuthStateChanged as any).mockReturnValue(unsubscribe);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('loading');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });

  it('updates when user signs in', async () => {
    const mockUser = { uid: 'test-uid', email: 'test@example.com' };
    let authCallback: (user: any) => void;

    (onAuthStateChanged as any).mockImplementation((auth, callback) => {
      authCallback = callback;
      return vi.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    authCallback!(mockUser);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
    });
  });

  it('handles user sign out', async () => {
    let authCallback: (user: any) => void;

    (onAuthStateChanged as any).mockImplementation((auth, callback) => {
      authCallback = callback;
      return vi.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    authCallback!(null);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    });
  });

  it('returns context from provider', () => {
    // This test verifies that useAuth works correctly within a provider
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByTestId('user')).toBeInTheDocument();
  });

  it('cleans up subscription on unmount', () => {
    const unsubscribe = vi.fn();
    (onAuthStateChanged as any).mockReturnValue(unsubscribe);

    const { unmount } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});

