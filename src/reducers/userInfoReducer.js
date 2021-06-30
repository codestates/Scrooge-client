import { GET_USERINFO, DELETE_USERINFO } from '../actions';
import initialStats from './initialStats';

const userInfoReducer = (state = initialStats, action) => {
  switch (action.type) {
    case GET_USERINFO:
      return {
        ...state,
        userInfo: {
          userName: action.userInfo.username,
          userEmail: action.userInfo.email,
          userPhoto: action.userInfo.photo,
          userLevel: action.userInfo.level,
          userEXP: action.userInfo.experience,
        },
      };
    case DELETE_USERINFO:
      return {
        ...state,
        userInfo: {
          userName: null,
          userEmail: null,
          userPhoto: null,
          userLevel: null,
          userEXP: null,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default userInfoReducer;
