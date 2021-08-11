// import a readonly reference
import { a } from './a.mjs'

console.log(a)

// a = 'b' // throw TypeError: Assignment to constant variable.

setTimeout(() => console.log(a), 1000)
