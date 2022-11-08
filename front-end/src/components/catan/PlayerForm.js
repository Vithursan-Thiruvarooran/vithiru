import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { 
  Button, 
  CircularProgress,
  Paper, 
  Grid, 
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog
} from '@mui/material';

import TextInput from '../formInputs/TextInput';
import FormButton from '../formInputs/FormButton';

import { 
  getPlayers, 
  updatePlayer, 
  deletePlayer 
} from '../../actions/catan';
import { catanPlayerValidationSchema } from '../validationSchemas/validationSchemas';

const PlayerForm = ({ index }) => {
  //console.log('NEW ----->\n');
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const player = useSelector(state => state.catan.players[index]);
  //const player = players[index];

  // const catanState = useSelector(state => state.catan);
  // console.log('Catan state: ', catanState);

  //const updatePlayerForm = player;
  //const [update, setUpdate] = useState(updatePlayerForm !== null);

  useEffect(() => {
    //console.log('player changed: ', player)
    formik.values.id = player._id;
    formik.values.username = player.username;
    
   }, [player]);

  const [openConfirm, setConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setConfirm(true);
  };

  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  
  useEffect(() => {
    dispatch(getPlayers());
  }, []);
  
  const handleSubmit = (values) => {
    //e.preventDefault();
    setLoading(true);
  
    dispatch(updatePlayer(values, history))
      .then(() => {
        //window.location.reload();
        
        //window.location.reload();
        //history.push('/profile');
        
        setLoading(false);
        //setUpdate(true);
      })
      .catch(() => {
        setLoading(false);
      });

  };

  const handleDelete = () => {
    //e.preventDefault();
    setLoading(true);
    handleCloseConfirm();
    //console.log(loading)
    
    dispatch(deletePlayer(formik.values, history))
      .then(() => {
        //window.location.reload();
        //history.push('/');
        //formik.resetForm();
        //dispatch(getPlayers());
        setLoading(false);
        //setUpdate(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      id: player._id,
      username: player.username,
    },
    validationSchema:  catanPlayerValidationSchema,
    onSubmit: handleSubmit,
  });

  //console.log(formik.values);

  return (
    <>
      <Paper
        elevation={6}
        sx={
          {
            display: 'flex',
            flexDirection: 'column',
            //alignItems: 'center',
            padding: '16px',
            backgroundColor: 'black'
          }
        }
      >
        <Grid container spacing={2} justifyContent="center">
          <TextInput
            id="username"
            name="username"
            label="Player Name"
            value={formik.values.username}
            handleChange={formik.handleChange}
            sm={8}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          >            
          </TextInput>
        
          <FormButton 
            color="primary"
            onClick={formik.handleSubmit}
            disabled={loading}
            size='small'
            xs={6}
            sm={2}
          >
              {loading && <CircularProgress size={25} />}
              {(!loading) && ('Update')}
          </FormButton>
          
          <FormButton  
            color="secondary" 
            onClick={handleClickOpenConfirm} 
            disabled={loading}
            size='small'
            xs={6}
            sm={2}
          >
            {loading && <CircularProgress size={25} />}
            DELETE
          </FormButton>
          
        </Grid>
      </Paper>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Player Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this player? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>No</Button>
          <Button color="secondary" onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PlayerForm;
