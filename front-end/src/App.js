import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { ThemeProvider } from '@mui/material/styles';

import Auth from './components/auth/Auth';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import Catan from './components/catan/Catan';
import VerifyUser from './components/auth/VerifyUser';

import CssBaseline from '@mui/material/CssBaseline';

import {darkTheme} from './assets/theme/theme';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
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
      </ThemeProvider>
    </Provider>
  );
}
export default App;