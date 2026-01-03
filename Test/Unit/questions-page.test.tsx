import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionsPage from '@/app/dashboard/questions/page';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('QuestionsPage', () => {
  const mockPush = vi.fn();
  const mockGet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (useSearchParams as any).mockReturnValue({ get: mockGet });
    (useTheme as any).mockReturnValue({ theme: 'dark' });
  });

  it('redirects to home when user is not authenticated', () => {
    (useAuth as any).mockReturnValue({ user: null, loading: false });
    mockGet.mockReturnValue(null);

    render(<QuestionsPage />);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('shows loading state while checking authentication', () => {
    (useAuth as any).mockReturnValue({ user: null, loading: true });
    mockGet.mockReturnValue(null);

    render(<QuestionsPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders default message when no playlist is selected', () => {
    (useAuth as any).mockReturnValue({
      user: { uid: 'test-user', email: 'test@example.com' },
      loading: false,
    });
    mockGet.mockReturnValue(null);

    render(<QuestionsPage />);

    expect(screen.getByText('Questions')).toBeInTheDocument();
    expect(
      screen.getByText('Select a playlist from the Explore page to view questions.')
    ).toBeInTheDocument();
  });

  it('renders problems page when valid playlist is provided', () => {
    (useAuth as any).mockReturnValue({
      user: { uid: 'test-user', email: 'test@example.com' },
      loading: false,
    });
    mockGet.mockReturnValue('os25');

    render(<QuestionsPage />);

    expect(screen.getByText('Operating System Problems')).toBeInTheDocument();
    expect(screen.getByText('Total Problems')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('renders filters and controls for valid playlist', () => {
    (useAuth as any).mockReturnValue({
      user: { uid: 'test-user', email: 'test@example.com' },
      loading: false,
    });
    mockGet.mockReturnValue('cpp50');

    render(<QuestionsPage />);

    expect(screen.getByText('C++ Problems')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search problem...')).toBeInTheDocument();
    expect(screen.getByText('All Topics')).toBeInTheDocument();
    expect(screen.getByText('All Languages')).toBeInTheDocument();
    expect(screen.getByText('All Difficulties')).toBeInTheDocument();
  });

  it('renders sidebar with stats and filters', () => {
    (useAuth as any).mockReturnValue({
      user: { uid: 'test-user', email: 'test@example.com' },
      loading: false,
    });
    mockGet.mockReturnValue('rust50');

    render(<QuestionsPage />);

    expect(screen.getByText('Quick Stats')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('AMD')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Nvidia')).toBeInTheDocument();
  });

  it('renders orderings section with options', () => {
    (useAuth as any).mockReturnValue({
      user: { uid: 'test-user', email: 'test@example.com' },
      loading: false,
    });
    mockGet.mockReturnValue('python50');

    render(<QuestionsPage />);

    expect(screen.getByText('Orderings')).toBeInTheDocument();
    expect(screen.getByText('Hell Ladder')).toBeInTheDocument();
    expect(screen.getByText('Heaven Ladder')).toBeInTheDocument();
  });
});

