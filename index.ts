// let foo = 1;
// foo.split(' '); 
// Property 'split' does not exist on type 'number'
// 编译时报错（数字没有 split 方法），无法通过编译


// 完整的 TypeScript 代码如下
// let foo: number = 1;
// foo.split(' ');
// Property 'split' does not exist on type 'number'


// TypeScript 是弱类型
// console.log(1 + '1');


// 字符串字面量类型

// type EventNames = 'click' | 'scroll' | 'mousemove';
// function handleEvent(ele: Element, event: EventNames) {
//   // do sth
// }

// handleEvent(document.getElementById('hello'), 'scroll'); // 没问题
// handleEvent(document.getElementById('world'), 'dbclick'); // 报错
// // Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.



// 元组
// let tom: [string, number] = ['Tom', 25];


// 赋值或访问一个已知索引的元素，会得到正确的类型
// let tom: [string, number];
// tom[0] = 'Tom';
// tom[1] = 25;

// tom[0].slice(1);
// tom[1].toFixed(2); // 使用定点的方式格式化一个数值


// 只赋值其中一项
// let tom: [string, number];
// tom[0] = 'Tom';


// 直接对元组进行初始化或者赋值，需要提供所有元组指定的项
// let tom: [string, number];
// tom = ['Tom'];
// Type '[string]' is not assignable to type '[string, number]'.
// Source has 1 element(s) but target requires 2.


// let tom: [string, number];
// tom = ['Tom', 25];


// 越界的元素
// let tom: [string, number];
// tom = ['Tom', 25];
// tom.push('male');
// tom.push(true);
// // Argument of type 'boolean' is not assignable to parameter of type 'string | number'.


// 枚举
// enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

// console.log(Days['Sun'] === 0 ); // true
// console.log(Days['Mon'] === 1 ); // true
// console.log(Days['Tue'] === 2 ); // true
// console.log(Days['Sat'] === 6 ); // true

// console.log(Days[0] === 'Sun'); // true
// console.log(Days[1] === 'Mon'); // true
// console.log(Days[2] === 'Tue'); // true
// console.log(Days[6] === 'Sat'); // true


// 手动赋值

// enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

// console.log(Days['Sun'] === 7); // true
// console.log(Days['Mon'] === 1); // true
// console.log(Days['Tue'] === 2); // true
// console.log(Days['Sat'] === 6); // true


// enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

// console.log(Days['Sun'] === 3); // true
// console.log(Days['Mon'] === 1); // true
// console.log(Days[3] === 'Sun'); // false
// console.log(Days[3] === 'Wed'); // true


// 类型断言
// enum Days {Sun = 7, Mon, Tus, Wed, Thu, Fri, Sat = <any>"S"};

// enum Days {Suns = 7, Mon = 1.5, Tus, Wed, Thu, Fri, Sat};

// console.log(Days["Sun"] === 7); // true
// console.log(Days["Mon"] === 1.5); // true
// console.log(Days["Tue"] === 2.5); // true
// console.log(Days["Sat"] === 6.5); // true


// 常数项和计算所得项
// enum Color {Red, Green, Blue = 'blue'.length};

// 无法获得初始值
// enum Color {Red = 'red'.length, Green, Blue};
// Enum member must have initializer.ts(1061)


// 常数枚举

// const enum Directions {Up, Down, Left, Right};

// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// const enum Color {Red, Green, Blue = 'blue'.length};
// // const enum member initializers can only contain literal values and other computed enum values.ts(2474)


// 外部枚举
// declare enum Directions {Up, Down, Left, Right};

// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];


// declare enum Directions {Up, Down, Left, Right};

// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];


// 属性和方法
// class Animal {
//   public name;
//   constructor(name) {
//     this.name = name;
//   }
//   sayHi() {
//     return `My name is ${this.name}`;
//   }
// }

// let a = new Animal('Jack');
// console.log(a.sayHi());


