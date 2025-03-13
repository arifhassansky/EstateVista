import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/Route';
import AuthProvider from './AuthProvider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='top-right'/>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
    </QueryClientProvider>
     
     
  </StrictMode>,
)
