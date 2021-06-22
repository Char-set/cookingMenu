import React, { Component } from "react";

interface State {
    name: string
}

export const decoratorWithNameHeight = (height?: number) => {
    return (WrappedComponent: any) => {
        return class extends Component<any, State> {
            public state: State = {
                name: ''
            }

            componentDidMount() {
                let username = localStorage.getItem('myName');

                this.setState({
                    name: username || ''
                })
            }

            render() {
                return (
                    <div>
                        <WrappedComponent name={this.state.name} {...this.props} />
                        <p>身高为 {height || 0}</p>
                    </div>
                )
            }
        }
    }
}

export const decoratorWithWidth = (width?: number) => {
    return (WrappedComponent: any) => {
        return class extends Component<any, State> {

            render() {
                return (
                    <div>
                        <WrappedComponent {...this.props} />
                        <p>宽度为 {width || 0}</p>
                    </div>
                )
            }
        }
    }
}