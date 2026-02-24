import { createTheme } from '@mui/material/styles';

// Result Institute Brand Colors - Extracted from logo.png
const brandColors = {
  primary: {
    main: '#E91E8C', // Magenta - "Result"
    light: '#FF6BB5',
    dark: '#C41570',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4A7FC1', // Blue - "institute"
    light: '#6FA3E0',
    dark: '#3A5F9A',
    contrastText: '#FFFFFF',
  },
  neutral: {
    charcoal: '#2D3436',
    gray: '#636E72',
    mediumGray: '#B2BEC3',
    lightGray: '#F5F6F7',
    white: '#FFFFFF',
  },
  status: {
    success: '#00B894',
    warning: '#FDCB6E',
    error: '#D63031',
    info: '#4A7FC1',
  },
};

// Create custom Material-UI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brandColors.primary.main,
      light: brandColors.primary.light,
      dark: brandColors.primary.dark,
      contrastText: brandColors.primary.contrastText,
    },
    secondary: {
      main: brandColors.secondary.main,
      light: brandColors.secondary.light,
      dark: brandColors.secondary.dark,
      contrastText: brandColors.secondary.contrastText,
    },
    error: {
      main: brandColors.status.error,
    },
    warning: {
      main: brandColors.status.warning,
    },
    info: {
      main: brandColors.status.info,
    },
    success: {
      main: brandColors.status.success,
    },
    text: {
      primary: brandColors.neutral.charcoal,
      secondary: brandColors.neutral.gray,
    },
    background: {
      default: brandColors.neutral.white,
      paper: brandColors.neutral.white,
    },
    divider: brandColors.neutral.mediumGray,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: brandColors.neutral.charcoal,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: brandColors.neutral.charcoal,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      color: brandColors.neutral.charcoal,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: brandColors.neutral.charcoal,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color: brandColors.neutral.charcoal,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
      color: brandColors.neutral.charcoal,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: brandColors.neutral.charcoal,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: brandColors.neutral.gray,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.12)',
    '0px 12px 24px rgba(0, 0, 0, 0.15)',
    '0px 16px 32px rgba(0, 0, 0, 0.18)',
    '0px 20px 40px rgba(0, 0, 0, 0.20)',
    ...Array(18).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${brandColors.primary.main} 0%, ${brandColors.primary.dark} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${brandColors.primary.light} 0%, ${brandColors.primary.main} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${brandColors.secondary.main} 0%, ${brandColors.secondary.dark} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${brandColors.secondary.light} 0%, ${brandColors.secondary.main} 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: brandColors.primary.light,
          color: brandColors.neutral.white,
        },
        colorSecondary: {
          backgroundColor: brandColors.secondary.light,
          color: brandColors.neutral.white,
        },
      },
    },
  },
});

export default theme;
export { brandColors };
