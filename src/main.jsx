import React from "react";

import { createRoot } from 'react-dom/client'
import {ChakraProvider, theme} from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import themejs from "./theme.js";

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={themejs}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
    </AuthProvider>    
  </ChakraProvider>,
)
