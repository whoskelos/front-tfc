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
      "clientId": import.meta.env.VITE_PAYPAL_CLIENTID,
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
