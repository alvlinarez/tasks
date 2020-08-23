import React from 'react';
import taskListStyles from '../../styles/components/task/TaskList.module.css';
import Task from './Task';

const TaskList = () => {
  return (
    <>
      <h2>Project: Ga</h2>
      <ul className={taskListStyles.tasksList}>
        <Task />
      </ul>
    </>
  );
};

export default TaskList;
