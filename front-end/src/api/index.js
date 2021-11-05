import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const SIGNIN_PATH = '/user/signin';
const SIGNUP_PATH = '/user/signup';

export const signIn = (formData) => API.post(SIGNIN_PATH, formData);
export const signUp = (formData) => API.post(SIGNUP_PATH, formData);