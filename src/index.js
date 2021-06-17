import React from 'react'
import ReactDom from 'react-dom'
import { StoreProvider } from '@store'
import App from './App'

const MainApp = () => {
  return (
    // <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
    // </React.StrictMode>
  )
}

ReactDom.render(<MainApp />, document.getElementById('root'))
