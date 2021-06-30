import { USER_SIGNIN_ERROR } from '../actions';
import initialStats from './initialStats';

const userSigninReducer = (state = initialStats, action) => {
  switch (action.type) {
    case USER_SIGNIN_ERROR:
      return {
        ...state,
        userSignIn: {
          signInErr: null,
        },
      };
    default:
      return state;
  }
};

export default userSigninReducer;
