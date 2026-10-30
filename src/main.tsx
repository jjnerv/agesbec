import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { NotificationProvider } from "./shared/notifications/NotificationContext";
import App from './App.tsx'
import { AuthProvider } from './features/auth/context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>        
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
)
