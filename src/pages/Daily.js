import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDaily, navEffect } from '../actions';
import Topper from '../components/Topper';
import Dailyform from '../components/Dailyform';
import DailyList from '../components/DailyList';
import Loading from '../components/Loading';

function Daily() {
  const dispatch = useDispatch();
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const dailyReducer = useSelector((state) => state.dailyReducer);
  const { accessToken } = isLoggedInReducer.userLoggedIn;
  const { loading } = dailyReducer.daily;

  useEffect(() => {
    dispatch(getDaily(accessToken));
    let url = new URL(window.location.href);
    dispatch(navEffect(url.pathname));
  }, [dispatch, accessToken]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="daily container">
          <Topper />
          <Dailyform />
          <DailyList />
        </div>
      )}
    </>
  );
}

export default Daily;
