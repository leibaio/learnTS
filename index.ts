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
