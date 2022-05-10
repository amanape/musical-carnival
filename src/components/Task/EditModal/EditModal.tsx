import React, { useRef } from 'react';
import { useTodoContext } from '../../../context/TodoContext';

interface EditModalProps {
  taskId: string;
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'updateTask'>
  modalCloseHandler: () => void;
}

// eslint-disable-next-line max-len
const EditModal: React.FC<EditModalProps> = ({ taskId, modalCloseHandler, useTodoContextHook = useTodoContext }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { updateTask } = useTodoContextHook();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTitle = inputRef.current?.value;
    if (newTitle) {
      updateTask({ id: taskId, title: newTitle });
      modalCloseHandler();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="edit-task-input">
        Edit task
        <input type="text" id="edit-task-input" ref={inputRef} />
      </label>
      <div className="btn-container">
        <button type="submit" className="btn-create">Done</button>
        <button type="button" className="btn-delete" onClick={modalCloseHandler}>Cancel</button>
      </div>
    </form>
  );
};

EditModal.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default EditModal;
