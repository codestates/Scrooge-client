import axios from 'axios';
import xlsx from 'xlsx';

export const HELLO_LOADING = 'HELLO_LOADING';
export const HELLO_SUCCESS = 'HELLO_SUCCESS';
export const HELLO_ERROR = 'HELLO_ERROR';

// # HELLO
export const hello = () => (dispatch) => {
  dispatch({ type: HELLO_LOADING });

  axios
    .get(`${process.env.REACT_APP_API_URL}/`)
    .then((res) => {
      dispatch({ type: HELLO_SUCCESS, photos: res.data.data.landingPhotos });
    })
    .catch((err) => {
      dispatch({ type: HELLO_ERROR, err });
    });
};

// # AUTH
// 로그인 상태 ==========================================
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (accessToken, path) => {
  return {
    type: USER_LOGIN,
    accessToken,
    path,
  };
};

// 리프레쉬 토큰
export const refreshTokenRequest = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/refreshtokenrequest`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(userLogin(res.data.data.accessToken));
    })
    .catch((err) => {
      // console.log(err.response);
    });
};

// 로그아웃 ==========================================
export const userLogOut =
  (accessToken, history, path, setModalMessage) => (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/signout`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: USER_LOGOUT });
        dispatch(deleteUserInfo());
        history.push({ pathname: '/' });
        if (path) {
          setModalMessage('테스트');
        }
      });
  };

// 이메일 확인 ==========================================
export const EMAIL_SIGNUP = 'EMAIL_SIGNUP';
export const EMAIL_SIGNUP_SUCCESS = 'EMAIL_SIGNUP_SUCCESS';
export const EMAIL_SIGNUP_ERROR = 'EMAIL_SIGNUP_ERROR';

export const checkEmailExists =
  (email, history, setModalMessage) => (dispatch) => {
    dispatch({ type: EMAIL_SIGNUP });
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
      .catch((err) => {
        dispatch({ type: EMAIL_SIGNUP_ERROR });
        setModalMessage('이미 가입된 이메일입니다');
      });
  };

// 소셜 로그인

export const getKakaoCode =
  (authorizationCode, setModalMessage) => (dispatch) => {
    // console.log('카카오에서 받은 코드 : ', authorizationCode);
    axios
      .post(`${process.env.REACT_APP_API_URL}/kakaologin`, {
        authorizationCode,
      })
      .then((res) => {
        if (String(res.data.message).includes('회원가입')) {
          setModalMessage('카카오 회원가입을 해주세요');
        } else {
          dispatch(userLogin(res.data.data.accessToken, '카카오'));
        }
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response.data.message.includes('회원가입')) {
          setModalMessage('카카오 회원가입을 해주세요');
        }
      });
  };

export const getGoogleCode =
  (authorizationCode, setModalMessage) => (dispatch) => {
    // console.log('구글에서 받은 코드 : ', authorizationCode);
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        authorizationCode,
      })
      .then((res) => {
        // console.log(res);
        if (String(res.data.message).includes('회원가입')) {
          setModalMessage('구글 회원가입을 해주세요');
        } else {
          dispatch(userLogin(res.data.data.accessToken, '구글'));
        }
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response.data.message.includes('회원가입')) {
          setModalMessage('구글 회원가입을 해주세요');
        }
      });
  };

// 소셜 회원가입
export const kakaoSignUp =
  (authorizationCode, history, setModalMessage) => (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/kakaocheck`, {
        authorizationCode,
      })
      .then((res) => {
        // console.log('KSU is', res);
        dispatch(socialData({ email: res.data.data }));
      })
      .catch((err) => {
        setModalMessage(err.response.data.message);
        dispatch(socialDataDelete());
      });
  };

export const googleSignUp =
  (authorizationCode, history, setModalMessage) => (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlecheck`, {
        authorizationCode,
      })
      .then((res) => {
        // console.log('GSU said', res);
        dispatch(socialData({ email: res.data.data }));
      })
      .catch((err) => {
        setModalMessage(err.response.data.message);
        dispatch(socialDataDelete());
      });
  };

