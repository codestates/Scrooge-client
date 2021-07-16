import { PWINQUIRY_INIT, PWINQUIRY_SUCCESS, PWINQUIRY_ERROR } from '../actions';
import initialStats from './initialStats';

const pwinquiryReducer = (state = initialStats, action) => {
  switch (action.type) {
    case PWINQUIRY_INIT:
      return {
        ...state,
        pwinquiry: {
          success: false,
          error: false,
        },
      };
    case PWINQUIRY_SUCCESS:
      return {
        ...state,
        pwinquiry: {
          success: true,
          error: false,
        },
      };
    case PWINQUIRY_ERROR:
      return {
        ...state,
        pwinquiry: {
          success: false,
          error: true,
        },
      };
    default:
      return state;
  }
};

export default pwinquiryReducer;
