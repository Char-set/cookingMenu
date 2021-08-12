// 跟组件

import { defineComponent, h} from '@vue/runtime-core'

import Circle from './component/Circle';

export default defineComponent({
    render() {
        // 创建vnode
        // <rect x=100 y=100>测试element text</rect>
        // const vnode = h('rect', {x: 100, y: 100}, "测试element text");
        const vnode = h('rect', {x: 100, y: 100}, [
            "测试element text",
            // h('circle',{x: 150, y: 150})
            h(Circle),
        ]);

        console.log(vnode);

        return vnode;
    }
})