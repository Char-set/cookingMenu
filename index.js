import Vue from './vue/vue.js';

const vm = new Vue({
    el: '#app',
    data: {
        msg: 'Hello vue',
        testHtml: `<ul><li>哈哈哈，这是v-html</li></ul>`,
        count: 100
    },
    methods:{
        handler() {
            alert('123')
        }
    }
})

console.log(vm);