export const SOCIAL_DATA = 'SOCIAL_DATA';
export const SOCIAL_DELETE = 'SOCIAL_DELETE';

export const socialData = (socialData) => (dispatch) => {
  dispatch({ type: SOCIAL_DATA, socialData: socialData });
};

export const socialDataDelete = () => (dispatch) => {
  dispatch({ type: SOCIAL_DELETE });
};

export const socialSignUp = (fd, history) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/socialsignup`, fd)
    .then((res) => {
      // console.log(res.data.message);
      dispatch({ type: SOCIAL_DELETE });
      dispatch(goToHome(history));
      dispatch(saveModalMessage('회원가입 성공!'));
    })
    .catch((err) => {
      // console.log(err.response);
    });
};

// 회원가입 =======================================
export const userSignUpRequest =
  (fd, history, setModalMessage) => (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.message);
        dispatch({ type: EMAIL_SIGNUP }); //이메일 체크 완료상태 펄스로 바꾸기
        dispatch(goToHome(history));
        setModalMessage('회원가입 성공!');
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

// 로그인 ==========================================
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNIN_ERROR = 'USER_SIGNIN_ERROR';

export const userSignInRequest = (loginInfo, setModalMessage) => (dispatch) => {
  dispatch({ type: USER_SIGNIN });
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
    .catch(() => {
      dispatch({ type: USER_SIGNIN_ERROR });
      setModalMessage('이메일 혹은 비밀번호가 잘못 입력되었습니다');
    });
};

// 비밀번호 찾기
export const PWINQUIRY_INIT = 'PWINQUIRY_INIT';
export const PWINQUIRY_SUCCESS = 'PWINQUIRY_SUCCESS';
export const PWINQUIRY_ERROR = 'PWINQUIRY_ERROR';
export const pwinquiryInit = () => {
  return {
    type: PWINQUIRY_INIT,
  };
};
export const pwinquiry = (data) => (dispatch) => {
  dispatch(pwinquiryInit());
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/findpassword`,
      { email: data },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch({ type: PWINQUIRY_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: PWINQUIRY_ERROR });
    });
};

// # 겟
// 홈으로 이동
export const goToHome = (history) => () => {
  history.push('/');
};

// #USERINFO ===================
export const GET_USERINFO = 'GET_USERINFO';
export const GET_USERINFO_SUCCESS = 'GET_USERINFO_SUCCESS';
export const DELETE_USERINFO = 'DELETE_USERINFO';

export const getUserInfo = (accessToken, history) => (dispatch) => {
  dispatch({ type: GET_USERINFO });
  axios
    .get(`${process.env.REACT_APP_API_URL}/initialize`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log();
      dispatch(writeUserInfo(res.data.data));
      return res;
    })
    .then((res) => {
      const redirect = res.data.data.userset.redirect;
      history.push(redirect); // 기본값 /daily
    })
    .catch((err) => {
      // console.log(err.response);
    });
};
// 유저정보 저장
export const writeUserInfo = (data) => (dispatch) => {
  dispatch({ type: GET_USERINFO_SUCCESS, data });
};

// 탈퇴 =========================
export const deleteUserInfo = () => (dispatch) => {
  dispatch({ type: DELETE_USERINFO });
};

// #DAILY ================================
export const GET_DAILY = 'GET_DAILY';
export const GET_DAILY_SUCCESS = 'GET_DAILY_SUCCESS';

