import React from 'react';

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
