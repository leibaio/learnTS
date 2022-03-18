// function sayHello(person: string) {
//   return 'Hello, ' + person;
// }

// let user = 'Tom';
// console.log(sayHello(user));


// 布尔值
// let createdByNewBoolean: boolean = new Boolean(1);
// let createdByBoolean: boolean = Boolean(1);


// 数值
// let decLiteral: number = 6;
// let hexLiteral: number = 0xf00d; 
// //  ES6 中二进制表示法
// let binaryLiteral: number = 0b1010;
// // ES6 中的八进制表示法
// let octalLiteral: number = 0o744;
// let notANumber: number = NaN;
// let infinityNumber: number = Infinity;


// // 字符串
// let myName: string = 'Tom';
// let myAge: number = 25;

// // 模板字符串
// let sentence: string = `hello, my name is ${myName}.
// I'll be ${myAge + 1} years old next month.`;


// 空值
// function alertName(): void {
//   alert('My name is Tom');
// }
// 声明一个 void 类型的变量没有什么用，因为只能将它赋值为 undefined 和 null。
// let number: void = undefined;



// null 和 undefined
// let u: undefined = undefined;
// let n: null = null;
// 与 void 的区别是，undefined 和 null 是所有类型的子类型

// // 这样不会报错
// let num: number = undefined;
// // 这样也不会
// let u: undefined;
// let num: number = u;

// 而 void 类型的变量不能赋值给 number 类型的变量
// let u: void;
// let num: number = u;
// Type 'void' is not assignable to type 'number'.



// 任意值
// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7;
// // Type 'number' is not assignable to type 'string'.

// let myFavoriteNumber: any = 'seven';
// myFavoriteNumber = 7;

// 在任意值上访问任何属性都是允许的
// let anyThing: any = 'hello';
// console.log(anyThing.myName);
// console.log(anyThing.myName.firstName);

// 也允许调用任何方法
// let anyThing: any = 'Tom';
// anyThing.setName('Jerry');
// anyThing.setName('Jerry').sayHello();
// anyThing.myName.setFirstName('Cat');

// 未声明类型的变量
// let something;
// something = 'seven';
// something = 7;
// something.sayName('Tom');


// 类型推论
// let aNum = 'seven';
// aNum = 7;

// 定义时候没有赋值，会被推断为 any 类型
// let aNum;
// aNum = 'seven';
// aNum = 7;



// 联合类型
// let aNum: string | number;
// aNum = 'seven';
// aNum = 7;
// aNum = true;

// 访问联合类型的属性或方法
// function getLength(something: string | number): number {
//   return something.length;
// }
// // Property 'length' does not exist on type 'string | number'.
// // Property 'length' does not exist on type 'number'

// function getString(something: string | number): string {
//   return something.toString();
// }


// let aNum: string | number;
// aNum = 'seven';
// console.log(aNum.length);
// aNum = 7;
// console.log(aNum.length);
// Property 'length' does not exist on type 'number'



// 接口
// interface Person {
//   name: string;
//   age: number;
// }

// let tom: Person = {
//   name: 'Tom',
//   age: 25,
//   gender: 'male'
// };
// Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.ts(2322)


// 可选属性
// interface Person {
//   name: string;
//   age?: number;
// }

// let tom: Person = {
//   name: 'Tom',
//   age: 25,
//   gender: 'male'
// }


// 任意属性
// interface Person {
//   name: string;
//   age?: number;
//   [propName: string]: string | number;
// }

// let tom: Person = {
//   name: 'Tom',
//   age: 25,
//   gender: 'male'
// }


// 只读属性
// interface Person {
//   readonly id: number;
//   name: string;
//   age?: number;
//   [propName: string]: any;
// }

// let tom: Person = {
//   id: 89757,
//   name: 'Tom',
//   gender: 'male'
// };

// tom.id = 12343;



// interface Person {
//   readonly id: number;
//   name: string;
//   age?: number;
//   [propName: string]: any;
// }

// let tom: Person = {
//   name: 'Tom',
//   gender: 'male'
// };

// tom.id = 1234;