export const getDaily = (accessToken) => (dispatch) => {
  dispatch({ type: GET_DAILY });
  axios
    .get(`${process.env.REACT_APP_API_URL}/daypage`, {
      headers: {
        authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(setDaily(res.data.data));
    })
    .catch((err) => {
      // console.log(err.response);
    });
};

export const setDaily = (daily) => {
  return {
    type: GET_DAILY_SUCCESS,
    daily,
  };
};

export const postDaily = (data, accessToken) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/createspendmoney`,
      {
        categoryname: data.categoryname, // 'pig2'
        cost: data.cost,
        memo: data.memo,
        date: data.date,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(getDaily(accessToken));
    })
    .catch((err) => {
      // console.log(err.response);
    });
};

export const editDaily = (data, accessToken) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/editspendmoney`,
      {
        moneyId: data.moneyId,
        categoryname: data.categoryname,
        cost: data.cost,
        memo: data.memo,
        date: data.date,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(getDaily(accessToken));
    })
    .catch((err) => {
      // console.log(err.response);
    });
};
// TODO: 나중에 시간 되면 getDaily로 한번에 전체데이터를 받아오지 말고, 수정하거나 삭제한 내역만 받아오기
export const deleteDaily = (data, accessToken) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/deletespendmoney`,
      {
        moneyId: data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(getDaily(accessToken));
    })
    .catch((err) => {
      // console.log(err.response);
    });
};

export const categoryFilter = (data, accessToken) => (dispatch) => {
  let result;
  if (data.emoji) {
    result = {
      emoji: data.emoji,
    };
  } else if (data.date) {
    result = {
      message: 'dateSort',
    };
  } else if (data.memo) {
    result = {
      memo: data.memo,
    };
  }

  axios
    .post(`${process.env.REACT_APP_API_URL}/categorysort`, result, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(setDaily(res.data.data));
    });
};

// 설정 ==========================
// 유저정보 수정
export const USER_EDIT = 'USER_EDIT';

export const userEdit = (fd, accessToken, history) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/fixuserinfo`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      // dispatch(getUserInfo()) 유저인포 다시 불러오기
      // 홈으로 리다이렉트 됨 안대는대그러면...~~~~~~~~~
      dispatch(getUserInfo(accessToken, history));
    });
};

export const PASSWORD_EDIT = 'PASSWORD_EDIT';

export const passwordEdit =
  (data, accessToken, setModalMessage) => (dispatch) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/changepassword`,
        {
          password: data.password,
          newpassword: data.newpassword,
        },
        {
          headers: { authorization: `bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        // dispatch(userLogOut(accessToken, history));
        setModalMessage('비밀번호 변경이 완료되었습니다');
      })
      .catch((err) => {
        // console.log(err);
      });
  };

export const setRedirect = (data, accessToken) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/changemainpage`,
      {
        redirect: data,
      },
      {
        headers: { authorization: `bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err.response);
    });
};

// DELETE USER ==================================================
export const deleteUser = (accessToken, history) => async (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/deleteuser`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      // console.log(res);
      dispatch({ type: USER_LOGOUT });
      history.push({ pathname: '/' });
    })
    .catch((err) => {
      // console.log(err.response);
      alert('회원 탈퇴 요청을 실패했습니다');
    });
};

// DELETE USER DATA ==================================================
export const deleteData = (accessToken, history) => async (dispatch) => {
  // await dispatch({ type:  })
  axios
    .get(`${process.env.REACT_APP_API_URL}/deletedata`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      // console.log(res);
      //await dispatch({ type:  }); // 전체 데이터 삭제
      history.push({ pathname: '/daily' });
    })
    .catch((err) => {
      // console.log(err.response);
      alert('데이터 삭제 요청이 거절되었습니다');
    });
};

//월별 데이터

export const MONTHLY_DATA = 'MONTHLY_DATA';

export const monthlyData = (accessToken, monthlyBudget) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/getmonthlydata`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      // console.log('monthlydata is');
      // console.log(res.data.data.daily);
      dispatch({
        type: MONTHLY_DATA,
        data: res.data.data.daily,
        monthlyBudget: monthlyBudget,
      });
    })
    .catch((err) => {
      // console.log('monthlydata error is');
      // console.log(err.response);
    });
};

//연도별 데이터
export const YEARLY_DATA = 'YEARLY_DATA';

