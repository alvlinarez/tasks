import React, { useContext, useEffect } from 'react';
import taskStyles from '../../styles/components/task/Task.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import { TaskContext } from '../../context/tasks/TaskContext';
import { ProjectContext } from '../../context/projects/ProjectContext';

const Task = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const {
    removeTaskFromProject,
    updateTask,
    assignCurrentTask,
    tasks
  } = taskContext;

  const projectContext = useContext(ProjectContext);
  const { currentProject, updateProjectTasks } = projectContext;

  const handleChangeStateTask = () => {
    updateTask({
      ...task,
      state: !task.state
    });
  };

  const handleEditTask = () => {
    // AssignCurrentTask to show the form of updating task
    assignCurrentTask(task);
  };

  const handleDeleteTask = () => {
    removeTaskFromProject(currentProject.id, task);
  };

  useEffect(() => {
    // Update Tasks inside projects
    updateProjectTasks(currentProject.id, tasks);
  }, [tasks]);

  return (
    <li className={`${taskStyles.tasks} ${taskStyles.shadow}`}>
      <p>{task.name}</p>
      <div className={taskStyles.state}>
        {task.state ? (
          <button
            className={taskStyles.complete}
            onClick={handleChangeStateTask}
          >
            Complete
          </button>
        ) : (
          <button
            className={taskStyles.incomplete}
            onClick={handleChangeStateTask}
          >
            Incomplete
          </button>
        )}
      </div>
      <div className={taskStyles.actions}>
        <button
          type="button"
          className={`${taskStyles.btn} ${buttonStyles.btn} ${buttonStyles.btnPrimary}`}
          onClick={handleEditTask}
        >
          Edit
        </button>
        <button
          type="button"
          className={`${taskStyles.btn} ${buttonStyles.btn} ${buttonStyles.btnSecondary}`}
          onClick={handleDeleteTask}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
