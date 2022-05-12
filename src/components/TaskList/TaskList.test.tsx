import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import TaskList from './TaskList';
import { ITask } from '../../shared/types';

describe('TaskList', () => {
  describe('without tasks', () => {
    const tasks: ITask[] = [];

    it('should render empty message', () => {
      render(<TaskList tasks={tasks} />);
      expect(screen.getByText('No tasks yet')).toBeInTheDocument();
    });
  });

  describe('with tasks', () => {
    const tasks: ITask[] = [
      {
        id: '1',
        title: 'Task 1',
        completed: false,
      },
      {
        id: '2',
        title: 'Task 2',
        completed: false,
      },
    ];

    it('should render tasks', () => {
      render(<TaskList tasks={tasks} />);

      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });
});
