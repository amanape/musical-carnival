import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { AnimatePresence, motion } from 'framer-motion';
import { useTodoContext } from '../../context/TodoContext';
import { InputError, ITask } from '../../shared/types';
import { buttonVariants, pVariants } from '../../shared/variants';

interface TaskInputBarProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'addTask'>
}

const TaskInputBar: React.FC<TaskInputBarProps> = ({ useTodoContextHook = useTodoContext }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<InputError>(null);
  const { addTask } = useTodoContextHook();

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = inputRef.current?.value.trim();
    if (inputRef.current?.value && newTitle) {
      const task: ITask = { id: nanoid(), title: newTitle, completed: false };
      try {
        addTask(task);
      } catch (e) {
        setError('defError');
      }
    } else setError('typeError');
    inputRef.current!.value = '';
  };

  useEffect(() => {
    const timeout = setTimeout(() => setError(null), 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <form onSubmit={onSubmitHandler} className="input-form">
      <input type="text" placeholder="Add a task..." aria-label="Create a new task" ref={inputRef} />
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        type="submit"
        aria-label="Create task"
        className="btn-create"
      >
        <BsPlusLg />
      </motion.button>
      <AnimatePresence>
        {error && (
        <motion.p
          custom="y"
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
    </form>
  );
};

// Explicitly set defaultProps since useTodoContextHook is optional.
TaskInputBar.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default TaskInputBar;
