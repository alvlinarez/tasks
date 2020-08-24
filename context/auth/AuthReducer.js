import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  AUTH_LOADING,
  RESET_AUTH_MESSAGE
} from '../../types/authTypes';

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
        authLoading: false
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        authLoading: false,
        authenticated: true
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: {},
        error: null,
        message: action.payload,
        authLoading: false,
        authenticated: false
      };
    case RESET_AUTH_MESSAGE:
      return {
        ...state,
        message: null
      };
    case SIGN_OUT_ERROR:
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
        authLoading: false,
        message: null
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true
      };
    default:
      return state;
  }
};

export default authReducer;