// 类的继承
// class Cat extends Animal {
//   constructor(name) {
//     super(name); // 调用父类的 constructor（name）
//     console.log(this.name);
//   }
//   sayHi() {
//     return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
//   }
// }

// let c = new Cat('Tom');
// console.log(c.sayHi());


// 存取器

// 静态方法


// TS 中类的用法
// public
// class Animal {
//   public name;
//   public constructor(name) {
//     this.name = name;
//   }
// }

// let a = new Animal('Jack');
// console.log(a.name); // Jack
// a.name = 'Tom'; 
// console.log(a.name); // Tom



// private
// class Animal {
//   private name;
//   public constructor(name) {
//     this.name = name;
//   }
// }

// let a = new Animal('Jack');
// console.log(a.name); 
// a.name = 'Tom'; 
// Property 'name' is private and only accessible within class 'Animal'.ts(2341)


// 子类中不允许访问
// class Animal {
//   private name;
//   public constructor(name) {
//     this.name = name;
//   }
// }

// class Cate extends Animal {
//   constructor(name) {
//     super(name);
//     console.log(this.name);
//   }
// }
// Property 'name' is private and only accessible within class 'Animal'.ts(2341)


// protected
// class Animal {
//   protected name;
//   public constructor(name) {
//     this.name = name;
//   }
// }

// class Cate extends Animal {
//   constructor(name) {
//     super(name);
//     console.log(this.name);
//   }
// }



// 构造函数 private
// class Animal {
//   public name;
//   private constructor(name) {
//     this.name = name;
//   }
// }

// class Cate extends Animal {
//   constructor(name) {
//     super(name);
//     console.log(this.name);
//   }
// }
// Cannot extend a class 'Animal'. Class constructor is marked as private.ts(2675)



// 构造函数修饰为 protected
// class Animal {
//   public name;
//   protected constructor(name) {
//     this.name = name;
//   }
// }

// class Cate extends Animal {
//   constructor(name) {
//     super(name);
//     console.log(this.name);
//   }
// }

// let a = new Animal('jack');
// // Constructor of class 'Animal' is protected and only accessible within the class declaration.ts(2674)



// 参数属性
// class Animal {
//   // public name: string;
//   public constructor(public name) {
//     // this.name = name;
//   }
// }



// readonly
// class Animal {
//   readonly name;
//   public constructor(name) {
//     this.name = name;
//   }
// }

// let a = new Animal('Jack');
// console.log(a.name);
// a.name = 'Tom';
// // Cannot assign to 'name' because it is a read-only property.ts(2540)



// 抽象类

// abstract class Animal {
//   public name;
//   public constructor(name) {
//     this.name = name;
//   }
//   public abstract sayHi();
// }

// let a = new Animal('Jack');
// // Cannot create an instance of an abstract class.ts(2511)


// 抽象类必须被子类实现
// abstract class Animal {
//   public name;
//   public constructor(name) {
//     this.name = name;
//   }
//   public abstract sayHi();
// }

// class Cat extends Animal {
//   public eat() {
//     console.log(`${this.name} is eating.`)
//   }
// }

// let cat = new Cat('tom');
// // on-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.ts(2515)



// 被子类实现
// abstract class Animal {
//   public name;
//   public constructor(name) {
//     this.name = name;
//   }
//   public abstract sayHi();
// }

// class Cat extends Animal {
//   public sayHi() {
//     console.log(`Mewo, My name is ${this.name}`)
//   }
// }

// let cat = new Cat('tom');


// 类的类型
// class Animal {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   sayHi(): string {
//     return `My name is ${this.name}`;
//   }
// }

// let a: Animal = new Animal('Jack');
// console.log(a.sayHi()); 



// 类实现接口
// interface Alarm {
//   alert(): void;
// }

// class Door {
// }

// class SecurityDoor extends Door implements Alarm {
//   alert() {
//     console.log('SecurityDoor alert');
//   }
// }

// class Car implements Alarm {
//   alert() {
//     console.log('Car alert');
//   }
// }


// 一个类可以实现多个接口：
// interface Alarm {
//   alert(): void;
// }

