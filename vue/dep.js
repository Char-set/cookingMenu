/**
 * 发布订阅的模式
 * 存储所有观察者，watcher
 * 每隔watcher都有一个update方法
 * 通知subs里的每隔watcher实例，触发update方法
 */
export default class Dep {
    constructor() {
        // 存储观察者
        this.subs = [];
    }
    /** 添加观察者 */
    addSub(watcher) {
        if(watcher && watcher.update) {
            this.subs.push(watcher);
        }
    }

    /** 发送通知 */
    notify() {
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }
}

// Dep 在哪里实例化？ 在哪里addSub?
// Dep notify在哪里调用？