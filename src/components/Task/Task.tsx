import React from 'react';
import './Task.scss';

export interface ITask {
  id: string;
  title: string;
}

const Task: React.FC<{ title: string }> = ({ title }) => (
  <li>
    <input type="checkbox" />
    <span>{title}</span>
    <div>
      <button type="button">Edit</button>
      <button type="button">Delete</button>
    </div>
  </li>
);

export default Task;
