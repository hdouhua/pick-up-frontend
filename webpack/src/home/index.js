import { sayHello } from '../main'
import content from '../../README.md'
import { Heading } from '../components'
import '../styles/main.css'
import '../styles/home.css'

(function () {

  document.getElementById('greetings').appendChild(Heading(2, sayHello()))
  document.getElementById('root').innerHTML = content
  //throw new Error('test')

})();
