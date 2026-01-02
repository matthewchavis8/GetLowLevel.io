import { vi } from 'vitest';

export const mockFirebaseAuth = (config: { signedIn?: boolean; user?: any } = {}) => {
  const mockUser = config.user || {
    uid: 'test-uid',
    email: 'test@example.com',
    displayName: 'Test User',
  };

  return {
    currentUser: config.signedIn ? mockUser : null,
    onAuthStateChanged: vi.fn((callback) => {
      callback(config.signedIn ? mockUser : null);
      return vi.fn();
    }),
    signInWithPopup: vi.fn().mockResolvedValue({ user: mockUser }),
    signOut: vi.fn().mockResolvedValue(undefined),
  };
};

export const mockFirestore = () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
});

