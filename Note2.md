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