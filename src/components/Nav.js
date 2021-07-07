import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo';
import {
  DocumentTextIcon,
  LogoutIcon,
  MenuIcon,
  ChartPieIcon,
  GlobeIcon,
  XIcon,
} from '@heroicons/react/outline';
import { CogIcon } from '@heroicons/react/solid';
import UserProfile from './UserProfile';
import { getUserInfo, userLogOut } from '../actions';

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const navEffectReducer = useSelector((state) => state.navEffectReducer);
  const { accessToken } = isLoggedInReducer.userLoggedIn;
  const { currentPath } = navEffectReducer.navEffect;

  useEffect(() => {
    dispatch(getUserInfo(accessToken, history));
  }, [accessToken, history, dispatch]);
  useEffect(() => {
    navEffectHandler();
  });

  const nav = useRef();
  const navMenu = useRef();
  const navOpenHandler = () => {
    nav.current.classList.add('show');
  };
  const navCloseHandler = () => {
    nav.current.classList.remove('show');
  };

  const signOutHandler = () => {
    dispatch(userLogOut(accessToken, history));
  };
  const navEffectHandler = () => {
    switch (currentPath) {
      case '/daily':
        console.log('데이페이지');
        break;
      case '/monthly':
        console.log('월별페이지');
        break;
      case '/yearly':
        console.log('년도별페이지');
        break;
      case '/budget':
        console.log('예산관리페이지');
        break;
      case '/setting':
        console.log('세팅페이지');
        break;
      default:
        return;
    }
  };
  return (
    <>
      <nav className="nav" ref={nav}>
        <div className="nav_container">
          <Logo />
          <button className="nav_toggle_X_btn" onClick={navCloseHandler}>
            <XIcon />
          </button>
          <UserProfile />
          <ul className="nav_container_ul" ref={navMenu}>
            <li className="focused">
              <Link to="/daily" onClick={navCloseHandler}>
                <DocumentTextIcon className="nav_icon " />
                지출 리스트
              </Link>
            </li>
            <li>
              <Link to="/monthly">
                <DocumentTextIcon className="nav_icon " />
                월별
              </Link>
            </li>
            <li>
              <Link to="/yearly" onClick={navCloseHandler}>
                <GlobeIcon className="nav_icon " />
                연도별
              </Link>
            </li>
            <li>
              <Link to="/budget" onClick={navCloseHandler}>
                <ChartPieIcon className="nav_icon " />
                예산 관리
              </Link>
            </li>
            {/* <li>
              <Link to="/test">
                <DocumentTextIcon className="nav_icon " />
                테스트
              </Link>
            </li> */}
          </ul>
          <footer className="nav_footer">
            <button className="nav_footer_btn" onClick={signOutHandler}>
              <LogoutIcon className="nav_icon" />
              로그아웃
            </button>
            <Link to="/setting">
              <button className="nav_footer_btn" onClick={navCloseHandler}>
                <CogIcon className="nav_icon_cog" />
              </button>
            </Link>
          </footer>
        </div>
      </nav>
      <button className="nav_toggle" onClick={navOpenHandler}>
        <MenuIcon className="nav_toggle_btn" />
      </button>
    </>
  );
}

export default Nav;
