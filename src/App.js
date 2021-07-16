import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshTokenRequest } from './actions';
import AppRouter from './components/Router';

require('dotenv').config();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshTokenRequest());
  }, [dispatch]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
