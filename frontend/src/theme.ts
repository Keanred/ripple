import { createTheme } from '@mui/material/styles';

// Dark gray & neon cyberpunk palette
const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0099', // Neon Magenta
      contrastText: '#F4F4F9', // Almost white
    },
    secondary: {
      main: '#00E0FF', // Neon Blue
      contrastText: '#181A20', // Very dark gray
    },
    background: {
      default: '#181A20', // Very dark gray
      paper: '#23232F', // Slightly lighter dark gray
    },
    text: {
      primary: '#F4F4F9', // Almost white
      secondary: '#FF0099', // Neon Magenta
      disabled: '#2D2F36', // Divider gray
    },
    error: {
      main: '#FF1744',
    },
    warning: {
      main: '#FFB300',
    },
    info: {
      main: '#00E0FF',
    },
    success: {
      main: '#39FF14', // Neon Lime
    },
    divider: '#2D2F36',
  },
  typography: {
    fontFamily: 'Orbitron, "Fira Mono", monospace',
  },
});

export default cyberpunkTheme;
