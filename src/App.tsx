import React from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskInputBar from './components/TaskInputBar/TaskInputBar';
import { useTodoContext } from './context/TodoContext';

import './sass/main.scss';
import { ITask } from './shared/types';

interface AppProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'tasks'>
}

const App: React.FC<AppProps> = ({ useTodoContextHook = useTodoContext }) => {
  const [filterComplete, setFilterComplete] = React.useState(false);
  const [filterSort, setFilterSort] = React.useState(false);

  const { tasks } = useTodoContextHook();

  // Filter out completed tasks.
  const filteredTasks = filterComplete ? tasks.filter((task) => !task.completed) : tasks;
  // Sort tasks by alphabetical order.
  const sortedTasks = filterSort
    ? ([] as ITask[]).concat(filteredTasks) // Create a copy of the array.
      .sort((a, b) => a.title.localeCompare(b.title))
    : filteredTasks;

  return (
    <div className="App">
      <TaskInputBar />
      <div className="task-container">
        <button type="button" onClick={() => setFilterSort((prevState) => !prevState)}>Tasks</button>
        <TaskList tasks={filterSort ? sortedTasks : filteredTasks} />
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
