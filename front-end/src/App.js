import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './components/auth/Auth';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import Catan from './components/catan/Catan';
import VerifyUser from './components/auth/VerifyUser';

import CssBaseline from '@mui/material/CssBaseline';

const App = () => {

  return (
    <div >
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/auth' component={Auth}></Route>
          <Route exact path='/user/:id/verifyUser/:token' component={VerifyUser}></Route>
          <Route exact path='/profile' component={Profile}></Route>
          <Route exact path='/catan' component={Catan}></Route>
        </Switch>
      </BrowserRouter >
    </div >
  );
}
export default App;