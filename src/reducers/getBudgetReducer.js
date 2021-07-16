import { GET_BUDGET, GET_BUDGET_SUCCESS, GET_BUDGET_ERROR } from '../actions';
import initialStats from './initialStats';

const getBudgetReducer = (state = initialStats, action) => {
  switch (action.type) {
    case GET_BUDGET:
      return {
        ...state,
        budget: {
          loading: true,
          err: false,
        },
      };
    case GET_BUDGET_SUCCESS:
      return {
        ...state,
        budget: {
          loading: false,
          categories: action.data.categories,
          usedGraph: action.data.usedGraph,
          budgetGraph: action.data.budgetGraph,
          err: false,
        },
      };
    case GET_BUDGET_ERROR:
      return {
        ...state,
        budget: {
          loading: false,
          categories: null,
          usedGraph: null,
          budgetGraph: null,
          err: true,
        },
      };
    default:
      return state;
  }
};

export default getBudgetReducer;