// interface Light {
//   lightOn(): void;
//   lightOff(): void;
// }

// class Car implements Alarm, Light {
//   alert() {
//     console.log(`Car alert`);
//   }
//   lightOn() {
//     console.log('Car light on');
//   }
//   lightOff() {
//     console.log('Car light off');
//   }
// }


// 接口和接口之间可以是继承
// interface Alarm {
//   alert(): void;
// }

// interface LightableAlarm extends Alarm {
//   lightOn(): void;
//   lightOff(): void;
// }


// 接口继承类
// class Point {
//   x: number;
//   y: number;
//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//   }
// }

// interface Point3d extends Point {
//   z: number;
// }

// let point3d: Point3d = {x: 1, y: 2, z: 3};


// 泛型
// function createArray(length: number, value: any): Array<any> {
//   let result = [];
//   for (let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }

// createArray(3, 'x');


// 指定 string 类型
// function createArray<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }

// createArray<string>(3, 'x');


// 不指定，让自动推论
// function createArray<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }

// createArray(3, 'x');



// 一次定义多个类型参数
// function swap<T, U>(tuple: [T, U]): [U, T] {
//   return [tuple[1], tuple[0]];
// }

// swap([7, 'seven']);



// 泛型约束

// function loggingIdentity<T>(arg: T):T {
//   console.log(arg.length);
//   return arg;
// }
// // Property 'length' does not exist on type 'T'.ts(2339)


// 上述 T 中不一定包含 length，使用泛型约束
// interface Lengthwise {
//   length: number;
// }

// function loggingIdentity<T extends Lengthwise>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }


// 如果 arg 不含 length
// interface Lengthwise {
//   length: number;
// }

// function loggingIdentity<T extends Lengthwise>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }

// loggingIdentity(1);
// // Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.ts(2345)


// 多个参数类型也可以相互约束
// function copyFields<T extends U, U>(target: T, source: U): T {
//   for (let id in source) {
//     target[id] = (<T>source)[id];
//   }
//   return target;
// }

// let x = { a: 1, b: 2, c: 3, d: 4 };

// copyFields(x, { b: 10, d: 20 });



// 泛型接口

// 接口定义函数需要符合形状
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//   return source.search(subString) !== -1;
// }


// 使用含有泛型的接口定义函数的形状：
// interface CreateArrayFunc {
//   <T>(length: number, value: T): Array<T>;
// }

// let createArray: CreateArrayFunc;
// createArray = function<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }

// createArray(3, 'x');


// 泛型类
// class GenericNumber<T> {
//   zeroValue: T;
//   add: (x: T, y: T) => T;
// }

// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) { return x + y; }


// 泛型参数的默认类型
// function createArray<T = string>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }


// 声明合并

// 函数的合并
// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string {
//   if (typeof x === 'number') {
//     return Number(x.toString().split('').reverse().join(''));
//   } else if (typeof x === 'string') {
//     return x.split('').reverse().join('');
//   }
// }


// 接口的合并
// interface Alarm {
//   price: number;
// }

// interface Alarm {
//   weight: number;
// }

// interface Alarm {
//   price: number;
//   weight: number;
// }


// 合并类型必须一致
// interface Alarm {
//   price: number;
// }

// interface Alarm {
//   price: number; // 虽然重复，但是类型都是 `number`，所以不会报错
//   weight: number;
// }


// 不一致会报错
// interface Alarm {
//   price: number;
// }

// interface Alarm {
//   price: string; // 类型不一致，报错
//   weight: number;
// }
// // Subsequent property declarations must have the same type.  Property 'price' must be of type 'number', but here has type 'string'.


// 接口中方法的合并
// interface Alarm {
//   price: number;
//   alert(s: string): string;
// }
// interface Alarm {
//   weight: number;
//   alert(s: string, n: number): string;
// }

// interface Alarm {
//   price: number;
//   weight: number;
//   alert(s: string): string;
//   alert(s: string, n: number): string;  
// }