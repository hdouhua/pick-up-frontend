// 柯里化


// /**
//  * 柯里化通用函数
//  * @param {Function} func
//  * @param {arguments} args
//  * @returns {Function}
//  */
// function createCurry(func, args) {
//   var arity = func.length;
//   var args = args || [];

//   return function () {
//     var _args = [].slice.call(arguments);
//     // 拼接参数
//     _args = [...args, ..._args];

//     // 如果参数个数小于最初的 func.length，则递归调用，继续收集参数
//     if (_args.length < arity) {
//       return createCurry.call(this, func, _args);
//     }

//     // 参数收集完毕，则执行 func
//     return func.apply(this, _args);
//   }
// }

/**
 * 柯里化通用函数 - 简化版
 * @param {Function} fn
 * @param  {...any} args
 * @returns
 */
function createCurry(fn, ...args) {
  /**
   * 传入的参数大于等于原始函数fn的参数个数时，
   *    直接执行该函数
   * 否则
   *    继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
  */
  return args.length >= fn.length
    ? fn(...args)
    : (..._args) => createCurry(fn, ...args, ..._args);
}


// 例子 1
/**
 *
 * @param {RegExp} regex
 * @param {String} targetString
 * @returns {Boolean}
 */
function check1(regex, targetString) {
  return regex.test(targetString);
}

function check2(regex1, regex2, str1, str2) {
  return regex1.test(str1) && regex2.test(str2);
}

// 常规解决方案
console.log('check phone:', check1(/^1[34578]\d{9}$/, '13912345678'));
console.log('check email:', check1(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'xyz@test.com'));

// 柯里化解决方案
var _check1 = createCurry(check1);
var checkPhone = _check1(/^1[34578]\d{9}$/);
var checkEmail = _check1(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
console.log('check phone:', checkPhone('13912345678'));
console.log('check email:', checkEmail('xyz@test.com'));
console.log('check phone array:', checkPhone('14900000088', '13812345678'));

var _check2 = createCurry(check2);
var checkPhoneAndEmail = _check2(/^1[34578]\d{9}$/)(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
console.log('check phone & email:', checkPhoneAndEmail('13912345678', 'xyz@test.com'));


// 例子 2
function _add(x, y, z) {
  return x + y + z;
}
const add = createCurry(_add);
console.log(add(1, 2, 4));
console.log(add(1)(2)(4));
console.log(add(1, 2)(4));
console.log(add(1)(2, 4));
