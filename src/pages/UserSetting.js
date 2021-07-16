import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  userEdit,
  navEffect,
  importExcel,
  deleteUser,
  deleteData,
  passwordEdit,
  userLogOut,
  saveModalMessage,
  setRedirect,
  getUserInfo,
} from '../actions';
import { useHistory } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import ModalControl from '../components/ModalControl';

function UserSetting() {
  const dispatch = useDispatch();
  const history = useHistory();

  const redirectForm = useRef();

  const userInfoReducer = useSelector((state) => state.userInfoReducer);
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { userName, userPhoto, userEmail, redirect } = userInfoReducer.userInfo;
  const { accessToken, path } = isLoggedInReducer.userLoggedIn;

  const [isPassword, setPassword] = useState(false);
  const [tempInfo, setTempInfo] = useState({
    username: userName,
    photo: null,
    password: null,
    passwordCheck: null,
  });
  const [incodingFile, setIncodingFile] = useState(null);

  //======================================
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  });
  const handleClick = () => {
    setModalMessage('');
  };

  if (modalMessage) {
    setTimeout(() => {
      dispatch(userLogOut(accessToken, history));
    }, 4000);

    setTimeout(() => {
      setModalMessage('잠시후 로그아웃됩니다');
    }, 2000);
  }
  //=====================================

  useEffect(() => {
    let url = new URL(window.location.href);
    dispatch(navEffect(url.pathname));
    switch (redirect) {
      case '/daily':
        redirectForm.current.childNodes[0].childNodes[0].checked = true;
        break;
      case '/monthly':
        redirectForm.current.childNodes[1].childNodes[0].checked = true;
        break;
      case '/yearly':
        redirectForm.current.childNodes[2].childNodes[0].checked = true;
        break;
      default:
        return;
    }
  }, [dispatch, redirect]);

  const importexceleventhandler = async () => {
    // 엑셀 다운
    await dispatch(importExcel(accessToken));
  };

  const deleteUserEventHandler = async () => {
    // 회원 탈퇴 3
    await dispatch(deleteUser(accessToken, history));
  };

  const deleteUserDataEventHandler = async () => {
    // 데이터 삭제
    await dispatch(deleteData(accessToken, history));
  };

  function inputHandler(e) {
    setTempInfo({ ...tempInfo, [e.target.name]: e.target.value });
  }

  function inputPhoto(e) {
    let file = e.target.files[0];
    setTempInfo({
      ...tempInfo,
      photo: file,
    });
    // 인코딩 후 미리보기에 표시
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setIncodingFile(e.target.result);
      };
    } else {
      setIncodingFile(null);
    }
  }

  const editInfoRequestHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (tempInfo.photo) {
      fd.append('username', tempInfo.username);
      fd.append('photo', tempInfo.photo);
    } else {
      fd.append('username', tempInfo.username);
    }
    dispatch(userEdit(fd, accessToken, history));
  };

  const editPasswordRequestHandler = async (e) => {
    e.preventDefault();
    if (isPassword) {
      if (!tempInfo.password || !tempInfo.passwordCheck) {
        setModalMessage('비밀번호를 입력해주세요');
      } else if (tempInfo.newpassword !== tempInfo.passwordCheck) {
        setModalMessage('비밀번호를 확인해주세요');
      }
    }

    dispatch(passwordEdit(tempInfo, accessToken, setModalMessage));
  };

  const mainPageSettingHandler = (e) => {
    e.preventDefault();
    const radio = redirectForm.current.childNodes;
    for (let i = 0; i < 3; i++) {
      if (radio[i].childNodes[0].checked) {
        dispatch(setRedirect(radio[i].childNodes[0].value, accessToken));
      }
    }
  };

  return (
    <div className="container user_setting">
      <div className="user_setting_wrap">
        <div className="user_setting_edit">
          {isPassword ? (
            <>
              <form className="edit_form">
                <button className="back_btn" onClick={() => setPassword(false)}>
                  <ChevronLeftIcon className="back_icon" />
                </button>
                <div className="edit_form_password">
                  <div className="edit_form_input_group">
                    <label htmlFor="password" className="edit_form_label">
                      기존 비밀번호
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={inputHandler}
                      className="edit_input"
                      required
                    />
                  </div>
                  <div className="edit_form_input_group">
                    <label htmlFor="password" className="edit_form_label">
                      새 비밀번호
                    </label>
                    <input
                      id="newpassword"
                      name="newpassword"
                      type="password"
                      onChange={inputHandler}
                      className="edit_input"
                      required
                    />
                  </div>
                  <div className="edit_form_input_group">
                    <label className="edit_form_label" htmlFor="passwordCheck">
                      비밀번호 확인
                    </label>
                    <input
                      id="passwordCheck"
                      name="passwordCheck"
                      type="password"
                      onChange={inputHandler}
                      className="edit_input"
                      required
                    />
                  </div>
                  <button
                    className="edit_submit"
                    onClick={editPasswordRequestHandler}
                  >
                    비밀번호 변경
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <form className="edit_form">
                <div className="edit_form_photo">
                  <label htmlFor="photo">
                    <img src={incodingFile || userPhoto} alt="사진" />
                  </label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/jpg, image/png, image/jpeg, image/gif"
                    onChange={inputPhoto}
                    className="edit_input image_input"
                  />
                </div>
                <div className="edit_form_info">
                  <div className="edit_form_input_group">
                    <label className="edit_form_label" htmlFor="nickname">
                      사용자명
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="username"
                      onChange={inputHandler}
                      className="edit_input"
                      placeholder={userName}
                    ></input>
                  </div>
                  <div className="edit_form_input_group">
                    <label className="edit_form_label" htmlFor="email">
                      이메일
                    </label>
                    <div className="edit_input edit_input_email">
                      {userEmail}
                    </div>
                  </div>
                  <div className="edit_form_changepw">
                    {!path ? (
                      <span
                        className="change_password"
                        onClick={() => setPassword(true)}
                      >
                        비밀번호 변경
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <button
                    className="edit_submit"
                    onClick={editInfoRequestHandler}
                  >
                    수정
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        <div className="user_setting_bottom">
          <div className="user_setting_bottom_items">
            <div className="user_setting_bottom_texts">메인페이지설정</div>
            <form className="user_setting_bottom_save" ref={redirectForm}>
              <div className="radio">
                <input type="radio" id="day" name="radio" value="/daily" />
                <label className="radio-label" htmlFor="day">
                  일별
                </label>
              </div>
              <div className="radio">
                <input type="radio" id="month " name="radio" value="/monthly" />
                <label className="radio-label" htmlFor="month ">
                  월별
                </label>
              </div>
              <div className="radio">
                <input type="radio" id="year" name="radio" value="/yearly" />
                <label className="radio-label" htmlFor="year">
                  년별
                </label>
              </div>
              <button onClick={mainPageSettingHandler}>저장</button>
            </form>
          </div>
          <ModalControl
            SetText="데이터 내보내기"
            SetBtnText="다운로드"
            title="엑셀 파일 다운하기"
            modelTextTop=""
            modelTextMid="costList.xlsx"
            modelTextBot=""
            buttonText="다운로드"
            func={importexceleventhandler}
          />
          <div className="user_setting_bottom_items">
            <div className="user_setting_bottom_texts">다크모드</div>
            <div className="user_setting_bottom_level">
              - 2 레벨부터 사용가능
            </div>
          </div>
          <div className="user_setting_bottom_items">
            <div className="user_setting_bottom_texts">테마 설정</div>
            <div className="user_setting_bottom_level">
              - 2 레벨부터 사용가능
            </div>
          </div>
          <div className="user_setting_bottom_items">
            <div className="user_setting_bottom_texts">주기 설정</div>
            <div className="user_setting_bottom_level">
              - 2 레벨부터 사용가능
            </div>
          </div>
          <ModalControl
            SetText="전체 데이터 삭제"
            SetBtnText="영구 삭제"
            title="경고"
            modelTextTop="해당 버튼은 지출 내역, 카테고리가"
            modelTextMid="모두 영구적으로 삭제되는 버튼입니다."
            modelTextBot="모든 데이터를 삭제하시겠습니까?"
            buttonText="영구 삭제"
            func={deleteUserDataEventHandler}
          />
          <ModalControl
            SetText="회원탈퇴"
            SetBtnText="회원탈퇴"
            title="경고"
            modelTextTop="회원 탈퇴를 하시면"
            modelTextMid="회원님의 데이터가 영구적으로 삭제됩니다."
            modelTextBot=""
            buttonText="회원탈퇴"
            func={deleteUserEventHandler}
          />
          {modalMessage ? (
            <div className="homeModal">
              <div className="homeModal_message">{modalMessage}</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSetting;
