import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const StatCard = ({ statName, player, value }) => {

  return (
    <>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
            { statName }
          </Typography>
          <Typography sx={{ fontSize: 18 }} component="div">
            { player }
          </Typography>
          <Typography sx={{ fontSize: 18 }} component="div">
            { value }
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default StatCard;
