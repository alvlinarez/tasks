import React, { useReducer } from 'react';
import { TaskContext } from './TaskContext';
import TaskReducer from './TaskReducer';
import {
  ADD_TASK_ERROR,
  ADD_TASK_SUCCESS,
  ASSIGN_CURRENT_TASK,
  REMOVE_TASK_ERROR,
  REMOVE_TASK_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_SUCCESS,
  TASK_LOADING,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
  ASSIGN_CURRENT_TASK_ERROR,
  RESET_CURRENT_TASK
} from '../../types/taskTypes';
import { axiosClient } from '../../config/axios';

const TaskState = ({ children }) => {
  const initialState = {
    tasks: [],
    currentTask: {}, // taskToEdit
    taskLoading: false,
    taskError: null
  };
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getTasks = async (tasks) => {
    if (tasks === null || tasks === undefined) {
      dispatch({
        type: GET_TASKS_ERROR,
        payload: 'An unexpected error happened.'
      });
    }
    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: tasks
    });
  };

  const addTaskToProject = async (projectId, nameTask) => {
    dispatch({
      type: TASK_LOADING
    });
    try {
      const { data } = await axiosClient().put(`project/${projectId}/addTask`, {
        name: nameTask
      });
      dispatch({
        type: ADD_TASK_SUCCESS,
        payload: data.taskAdded
      });
    } catch (e) {
      dispatch({
        type: ADD_TASK_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const removeTaskFromProject = async (projectId, task) => {
    dispatch({
      type: TASK_LOADING
    });
    try {
      await axiosClient().put(`project/${projectId}/removeTask`, {
        taskId: task.id
      });
      dispatch({
        type: REMOVE_TASK_SUCCESS,
        payload: task
      });
    } catch (e) {
      dispatch({
        type: REMOVE_TASK_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const assignCurrentTask = (task) => {
    if (!task) {
      dispatch({
        type: ASSIGN_CURRENT_TASK_ERROR,
        payload: 'Error to get task to edit'
      });
    }
    dispatch({
      type: ASSIGN_CURRENT_TASK,
      payload: task
    });
  };

  const resetCurrentTask = () => {
    dispatch({
      type: RESET_CURRENT_TASK
    });
  };

  const updateTask = async (task) => {
    const { id, name, state } = task;
    dispatch({
      type: TASK_LOADING
    });
    try {
      const { data } = await axiosClient().put(`task/${id}`, { name, state });
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: data.task
      });
    } catch (e) {
      dispatch({
        type: UPDATE_TASK_ERROR,
        payload: e.response.data.error
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        taskLoading: state.taskLoading,
        taskError: state.taskError,
        currentTask: state.currentTask,
        getTasks,
        addTaskToProject,
        removeTaskFromProject,
        assignCurrentTask,
        resetCurrentTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
