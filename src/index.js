import Vue from 'vue/dist/vue.esm.js';
import VueRouter from './vue-fake-router.js'

Vue.use(VueRouter);

const rootComp = {
    template: '<div>这里是根元素</div>'
}

const childComp = {
    template: '<div>这里是子元素</div>'
}

const routes = [
    {
        path: '/',
        component: rootComp
    },
    {
        path: '/child',
        component: childComp
    },
]

const router = new VueRouter({routes})

const vm = new Vue({
    router,
    template: `<div id="app">
        <router-view></router-view>
    </div>`,
    el:'#app'
})