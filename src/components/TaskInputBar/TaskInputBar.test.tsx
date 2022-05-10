import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskInputBar from './TaskInputBar';

describe('TaskInputBar', () => {
  const addTask = jest.fn();
  const stubTodoContextHook = () => ({
    addTask,
  });
  describe('when "Create Task" button is clicked', () => {
    it('should call addTask function (should create a new task)', () => {
      const { getByRole } = render(<TaskInputBar useTodoContextHook={stubTodoContextHook} />);
      const searchInput = getByRole('textbox', { name: /create a new task/i });
      const button = getByRole('button', { name: /create task/i });

      userEvent.type(searchInput, 'test');
      userEvent.click(button);

      expect(addTask).toHaveBeenCalled();
    });

    it('should clear the input field', () => {
      const { getByRole } = render(<TaskInputBar useTodoContextHook={stubTodoContextHook} />);
      const searchInput = getByRole('textbox', { name: /create a new task/i }) as HTMLInputElement;
      const button = getByRole('button', { name: /create task/i });

      userEvent.type(searchInput, 'test');
      userEvent.click(button);

      expect(searchInput.value).toBe('');
    });

    it('should not call addTask function if input is empty', () => {
      const { getByRole } = render(<TaskInputBar useTodoContextHook={stubTodoContextHook} />);
      const button = getByRole('button', { name: /create task/i });

      userEvent.click(button);

      expect(addTask).not.toHaveBeenCalled();
    });
  });

  describe('when the Enter key is pressed', () => {
    it('should call addTask function', () => {
      const { getByRole } = render(<TaskInputBar useTodoContextHook={stubTodoContextHook} />);
      const searchInput = getByRole('textbox', { name: /create a new task/i });

      userEvent.type(searchInput, 'test{enter}');

      expect(addTask).toHaveBeenCalled();
    });
  });
});
