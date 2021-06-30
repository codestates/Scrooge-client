import { EMAIL_SIGNUP_SUCCESS, EMAIL_SIGNUP_ERROR } from '../actions';
import initialStats from './initialStats';

const emailExistsReducer = (state = initialStats, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP_SUCCESS:
      return {
        ...state,
        emailExists: {
          emailSignupMod: true,
          emailExistsErr: false,
        },
      };
    case EMAIL_SIGNUP_ERROR:
      return {
        ...state,
        emailExists: {
          emailSignupMod: false,
          emailExistsErr: true,
        },
      };
    default:
      return state;
  }
};

export default emailExistsReducer;
