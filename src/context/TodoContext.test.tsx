import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { TodoProvider, useTodoContext } from './TodoContext';
import { ITask } from '../shared/types';
import { initialTasks } from '../shared/data';

describe('TodoContext', () => {
  const wrapper = ({ children }: React.PropsWithChildren<{}>) => (
    <TodoProvider>{children}</TodoProvider>
  );
  const dummyTask: ITask = {
    id: '42',
    title: 'test',
    completed: false,
  };

  describe('addTask', () => {
    it('should add a task on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });
      expect(result.current.tasks.length).toBe(initialTasks.length);

      act(() => {
        result.current.addTask(dummyTask);
      });

      expect(result.current.tasks).toEqual([...initialTasks, dummyTask]);
    });

    it('should throw an error if a task already exists', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(dummyTask);
      });

      expect(() => act(() => result.current.addTask(dummyTask))).toThrowError('Task already exists');
    });

    it('should throw an error if a task is whitespace', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      expect(
        () => act(() => result.current.addTask({ ...dummyTask, title: '   ' })),
      ).toThrowError('Task cannot be empty');
    });
  });

  describe('removeTask', () => {
    it('should remove a task on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(dummyTask);
      });
      act(() => {
        result.current.removeTask(dummyTask.id);
      });

      expect(result.current.tasks).toEqual(initialTasks);
    });
  });

  describe('updateTask', () => {
    it('should update a task on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(dummyTask);
      });
      act(() => {
        result.current.updateTask({ ...dummyTask, title: 'test2' });
      });

      expect(result.current.tasks).toEqual([...initialTasks, { ...dummyTask, title: 'test2' }]);
    });

    it('should throw an error if a task already exists', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(dummyTask);
      });

      expect(() => act(() => result.current.updateTask(dummyTask))).toThrowError('Task already exists');
    });

    it('should throw an error if a task is whitespace', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(dummyTask);
      });

      expect(
        () => act(() => result.current.updateTask({ ...dummyTask, title: '   ' })),
      ).toThrowError('Task cannot be empty');
    });
  });

  describe('toggleTask', () => {
    it('should toggle a task on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(dummyTask);
      });
      act(() => {
        result.current.toggleTask(dummyTask.id);
      });

      expect(result.current.tasks).toEqual([...initialTasks, { ...dummyTask, completed: true }]);

      act(() => {
        result.current.toggleTask(dummyTask.id);
      });

      expect(result.current.tasks).toEqual([...initialTasks, dummyTask]);
    });
  });
});
