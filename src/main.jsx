import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* daftarkan routing menggunakan router provider */}
   <RouterProvider router={router}></RouterProvider>
   {/* dari react router dom */}
  </StrictMode>,

    // "dev": "vite",
    // // untuk localhost lokal
    // "build": "vite build",
    // // untuk yang udah dihosting
)
