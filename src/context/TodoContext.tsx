import React, { createContext, useContext, useMemo } from 'react';
import { ITask } from '../shared/types';

interface TodoContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (id: string) => void;
  updateTask: (task: ITask) => void;
  clearTasks: () => void;
}

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export const TodoProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [tasks, setTasks] = React.useState<ITask[]>([]);

  const addTask = (task: ITask) => {
    if (tasks.find((t) => t.title === task.title)) return; // Do not add duplicates
    setTasks([...tasks, task]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (task: ITask) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  // Avoid 'value' object to be re-created on each render
  const value = useMemo(() => ({
    tasks,
    addTask,
    removeTask,
    updateTask,
    clearTasks,
  }), [tasks]);

  return (
    <TodoContext.Provider
      value={value}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