export const yearlyList = (accessToken) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/getyearlydata`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      // console.log('yearlydata is');
      // console.log(res.data.data);
      dispatch({ type: YEARLY_DATA, yearlyData: res.data.data });
    })
    .catch((err) => {
      // console.log('yearlydata error is');
      // console.log(err.response);
    });
};

// 예산 =============================
export const GET_BUDGET = 'GET_BUDGET';
export const GET_BUDGET_SUCCESS = 'GET_BUDGET_SUCCESS';
export const GET_BUDGET_ERROR = 'GET_BUDGET_ERROR';
export const CREATE_BUDGET_ERROR = 'CREATE_BUDGET_ERROR';

export const getBudget = (accessToken) => (dispatch) => {
  dispatch({ type: GET_BUDGET });
  axios
    .get(`${process.env.REACT_APP_API_URL}/budget`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_BUDGET_SUCCESS, data: res.data.data });
    })
    .catch((err) => {
      // console.log(err.response);
      dispatch({ type: GET_BUDGET_ERROR });
    });
};

export const createBudget = (data, accessToken) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/createcategoryinfo`,
      {
        categoryname: data.categoryname,
        budget: data.budget,
        emoji: data.emoji,
      },
      {
        headers: { authorization: `bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(getBudget(accessToken));
    })
    .catch((err) => {
      return err.response.data.message;
    });
};

export const editBudget = (data, accessToken) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/fixcategoryinfo`,
      {
        categoryId: data.categoryId,
        categoryname: data.categoryname,
        budget: data.budget,
        emoji: data.emoji,
      },
      {
        headers: { authorization: `bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(getBudget(accessToken));
    });
};

export const deleteBudget = (data, accessToken) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/deletecategory`,
      {
        categoryname: data,
      },
      {
        headers: { authorization: `bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(getBudget(accessToken));
    });
};

// Nav 이펙트

export const NAV_EFFECT = 'NAV_EFFECT';
export const navEffect = (data) => {
  return {
    type: NAV_EFFECT,
    data,
  };
};

// Yearly ================================================== // 액션 객체 생성 함수
export const GET_EXCEL = 'GET_EXCEL'; // 로딩값이 있는 경우 사용한다.
export const GET_EXCEL_SUCCESS = 'GET_EXCEL_SUCCESS';
export const GET_EXCEL_ERROR = 'GET_EXCEL_ERROR';
// 액션 타입 설정

export const importExcel = (accessToken) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/importexcel`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      // console.log(res.data.data.costList);
      const book = xlsx.utils.book_new();
      const costList = res.data.data.costList;
      xlsx.utils.book_append_sheet(book, costList, 'costList');
      xlsx.writeFile(book, 'costList.xlsx');
    })
    .catch((err) => {
      // console.log(err.response);
    });
};

//모달 메세지
export const SAVE_MODAL_MESSAGE = 'SAVE_MODAL_MESSAGE';
export const DELETE_MODAL_MESSAGE = 'DELETE_MODAL_MESSAGE';
export const IS_MODAL_TRUE = 'IS_MODAL_TRUE';
export const IS_MODAL_FALSE = 'IS_MODAL_FALSE';

export const saveModalMessage = (message) => (dispatch) => {
  dispatch({ type: SAVE_MODAL_MESSAGE, message: message });
};

export const deleteModalMessage = () => (dispatch) => {
  dispatch({ type: DELETE_MODAL_MESSAGE });
};

//체험하기 로그인
export const experimentLogin = (setModalMessage) => (dispatch) => {
  dispatch({ type: USER_SIGNIN });
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/login`,
      { email: 'scrooge@gmail.com', password: '123456' },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    )
    .then((res) => {
      dispatch(userLogin(res.data.data.accessToken));
    })
    .catch(() => {
      dispatch({ type: USER_SIGNIN_ERROR });
      setModalMessage('이메일 혹은 비밀번호가 잘못 입력되었습니다');
    });
};
