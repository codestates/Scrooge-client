import React from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
import Chart from 'react-google-charts';

function Testing() {
  // const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  // const { accessToken } = isLoggedInReducer.userLoggedIn;

  // //진행중

  //기본폼
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}/엔드포인트`, {
  //     headers: { authorization: `bearer ${accessToken}` },
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     console.log('엔드포인트 is');
  //     console.log(res.data.data);
  //   })
  //   .catch((err) => {
  //     console.log('엔드포인트 error is');
  //     console.log(err.response);
  //   });

  //통과한 것들
  /* 목록 

  
  //daypage

  axios
    .get(`${process.env.REACT_APP_API_URL}/daypage`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log('daypage is');
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log('daypage error is');
      console.log(err.response);
    });


  //budget
  axios
    .get(`${process.env.REACT_APP_API_URL}/budget`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log('budget is');
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log('budget error is');
      console.log(err.response);
    });


  //initialize
  axios
    .get(`${process.env.REACT_APP_API_URL}/initialize`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log('initialize is');
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log('initialize error is');
      console.log(err.response);
    });



  //getmonthlydata
  axios
    .get(`${process.env.REACT_APP_API_URL}/getmonthlydata`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log('monthlydata is');
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log('monthlydata error is');
      console.log(err.response);
    });

    //getyearlydata
  axios
    .get(`${process.env.REACT_APP_API_URL}/getyearlydata`, {
      headers: { authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log('yearlydata is');
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log('yearlydata error is');
      console.log(err.response);
    });


  // categorysort
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/categorysort`,
      { id: 1 },
      {
        headers: { authorization: `bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log('categorysort엔드포인트 is');
      console.log(res.data.message);
    })
    .catch((err) => {
      console.log('categorysort엔드포인트 error is');
      console.log(err.response);
    });

  // // /deletecategory
  // axios
  //   .post(
  //     `${process.env.REACT_APP_API_URL}/deletecategory`,
  //     { categoryname: '여가비' },
  //     {
  //       headers: { authorization: `bearer ${accessToken}` },
  //       withCredentials: true,
  //     }
  //   )
  //   .then((res) => {
  //     console.log('deletecategory엔드포인트 is');
  //     console.log(res.data.message);
  //   })
  //   .catch((err) => {
  //     console.log('deletecategory엔드포인트 error is');
  //     console.log(err.response);
  //   });

  // // /fixcategoryinfo
  // axios
  //   .post(
  //     `${process.env.REACT_APP_API_URL}/fixcategoryinfo`,
  //     {
  //       categoryId: 1,
  //       categoryname: 'FCI바꿀값',
  //       budget: 111111,
  //     },
  //     {
  //       headers: { authorization: `bearer ${accessToken}` },
  //       withCredentials: true,
  //     }
  //   )
  //   .then((res) => {
  //     console.log('fixcategoryinfo엔드포인트 is');
  //     console.log(res.data.message);
  //   })
  //   .catch((err) => {
  //     console.log('fixcategoryinfo엔드포인트 error is');
  //     console.log(err.response);
  //   });

  // // /createcategoryinfo
  // axios
  //   .post(
  //     `${process.env.REACT_APP_API_URL}/createcategoryinfo`,
  //     { categoryname: 'GCI 만든값', budget: 222222 },
  //     {
  //       headers: { authorization: `bearer ${accessToken}` },
  //       withCredentials: true,
  //     }
  //   )
  //   .then((res) => {
  //     console.log('createcategoryinfo엔드포인트 is');
  //     console.log(res.data.message);
  //   })
  //   .catch((err) => {
  //     console.log('createcategoryinfo엔드포인트 error is');
  //     console.log(err.response);
  //   });

  // // /importexcel
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}/importexcel`, {
  //     headers: { authorization: `bearer ${accessToken}` },
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     console.log('importexcel엔드포인트 is');
  //     console.log(res.data.data);
  //   })
  //   .catch((err) => {
  //     console.log('importexcel엔드포인트 error is');
  //     console.log(err.response);
  //   });

  // // /deletedata
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}/deletedata`, {
  //     headers: { authorization: `bearer ${accessToken}` },
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     console.log('deletedata엔드포인트 is');
  //     console.log(res.data.message);
  //   })
  //   .catch((err) => {
  //     console.log('deletedata엔드포인트 error is');
  //     console.log(err.response);
  //   });

  // // /darkmode
  // axios
  //   .post(
  //     `${process.env.REACT_APP_API_URL}/darkmode`,
  //     { darkmode: true },
  //     {
  //       headers: { authorization: `bearer ${accessToken}` },
  //       withCredentials: true,
  //     }
  //   )
  //   .then((res) => {
  //     console.log('darkmode엔드포인트 is');
  //     console.log(res.data.message);
  //   })
  //   .catch((err) => {
  //     console.log('darkmode엔드포인트 error is');
  //     console.log(err.response);
  //   });

  // // /changemainpage
  // axios
  //   .post(
  //     `${process.env.REACT_APP_API_URL}/changemainpage`,
  //     { redirect: 'New way' },
  //     {
  //       headers: { authorization: `bearer ${accessToken}` },
  //       withCredentials: true,
  //     }
  //   )
  //   .then((res) => {
  //     console.log('changemainpage엔드포인트 is');
  //     console.log(res.data.message);
  //   })
  //   .catch((err) => {
  //     console.log('changemainpage엔드포인트 error is');
  //     console.log(err.response);
  //   });

*/

  return (
    <div className="test_container">
      <Chart
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: 'date', id: 'Date' },
            { type: 'number', id: 'Won/Loss' },
          ],
          [new Date(2021, 6, 10), 5],
          [new Date(2021, 6, 13), 0],
          [new Date(2021, 7, 13), 0],
        ]}
        options={{
          width: 200,
          title: '달성 스크루지 데이',
          calendar: {
            cellColor: {
              stroke: '#76a7fa',
              strokeOpacity: 0.5,
              strokeWidth: 1,
            },
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
}

export default Testing;
