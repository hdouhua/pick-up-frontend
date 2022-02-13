import React from "react"
import ReactDOM from "react-dom"

// import 'antd/dist/antd.css'

// import Hello from "./components/demo/Hello"
// import Hello from "./components/demo/HelloClass"
// import Hello from "./components/demo/HelloHOC"
import Hello from "./components/demo/HelloHooks"
import reportWebVitals from './reportWebVitals'

reportWebVitals(console.log)

ReactDOM.render(
  <Hello name="Typescript" />,
  document.querySelector('.app')
)
