## 类型别名

用于给一个类型起一个新名字

### 简单的例子

```typescript
type Name = string;
type NameResolve = () => string;
type NameOrResolve = Name | NameResolve;
function getName(n: NameOrResolve): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```

使用 type 创建类型别名。常用于联合类型。

## 字符串字面量类型 

字符串字面量类型是用来约束取值只能是某几个字符串中的一个

#### 例子

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do sth
}

handleEvent(document.getElementById('hello'), 'scroll'); // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错
// Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.
```

上述中，使用 type 定义了一个字符串字面量类型 EventNames，只能取定义的三个字符串中的一个。



## 元组

数组合并了相同类型的对象，元组（Tuple）合并了不同类型的对象。

### 例子

定义一对值分别为 string 和 number 的元组：

```typescript
let tom: [string, number] = ['Tom', 25];
```

赋值或访问一个已知索引的元素，会得到正确的类型：

```typescript
let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;

tom[0].slice(1);
tom[1].toFixed(2); // 使用定点的方式格式化一个数值
```

也可以赋值其中一项：

```typescript
let tom: [string, number];
tom[0] = 'Tom';
```

但直接对元组类型的变量进行初始化或赋值时候，需要提供所有元组类型中指定的项。

```typescript
let tom: [string, number];
tom = ['Tom'];
// Type '[string]' is not assignable to type '[string, number]'.
  // Source has 1 element(s) but target requires 2.
```

```typescript
  let tom: [string, number];
  tom = ['Tom', 25];
```

### 越界的元素

当添加越界的元素时，类型会被限制为元组中的每个类型的联合类型：

```typescript
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);
// Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
```


## 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

### 举例

枚举使用 enum 关键字来定义：

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days['Sun'] === 0 ); // true
console.log(Days['Mon'] === 1 ); // true
console.log(Days['Tue'] === 2 ); // true
console.log(Days['Sat'] === 6 ); // true

console.log(Days[0] === 'Sun'); // true
console.log(Days[1] === 'Mon'); // true
console.log(Days[2] === 'Tue'); // true
console.log(Days[6] === 'Sat'); // true
```

上面的例子会被编译为：

```typescript
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```

### 手动赋值

也可给给枚举项手动赋值：

```typescript
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days['Sun'] === 7);
console.log(Days['Mon'] === 1);
console.log(Days['Tue'] === 2);
console.log(Days['Sat'] === 6);
```

上述例子中，未手动赋值的枚举项会接着上一个枚举项递增。如果未手动赋值的枚举项与手动赋值的重复了，TS 是不会察觉到这一点的。

```typescript
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days['Sun'] === 3); // true
console.log(Days['Mon'] === 1); // true
console.log(Days[3] === 'Sun'); // false
console.log(Days[3] === 'Wed'); // true
```

递增到 3 的时候与前面的 `Sun` 的取值重复了，但是 TS 并没有报错，导致 `Day[3]` 的值显示 ``Sun``，而后又被 ``Wed`` 覆盖了。编译的结果是：

```typescript
var Days;
(function (Days) {
    Days[Days["Sun"] = 3] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```

所以使用时最好不要出现这种覆盖的情况。

手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查（编译出的 js 仍然可用）：

```typescript
enum Days {Sun = 7, Mon, Tus, Wed, Thu, Fri, Sat = <any>"S"};
```

```javascript
var Days;
(function (Days) {
    Days[Days["Sun"] = 7] = "Sun";
    Days[Days["Mon"] = 8] = "Mon";
    Days[Days["Tus"] = 9] = "Tus";
    Days[Days["Wed"] = 10] = "Wed";
    Days[Days["Thu"] = 11] = "Thu";
    Days[Days["Fri"] = 12] = "Fri";
    Days[Days["Sat"] = "S"] = "Sat";
})(Days || (Days = {}));
```

手动赋值的枚举项也可以为负数或者小数，此时后续未手动赋值的项递增步长仍为 `1`： 

```typescript
enum Days {Suns = 7, Mon = 1.5, Tus, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
console.log(Days["Tue"] === 2.5); // true
console.log(Days["Sat"] === 6.5); // true
```

### 常数项和计算所得项

枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。前面举的例子都是常数项，一个典型的计算所得项的例子：

```typescript
enum Color {Red, Green, Blue = 'blue'.length};
```

上面例子中，'blue'.length 就是一个计算所得项。上例不会报错，但如果紧接着计算所得项后面的未手动赋值的项，会因为无法获得初试值而报错：

```typescript
enum Color {Red = 'red'.length, Green, Blue};
// Enum member must have initializer.ts(1061)
```

### 常数枚举

常数枚举是使用 `const enum` 定义的枚举类型：

```typescript
const enum Directions {Up, Down, Left, Right};

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能不包含计算成员。上面的编译结果是：

```javascript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

