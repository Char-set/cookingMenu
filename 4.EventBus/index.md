### 平时有没有用过发布订阅模式？比如vue event bus，node eventemitters3

1. 这种模式，事件的触发和回调之间是异步还是同步的？

```js
const event = new Event();


```

一般是同步的


# 实现一个简单的 `Event bus`

`Event bus` 应该拥有的几个方法

> `on：` 注册事件，一般需要提供两个参数，一个是事件名，一个是回调函数

> `emit：`触发事件，一般需要支持多个参数，第一个是事件名，后面为传递给回调函数的参数

> `off：`注销事件，一般需要提供两个参数，一个是事件名，一个是回调函数

> `once：`注册一个只会执行一次的事件，一般需要提供两个参数，一个是事件名，一个是回调函数

# 一步一步实现

## 创建一个类

使用 `es6` 语法，并定一个存放所有事件的对象

```js
    class EventEmitter {
        constructor() {
            // 存放所有的事件
            this.events = {};
        }
    }
```

## 实现 `on` 方法

`on` 方法应该接受两个参数，`event, cb`；并且同一个事件，可以注册多个回调函数，所以 `this.events[event]` 应该是一个 `Array` 类型

```js
    on(event, cb) {
        // 第一次注册事件，先初始化 this.events[event]
        if(!this.events[event]) {
            this.events[event] = [];
        }
        // 将回调函数放入数组中
        this.events[event].push(cb);
    }
```

## 实现 `emit` 方法

`emit` 方法应该接受多个参数，`event, ...args`；

```js
    emit(event, ...args) {
        const cbs = this.events[event];

        // emit之前，应该先调用on函数注册
        if(!cbs) {
            console.warn(`${event} is not registed`);
            return this;
        }
        
        // 遍历回调函数数组，依次调用
        cbs.forEach(cb => cb.apply(this, args));
        // 返回this 可以 a.emit().emit() 链式调用
        return this;
    }
```

## 实现 `off` 方法

`emit` 方法应该接受两个参数，`event, cb`；如果第二个参数不传，则认为注销该事件的所有回调函数

```js
    off(event, cb) {
        // 如果第二个参数不传，则认为注销该事件的所有回调函数
        if(!cb) {
            this.events[event] = null;
        } else {
            // 过滤掉传进来的 cb
            this.events[event] = this.events[event].filter(item => item !== cb);
        }

        return this;
    }
```

## 实现 `once` 方法

`once` 方法应该接受两个参数，`event, cb`；并且该 cb 回调函数在完成一次触发后，应该被注销

```js
    once(event, cb) {
        // 封装一个方法，利用off函数，注销cb
        const func = (...args) => {
            this.off(event, func);
            cb.apply(this, args);
        }
        // 调用on函数注册
        this.on(event, func);
    }
```

# 完整版代码

```js   
    class EventEmitter {
        constructor() {
            this.events = {};
        }

        on(event, cb) {
            if(!this.events[event]) {
                this.events[event] = [];
            }

            this.events[event].push(cb);
        }

        emit(event, ...args) {
            const cbs = this.events[event];

            if(!cbs) {
                console.warn(`${event} is not registed`);
                return this;
            }

            cbs.forEach(cb => cb.apply(this, args));
            return this;
        }

        once(event, cb) {
            const func = (...args) => {
                this.off(event, func);

                cb.apply(this, args);
            }

            this.on(event, func);
        }

        off(event, cb) {
            if(!cb) {
                this.events[event] = null;
            } else {
                this.events[event] = this.events[event].filter(item => item !== cb);
            }

            return this;
        }
    }
```

# 测试结果

```js
    const ev = new EventEmitter();

    const clickFucCall = (params) => {
        console.log(`click event params is ${params}`);
    }
    ev.on('click', clickFucCall)

    ev.once('clickOnce', (params) => {
        console.log(`clickOnce event params is ${params}`);
    })

    ev.emit('click', '第一次click触发');
    ev.emit('click', '第二次click触发');
    ev.off('click', clickFucCall);
    ev.emit('click', '第三次click触发');

    ev.emit('clickOnce', '第一次clickOnce触发');
    ev.emit('clickOnce', '第二次clickOnce触发');

    // 输出
    // click event params is 第一次click触发
    // click event params is 第二次click触发
    // clickOnce event params is 第一次clickOnce触发
```