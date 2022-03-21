## 什么是 TypeScript

添加了类型系统的 JavaScript，适用于任何规模的项目。

### TypeScript 的特性

#### 类型系统

JavaScript 是一门非常灵活的语言，

* 没有类型约束，一个变量可能初始化时是字符串，过一会又被赋值为数字
* 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定
* 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改
* 函数，可以赋值给变量，也可以当作参数或返回值

##### **TypeScript 是静态类型**

类型系统按照 「 类型检查的时机 」 来分类，可以分为动态类型和静态类型。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。

```js
let foo = 1;
foo.split(' '); // Uncaught TypeError: foo.split is not a function
// 运行时报错（foo.split 不是一个函数），造成线上 bug
```

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 **TypeScript 是静态类型**，这段 TypeScript 代码在编译阶段就会报错：

```typescript
let foo = 1;
foo.split(' '); // Property 'split' does not exist on type 'number'
// 编译时报错（数字没有 split 方法），无法通过编译
```

大部分 JavaScript 代码都只需要经过少量的修改（或者完全不用修改）就变成 TypeScript 代码，这得益于 TypeScript 强大的 「类型推论」，即时不去手动声明变量 foo 的类型，也能在变量初始化时自动推论出它是一个 number 类型。

完整的 TypeScript 代码如下：

```typescript
let foo: number = 1;
foo.split(' ');
// Property 'split' does not exist on type 'number'
```

##### TypeScript 是弱类型

系统按照「是否允许隐式类型转换」来分类，可以分为强类型和弱类型。

以下代码无论是在 JavaScript 还是 TypeScript 中都是可以正常运行的，运行时数字 1 会被隐式转换为字符串 '1'，加号 + 被识别为字符串拼接，所以打印结果是字符串 '11'。

```typescript
console.log(1 + '1');
// '11'
```

TypeScript 完全兼容 JavaScript，不会修改 JavaScript 运行时的特性，都是弱类型语言。

作为对比，Python 是强类型，以下会在运行时报错

```python
print(1 + '1')
# TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

若要修复错误，需要进行强制类型转换：

```python
print(str(1) + '1')
# 打印出字符串 '11'
```

#### 适用于任何规模

TypeScript 非常适用于大型项目，类型系统可以为大型项目带来更高的可维护性，以及更少的 bug。

在中小型项目中推行 TypeScript 的最大障碍就是认为使用 TypeScript 需要写额外的代码，降低开发效率。事实上，由于有「类型推论」，大部分都不用手动声明了。相反增强了 IDE 的功能，包括代码补全、接口提示、跳转到定义、代码重构等。

TypeScript 和 JavaScript 可以共存。意味着可以旧项目的渐进式迁移。

#### 与标准同步发展

TypeScript 的另一个重要特性就是坚持与 ECMAScript 标准同步发展。





## 安装 TypeScript

TypeScript 的命令行安装方法如下：

```shell
npm install -g typescript
```

以上命令在全局安装 tsc 命令，安装完成后，可以执行 tsc 命令

编译一个 TypeScript 文件：

```shell
tsc hello.ts
```

约定使用 TypeScript 编写的文件以 .ts 为后缀，用 TypeScript 编写 React 时，以 .tsc 为后缀。

### 编译器

VSCode 本身也是用 TypeScript 编写的。



## Hello TypeScript

hello.ts

```typescript
function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

执行

```typescript
tsc hello.ts
```

生成一个编译好的 hello.js

