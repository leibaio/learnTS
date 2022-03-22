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

### 字符串字面量类型 

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
