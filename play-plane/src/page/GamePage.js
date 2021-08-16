import { defineComponent, h, reactive, onMounted, onUnmounted } from "@vue/runtime-core";
import Map from "../component/Map";
import Plane from "../component/Plane";
import EnemyPlane from "../component/EnemyPlane";

import {game} from '../Game'

import { hitTestObject } from "../utils/index";

export default defineComponent({
    setup(props, ctx) {
        
        const { planeInfo } = useCreatePlane();

        // 敌方飞机
        const { enemyPlanes } = useCreateEnemyPlanes();

        const handleTick = () => {
            // 主循环
            // 敌方飞机移动
            enemyPlanes.forEach((enemyInfo) => {
                enemyInfo.y++;
            });
            // 碰撞检测
            enemyPlanes.forEach((enemyInfo) => {
                if(hitTestObject(enemyInfo, planeInfo)) {
                    console.log('hit');
                    ctx.emit('changePage', 'EndPage')
                }
            })
        }

        onMounted(() => {
            game.ticker.add(handleTick);
        });


        onUnmounted(() => {
            game.ticker.remove(handleTick);
        });

        

        return {
            planeInfo,
            enemyPlanes
        }
    },
    render(ctx,) {
        // 创建敌方飞机
        const createEnemyPlanes = () => {
            return ctx.enemyPlanes.map((info) => {
                return h(EnemyPlane, {x: info.x, y: info.y})
            })
        }
        return h("Container", [  
            h(Map),
            h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y}),
            ...createEnemyPlanes()
        ])
    }
})

// 抽离逻辑
// 我方飞机
function useCreatePlane() {
    const planeInfo = reactive({x: 150, y: 550, width: 258, height: 364});
    const speed = 15;
    window.addEventListener("keydown", e => {
        switch (e.code) {
            case "ArrowUp":
                planeInfo.y -= speed;
                break;
            case "ArrowLeft":
                planeInfo.x -= speed;
                break;
            case "ArrowRight":
                planeInfo.x += speed;
                break;
            case "ArrowDown":
                planeInfo.y += speed;
                break;        
            default:
                break;
        }
    });

    return {
        planeInfo
    }
}


function useCreateEnemyPlanes() {
    const enemyPlanes = reactive([
        {
            x: 50,
            y: 0,
            width: 308,
            height: 207
        }
    ]);

    return {
        enemyPlanes
    }
}