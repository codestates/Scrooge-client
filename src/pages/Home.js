import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { isLoggedIn, accessToken } = isLoggedInReducer.userLoggedIn;
  return (
    <>
      {isLoggedIn ? (
        <></>
      ) : (
        <div>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </>
  );
}

export default Home;