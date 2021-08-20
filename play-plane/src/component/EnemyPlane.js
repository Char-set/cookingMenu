import { defineComponent, h, reactive, watch, toRefs, onMounted, onUnmounted } from "@vue/runtime-core";
import enemyPlaneImg from "../assets/enemy.png";



export default defineComponent({
    props: ["x", "y"],
    setup(props, {emit}) {
        const { x, y} = toRefs(props);

        let timeFlag;
        onMounted(() => {
            timeFlag = setInterval(() => {
                emit('enemyAttack', {x: x.value + 105, y: y.value + 200})
            }, 2000);
        })

        onUnmounted(() => {
            clearInterval(timeFlag)
        });
        return {
            x,
            y
        }
    },
    render(ctx) {
        return h("Container", {x: ctx.x, y: ctx.y}, [
            h("Sprite", { texture: enemyPlaneImg }),
        ])
    }
})