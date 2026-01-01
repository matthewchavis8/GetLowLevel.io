import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProblemsPage from '@/app/dashboard/problems/page';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ProblemsPage', () => {
  it('renders the page title', () => {
    render(<ProblemsPage />);
    expect(screen.getByText('Problems')).toBeInTheDocument();
  });

  it('renders the placeholder description', () => {
    render(<ProblemsPage />);
    expect(screen.getByText(/Practice questions/i)).toBeInTheDocument();
  });

  it('renders featured section', () => {
    render(<ProblemsPage />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('renders sample topics', () => {
    render(<ProblemsPage />);
    
    expect(screen.getByText('Memory layout & pointers')).toBeInTheDocument();
    expect(screen.getByText('TCP flow control')).toBeInTheDocument();
    expect(screen.getByText('Struct vs class')).toBeInTheDocument();
    expect(screen.getByText('Cache locality')).toBeInTheDocument();
  });

  it('renders difficulty badges', () => {
    render(<ProblemsPage />);
    
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getAllByText('Medium').length).toBeGreaterThan(0);
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('renders link to explore page', () => {
    render(<ProblemsPage />);
    
    const links = screen.getAllByText('Browse tracks');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', '/dashboard/explore');
  });
});

