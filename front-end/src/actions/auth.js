import { 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  SIGN_UP_SUCCESS, 
  SIGN_UP_FAIL,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  SET_MESSAGE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: LOGIN_SUCCESS, data })
      .then(() => {
        window.location.reload();
      });
    return Promise.resolve();

    //router.push('/');
  } catch (error) {
    if (error.response){
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({ type: LOGIN_FAIL, data: error.response.data.message });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: SIGN_UP_SUCCESS, data });
    return Promise.resolve();

    //router.push('/');
  } catch (error) {
    if (error.response){
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({ type: SIGN_UP_FAIL, data: error.response.data.message });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  }
};

export const update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.update(formData);

    dispatch({ type: USER_UPDATE_SUCCESS, data });
    return Promise.resolve();

    //router.push('/');
  } catch (error) {
    if (error.response){
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //dispatch({ type: USER_UPDATE_FAIL, data: error.response.data.message });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  }
};

export const deleteUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(formData);

    dispatch({ type: USER_DELETE_SUCCESS, data });
    return Promise.resolve();

    //router.push('/');
  } catch (error) {
    if (error.response){
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //dispatch({ type: USER_UPDATE_FAIL, data: error.response.data.message });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  }
};

