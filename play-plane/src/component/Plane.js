import { defineComponent, h, reactive, watch, toRefs } from "@vue/runtime-core";
import planeImg from "../assets/plane.png";



export default defineComponent({
    props: ["x", "y"],
    setup(props, { emit }) {
        console.log(props);

        // 响应式丢失
        // return {
        //     x: props.x,
        //     y: props.y
        // }

        // 方案一
        // 自己复制一个响应式对象
        // watch(props,(val) => {
        //     console.log(val);
        //     point.x = val.x;
        //     point.y = val.y;
        // })
        // const point = reactive({x: props.x, y: props.y});
        // return {
        //     point
        // }
       
        // 方案二
        // toRefs

        const { x, y } = toRefs(props);
        window.addEventListener('keydown', e => {
            if(e.code == 'Space') {
                emit('attack', {x: x.value + 100, y: y.value})
            }
        })
        return {
            x,
            y
        }
    },
    render(ctx) {
        return h("Container", {x: ctx.x, y: ctx.y}, [
            h("Sprite", { texture: planeImg }),
        ])
    }
})