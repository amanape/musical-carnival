import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { motion } from 'framer-motion';
import { ITask } from '../../shared/types';
import { useTodoContext } from '../../context/TodoContext';
import EditModal from './EditModal/EditModal';
import { buttonVariants, lineThroughVariants, taskListVariants } from '../../shared/variants';

interface TaskProps {
  task: ITask;
  useTodoContextHook?: () => Pick<ReturnType<typeof useTodoContext>, 'removeTask' | 'toggleTask'>
}

const Task: React.FC<TaskProps> = ({ task, useTodoContextHook = useTodoContext }) => {
  const { id, title, completed } = task;
  const [showModal, setShowModal] = useState(false);
  const [taskComplete, setTaskCompleted] = useState(completed);
  const { removeTask, toggleTask } = useTodoContextHook();

  const toggleTaskHandler = () => {
    toggleTask(id);
    setTaskCompleted((prevState) => !prevState);
  };

  return (
    <motion.li
      variants={taskListVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      layout="position"
      className="task"
    >
      <label htmlFor={`task-${id}`}>
        <input type="checkbox" id={`task-${id}`} onChange={toggleTaskHandler} defaultChecked={taskComplete} />
        <span>
          <motion.div
            variants={lineThroughVariants}
            animate={taskComplete ? 'visible' : 'initial'}
            className="line-through"
          />
          {title}
        </span>
      </label>
      {!showModal && (
      <div className="btn-container">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="button"
          aria-label="Edit"
          className="btn-edit"
          onClick={() => setShowModal(true)}
        >
          <MdEdit />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="button"
          aria-label="Delete"
          className="btn-delete"
          onClick={() => removeTask(id)}
        >
          <MdDelete />
        </motion.button>
      </div>
      )}
      {showModal && <EditModal taskId={id} modalCloseHandler={() => setShowModal(false)} />}
    </motion.li>
  );
};

Task.defaultProps = {
  useTodoContextHook: useTodoContext,
};

export default Task;
