import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDaily } from '../actions';
import Dailyform from '../components/Dailyform';
import Topper from '../components/Topper';

function Daily() {
  const dispatch = useDispatch();
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { accessToken } = isLoggedInReducer.userLoggedIn;

  useEffect(() => {
    dispatch(getDaily(accessToken));
  }, []);

  return (
    <div className="daily container">
      <Topper />
      <div>
        <div className="daily_form">
          <Dailyform />
        </div>
      </div>
    </div>
  );
}

export default Daily;
