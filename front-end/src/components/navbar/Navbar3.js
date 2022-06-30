import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import useStyles from './styles';
import { debounce } from '../../utilities/helpers';

import AccountMenu from './AccountMenu';
import Sidebar from './Sidebar';

const Navbar = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const authData = useSelector(state => state.auth);

  const user = JSON.parse(localStorage.getItem('profile'));

  //console.log(user);

  if (user && !authData.user) {
    dispatch({ type: actionType.LOGIN_SUCCESS, data: user })
  };
  
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  const navbarStyles = {
    position: 'fixed',
    height: '60px',
    width: '100%',
    textAlign: 'center',
    transition: 'top 0.6s',
    background: 'transparent',
  }

  return (
    <div style={{ ...navbarStyles, top: visible ? '0' : '-80px' }}>
      <CssBaseline />
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
    </div >
  )
};

export default Navbar;
