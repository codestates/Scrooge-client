import React, { useEffect, useState } from 'react';
import Topper from '../components/Topper';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { navEffect, monthlyData, getDaily } from '../actions';

function Monthly() {
  const dispatch = useDispatch();
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { accessToken } = isLoggedInReducer.userLoggedIn;
  const monthlyReducer = useSelector((state) => state.monthlyReducer);
  const { data } = monthlyReducer.monthlyData;
  const dailyReducer = useSelector((state) => state.dailyReducer);
  const { loading, top } = dailyReducer.daily;
  const [isModal, setModal] = useState(false);
  const [dayInfo, setDayInfo] = useState({
    cost: '',
    date: '',
  });

  useEffect(() => {
    let url = new URL(window.location.href);
    dispatch(navEffect(url.pathname));
    dispatch(getDaily(accessToken));
    dispatch(monthlyData(accessToken, top.monthlyBudget));
  }, [dispatch, accessToken]);

  return loading ? (
    <div className="container">로딩중</div>
  ) : (
    <div className="container">
      <Topper />
      <FullCalendar
        height={'auto'}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridDay,dayGridWeek,dayGridMonth',
        }}
        events={data}
        eventClick={(info) => {
          setDayInfo({
            cost: info.event.title,
            date: info.event.startStr.split('-'),
          });
          setModal(!isModal);
        }}
      />
      {isModal ? (
        <div className="monthlyModal" onClick={() => setModal(!isModal)}>
          <div className="monthlyModal_inner_date">
            {Number(dayInfo.date[0])}년 {Number(dayInfo.date[1])}월{' '}
            {Number(dayInfo.date[2])}일
          </div>
          <div className="top hr" />
          <div className="monthlyModal_inner_cost">{dayInfo.cost}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Monthly;
