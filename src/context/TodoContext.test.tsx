import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { TodoProvider, useTodoContext } from './TodoContext';
import { ITask } from '../shared/types';

describe('TodoContext', () => {
  const wrapper = ({ children }: React.PropsWithChildren<{}>) => (
    <TodoProvider>{children}</TodoProvider>
  );
  const dummyTask: ITask = {
    id: '2',
    title: 'test',
  };

  describe('addTask', () => {
    it('should add a task on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(dummyTask);
      });

      expect(result.current.tasks).toEqual([dummyTask]);
    });

    it('shouldn\'t add a task that already exists', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });
      act(() => {
        result.current.addTask(dummyTask);
      });

      act(() => {
        result.current.addTask(dummyTask);
      });

      expect(result.current.tasks).toEqual([dummyTask]);
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

      expect(result.current.tasks).toEqual([]);
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

      expect(result.current.tasks).toEqual([{ ...dummyTask, title: 'test2' }]);
    });
  });

  describe('clearTasks', () => {
    it('should remove all tasks on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(dummyTask);
      });
      act(() => {
        result.current.clearTasks();
      });

      expect(result.current.tasks).toEqual([]);
    });
  });
});
