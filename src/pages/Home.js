import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Daily from './Daily';
import Login from '../components/Login';

function Home() {
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { isLoggedIn } = isLoggedInReducer.userLoggedIn;
  const [ismodal, setmodal] = useState(false);

  function modalSet() {
    setmodal(!ismodal);
  }
  return (
    <>
      {isLoggedIn ? (
        <>
          <Daily />
        </>
      ) : (
        <div>
          <button onClick={modalSet}>
            임시 랜딩페이지 👻 글씨 눌러서 로그인하기!!!{' '}
          </button>
          {ismodal ? <Login modalSet={modalSet} /> : <></>}
        </div>
      )}
    </>
  );
}

export default Home;
