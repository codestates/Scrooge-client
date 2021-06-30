import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './Nav';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Daily from '../pages/Daily';
import Testing from '../pages/TestPage';

function ScoorgeRoute() {
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { isLoggedIn, accessToken } = isLoggedInReducer.userLoggedIn;

  return (
    <Router>
      {isLoggedIn && <Nav />}
      <Switch>
        {!accessToken ? (
          //accessToken으로 변경하기
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            {/* // TODO: 랜딩, 로그인, 로그아웃 페이지 */}
          </>
        ) : (
          <>
            <Route exact path="/test">
              <Testing />
            </Route>
            <Route exact path="/daily">
              <Daily />
            </Route>
            {/* // TODO: 일별, 월별, 년별, 설정, 예산관리 */}
          </>
        )}
      </Switch>
    </Router>
  );
}

export default ScoorgeRoute;
