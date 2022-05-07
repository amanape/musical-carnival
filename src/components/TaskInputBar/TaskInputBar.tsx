import React, { useRef } from 'react';
import { nanoid } from 'nanoid';
import { useTodoContext } from '../../context/TodoContext';
import { ITask } from '../../shared/types';

interface TaskInputBarProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'addTask'>
}

const TaskInputBar: React.FC<TaskInputBarProps> = ({ useTodoContextHook = useTodoContext }) => {
  const { addTask } = useTodoContextHook();
  const inputRef = useRef<HTMLInputElement>(null);

  const createTaskHandler = () => {
    if (inputRef.current && inputRef.current.value) {
      const task: ITask = { id: nanoid(), title: inputRef.current.value };
      if (task) addTask(task);
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <input type="text" placeholder="Add a task..." aria-label="Create a new task" ref={inputRef} />
      <button type="submit" className="btn-create" onClick={createTaskHandler}>Create Task</button>
    </div>
  );
};

// Explicitly set defaultProps since useTodoContextHook is optional.
TaskInputBar.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default TaskInputBar;
