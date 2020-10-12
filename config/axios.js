import axios from 'axios';

export const axiosClient = () => {
  return axios.create({
    //baseURL: 'http://localhost:5000/api/',
    baseURL: 'https://alg-tasks-server.herokuapp.com/api/',
    withCredentials: true
  });
};
