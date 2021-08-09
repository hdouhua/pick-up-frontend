interface Config {
  //字符串字面量类型
  size: 'small' | 'big';
  //布尔字面量类型
  isEnable: true | false;
  // /数字字面量类型
  margin: 0 | 2 | 4;
}

type Direction = 'up' | 'down';
function move(dir: Direction) {
  // ...
}
move('up'); // ok
move('right'); // ts(2345)
move('down')


