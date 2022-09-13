/// <reference path="../types/Animal.d.ts" />

let cat = new Animal("Tom");
cat.sayHello();

let direction = [
  Directions.Up,
  Directions.Down,
  Directions.Right,
  Directions.Left,
];

let element = jQuery("#test");
let settings: jQuery.AjaxSettings = {
  method: "POST",
  data: {
    name: "foo",
  },
};
jQuery.ajax("", settings);

"foo".prependHello();
