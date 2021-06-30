import axios from 'axios';
import { useSelector } from 'react-redux';

export const HELLO_LOADING = 'HELLO_LOADING';
export const HELLO_SUCCESS = 'HELLO_SUCCESS';
export const HELLO_ERROR = 'HELLO_ERROR';

// # HELLO
export const hello = () => (dispatch) => {
  dispatch({ type: HELLO_LOADING });

  axios
    .get(`${process.env.REACT_APP_API_URL}/`)
    .then((res) => {
      dispatch({ type: HELLO_SUCCESS, data: res.data });
    })
    .catch((err) => {
      dispatch({ type: HELLO_ERROR, err });
    });
};

// # 로그인 상태
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (accessToken) => {
  return {
    type: USER_LOGIN,
    accessToken,
  };
};

// 로그아웃
export const userLogOut = (accessToken, history) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/signout`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then(() => {
      dispatch({ type: USER_LOGOUT });
      history.push({ pathname: '/' });
    });
};

// # AUTH
// 이메일 확인
export const EMAIL_SIGNUP_SUCCESS = 'EMAIL_SIGNUP_SUCCESS';
export const EMAIL_SIGNUP_ERROR = 'EMAIL_SIGNUP_ERROR';

export const checkEmailExists = (email) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/checkemail`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch({ type: EMAIL_SIGNUP_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: EMAIL_SIGNUP_ERROR });
    });
};
// 로그인
export const USER_SIGNIN_ERROR = 'USER_SIGNIN_ERROR';

export const userSignInRequest = (loginInfo) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/login`,
      { email: loginInfo.email, password: loginInfo.password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    )
    .then((res) => {
      dispatch(userLogin(res.data.data.accessToken));
    })
    .catch((err) => {
      dispatch({ type: USER_SIGNIN_ERROR, err });
    });
};

// 홈으로 이동
export const goToHome = (history) => (dispatch) => {
  history.push('/');
};

// #USERINFO
export const GET_USERINFO = 'GET_USERINFO';
export const DELETE_USERINFO = 'DELETE_USERINFO';

export const writeUserInfo = (userInfo) => (dispatch) => {
  dispatch({ type: GET_USERINFO, userInfo });
};
export const deleteUserInfo = () => (dispatch) => {
  dispatch({ type: DELETE_USERINFO });
};

// #DAILY
export const GET_DAILY = 'GET_DAILY';

export const getDaily = (accessToken) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/daypage`, {
      headers: {
        authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.data);
      let daily = res.data.data;
      dispatch({ type: GET_DAILY, daily });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

// 이니셜라이즈
