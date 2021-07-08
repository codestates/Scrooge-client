import React from 'react';
import { useSelector } from 'react-redux';
import DailyListItem from './DailyListItem';

function DailyList() {
  const dailyReducer = useSelector((state) => state.dailyReducer);
  const { bottom } = dailyReducer.daily;
  console.log(bottom);
  return (
    <>
      <div className="top hr"></div>
      {bottom.length === 0 ? (
        <div className="dailyList">
          <div className="empty_state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="214"
              height="214"
              viewBox="0 0 214 214"
              fill="none"
            >
              <circle cx="107" cy="107" r="107" fill="#E3EBFF" />
              <mask
                id="mask0"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="214"
                height="214"
              >
                <circle cx="107" cy="107" r="107" fill="#F1F5FF" />
              </mask>
              <g mask="url(#mask0)">
                <rect
                  x="20"
                  y="168"
                  width="173"
                  height="20"
                  rx="7"
                  fill="#385AD2"
                />
              </g>
              <rect
                x="20"
                y="110"
                width="54"
                height="16"
                rx="8"
                fill="#385AD2"
              />
              <rect
                x="80"
                y="110"
                width="53"
                height="16"
                rx="8"
                fill="#385AD2"
              />
              <rect
                x="139"
                y="110"
                width="54"
                height="16"
                rx="8"
                fill="#385AD2"
              />
              <rect
                x="20"
                y="78"
                width="173"
                height="27"
                rx="11"
                fill="white"
              />
              <rect
                x="20"
                y="134"
                width="173"
                height="27"
                rx="11"
                fill="white"
              />
              <rect x="20" y="44" width="84" height="27" rx="11" fill="white" />
              <path
                d="M97 55L93.5 59L90 55"
                stroke="#385AD2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="109"
                y="44"
                width="84"
                height="27"
                rx="11"
                fill="white"
              />
              <ellipse cx="56.5" cy="57" rx="7.5" ry="8" fill="#D5E0F1" />
              <rect
                x="27"
                y="86"
                width="85"
                height="12"
                rx="6"
                fill="#D5E0F1"
              />
              <rect
                x="27"
                y="141"
                width="53"
                height="12"
                rx="6"
                fill="#D5E0F1"
              />
              <rect
                x="126"
                y="51"
                width="52"
                height="12"
                rx="6"
                fill="#D5E0F1"
              />
              <path
                d="M115.842 186.936L127.756 191.909L121.102 198.727L115.842 186.936Z"
                fill="white"
              />
              <path
                d="M111.971 190.278L109.233 193.019M123.375 194.375L120.792 200.833L115.625 186.625L129.833 191.792L123.375 194.375ZM123.375 194.375L129.833 200.833L123.375 194.375ZM113.284 177.892L114.288 181.634L113.284 177.892ZM110.634 185.288L106.891 184.285L110.634 185.288ZM122.019 180.231L119.278 182.972L122.019 180.231Z"
                stroke="#152253"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M122.314 193.314C122.471 193.158 122.654 193.043 122.849 192.97L125.628 191.859L118.133 189.133L120.858 196.628L121.97 193.849C122.043 193.654 122.158 193.471 122.314 193.314Z"
                fill="white"
              />
            </svg>
            <p>지출 내역을 작성해보세요!</p>
          </div>
        </div>
      ) : (
        <div className="dailyList">
          <div className="dailyList_tag">
            <div>예산</div>
            <div>지출 금액</div>
            <div>메모</div>
            <div>날짜</div>
          </div>
          {bottom.map((item) => {
            return (
              <DailyListItem
                key={`dailyListItem-${item.moneyId}`}
                item={item}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default DailyList;
