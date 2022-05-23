import React, { useEffect, useRef, useState } from 'react';
import { MdCancel, MdDone } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useTodoContext } from '../../../context/TodoContext';
import { buttonVariants } from '../../../shared/variants';

interface EditModalProps {
  taskId: string;
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'updateTask' | 'tasks'>
  modalCloseHandler: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ taskId, modalCloseHandler, useTodoContextHook = useTodoContext }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<'typeError' | 'defError' | null>(null);

  const { updateTask, tasks } = useTodoContextHook();

  const currentTask = tasks.find(({ id }) => id === taskId);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = inputRef.current?.value.trim();
    if (newTitle && currentTask) {
      try {
        updateTask({ ...currentTask, title: newTitle });
        modalCloseHandler();
      } catch (e) {
        if (e instanceof TypeError) setError('typeError');
        else setError('defError');
      }
    }
  };

  useEffect(() => {
    if (currentTask && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = currentTask.title;
    }
  }, [currentTask]);

  useEffect(() => {
    const timeout = setTimeout(() => setError(null), 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <form onSubmit={submitHandler} className="edit-modal">
      {error === 'defError' && <p className="error">Task already exists.</p>}
      {error === 'typeError' && <p className="error">Task must be a valid text.</p>}
      <label htmlFor="edit-task-input">
        <input type="text" id="edit-task-input" required ref={inputRef} />
      </label>
      <div className="btn-container">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="submit"
          aria-label="Finish edit"
          className="btn-create"
        >
          <MdDone />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="button"
          aria-label="Cancel edit"
          className="btn-delete"
          onClick={modalCloseHandler}
        >
          <MdCancel />
        </motion.button>
      </div>
    </form>
  );
};

EditModal.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default EditModal;
