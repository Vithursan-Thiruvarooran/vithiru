import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  '.MuiAppBar-root': {
    color: 'purple',
  },
  appBar: {
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    position: "static",
    height: '80px',
  },
  heading: {
    color: 'rgba(255,255,255, 1)',
    textDecoration: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '150px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: "none",
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));