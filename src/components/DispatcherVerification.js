import React, { Component } from "react";

class DispatcherVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dispatcher: props.dispatcher
        };
        this.handleUpdateDispatcherVerification = this.handleUpdateDispatcherVerification.bind(
            this
        );
    }
    render() {
        if (this.state.dispatcher) {
            return (
                <div>
                    <input
                        type="text"
                        onChange={this.handleUpdateDispatcherVerification}
                        placeholder="Dispatcher Verification"
                    />
                </div>
            );
        } else {
            return null;
        }
    }
    handleUpdateDispatcherVerification(event) {
        this.props.updateDispatcherVerification({
            dispatcherVerification: event.target.value
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({ dispatcher: newProps.dispatcher });
    }
}

export default DispatcherVerification;
