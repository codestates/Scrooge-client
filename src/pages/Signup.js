import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmailExists, goToHome } from '../actions';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../components/Logo';
import axios from 'axios';

function Signup() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
    photo: '',
  });
  const emailExistsReducer = useSelector((state) => state.emailExistsReducer);
  const { emailSignupMod } = emailExistsReducer.emailExists;
  const dispatch = useDispatch();
  const history = useHistory();

  //함수 부분
  function clicked(e) {
    if (e.target.outerText === '카카오톡 버튼') {
      return console.log('카톡이지롱');
    } else if (e.target.outerText === '구글 버튼') {
      return console.log('구글이지롱');
    }
  }

  function inputHandler(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  function inputPhoto(e) {
    let file = e.target.files[0];
    setUserInfo({
      ...userInfo,
      photo: file,
    });
  }

  let emailChecker = async (e) => {
    e.preventDefault();

    if (!userInfo.email) {
      alert('이메일을 입력해주세요');
      return;
    }

    dispatch(checkEmailExists(userInfo.email));
  };

  let signupRequestHandler = async (e) => {
    if (!userInfo.username || !userInfo.password || !userInfo.email) {
      if (!userInfo.email) {
        alert('처음부터 시도해주세요');
      }
      if (!userInfo.username) {
        alert('닉네임을 입력해주세요');
      }
      if (!userInfo.password) {
        alert('비밀번호를 입력해주세요');
      }
      return;
    } else if (userInfo.password !== userInfo.passwordCheck) {
      alert('비밀번호를 확인해주세요');
    }
    e.preventDefault();

    const fd = new FormData();
    fd.append('email', userInfo.email);
    fd.append('username', userInfo.username);
    fd.append('password', userInfo.password);
    fd.append('photo', userInfo.photo);

    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        dispatch(goToHome(history));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="signup">
      <Logo />
      {emailSignupMod ? (
        <div className="inputZone">
          <form className="signup_form">
            <label htmlFor="photo">사진</label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/jpg, image/png, image/jpeg, image/gif"
              onChange={inputPhoto}
              className="photo"
              required
            />
            <label htmlFor="username">닉네임</label>
            <input
              id="username"
              name="username"
              type="username"
              onChange={inputHandler}
              className="username signup_input"
              required
            ></input>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={inputHandler}
              className="password signup_input"
              required
            />
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <input
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              onChange={inputHandler}
              className="passwordCheck signup_input"
              required
            />
            <button
              className="signup_submit submit"
              onClick={signupRequestHandler}
            >
              회원가입
            </button>
          </form>
        </div>
      ) : (
        <>
          <p className="signup_login_btn">
            이미 아이디가 있으신가요? <Link to="/">로그인</Link> 하러가기
          </p>
          <div className="inputZone">
            <div className="social_loginBtn_group">
              <button className="kakaoTalk social_loginBtn" onClick={clicked}>
                <svg
                  className="social_login_SVG"
                  width="2500"
                  height="2500"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#FFE812"
                    d="M256 236c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0h216c11.046 0 20 8.954 20 20v216z"
                  />
                  <path d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689 0 0-.207 1.762.934 2.434s2.483.15 2.483.15c3.272-.457 37.943-24.811 43.944-29.04 5.995.849 12.168 1.29 18.472 1.29 57.438 0 104-36.712 104-82 0-45.287-46.562-82-104-82z" />
                  <path
                    fill="#FFE812"
                    d="M70.5 146.625c-3.309 0-6-2.57-6-5.73V105.25h-9.362c-3.247 0-5.888-2.636-5.888-5.875s2.642-5.875 5.888-5.875h30.724c3.247 0 5.888 2.636 5.888 5.875s-2.642 5.875-5.888 5.875H76.5v35.645c0 3.16-2.691 5.73-6 5.73zM123.112 146.547c-2.502 0-4.416-1.016-4.993-2.65l-2.971-7.778-18.296-.001-2.973 7.783c-.575 1.631-2.488 2.646-4.99 2.646a9.155 9.155 0 0 1-3.814-.828c-1.654-.763-3.244-2.861-1.422-8.52l14.352-37.776c1.011-2.873 4.082-5.833 7.99-5.922 3.919.088 6.99 3.049 8.003 5.928l14.346 37.759c1.826 5.672.236 7.771-1.418 8.532a9.176 9.176 0 0 1-3.814.827c-.001 0 0 0 0 0zm-11.119-21.056L106 108.466l-5.993 17.025h11.986zM138 145.75c-3.171 0-5.75-2.468-5.75-5.5V99.5c0-3.309 2.748-6 6.125-6s6.125 2.691 6.125 6v35.25h12.75c3.171 0 5.75 2.468 5.75 5.5s-2.579 5.5-5.75 5.5H138zM171.334 146.547c-3.309 0-6-2.691-6-6V99.5c0-3.309 2.691-6 6-6s6 2.691 6 6v12.896l16.74-16.74c.861-.861 2.044-1.335 3.328-1.335 1.498 0 3.002.646 4.129 1.772 1.051 1.05 1.678 2.401 1.764 3.804.087 1.415-.384 2.712-1.324 3.653l-13.673 13.671 14.769 19.566a5.951 5.951 0 0 1 1.152 4.445 5.956 5.956 0 0 1-2.328 3.957 5.94 5.94 0 0 1-3.609 1.211 5.953 5.953 0 0 1-4.793-2.385l-14.071-18.644-2.082 2.082v13.091a6.01 6.01 0 0 1-6.002 6.003z"
                  />
                </svg>
                카카오톡 버튼
              </button>
              <button className="google social_loginBtn" onClick={clicked}>
                <svg
                  className="social_login_SVG"
                  width="256px"
                  height="262px"
                  viewBox="0 0 256 262"
                >
                  <g>
                    <path
                      d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479"
                      fill="#EB4335"
                    ></path>
                  </g>
                </svg>
                구글 버튼
              </button>
            </div>
            <div className="email_hr">
              <div className="hr"></div>
              <div className="email_hr_title">이메일로 가입하기</div>
            </div>
            <form className="signup_form">
              <label htmlFor="email">이메일</label>
              <input
                className="signup_input"
                type="email"
                name="email"
                id="email"
                onChange={inputHandler}
                required
              />
              <button className="signup_submit submit" onClick={emailChecker}>
                회원가입
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Signup;
