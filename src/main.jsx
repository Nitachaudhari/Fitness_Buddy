import React from "react";

import { createRoot } from 'react-dom/client'
import {ChakraProvider} from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
    </AuthProvider>    
  </ChakraProvider>,
)
