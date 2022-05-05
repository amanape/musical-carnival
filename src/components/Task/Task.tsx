import React from 'react';
import { ITask } from '../../shared/types';

const Task: React.FC<ITask> = ({ title, id }) => (
  <li className="task">
    <label htmlFor={id}>
      <input type="checkbox" id={id} />
      {title}
    </label>
    <div className="btn-container">
      <button type="button" className="btn-edit">Edit</button>
      <button type="button" className="btn-delete">Delete</button>
    </div>
  </li>
);

export default Task;
