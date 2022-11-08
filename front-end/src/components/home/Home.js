import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CatanPlayerTable from '../catan/CatanPlayerTable';
import StatCard from '../catan/StatCard';
import { Grid } from '@mui/material';

import {
  getStats
} from '../../actions/catan';
import CorrTable from '../catan/CorrTable';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var genStats = useSelector(state => state.catan.catanStats.genStats);
  //console.log(genStats);

  return (
    <>
      <Container sx={{ paddingTop: '110px' }}>
        <Grid container spacing={2} justifyContent="center">
          {
            genStats.map((stat, i) => {
              return (
                <Grid key={i} item xs={6} sm={6} md={4}>
                  <Box m={{xs: -0.5, sm: 0}}> 
                    <StatCard 
                      statName={stat.statName} 
                      player={stat.player} 
                      value={stat.value}
                    >
                    </StatCard>
                  </Box>
                </Grid>
              )
            })
          }
          <Grid item xs={12}>
            <CatanPlayerTable></CatanPlayerTable>
          </Grid>
          <Grid item xs={12}>
            <CorrTable></CorrTable>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home;
