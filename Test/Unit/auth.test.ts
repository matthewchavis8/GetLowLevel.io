import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signInWithGoogle, signInWithGithub, logout } from '@/lib/firebase/auth';
import { signInWithPopup, signOut } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  GithubAuthProvider: vi.fn(),
}));

vi.mock('@/lib/firebase/config', () => ({
  auth: {},
}));

describe('Firebase Auth Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signInWithGoogle', () => {
    it('successfully signs in with Google', async () => {
      const mockUser = { uid: 'test-uid', email: 'test@example.com' };
      (signInWithPopup as any).mockResolvedValue({ user: mockUser });

      const user = await signInWithGoogle();

      expect(user).toEqual(mockUser);
      expect(signInWithPopup).toHaveBeenCalledTimes(1);
    });

    it('throws error when sign in fails', async () => {
      const mockError = new Error('Auth failed');
      (signInWithPopup as any).mockRejectedValue(mockError);

      await expect(signInWithGoogle()).rejects.toThrow('Auth failed');
    });
  });

  describe('signInWithGithub', () => {
    it('successfully signs in with GitHub', async () => {
      const mockUser = { uid: 'github-uid', email: 'github@example.com' };
      (signInWithPopup as any).mockResolvedValue({ user: mockUser });

      const user = await signInWithGithub();

      expect(user).toEqual(mockUser);
      expect(signInWithPopup).toHaveBeenCalledTimes(1);
    });

    it('throws error when GitHub sign in fails', async () => {
      const mockError = new Error('GitHub auth failed');
      (signInWithPopup as any).mockRejectedValue(mockError);

      await expect(signInWithGithub()).rejects.toThrow('GitHub auth failed');
    });
  });

  describe('logout', () => {
    it('successfully logs out', async () => {
      (signOut as any).mockResolvedValue(undefined);

      await logout();

      expect(signOut).toHaveBeenCalledTimes(1);
    });

    it('throws error when logout fails', async () => {
      const mockError = new Error('Logout failed');
      (signOut as any).mockRejectedValue(mockError);

      await expect(logout()).rejects.toThrow('Logout failed');
    });
  });
});

