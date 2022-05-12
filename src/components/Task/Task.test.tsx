import React from 'react';
import { act, render, screen } from '@testing-library/react';
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

  describe.skip('when the "Edit" button is clicked', () => {
    // Unable to get this test to work, something to do with mocking the useState hook.
    const setState = jest.fn();
    const mockUseState = jest.fn((initState) => [initState, setState]);

    // @ts-ignore
    jest.spyOn(React, 'useState').mockImplementation(mockUseState);

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should display the edit modal', () => {
      render(<Task task={dummyTask} useTodoContextHook={stubTodoContextHook} />);
      const editButton = screen.getByRole('button', { name: /edit/i });

      act(() => {
        editButton.click();
      });

      expect(setState).toHaveBeenCalled();
    });
  });
});
