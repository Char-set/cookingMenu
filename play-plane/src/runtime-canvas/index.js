import { createRenderer } from '@vue/runtime-core'
import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';
const renderer = new createRenderer({
    createElement(type) {
        // 绘制一个矩形
        let element;
        
        switch (type) {
            case "Container":
                element = new Container();
                break;
            case "Sprite":
                element = new Sprite();
            default:
                break;
        }

        return element;
    },

    insert(el, parent) {
        parent.addChild(el);
    },
    patchProp(el ,key, prevValue, nextValue) {
        switch (key) {
            case "texture":
                el.texture = Texture.from(nextValue)
                break;
            case "onClick": 
                el.on("pointertap", nextValue)
                break;
            default:
                el[key] = nextValue;
                break;
        }
        
    },

    setElementText(node, text) {
        const cText = new Text(text);

        node.addChild(cText);
    },

    createText(text) {
        return new Text(text);
    },
    createComment() {},
    parentNode() {},
    nextSibling() {},
    remove(el) {
        const parent = el.parent;
        if(parent) {
            parent.removeChild(el);
        }
    }
});

export function createApp(rootComponent) {
    return renderer.createApp(rootComponent)
}