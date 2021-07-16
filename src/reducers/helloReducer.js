import { HELLO_LOADING, HELLO_SUCCESS, HELLO_ERROR } from '../actions';
import initialStats from './initialStats';

const helloReducer = (state = initialStats, action) => {
  switch (action.type) {
    case HELLO_LOADING:
      return {
        ...state,
        hello: {
          loading: true,
          data: null,
          err: null,
        },
      };
    case HELLO_SUCCESS:
      return {
        ...state,
        hello: {
          loading: false,
          data: action.photos,
          err: null,
        },
      };
    case HELLO_ERROR:
      return {
        ...state,
        hello: {
          loading: true,
          data: null,
          err: action.err,
        },
      };
    default:
      return state;
  }
};

export default helloReducer;
