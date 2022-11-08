import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import {
  CircularProgress,
  Paper, 
  Grid, 
} from '@mui/material';

import TextInput from '../formInputs/TextInput';
import FormButton from '../formInputs/FormButton';

import { 
  getGameModes, 
  getPlayers, 
  createPlayer, 
} from '../../actions/catan';
import { catanPlayerValidationSchema } from '../validationSchemas/validationSchemas';

import PlayerForm from './PlayerForm';

const PlayersForm = () => {
  //console.log('NEW ----->\n');
  const dispatch = useDispatch();
  const history = useHistory();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const [loading, setLoading] = useState(false);

  const players = useSelector(state => state.catan.players);

  useEffect(() => {
    scrollToBottom()
  }, [players]);

  //const catanState = useSelector(state => state.catan);
  //console.log('Catan state: ', catanState);
  
  useEffect(() => {
    dispatch(getGameModes());
    dispatch(getPlayers());
  }, []);
  
  const handleSubmit = (values) => {
    //e.preventDefault();
    setLoading(true);
   
      dispatch(createPlayer(values, history))
        .then(() => {
          //window.location.reload();
          
          //window.location.reload();
          //history.push('/');
          dispatch(getPlayers());
          setLoading(false);
          formik.resetForm();
          //setUpdate(true);
        })
        .catch(() => {
          setLoading(false);
        });

    //} 
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      username: '',
    },
    validationSchema:  catanPlayerValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} spacing={1} justifyContent="center"> 
          <Paper
            elevation={6}
            sx={
              {
                display: 'flex',
                flexDirection: 'column',
                //alignItems: 'center',
                padding: '16px',
                //backgroundColor: 'black',
                maxHeight: 380, 
                overflow: 'auto',

              }
            }
          >  
            <Grid container item xs={12}  spacing={1} justifyContent="center"> 
              { 
                players.map((player, i) => {
                  return (
                    <Grid key={i} item xs={12} sm ={12} justifyContent="center">
                      <PlayerForm player={player} index={i}></PlayerForm>
                    </Grid>
                  )
                })
              }
              <div ref={messagesEndRef} />
            </Grid> 
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10} md={8} spacing={1} justifyContent="center">
          <Paper
            elevation={6}
            sx={
              {
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
              }
            }
          >  
            <Grid container item xs={12}  spacing={1} justifyContent="center"> 
              <TextInput
                id="username"
                name="username"
                label="Player Name"
                value={formik.values.username}
                handleChange={formik.handleChange}
                sm={12}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              >            
              </TextInput>
              
            
              <FormButton 
                color="primary"
                onClick={formik.handleSubmit}
                disabled={loading}
                sm={4}
              >
                  {loading && <CircularProgress size={25} />}
                  {(!loading) && ('Add')}
              </FormButton>
            </Grid> 
          </Paper>
        </Grid>
        
      </Grid>
    </>
  )
}

export default PlayersForm;
