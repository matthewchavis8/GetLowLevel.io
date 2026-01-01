import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProblemsPage from '@/app/dashboard/problems/page';

// Mock Firebase and auth
vi.mock('@/lib/firebase/config', () => ({
  db: {},
  auth: {},
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  increment: vi.fn(),
  getDoc: vi.fn(() => Promise.resolve({ 
    exists: () => true,
    data: () => ({ completedQuestions: [] })
  })),
  arrayUnion: vi.fn(),
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { uid: 'test-uid', email: 'test@test.com' },
    loading: false,
  }),
}));

describe('ProblemsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the question title', () => {
    render(<ProblemsPage />);
    expect(screen.getByText('Bodyguard')).toBeInTheDocument();
  });

  it('renders the question description', () => {
    render(<ProblemsPage />);
    expect(screen.getByText(/Observe the code snippet below/i)).toBeInTheDocument();
  });

  it('renders the code block', () => {
    render(<ProblemsPage />);
    expect(screen.getByText(/int main/)).toBeInTheDocument();
  });

  it('renders all answer options', () => {
    render(<ProblemsPage />);
    
    expect(screen.getByText(/The program will compile and run successfully/i)).toBeInTheDocument();
    expect(screen.getByText(/Warning only: the compiler warns/i)).toBeInTheDocument();
    expect(screen.getByText(/Runtime error: program crashes/i)).toBeInTheDocument();
    expect(screen.getByText(/Compilation error: multiple definition/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ProblemsPage />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<ProblemsPage />);
    
    expect(screen.getByText("I'm Cooked")).toBeInTheDocument();
    expect(screen.getByText('Random Question')).toBeInTheDocument();
  });
});

