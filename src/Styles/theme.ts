import { createTheme } from '@mui/material/styles';

const c = {
  bg: '#040610',
  surface: 'rgba(8, 11, 26, 0.92)',
  magenta: '#e040fb',
  magentaDim: 'rgba(224, 64, 251, 0.12)',
  magentaGlow: 'rgba(224, 64, 251, 0.35)',
  cyan: '#00e5ff',
  cyanDim: 'rgba(0, 229, 255, 0.1)',
  cyanGlow: 'rgba(0, 229, 255, 0.35)',
  green: '#00ff88',
  text: '#e8eaf6',
  muted: '#546e7a',
  border: 'rgba(224, 64, 251, 0.2)',
  borderHover: 'rgba(224, 64, 251, 0.5)',
};

export const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: c.magenta,
      light: '#ea80fc',
      dark: '#ab00d6',
    },
    secondary: {
      main: c.cyan,
      light: '#6effff',
      dark: '#00b2cc',
    },
    background: {
      default: c.bg,
      paper: c.surface,
    },
    text: {
      primary: c.text,
      secondary: c.muted,
    },
    success: { main: c.green },
    warning: { main: '#ffea00' },
    error: { main: '#ff1744' },
    divider: c.border,
  },
  typography: {
    fontFamily: ['Orbitron', 'Roboto Mono', 'monospace'].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.06em' },
    h2: { fontSize: '2rem', fontWeight: 600, letterSpacing: '0.04em' },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
    button: {
      fontFamily: 'Orbitron, monospace',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: c.bg } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          transition: 'all 0.25s ease',
          '&:hover': { transform: 'translateY(-1px)' },
          '&:disabled': { opacity: 0.3 },
        },
        contained: {
          background: `linear-gradient(135deg, ${c.magenta}, #ab00d6)`,
          color: '#fff',
          border: `1px solid ${c.magenta}`,
          boxShadow: `0 0 20px ${c.magentaGlow}`,
          '&:hover': {
            background: `linear-gradient(135deg, #ea80fc, ${c.magenta})`,
            boxShadow: `0 0 35px ${c.magentaGlow}, 0 0 70px rgba(224,64,251,0.15)`,
          },
        },
        outlined: {
          borderColor: c.cyan,
          color: c.cyan,
          '&:hover': {
            borderColor: '#6effff',
            backgroundColor: c.cyanDim,
            boxShadow: `0 0 20px ${c.cyanGlow}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: c.surface,
          border: `1px solid ${c.border}`,
          borderRadius: '8px',
          boxShadow: `0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(224,64,251,0.06)`,
          backdropFilter: 'blur(16px)',
          transition: 'border-color 0.25s, box-shadow 0.25s',
          '&:hover': {
            borderColor: c.borderHover,
            boxShadow: `0 4px 32px rgba(0,0,0,0.7), 0 0 24px ${c.magentaDim}`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(4, 6, 16, 0.7)',
            '& fieldset': { borderColor: 'rgba(224,64,251,0.25)' },
            '&:hover fieldset': { borderColor: c.magenta },
            '&.Mui-focused fieldset': {
              borderColor: c.magenta,
              boxShadow: `0 0 14px ${c.magentaDim}`,
            },
          },
          '& .MuiInputLabel-root': {
            color: c.muted,
            '&.Mui-focused': { color: c.magenta },
          },
          '& .MuiOutlinedInput-input': { color: c.text },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(4, 6, 16, 0.94)',
          borderBottom: `1px solid rgba(224,64,251,0.25)`,
          boxShadow: `0 1px 30px rgba(224,64,251,0.15)`,
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            color: c.muted,
            fontWeight: 600,
            letterSpacing: '0.1em',
            transition: 'color 0.2s',
            '&.Mui-selected': { color: c.cyan },
            '&:hover': { color: c.text },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: c.cyan,
            height: '2px',
            boxShadow: `0 0 12px ${c.cyan}`,
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: c.surface,
          border: `1px solid ${c.border}`,
          borderRadius: '8px',
          backdropFilter: 'blur(16px)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: 'rgba(224, 64, 251, 0.07)',
          color: c.magenta,
          fontWeight: 700,
          letterSpacing: '0.08em',
          borderBottom: `1px solid ${c.border}`,
          textShadow: `0 0 10px ${c.magentaGlow}`,
        },
        body: {
          color: c.text,
          borderBottom: `1px solid rgba(224, 64, 251, 0.07)`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', backgroundColor: c.surface },
      },
    },
  },
});

export default cyberpunkTheme;
