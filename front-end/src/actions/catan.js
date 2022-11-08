import { 
  GET_GAME,
  GET_GAMES,
  CREATE_GAME_SUCCESS, 
  CREATE_GAME_FAIL,
  UPDATE_GAME_SUCCESS,
  GET_GAME_PLAYERS,
  CREATE_GAME_PLAYER,
  UPDATE_GAME_PLAYER,
  DELETE_GAME_PLAYER,
  GET_GAME_DICE,
  CREATE_GAME_DICE,
  UPDATE_GAME_DICE,
  DELETE_GAME_DICE,
  // CREATE_PLAYER_SUCCESS,
  // UPDATE_PLAYER_SUCCESS,
  // DELETE_PLAYER_SUCCESS,
  GET_GAME_MODES,
  GET_PLAYERS,
  CREATE_PLAYER,
  UPDATE_PLAYER,
  DELETE_PLAYER,
  DELETE_GAME_SUCCESS,
  SET_MESSAGE,
  GET_CATAN_STATS
 } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getGame = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getGame(formData);

    dispatch({ type: GET_GAME, data });
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

export const getGames = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getGames(formData);

    dispatch({ type: GET_GAMES, data });
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

export const createGame = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createGame(formData);

    dispatch({ type: CREATE_GAME_SUCCESS, data });
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
      dispatch({ type: CREATE_GAME_FAIL, data: error.response.data.message });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  }
};

export const updateGame = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateGame(formData);

    dispatch({ type: UPDATE_GAME_SUCCESS, data });
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

export const deleteGame = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteGame(formData);

    dispatch({ type: DELETE_GAME_SUCCESS, data });
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

export const getGameModes = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getGameModes(formData);

    dispatch({ type: GET_GAME_MODES, data });
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

export const getPlayers = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getPlayers(formData);

    dispatch({ type: GET_PLAYERS, data });
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

export const createPlayer = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createPlayer(formData);

    dispatch({ type: CREATE_PLAYER, data });
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
      //dispatch({ type: CREATE_GAME_FAIL, data: error.response.data.message });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  }
};

export const updatePlayer = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updatePlayer(formData);

    dispatch({ type: UPDATE_PLAYER, data });
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

export const deletePlayer = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deletePlayer(formData);

    dispatch({ type: DELETE_PLAYER, data });
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

export const getGamePlayers = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getGamePlayers(formData);

    dispatch({ type: GET_GAME_PLAYERS, data });
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

export const createGamePlayer = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createGamePlayer(formData);

    dispatch({ type: CREATE_GAME_PLAYER, data });
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
      //dispatch({ type: CREATE_GAME_FAIL, data: error.response.data.message });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  }
};

export const updateGamePlayer = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateGamePlayer(formData);

    dispatch({ type: UPDATE_GAME_PLAYER, data });
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

export const deleteGamePlayer = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteGamePlayer(formData);

    dispatch({ type: DELETE_GAME_PLAYER, data });
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

export const getGameDice = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getGameDice(formData);

    dispatch({ type: GET_GAME_DICE, data });
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

export const createGameDice = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createGameDice(formData);

    dispatch({ type: CREATE_GAME_DICE, data });
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
      //dispatch({ type: CREATE_GAME_FAIL, data: error.response.data.message });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  }
};

export const updateGameDice = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateGameDice(formData);

    dispatch({ type: UPDATE_GAME_DICE, data });
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

export const deleteGameDice = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteGameDice(formData);

    dispatch({ type: DELETE_GAME_DICE, data });
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

export const getStats = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getStats(formData);

    dispatch({ type: GET_CATAN_STATS, data });
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

