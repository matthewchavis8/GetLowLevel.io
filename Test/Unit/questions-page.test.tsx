import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionsPage from '@/app/dashboard/questions/page';

describe('QuestionsPage', () => {
  it('renders the page title', () => {
    render(<QuestionsPage />);
    expect(screen.getByText('Questions')).toBeInTheDocument();
  });

  it('renders placeholder description', () => {
    render(<QuestionsPage />);
    expect(screen.getByText(/Placeholder page/i)).toBeInTheDocument();
  });

  it('renders coming soon card', () => {
    render(<QuestionsPage />);
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });

  it('renders card description', () => {
    render(<QuestionsPage />);
    expect(screen.getByText(/plug in your real questions data/i)).toBeInTheDocument();
  });
});

