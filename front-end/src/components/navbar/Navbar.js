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

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';

import AccountMenu from './AccountMenu';

const drawerWidth = 240;

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

  const authData = useSelector(state => state.auth);

  const user = JSON.parse(localStorage.getItem('profile'));

  //console.log(user);

  if (user && !authData.user) {
    dispatch({ type: actionType.LOGIN_SUCCESS, data: user })
  };
  
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    
    history.push('/auth');
    //window.location.reload();
  };

  useEffect(() => {
    //const token = user?.token;

    if (authData?.token) {
      const decodedToken = decode(authData.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

  }, [authData]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        vithiru
      </Typography>
      <Divider />
      <List>
        <ListItem key='Home' disablePadding>
          <ListItemButton 
            component={Link} 
            to={{
              pathname: "/"
            }}
            sx={{ textAlign: 'center' }}>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        <ListItem key='Catan' disablePadding>
          <ListItemButton 
            component={Link} 
            to={{
              pathname: "/catan"
            }}
            sx={{ textAlign: 'center' }}>
            <ListItemText primary='Catan Form' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar 
          //color='transparent' 
          //position='static' 
          sx={{
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            display: 'flex',
            flexDirection: 'row',
            padding: '10px 20px',  
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        
          <Typography 
            component={Link} 
            to="/" 
            variant="h2" 
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
              vithiru
          </Typography>
  
          <Toolbar sx={{ padding: 0 }}>
            {authData.user ? (
              <>
                {/* <div className={classes.profile}> */}
                <AccountMenu authData={authData} logout={logout}></AccountMenu>
                  <Typography 
                    component={Link} 
                    to="/" 
                    //className={classes.userName} 
                    variant="h6"
                    sx={{ 
                      textDecoration: "none", 
                      alignItems: 'center', 
                      display: 'flex' 
                    }}
                  >
                      {authData?.user.firstName}
                  </Typography>
                  
                {/* </div>  */}
              </>
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
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </React.Fragment>
  );
}

export default Navbar;