import {
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  ASSIGN_CURRENT_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
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
    case ASSIGN_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
        taskLoading: false,
        taskError: null
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        taskLoading: false,
        tasks: [...state.tasks, action.payload]
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        taskLoading: false,
        currentTask: action.payload,
        tasks: state.tasks.map((item) =>
          item.id === action.payload.id ? action.payload : item
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
