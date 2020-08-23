import React from 'react';
import taskFormStyles from '../../styles/components/task/TaskForm.module.css';
import buttonStyles from '../../styles/Buttons.module.css';

const TaskForm = () => {
  return (
    <div className={taskFormStyles.tasksForm}>
      <form>
        <div className={taskFormStyles.containerInput}>
          <input
            type="text"
            className={taskFormStyles.inputText}
            placeholder="Task Name"
            name="name"
          />
        </div>
        <div className={taskFormStyles.containerInput}>
          <button
            type="submit"
            className={`${buttonStyles.btn} ${buttonStyles.btnPrimary} ${buttonStyles.btnSubmit} ${buttonStyles.btnBlock}`}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
