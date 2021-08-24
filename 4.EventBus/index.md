### 平时有没有用过发布订阅模式？比如vue event bus，node eventemitters3

1. 这种模式，事件的触发和回调之间是异步还是同步的？

```js
const event = new Event();


```

一般是同步的