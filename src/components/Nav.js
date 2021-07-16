import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo';
import {
  DocumentTextIcon,
  LogoutIcon,
  MenuIcon,
  ViewGridIcon,
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
  const cogIcon = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  });

  const handleClick = (e) => {
    try {
      if (!nav.current.contains(e.target)) {
        nav.current.classList.remove('show');
      }
    } catch (error) {
      return null;
    }
  };

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
    for (let i = 0; i < navMenu.current.childNodes.length; i++) {
      navMenu.current.childNodes[i].classList.remove('focused');
    }
    cogIcon.current.childNodes[0].classList.remove('focused');
    switch (currentPath) {
      case '/daily':
        navMenu.current.childNodes[0].classList.add('focused');
        break;
      case '/monthly':
        navMenu.current.childNodes[1].classList.add('focused');
        break;
      case '/yearly':
        navMenu.current.childNodes[2].classList.add('focused');
        break;
      case '/budget':
        navMenu.current.childNodes[3].classList.add('focused');
        break;
      case '/setting':
        cogIcon.current.childNodes[0].classList.add('focused');
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
            <li>
              <Link to="/daily" onClick={navCloseHandler}>
                <DocumentTextIcon className="nav_icon" />
                지출 리스트
              </Link>
            </li>
            <li>
              <Link to="/monthly" onClick={navCloseHandler}>
                <ViewGridIcon className="nav_icon" />
                월별
              </Link>
            </li>
            <li>
              <Link to="/yearly" onClick={navCloseHandler}>
                <GlobeIcon className="nav_icon" />
                연도별
              </Link>
            </li>
            <li>
              <Link to="/budget" onClick={navCloseHandler}>
                <ChartPieIcon className="nav_icon" />
                예산 관리
              </Link>
            </li>
          </ul>
          <footer className="nav_footer">
            <button className="nav_footer_btn" onClick={signOutHandler}>
              <LogoutIcon className="nav_icon" />
              로그아웃
            </button>
            <Link to="/setting">
              <button
                className="nav_footer_btn"
                onClick={navCloseHandler}
                ref={cogIcon}
              >
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
