import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const SIGNIN_PATH = '/users/signin';
const SIGNUP_PATH = '/users/signup';
const USER_PATH = '/users/';

export const signIn = (formData) => API.post(SIGNIN_PATH, formData);
export const signUp = (formData) => API.post(SIGNUP_PATH, formData);
export const update = (formData) => API.patch(USER_PATH + formData.id, formData);
export const deleteUser = (formData) => API.delete(USER_PATH + formData.id);
export const verifyUser = (formData) => API.patch(USER_PATH + formData.id + '/verifyUser/', formData);

const CATAN_GAMEMODE_PATH = '/catan/gameModes';
const CATAN_PLAYER_PATH = '/catan/players/';
const CATAN_GAME_PATH = '/catan/games/';
const CATAN_GAME_PLAYER_PATH = '/catan/gamePlayers/';
const CATAN_GAME_DICE_PATH = '/catan/gameDice/';
const CATAN_STATS = '/catan/getStats/';

export const getGameModes = (formData) => API.get(CATAN_GAMEMODE_PATH, formData);

export const getPlayers = (formData) => API.get(CATAN_PLAYER_PATH, formData);
export const createPlayer = (formData) => API.post(CATAN_PLAYER_PATH, formData);
export const updatePlayer = (formData) => API.put(CATAN_PLAYER_PATH + formData.id, formData);
export const deletePlayer = (formData) => API.delete(CATAN_PLAYER_PATH + formData.id, formData);

export const getGame = (formData) => API.get(CATAN_GAME_PATH + formData.id);
export const getGames = (formData) => API.get(CATAN_GAME_PATH, formData);
export const createGame = (formData) => API.post(CATAN_GAME_PATH, formData);
export const updateGame = (formData) => API.put(CATAN_GAME_PATH + formData.id, formData);
export const deleteGame = (formData) => API.delete(CATAN_GAME_PATH + formData.id, formData);

export const getGamePlayers = (formData) => API.get(CATAN_GAME_PATH + formData.id + '/gamePlayers/');
export const createGamePlayer = (formData) => API.post(CATAN_GAME_PLAYER_PATH, formData);
export const updateGamePlayer = (formData) => API.put(CATAN_GAME_PLAYER_PATH + formData.id, formData);
export const deleteGamePlayer = (formData) => API.delete(CATAN_GAME_PLAYER_PATH + formData.id, formData);

export const getGameDice = (formData) => API.get(CATAN_GAME_PATH + formData.id + '/gameDice/');
export const createGameDice = (formData) => API.post(CATAN_GAME_DICE_PATH, formData);
export const updateGameDice = (formData) => API.put(CATAN_GAME_DICE_PATH + formData.id, formData);
export const deleteGameDice = (formData) => API.delete(CATAN_GAME_DICE_PATH + formData.id, formData);

export const getStats = (formData) => API.get(CATAN_STATS, formData);