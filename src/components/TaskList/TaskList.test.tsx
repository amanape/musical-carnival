import React from 'react';
import { render, screen } from '@testing-library/react';
import { nanoid } from 'nanoid';
import TaskList from './TaskList';
import { ITask } from '../Task/Task';

it('should render all tasks correctly', () => {
  const allTasks: ITask[] = [
    {
      id: nanoid(),
      title: 'Task 1',
    },
    {
      id: nanoid(),
      title: 'Task 2',
    },
    {
      id: nanoid(),
      title: 'Task 3',
    },
  ];

  render(<TaskList tasks={allTasks} />);

  allTasks.forEach(({ title }) => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
