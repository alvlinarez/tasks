import {
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  ASSIGN_CURRENT_TASK,
  ASSIGN_CURRENT_TASK_ERROR,
  RESET_CURRENT_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  REMOVE_TASK_SUCCESS,
  REMOVE_TASK_ERROR,
  TASK_LOADING,
  RESET_TASK_STATE
} from '../../types/taskTypes';

const TaskReducer = (state, action) => {
  switch (action.type) {
    case TASK_LOADING:
      return {
        ...state,
        taskLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        taskLoading: false,
        taskError: null
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        taskLoading: false,
        tasks: [...state.tasks, action.payload]
      };
    case ASSIGN_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload
      };
    case ASSIGN_CURRENT_TASK_ERROR:
      return {
        ...state,
        taskError: action.payload
      };
    case RESET_CURRENT_TASK:
      return {
        ...state,
        currentTask: {}
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        taskLoading: false,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case REMOVE_TASK_SUCCESS:
      return {
        ...state,
        taskLoading: false,
        tasks: state.tasks.filter((item) => item.id !== action.payload.id)
      };
    case ADD_TASK_ERROR:
    case GET_TASKS_ERROR:
    case UPDATE_TASK_ERROR:
    case REMOVE_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        taskLoading: false
      };
    case RESET_TASK_STATE:
      return {
        tasks: [],
        currentTask: {},
        taskLoading: false,
        taskError: null
      };
    default:
      return state;
  }
};

export default TaskReducer;
