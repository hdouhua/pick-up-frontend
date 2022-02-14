import React from "react"
import ReactDOM from "react-dom"

import reportWebVitals from './reportWebVitals'
import ErrorBoundary from './components/ErrorBoundary'

// import Hello from "./components/demo/Hello"
// import Hello from "./components/demo/HelloClass"
// import Hello from "./components/demo/HelloHOC"
// import Hello from "./components/demo/HelloHooks"
// import App from './components/App';
import RootRouter from './routers/index'


reportWebVitals(console.log)

ReactDOM.render(
  <ErrorBoundary>
    {/* <Hello name="Typescript" /> */}
    <RootRouter />
  </ErrorBoundary>,
  document.querySelector('.app')
)
