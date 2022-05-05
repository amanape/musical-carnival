import React from 'react';
import Task from '../Task/Task';
import { ITask } from '../../shared/types';

const TaskList: React.FC<{ tasks: ITask[] }> = ({ tasks }) => (
  <ol>
    {tasks.map(({ title, id }) => (
      <Task title={title} id={id} key={id} />
    ))}
  </ol>
);

export default TaskList;
