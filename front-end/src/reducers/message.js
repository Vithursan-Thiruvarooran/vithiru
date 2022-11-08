import { SET_MESSAGE, CLEAR_MESSAGE } from '../constants/actionTypes';

const messageReducer = (state = 
  {
    text: null, 
    new: false,
  }, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_MESSAGE:
        return { ...state, text: payload, new: true };
      case CLEAR_MESSAGE:
        return { ...state, text: "", new: false };
      default:
        return state;
    }
  };

export default messageReducer;