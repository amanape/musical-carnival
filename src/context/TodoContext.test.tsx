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
    it('should add a task on addTask', () => {
      const { result } = renderHook(() => useTodoContext(), { wrapper });

      act(() => {
        result.current.addTask(Task);
      });

      expect(result.current.tasks).toEqual([Task]);
    });

    it('shouldnt add a task that already exists', () => {
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

  it('should remove a task on removeTask', () => {
    const { result } = renderHook(() => useTodoContext(), { wrapper });

    act(() => {
      result.current.addTask(Task);
    });
    act(() => {
      result.current.removeTask(Task.id);
    });

    expect(result.current.tasks).toEqual([]);
  });

  it.todo('should update a task on updateTask');

  it.todo('should remove a task on removeTask');

  it.todo('should clear all tasks on clearTasks');
});
