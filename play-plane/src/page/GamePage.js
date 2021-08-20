import { defineComponent, h, reactive, onMounted, onUnmounted } from "@vue/runtime-core";
import Map from "../component/Map";
import Plane from "../component/Plane";
import EnemyPlane from "../component/EnemyPlane";
import Bullet from "../component/Bullet";

import {game} from '../Game'

import { hitTestObject } from "../utils/index";

import { stage } from "../config";

let hashCode = 0;
const createHashCode = () => {
  return hashCode++;
};

export default defineComponent({
    setup(props, ctx) {
        
        // 我方飞机
        const { planeInfo } = useCreatePlane();

        // 我方子弹
        const { bullets, addBullet } = useCreateBullet();

        // 我方飞机发射子弹
        const onAttack = bulletInfo => {
            addBullet(bulletInfo)
        }

        // 敌方飞机
        const { enemyPlanes } = useCreateEnemyPlanes();

        // 敌方子弹
        const { enemyBullets, onEnemyAttack } = useCreateEnemyBullets();

        useFighting(enemyPlanes, bullets, enemyBullets, planeInfo, ctx);

        return {
            planeInfo,
            enemyPlanes,
            bullets,
            onAttack,
            enemyBullets,
            onEnemyAttack
        }
    },
    render(ctx,) {
        // 创建敌方飞机
        const createEnemyPlanes = () => {
            return ctx.enemyPlanes.map((info) => {
                return h(EnemyPlane, {x: info.x, y: info.y, onEnemyAttack: ctx.onEnemyAttack})
            })
        }
        
        const createBullets = (info, index) => {
            return h(Bullet, {x: info.x, y: info.y, dir: info.dir, key: 'Bullet' + info.id})
        }

        return h("Container", [  
            h(Map),
            h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y, onAttack: ctx.onAttack}),
            ...createEnemyPlanes(),
            ...ctx.bullets.map(createBullets),
            ...ctx.enemyBullets.map(createBullets),
        ])
    }
})
function useCreateEnemyBullets() {
    const enemyBullets = reactive([]);

    // 敌方飞机发射子弹
    const onEnemyAttack = bulletInfo => {
        enemyBullets.push({
            ...bulletInfo,
            width: 61, height: 99,
            dir: 1,
            id: createHashCode()
        });
    };
    return { enemyBullets, onEnemyAttack };
}

// 抽离逻辑

// 战斗逻辑
function useFighting(enemyPlanes, bullets, enemyBullets, planeInfo, ctx) {
    const handleTick = () => {
        // 主循环
        // 敌方飞机移动
        enemyPlanes.forEach((enemyInfo) => {
            enemyInfo.y++;
        });

        // 我方子弹移动
        bullets.forEach((bulletInfo) => {
            bulletInfo.y--;
        });

        // 敌方子弹移动
        enemyBullets.forEach((bulletInfo) => {
            bulletInfo.y += 2;
        });


        // 碰撞检测
        enemyPlanes.forEach((enemyInfo) => {
            if (hitTestObject(enemyInfo, planeInfo)) {
                console.log('hit');
                ctx.emit('changePage', 'EndPage');
            }
        });

        // 我方子弹和敌方飞机碰撞检测
        bullets.forEach((bulletInfo, bulletIdx) => {
            enemyPlanes.forEach((enemyInfo, enemyIdx) => {
                if (hitTestObject(bulletInfo, enemyInfo)) {
                    bullets.splice(bulletIdx, 1);
                    enemyPlanes.splice(enemyIdx, 1);
                }
            });
        });

        // 敌方子弹和我方飞机碰撞检测
        enemyBullets.forEach((bulletInfo, bulletIdx) => {
            if(hitTestObject(bulletInfo, planeInfo)) {
                console.log('hit');
                ctx.emit('changePage', 'EndPage');
            }
        });

        // 我方子弹和敌方子弹碰撞检测
        bullets.forEach((bulletInfo, bulletIdx) => {
            enemyBullets.forEach((enemyBulletInfo, enemyIdx) => {
                if (hitTestObject(bulletInfo, enemyBulletInfo)) {
                    bullets.splice(bulletIdx, 1);
                    enemyBullets.splice(enemyIdx, 1);
                }
            });
        });

    };

    onMounted(() => {
        game.ticker.add(handleTick);

    });


    onUnmounted(() => {
        game.ticker.remove(handleTick);
    });
}

// 我方子弹
function useCreateBullet() {
    const bullets =  reactive([]);

    const addBullet = (bulletInfo) => {
        bullets.push({
            ...bulletInfo,
            width: 61,
            height: 99,
            dir: -1,
            id: createHashCode()
        })
    }

    return {
        bullets,
        addBullet
    }
}


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

// 敌方飞机
function useCreateEnemyPlanes() {

    const createEnemyPlane = x => {
        return {
            x,
            y: -200,
            width: 308,
            height: 207
        }
    }

    const enemyPlanes = reactive([]);

    setInterval(() => {
        let x = Math.floor((1 + stage.width) * Math.random());
        enemyPlanes.push(createEnemyPlane(x));
    }, 700);

    return {
        enemyPlanes
    }
}