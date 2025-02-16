import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// To use router, we have to wrap our main app in a "browser router" from react-router dom.
// "browser router" can be used to manage the navigation links in our website.
import {BrowserRouter} from "react-router-dom" 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
