import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './Nav';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Daily from '../pages/Daily';
import Testing from '../pages/TestPage';
import Login from './Login';
import UserSetting from '../pages/UserSetting';
import Yearly from '../pages/Yearly';
import Budget from '../pages/Budget';
import Monthly from '../pages/Monthly';
import Pwinquiry from '../pages/Pwinquiry';

function ScoorgeRoute() {
  const isLoggedInReducer = useSelector((state) => state.isLoggedInReducer);
  const { isLoggedIn, accessToken } = isLoggedInReducer.userLoggedIn;

  return (
    <Router>
      {isLoggedIn && <Nav />}
      <Switch>
        {!accessToken ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/pwinquiry">
              <Pwinquiry />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/test">
              <Testing />
            </Route>
            <Route exact path="/daily">
              <Daily />
            </Route>
            <Route exact path="/monthly">
              <Monthly />
            </Route>
            <Route exact path="/yearly">
              <Yearly />
            </Route>
            <Route exact path="/budget">
              <Budget />
            </Route>
            <Route exact path="/setting">
              <UserSetting />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default ScoorgeRoute;
