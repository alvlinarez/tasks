import React, { useContext } from 'react';
import Task from './Task';
import { ProjectContext } from '../../context/projects/ProjectContext';
import { TaskContext } from '../../context/tasks/TaskContext';
import taskListStyles from '../../styles/components/task/TaskList.module.css';
import buttonStyles from '../../styles/Buttons.module.css';

const TaskList = () => {
  const projectContext = useContext(ProjectContext);
  const { currentProject, deleteProject } = projectContext;

  const taskContext = useContext(TaskContext);
  const { tasks, resetCurrentTask } = taskContext;

  if (Object.keys(currentProject).length === 0) {
    return <h2>Select one project</h2>;
  }

  const handleDeleteProject = () => {
    deleteProject(currentProject);
    resetCurrentTask(); // reset CurrentTask to edit when delete project
  };

  return (
    <>
      <h2>Project: {currentProject.name}</h2>
      <ul className={taskListStyles.tasksList}>
        {tasks.length === 0 ? (
          <li className={taskListStyles.tasks}>
            <p>There are no tasks!</p>
          </li>
        ) : (
          tasks.map((task) => <Task key={task.id} task={task} />)
        )}
      </ul>
      <button
        type="button"
        className={`${buttonStyles.btn} ${buttonStyles.btnDelete}`}
        onClick={handleDeleteProject}
      >
        Delete Project &times;
      </button>
    </>
  );
};

export default TaskList;
