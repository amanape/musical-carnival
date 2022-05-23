import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Task from '../Task/Task';
import { ITask } from '../../shared/types';

interface TaskListProps {
  tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const allTasks = tasks || [];

  return (
    <ol>
      <AnimatePresence initial={false}>
        {allTasks && allTasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </AnimatePresence>
      {!allTasks.length && <p>No tasks yet</p>}
    </ol>
  );
};

export default TaskList;
