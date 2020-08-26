import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../../context/projects/ProjectContext';
import { useFormik } from 'formik';
import { TaskContext } from '../../context/tasks/TaskContext';
import taskFormStyles from '../../styles/components/task/TaskForm.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import messageStyles from '../../styles/Message.module.css';

const TaskForm = () => {
  const projectContext = useContext(ProjectContext);
  const {
    currentProject,
    projectLoading,
    projectError,
    updateProjectTasks
  } = projectContext;

  const taskContext = useContext(TaskContext);
  const {
    addTaskToProject,
    taskError,
    currentTask,
    resetCurrentTask,
    updateTask,
    tasks
  } = taskContext;

  const currentTaskHaveValues = Object.keys(currentTask).length > 0;
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: (values) => {
      // Add new task or update existing task
      if (currentTaskHaveValues) {
        updateTask({ ...currentTask, name: values.name });
        resetCurrentTask(); // When updated reset currentTask
      } else {
        addTaskToProject(currentProject.id, values.name);
      }
      formik.setValues({
        name: ''
      });
    }
  });

  useEffect(() => {
    // Update form if it is to add or edit tasks
    if (currentTaskHaveValues) {
      formik.setValues({
        name: currentTask.name
      });
    }
    if (!taskError) {
      // Update Tasks inside projects
      updateProjectTasks(currentProject.id, tasks);
    }
  }, [currentTask]);

  if (Object.keys(currentProject).length === 0) {
    return null;
  }

  return (
    <div className={taskFormStyles.tasksForm}>
      <form onSubmit={formik.handleSubmit}>
        <div className={taskFormStyles.containerInput}>
          <input
            type="text"
            className={taskFormStyles.inputText}
            placeholder="Task Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className={taskFormStyles.containerInput}>
          <button
            type="submit"
            className={`${buttonStyles.btn} ${buttonStyles.btnPrimary} ${buttonStyles.btnSubmit} ${buttonStyles.btnBlock}`}
          >
            {currentTaskHaveValues ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
      {formik.touched.name && formik.errors.name && (
        <p className={`${messageStyles.message} ${messageStyles.error}`}>
          Name is required
        </p>
      )}
      {taskError && (
        <p className={`${messageStyles.message} ${messageStyles.error}`}>
          {taskError}
        </p>
      )}
    </div>
  );
};

export default TaskForm;
