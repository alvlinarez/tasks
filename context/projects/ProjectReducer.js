import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  PROJECT_LOADING,
  RESET_PROJECT_STATE,
  ASSIGN_CURRENT_PROJECT
} from '../../types/projectTypes';

const ProjectReducer = (state, action) => {
  switch (action.type) {
    case PROJECT_LOADING: {
      return {
        ...state,
        projectLoading: true
      };
    }
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        projectLoading: false,
        projectError: null
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projectLoading: false,
        projectError: null,
        projects: action.payload
      };
    case ASSIGN_CURRENT_PROJECT:
      return {
        ...state,
        projectLoading: false,
        projectError: null,
        currentProject: action.payload
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projectLoading: false,
        projectError: null,
        projects: state.projects.filter((item) => item.id === action.payload),
        currentProject: null
      };
    case CURRENT_PROJECT_ERROR:
    case ADD_PROJECT_ERROR:
    case GET_PROJECTS_ERROR:
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        projectLoading: false,
        projectError: action.payload
      };
    case RESET_PROJECT_STATE:
      return {
        ...state,
        projects: [],
        currentProject: {},
        projectError: null,
        projectLoading: false
      };
    default:
      return state;
  }
};

export default ProjectReducer;
