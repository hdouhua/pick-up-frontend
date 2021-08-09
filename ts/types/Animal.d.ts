declare class Animal {
  name: string;
  constructor(name: string);
  sayHello(): string;
}

declare enum Directions {
  Up,
  Down,
  Left,
  Right
}

declare function jQuery(selector: string): any;

declare namespace jQuery {
  interface AjaxSettings {
    method: 'GET' | 'POST';
    data?: any;
  }
  function ajax(url: string, settings?: AjaxSettings): void;
}

interface String {
  prependHello(): string;
}
