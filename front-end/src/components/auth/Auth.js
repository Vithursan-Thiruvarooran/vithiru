import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import { 
  Avatar, 
  Button, 
  CircularProgress, 
  Paper, 
  Grid, 
  Typography, 
  Container,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert,  AlertTitle} from '@mui/lab';
import CssBaseline from '@mui/material/CssBaseline';

import * as actionType from '../../constants/actionTypes';
import { signin, signup, update, deleteUser } from '../../actions/auth';
import { signUpValidationSchema, profileValidationSchema } from './validationSchemas';
import useStyles from './styles';
import Input from './Input';

const Auth = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const location = useLocation()
  const profile = location.pathname === '/profile';
  const [disabled, setDisabled] = useState(profile);
  const title = profile ? 'Profile' : 'Sign Up';
  const button = profile ? 'Update' : 'Sign Up';

  const authData = useSelector(state => state.auth);

  if (profile) {
    
    const user = JSON.parse(localStorage.getItem('profile'));

    if (!user) history.push('/auth');

    if (user && !authData.user) {
      dispatch({ type: actionType.LOGIN_SUCCESS, data: user })
    };
  }

  const { message } = useSelector(state => state.message);

  const handleSubmit = (values) => {
    //e.preventDefault();
    setLoading(true);
    //console.log(loading)
    if (profile) {
      dispatch(update(values, history))
        .then(() => {
          //window.location.reload();
          
          window.location.reload();
          //history.push('/profile');
        
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
    else if (formik.values.isSignup) {
      dispatch(signup(values, history))
        .then(() => {
          //window.location.reload();
          
          //window.location.reload();
          history.push('/');
        
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });

    } else {
      dispatch(signin(values, history))
        .then(() => {
          //window.location.reload();
          history.push('/');
         
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handleDelete = () => {
    //e.preventDefault();
    setLoading(true);
    handleCloseConfirm();
    //console.log(loading)
    
    dispatch(deleteUser(formik.values, history))
      .then(() => {
        //window.location.reload();
        history.push('/');
        
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    
  };

  const formik = useFormik({
    initialValues: {
      profile: profile,
      isSignup: profile,
      id: profile ? authData.user?.id : '',
      firstName: profile ? authData.user?.firstName : '',
      lastName: profile ? authData.user?.lastName : '',
      email: profile ? authData.user?.email : '',
      password: '',
      confirmPassword: '' 
    },
    validationSchema: profile ? profileValidationSchema : signUpValidationSchema,
    onSubmit: handleSubmit,
  });
 
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [loading, setLoading] = useState(false);

  const switchMode = () => {
    //setForm(initialState);
    formik.setFieldValue("isSignup", !(formik.values.isSignup))
    setShowPassword(false);
  };

  const toggleEdit = () => {
    setDisabled(!disabled);
    formik.resetForm();
  };

  const [openConfirm, setConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setConfirm(true);
  };

  const handleCloseConfirm = () => {
    setConfirm(false);
  };

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      <Paper color='transparent' className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{formik.values.isSignup ? title : 'Sign In'}</Typography>
        {profile && 
        <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={toggleEdit}>
            {disabled ? "Edit" : "Cancel"}
        </Button>}
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {formik.values.isSignup && (
              <>
                <Input
                  id="firstName"
                  name="firstName" 
                  label="First Name"
                  value={formik.values.firstName}
                  disabled={disabled}
                  handleChange={formik.handleChange} 
                  autoFocus 
                  half
                  error={formik.touched.password && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.password && formik.errors.firstName}
                />
                <Input
                  id="lastName"
                  name="lastName" 
                  label="Last Name"
                  value={formik.values.lastName}
                  disabled={disabled}
                  handleChange={formik.handleChange} 
                  half
                  error={formik.touched.password && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.password && formik.errors.lastName}
                />
              </>
            )}
            <Input
              id="email"
              name="email" 
              label="Email Address" 
              value={formik.values.email}
              disabled={disabled}
              handleChange={formik.handleChange} 
              type="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Input
              id="password"
              name="password" 
              label="Password" 
              value={formik.values.password}
              disabled={disabled}
              handleChange={formik.handleChange} 
              type={showPassword ? 'text' : 'password'}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              handleShowPassword={handleShowPassword}
            />
            {formik.values.isSignup && 
            <Input 
              name="confirmPassword" 
              label="Repeat Password"
              disabled={disabled}
              handleChange={formik.handleChange} 
              type="password"
              error={formik.touched.password && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.password && formik.errors.confirmPassword}
            />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading || disabled}>
            {loading && <CircularProgress size={25} />}
            {(!loading) && (formik.values.isSignup ? button : 'Sign In')}
          </Button>
          {profile && 
            <Button fullWidth variant="contained" color="secondary" onClick={handleClickOpenConfirm} disabled={loading || disabled}>
              {loading && <CircularProgress size={25} />}
              DELETE
            </Button>
          }
          <Grid container justifyContent="flex-end">
            <Grid item>
              {!profile && 
                <Button onClick={switchMode}>
                  {formik.values.isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                </Button>
              }
            </Grid>
          </Grid>
        </form>
        {message && (
          <div>
            <Alert variant="outlined" severity="error">
              <AlertTitle>Error</AlertTitle>
              {message}
            </Alert>
          </div>
        )}
      </Paper>
      <div>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Account Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>No</Button>
          <Button color="secondary" onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </Container>
  );
};

export default Auth;