import React, { Component } from "react";

import { refHoc } from '../../hoc/refHoc';

interface Props {
    name?: string;
}

interface State {
    weight?: number;
    height?: number;
}
@refHoc()
class RefDemoComponent extends Component<Props, State> {
    state: State = {
        weight: 60,
        height: 170
    };

    render() {
        return <div>bye ugly world my name is {this.props.name}</div>
    }
}

export default RefDemoComponent;