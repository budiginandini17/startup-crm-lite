import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LeadProvider } from './context/LeadContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeadProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LeadProvider>
  </StrictMode>
)
