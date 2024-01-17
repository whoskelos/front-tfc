import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AuthProvider from "./context/AuthContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{
      "clientId": "AT70eShqd3DS7L5A883l_6ej6DY-MluYU5IzNdOYsJ8nkEFub7gmY5dRiA5h1966vb6jClZfanskjrr2",
      "currency": "EUR",
    }}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </PayPalScriptProvider>
  </React.StrictMode>,
)
