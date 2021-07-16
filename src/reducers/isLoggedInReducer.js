import { USER_LOGIN, USER_LOGOUT } from '../actions';
import initialStats from './initialStats';

const isLoggedInReducer = (state = initialStats, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userLoggedIn: {
          isLoggedIn: true,
          accessToken: action.accessToken,
          path: action.path,
        },
      };
    case USER_LOGOUT:
      return {
        ...state,
        userLoggedIn: {
          isLoggedIn: false,
          accessToken: null,
          path: null,
        },
      };
    default:
      return state;
  }
};

export default isLoggedInReducer;
