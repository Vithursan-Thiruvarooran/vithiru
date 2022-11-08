import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch  } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { verifyUser } from '../../actions/auth';

const VerifyUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log('params: ', params);

  useEffect(() => {
    dispatch(verifyUser(params));
  }, []);

  return (
    <>
      <Container sx={{ paddingTop: '110px' }}>
        <Box sx={{ my: 2 }}>
          Verify {params.token}
        </Box>
      </Container>
    </>
  )
}

export default VerifyUser;
