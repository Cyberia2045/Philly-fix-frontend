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

        let modalInput = {
          backgroundColor: "rgba(255,255,255,0.8)",
          width: "100%",
          maxWidth: "200px",
          borderRadius: "10px",
          marginTop: "5px"
        };

        let dispatcherContainer = {
          width: "100%",
          maxWidth: "200px",
          margin: "0 auto",
          marginBottom: "10px",
          maxHeight: "100%"
        }

        if (this.state.dispatcher) {
            return (
              <div style={dispatcherContainer}>
                <input
                  style={modalInput}
                  type="text"
                  onChange={this.handleUpdateDispatcherVerification}
                  placeholder="Dispatcher Verification"
                />
                <input
                  style={modalInput}
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
