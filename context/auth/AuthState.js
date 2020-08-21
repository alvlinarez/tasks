import React, { useReducer, useEffect } from 'react';
import authReducer from './authReducer';
import { axiosClient } from '../../config/axios';
import { AuthContext } from './authContext';
import {
  AUTH_LOADING,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  USER_AUTHENTICATED_ERROR,
  USER_AUTHENTICATED_SUCCESS,
  USER_NOT_AUTHENTICATED_SUCCESS
} from '../../types/authTypes';

export const AuthState = ({ user = {}, children }) => {
  const initialState = {
    user,
    error: null,
    authenticated: Object.keys(user).length > 0,
    message: null,
    authLoading: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async ({ email, password }, router) => {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const { data } = await axiosClient().post('auth/signin', {
        email,
        password
      });
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: data.user
      });
      router.push('/');
    } catch (e) {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const signUp = async ({ name, email, password }, router) => {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const { data } = await axiosClient().post('auth/signup', {
        name,
        email,
        password
      });
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: data.message
      });
      router.push('/signin');
    } catch (e) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const signOut = async () => {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const { data } = axiosClient().post('auth/signout');
      dispatch({
        type: SIGN_OUT_SUCCESS,
        payload: data.message
      });
    } catch (e) {
      dispatch({
        type: SIGN_OUT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: state.authenticated,
        user: state.user,
        error: state.error,
        message: state.message,
        authLoading: state.authLoading,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
