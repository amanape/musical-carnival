import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('should render App correctly', () => {
  render(<App />);
  expect(screen.getByText('Tasks')).toBeInTheDocument();
});

// Currently I can't get this test to pass because of my limited knowledge
// in spying on React components, specifically the useState hook.
it.todo('should filter tasks appropriately');
