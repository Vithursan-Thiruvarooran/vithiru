import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import MenuItem from '@mui/material/MenuItem';
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
  Dialog,
  FormGroup,
  FormControlLabel,
  Typography
} from '@mui/material';

import TextInput from '../formInputs/TextInput';
import FormButton from '../formInputs/FormButton';

import { getPlayers, createGamePlayer, updateGamePlayer, deleteGamePlayer } from '../../actions/catan';
import { catanGamePlayerValidationSchema } from '../validationSchemas/validationSchemas';

const GamePlayerForm = ({playerNum, value}) => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const players = useSelector(state => state.catan.players);
  const gameModes = useSelector(state => state.catan.gameModes);
  const gameMode = useSelector(state => state.catan.gameForm.mode);
  const isSeafarers = gameModes.find((mode) => mode._id === gameMode)?.label === 'Seafarers';
  //console.log(isSeafarers);

  const gameId = useSelector(state => state.catan.gameForm._id);

  //const catanState = useSelector(state => state.catan);
  //console.log('Catan state: ', catanState);

  const updateGamePlayers = useSelector(state => state.catan.gamePlayersForm);
  const [update, setUpdate] = useState(updateGamePlayers.length > playerNum);

  var updateGamePlayerForm = null;
  if (updateGamePlayers.length > playerNum) {
    updateGamePlayerForm = updateGamePlayers[playerNum];
  }

  useEffect(() => {
    //console.log('update 1: ', update);
    setUpdate(updateGamePlayers.length > playerNum);
    if (update) {
      formik.values.id = updateGamePlayerForm?._id ? updateGamePlayerForm._id : '';
      //formik.values.game = updateGamePlayerForm?.game ? updateGamePlayerForm.game : '';
      formik.values.player = updateGamePlayerForm?.player ? updateGamePlayerForm.player : '';
      formik.values.vp = updateGamePlayerForm?.vp ? updateGamePlayerForm.vp : 0
      formik.values.dcVp = updateGamePlayerForm?.dcVp ? updateGamePlayerForm.dcVp : 0;
      formik.values.exVp = updateGamePlayerForm?.exVp ? updateGamePlayerForm.exVp : 0;
      formik.values.knights = updateGamePlayerForm?.knights ? updateGamePlayerForm.knights : 0;
      formik.values.largestArmy = updateGamePlayerForm?.largestArmy ? updateGamePlayerForm.largestArmy : false;
      formik.values.roads = updateGamePlayerForm?.roads ? updateGamePlayerForm.roads : 0;
      formik.values.longestRoad = updateGamePlayerForm?.longestRoad ? updateGamePlayerForm.longestRoad : 0;
      formik.values.hasLongestRoad = updateGamePlayerForm?.hasLongestRoad ? updateGamePlayerForm.hasLongestRoad : false;
      formik.values.cities = updateGamePlayerForm?.cities ? updateGamePlayerForm.cities : 0;
      formik.values.settlements = updateGamePlayerForm?.settlements ? updateGamePlayerForm.settlements : 0;
      formik.values.robbed = updateGamePlayerForm?.robbed ? updateGamePlayerForm.robbed : 0;
      formik.values.trades = updateGamePlayerForm?.trades ? updateGamePlayerForm.trades : 0;
    }
    
    //console.log('update 2: ', update);
    //console.log('updateGameForm: ', updateGamePlayerForm);
    
  }, [update, updateGamePlayers, updateGamePlayerForm]);

  useEffect(() => {
    dispatch(getPlayers());
  }, []);

  const handleSubmit = (values) => {
    //e.preventDefault();
    setLoading(true);
    //console.log(loading)
    if (update) {
      dispatch(updateGamePlayer(values, history))
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
      dispatch(createGamePlayer(values, history))
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
    
    dispatch(deleteGamePlayer(formik.values, history))
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

  const [openConfirm, setConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setConfirm(true);
  };

  const handleCloseConfirm = () => {
    setConfirm(false);
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      game: gameId,
      player: '',
      vp: '',
      dcVp: '',
      exVp: isSeafarers ? '' : 0,
      knights: '',
      largestArmy: false,
      roads: '',
      longestRoad: '',
      hasLongestRoad: false,
      cities: '',
      settlements: '',
      robbed: '',
      trades: '', 
    },
    validationSchema: catanGamePlayerValidationSchema,
    onSubmit: handleSubmit,
  });

  //console.log(formik.values);

  return (
    <>
      { playerNum === value &&
        <Paper
          elevation={6}
          sx={
            {
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'black',
              padding: 2,
              //overflow: 'auto',
              maxHeight: 350, 
              overflow: 'auto',
              //marginTop: 0,
            }
          }
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={12}>
              <Autocomplete
                disablePortal
                id={"player" + playerNum}
                options={players}
                value={ 
                  players.find(player => player._id === formik.values.player) || null
                }
                getOptionLabel={option => option.username}
                onChange={(e, value) => formik.setFieldValue('player', value._id)}
                
                renderInput={(params) => <TextField {...params}
                  size='small'
                  label="Player" 
                  error={formik.touched.player && Boolean(formik.errors.player)}
                  helperText={formik.touched.player && formik.errors.player}/>}
              />
            </Grid>
            <TextInput
              id={"vp" + playerNum}
              name={'vp'} 
              label="Victory Points"
              select
              value={formik.values.vp}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.vp && Boolean(formik.errors.vp)}
              helperText={formik.touched.vp && formik.errors.vp}
            >
              {
                Array.from(Array(17).keys()).map((num) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id={"dcVp" + playerNum}
              name={'dcVp'} 
              label="Dev Card Victory Points"
              select
              value={formik.values.dcVp}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.dcVp && Boolean(formik.errors.dcVp)}
              helperText={formik.touched.dcVp && formik.errors.dcVp}
            >
              {
                Array.from(Array(15).keys()).map((num) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id={"exVp" + playerNum}
              name={'exVp'} 
              label="Explorer Victory Points"
              select
              value={formik.values.exVp}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.exVp && Boolean(formik.errors.exVp)}
              helperText={formik.touched.exVp && formik.errors.exVp}
              disabled={!isSeafarers}
            >
              {
                Array.from(Array(15).keys()).map((num) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id={"roads" + playerNum}
              name={'roads'}
              label="Roads"
              select
              value={formik.values.roads}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.roads && Boolean(formik.errors.roads)}
              helperText={formik.touched.roads && formik.errors.roads}
            >
              {
                Array.from(Array(31).keys()).map((num) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id={"longestRoad" + playerNum}
              name={'longestRoad'}
              label="Longest Road"
              select
              value={formik.values.longestRoad}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.longestRoad && Boolean(formik.errors.longestRoad)}
              helperText={formik.touched.longestRoad && formik.errors.longestRoad}
            >
              {
                Array.from(Array(31).keys()).map((num) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <Grid item xs={6} sm={3}>
              <FormGroup sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel control={
                    <Checkbox 
                      id="hasLongestRoad"
                      name="hasLongestRoad" 
                      label="Longest Road"
                      checked={formik.values.hasLongestRoad}
                      onChange={formik.handleChange}
                    />
                  } label={<Typography variant="caption" >Longest Road</Typography>} />
              </FormGroup>
            </Grid>
            <TextInput
              id={"knights" + playerNum}
              name={'knights'}
              label="Knights"
              select
              value={formik.values.knights}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.knights && Boolean(formik.errors.knights)}
              helperText={formik.touched.knights && formik.errors.knights}
            >
              {
                Array.from(Array(15).keys()).map((num) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <Grid item xs={6} sm={3}>
              <FormGroup sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel control={
                    <Checkbox 
                      id="largestArmy"
                      name="largestArmy" 
                      label="Largest Army"
                      checked={formik.values.largestArmy}
                      onChange={formik.handleChange}
                    />
                  } label={<Typography variant="caption" >Largest Army</Typography>} />
              </FormGroup>
            </Grid>
            <TextInput
              id={"cities" + playerNum}
              name={'cities'}
              label="Cities"
              select
              value={formik.values.cities}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.cities && Boolean(formik.errors.cities)}
              helperText={formik.touched.cities && formik.errors.cities}
            >
              {
                Array.from(Array(5).keys()).map((num, playerNum) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id={"settlements" + playerNum}
              name={'settlements'}
              label="Settlements"
              select
              value={formik.values.settlements}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.settlements && Boolean(formik.errors.settlements)}
              helperText={formik.touched.settlements && formik.errors.settlements}
            >
              {
                Array.from(Array(10).keys()).map((num, playerNum) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id={"robbed" + playerNum}
              name={'robbed'}
              label="Robbed"
              select
              value={formik.values.robbed}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.robbed && Boolean(formik.errors.robbed)}
              helperText={formik.touched.robbed && formik.errors.robbed}
            >
              {
                Array.from(Array(31).keys()).map((num) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id={"trades" + playerNum}
              name={'trades'}
              label="Trades"
              select
              value={formik.values.trades}
              handleChange={formik.handleChange}
              xs={6}
              sm={3}
              size='small'
              error={formik.touched.trades && Boolean(formik.errors.trades)}
              helperText={formik.touched.trades && formik.errors.trades}
            >
              {
                Array.from(Array(31).keys()).map((num) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2} justifyContent="center">
                <FormButton 
                  color="primary"
                  onClick={formik.handleSubmit}
                  disabled={loading}
                  xs={6}
                  sm={4}
                  size='small'
                >
                    {loading && <CircularProgress size={25} />}
                    {(!loading) && (update ? 'Update' : 'Submit')}
                </FormButton>
                {update && 
                  <FormButton  
                    variant="contained" 
                    color="secondary" 
                    onClick={handleClickOpenConfirm} 
                    disabled={loading}
                    xs={6}
                    sm={4}
                    size='small'
                  >
                      {loading && <CircularProgress size={25} />}
                      DELETE
                  </FormButton>
                }
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      }
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

export default GamePlayerForm;
