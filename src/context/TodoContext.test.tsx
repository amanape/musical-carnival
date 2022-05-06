import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { TodoProvider, useTodoContext } from './TodoContext';
import { ITask } from '../shared/types';

describe('TodoContext', () => {
  // eslint-disable-next-line max-len
  const wrapper = ({ children }: React.PropsWithChildren<{}>) => <TodoProvider>{children}</TodoProvider>;
  // Dummy data
  const Task: ITask = {
    id: '2',
    title: 'test',
  };

  describe('addTask', () => {
    it('should add a task on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(Task);
      });

      expect(result.current.tasks).toEqual([Task]);
    });

    it('shouldn\'t add a task that already exists', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });
      act(() => {
        result.current.addTask(Task);
      });

      act(() => {
        result.current.addTask(Task);
      });

      expect(result.current.tasks).toEqual([Task]);
    });
  });

  describe('removeTask', () => {
    it('should remove a task on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(Task);
      });
      act(() => {
        result.current.removeTask(Task.id);
      });

      expect(result.current.tasks).toEqual([]);
    });
  });

  describe('updateTask', () => {
    it('should update a task on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(Task);
      });
      act(() => {
        result.current.updateTask(Task.id, { title: 'test2' });
      });

      expect(result.current.tasks).toEqual([{ ...Task, title: 'test2' }]);
    });
  });

  describe('clearTasks', () => {
    it('should remove all tasks on call', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(Task);
      });
      act(() => {
        result.current.clearTasks();
      });

      expect(result.current.tasks).toEqual([]);
    });
  });
});
