import { GET_DAILY, GET_DAILY_SUCCESS } from '../actions';
import initialStats from './initialStats';

const dailyReducer = (state = initialStats, action) => {
  switch (action.type) {
    case GET_DAILY:
      return {
        ...state,
        daily: {
          loading: true,
        },
      };
    case GET_DAILY_SUCCESS:
      if (Array.isArray(action.daily)) {
        return {
          ...state,
          daily: {
            ...state.daily,
            loading: false,
            bottom: action.daily,
          },
        };
      } else {
        return {
          ...state,
          daily: {
            loading: false,
            top: {
              monthlyBudget: action.daily.top.monthlyBudget,
              monthlyUsed: action.daily.top.monthlyUsed,
              exMonthlyUsed: action.daily.top.exMonthlyUsed,
            },
            bottom: action.daily.bottom,
            categoryList: action.daily.categoryList,
          },
        };
      }
    default:
      return state;
  }
};

export default dailyReducer;
