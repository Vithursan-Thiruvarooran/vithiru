import React from 'react';
import { Grid } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '@mui/material';

const FormButton = ({ children, onClick, color, disabled, xs, sm, size }) => (
  <Grid item xs={xs ? xs : 12} sm={sm}>
    <CssBaseline />
    <Button
      fullWidth 
      variant="contained" 
      color={color}
      size={size}
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </Button>
  </Grid>
);

export default FormButton;