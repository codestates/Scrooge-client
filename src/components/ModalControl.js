import React, { useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';

function ModalControl({
  SetText,
  SetBtnText,
  title,
  modelTextTop,
  modelTextMid,
  modelTextBot,
  buttonText,
  func,
}) {
  const modal = useRef();

  function modalHandler() {
    modal.current.classList.toggle('show');
  }
  return (
    <div className="user_setting_bottom_items">
      <div>{SetText}</div>
      <button className="user_setting_bottom_items_btn" onClick={modalHandler}>
        {SetBtnText}
      </button>
      <div className="modal" ref={modal}>
        <h3>{title}</h3>
        <button className="XIcon" onClick={modalHandler}>
          <XIcon />
        </button>
        <p>{modelTextTop}</p>
        <p>{modelTextMid}</p>
        <p>{modelTextBot}</p>
        <button className="submit" onClick={() => func()}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalControl;
