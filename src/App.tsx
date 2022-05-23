import React, { useState } from 'react';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { motion } from 'framer-motion';
import TaskList from './components/TaskList/TaskList';
import TaskInputBar from './components/TaskInputBar/TaskInputBar';
import { useTodoContext } from './context/TodoContext';
import { ITask } from './shared/types';
import useCycle from './hooks/useCycle/use-cycle';

import './sass/main.scss';

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
        <div className="task-button-container">
          <button type="button" aria-label="Sort tasks" onClick={cycle}>Tasks</button>
          {sortOption !== 'default' && (
            <>
                {sortOption === 'asc' && <AiOutlineSortAscending />}
                {sortOption === 'desc' && <AiOutlineSortDescending />}
            </>
          )}
        </div>
        <TaskList tasks={sortOption === 'default' ? filteredTasks : sortedTasks} />
      </div>
      <motion.label layout htmlFor="filter-complete">
        Hide completed
        <input type="checkbox" id="filter-complete" onChange={() => setFilterComplete((prevState) => !prevState)} />
      </motion.label>
    </div>
  );
};

// Explicitly set defaultProps since useTodoContextHook is optional.
App.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default App;