假如包含计算成员，会在编译阶段报错：

```typescript
const enum Color {Red, Green, Blue = 'blue'.length};
// const enum member initializers can only contain literal values and other computed enum values.ts(2474)
```

### 外部枚举

外部枚举（Ambient Enums）是使用 `declare enum` 定义的枚举类型：

```typescript
declare enum Directions {Up, Down, Left, Right};

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

`declare` 定义的类型只会用于编译时的检查，编译结果会被删除，上面的编译结果是：

```javascript
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

同时使用 `declare` 和 `const` 也是可以的：

```typescript
declare const enum Directions {Up, Down, Left, Right};

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

编译结果：

```typescript
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

## 类

传统方法中，JS 通过构造函数实现类的概念，通过原型链实现继承。在 ES6 中，迎来了 `class`。

###  类的概念

* 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
* 对象（Object）：类的实例，通过 `new` 生成
* 面向对象（OOP）的三大特性：封装、继承、多态
* 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不知道细节，就能通过对外提供的接口访问该对象，同时也保证了外界无法任意更改对象内部的数据。
* 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有属性外，还有一些更具体的特性。
* 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog`，可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
* 存取器（getter & setter）：用以改变属性的读取和赋值行为
* 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
* 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
* 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

### ES6 中类的用法

#### 属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。通过 `new` 生成新实例的时候，会自动调用构造函数。

```javascript
class Animal {
  public name;
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Animal('Jack');
console.log(a.sayHi());
```

#### 类的继承

使用 `extends` 等关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```javascript
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor（name）
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom');
console.log(c.sayHi());
```

#### 存取器

使用 getter 和 setter 可以改变属性的赋值和读取行为：

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

#### 静态方法

使用 `static` 修饰符修饰的方法称为静态方法，不需要实例化，直接通过类来调用：

```javascript
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

### TypeScript 中类的用法

#### public private 和 protected

TS 中可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`

* `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
* `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
* `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

举例：

```typescript
class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom'; 
console.log(a.name); // Tom
```

上面的例子中，`name` 被设置为 `public`，因此直接访问实例的 `name` 属性是允许的。很多时候希望属性无法直接存取，可以使用 `private`：

```typescript
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); 
a.name = 'Tom'; 
// Property 'name' is private and only accessible within class 'Animal'.ts(2341)
```

上面的例子编译后的代码：

```javascript
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';
```

需要注意，TS 编译之后的代码，并没有限制 `private` 属性在外部的可访问性。

使用 `private` 修饰的属性或方法，在子类也是不允许访问的：

```typescript
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

class Cate extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}
// Property 'name' is private and only accessible within class 'Animal'.ts(2341)
```

而如果使用 `protected` 修饰，则允许在子类中访问：

```typescript
class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}

class Cate extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}
```

构造函数修饰为 `private` 时，不允许被继承或者实例化：

```typescript
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}

class Cate extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}
// Cannot extend a class 'Animal'. Class constructor is marked as private.ts(2675)
```

构造函数修饰为 `protected` 时，只允许被继承：

```typescript
class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}

class Cate extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}

let a = new Animal('jack');
// Constructor of class 'Animal' is protected and only accessible within the class declaration.ts(2674)
```


#### 参数属性

修饰符和 `readonly` 还可以使用在构造函数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。

```typescript
class Animal {
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}
```

#### readonly

只读属性关键字，只允许出现在属性什么或者索引签名或构造函数中。

```typescript
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';
// Cannot assign to 'name' because it is a read-only property.ts(2540)
```

如果 `readonly` 和其他访问修饰符同时存在的化，需要写在其后面。

```typescript
class Animal {
  // public readonly name: string;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```

#### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。什么是抽象类？

首先，抽象类是不允许被实例化的：

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

let a = new Animal('Jack');
// Cannot create an instance of an abstract class.ts(2511)
```

上面例子中，定义了一个抽象类 `Animal`，并且定义了一个抽象方法 `sayHi`。实例化抽象类时候报错。

其次，抽象类中的抽象方法必须被子类实现：

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating.`)
  }
}

let cat = new Cat('tom');
// on-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.ts(2515)
```

上例中，定义一个类 `Cat` 继承了抽象类 `Animal`，但是没有实现抽象方法 `sayHi`，所以编译报错。

正确使用抽象类的例子；

```typescript
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Mewo, My name is ${this.name}`)
  }
}

let cat = new Cat('tom');
```

上面的例子中，实现了抽象方法 `sayHi`，编译通过。即使是抽象方法，TS 的编译结果中，仍然会存在这个类，编译结果是：

```javascript
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.sayHi = function () {
        console.log("Mewo, My name is ".concat(this.name));
    };
    return Cat;
}(Animal));
var cat = new Cat('tom');
```

