import React, { useReducer } from 'react';
import ProjectReducer from './ProjectReducer';
import { axiosClient } from '../../config/axios';
import { ProjectContext } from './ProjectContext';
import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  ASSIGN_CURRENT_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  PROJECT_LOADING,
  RESET_PROJECT_STATE,
  UPDATE_PROJECT_TASKS_ERROR,
  UPDATE_PROJECT_TASKS
} from '../../types/projectTypes';

export const ProjectState = ({ children }) => {
  const initialState = {
    projects: null,
    currentProject: {},
    projectLoading: false,
    projectError: null
  };
  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  const getProjects = async () => {
    dispatch({
      type: PROJECT_LOADING
    });
    try {
      const { data } = await axiosClient().get('project');
      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: data.projects
      });
    } catch (e) {
      dispatch({
        type: GET_PROJECTS_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const assignCurrentProject = (project) => {
    dispatch({
      type: ASSIGN_CURRENT_PROJECT,
      payload: project
    });
  };

  const createProject = async (name) => {
    dispatch({
      type: PROJECT_LOADING
    });
    try {
      const { data } = await axiosClient().post('project', { name });
      dispatch({
        type: ADD_PROJECT_SUCCESS,
        payload: data.project
      });
    } catch (e) {
      dispatch({
        type: ADD_PROJECT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const updateProjectTasks = (projectId, tasks) => {
    if (!projectId || !tasks) {
      dispatch({
        type: UPDATE_PROJECT_TASKS_ERROR,
        payload: 'Project tasks invalid'
      });
    } else {
      dispatch({
        type: UPDATE_PROJECT_TASKS,
        payload: {
          projectId,
          tasks
        }
      });
    }
  };

  const deleteProject = async ({ id }) => {
    dispatch({
      type: PROJECT_LOADING
    });
    try {
      await axiosClient().delete(`project/${id}`);
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: id
      });
    } catch (e) {
      dispatch({
        type: DELETE_PROJECT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        currentProject: state.currentProject,
        projectLoading: state.projectLoading,
        projectError: state.projectError,
        getProjects,
        assignCurrentProject,
        createProject,
        updateProjectTasks,
        deleteProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
