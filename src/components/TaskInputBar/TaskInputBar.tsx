import React, { FormEvent, useRef } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { useTodoContext } from '../../context/TodoContext';
import { ITask } from '../../shared/types';

interface TaskInputBarProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'addTask'>
}

const TaskInputBar: React.FC<TaskInputBarProps> = ({ useTodoContextHook = useTodoContext }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTask } = useTodoContextHook();

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current?.value) {
      const task: ITask = { id: nanoid(), title: inputRef.current.value, completed: false };
      if (task) addTask(task);
      inputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-form">
      <input type="text" placeholder="Add a task..." aria-label="Create a new task" ref={inputRef} />
      <button type="submit" aria-label="Add task" className="btn-create"><BsPlusLg /></button>
    </form>
  );
};

// Explicitly set defaultProps since useTodoContextHook is optional.
TaskInputBar.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default TaskInputBar;
