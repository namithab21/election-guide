import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../src/app/page';

// Mock components that might cause issues in jsdom
vi.mock('@/components/BentoDashboard', () => ({
  BentoDashboard: () => <div data-testid="bento">Bento Dashboard</div>,
}));

vi.mock('@/components/ChatAssistant', () => ({
  ChatAssistant: () => <div data-testid="chat">Chat</div>,
}));

describe('Main Landing Page', () => {
  it('renders the brand name', () => {
    render(<Home />);
    expect(screen.queryAllByText(/Desh/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Ka/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/Vote/i).length).toBeGreaterThan(0);
  });

  it('contains the personalized guide section', () => {
    render(<Home />);
    expect(screen.getByText(/Personalized Guide/i)).toBeDefined();
  });
});
