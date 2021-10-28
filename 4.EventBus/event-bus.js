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