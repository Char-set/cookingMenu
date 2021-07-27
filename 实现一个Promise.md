# 一步步实现一个Promise

1. const promise =  new Promise(); 代表Promise应该是一个构造函数或者class

2. 定义三种状态。

3. 初始化状态

4. 实现 resolve 和 reject 方法

    4.1 这两个方法要更改status，从 pending 变成 fulfilled / rejected

    4.2 入参分别是 value / reason

5. 对于实例化promise时的入参处理

    5.1 入参是一个函数，接受resolve reject两个参数

    5.2 初始化promise的时候，就要执行这个函数，并且有任何的报错都要通过reject抛出去

6. then 方法

    6.1 then 接受两个参数， onFulfilled 和 onRejected

    6.2 检查并处理参数，如果参数不是函数，就忽略

    6.3 根据当前promise的状态，调用不同的函数

    6.4 首先要拿到所有的回调. 新建两个数组，分别存储成功和失败的回调，调用then的时候，如果还是pending就存入数组.

    6.5 在status发生变化的时候，执行回调。用到getter setter，监听status的变化，在发生变化的时候来做对应的操作.

7. then的返回值

    7.1 如果onFulfilled 或者 onRejected 抛出一个异常e，那么新的promise必须reject e;

    7.2 返回值应该是一个新的promise

    7.3 如果 onFulfilled 不是函数，且promise1成功执行，promise2必须返回同样的状态和value

    7.4 如果 onRejected 不是函数，且promise1拒绝执行，promise2必须返回同样的状态和value

    7.5 如果 onFulfilled 或者 onRejected 返回一个值 x，运行resolvePromise方法.

8. resolvePromise

9. onFulfilled onRejected 应该在微任务里执行