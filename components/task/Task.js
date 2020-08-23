import React from 'react';
import taskStyles from '../../styles/components/task/Task.module.css';
import buttonStyles from '../../styles/Buttons.module.css';

const Task = () => {
  return (
    <li className={`${taskStyles.tasks} ${taskStyles.shadow}`}>
      <p>Task</p>
      <div className={taskStyles.state}>
        <button className={taskStyles.complete}>Complete</button>
      </div>
      <div className={taskStyles.actions}>
        <button
          type="button"
          className={`${buttonStyles.btn} ${buttonStyles.btnPrimary}`}
        >
          Edit
        </button>
        <button
          type="button"
          className={`${buttonStyles.btn} ${buttonStyles.btnSecondary}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
