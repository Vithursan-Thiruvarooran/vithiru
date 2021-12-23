import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  app: {
    background: '#212121',
    height: '100%',
  },
  button: {
    "&.MuiButton-contained": {
      color: "yellow"
    },
    "&.MuiButton-outlined": {
      color: "brown"
    }
  }
});