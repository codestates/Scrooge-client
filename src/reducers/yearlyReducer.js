import { YEARLY_DATA } from '../actions';
import initialStats from './initialStats';

const yearlyReducer = (state = initialStats, action) => {
  switch (action.type) {
    case YEARLY_DATA:
      return {
        ...state,
        yearlyData: action.yearlyData,
      };
    default:
      return state;
  }
};

export default yearlyReducer;
