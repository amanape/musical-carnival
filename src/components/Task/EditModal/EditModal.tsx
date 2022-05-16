import React, { useRef } from 'react';
import { MdCancel, MdDone } from 'react-icons/md';
import { useTodoContext } from '../../../context/TodoContext';

interface EditModalProps {
  taskId: string;
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'updateTask' | 'tasks'>
  modalCloseHandler: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ taskId, modalCloseHandler, useTodoContextHook = useTodoContext }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { updateTask, tasks } = useTodoContextHook();

  const task = tasks.find(({ id }) => id === taskId);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTitle = inputRef.current?.value;
    if (newTitle && task) {
      updateTask({ ...task, title: newTitle });
      modalCloseHandler();
    }
  };

  return (
    <form onSubmit={submitHandler} className="edit-modal">
      <label htmlFor="edit-task-input">
        <input type="text" id="edit-task-input" ref={inputRef} />
      </label>
      <div className="btn-container">
        <button type="submit" aria-label="Finish edit" className="btn-create">
          <MdDone />
        </button>
        <button type="button" aria-label="Cancel edit" className="btn-delete" onClick={modalCloseHandler}>
          <MdCancel />
        </button>
      </div>
    </form>
  );
};

EditModal.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default EditModal;
