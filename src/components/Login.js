import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSignInRequest } from '../actions';
import { Link, useHistory } from 'react-router-dom';

function Login({ modalSet }) {
  const userSignInReducer = useSelector((state) => state.userSignInReducer);
  // const { signInErr } = userSignInReducer.userSignIn;
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = async (e) => {
    if (!loginInfo.email || !loginInfo.password) {
      if (!loginInfo.email) {
        //TODO: UX
        alert('이메일을 입력해주세요');
      }
      if (!loginInfo.password) {
        //TODO: UX
        alert('비밀번호를 입력해주세요');
      }
      return;
    }
    e.preventDefault();

    await dispatch(userSignInRequest(loginInfo));
    await history.push({ pathname: '/daily' });
  };

  function inputHandler(e) {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }
  return (
    <div className="signin_modal">
      <div onClick={modalSet}>닫기</div>
      <img src={process.env.PUBLIC_URL + '/logoXS.png'} alt="스크루지" />
      <form className="signin_modal_form">
        <label className="signin_modal_email" htmlFor="email">
          이메일
        </label>
        <input
          name="email"
          type="email"
          onChange={inputHandler}
          className="email"
          required
        ></input>
        <label className="signin_modal_password" htmlFor="password">
          비밀번호
        </label>
        <input
          name="password"
          type="password"
          onChange={inputHandler}
          className="password"
          required
        ></input>
        <button className="signin_submit submit" onClick={loginHandler}>
          로그인
        </button>
      </form>
      <div>
        아이디가 없으신가요? <Link to="/signup">회원가입</Link>하러가기
      </div>
    </div>
  );
}

export default Login;
