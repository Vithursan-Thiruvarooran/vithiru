import { 
  CREATE_GAME_SUCCESS,
  UPDATE_GAME_SUCCESS,
  DELETE_GAME_SUCCESS,
  CREATE_GAME_PLAYER,
  UPDATE_GAME_PLAYER,
  DELETE_GAME_PLAYER,
  CREATE_GAME_DICE,
  UPDATE_GAME_DICE,
  DELETE_GAME_DICE,
  GET_GAME_MODES,
  GET_PLAYERS,
  DELETE_PLAYER,
  GET_GAMES,
  GET_GAME,
  GET_GAME_PLAYERS,
  GET_GAME_DICE,
  RESET_FORMS,
  GET_CATAN_STATS
} from '../constants/actionTypes';

const catanReducer = (state = 
  { 
    catan: null,
    games: [],
    gameModes: [],
    players: [],
    playerForm: null,
    gameForm: null,
    gamePlayersForm: [],
    gameDiceForm: null,
    catanStats: { playerStats: [], genStats: [], corrStats: null },
  }, action) => {
    switch (action.type) {
      case GET_GAME:
        return { ...state, gameForm: action.data, errors: null };
      case GET_GAMES:
        return { ...state, games: action.data, errors: null };
      case CREATE_GAME_SUCCESS:
        return { ...state, gameForm: action.data, errors: null };
      case UPDATE_GAME_SUCCESS:
        return { ...state, gameForm: action.data, errors: null };
      case DELETE_GAME_SUCCESS:
        return { ...state, gameForm: null, gamePlayersForm: [], gameDiceForm: null, errors: null };
      case GET_GAME_PLAYERS:
        return { ...state, gamePlayersForm: action.data, errors: null };
      case CREATE_GAME_PLAYER:
        state.gamePlayersForm.push(action.data)
        return { ...state, errors: null };
      case UPDATE_GAME_PLAYER:
        for(var i = 0; i < state.gamePlayersForm.length; i++){
          if(state.gamePlayersForm[i]._id === action.data._id){
            state.gamePlayersForm[i] = action.data;
          }
        }
        return { ...state, errors: null };
      case DELETE_GAME_PLAYER:
        for(var j = 0; j < state.gamePlayersForm.length; j++){
          if(state.gamePlayersForm[j]._id === action.data._id){
            state.gamePlayersForm.splice(j, 1);
          }
        }
        return { ...state, errors: null };
      case GET_GAME_DICE:
        return { ...state, gameDiceForm: action.data, errors: null };
      case CREATE_GAME_DICE:
        return { ...state, gameDiceForm: action.data, errors: null };
      case UPDATE_GAME_DICE:
        return { ...state, gameDiceForm: action.data, errors: null };
      case DELETE_GAME_DICE:
        return { ...state, gameDiceForm: null, errors: null };
      case GET_GAME_MODES:
        return { ...state, gameModes: action.data.gameModes };
      case GET_PLAYERS:
        return { ...state, players: action.data.players };
      case DELETE_PLAYER:
        for(var k = 0; k < state.players.length; k++){
          if(state.players[k]._id === action.data._id){
            state.players.splice(k, 1);
          }
        }
        return { ...state, errors: null };
      case RESET_FORMS:
        return { ...state, gameForm: null, gamePlayersForm: [], gameDiceForm: null };
      case GET_CATAN_STATS:
        return { ...state, catanStats: {
          playerStats: action.data.playerStats, 
          genStats: action.data.genStats, 
          corrStats: action.data.corrStats
        }};
      default:
        return state;
  }
};

export default catanReducer;