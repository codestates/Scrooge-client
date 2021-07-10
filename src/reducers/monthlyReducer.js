import { MONTHLY_DATA } from '../actions';
import initialStats from './initialStats';

const monthlyReducer = (state = initialStats, action) => {
  let nowDate = new Date();
  let month = nowDate.getMonth() + 1;

  const monthlydays = (num) => {
    if ([1, 3, 5, 7, 8, 10, 12].includes(num)) {
      return 31;
    } else if ([2, 4, 6, 9, 11].includes(num)) {
      return 30;
    } else {
      return 28;
    }
  };
  let wholeSum = new Array(monthlydays(month)).fill(0);
  let spendDays = [];

  if (action.monthlyBudget) {
    for (let n = 0; n < action.data.length; n++) {
      spendDays.push(Number(action.data[n].date.split('-')[2]));
    }

    for (let n = 0; n < action.data.length; n++) {
      for (let m = 0; m < wholeSum.length; m++) {
        if (spendDays[n] - 1 <= m) {
          wholeSum[m] = wholeSum[m] + Number(action.data[n].title);
        }
      }
    }
  }

  let wholeSumCalendar = [];

  for (let n = 0; n < wholeSum.length; n++) {
    let numStr = (num) => {
      if (String(num).length !== 2) {
        return `0${num}`;
      } else {
        return `${num}`;
      }
    };
    if (wholeSum[n] < action.monthlyBudget) {
      wholeSumCalendar.push({
        date: `2021-07-${numStr(n + 1)}`,
        title: `합계 ${wholeSum[n]}원`,
        backgroundColor: 'green',
      });
    } else {
      wholeSumCalendar.push({
        date: `2021-07-${numStr(n + 1)}`,
        title: `합계 ${wholeSum[n]}원`,
        backgroundColor: 'red',
      });
    }
  }
  switch (action.type) {
    case MONTHLY_DATA:
      return {
        ...state,
        monthlyData: { data: wholeSumCalendar.concat(action.data) },
      };
    default:
      return state;
  }
};

export default monthlyReducer;
