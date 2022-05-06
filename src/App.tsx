import React from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskInputBar from './components/TaskInputBar/TaskInputBar';

import './sass/main.scss';

const App = () => (
  <div className="App">
    <TaskInputBar />
    <div className="task-container">
      <strong>Tasks</strong>
      <TaskList />
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
