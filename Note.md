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

