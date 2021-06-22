## react fiber

1. 对于react原理的了解
2. 对于新技术的敏感程度，求知欲

为了使react渲染的过程中可以被中断, 可以将控制权交还给浏览器, 可以让位给高优先级的任务, 浏览器空闲后再恢复渲染.

对于计算量比较大的js计算或者dom计算, 就不会显得特别卡顿. 而是一阵一阵的有规律的执行任务

```js
const tasks = []; // 10个task

function run() {
    let task;
    while(task = tasks.shift()) {
        execute(task); // 10s
    }
}
```

generator.

```js
const tasks = []; // 10个task

function * run() {
    let task;
    while(task = tasks.shift()) {
        if (hasHighPriorityTask()) {
            yield;
        }
        execute(task); // 10s
    }
}

const iterator = run();
iterator.next();
```

1.  generator 有类似的功能，为什么不直接使用？

* 要使用 generator, 需要将涉及到的所有代码都包装成generator * 的形式，非常麻烦，工作量很大
* generator 内部是有状态的

```js
function doWork(a, b, c) {
    const x = doExpendsiveWorkA(a);
    yield;
    const y = doExpendsiveWorkB(b);
    yield;
    const z = doExpendsiveWorkC(c);
    return x + y + z;
}
```

我们这时已经执行完了doExpendsiveWorkA 和 doExpendsiveWorkB, 还未执行doExpendsiveWorkC.

如果此时b被更新了, 那么再新的时间分片里, 我们只能沿用之前的x, y 的结果。

2. 如何判断当前是否有高优任务呢？

当前js的环境其实并没有办法判断是否有高优任务。

只能约定一个合理的执行时间，当超过了这个执行时间，如果任务仍然没有执行完成，终端当前任务，将控制权交还给浏览器

每秒60帧， 1000ms/60f = 16ms.

requestIdleCallback.

使浏览器在**有空的时候**执行我们的回调，这个回调会传入一个参数，表示浏览器有多少时间供我们执行任务。

* 浏览器在一帧内要做什么事情

处理用户输入事件
Js的执行
requestAnimation 调用
布局 layout
绘制 paint

16ms - 16ms

0ms -> requestIdleCallback

* 浏览器很忙怎么办？

requestIdleCallBack timeout参数，100ms，如果超过这个timeout后，回调还没有被执行，那么会在下一帧强制执行回调

16ms
16ms
16ms
16ms
16ms
...
16ms > 100ms
强制执行回调.

* 兼容性？

requestIdleCallBack兼容性很差，通过messageChannel 模拟实现了 requestIdleCallback 的功能。

* timeout超时后就一定要被执行吗？

task console.log(); requestIdleCallback，timeout 100ms

不是的，react 里预定了5个优先级的等级。

* Immediate 最高优先级，这个优先级的任务应该被马上执行不能中断
* UserBlocking 这些任务一般是用户交互的结果，需要及时得到反馈
* Normal 不需要用户立即就感受到的变化，比如网络请求
* Low 这些任务可以延后，但是最终也需要执行
* Idle 可以被无限期延后

## 平时用过高阶组件吗？ 什么是高阶组件？高阶组件能用来干什么？

简称HOC，Hige Order Components.

1. 是一个函数
2. 入参：原来的react组件
3. 返回值：新的react组件
4. 是一个纯函数，不应该有任何的副作用.

```js
function helloWorld() {
    const myName = sessionStorage.getItem('xcharset');
    console.log(`hello beautiful world, my name is ${myName}`);
}

function byeWorld() {
    const myName = sessionStorage.getItem('xcharset');
    console.log(`bye ugly world, my name is ${myName}`);
}
```

```js
function helloWorld(myName) {
    console.log(`hello beautiful world, my name is ${myName}`);
}

function byeWorld(myName) {
    console.log(`bye ugly world, my name is ${myName}`);
}

function wrapWithUsername(wrappedFunc) {
    const tempFunction = () => {
        const myName = sessionStorage.getItem('xcharset');
        wrappedFunc(myName)
    }
    return tempFunction;
}

const wrappedHello = wrapWithUsername(helloWorld);
const wrappedBye = wrapWithUsername(byeWorld);

wrappedHello();
wrappedBye();
```

### 怎么写一个高阶组件？

1. 普通方式

2. 装饰器

3. 多个高阶组件的组合

例子： react-app/src/hoc/index.tsx

### 高阶组件能用来做什么？技术层面上

1. 属性代理

    1.1 操作props
    1.2 操作组件实例  -> react-app/src/hoc/refHoc.tsx

2. 继承/劫持

    公共组件，不方便修改原有逻辑，但想要加上自己的逻辑，可以用劫持

## 什么是react hooks？ React hooks 有什么优势？

可以不写class组件的情况下，使用state 和 其他react特性

useState
useEffect
userMemo

为什么不写class 而转向了hooks的写法？

### react hooks 有什么优势？

class 的缺点

1. 组件间的状态逻辑很难复用

组件件如果有state的逻辑是相似的，class 模式下基本上是用高阶组件来解决的。
虽然能够解决问题，但是我们需要在组件外部再包一层元素。会导致层级非常冗余

2. 复杂业务的有状态组件会越来越复杂

3. 监听和定时器的操作，被分散在多个区域

didMount
document.addEventListener('xxx');
const timer = setInterval();
this.setState({timer});

willUnmount
document.removeEventListener('xxx');
if(this.state.timer) {
    clearInterval(this.state.timer);
}

4. this指向问题

```js
class App estends React.Component<any, any> {
    constructor(props) {
        super(pros);
        this.state = {
            num: 1,
            title: 'xcharset'
        }

        this.handleClick2 = this.handleClick1.bind(this);
    }

    handleClick1() {
        this.setState({
            num: this.state.num + 1
        })
    }

    handleClick3 = () => {
        this.setState({
            num: this.state.num + 1
        })
    }

    render() {
        return (
            <div>
                {/* render 里bind每次都会返回一个新函数，造成ChildComponent每次都会重新渲染 */}
                <ChildComponent onClick={this.handleClick1.bind(this)}></ChildComponent>

                <ChildComponent onClick={this.handleClick2}></ChildComponent>

                {/* render 里bind每次都会返回一个新函数，造成ChildComponent每次都会重新渲染 */}
                <ChildComponent onClick={() => this.handleClick1()}></ChildComponent>

                <ChildComponent onClick={this.handleClick3}></ChildComponent>
            </div>
        )
    }
}
```

### hooks优点

1. 利于业务逻辑的封装和拆分，可以非常自由的组合各种自定义hooks.(自己封装的用到了react hooks的公共逻辑)

2. 可以在无需修改组件结构的情况下，复用状态逻辑

3. 定时器 监听等等都被聚合到同一块代码下

### react hooks的使用注意事项

1. 只能在函数内部的最外层调用hook，不要在循环、条件判断或者自函数中调用。
2. 只能在React的函数组件中调用hook，不要在其他的js函数里调用


1. 为什么，hooks不能在循环、条件判断中调用？
2. 为什么useEffect的第二个参数是空数组，就相当于componentDidMount只执行一次？
3. 自定义的hook怎么样操作组件的？

### 手写代码实现useState

```js
const [count, setCount] = useState(0);
```

例子 -> react-app/src/hook-components/Mock-UseState-Counter.tsx

总结：state的存储是按顺序的，如果hooks在循环、条件判断中使用，会导致取值偏移


### 手写代码实现useEffect

```js
useEffect(() => {
    console.log(`count 发生了改变！！ ${count}`)
}, [count]);
```

例子 -> react-app/src/hook-components/Mock-UseEffect-Counter.tsx

