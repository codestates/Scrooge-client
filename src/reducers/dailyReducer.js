import { GET_DAILY } from '../actions';
import initialStats from './initialStats';

const dailyReducer = (state = initialStats, action) => {
  switch (action.type) {
    case GET_DAILY:
      return {
        ...state,
        daily: {
          top: {
            monthlyBudget: action.daily.top.monthlyBudget,
            monthlyUsed: action.daily.top.monthlyUsed,
            exMonthlyUsed: action.daily.top.exMonthlyUsed,
          },
          bottom: action.daily.bottom,
          categorylist: action.daily.categorylist,
        },
      };
    default:
      return state;
  }
};

export default dailyReducer;
