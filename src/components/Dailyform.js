import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postDaily, editDaily } from '../actions';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { Emoji } from 'emoji-mart';

function Dailyform({ editMode, item }) {
  const dispatch = useDispatch();
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const dailyReducer = useSelector((state) => state.dailyReducer);
  const { accessToken } = isLoggedInReducer.userLoggedIn;
  const { categoryList } = dailyReducer.daily;

  // ref
  const dailyForm = useRef();
  const categoryMenu = useRef();
  const categoryBtn = useRef();
  const moneyInput = useRef();
  const memoInput = useRef();

  // 상태
  const [date, setDate] = useState(new Date()); // 날짜 선택
  const [inputData, setInputData] = useState({
    categoryname: 'grey_question',
    cost: '',
    memo: '',
    date: `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `date.getMonth() + 1`
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
  });
  const [err, setErr] = useState(null);
  const [categoryBtnEmoji, setCategoryBtnEmoji] = useState(null);

  // 수정폼 일 때
  useEffect(() => {
    // 초기 설정
    if (editMode) {
      dailyForm.current.classList.add('editMode');
    }
    if (item) {
      setCategoryBtnEmoji(item.emoji);
      moneyInput.current.placeholder = item.cost;
      memoInput.current.placeholder = item.memo || '메모';

      const dateArr = item.date.split('-');
      setDate(
        new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]))
      );
      setInputData({
        categoryname: item.emoji || 'grey_question',
        cost: String(item.cost),
        memo: item.memo || '',
        date: item.date,
        moneyId: item.moneyId,
      });
    }
  }, [editMode, item]);

  // 날짜
  const setDateHandler = (date) => {
    setDate(date);
    setInputData({
      ...inputData,
      date: `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `date.getMonth() + 1`
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
    });
  };

  // 카테고리 드롭다운
  const categoryDropdownHandler = () => {
    categoryMenu.current.classList.toggle('show');
  };

  // 카테고리 선택 핸들러
  const categoryMenuHandler = (e) => {
    if (e.target.textContent === '카테고리 없음') return;
    if (e.target.nodeName === 'SPAN') {
      setCategoryBtnEmoji(e.target.parentNode.parentNode.id);
      setInputData({
        ...inputData,
        categoryname: e.target.parentNode.parentNode.id,
      });
    } else if (e.target.nodeName === 'LI') {
      setCategoryBtnEmoji(e.target.id);
      setInputData({
        ...inputData,
        categoryname: e.target.id,
      });
    }
    categoryMenu.current.classList.remove('show');
  };

  // 금액 인풋
  const moneyBtnHandler = (e) => {
    let money;
    if (!moneyInput.current.value) {
      moneyInput.current.value = '0';
    }
    money = Number(moneyInput.current.value);

    switch (e.target.textContent) {
      case '+10,000':
        money += 10000;
        setInputData({
          ...inputData,
          cost: String(Number(inputData.cost) + 10000),
        });
        break;
      case '+1,000':
        money += 1000;
        setInputData({
          ...inputData,
          cost: String(Number(inputData.cost) + 1000),
        });
        break;
      case '+100':
        money += 100;
        setInputData({
          ...inputData,
          cost: String(Number(inputData.cost) + 100),
        });
        break;
      default:
        break;
    }
    moneyInput.current.value = money;
  };

  // 인풋 온체인지 핸들러
  const inputChangeHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    setErr(null);
  };

  // submit
  const dailySubmitHandler = (e) => {
    e.preventDefault();
    // 에러 메시지
    const re = '^[0-9]+$';
    if (!inputData.cost || !inputData.cost.match(re)) {
      if (!inputData.cost.match(re)) {
        setErr('숫자를 입력해주세요');
      }
      if (!inputData.cost) {
        setErr('금액을 적어주세요');
      }
      return;
    } else if (inputData.cost === '0') {
      setErr('0원은 안돼요');
      return;
    }

    // 작성, 수정
    switch (e.target.textContent) {
      case '지출 내역 작성':
        dispatch(postDaily(inputData, accessToken));
        break;
      case '지출 내역 수정':
        dispatch(editDaily(inputData, accessToken));
        break;
      default:
        return;
    }
  };

  return (
    <>
      <form className="daily_form" ref={dailyForm}>
        <div className="category_dropdown">
          <button
            type="button"
            className="category_toggle_btn"
            onClick={categoryDropdownHandler}
            ref={categoryBtn}
          >
            <Emoji
              emoji={categoryBtnEmoji || 'grey_question'}
              set="twitter"
              size={30}
            />
            <ChevronDownIcon className="category_toggle_btn_icon" />
          </button>
          <ul
            className="category_menu"
            onClick={categoryMenuHandler}
            ref={categoryMenu}
          >
            {categoryList && categoryList.length !== 0 ? (
              categoryList.map((el) => {
                return (
                  <li key={`categoryList-${el.id}`} id={el.emoji}>
                    <Emoji emoji={el.emoji} set="twitter" size={30} />
                  </li>
                );
              })
            ) : (
              <>
                <li className="disabled">카테고리 없음</li>
              </>
            )}
          </ul>
        </div>
        <div className="money">
          <input
            className="money_input"
            name="cost"
            type="text"
            ref={moneyInput}
            onChange={inputChangeHandler}
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
        <input
          className="memo"
          name="memo"
          type="text"
          placeholder="메모"
          onChange={inputChangeHandler}
          ref={memoInput}
        />
        <DatePicker
          className="date_picker"
          selected={date}
          onChange={(date) => {
            setDateHandler(date);
          }}
          locale={ko}
          dateFormat="yyyy-MM-dd"
        />
        {err ? (
          <div className="formErrMessage">
            <ExclamationCircleIcon />
            <div className="formErrMessage_message">{' ' + err}</div>
          </div>
        ) : (
          <></>
        )}
        <button className="daily_form_submit" onClick={dailySubmitHandler}>
          {editMode ? '지출 내역 수정' : '지출 내역 작성'}
        </button>
      </form>
    </>
  );
}

export default Dailyform;
