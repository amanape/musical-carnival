import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditModal from './EditModal';

describe('EditModal', () => {
  const updateTask = jest.fn();
  const dummyTask = { id: '1', title: 'test', completed: false };
  const stubTodoContextHook = () => ({
    updateTask,
    tasks: [dummyTask],
  });
  const closeModal = jest.fn();

  describe('when "Cancel" button is clicked', () => {
    it('calls "closeModal"', () => {
      const { getByRole } = render(
        <EditModal taskId="1" modalCloseHandler={closeModal} useTodoContextHook={stubTodoContextHook} />,
      );
      const button = getByRole('button', { name: /cancel edit/i });

      userEvent.click(button);

      expect(closeModal).toHaveBeenCalled();
    });
  });

  describe('when "Done" button is clicked', () => {
    it('calls "updateTask" with the new data and calls "closeModal"', () => {
      const { getByRole } = render(
        <EditModal taskId="1" modalCloseHandler={closeModal} useTodoContextHook={stubTodoContextHook} />,
      );
      const input = getByRole('textbox');
      const button = getByRole('button', { name: /finish edit/i });

      userEvent.type(input, 'new task');
      userEvent.click(button);

      expect(updateTask).toHaveBeenCalledWith({ ...dummyTask, title: 'new task' });
      expect(closeModal).toHaveBeenCalled();
    });

    it.todo('Doesnt call "updateTask" if the input is empty or only whitespaces');
    it.todo('Doesnt call "updateTask" if the input title already exists');
  });
});
