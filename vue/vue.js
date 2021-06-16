import Observer from './observer.js';
import Compiler from './compiler.js';

/**
 * vue 构造函数，接受配置参数
 */
export default class Vue {
    constructor(options = {}) {
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;

        this.initRootElement(options);

        // 把data挂在到vue实例上
        this._proxyData(this.$data)

        // 实例化observer对象，监听数据变化
        new Observer(this.$data);

        // 实例化compiler对象，解析指令和模板表达式
        new Compiler(this);
    }

    /**
     * 
     * @param {*} options 
     * 获取根元素，并存储到vue示例
     */
    initRootElement(options) {
        if(typeof options.el === 'string') {
            this.$el = document.querySelector(options.el)
        } else if( options.el instanceof HTMLElement) {
            this.$el = options.el;
        }

        if(!this.$el) {
            throw new Error('传入的el不合法，请传入css selector 或者 HTMLElement')
        }
    }

    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if(data[key] === newValue) {
                        return;
                    }

                    data[key] = newValue;
                }
            })
        })
    }
}