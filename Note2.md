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