import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './components/auth/auth';
import Home from './components/home/home';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/auth' component={Auth}></Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;