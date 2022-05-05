import React, { createContext, useContext, useMemo } from 'react';
import { ITask } from '../shared/types';

interface TodoContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, task: ITask) => void;
  clearTasks: () => void;
}

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export const TodoProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [tasks, setTasks] = React.useState<ITask[]>([]);

  const addTask = (task: ITask) => {
    if (tasks.find((t) => t.title === task.title)) return;
    setTasks([...tasks, task]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, task: ITask) => {
    console.log(id, task);
  };

  const clearTasks = () => {
    setTasks([]);
  };

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
