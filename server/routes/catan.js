import express from 'express';
import auth from '../middleware/auth.js';

import { 
  catanGameValidate, 
  catanGamePlayerValidate, 
  catanGameDiceValidate,
  catanPlayerValidate
} from '../middleware/validation.js';

//Get the function from the file in controllers directory
import {
  getGame,
  getGames,
  createGame,
  getGameModes,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  updateGame,
  deleteGame,
  getGamePlayers,
  createGamePlayer,
  updateGamePlayer,
  deleteGamePlayer,
  getGameDice,
  createGameDice,
  updateGameDice,
  deleteGameDice,
  getStats
} from '../controllers/catan.js';

const router = express.Router();

//Always import and call that function to keep this file neat
router.get('/gameModes', getGameModes);

router.get('/players', getPlayers);
router.post('/players', [catanPlayerValidate, auth], createPlayer);
router.put('/players/:id', [catanPlayerValidate, auth], updatePlayer);
router.delete('/players/:id', auth, deletePlayer);

router.get('/games', getGames);
router.get('/games/:id', getGame);
router.post('/games', [catanGameValidate, auth], createGame);
router.put('/games/:id', [catanGameValidate, auth], updateGame);
router.delete('/games/:id', auth, deleteGame);

router.get('/games/:id/gamePlayers', getGamePlayers);
router.post('/gamePlayers', [catanGamePlayerValidate, auth], createGamePlayer);
router.put('/gamePlayers/:id', [catanGamePlayerValidate, auth], updateGamePlayer);
router.delete('/gamePlayers/:id', auth, deleteGamePlayer);

router.get('/games/:id/gameDice', getGameDice); //////
router.post('/gameDice', [catanGameDiceValidate, auth], createGameDice);
router.put('/gameDice/:id', [catanGameDiceValidate, auth], updateGameDice);
router.delete('/gameDice/:id', auth, deleteGameDice);

router.get('/getStats', getStats);

export default router;