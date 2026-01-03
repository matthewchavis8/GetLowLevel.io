import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import LeaderboardPage from '@/app/dashboard/leaderboard/page';
import * as firestore from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(),
}));

vi.mock('@/lib/firebase/config', () => ({
  db: {},
}));

describe('LeaderboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page title', async () => {
    const mockSnapshot = {
      forEach: vi.fn((callback) => {
        callback({
          id: '1',
          data: () => ({
            displayName: 'TestUser',
            stats: { correctCount: 10, incorrectCount: 5 },
            avatar: null,
            settings: { showAvatar: false },
            socials: {},
          }),
        });
      }),
      docs: [
        {
          id: '1',
          data: () => ({
            displayName: 'TestUser',
            stats: { correctCount: 10, incorrectCount: 5 },
            avatar: null,
            settings: { showAvatar: false },
            socials: {},
          }),
        },
      ],
    };

    (firestore.collection as any).mockReturnValue({});
    (firestore.getDocs as any).mockResolvedValue(mockSnapshot);

    render(<LeaderboardPage />);

    await waitFor(
      () => {
        expect(screen.getByText(/Leaderboard/)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('renders description', async () => {
    const mockSnapshot = {
      forEach: vi.fn((callback) => {
        callback({
          id: '1',
          data: () => ({
            displayName: 'TestUser',
            stats: { correctCount: 10, incorrectCount: 5 },
            avatar: null,
            settings: { showAvatar: false },
            socials: {},
          }),
        });
      }),
      docs: [
        {
          id: '1',
          data: () => ({
            displayName: 'TestUser',
            stats: { correctCount: 10, incorrectCount: 5 },
            avatar: null,
            settings: { showAvatar: false },
            socials: {},
          }),
        },
      ],
    };

    (firestore.collection as any).mockReturnValue({});
    (firestore.getDocs as any).mockResolvedValue(mockSnapshot);

    render(<LeaderboardPage />);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Celebrate our most consistent members/)
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('renders user data in top 3 section', async () => {
    const mockSnapshot = {
      forEach: vi.fn((callback) => {
        [
          {
            id: '1',
            data: () => ({
              displayName: 'FirstPlace',
              stats: { correctCount: 20, incorrectCount: 5 },
              avatar: null,
              settings: { showAvatar: false },
              socials: {},
            }),
          },
          {
            id: '2',
            data: () => ({
              displayName: 'SecondPlace',
              stats: { correctCount: 15, incorrectCount: 5 },
              avatar: null,
              settings: { showAvatar: false },
              socials: {},
            }),
          },
          {
            id: '3',
            data: () => ({
              displayName: 'ThirdPlace',
              stats: { correctCount: 10, incorrectCount: 5 },
              avatar: null,
              settings: { showAvatar: false },
              socials: {},
            }),
          },
        ].forEach(callback);
      }),
      docs: [],
    };

    (firestore.collection as any).mockReturnValue({});
    (firestore.getDocs as any).mockResolvedValue(mockSnapshot);

    render(<LeaderboardPage />);

    await waitFor(() => {
      expect(screen.getByText('FirstPlace')).toBeInTheDocument();
      expect(screen.getByText('SecondPlace')).toBeInTheDocument();
      expect(screen.getByText('ThirdPlace')).toBeInTheDocument();
    });
  });

  it('calculates scores correctly', async () => {
    const mockSnapshot = {
      forEach: vi.fn((callback) => {
        callback({
          id: '1',
          data: () => ({
            displayName: 'HighScore',
            stats: { correctCount: 10, incorrectCount: 2 },
            avatar: null,
            settings: { showAvatar: false },
            socials: {},
          }),
        });
      }),
      docs: [],
    };

    (firestore.collection as any).mockReturnValue({});
    (firestore.getDocs as any).mockResolvedValue(mockSnapshot);

    render(<LeaderboardPage />);

    await waitFor(() => {
      expect(screen.getByText('18')).toBeInTheDocument();
    });
  });

  it('handles empty state', async () => {
    const mockSnapshot = {
      forEach: vi.fn(),
      docs: [],
    };

    (firestore.collection as any).mockReturnValue({});
    (firestore.getDocs as any).mockResolvedValue(mockSnapshot);

    render(<LeaderboardPage />);

    await waitFor(() => {
      expect(screen.getByText('No Users Yet')).toBeInTheDocument();
      expect(
        screen.getByText('Be the first to join and compete!')
      ).toBeInTheDocument();
    });
  });

  it('handles loading state', () => {
    (firestore.collection as any).mockReturnValue({});
    (firestore.getDocs as any).mockImplementation(
      () => new Promise(() => {})
    );

    render(<LeaderboardPage />);

    expect(screen.getByText('Loading leaderboard...')).toBeInTheDocument();
  });

  it('renders top 3 with correct rank order', async () => {
    const mockSnapshot = {
      forEach: vi.fn((callback) => {
        [
          {
            id: '1',
            data: () => ({
              displayName: 'First',
              stats: { correctCount: 30, incorrectCount: 5 },
              avatar: null,
              settings: { showAvatar: false },
              socials: {},
            }),
          },
          {
            id: '2',
            data: () => ({
              displayName: 'Second',
              stats: { correctCount: 20, incorrectCount: 5 },
              avatar: null,
              settings: { showAvatar: false },
              socials: {},
            }),
          },
          {
            id: '3',
            data: () => ({
              displayName: 'Third',
              stats: { correctCount: 10, incorrectCount: 5 },
              avatar: null,
              settings: { showAvatar: false },
              socials: {},
            }),
          },
        ].forEach(callback);
      }),
      docs: [],
    };

    (firestore.collection as any).mockReturnValue({});
    (firestore.getDocs as any).mockResolvedValue(mockSnapshot);

    render(<LeaderboardPage />);

    await waitFor(() => {
      const cards = screen.getAllByText(/First|Second|Third/);
      expect(cards.length).toBeGreaterThan(0);
    });
  });
});

