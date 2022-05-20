import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { useTodoContext } from '../../context/TodoContext';
import { ITask } from '../../shared/types';

interface TaskInputBarProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'addTask'>
}

const TaskInputBar: React.FC<TaskInputBarProps> = ({ useTodoContextHook = useTodoContext }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<'typeError' | 'defError' | null>(null);
  const { addTask } = useTodoContextHook();

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current?.value) {
      const task: ITask = { id: nanoid(), title: inputRef.current.value.trim(), completed: false };
      if (task) {
        try {
          addTask(task);
        } catch (e) {
          if (e instanceof TypeError) {
            setError('typeError');
          } else {
            setError('defError');
          }
        }
      }
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setError(null), 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <form onSubmit={onSubmitHandler} className="input-form">
      <input type="text" placeholder="Add a task..." aria-label="Create a new task" required ref={inputRef} />
      <button type="submit" aria-label="Create task" className="btn-create"><BsPlusLg /></button>
      {error === 'defError' && <p className="error">Task already exists.</p>}
      {error === 'typeError' && <p className="error">Task must be a valid text.</p>}
    </form>
  );
};

// Explicitly set defaultProps since useTodoContextHook is optional.
TaskInputBar.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default TaskInputBar;
