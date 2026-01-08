import { createRoot } from 'react-dom/client'
import './index.css'
import SuperliveApp from './SuperliveApp.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/'>
    <SuperliveApp />
  </BrowserRouter>
)
