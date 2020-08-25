import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../context/projects/ProjectContext';
import { useFormik } from 'formik';
import { TaskContext } from '../../context/tasks/TaskContext';
import taskFormStyles from '../../styles/components/task/TaskForm.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import messageStyles from '../../styles/Message.module.css';

const TaskForm = () => {
  const [showForm, setShowForm] = useState(false);

  const projectContext = useContext(ProjectContext);
  const { currentProject, projectLoading, projectError } = projectContext;

  const taskContext = useContext(TaskContext);
  const { addTaskToProject, taskError } = taskContext;

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: (values) => {
      addTaskToProject(currentProject.id, values.name);
      formik.setValues({ name: '' });
    }
  });

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
            Add Task
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
