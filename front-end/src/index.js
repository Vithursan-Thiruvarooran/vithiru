import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import red  from '@mui/material/colors/red';
import darkScrollbar from '@mui/material/darkScrollbar';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme({
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

ReactDOM.render(
  (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  ), document.getElementById('root')
);
