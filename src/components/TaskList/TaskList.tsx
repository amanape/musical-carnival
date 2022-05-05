import React from 'react';
import Task, { ITask } from '../Task/Task';

const TaskList: React.FC<{ tasks: ITask[] }> = ({ tasks }) => (
  <ol>
    {tasks.map(({ title, id }) => (
      <Task title={title} id={id} key={id} />
    ))}
  </ol>
);

export default TaskList;
