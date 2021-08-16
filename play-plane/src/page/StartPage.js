import { defineComponent, h } from "@vue/runtime-core";
import startPageImg from "../assets/start_page.jpg";
import startBtn from "../assets/startBtn.png";


export default defineComponent({
    setup(props, ctx) {
        // 没有this
        // vue3的入口函数
        const onClick = () => {
            ctx.emit('changePage', 'GamePage')
        }
        return {
            onClick
        }
    },
    render(ctx) {
        return h("Container", [
            h("Sprite", { texture: startPageImg }),
            h("Sprite", {
                texture: startBtn, 
                x: 215, 
                y: 530, 
                interactive: true, // pixi.js点击事件响应需要设置该属性为true
                onClick: ctx.onClick,
            }),
        ])
    }
})