```javascript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

在 TypeScript 中，使用 : 指定变量的类型，: 的前后有无空格都可以。上述代码中，用 : 指定 person 参数类型为 string。但是编译为 js 之后，并没有什么检查的代码被插入进来。这是因为 **TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译时候就会报错。**而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

## 基础

### 原始数据类型

JavaScript 类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。原始类型包括：boolean、number、string、null、undefined 以及 ES6 中新类型 Symbol 和 ES10 中新类型 BigInt。本节主要介绍前五种原始数据类型在 TypeScript 中的应用。

#### Boolean

布尔值是最基础的数据类型，在 TS 中，使用 boolean 定义布尔值类型：

````js
let isDone: boolean = false;

// 编译通过
// 后面约定，未强调编译错误的代码片段，默认为编译通过
````

注意，使用构造函数 Boolean 创造的对象**不是**布尔值：

```typescript
let createdByNewBoolean: boolean = new Boolean(1);
// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
```

事实上，上述new Boolean() 返回的是一个 Boolean 对象；

直接调用 Boolean 也可以返回一个 boolean  类型：

````typescript
let createdByBoolean: boolean = Boolean(1);
````

在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型 （除了 null 和 undefined）一样，不再赘述。

#### Number

使用 number 定义数值类型：

```typescript
// 数值
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d; 
//  ES6 中二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

编译后结果：

```javascript
// 数值
var decLiteral = 6;
var hexLiteral = 0xf00d;
//  ES6 中二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
```

#### String

```typescript
// 字符串
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

编译结果：

```javascript
// 字符串
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "hello, my name is ".concat(myName, ".\nI'll be ").concat(myAge + 1, " years old next month.");
```

使用 `  定义 ES6 中的模板字符串，使用 ${expr} 在模板字符串中嵌入表达式。

#### 空值

JavaScript 没有空值 (void) 的概念，在 TypeScript 中，使用 void 表示没有任何返回值的函数：

```typescript
function alertName(): void {
  alert('My name is Tom');
}
```

声明一个 void 类型的变量没有什么用，因为只能将它赋值为 undefined 和 null。

```javascript
let number: void = undefined;
```

#### Null 和 Undefined

`在 TypeScript 中，使用 null 和 undefined 来定义这两个原始数据类型：

```typescript
let u: undefined = undefined;
let n: null = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。比如 undefined 类型变量可以赋值给 number 类型的变量：

```js
// 这样不会报错
let num: number = undefined;
```

```js
// 这样也不会
let u: undefined;
let num: number = u;
```

而 void 类型的变量不能赋值给 number 类型的变量

```typescript
let u: void;
let num: number = u;
// Type 'void' is not assignable to type 'number'.
```

## 任意值

任意值（Any）用来表示允许赋值为任意类型。

### 什么是任意值类型

如果是一个普通类型，在赋值过程中改变类型是不被允许的：

```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
// Type 'number' is not assignable to type 'string'.
```

但如果是 any 类型，则允许被赋值为任意类型。

```typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

### 任意值的属性和方法

在任意值上访问任何属性都是允许的：

```typescript
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

也允许调用任何方法：

```typescript
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
```

 声明一个变量为任意值后，对其任何操作，返回的内容的类型都是任意值

### 未声明类型的变量

变量如果在声明的时候，未指定其类型，那么会被识别为任意值类型

```typescript
let something;
something = 'seven';
something = 7;
something.sayName('Tom');
```

等价于

```typescript
let something: any;
something = 'seven';
something = 7;
something.sayName('Tom');
```

## 类型推论

如果没有明确的指定类型，TypeScript 会依照类型推论 （Type Inference）的规则推断出一个类型。

### 什么是类型推论

以下代码虽然没有指定类型，但是在编译时会报错：

```typescript
let aNum = 'seven';
aNum = 7;
// Type 'number' is not assignable to type 'string'
```

事实上，它等价于

```typescript
let aNum: string = 'seven';
aNUm = 7;
```

TypeScript 会在没有明确的指定类型时推测出一个类型。

**如果定义时候没有赋值，不管之后有没有赋值，都会被推断为 any 类型而完全不被类型检查**

```typescript
let aNum;
aNum = 'seven';
aNum = 7;
```

## 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

### 简单例子

````typescript
let aNum: string | number;
aNum = 'seven';
aNum = 7;
````

```typescript
let aNum: string | number;
aNum = true;
// Type 'boolean' is not assignable to type 'string | number'
```

| 表示允许访问的类型是 string 或 number

### 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型时，**只能访问此联合类型的所有类型里共有的属性或方法**

