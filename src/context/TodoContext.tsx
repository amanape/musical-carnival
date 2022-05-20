import React, {
  createContext, useContext, useMemo, useState, useEffect,
} from 'react';
import { ITask } from '../shared/types';
import { initialTasks } from '../shared/data';
import useLocalStorage from '../hooks/useLocalStorage/use-local-storage';

interface TodoContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (id: string) => void;
  updateTask: (task: ITask) => void;
  toggleTask: (id: string) => void;
}

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export const TodoProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', initialTasks);
  const [tasks, setTasks] = useState<ITask[]>(storedTasks);

  const addTask = (task: ITask) => {
    if (task.title.trim() === '') throw new TypeError('Task cannot be empty');
    if (tasks.find((t) => t.title === task.title)) throw new Error('Task already exists');
    setTasks([...tasks, task]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (task: ITask) => {
    if (task.title.trim() === '') throw new TypeError('Task cannot be empty');
    if (tasks.find((t) => t.title === task.title)) throw new Error('Task already exists');
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Store tasks in local storage on change
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  // Avoid 'value' object to be re-created on each render
  const value = useMemo(() => ({
    tasks,
    addTask,
    removeTask,
    updateTask,
    toggleTask,
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
