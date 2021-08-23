

// 实现一个控制并发的函数，接收并发量参数

const {urls, loadImg} = require('./mock.js')


class PromiseQueue {
    constructor(options = {}) {
        this.concurrency = options.concurrency || 1;
        this.currentCount = 0;
        this.pendingList = [];
    }

    add(task) {
        this.pendingList.push(task);
        this.run();
    }

    run() {
        if(this.pendingList.length === 0 || this.concurrency === this.currentCount) {
            return;
        }

        this.currentCount++;
        // const fn = this.pendingList.shift();
        const { fn } = this.pendingList.sort((a, b) => b.priority - a.priority).shift();

        const promise = fn();

        promise.then(this.completeOne.bind(this)).catch(this.completeOne.bind(this));
    }

    completeOne() {
        this.currentCount--;
        this.run();
    }


}

const queue = new PromiseQueue({
    concurrency: 3
});

const formatTask = url => {
    return {
        fn: () => loadImg(url),
        priority: url.priority
    }
}


urls.forEach(url => {
    queue.add(formatTask(url));
});

const highPriorityTask = {
    info: '高优先级任务！！！',
    time: 1000,
    priority: 10
}

queue.add(formatTask(highPriorityTask))