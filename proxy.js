
// ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

// target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
// var proxy = new Proxy(target, handler);


// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 实际上重载（overload）了点运算符
var handler = {
  // 拦截对象属性的读取
  get: function (target, propKey, receiver) {
    // 可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身，其中最后一个参数可选（通常 receiver === obj ）

    console.log(`getting ${propKey}!`);
    if (propKey === 'prototype') {
      return Object.prototype;
    }
    return Reflect.get(target, propKey, receiver);
  },

  // 拦截对象属性的读取
  set: function (target, propKey, value, receiver) {
    // 可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选

    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  },

  // 拦截 Proxy 实例作为构造函数调用的操作
  apply: function (target, thisBinding, args) {
    // 可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组

    console.log('calling proxy apply!')
    return target.apply(thisBinding, args)
  },

  // 拦截 new 命令
  construct: function (target, args, newTarget) {
    // 方法返回的必须是一个对象，否则会报错

    console.log('calling proxy construct!')
    return { newResult: target.apply(newTarget, args) }
  },

  // more traps ...
}

{
  let obj = new Proxy({}, handler);
  obj.count = 1
  ++obj.count
  console.log(obj.count)
}

{
  let proxy = new Proxy(function (x, y) {
    return { result: x + y }
  }, handler);
  console.log(proxy(1, 2))
  console.log(new proxy(1, 2))
  proxy.prototype === Object.prototype
}

// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
{
  let target = {}
  let proxy = new Proxy(target, {});
  proxy.a = 'b';
  // proxy 对象直接通向原对象(target)
  proxy.a === target.a
}

// 如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性
{
  let target = Object.defineProperties({}, {
    foo: {
      value: 123,
      writable: false,
      configurable: false
    },
  })
  let handler = {
    get(target, propKey) {
      return 'abc';
    }
  }

  let proxy = new Proxy(target, handler)
  try {
    proxy.foo
  } catch (err) {
    console.log(err)
  }
}

// Proxy.revocable() 方法返回一个可取消的 Proxy 实例。它的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
{
  let target = {};
  let handler = {};
  let { proxy, revoke } = Proxy.revocable(target, handler);

  proxy.foo = 123;
  console.log(proxy.foo)

  revoke();

  try {
    proxy.foo
  } catch (err) {
    err
  }
}

// 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。
{
  let target = {
    test: function () {
      console.log(this === proxy);
    }
  };
  let handler = {};
  let proxy = new Proxy(target, handler);

  target.test()
  proxy.test()
}


// Proxy 的用途

let twice = {
  apply(target, ctx, args) {
    // return target.apply(ctx, args) * 2
    // or
    return Reflect.apply(...arguments) * 2;
  }
};
function sum(left, right) {
  return left + right;
};
var twiceProxy = new Proxy(sum, twice);
console.log(twiceProxy(1, 2))
console.log(twiceProxy.call(null, 5, 6))
console.log(twiceProxy.apply(null, [7, 8]))

// 通过 Proxy 转为链式操作
var global = typeof window === 'undefined' ? {} : window
var pipe = function (value) {
  let funcStack = [];
  let oproxy = new Proxy({}, {
    get: function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        }, value);
      }
      funcStack.push(global[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

global.double = n => n * 2;
global.pow = n => n * n;
global.reverseInt = n => n.toString().split("").reverse().join("") | 0;
console.log(pipe(3).double.pow.reverseInt.get)
