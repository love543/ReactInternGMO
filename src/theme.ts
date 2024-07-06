import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          borderRadius: '12px',
          animation: 'fadeIn 0.5s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 20px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#3700b3',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },
  },
});

export default theme;
