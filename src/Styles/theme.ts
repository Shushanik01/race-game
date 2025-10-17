import { createTheme } from '@mui/material/styles';

interface LightColors {
  teal: string;
  turquoise: string;
  mint: string;
  darkTeal: string;
  white: string;
  lightMint: string;
  darkText: string;
}

const lightColors: LightColors = {
  teal: '#2b7a78',
  turquoise: '#3aafa9',
  mint: '#def2f1',
  darkTeal: '#17252a',
  white: '#feffff',
  lightMint: '#e8f5f4',
  darkText: '#17252a',
};

export const cyberpunkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightColors.teal,
      light: lightColors.turquoise,
      dark: lightColors.darkTeal,
    },
    secondary: {
      main: lightColors.turquoise,
      light: lightColors.mint,
      dark: lightColors.teal,
    },
    background: {
      default: lightColors.white,
      paper: lightColors.mint,
    },
    text: {
      primary: lightColors.darkText,
      secondary: lightColors.teal,
    },
    success: {
      main: lightColors.turquoise,
    },
    warning: {
      main: '#ff9966',
    },
    info: {
      main: lightColors.teal,
    },
  },
  typography: {
    fontFamily: [
      'Orbitron',
      'Roboto Mono',
      'monospace',
      'sans-serif',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: lightColors.teal,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    button: {
      fontFamily: 'Orbitron, monospace',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: `2px solid ${lightColors.teal}`,
          boxShadow: `0 0 15px rgba(43, 122, 120, 0.3)`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: `0 0 25px rgba(58, 175, 169, 0.5)`,
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: lightColors.turquoise,
          color: lightColors.white,
          '&:hover': {
            background: lightColors.teal,
          },
        },
        outlined: {
          borderColor: lightColors.teal,
          color: lightColors.teal,
          '&:hover': {
            borderColor: lightColors.turquoise,
            color: lightColors.turquoise,
            boxShadow: `0 0 20px rgba(58, 175, 169, 0.4)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.mint,
          border: `1px solid ${lightColors.turquoise}`,
          borderRadius: '12px',
          boxShadow: `0 4px 20px rgba(43, 122, 120, 0.2)`,
          // '&:hover': {
          //   border: `1px solid ${lightColors.teal}`,
          //   boxShadow: `0 6px 30px rgba(58, 175, 169, 0.3)`,
          // },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: lightColors.teal,
              boxShadow: `0 0 5px rgba(43, 122, 120, 0.2)`,
            },
            '&:hover fieldset': {
              borderColor: lightColors.turquoise,
              boxShadow: `0 0 10px rgba(58, 175, 169, 0.3)`,
            },
            '&.Mui-focused fieldset': {
              borderColor: lightColors.teal,
              boxShadow: `0 0 15px rgba(43, 122, 120, 0.4)`,
            },
          },
          '& .MuiInputLabel-root': {
            color: lightColors.teal,
            '&.Mui-focused': {
              color: lightColors.teal,
            },
          },
          '& .MuiOutlinedInput-input': {
            color: lightColors.darkText,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.white,
          borderBottom: `2px solid ${lightColors.teal}`,
          boxShadow: `0 2px 10px rgba(43, 122, 120, 0.2)`,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            color: lightColors.teal,
            fontWeight: 600,
            fontSize: '1.1rem',
            '&.Mui-selected': {
              color: lightColors.turquoise,
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: lightColors.turquoise,
            height: '3px',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.mint,
          border: `1px solid ${lightColors.turquoise}`,
          borderRadius: '8px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: lightColors.lightMint,
          color: lightColors.teal,
          fontWeight: 700,
          borderBottom: `2px solid ${lightColors.teal}`,
        },
        body: {
          color: lightColors.darkText,
          borderBottom: `1px solid rgba(43, 122, 120, 0.2)`,
        },
      },
    },
  },
});

export default cyberpunkTheme;