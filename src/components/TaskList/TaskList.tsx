import React from 'react';
import Task from '../Task/Task';
import { useTodoContext } from '../../context/TodoContext';

interface TaskListProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'tasks'>
}

const TaskList: React.FC<TaskListProps> = ({ useTodoContextHook = useTodoContext }) => {
  const tasks = useTodoContextHook().tasks || [];

  return (
    <ol>
      {tasks && tasks.map(({ title, id }) => (
        <Task title={title} id={id} key={id} />
      ))}
      {!tasks.length && <p>No tasks yet</p>}
    </ol>
  );
};

// Explicitly set defaultProps since useTodoContextHook is optional.
TaskList.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default TaskList;
