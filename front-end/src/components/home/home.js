import React from 'react';
import { Button } from "@material-ui/core";

import { Link, } from 'react-router-dom';

const home = () => {
  return (
    <div>
      home
      <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
    </div>
  )
}

export default home
