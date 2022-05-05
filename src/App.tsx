import React from 'react';
import { nanoid } from 'nanoid';
import TaskList from './components/TaskList/TaskList';
import TaskInputBar from './components/TaskInputBar/TaskInputBar';

import './sass/main.scss';
import { ITask } from './shared/types';

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
  <div className="App">
    <TaskInputBar />
    <div className="task-container">
      <strong>Tasks</strong>
      <TaskList tasks={DUMMY_TASKS} />
    </div>
    <div>
      <label htmlFor="filter-complete">
        Hide completed
        <input type="checkbox" id="filter-complete" />
      </label>
    </div>
  </div>
);

export default App;
