import { USER_SIGNIN, USER_SIGNIN_ERROR } from '../actions';
import initialStats from './initialStats';

const userSigninReducer = (state = initialStats, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        ...state,
        userSignIn: {
          signInErr: false,
        },
      };
    case USER_SIGNIN_ERROR:
      return {
        ...state,
        userSignIn: {
          signInErr: true,
        },
      };
    default:
      return state;
  }
};

export default userSigninReducer;
