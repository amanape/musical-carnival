import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('should render App correctly', () => {
  render(<App />);
  expect(screen.getByText('Your Tasks')).toBeInTheDocument();
});
