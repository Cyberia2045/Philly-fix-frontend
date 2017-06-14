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
        this.handleUpdateDepartment = this.handleUpdateDepartment.bind(
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
                <input
                  type="text"
                  onChange={this.handleUpdateDepartment}
                  placeholder="Department"
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
    
    handleUpdateDepartment(event) {
        this.props.updateDepartment({
            department: event.target.value
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({ dispatcher: newProps.dispatcher });
    }
}

export default DispatcherVerification;
