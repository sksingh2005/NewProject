import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './pages/routes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
  </StrictMode>,
)
