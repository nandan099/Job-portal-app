import { StrictMode } from 'react'
import './tailwind.generated.css'
import { createRoot } from 'react-dom/client'
import './tailwind.generated.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
