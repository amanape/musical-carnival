import React, { useState } from 'react';
import { ITask } from '../../shared/types';
import { useTodoContext } from '../../context/TodoContext';
import EditModal from './EditModal/EditModal';

interface TaskProps {
  task: ITask;
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'removeTask' | 'toggleTask'>
}

const Task: React.FC<TaskProps> = ({ task, useTodoContextHook = useTodoContext }) => {
  const [show, setShow] = useState(false);
  const { removeTask, toggleTask } = useTodoContextHook();
  const { id, title, completed } = task;

  return (
    <li className="task">
      <label htmlFor={`task-${id}`}>
        <input type="checkbox" id={`task-${id}`} onChange={() => toggleTask(id)} defaultChecked={completed} />
        <span>{title}</span>
      </label>
      {!show && (
      <div className="btn-container">
        <button type="button" className="btn-edit" onClick={() => setShow(true)}>Edit</button>
        <button type="button" className="btn-delete" onClick={() => removeTask(id)}>Delete</button>
      </div>
      )}
      {show && <EditModal taskId={id} modalCloseHandler={() => setShow(false)} />}
    </li>
  );
};

Task.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default Task;
