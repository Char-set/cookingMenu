console.log('~~~')

class History {
    listen(callback) {
        window.addEventListener('hashchange', function() {
            // console.log('hash-change!', this.window.location.hash);
            callback && callback(window.location.hash)
        });
    }
}
export default class VueRouter {
    constructor({routes}) {
        this.routes = routes;
        this.path = window.location.hash;
        this.history = new History();
        this.history.listen((path) => {
            this.path = path;
            console.log('变化的path', path);
            this.vm.$forceUpdate();
        });
    }

    init(vm) {
        this.vm = vm;
    }
}

VueRouter.install = function(Vue, options) {
    //TODO
    Vue.mixin({
        beforeCreate() {
            this.$options.router && this.$options.router.init(this);
        }
    })
    // router-view
    Vue.component('router-view', {
        functional: true,
        render(createElement, {props, children, parent, data}) {
            const router = parent.$options.router;
            const path = router.path;
            const matchRoute = router.routes.find(route => {
                return route.path.replace(/^\//, '') === path.replace(/^#\//, '')
            })
            console.log('hash变化了，需要重新找组件渲染',path, matchRoute);
            const matchedComponent = matchRoute.component;
            let comp = {
                template: `<div>router-view 组件${Date.now()}</div>`
            }
            return createElement(
                matchedComponent
            )
        }
    })
}