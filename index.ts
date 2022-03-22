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

type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do sth
}

handleEvent(document.getElementById('hello'), 'scroll'); // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错
// Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.