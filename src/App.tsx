import React, { useState } from 'react';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import TaskList from './components/TaskList/TaskList';
import TaskInputBar from './components/TaskInputBar/TaskInputBar';
import { useTodoContext } from './context/TodoContext';

import './sass/main.scss';
import useCycle from './hooks/use-cycle';
import { ITask } from './shared/types';

interface AppProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'tasks'>
}

const App: React.FC<AppProps> = ({ useTodoContextHook = useTodoContext }) => {
  const [filterComplete, setFilterComplete] = useState(false);
  const [sortOption, cycle] = useCycle(['default', 'desc', 'asc']);

  const { tasks } = useTodoContextHook();

  // Filter out completed tasks.
  const filteredTasks = filterComplete ? tasks.filter((task) => !task.completed) : tasks;
  const sortedTasks = ([] as ITask[]).concat(filteredTasks); // Clone array to avoid mutation
  sortedTasks.sort((a, b) => (
    sortOption === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  ));

  return (
    <div className="App">
      <TaskInputBar />
      <div className="task-container">
        <button type="button" aria-label="Sort tasks" className="task-button" onClick={cycle}>
          <span>Tasks</span>
          {sortOption !== 'default' && (
            <>
                {sortOption === 'asc' && <AiOutlineSortAscending />}
                {sortOption === 'desc' && <AiOutlineSortDescending />}
            </>
          )}
        </button>
        <TaskList tasks={sortOption === 'default' ? filteredTasks : sortedTasks} />
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
