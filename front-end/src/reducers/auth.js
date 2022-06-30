import { 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGOUT, 
  SIGN_UP_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  SIGN_UP_FAIL } from '../constants/actionTypes';

const authReducer = (state = { user: null, token: null }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      
      return { ...state, user: action.data.user, token: action.data.token , errors: null };
    case LOGIN_FAIL:
      localStorage.clear();

      return { ...state, user: null, token: null, errors: action.data };
    case SIGN_UP_SUCCESS:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, user: action.data.user, token: action.data.token , errors: null };
    case SIGN_UP_FAIL:
      localStorage.clear();

      return { ...state, user: null, token: null, errors: action.data };
    case USER_UPDATE_SUCCESS:
      const user = JSON.parse(localStorage.getItem('profile'));
      user.user = action.data.user;
      
      localStorage.setItem('profile', JSON.stringify(user));

      return { ...state, user: action.data.user, token: action.data.token , errors: null };
    case USER_DELETE_SUCCESS:
      localStorage.clear();

      return { ...state, user: null, token: null, errors: null };
    case LOGOUT:
      localStorage.clear();

      return { ...state, user: null, token: null, errors: null };
    default:
      return state;
  }
};

export default authReducer;