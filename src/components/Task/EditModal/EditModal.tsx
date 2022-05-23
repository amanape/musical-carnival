import React, { useEffect, useRef, useState } from 'react';
import { MdCancel, MdDone } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useTodoContext } from '../../../context/TodoContext';
import { buttonVariants, pVariants } from '../../../shared/variants';
import { InputError } from '../../../shared/types';

interface EditModalProps {
  taskId: string;
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'updateTask' | 'tasks'>
  modalCloseHandler: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ taskId, modalCloseHandler, useTodoContextHook = useTodoContext }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<InputError>(null);

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
        setError('defError');
      }
    } else if (!newTitle) setError('typeError');
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
      <AnimatePresence>
        {error && (
        <motion.p
          custom="x"
          variants={pVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="error"
        >
          {error === 'defError' && 'Task already exists.'}
          {error === 'typeError' && 'Task cannot be empty.'}
        </motion.p>
        )}
      </AnimatePresence>
      <label htmlFor="edit-task-input">
        <input type="text" id="edit-task-input" ref={inputRef} />
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
