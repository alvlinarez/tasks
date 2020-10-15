import { axiosClient } from './axios';

export const tokenAuth = (token) => {
  token
    ? (axiosClient().defaults.headers.common['x-auth-token'] = token)
    : delete axiosClient().defaults.headers.common['x-auth-token'];
};
