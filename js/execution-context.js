//


// hoisting:
// variable
{
  //1
  {
    var apple = 10
    console.log(apple)
  }
  //2
  {
    console.log(apple) // undefined
    var apple = 10
  }
  // 3
  {
    console.log(apple) // Error
    let apple = 10
  }

  {
    var myName = "dao"
    function showName() {
      console.log(myName);
      if (0) {
        var myName = "xyz"
      }
      console.log(myName);
    }
    showName()
  }
}
// function
{
  {
    showNumber();
    showName();
    // 方式 1, 创建了一个匿名函数，然后赋值给 showName，这里会发生变量的命名提升；
    var showName = function () {
      console.log('Hi, this is my name.');
    }
    // 方式2
    function showNumber() {
      console.log('Hey, show a number.');
    }
  }
}


// Two unusual cases to understand compiling tricks
{
  // 1) naming conflict
  // if we use the same variable names, the latter one will override the first one.
  {
    show();
    function show() {
      console.log("I'm a declaration")
    }
    var show = function () {
      console.log("I'm an assignment")
    }
  }
  // 2) In this case, the apple variable is still declared in the variable environment at the compiling step.
  {
    console.log(apple)
    if (0) {
      var apple = 10
    }
  }

}

// 在初始化之前访问一个变量
{
  {
    let apple = 'apple';
    {
      console.log(apple);
      let apple = 'banana';
    }
  }

  {
    const apple = 'apple';
    {
      console.log(apple);
      const apple = 'banana';
    }
  }
}

// 在赋值之前访问一个变量
{
  console.log(apple);
  var apple = 'apple';
}

{
  showName();
}
