import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { NotificationProvider } from "./shared/notifications/NotificationContext";
import App from './App.tsx'
import { AuthProvider } from './features/auth/context/AuthContext.tsx';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/lib/queryClient";

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>        
        </NotificationProvider>
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>,
)
