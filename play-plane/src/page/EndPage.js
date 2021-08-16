import { defineComponent, h } from "@vue/runtime-core";
import endPageImg from "../assets/end_page.jpg";
import restartBtnImg from "../assets/restartBtn.png";


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
            h("Sprite", { texture: endPageImg }),
            h("Sprite", {
                texture: restartBtnImg, 
                x: 215, 
                y: 530, 
                interactive: true, // pixi.js点击事件响应需要设置该属性为true
                onClick: ctx.onClick,
            }),
        ])
    }
})