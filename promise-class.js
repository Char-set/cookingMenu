const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {
    FULFILLED_CALL_LIST = [];
    REJECTED_CALL_LIST = [];
    _status = PENDING;

    constructor(fn) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        this._status = newStatus;
        switch (newStatus) {
            case REJECTED: {
                this.REJECTED_CALL_LIST.forEach(callback => callback(this.reason));
                break;
            }

            case FULFILLED: {
                this.FULFILLED_CALL_LIST.forEach(callback => callback(this.value));
                break;
            }
        }
    }

    resolve(value) {
        if(this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if(this.status === PENDING) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }

    then(onFulfilled, onRejected) {
        const fulFilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
        
        const rejectedFn = this.isFunction(onRejected) ? onRejected : (reason) => { throw reason };

        const fulFilledFnWithCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try {
                    if(!this.isFunction(fulFilledFn)) {
                        resolve(this.value);
                    } else {
                        const x = fulFilledFn(this.value);
                        this.resolvePromise(newPromise, x, resolve, reject);
                    }
                } catch (error) {
                    reject(error);
                }
            })
        }

        const rejectedFnWithCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try {
                    if(!this.isFunction(onRejected)) {
                        reject(this.reason)
                    } else {
                        const x = rejectedFn(this.reason);
                        this.resolvePromise(newPromise, x, resolve, reject);
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }

        switch(this.status) {
            case PENDING: {
                const newPromise = new MPromise((resolve, reject) => {
                    this.FULFILLED_CALL_LIST.push(() => fulFilledFnWithCatch(resolve, reject, newPromise));
                    this.REJECTED_CALL_LIST.push(() => rejectedFnWithCatch(resolve, reject, newPromise));
                });
                return newPromise;
            }

            case REJECTED: {
                const newPromise = new MPromise((resolve, reject) => rejectedFnWithCatch(resolve, reject, newPromise))
                return newPromise;
            }

            case FULFILLED: {
                const newPromise = new MPromise((resolve, reject) => fulFilledFnWithCatch(resolve, reject, newPromise))
                return newPromise;
            }
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    resolvePromise(newPromise, x, resolve, reject) {
        if(newPromise === x) {
            return reject(new TypeError('xxxxxxxx'));
        }

        if(x instanceof MPromise) {
            x.then(
                (y) => {
                    this.resolvePromise(newPromise, y, resolve, reject);
                }, 
                reject
            );
        } else if(typeof x === 'object' || this.isFunction(x)) {
            if(x === null) {
                return resolve(x)
            }

            let then = null;

            try {
                then = x.then;
            } catch (e) {
                return reject(e)
            }

            if(this.isFunction(then)) {
                let called = false;
                try {
                    then.call(
                        x,
                        (y) => {
                            if(called) {
                                return;
                            }
                            called = true;
                            this.resolvePromise(newPromise, y, resolve, reject);
                        },
                        (r) => {
                            if(called) {
                                return;
                            }
                            called = true;
                            reject(r);
                        }
                    )
                } catch (e) {
                    if(called) {
                        return;
                    }
                    reject(e);
                }
            } else {
                resolve(x)
            }
        } else {
            resolve(x);
        }
    }

    isFunction(param) {
        return typeof param === 'function'
    }
}

const test = new MPromise((resolve, reject) => {
    setTimeout(() => {
        reject(1111);
    }, 1000);
});

test
.then((y) => {
    console.log('成功',y)
    console.log(test);
})
.catch(e => {
    console.log('失败', e)
    console.log(test);
})

console.log(test);