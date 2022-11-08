import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { 
  Button, 
  CircularProgress,
  Checkbox,
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
  getGameModes, 
  getPlayers, 
  createGame, 
  updateGame, 
  deleteGame 
} from '../../actions/catan';
import { catanGameValidationSchema } from '../validationSchemas/validationSchemas';

const GameStatForm = () => {
  //console.log('NEW ----->\n');
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const gameModes = useSelector(state => state.catan.gameModes);
  const players = useSelector(state => state.catan.players);

  //const catanState = useSelector(state => state.catan);
  //console.log('Catan state: ', catanState);

  const updateGameForm = useSelector(state => state.catan.gameForm);
  const [update, setUpdate] = useState(updateGameForm !== null);

  useEffect(() => {
    setUpdate(updateGameForm !== null);
    if (update) {
      formik.values.id = updateGameForm?._id ? updateGameForm._id : '';
      formik.values.mode = updateGameForm?.mode ? updateGameForm.mode : '';
      formik.values.vp = updateGameForm?.vp ? updateGameForm.vp : 0;
      formik.values.cardStack = updateGameForm?.cardStack ? updateGameForm.cardStack : false;
      formik.values.duration = updateGameForm?.duration ? updateGameForm.duration : 0;
      formik.values.winner = updateGameForm?.winner ? updateGameForm.winner : '';
    }
    
    //console.log('update: ', update);
    //console.log('updateGameForm: ', updateGameForm);
    
  }, [update, updateGameForm]);

  const [openConfirm, setConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setConfirm(true);
  };

  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  
  useEffect(() => {
    dispatch(getGameModes());
    dispatch(getPlayers());
  }, []);
  
  const handleSubmit = (values) => {
    //e.preventDefault();
    setLoading(true);
    //console.log(loading)
    if (update) {
      dispatch(updateGame(values, history))
        .then(() => {
          //window.location.reload();
          
          //window.location.reload();
          //history.push('/profile');
        
          setLoading(false);
          setUpdate(true);
        })
        .catch(() => {
          setLoading(false);
        });
    }
    else {
      dispatch(createGame(values, history))
        .then(() => {
          //window.location.reload();
          
          //window.location.reload();
          //history.push('/');
        
          setLoading(false);
          setUpdate(true);
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
    
    dispatch(deleteGame(formik.values, history))
      .then(() => {
        //window.location.reload();
        //history.push('/');
        formik.resetForm();
        setLoading(false);
        setUpdate(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      id: update ? updateGameForm?._id : '',
      mode: update ? updateGameForm?.mode : '',
      vp: update ? updateGameForm?.vp : '',
      cardStack: update ? updateGameForm?.cardStack : false,
      duration: update ? updateGameForm?.duration : '',
      winner: update ? updateGameForm?.winner : '',
    },
    validationSchema:  catanGameValidationSchema,
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
            id="mode"
            name="mode"
            label="Game Mode"
            select
            value={formik.values.mode}
            handleChange={formik.handleChange}
            sm={3}
            error={formik.touched.mode && Boolean(formik.errors.mode)}
            helperText={formik.touched.mode && formik.errors.mode}
          >
            { 
              gameModes.map((mode, i) => {
                return (
                  <MenuItem key={mode._id} value={mode._id}>{mode.label}</MenuItem>
                )
              })
            }
            
          </TextInput>
          <TextInput
            id="vp"
            name="vp" 
            label="Victory Points"
            select
            value={formik.values.vp}
            handleChange={formik.handleChange}
            sm={3}
            error={formik.touched.vp && Boolean(formik.errors.vp)}
            helperText={formik.touched.vp && formik.errors.vp}
          > 
            {
              Array.from(Array(15).keys()).map((num, i) => {
                return (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                )
              })
            }
          </TextInput>
          <TextInput
            id="duration"
            name="duration"
            label="Duration (min)"
            value={formik.values.duration}
            handleChange={formik.handleChange}
            sm={3}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          >
          </TextInput>
          <Grid item xs={12} sm={3}>
            <FormGroup sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel control={
                  <Checkbox 
                    id="cardStack"
                    name="cardStack" 
                    label="Card Stack"
                    checked={formik.values.cardStack}
                    onChange={formik.handleChange}
                  />
                } label="Card Stack" />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              disablePortal
              id="winner"
              options={players}
              value={ 
                players.find(player => player._id === formik.values.winner) || null
              }
              getOptionLabel={option => option.username}
              onChange={(e, value) => formik.setFieldValue("winner", value._id)}
              
              renderInput={(params) => <TextField {...params} 
                label="Winner"
                //value={formik.values.winner}
                error={formik.touched.winner && Boolean(formik.errors.winner)}
                helperText={formik.touched.winner && formik.errors.winner} />}
            />
          </Grid>
        
          <FormButton 
            color="primary"
            onClick={formik.handleSubmit}
            disabled={loading}
            size='small'
            sm={4}
          >
              {loading && <CircularProgress size={25} />}
              {(!loading) && (update ? 'Update' : 'Create')}
          </FormButton>
          {update && 
            <FormButton  
              variant="contained" 
              color="secondary" 
              onClick={handleClickOpenConfirm} 
              disabled={loading}
              size='small'
              sm={4}
            >
              {loading && <CircularProgress size={25} />}
              DELETE
            </FormButton>
          }
        </Grid>
      </Paper>
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
    </>
  )
}

export default GameStatForm;
