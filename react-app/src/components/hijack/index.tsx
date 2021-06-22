import React, { Component } from "react";

import { hijackHoc } from '../../hoc/hijack';

interface Props {
    name?: string;
}

interface State {
    weight?: number;
    height?: number;
}
@hijackHoc
class HijackComponent extends Component<Props, State> {
    state: State = {
        weight: 60,
        height: 170
    };

    handleClick() {
        this.setState({
            weight: this.state.weight! + 1
        })
    }

    render() {
        return (
            <div onClick={() => this.handleClick()}>
                点我啊～～～{this.state.weight}
            </div>
        )
    }
}

export default HijackComponent;