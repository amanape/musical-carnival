import React from 'react';
import { render, screen } from '@testing-library/react';
import Task from './Task';
import { ITask } from '../../shared/types';

describe('Task', () => {
  const removeTask = jest.fn();
  const updateTask = jest.fn();
  const stubTodoContextHook = () => ({
    removeTask,
    updateTask,
  });
  const dummyTask: ITask = {
    id: '1',
    title: 'test',
  };
  it('should output the correct task data', () => {
    render(<Task task={dummyTask} />);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  describe('when the "Delete" button is clicked', () => {
    it('should call removeTask', () => {
      render(<Task task={dummyTask} useTodoContextHook={stubTodoContextHook} />);
      const delButton = screen.getByRole('button', { name: 'Delete' });

      delButton.click();

      expect(removeTask).toHaveBeenCalledWith(dummyTask.id);
    });
  });

  describe('when the "Edit" button is clicked', () => {
    it('should display the edit modal', () => {
      render(<Task task={dummyTask} useTodoContextHook={stubTodoContextHook} />);
      const editButton = screen.getByRole('button', { name: 'Edit' });

      editButton.click();
    });
  });
});
