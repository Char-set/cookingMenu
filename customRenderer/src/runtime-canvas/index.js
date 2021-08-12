import { createRenderer } from '@vue/runtime-core'
import { Graphics, Text } from 'pixi.js';
const renderer = new createRenderer({
    createElement(type) {
        console.log(type);
        // 绘制一个矩形
        let element;
        if(type === 'rect') {
            element = new Graphics();
            element.beginFill(0xff0000);
            element.drawRect(0,0,500,500);
            element.endFill();
        } else if(type === 'circle') {
            element = new Graphics();
            element.beginFill(0xffff00);
            element.drawCircle(0,0,50);
            element.endFill();
        }

        return element;
    },

    insert(el, parent) {
        console.log(el);
        console.log(parent);

        parent.addChild(el);
    },
    patchProp(el ,key, prevValue, nextValue) {
        el[key] = nextValue;
    },

    setElementText(node, text) {
        const cText = new Text(text);

        node.addChild(cText);
    },

    createText(text) {
        return new Text(text);
    }
});

export function createApp(rootComponent) {
    return renderer.createApp(rootComponent)
}