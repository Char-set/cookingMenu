import { defineComponent, h, reactive, watch, toRefs, ref } from "@vue/runtime-core";
import bulletImg from "../assets/bullet.png";
import enemyBulletImg from "../assets/enemyBullet.png";



export default defineComponent({
    props: ["x", "y", "dir"],
    setup(props, ctx) {
        const x = ref(props.x);
        const y = ref(props.y);
    
        watch(props, (newProps) => {
          x.value = newProps.x;
          y.value = newProps.y;
        });
        return {
            x,
            y,
            dir: props.dir
        }
    },
    render(ctx) {
        return h("Container", {x: ctx.x, y: ctx.y}, [
            h("Sprite", { texture: ctx.dir === 1 ? enemyBulletImg : bulletImg }),
        ])
    }
})