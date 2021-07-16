import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yearlyList, navEffect } from '../actions';
import YearlyList from '../components/YearlyList';
import Chart from 'react-google-charts';

function Yearly() {
  const dispatch = useDispatch();
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { accessToken } = isLoggedInReducer.userLoggedIn;

  const yearlyReducer = useSelector((state) => state.yearlyReducer);
  const { top } = yearlyReducer.yearlyData;

  useEffect(() => {
    dispatch(yearlyList(accessToken));
    let url = new URL(window.location.href);
    dispatch(navEffect(url.pathname));
  }, [dispatch, accessToken]);

  function scale(min, max) {
    var cellSize = window.innerWidth / 60;
    if (cellSize > max) return max;
    if (cellSize < min) return min;
    return cellSize;
  }

  let calendarData = [
    [
      { type: 'date', id: 'Date' },
      { type: 'number', id: 'Won/Loss' },
    ],
  ];

  function testing(arr) {
    for (let n = 0; n < arr.length; n++) {
      if (arr[n][3] < 5) {
        calendarData.push([
          new Date(`${arr[n][0]},${arr[n][1]},${arr[n][2]}`),
          `${arr[n][3]}`,
        ]);
      } else {
        calendarData.push([
          new Date(`${arr[n][0]},${arr[n][1]},${arr[n][2]}`),
          5,
        ]);
      }
    }
  }

  testing(top);

  //=================================

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const chartFunction = (data, windowSize) => {
    return (
      <Chart
        width={windowSize.width}
        height={windowSize.height - 550 * (windowSize.width / 1920)}
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: '지출 횟수',
          calendar: {
            dayOfWeekLabel: {
              color: '#afbfd6',
            },
            monthLabel: {
              color: '#afbfd6',
            },
            yearLabel: {
              fontSize: 16,
            },
            cellSize: scale(5, 25),
            cellColor: {
              stroke: '#d5e0f1',
              strokeOpacity: 0.5,
              strokeWidth: 1,
            },
            monthOutlineColor: {
              stroke: '#afbfd6',
              strokeOpacity: 1,
              strokeWidth: 2,
            },
            unusedMonthOutlineColor: {
              stroke: '#afbfd6',
              strokeOpacity: 1,
              strokeWidth: 1,
            },
          },
          colorAxis: {
            minValue: 0,
            colors: ['#63e3ff', '#385ad2'],
            maxValue: 5,
          },
          noDataPattern: {
            backgroundColor: '#f1f5ff',
            color: '#f1f5ff',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    );
  };

  //===================================
  return (
    <div className="container yearly_top_container">
      <div className="activeChart">
        {chartFunction(calendarData, windowSize)}
      </div>
      <div className="top hr"></div>
      <YearlyList />
    </div>
  );
}

export default Yearly;
