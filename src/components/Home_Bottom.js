import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

function Home_Bottom() {
  const [showItem, setItem] = useState({
    title: '지출 내역 작성',
    inform: [
      '버튼 세 개로 작성하는 놀라운 지출 내역.',
      '가계부계의 종결자 다운 Simple한 기능.',
    ],
    photo: process.env.PUBLIC_URL + '/first.gif',
    id: 0,
  });

  const ImgComponent = () => {
    return (
      <>
        <img className="landing_item_photo_gif" src={showItem.photo} alt="" />
        <img
          className="landing_item_photo_iphone"
          src={process.env.PUBLIC_URL + '/iphone.png'}
          alt=""
        />
      </>
    );
  };

  const TitleComponent = () => {
    return <div className="landing_item_literal_title">{showItem.title}</div>;
  };

  const InformComponent = () => {
    return (
      <div className="landing_item_literal_inform">
        <div className="landing_item_literal_inform_1">
          {showItem.inform[0]}
        </div>
        <div className="landing_item_literal_inform_2">
          {showItem.inform[1]}
        </div>
      </div>
    );
  };

  const slidePlusBtn = (e) => {
    if (showItem.id === 1) {
      setItem({ ...showItem, ...itemlist[0] });
    } else {
      let filtered = itemlist.filter((el) => {
        if (showItem.id === 1) {
          return el.id === 0;
        } else {
          return el.id === showItem.id + 1;
        }
      });
      setItem({ ...showItem, ...filtered[0] });
      console.log(filtered);
      console.log(showItem);
    }
  };

  const slideMinusBtn = (e) => {
    if (showItem.id === 0) {
      setItem({ ...showItem, ...itemlist[1] });
    } else {
      let filtered = itemlist.filter((el) => {
        if (showItem.id === 0) {
          return el.id === 1;
        } else {
          return el.id === showItem.id - 1;
        }
      });
      setItem({ ...showItem, ...filtered[0] });
    }
  };

  const itemlist = [
    {
      title: '지출 내역 작성',
      inform: [
        '버튼 세 개로 작성하는 놀라운 지출 내역.',
        '가계부 계의 종결자 다운 Simple한 기능.',
      ],
      photo: process.env.PUBLIC_URL + '/first.gif',
      id: 0,
    },
    {
      title: '예산 작성 / 수정 / 삭제',
      inform: ['내가 만든 목표.', '내가 만든 대로 만들어지는 정보.'],
      photo: process.env.PUBLIC_URL + '/second.gif',
      id: 1,
    },
  ];

  return (
    <>
      <h2>
        사용하기 쉬운
        <br />
        심플한 인터페이스
      </h2>
      <div id="landing_item_container" className="landing_item_container">
        <div className="landing_item_literal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 769 709"
            fill="none"
            className="landing_item_postit"
          >
            <path
              d="M33 674L43 635L740.5 33C766 244 771.667 570.333 766 701C622 722.6 217.333 692 33 674Z"
              fill="#AFBFD6"
            />
            <path
              d="M748.743 25.4786L45.0231 0C45.0231 0 45.0231 582 0 662C0 662 557 703 665.204 685.153C729 662 751.14 246.478 748.743 25.4786Z"
              fill="#F1F5FF"
            />
          </svg>
          <TitleComponent />
          <InformComponent />
        </div>
        <div className="landing_item_photo">
          <div className="landing_item_photo_container">
            <ImgComponent />
          </div>
          <div className="landing_item_btns">
            <ChevronLeftIcon className="clickMinus" onClick={slideMinusBtn} />
            <ChevronRightIcon className="clickPlus" onClick={slidePlusBtn} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home_Bottom;