#### 类的类型

给类加上 TS 的类型很简单，与接口类似：

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi());
```

## 类与接口

接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。本章主要介绍接口的另一个用途，对类的一部分行为进行抽象。

### 类实现接口

实现（Implements）是面向对象中的一个重要概念。一般来讲，一个类智能继承自另一个类，有时候不同类之间可以有一些共有的特性提取成接口（interfaces），用 `implements` 关键字实现。这个特性大大提高了面向对象的灵活性。

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器功能，可以给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警功能，就可以考虑把报警器提取出来，作为一个接口：

```typescript
interface Alarm {
  alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert');
  }
}

class Car implements Alarm {
  alert() {
    console.log('Car alert');
  }
}
```

一个类可以实现多个接口：

```typescript
interface Alarm {
  alert(): void;
}

interface Light {
  lightOn(): void;
  lightOff(): void;
}

class Car implements Alarm, Light {
  alert() {
    console.log(`Car alert`);
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}
```

### 接口继承接口

接口与接口之间可以是继承关系：

```typescript
interface Alarm {
  alert(): void;
}

interface LightableAlarm extends Alarm {
  lightOn(): void;
  lightOff(): void;
}
```

`LightableAlarm` 继承了 `Alarm`，除了拥有 `alert` 方法之外，还拥有两个新方法 `lightOn` 和 `lightOff`

### 接口继承类

常见的面向对象语言中，接口是不能继承类的，但是在 TS 中可以：

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### 简单例子

首先，实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```typescript
function createArray(length: number, value: any): Array<any> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x');
```

上述中，使用了数组泛型来定义返回值的类型。

这段代码编译不会报错，但是一个显而易见的缺陷是，并没有准确的定义返回值的类型：`Array<any>` 允许数组的每一项都为任意类型。但我们的预期是，数组的每一项都应该是输入的 `value` 的类型。这时候，泛型就派上用场：

```typescript
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, 'x');
```
上例中，函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可以使用。

接着在调用时候，可以指定它的具体类型为 `string`。当然，也可以不手动指定，让类型推论自动推算出来：

```typescript
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x');
```

### 多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, 'seven']);
```

上述定义了一个 `swap` 函数，用来交换输入的元组。

### 泛型约束

函数内部使用泛型变量的时候，由于事先不知道类型，所以不能随意操作其属性或方法：

```typescript
function loggingIdentity<T>(arg: T):T {
  console.log(arg.length);
  return arg;
}
// Property 'length' does not exist on type 'T'.ts(2339)
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译报错。可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

上例中，使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。此时如果调用 `loggingIdentify`，传入 `arg` 不包含 `length`，那么编译阶段就会报错：

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity(1);

// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.ts(2345)
```

多个类型参数之间也可以互相约束：

```typescript
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
```

上例中，使用两个类型参数，要求 `T` 继承 `U`，就保证了 `U` 上不会出现 `T` 中不存在的字段。

### 泛型接口

可以使用接口的方式定义一个函数需要符合的形状：

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```

也可以使用含有泛型的接口定义函数的形状：

```typescript
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x');
```

进一步，可以把泛型参数提前到接口名上：

```typescript
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x');
```

此时在使用泛型接口时，需要定义泛型的类型。

### 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中：

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; }
```

### 泛型参数的默认类型

在 TS 2.3 以后，可以为泛型中类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，默认类型就会起作用。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
```

## 声明合并

如果定义了两个相同名字的函数的函数、接口或类，那么会合并成一个类型。

### 函数的合并

之前学习过，可以使用重载定义多个函数类型：

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```

### 接口的合并

接口中的属性在合并时会简单的合并到一个接口中：

```typescript
interface Alarm {
  price: number;
}

interface Alarm {
  weight: number;
}
```

相当于：

```typescript
interface Alarm {
  price: number;
  weight: number;
}
```

注意，合并的属性的类型必须是唯一的：

```typescript
interface Alarm {
  price: number;
}

interface Alarm {
  price: number; // 虽然重复，但是类型都是 `number`，所以不会报错
  weight: number;
}
```

```typescript
interface Alarm {
  price: number;
}

interface Alarm {
  price: string; // 类型不一致，报错
  weight: number;
}
// Subsequent property declarations must have the same type.  Property 'price' must be of type 'number', but here has type 'string'.
```

接口中的方法的合并，与函数的合并一样：

```typescript
interface Alarm {
  price: number;
  alert(s: string): string;
}
interface Alarm {
  weight: number;
  alert(s: string, n: number): string;
}
```

相当于

```typescript
interface Alarm {
  price: number;
  weight: number;
  alert(s: string): string;
  alert(s: string, n: number): string;  
}
```

### 类的合并

类的合并与接口的合并规则一致