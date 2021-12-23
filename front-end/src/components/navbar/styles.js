import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    position: "static",
    height: '80px',
    background: 'transparent',
  },
  heading: {
    color: 'rgba(255,255,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '400px',
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
  purple: {
    color: 'rgb(147,112,219)',
    backgroundColor: deepPurple[500],
  },

}));