import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CssBaseline from '@mui/material/CssBaseline';

const Input = ({ id, name, handleChange, label, half, autoFocus, type, value, error, helperText, handleShowPassword, disabled }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <CssBaseline />
    <TextField
      id={id}
      name={name}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      value={value}
      disabled={disabled}
      color="primary"
      error={error}
      helperText={helperText}
      InputProps={name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
  </Grid>
);

export default Input;