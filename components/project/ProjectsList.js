import React, { useContext, useEffect } from 'react';
import Project from './Project';
import { ProjectContext } from '../../context/projects/ProjectContext';
import { AlertContext } from '../../context/alerts/alertContext';
import projectsListStyles from '../../styles/components/project/ProjectsList.module.css';
import alertStyles from '../../styles/Alerts.module.css';

const ProjectsList = () => {
  const projectContext = useContext(ProjectContext);
  const { projects, errorProject, getProjects } = projectContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  useEffect(() => {
    if (errorProject) {
      showAlert(errorProject);
    }
    if (!projects) {
      getProjects();
    }
  }, [errorProject]);

  if (projects && projects.length === 0) {
    return <p>There are no projects. Start adding one!</p>;
  }

  return (
    <ul className={projectsListStyles.projectsList}>
      {alert && (
        <div className={`${alertStyles.alert} ${alertStyles.alertError}`}>
          {alert}
        </div>
      )}
      {projects &&
        projects.map((project) => (
          <Project
            project={project}
            key={project.id}
            classNames={projectsListStyles.projects}
          />
        ))}
    </ul>
  );
};

export default ProjectsList;
