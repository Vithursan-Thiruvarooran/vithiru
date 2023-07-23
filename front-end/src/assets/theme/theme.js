import { createTheme } from '@mui/material/styles';


import blue from '@mui/material/colors/blue';
import red  from '@mui/material/colors/red';
import darkScrollbar from '@mui/material/darkScrollbar';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[700],
      contrastText: 'white',
    },
    secondary: {
      main: red[500],
      contrastText: 'white',
    },
    success: {
      main: blue[500],
      contrastText: 'white',
    }
  },
  typography: {
    allVariants: {
        color: 'white'
    },
  },
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          flexDirection: 'row',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          //margin: '24px 0px 0px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        }
      }
    }
  }
});

export { darkTheme };