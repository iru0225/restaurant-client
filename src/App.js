import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';

import HeaderComponent from './components/header/header.component.jsx';
import IndexPage from './pages/base-page/index.page';
import SigninPage from './pages/signin/signin.page';
import OrderPage from './pages/order/order.page';

const CONTENT_STYLES = {
  marginTop: '5rem'
}

const App = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      let data = localStorage.getItem('user');
      if (!data) {
        return history.push('/signin');
      }

      setUser(JSON.parse(data));
    }
  }, [user]);

  const loginHandle = (val) => {
    setUser(val);
  }

  const logoutHandle = (val) => {
    setUser(null);
    localStorage.removeItem('user')
  }
  
  return (
    <div className="App">
      <HeaderComponent logout={logoutHandle} user={user}/>
      <div style={CONTENT_STYLES} className="content">
        <Switch>
          <Route exact path="/">
            {
              !user ? <Redirect to='/signin'/> : <IndexPage user={user}/>
            }
          </Route>
          <Route path="/signin">
            {
              user ? <Redirect to='/'/> : <SigninPage loginHandle={loginHandle} user={user}/>
            }
          </Route>
          <Route path="/order_history">
            {
              !user ? <Redirect to='/signin'/> : <OrderPage user={user}/>
            }
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
