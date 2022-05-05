import React from 'react';

const TaskInputBar: React.FC = () => (
  <div>
    <input type="text" placeholder="Add a task..." />
    <button type="submit" className="btn-create">Create Task</button>
  </div>
);

export default TaskInputBar;
