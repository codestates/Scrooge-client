import {
  SAVE_MODAL_MESSAGE,
  DELETE_MODAL_MESSAGE,
  IS_MODAL_TRUE,
  IS_MODAL_FALSE,
} from '../actions';
import initialStats from './initialStats';

const modalMessageReducer = (state = initialStats.modalMessage, action) => {
  switch (action.type) {
    case SAVE_MODAL_MESSAGE:
      return {
        ...state,
        message: action.message,
        errored: true,
      };
    case DELETE_MODAL_MESSAGE:
      return { ...state, message: null, errored: false };
    case IS_MODAL_TRUE:
      return { ...state, isModal: true };
    case IS_MODAL_FALSE:
      return { ...state, ismodal: false };
    default:
      return state;
  }
};

export default modalMessageReducer;
