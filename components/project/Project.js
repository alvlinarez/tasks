import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../../context/projects/ProjectContext';
import { TaskContext } from '../../context/tasks/TaskContext';
import buttonStyles from '../../styles/Buttons.module.css';

const Project = ({ project }) => {
  const { name } = project;

  const projectContext = useContext(ProjectContext);
  const { assignCurrentProject } = projectContext;

  const taskContext = useContext(TaskContext);
  const { getTasks } = taskContext;

  const handleClick = () => {
    // when project is selecte, retrieve tasks of that projects to the state
    assignCurrentProject(project);
    getTasks(project.tasks);
  };

  return (
    <li>
      <button
        type="button"
        className={`${buttonStyles.btn} ${buttonStyles.btnBlank}`}
        onClick={handleClick}
      >
        {name}
      </button>
    </li>
  );
};

export default Project;
