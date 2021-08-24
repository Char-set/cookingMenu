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

ev.on('add', (params) => {
    console.log(`add ${params}`)
});

ev.once('add1', (params) => {
    console.log(`add ${params}`)
});

ev.emit('add', 123);
ev.emit('add', 345);

ev.emit('add1', 123);
ev.emit('add1', 345);