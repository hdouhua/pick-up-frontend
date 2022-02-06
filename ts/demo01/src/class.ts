// 类


// 无论在 es 还是 ts 中，类成员的属性都是 实例属性 而不是 原型属性
class Dog {
  constructor(name: string) {
    this.name = name
  }

  // 成员属性列表
  name: string
  // 私有成员
  private age: number = 0
  static food: string = 'bones'

  // 成员方法列表
  run() { }
  // 受保护成员
  protected setAge() { }
}

// 观察打印出来的 原型，结果只有方法成员，而不包含 name 属性
console.log(Dog.prototype)
// 观察打印结果，看到 name 属性在实例上
let dog = new Dog('wangcai')
console.log(dog)


// 类的继承
class Husky extends Dog {
  constructor(name: string, color: string) {
    // 必须调用父类的构造函数
    super(name)
    // this 必须在 super 之后调用
    this.color = color
  }

  color: string

}
let husky = new Husky('wang', 'white')
console.log(`i am a dog ${husky.name} in ${husky.color}, and i eat ${Husky.food}`)


// 抽象 类型
{
  abstract class Animal {
    eat() {
      console.log('in eating')
    }
    abstract sleep(): void
  }
  // // TS2511: Cannot create an instance of an abstract class.
  // let animal = new Animal()

  class Dog extends Animal {
    constructor(name: string) {
      super()
      this.name = name
    }

    name: string

    run() { }
    sleep(): void {
      // throw new Error("Method not implemented.")
      console.log(`${this.name} in sleeping`)
    }
  }

  let dog = new Dog('husky')
  // dog.eat()
  // dog.sleep()

  class Cat extends Animal {
    constructor(name: string) {
      super()
      this.name = name
    }

    name: string
    sleep(): void {
      console.log(`${this.name} can sleep`)
    }

  }
  let cat = new Cat('douhua')
  // cat.sleep()

  // 类的多态
  let animals: Animal[] = [dog, cat]
  for (const it of animals) {
    it.eat()
    it.sleep()
  }


}

