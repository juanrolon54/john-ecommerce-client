import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'

import App from './App'
import './index.css'
import { ContextProvider } from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>,
)
