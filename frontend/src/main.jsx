import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { UserProvider } from './context/UserContext'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