```typescript
function getLength(something: string | number): number {
  return something.length;
}
// Property 'length' does not exist on type 'string | number'.
// Property 'length' does not exist on type 'number'
```

上述，length 不是 string 和 number 的共有属性，因此会报错。访问 string  和 number 的公共属性不会报错：

```typescript
function getString(something: string | number): string {
  return something.toString();
}
```

联合类型的变量在被赋值时候，会根据类型推论的规则推断出一个类型：

````typescript
let aNum: string | number;
aNum = 'seven';
console.log(aNum.length); // 5
aNum = 7;
console.log(aNum.length); // 报错
// Property 'length' does not exist on type 'number'
````

第二行 aNum 被推断为 string，访问 length 属性不会报错。第四行的 aNum 被推断为 number，访问 length  属性会报错。

## 对象的类型 -- 接口

使用接口（interfaces）定义对象的类型。

### 什么是接口

面向对象中，接口是对行为的抽象，具体如何行动需要由类（classes）实现（implement）

### 简单例子

```typescript
interface Person {
  name: string;
  age: number;
}

let tom: Person = { // = 号
  name: 'Tom',
  age: 25
};
```

上述中，定义了一个接口 Person，然后定义一个变量 tom，类型是 Person。约束 tom 的形状必须和接口 Person 保持一致。

```typescript
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom',
  // age: 25
};
// Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.ts(2741)
// hello.ts(128, 3): 'age' is declared here.
```

```typescript
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
// Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.ts(2322)
```

赋值时比接口少属性或者多属性都会报错。

### 可选属性

若不要完全匹配一个形状，使用可选属性

```typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```

````typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
````

可选属性的含义是该属性可以不存在，但仍不许添加未定义的属性：

```typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
}
// Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.ts(2322)
```

###   任意属性

一个接口允许有任意的属性，使用如下方式：

````typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person {
    name: 'Tom',
    age: 25,
    gender: 'male'
}

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
````

任意属性的值允许是 string，但是可选属性 age 值是 number， number 不是 string 的子属性 ，因此报错。

一个接口中只能定义一种任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}
```

### 只读属性

对象中一些字段只能在创建的时候被赋值，可以用 readonly 定义只读属性：

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 12343;
// Cannot assign to 'id' because it is a read-only property.ts(2540)
```

使用 readonly 定义的 id 被初始化后，又被赋值，因此报错。

只读的约束存在于第一次给对象赋值时，而不是第一次给只读属性赋值时

```typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
};

tom.id = 1234;
// Property 'id' is missing in type '{ name: string; gender: string; }' but required in type 'Person'.ts(2741)
// Cannot assign to 'id' because it is a read-only property.
```

两处错误，一处是对 tom 进行赋值是，没有给 id 赋值。第二处是 tom.id 是只读属性。

## 数组的类型

数组类型有多种定义方法

### [类型 + 方括号] 表示法

````typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
````

不允许出现其他类型：

```typescript
let fibonacci: number[] = [1, '1', 2, 3, 5];
// Type 'string' is not assignable to type 'number'
```

数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push(8);
fibonacci.push('8');
// Argument of type 'string' is not assignable to parameter of type 'number'.ts
```

push 方法只允许传入 number 类型的参数，此时传入的是一个字符串字面量类型。

### 数组泛型

可以使用数组泛型（Array Generic） Array<elemType> 来表示数组：

````typescript
let fibonacci: Array<number> = [1, 1, 2, 3, 5]:
````

### 用接口描述数组

```typescript
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

虽然可以使用接口描述数组，但是一般不选择，比较复杂。但有一种情况例外，用来表示类数组。

### 类数组

类数组（Array-like Object）不是数组类型，比如 arguments:

```typescript
function sum() {
    let args: numbers[] = arguments;
}
// Type 'IArguments' is missing the following properties from type 'numbers[]': pop, push, concat, join, and 26 more
```

上述中，arguments 是一个类数组，不能用普通数组方式描述，使用接口：

