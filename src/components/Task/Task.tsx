import React from 'react';

export interface ITask {
  id: string;
  title: string;
}

const Task: React.FC<ITask> = ({ title, id }) => (
  <li className="task">
    <label htmlFor={id}>
      <input type="checkbox" id={id} />
      {title}
    </label>
    <div>
      <button type="button" className="btn-edit">Edit</button>
      <button type="button" className="btn-delete">Delete</button>
    </div>
  </li>
);

export default Task;
