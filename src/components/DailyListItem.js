import React, { useRef, useState } from 'react';
import { DotsVerticalIcon, XIcon } from '@heroicons/react/outline';
import { Emoji } from 'emoji-mart';
import Dailyform from './Dailyform';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDaily } from '../actions';

function DailyListItem({ item }) {
  const dispatch = useDispatch();
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { accessToken } = isLoggedInReducer.userLoggedIn;

  const { cost, date, emoji, memo, moneyId } = item;

  const dailyEditMenu = useRef();
  const deleteWarnDropDown = useRef();

  const [edit, setEdit] = useState(false);

  const dailyEditBtnHandler = () => {
    dailyEditMenu.current.classList.toggle('show');
  };
  const dailyEditBtnHandlerBlur = () => {
    dailyEditMenu.current.classList.remove('show');
  };

  const editModeOnHandler = () => {
    setEdit(true);
  };

  const deleteDropDownHandler = () => {
    deleteWarnDropDown.current.classList.toggle('show');
  };
  const deleteItemHandler = () => {
    dispatch(deleteDaily(moneyId, accessToken));
  };
  return (
    <>
      {edit ? (
        <Dailyform editMode={true} item={item} />
      ) : (
        <div className="dailyList_item">
          <div>
            <Emoji emoji={emoji} set="twitter" size={30} />
          </div>
          <div className="">{cost}</div>
          <div className="">{memo}</div>
          <div className="">{date}</div>
          <div className="dailyList_item_dropdown">
            <button
              className="dailyList_icon_btn"
              onClick={dailyEditBtnHandler}
              onBlur={dailyEditBtnHandlerBlur}
            >
              <DotsVerticalIcon className="dailyList_icon" />
            </button>
            <ul className="dailyList_item_dropdown_menu" ref={dailyEditMenu}>
              <li
                className="dailyList_item_dropdown_menu_item"
                onClick={editModeOnHandler}
              >
                수정
              </li>
              <li className="daily hr"></li>
              <li
                className="dailyList_item_dropdown_menu_item"
                onClick={deleteDropDownHandler}
              >
                삭제
              </li>
            </ul>
          </div>
          <div className="modal" ref={deleteWarnDropDown}>
            <h3>경고</h3>
            <button className="XIcon" onClick={deleteDropDownHandler}>
              <XIcon />
            </button>
            <p>
              해당 내역을 삭제하면
              <br />
              복구할 수 없습니다.
            </p>
            <button className="delete submit" onClick={deleteItemHandler}>
              영구 삭제
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DailyListItem;
