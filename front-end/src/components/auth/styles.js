import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  main: {
    paddingTop: '150px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    overflow: 'hidden',
    marginTop: '0px',
    backgroundColor: 'transparent',
    pacity: 0.5,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: 'blue',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));