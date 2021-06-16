import Dep from './dep.js';

export default class Watcher {
    /**
     * 
     * @param {*} vm vue实例
     * @param {*} key data中的属性名
     * @param {*} cb 负责更新视图的毁掉函数
     */
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        Dep.target = this;

        // 触发get方法，在get方法里做一些操作？
        this.oldValue = vm[key];

        Dep.target = null;
    }
    
    /** 当数据变化的时候，更新视图 */
    update() {
        let newValue = this.vm[this.key];

        if(newValue === this.oldValue) {
            return;
        }
        this.cb(newValue);
    }
}

// watcher初始化获取oldValue的时候，回去做一些操作？
// 通过vm[key]获取oldValue前，为什么要把当前的实例挂在Dep上, 获取之后为啥要置为null
// update方法在什么时候执行？