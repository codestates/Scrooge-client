import { NAV_EFFECT } from '../actions';
import initialStats from './initialStats';

const navEffectReducer = (state = initialStats, action) => {
  switch (action.type) {
    case NAV_EFFECT:
      return {
        ...state,
        navEffect: {
          currentPath: action.data,
        },
      };
    default:
      return state;
  }
};

export default navEffectReducer;
