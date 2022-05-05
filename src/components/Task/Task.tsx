import React from 'react';

export interface ITask {
  id: string;
  title: string;
}

const Task: React.FC<{ title: string }> = ({ title }) => (
  <li className="task">
    <input type="checkbox" />
    <span>{title}</span>
    <div>
      <button type="button" className="btn-edit">Edit</button>
      <button type="button" className="btn-delete">Delete</button>
    </div>
  </li>
);

export default Task;
