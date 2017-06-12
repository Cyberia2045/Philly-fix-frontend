import React, { Component } from "react";

class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: props.issues
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({issues: newProps.issues});
    }

    render() {
        let issues = this.state.issues.map(function(issue, index) {
            return (
                <div key={index}>
                    <div>{issue.category}</div>
                    <div>{issue.neighborhood}</div>
                    <div>{issue.image}</div>
                    <div>{issue.lat}</div>
                    <div>{issue.lng}</div>
                    <div>{issue.description}</div>
                    <div>{issue.status}</div>
                </div>
            );
        });

        return(
            <div>{issues}</div>
        )
    }
}

export default Issues;
