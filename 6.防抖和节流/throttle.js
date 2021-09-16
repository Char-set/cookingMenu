// 时间戳的实现，首节流，第一次立即执行 但是停止触发后，没办法再次执行
// function throttle(fn, interval) {
//     let last = 0;
//     return function() {
//         const now = Date.now();

//         if(now - last >= interval) {
//             last = now;
//             fn.apply(this, arguments);
//         }
//     }
// }

// 定时器实现，尾节流，不会立即执行函数，而是在delay之后执行，还会执行最后一次
// function throttle(fn, delay) {
//     let timer = null;
//     return function() {
//         const context = this;
//         const args = arguments;

//         if(!timer) {
//             timer = setTimeout(() => {
//                 fn.apply(context, args);
//                 timer = null;
//             }, delay);
//         }
//     }
// }


function throttls(fn, delay) {
    let timer = null;
    let startTime = 0;
    return function() {
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);

        clearInterval(timer);

        if(remaining < 0) {
            fn.apply(this, arguments);
            startTime = Date.now();
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                startTime = Date.now();
            }, remaining);
        }
    }
}

function handle() {
    console.log(new Date())
}

const throttleHandle = throttle(handle, 1000)


for (let i = 0; i < 100000000000; i++) {
    throttleHandle()
}