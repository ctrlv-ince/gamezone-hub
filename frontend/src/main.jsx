import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  typography: {
    fontFamily: "'Space Mono', monospace",
    h1: {
      fontFamily: "'Orbitron', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Orbitron', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Orbitron', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Orbitron', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'Orbitron', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'Orbitron', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 700,
    },
    body1: {
      fontFamily: "'Space Mono', monospace",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "'Space Mono', monospace",
      fontWeight: 400,
    },
    button: {
      fontFamily: "'Space Mono', monospace",
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
