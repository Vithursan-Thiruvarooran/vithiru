import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './components/auth/Auth';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';

import useStyles from './App.styles';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/auth' component={Auth}></Route>
          <Route exact path='/profile' component={Profile}></Route>
        </Switch>
        {/* <div style={{ marginTop: '1500px' }}>
          asdfashdjkfhaskjdf
        </div> */}
      </BrowserRouter >
    </div >
  );
}
export default App;