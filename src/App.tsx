import React, { useState } from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskInputBar from './components/TaskInputBar/TaskInputBar';
import { useTodoContext } from './context/TodoContext';

import './sass/main.scss';
import useCycle from './hooks/useCycle';
import { ITask } from './shared/types';

interface AppProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'tasks'>
}

const App: React.FC<AppProps> = ({ useTodoContextHook = useTodoContext }) => {
  const [filterComplete, setFilterComplete] = useState(false);
  const [sortOption, cycle] = useCycle(['default', 'desc', 'asc']);

  const { tasks } = useTodoContextHook();

  // Filter out completed tasks.
  const sortedTasks = filterComplete ? tasks.filter((task) => !task.completed) : ([] as ITask[]).concat(tasks);
  sortedTasks.sort((a, b) => (
    sortOption === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  ));

  return (
    <div className="App">
      <TaskInputBar />
      <div className="task-container">
        <button type="button" aria-label="Sort tasks" onClick={cycle}>
          Tasks
        </button>
        <TaskList tasks={sortOption === 'default' ? tasks : sortedTasks} />
      </div>
      <div>
        <label htmlFor="filter-complete">
          Hide completed
          <input type="checkbox" id="filter-complete" onChange={() => setFilterComplete((prevState) => !prevState)} />
        </label>
      </div>
    </div>
  );
};

// Explicitly set defaultProps since useTodoContextHook is optional.
App.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default App;
