import React from 'react';
import Task, { ITask } from '../Task/Task';

const TaskList: React.FC<{ tasks: ITask[] }> = ({ tasks }) => (
  <ol>
    {tasks.map(({ id, title }) => (
      <Task title={title} key={id} />
    ))}
  </ol>
);

export default TaskList;
