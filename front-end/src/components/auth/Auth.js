import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { 
  Avatar,
  Alert,
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
import CssBaseline from '@mui/material/CssBaseline';

import * as actionType from '../../constants/actionTypes';
import { signin, signup, update, deleteUser } from '../../actions/auth';
import { signUpValidationSchema, profileValidationSchema } from '../validationSchemas/validationSchemas';
import TextInput from '../formInputs/TextInput';
import FormButton from '../formInputs/FormButton';

// const FormButton = styled(Button)(({ theme }) => ({
//   marginTop: 15,
// }));

const Auth = ({profile}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  //const location = useLocation()
  //const profile = location.pathname === '/profile';
  const [disabled, setDisabled] = useState(profile);
  const title = profile ? 'Profile' : 'Sign Up';
  const button = profile ? 'Update' : 'Sign Up';

  const authData = useSelector(state => state.auth);
  //console.log(authData);

  if (profile) {
    const user = JSON.parse(localStorage.getItem('profile'));

    if (!user) history.push('/auth');

    if (user && !authData.user) {
      dispatch({ type: actionType.LOGIN_SUCCESS, data: user })
    };
  }

  const message = useSelector(state => state.message.text);

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
    <Container component="main" maxWidth="xs" sx={{paddingTop: '150px'}}>
      <CssBaseline />
      <Paper elevation={6}
        sx={
          {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            backgroundColor: 'black',
          }
        }
      >
        <Grid container spacing={2} justifyContent="center">
        
          <Grid item container spacing={1} justifyContent="center">
            <Grid item xs={12} align="center">
              <Avatar >
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography variant="h5">
                {formik.values.isSignup ? title : 'Sign In'}
              </Typography>
            </Grid>
            
            { profile &&
              <Grid item align="center">
                <Alert align="center" variant="standard" severity={authData.user?.active ? 'success' : 'error'}>
                  {authData.user?.active ? "Account is verified" : 'Account needs verification'}
                </Alert>
              </Grid>
            }
          </Grid>

          <Grid item xs={12} sm={12} > 
            {profile && 
              <FormButton 
                fullWidth 
                variant="contained" 
                color="primary" 
                onClick={toggleEdit}>
                  {disabled ? "Edit" : "Cancel"}
              </FormButton>
            }
          </Grid>

          {formik.values.isSignup && (
            <>
              <TextInput
                id="firstName"
                name="firstName" 
                label="First Name"
                value={formik.values.firstName}
                disabled={disabled}
                handleChange={formik.handleChange} 
                autoFocus 
                sm={6}
                error={formik.touched.password && Boolean(formik.errors.firstName)}
                helperText={formik.touched.password && formik.errors.firstName}
              />
              <TextInput
                id="lastName"
                name="lastName" 
                label="Last Name"
                value={formik.values.lastName}
                disabled={disabled}
                handleChange={formik.handleChange} 
                sm={6}
                error={formik.touched.password && Boolean(formik.errors.lastName)}
                helperText={formik.touched.password && formik.errors.lastName}
              />
            </>
          )}

          <TextInput
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
          <TextInput
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
            <TextInput 
              name="confirmPassword" 
              label="Repeat Password"
              disabled={disabled}
              handleChange={formik.handleChange} 
              type="password"
              error={formik.touched.password && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.password && formik.errors.confirmPassword}
            />
          }
          <FormButton
            type="submit" 
            variant="contained" 
            color="primary"
            onClick={formik.handleSubmit} 
            disabled={loading || disabled}
          >
            {loading && <CircularProgress size={25} />}
            {(!loading) && (formik.values.isSignup ? button : 'Sign In')}
          </FormButton>
          {profile && 
            <FormButton  
              variant="contained" 
              color="secondary" 
              onClick={handleClickOpenConfirm} 
              disabled={loading || disabled}
            >
                {loading && <CircularProgress size={25} />}
                DELETE
            </FormButton>
          }
        </Grid>    
        
        <Grid container justifyContent="flex-end">
          <Grid item>
            {!profile && 
              <Button onClick={switchMode}>
                {formik.values.isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            }
          </Grid>
        </Grid>
  
        {message && (
            <Alert variant="standard" severity="error">
              
              {message}
            </Alert>
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