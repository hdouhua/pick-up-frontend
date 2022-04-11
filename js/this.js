//
// this
//

{
  const person5 = {
    name: 'tom',
    getName: function () {
      return this.name;
    }
  }
  const person6 = {
    name: 'jerry',
    getName: () => {
      // arrow function without this in its EC
      console.log(this)
    }
  }

  console.log(person5.getName())
  console.log(person6.getName()())
}


{
  var a = 20;
  var obj = {
    a: 10,
    c: this.a + 20, // 'this' belongs to global EC
    fn: function () {
      return this.a + 20;
    }
  }

  console.log(obj.c); // 40
  console.log(obj.fn()); // 30
}


// 在一个函数上下文中，this 由调用者提供，由调用函数的方式来决定。
// 如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的 this 指向该对象。
// 如果函数独立调用，那么该函数内部的 this，则指向 undefined。但是在非严格模式中，当 this 指向undefined 时，它会被自动指向全局对象。
{
  {
    var a = 20;
    function fn() {
      // 为了能够准确判断，我们在函数内部使用严格模式，因为非严格模式会自动指向全局
      'use strict';
      console.log(this.a);
    }

    fn();// 独立调用
    window.fn();// 被window所拥有
  }

  // 抓住真实调用者
  {
    var a = 20;
    var foo = {
      a: 10,
      getA: function () {
        return this.a;
      }
    }
    console.log(foo.getA());
    var test = foo.getA;
    console.log(test());
  }
  //
  {
    function foo() {
      console.log(this.a)
    }
    function active(fn) {
      fn(); // 真实调用者，为独立调用
    }
    var a = 20;
    var obj = {
      a: 10,
      getA: foo
    }
    active(obj.getA);
  }
}


// JavaScript 内部提供了一种机制，让我们可以自行手动设置 this 的指向。它们就是 call 与 apply。所有的函数都具有这两个方法。它们除了参数略有不同之外，其功能完全一样。它们的第一个参数都为 this 将要指向的对象。其他参数 call 以一个一个的形式传递，apply 以数组的形式传递。这是他们唯一的不同。
{
  function fn(num1, num2) {
    console.log(this.a + num1 + num2);
  }
  var obj = {
    a: 20
  }
  fn.call(obj, 100, 10); // 130
  fn.apply(obj, [20, 10]); // 50
}

{
  function exam(a, b, c, d, e) {
    // 先看看函数的自带属性 arguments 什么是样子的
    console.log(arguments);// arguments.valueOf();
    console.log(typeof arguments)

    // 使用 call/apply 将 arguments 转换为数组, 返回结果为数组，arguments 自身不会改变
    var arg = [].slice.call(arguments);

    console.log(arg);
  }
  exam(2, 8, 9, 10, 3);
}

// 由于匿名函数的存在导致了 this 指向的丢失，因此我们需要想一些办法找回正确的 this 指向。
{
  // 常规的解决方法：缓存 this 指向
  {
    {
      var obj = {
        a: 20,
        getA: function () {
          var self = this;
          setTimeout(function () {
            console.log(self.a)
          }, 1000)
        }
      }
      obj.getA()
    }
    // 变形
    {
      var obj = {
        a: 20,
        getA: function () {
          (function (self) {
            setTimeout(function () {
              console.log(self.a)
            }, 1000)
          })(this)
        }
      }
      obj.getA()
    }
    // 变形：本例的特殊性，setTimeout 可以传入参数
    {
      var obj = {
        a: 20,
        getA: function () {
          setTimeout(function (self) {
            console.log(self.a)
          }, 1000, this)
        }
      }
      obj.getA()
    }
  }

  // 改变 this 指向
  {
    // 借助闭包：与 apply 方法，封装一个 bind 方法。
    {
      function bind(fn, obj) {
        return function () {
          return fn.apply(obj, arguments);
        }
      }
      var obj = {
        a: 20,
        getA: function () {
          setTimeout(bind(function () {
            console.log(this.a)
          }, this), 1000)
        }
      }
      obj.getA();
    }

    // 也可以使用 ES5 中已经自带的 bind 方法。
    {
      var obj = {
        a: 20,
        getA: function () {
          setTimeout(function () {
            console.log(this.a)
          }.bind(this), 1000)
        }
      }
      obj.getA();
    }
  }

  // ES6 的箭头函数
  {
    var obj = {
      a: 20,
      getA: function () {
        setTimeout(() => {
          console.log(this.a)
        }, 1000)
      }
    }
    obj.getA();
  }
}

// 构造函数与原型方法上的this
{
  function Person(name, age) {
    // 这里的this指向了谁?
    this.name = name;
    this.age = age;
  }
  Person.prototype.getName = function () {
    // 这里的this又指向了谁？
    return this.name;
  }
  // 上面的2个this，是同一个吗，他们是否指向了原型对象？
  var p1 = new Person('Nick', 20);
  p1.getName();

  // 我们已经知道，this 是在函数调用过程中确定，因此，搞明白 new 的过程中到底发生了什么就变得十分重要。
  // 通过 new 操作符调用构造函数，会经历以下4个阶段:
  // •创建一个新的对象；
  // •将构造函数的this指向这个新对象；
  // •指向构造函数的代码，为这个对象添加属性，方法等；
  // •返回新对象。

  // 因此，当 new 操作符调用构造函数时，this 其实指向的是这个新创建的对象，最后又将新的对象返回，被实例对象 p1 接收。这个时候，构造函数的 this，指向了新的实例对象 p1。

  // 而原型方法上的 this 就好理解多了，根据上边对函数中 this 的定义，p1.getName() 中的getName 为调用者，p1 为所有者，因此 p1.getName() 中的 this，也是指向了 p1。
}
