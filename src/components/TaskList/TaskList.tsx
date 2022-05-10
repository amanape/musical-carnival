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
      {tasks && tasks.map((task) => (
        <Task task={task} key={task.id} />
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
