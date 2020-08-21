import { SHOW_ALERT, HIDE_ALERT } from '../../types/alertTypes';
import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import { AlertContext } from './alertContext';

export const AlertState = ({ children }) => {
  const initialState = {
    alert: null
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const showAlert = (message) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        message
      }
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT
      });
    }, 1000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        showAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
