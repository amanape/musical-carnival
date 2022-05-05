import React from 'react';
import { render, screen } from '@testing-library/react';
import Task from './Task';

it('should output the correct task data', () => {
  render(<Task title="Complete challenge." id="1" />);
  expect(screen.getByText('Complete challenge.')).toBeInTheDocument();
});
