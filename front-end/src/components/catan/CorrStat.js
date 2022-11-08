import React from "react";

import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const green = {
  1: '#2EB62C',
  2: '#57C84D',
  3: '#83D475',
  4: '#ABE098',
  5: '#C5E8B7'
}

const red = {
  1: '#DC1C13',
  2: '#EA4C46',
  3: '#F07470',
  4: '#F1959B',
  5: '#F6BDC0'
}

const CorrStat = ({ value }) => {

  const absVal = Math.abs(value);
  let cI = 0; 
  if (absVal >= 0.8) { cI = 1 } else
  if (absVal >= 0.6) { cI = 2 } else
  if (absVal >= 0.4) { cI = 3 } else
  if (absVal >= 0.2) { cI = 4 } else { cI = 5 }

  let color;
  if (value === 0) {
    color = 'white';
  } else if (value > 0) {
    color = green[cI];
  } else {
    color = red[cI];
  }

  if (value === null) {
    color = { 1: 'white' };
    cI = 1;
  }

  return (
    (value !== null) ? 
      <Typography color={color}>
        {Math.round((value + Number.EPSILON) * 100) / 100}
      </Typography> : 
      <CloseIcon fontSize="small" sx={{ verticalAlign: 'middle'}}></CloseIcon>
  ); 
  
};

export default CorrStat;