```typescript
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
```

在例子中，除了约束当索引类型是数字时，值类型也是数字外，也约束了还有 length  和 callee 属性；

常用的类数组都有自己的接口定义，比如 IArguments, NodeList, HTMLCollection 等

```typescript
function sum() {
  let args: IArguments = arguments;
}
```

其中，IArguments 是 TypeScript 中定义好的类型，实际上就是

```typescript
interface IArguments {
  [index: number]: number;
  length: number;
  callee: Function;
}
```

### any 在数组中的应用

用 any 表示数组中允许出现任意类型：

````typescript
let list: any[] = ['xxx', 23, { website: 'https://leibaio.space' }]
````

## 函数的类型

### 函数声明

JS 中，有两种常见的定义函数的方式 -- 函数声明（Function Declaration）和函数表达式（Function Expression）：

````javascript
// 函数声明
function sum(x, y) {
    return x + y;
}

// 函数表达式
function mySum = function (x, y) {
    return x + y;
}
````

一个函数有输入和输出，要在 TypeScript 中对其进行约束，要把输入和输出都考虑到，函数声明的类型定义比较简单：

````typescript
function sum(x: number, y: number): number {
  return x + y;
}
````

参数多余或者少于要求都不被允许。

```typescript
function sum(x: number, y: number): number {
  return x + y;
}

sum(1); // Expected 2 arguments, but got 1
sum(1, 2, 3); // Expected 2 arguments, but got 3
```

### 函数表达式

```typescript
let mySum = function (x: number, y: number): number {
  return x + y;
}
```

这样可以通过编译，但是代码是对等号右侧的匿名函数进行类型定义，等号左边的 mySum 是通过赋值操作进行类型推论而判断出来的。如果手动加类型，应该如下所示：

```typescript
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
}
```

TS 中的类型定义中，=> 表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

和 ES6 中箭头函数区别出来。

### 使用接口定义函数的形状
可以使用接口定义一个函数需要符合的形状

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```

### 可选参数
输入多余或者少于要求的参数，不允许。定义可选参数与接口中可选属性类似，使用 ? 表示可选参数:

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

**可选参数必须接在必需参数后面**

```typescript
function buildName(firstName?: string, lastName: string) {
  if (firstName) {
    return firstName + ' ' + lastName;
  } else {
      return lastName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Tom');
// A required parameter cannot follow an optional parameter
```

### 参数默认值
ES6 中，允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：

```typescript
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

此时就不受「可选函数必须接在必需函数后面」的限制

```typescript
function buildName(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'cat');
```

### 剩余参数
ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest参数）：

```typescript
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
  })
}

let a: any[] = [];
push(a, 1, 2, 3);
```

items 是一个数组，可以使用数组的类型来定义它：

```typescript
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  })
}

let a = [];
push(a, 1, 2, 3);
```

rest 参数只能是最后一个参数

### 重载
重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如需要实现一个函数 reverse ，输入 123 返回 321，输入字符串 'hello' 返回字符串 'olleh'。

利用联合类型，可以实现

```typescript
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```

但是这样有一个缺点，就是不能够精确的表达，输入为数字时候，输出应该也为数字，输入为字符串，输出也为字符串。

此时可以使用重载定义多个 reverse 的函数类型：

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
  }
}
```

上述中，重复定义多次 reverse 函数，前几次是函数定义，最后一次是函数实现。

注意，TS 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面.

## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

### 语法

值 as 类型    或者    <类型>值

在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，及 值 as 类型。

形如 <Foo> 的语法在 tsx 中表示的是一个 ReactNode，在 ts 中除了表示类型断言外，可能表示一个泛行。

因此建议统一使用 值 as 类型 这一语法。

### 类型断言的用途

类型断言常见用途有以下几种

#### 将一个联合类型断言为其中一个类型

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型的共有属性或方法。

```typescript
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function getName(animal: Cat | Fish) {
  return animal.name;
}
```

有时候，确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如：

```typescript
// 不确定类型时访问其中一个类型特有属性或方法
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === 'function') {
    return true;
  } else {
    return false;
  }
}
// Property 'swim' does not exist on type 'Cat | Fish'.
// Property 'swim' does not exist on type 'Cat'
```

上述在获取 animal.swim 时候会报错。此时可以使用类型断言，将 animal 断言成 Fish：

```typescript
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  } else {
    return false;
  }
}
```

就可以解决访问 animal.swim 的报错问题。但是类型断言只能 欺骗 TS 编译器，无法避免运行时候的错误。

#### 将一个父类断言为更加具体的子类

当类之间有继承关系时，类型断言也比较常见：

```typescript
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
```

上述例子中，声明了函数 isApiError，用来判断输入的参数是否是 ApiError 类型。为了实现这样的一个函数，它的参数类型是比较抽象的父类 Error，这样函数就能接受 Error 或者它的子类作为参数。

但由于父类 Error 中没有 code 属性，直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code。

可以使用 instanceof 判断是否是 ApiError：

```typescript
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (error instanceof ApiError) {
    return true;
  }
  return false;
}
```

在此例子中，使用 instanceof 更加合适，因为 ApiError 是一个 JS 的类，能够通过 instanceof 判断 error 是否是它的实例。

但是有的情况下， ApiError 和 HttpError 不是一个真正的类，而只是一个 TypeScript 的接口（interface），接口是一个类型，不是真正的值，在编译结果中会被删除，就无法使用 instanceof 做运行时的判断：

```typescript
interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}

