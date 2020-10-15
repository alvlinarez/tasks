import React, { useReducer } from 'react';
import authReducer from './AuthReducer';
import { axiosClient } from '../../config/axios';
import { AuthContext } from './AuthContext';
import {
  AUTH_LOADING,
  GET_SIGNED_USER,
  GET_SIGNED_USER_ERROR,
  RESET_AUTH_MESSAGE,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS
} from '../../types/authTypes';
import { tokenAuth } from '../../config/tokenAuth';

export const AuthState = ({ user = {}, children }) => {
  const initialState = {
    user,
    error: null,
    authenticated: false,
    message: null,
    authLoading: false,
    getUserLoading: true
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
      localStorage.setItem('token', data.token);
      tokenAuth(data.token);
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
      // setTimeout to wait for showing Alert and then redirect
      setTimeout(() => {
        router.push('/signin');
        dispatch({
          type: RESET_AUTH_MESSAGE
        });
      }, 1500);
    } catch (e) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const { data } = await axiosClient.get('auth');
      dispatch({
        type: GET_SIGNED_USER,
        payload: data.user
      });
    } catch (e) {
      dispatch({
        type: GET_SIGNED_USER_ERROR
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    dispatch({
      type: SIGN_OUT_SUCCESS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: state.authenticated,
        user: state.user,
        error: state.error,
        message: state.message,
        authLoading: state.authLoading,
        isAuthenticated,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
