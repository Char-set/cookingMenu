import React, { Component } from "react";

import { decoratorWithNameHeight, decoratorWithWidth } from '../../hoc/index';

interface Props {
    name?: string;
}

@decoratorWithWidth(100)
@decoratorWithNameHeight(180)
class UglyWorld extends Component<Props, any> {
    render() {
        return <div>bye ugly world my name is {this.props.name}</div>
    }
}

export default UglyWorld;