function isApiError(error: Error) {
  if (error instanceof ApiError) {
    return true;
  }
  return false;
}
// 'ApiError' only refers to a type, but is being used as a value here.ts(2693)
```

此时就只能用类型断言，通过判断是否存在 code 属性判断，来判断传入的是否是 ApiError：

```typescript
interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
```

#### 将任何一个类型断言为 any

理想情况下，TS 类型系统运转良好，每个值类型具体而精确。当引用一个在此类型上不存在的属性或方法时，就会报错：

```typescript
const foo: number = 1;
foo.length = 1;
// Property 'length' does not exist on type 'number'.ts(2339)
```

显然数字类型变量 foo 没有 length 属性，TS 给出相应提示，这很有用。但有的时候，非常确定这段代码不会出错，比如以下：

```typescript
window.foo = 1;
// Property 'foo' does not exist on type 'Window & typeof globalThis'.ts(2339)
```

上述例子中，需要在 window 上加一个 foo 属性，但是 TS 编译会报错，提示 window 上不存在 foo 属性。此时可以使用 as any 临时将 window 断言为 any 类型：

```typescript
(window as any).foo = 1;
```

在 any 类型的变量上，访问任何属性都是允许的。但是将变量断言为 any 可以说是解决 TS 类型问题的最后一个手段。极有可能掩盖真正的类型错误。

#### 将 any 断言为一个具体的类型

断言问题，可以通过类型断言及时把 any 断言为精确的类型，使代码向着高质量可维护目标发展。

举例，遗留代码中有一个 getCacheData，它的返回值是 any

```typescript
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
```

在使用时，最好将调用其之后的返回值断言为一个精确的类型，方便后续的操作：

```typescript
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

调用完 getCacheData 后，立即断言为 Cat 类型。明确了 tom 的类型，后续对 tom 的访问就有了代码补全。

## 声明文件

当使用第三方库时，需要引用它的声明文件，才能获取对应的代码补全、接口提示等功能

### 新语法索引

* declare var 声明全局变量
* declare function  声明全局方法
* declare class 声明全局类
* declare enum 声明全局枚举类型
* declare namespace 声明（含有子属性的）全局对象
* interface 和 type 声明全局类型
* export  导出变量
* export namespace  导出（含有子属性的）对象
* export default  ES6 默认导出
* export -  commonjs 导出模块
* export as namespace UMD 库声明全局变量
* declare global  扩展全局变量
* declare module  拓展模块
* /// <reference /> 三斜线指令

### 什么是声明语句

