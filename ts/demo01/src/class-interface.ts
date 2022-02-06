// 类 和 接口


interface Human {
  // new(name: string): void
  name: string
  eat(): void
}

class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }

  name: string;

  //类实现接口时必须实现接口中的所有操作
  eat(): void {
    throw new Error("Method not implemented.");
  }

}


// 接口的多继承
interface Men extends Human {
  run(): void
}
interface Child {
  cry(): void
}
interface Boy extends Men, Child { }
//
let boy: Boy = {
  name: 'a little boy',
  run() { },
  eat() { },
  cry() { }
}
console.log(boy)


// 接口 可以继承 类 (这个好绕)
{
  class Auto {
    state = 1
  }
  interface AutoInterface extends Auto {

  }
  class Motor implements AutoInterface {
    state = 2;
  }

  let auto: Motor = new Motor()
  console.log(auto.state)
}
