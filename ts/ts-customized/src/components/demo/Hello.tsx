import React from 'react'

interface Greeting {
  name: string
}

const Hello = (props: Greeting) => <h2>Hello {props.name}</h2>

export default Hello