使用 jQuery 一种常见的方式是在 html 中通过 <script> 标签引入 jQuery，然后可以使用全局变量 $ 或 jQuery

通常获取一个 id 是 foo 的元素

```javascript
$('#foo');
jQuery('#foo');
```

但在 ts 中，编译器不知道 $ 或 jQuery 是什么

```typescript
$('#foo')
// Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.

jQuery('#foo');
// Cannot find name 'jQuery'.ts(2304)
```

这时候需要使用 declare var 定义它的类型

```typescript
declare var jQuery: (selector: string) => any;
jQuery('#foo');
```

上述中，declare var 并没有真的定义一个变量，只是定义全局变量 jQuery 的类型，仅仅用于编译时的检查，在编译结果中会被删除。编译结果：

```javascript
jQuery('#foo');
```

### 什么是声明文件

通常会将声明语句放在一个单独的文件中（jQuery.d.ts）中，这就是声明文件

```typescript
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

```typescript
// src/index.ts
jQuery('#foo');
```

声明文件必需以 .d.ts 为后缀。

一般来说，ts 会解析项目中所有的 *.ts 文件，当然包含 .d.ts 文件。所以将 jQuery.d.ts 放到项目中，其他的 *.ts 文件都可以获得 jQuery 的类型定义了。

#### 第三方声明文件

可以使用 @types ，直接 npm 安装对应的声明模块，以 jQuery 举例

```shell
npm install @types/jquery --save-dev
```
可以在此处搜索需要的声明文件 https://www.typescriptlang.org/dt/search?search=

### 书写声明文件

不同场景下，声明文件的内容和使用方式会有所区别。库的使用场景主要有以下几种：

* 全局变量：通过 <script> 标签引入第三方库，注入全局变量
* npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
* UMD 库：既可以通过 <script> 标签引入，又可以通过 import 导入
* 直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
* 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
* 模块插件：通过 <script> 或 <import> 导入后，改变另一个模块的结构

#### 全局变量

全局变量是最简单的场景，之前举的例子就是通过 <script> 标签引入 jQuery，注入全局变量 `$` 和 `jQuery`。

使用全局变量的声明文件时，如果是以 `npm install #types/xxx --save-dev` 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，建议和其他源码一起放到 `src` 或者对应的源码目录下。

全局变量的声明文件主要有以下几种语法：

`declare var`

能够用来定义一个全局变量的类型。与其类似的，还有 `declare let` 和 `declare const`。

```typescript
// src/jQuery.d.ts

declare let jQuery: (selector: string) => any;
```

```typescript
// src/index.ts

jQuery('#foo');
// 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
jQuery = function(selector) {
  return document.querySelector(selector);
}
```

当使用 `const` 定义时，此时的全局变量是一个常量，不允许修改值了。

```typescript
// src/jQuery.d.ts
declare const jQuery: (selector: string) => any;

jQuery('#foo');
jQuery = function(selector) {
  return document.querySelector(selector);
}
// Cannot assign to 'jQuery' because it is a constant.ts(2588)
```

需要注意的是，声明语句中只能定义类型，切勿在语句中定义具体的实现：

```typescript
declare const jQuery = function(selector) {
  return document.querySelector(selector);
};
// A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.ts(1254)
```


## 内置对象

### ECMAScript 的内置对象

ECMAScript 标准提供的内置对象有：`Boolean`、`Error`、`Date`、`RegExp` 等。可以在 TS 中将变量定义为这些类型：

```typescript
let b: Boolean = new Boolean(1);
let c: Error = new Error('Error Occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

### DOM 和 BOM 的内置对象

Document、HTMLElement、Event、NodeList 等

```typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
})
```

### TS 核心库的定义文件

在使用常用的方法时，TS 实际上已经做了很多类型判断

```typescript

Math.pow(10, 2)
```

### 用 TS 写 Node.js

Node.js 不是内置对象的一部分，如果用 TS 写 Node.js，需要使用第三方声明文件：

```shell
npm install @types/node --save-dev
```
