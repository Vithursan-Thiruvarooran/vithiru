import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CssBaseline from '@mui/material/CssBaseline';

const TextInput = ({ children, select, id, name, handleChange, label, xs, sm, size, autoFocus, type, value, error, helperText, handleShowPassword, disabled }) => (
  <Grid item xs={xs ? xs : 12} sm={sm}>
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
      select={select}
      value={value}
      disabled={disabled}
      color="primary"
      size={size}
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
    >
      {children}
    </TextField>
  </Grid>
);

export default TextInput;