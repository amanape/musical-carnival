import React from 'react';
import { nanoid } from 'nanoid';
import TaskList from './components/TaskList/TaskList';
import { ITask } from './components/Task/Task';
import TaskInputBar from './components/TaskInputBar/TaskInputBar';

import './sass/main.scss';

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
  <>
    <h1>Your Tasks</h1>
    <TaskInputBar />
    <div>
      <strong>Tasks</strong>
      <TaskList tasks={DUMMY_TASKS} />
    </div>
    <div>
      <label htmlFor="filter-complete">
        Hide completed
        <input type="checkbox" id="filter-complete" />
      </label>
    </div>
  </>
);

export default App;
