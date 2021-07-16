import React from 'react';
import { useSelector } from 'react-redux';

function YearlyList() {
  const yearlyReducer = useSelector((state) => state.yearlyReducer);
  const { best, topthree, achieve } = yearlyReducer.yearlyData.bottom;

  function succeedPromise(result) {
    if (result) {
      return (
        <>
          <span className="yearly_bottom_container_inner_span">
            {result.date.split('-')[1]}월 {result.categoryname} {result.cost}원
          </span>
        </>
      );
    } else {
      return (
        <span className="yearly_bottom_container_inner_span">
          지출을 입력해주세요
        </span>
      );
    }
  }

  function mostCost(result) {
    if (result) {
      return (
        <>
          <div className="yearly_bottom_container_inner_result_dateMemo">
            {result.date.split('-')[1]}월 {result.date.split('-')[2]}일{' '}
            {result.memo}
          </div>
          <div className="yearly_bottom_container_inner_result_cost">
            {' '}
            {result.cost}원{' '}
          </div>
        </>
      );
    } else {
      return '지출을 입력해주세요';
    }
  }
  return (
    <div className="yearly_bottom">
      <div className="yearly_bottom_container">
        <div className="yearly_bottom_container_title">올해 성공한 약속</div>
        <div className="yearly_bottom_container_inner yearly_1">
          <div className="yearly_bottom_container_inner_rank">1위</div>
          <div className="yearly_bottom_container_inner_dateCategoryCost">
            {succeedPromise(best[0])}
          </div>
        </div>
        <div className="yearly_bottom_container_inner yearly_2">
          <div className="yearly_bottom_container_inner_rank">2위</div>
          <div className="yearly_bottom_container_inner_dateCategoryCost">
            {succeedPromise(best[1])}
          </div>
        </div>
        <div className="yearly_bottom_container_inner yearly_3">
          <div className="yearly_bottom_container_inner_rank">3위</div>
          <div className="yearly_bottom_container_inner_dateCategoryCost">
            {succeedPromise(best[2])}
          </div>
        </div>
      </div>
      <div className="yearly_bottom_container">
        <div className="yearly_bottom_container_title">올해 가장 큰 지출</div>
        <div className="yearly_bottom_container_inner yearly_1">
          <div className="yearly_bottom_container_inner_rank">1위</div>
          <div className="yearly_bottom_container_inner_result">
            {mostCost(topthree[0])}
          </div>
        </div>
        <div className="yearly_bottom_container_inner yearly_2">
          <div className="yearly_bottom_container_inner_rank">2위</div>
          <div className="yearly_bottom_container_inner_result">
            {mostCost(topthree[1])}
          </div>
        </div>
        <div className="yearly_bottom_container_inner yearly_3">
          <div className="yearly_bottom_container_inner_rank">3위</div>
          <div className="yearly_bottom_container_inner_result">
            {mostCost(topthree[2])}
          </div>
        </div>
      </div>{' '}
      <div className="yearly_bottom_container_achieve">
        <div className="yearly_bottom_container_title">올해 업적</div>
        <div className="yearly_bottom_container_achieve_title">
          <div>연속 스크루지 데이</div>
          <div className="yearly_bottom_container_achieve_resultdata">
            {achieve[0].scrooge}일
          </div>
        </div>
        <div className="yearly_bottom_container_achieve_title">
          <div>가장 적은 지출</div>
          <div className="yearly_bottom_container_achieve_resultdata">
            {achieve[0].leastspend}원
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearlyList;
