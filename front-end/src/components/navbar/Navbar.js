import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import useStyles from './styles';

import AccountMenu from './AccountMenu';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const authData = useSelector(state => state.auth);

  const user = JSON.parse(localStorage.getItem('profile'));

  //console.log(user);

  if (user && !authData.user) {
    dispatch({ type: actionType.LOGIN_SUCCESS, data: user })
  };
  
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    
    history.push('/auth');
    window.location.reload();
  };

  useEffect(() => {
    //const token = user?.token;

    if (authData?.token) {
      const decodedToken = decode(authData.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

  }, [authData]);  

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color='transparent' classes={ {root: classes.appBar} }>
          <div className={classes.brandContainer}>
            <Typography 
              component={Link} 
              to="/" 
              className={classes.heading} 
              variant="h2" 
              align="left">
                Dash
            </Typography>
          </div>
          <Toolbar className={classes.toolbar}>
            {authData.user ? (
              <div className={classes.profile}>
                <AccountMenu authData={authData} logout={logout}></AccountMenu>
                <Typography 
                  component={Link} 
                  to="/" 
                  className={classes.userName} 
                  variant="h6">
                    {authData?.user.firstName}
                </Typography>
                {/* <Button variant="contained" className={classes.logout} color="primary" onClick={logout}>Logout</Button> */}
              </div>
            ) : (
              <Button 
                component={Link} 
                to="/auth" 
                variant="contained" 
                color="primary">
                  Sign In
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}

export default Navbar;