let dom: Element | null = document.querySelector('.app')
let hello: string = 'Hello Typescript!'
if (dom) dom!.textContent = hello

hello = 1
