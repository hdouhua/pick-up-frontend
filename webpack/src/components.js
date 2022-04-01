
// console.log('components ~')

function __removeComments(content) {
  return content.replace(/\/\*{2,}\/\s?/g, '')
}

export const Button = () => {
  console.log(__removeComments('/******/ test'))
  let element = document.createElement('button')
  element.textContent = '-- button --'
  return element
  console.log('dead code')
}

export const Link = () => {
  return document.createElement('a')
}

export const Heading = (level, text) => {
  let element = document.createElement('h' + level)
  element.textContent = text || '-- heading --'
  return element
}
