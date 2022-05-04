import React from 'react';
import { nanoid } from 'nanoid';
import TaskList from './components/TaskList/TaskList';
import { ITask } from './components/Task/Task';

const DUMMY_TASKS: ITask[] = [
  {
    id: nanoid(),
    title: 'Task 1',
  },
  {
    id: nanoid(),
    title: 'Task 2',
  },
  {
    id: nanoid(),
    title: 'Task 3',
  },
];

const App = () => (
  <TaskList tasks={DUMMY_TASKS} />
);

export default App;
