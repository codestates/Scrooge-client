import { combineReducers } from 'redux';
import helloReducer from './helloReducer';
import emailExistsReducer from './emailExistsReducer';
import isLoggedInReducer from './isLoggedInReducer';
import userInfoReducer from './userInfoReducer';
import dailyReducer from './dailyReducer';
import userSignInReducer from './userSignInReducer';

const rootReducer = combineReducers({
  helloReducer,
  emailExistsReducer,
  isLoggedInReducer,
  userInfoReducer,
  dailyReducer,
  userSignInReducer,
});

export default rootReducer;
