import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import FormButton from '../formInputs/FormButton';

import GamePlayerForm from './GamePlayerForm';

const GamePlayersForm = () => {

  const [playerCount, setPlayers] = useState(1);

  //const catanState = useSelector(state => state.catan);
  // console.log('Catan state: ', catanState);

  const updateGamePlayers = useSelector(state => state.catan.gamePlayersForm);

  useEffect(() => {
    if (updateGamePlayers.length > 0) {
      setPlayers(updateGamePlayers.length);
    }
  }, [updateGamePlayers]);

  // console.log(playerCount);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const addPlayer = () => {
    setPlayers(playerCount + 1);
  };

  const renderStep = (v) => {
    return <GamePlayerForm playerNum={v}></GamePlayerForm>
  }

  //console.log("value: ", value)
  return (
    <>
      <Grid container spacing={2} justifyContent="center" >
        <Grid item xs={12} sm={12}> 
          <Box >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={true}
              allowScrollButtonsMobile
            >
              {
                Array.from(Array(playerCount).keys()).map((num) => {
                  return (
                    <Tab key={"player" + num} label={"Player " + (num + 1)} value={num}/>
                  )
                })
              }
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}> 
          { renderStep(value) }
          {
            Array.from(Array(playerCount).keys()).map((num) => {
              return (
                <GamePlayerForm key={num} playerNum={num} value={value}></GamePlayerForm>
              )
            })
          }
        </Grid>
        
        <FormButton
          onClick={addPlayer}
          color="primary"
          xs={6}
          sm={4}
          size="small"
        >
          Add Player
        </FormButton>
    
      </Grid>
    </>
  )
}

export default GamePlayersForm;
