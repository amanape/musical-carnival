import React from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskInputBar from './components/TaskInputBar/TaskInputBar';
import { useTodoContext } from './context/TodoContext';

import './sass/main.scss';

interface AppProps {
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'tasks'>
}

const App: React.FC<AppProps> = ({ useTodoContextHook = useTodoContext }) => {
  const [filter, setFilter] = React.useState(false);

  const { tasks } = useTodoContextHook();
  const filteredTasks = filter ? tasks.filter((task) => !task.completed) : tasks;

  return (
    <div className="App">
      <TaskInputBar />
      <div className="task-container">
        <strong>Tasks</strong>
        <TaskList tasks={filter ? filteredTasks : tasks} />
      </div>
      <div>
        <label htmlFor="filter-complete">
          Hide completed
          <input type="checkbox" id="filter-complete" onChange={() => setFilter((prevState) => !prevState)} />
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
