import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const home = () => {
  return (
    <>
    <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(16)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>
      </Container>
    </>
  )
}

export default home
