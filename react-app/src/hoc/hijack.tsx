// 继承/劫持 例子
import React, { Component } from "react";

export function hijackHoc<T extends { new(...args: any[]): any}>(
    component: T
) {
    return class extends component {
        handleClick() {
            console.log(this.handleClick);

            super.handleClick();

            console.log('被劫持了～～～')
        }

        render() {
            const parent = super.render();

            return React.cloneElement(parent, {
                onClick: () => this.handleClick()
            })
        }
    }
}