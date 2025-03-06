/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './Components/Navbar.jsx'
import StudentPortal from './Components/StudentPortal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <StudentPortal/>
    
  </StrictMode>,
)
