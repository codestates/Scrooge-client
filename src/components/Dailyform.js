import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { useSelector } from 'react-redux';
import { ChevronDownIcon } from '@heroicons/react/outline';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function Dailyform() {
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { accessToken } = isLoggedInReducer.userLoggedIn;

  const categoryMenu = useRef();
  const categoryBtn = useRef();
  const moneyInput = useRef();

  const dailyReducer = useSelector((state) => state.dailyReducer);
  const { categoryList } = dailyReducer.daily;

  const categoryDropdownHandler = () => {
    categoryMenu.current.classList.toggle('show');
  };

  const categoryMenuHandler = (e) => {
    categoryBtn.current.children[0].textContent = e.target.textContent;
    categoryMenu.current.classList.remove('show');
  };

  const moneyBtnHandler = (e) => {
    console.log('천원 추가');
    let money;
    if (!moneyInput.current.value) {
      moneyInput.current.value = '0';
    }
    money = Number(moneyInput.current.value);

    switch (e.target.textContent) {
      case '+10,000':
        money += 10000;
        console.log('만원 추가');
        break;
      case '+1,000':
        money += 1000;
        console.log('천원 추가');
        break;
      case '+100':
        money += 100;
        console.log('백원 추가');
        break;
      default:
        break;
    }
    console.log(moneyInput.current.value);
    moneyInput.current.value = money;
  };
  const [date, setDate] = useState(new Date()); // 날짜 선택

  const dailySubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/createspendmoney`,
        {
          cost: 10000,
          memo: '',
          categoryname: '지정되지 않은 카테고리',
          date,
        },
        {
          headers: { authorization: `bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <form className="daily_form">
        <div className="category_dropdown">
          <button
            type="button"
            className="category_toggle_btn"
            onClick={categoryDropdownHandler}
            ref={categoryBtn}
          >
            <p>카테고리</p>
            <ChevronDownIcon className="category_toggle_btn_icon" />
          </button>
          <ul
            className="category_menu"
            onClick={categoryMenuHandler}
            ref={categoryMenu}
          >
            {categoryList ? (
              <></>
            ) : (
              <>
                <li>카테고리 없음</li>
                <li>2</li>
                <li>3</li>
              </>
            )}
          </ul>
        </div>
        <div className="money">
          <input
            className="money_input"
            name="money"
            type="text"
            ref={moneyInput}
          />
          <label className="money_label" htmlFor="money">
            ￦
          </label>
          <div className="money_btn_group">
            <button
              type="button"
              className="money_btn"
              onClick={moneyBtnHandler}
            >
              +10,000
            </button>
            <button
              type="button"
              className="money_btn"
              onClick={moneyBtnHandler}
            >
              +1,000
            </button>
            <button
              type="button"
              className="money_btn"
              onClick={moneyBtnHandler}
            >
              +100
            </button>
          </div>
        </div>
        <input className="memo" type="text" placeholder="메모" />
        <DatePicker
          className="date_picker"
          selected={date}
          onChange={(date) => setDate(date)}
          locale={ko}
          dateFormat="yyyy-MM-dd"
        />
        <button className="daily_form_submit" onClick={dailySubmitHandler}>
          지출 내역 작성
        </button>
      </form>
    </>
  );
}

export default Dailyform;
