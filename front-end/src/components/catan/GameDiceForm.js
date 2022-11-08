import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';

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
  createGameDice, 
  updateGameDice, 
  deleteGameDice 
} from '../../actions/catan';
import { catanGameDiceValidationSchema } from '../validationSchemas/validationSchemas';

const GameDiceForm = () => {
  //console.log('NEW ----->\n');
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  //const catanState = useSelector(state => state.catan);
  //console.log('Catan state: ', catanState);

  const gameId = useSelector(state => state.catan.gameForm._id);

  const updateDiceForm = useSelector(state => state.catan.gameDiceForm);
  const [update, setUpdate] = useState(updateDiceForm !== null);

  useEffect(() => {
    setUpdate(updateDiceForm !== null);
    if (update) {
      formik.values.id = updateDiceForm?._id ? updateDiceForm._id : '';
      formik.values.game = gameId;
      formik.values.two = updateDiceForm?.two ? updateDiceForm.two : 0;
      formik.values.three = updateDiceForm?.three ? updateDiceForm.three : 0;
      formik.values.four = updateDiceForm?.four ? updateDiceForm.four : 0;
      formik.values.five = updateDiceForm?.five ? updateDiceForm.five : 0;
      formik.values.six = updateDiceForm?.six ? updateDiceForm.six : 0;
      formik.values.seven = updateDiceForm?.seven ? updateDiceForm.seven : 0;
      formik.values.eight = updateDiceForm?.eight ? updateDiceForm.eight : 0;
      formik.values.nine = updateDiceForm?.nine ? updateDiceForm.nine : 0;
      formik.values.ten = updateDiceForm?.ten ? updateDiceForm.ten : 0;
      formik.values.eleven = updateDiceForm?.eleven ? updateDiceForm.eleven : 0;
      formik.values.twelve = updateDiceForm?.twelve ? updateDiceForm.twelve : 0;
    }
    
    //console.log('update: ', update);
    //console.log('updateDiceForm: ', updateDiceForm);
    
  }, [update, updateDiceForm]);

  const [openConfirm, setConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setConfirm(true);
  };

  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  
  const handleSubmit = (values) => {
    //e.preventDefault();
    setLoading(true);
    //console.log(loading)
    if (update) {
      dispatch(updateGameDice(values, history))
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
      dispatch(createGameDice(values, history))
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
    
    dispatch(deleteGameDice(formik.values, history))
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
      id: update ? updateDiceForm?._id : '',
      game: gameId,
      two: updateDiceForm?.two ? updateDiceForm.two : '',
      three: updateDiceForm?.three ? updateDiceForm.three : '',
      four: updateDiceForm?.four ? updateDiceForm.four : '',
      five: updateDiceForm?.five ? updateDiceForm.five : '',
      six: updateDiceForm?.six ? updateDiceForm.six : '',
      seven: updateDiceForm?.seven ? updateDiceForm.seven : '',
      eight: updateDiceForm?.eight ? updateDiceForm.eight : '',
      nine: updateDiceForm?.nine ? updateDiceForm.nine : '',
      ten: updateDiceForm?.ten ? updateDiceForm.ten : '',
      eleven: updateDiceForm?.eleven ? updateDiceForm.eleven : '',
      twelve:  updateDiceForm?.twelve ? updateDiceForm.twelve : '',
    },
    validationSchema:  catanGameDiceValidationSchema,
    onSubmit: handleSubmit,
  });

  //console.log("form values", formik.values);

  return (
    <>
      {/* <Box> */}
        <CssBaseline />
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
              id="two"
              name="two" 
              label="Two"
              select
              value={formik.values.two}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.two && Boolean(formik.errors.two)}
              helperText={formik.touched.two && formik.errors.two}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="three"
              name="three" 
              label="Three"
              select
              value={formik.values.three}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.three && Boolean(formik.errors.three)}
              helperText={formik.touched.three && formik.errors.three}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="four"
              name="four" 
              label="Four"
              select
              value={formik.values.four}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.four && Boolean(formik.errors.four)}
              helperText={formik.touched.four && formik.errors.four}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="five"
              name="five" 
              label="Five"
              select
              value={formik.values.five}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.five && Boolean(formik.errors.five)}
              helperText={formik.touched.five && formik.errors.five}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="six"
              name="six" 
              label="Six"
              select
              value={formik.values.six}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.six && Boolean(formik.errors.six)}
              helperText={formik.touched.six && formik.errors.six}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="seven"
              name="seven" 
              label="Seven"
              select
              value={formik.values.seven}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.seven && Boolean(formik.errors.seven)}
              helperText={formik.touched.seven && formik.errors.seven}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="eight"
              name="eight" 
              label="Eight"
              select
              value={formik.values.eight}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.eight && Boolean(formik.errors.eight)}
              helperText={formik.touched.eight && formik.errors.eight}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="nine"
              name="nine" 
              label="Nine"
              select
              value={formik.values.nine}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.nine && Boolean(formik.errors.nine)}
              helperText={formik.touched.nine && formik.errors.nine}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="ten"
              name="ten" 
              label="Ten"
              select
              value={formik.values.ten}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.ten && Boolean(formik.errors.ten)}
              helperText={formik.touched.ten && formik.errors.ten}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="eleven"
              name="eleven" 
              label="Eleven"
              select
              value={formik.values.eleven}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.eleven && Boolean(formik.errors.eleven)}
              helperText={formik.touched.eleven && formik.errors.eleven}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
            <TextInput
              id="twelve"
              name="twelve" 
              label="Twelve"
              select
              value={formik.values.twelve}
              handleChange={formik.handleChange}
              size='small'
              xs={6}
              sm={3}
              error={formik.touched.twelve && Boolean(formik.errors.twelve)}
              helperText={formik.touched.twelve && formik.errors.twelve}
            > 
              {
                Array.from(Array(26).keys()).map((num, i) => {
                  return (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  )
                })
              }
            </TextInput>
          
            <FormButton 
              color="primary"
              onClick={formik.handleSubmit}
              disabled={loading}
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
                sm={4}
              >
                  {loading && <CircularProgress size={25} />}
                  DELETE
              </FormButton>
            }
          </Grid>
        </Paper>
      {/* </Box> */}
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

export default GameDiceForm;
