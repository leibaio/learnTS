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
