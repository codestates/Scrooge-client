import { SOCIAL_DATA, SOCIAL_DELETE } from '../actions';
import initialStats from './initialStats';

const socialDataReducer = (state = initialStats, action) => {
  switch (action.type) {
    case SOCIAL_DATA:
      return {
        ...state,
        socialData: {
          email: action.socialData.email,
          photo: action.socialData.photo,
          username: action.socialData.username,
        },
      };
    case SOCIAL_DELETE:
      return {
        ...state,
        socialData: {
          email: null,
          photo: null,
          username: null,
        },
      };
    default:
      return state;
  }
};

export default socialDataReducer;
