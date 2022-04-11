//
// 闭包 closure
//

{
  var fn;

  function foo() {
    var a = 2;
    function baz() {
      console.log(a);
    }
    fn = baz;
  }
  function bar() {
    fn();
  }

  foo();
  bar(); // 2

  // 这个例子中，谁是闭包？
  // 闭包是一种特殊的对象，它由两部分组成。执行上下文(代号A)，以及在该执行上下文中创建的函数（代号B）。
  // 当B执行时，如果访问了A中变量对象中的值，那么闭包就会产生——以执行上下文A的函数名+变量构成的闭包。
  // 如上例，闭包由 执行上下文 foo 与 bar 共同组成。
  // 查看 chrome DevTool 来理解。
}


{
  var fn;
  var m = 20;

  function foo() {
    var a = 2;
    function baz(a) {
      console.log(a);
    }
    fn = baz;
  }
  function bar() {
    fn(m);
  }

  foo();
  bar(); // 20

  // 这个例子中闭包没了。foo 中创建了 bar，但是 bar 没有使用 foo 的变量。
}

{
  function foo() {
    var a = 2;

    return function bar() {
      var b = 9;

      return function fn() {
        console.log(a, b);
      }
    }
  }

  var bar = foo();
  var fn = bar();// 闭包 foo，bar 内使用了 foo 的变量 a
  fn();// 闭包 foo 和 bar，fn 内使用了 foo 的变量 a 和 bar 的变量 b
}

{
  function foo() {
    var a = 11;

    function fn1() {
      return a;
    }

    function fn2() {
      return 10;
    }

    return fn2();
  }

  foo();

  // 这里也有闭包，即使执行时没有访问 foo 下的 fn1。
}

// 闭包的应用
{
  // singleton instance
  var SingleStudent = (function () {
    function Student() { }
    var _student;
    return function () {
      if (_student) return _student;
      _student = new Student()
      return _student;
    }
  }())

  var s1 = new SingleStudent()
  var s2 = new SingleStudent()
  console.log(s1 === s2)
}

// ? what is the output
{
  for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000 * i)
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000 * i)
  }
}
