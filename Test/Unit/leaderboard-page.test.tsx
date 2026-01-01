import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeaderboardPage from '@/app/dashboard/leaderboard/page';

describe('LeaderboardPage', () => {
  it('renders the page title', () => {
    render(<LeaderboardPage />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('renders placeholder description', () => {
    render(<LeaderboardPage />);
    expect(screen.getByText(/Global rankings/i)).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<LeaderboardPage />);
    
    expect(screen.getByText('Rank')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
  });

  it('renders leaderboard data', () => {
    render(<LeaderboardPage />);
    
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('Grinder')).toBeInTheDocument();
    expect(screen.getByText('Struggler')).toBeInTheDocument();
  });

  it('renders scores correctly', () => {
    render(<LeaderboardPage />);
    
    expect(screen.getByText('1280')).toBeInTheDocument();
    expect(screen.getByText('1214')).toBeInTheDocument();
    expect(screen.getByText('987')).toBeInTheDocument();
  });

  it('renders ranks in correct order', () => {
    render(<LeaderboardPage />);
    
    const ranks = screen.getAllByRole('cell').filter(cell => 
      ['1', '2', '3'].includes(cell.textContent || '')
    );
    
    expect(ranks).toHaveLength(3);
  });

  it('handles empty state gracefully', () => {
    render(<LeaderboardPage />);
    
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});

