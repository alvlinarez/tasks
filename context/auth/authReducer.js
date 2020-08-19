import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  USER_AUTHENTICATED_ERROR,
  USER_AUTHENTICATED_SUCCESS,
  AUTH_LOADING,
  RESET_AUTH_MESSAGE,
  USER_NOT_AUTHENTICATED_SUCCESS
} from '../../types/authTypes';
// const initialState = {
//   user: {},
//   error: null,
//   authenticated: false,
//   message: null,
//   authLoading: false
// };

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        authLoading: false,
        error: null
      };
    }
    case USER_NOT_AUTHENTICATED_SUCCESS: {
      return {
        ...state,
        user: {},
        authenticated: false,
        authLoading: false,
        error: null
      };
    }
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
    case USER_AUTHENTICATED_ERROR:
    case SIGN_OUT_ERROR:
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
        authLoading: false
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
