import React from "react"
import ReactDOM from "react-dom"

import reportWebVitals from './reportWebVitals'
import ErrorBoundary from './components/ErrorBoundary'
import RootRouter from './routers/index'
// import App from './components/App';

reportWebVitals(console.log)

ReactDOM.render(
  <ErrorBoundary>
    <RootRouter />
  </ErrorBoundary>,
  document.querySelector('.app')
)
