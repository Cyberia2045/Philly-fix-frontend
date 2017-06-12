import React, { Component } from "react";

class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: props.issues,
            user: props.user,
            dispatcher: props.dispatcher
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            issues: newProps.issues,
            user: newProps.user,
            dispatcher: newProps.dispatcher
        });
    }



    render() {

        let issues = this.state.issues.map(function(issue, index) {
            var btn;
            if (this.state.user !== null) {

                if (this.state.dispatcher) {
                    console.log(issue);


                    let dispatcher_ids = issue.dispatchers.map(function(dispatcher) {
                        return dispatcher.id
                    });
                    if (dispatcher_ids.includes(this.state.user.id)) {
                        btn = <button onClick={this.handleUnresolveIssue}>Unassign</button>
                    } else {
                        btn = <button onClick={this.handleResolveIssue}>Resolve this issue</button>
                    }

                } else {
                    console.log(issue);
                    let user_ids = issue.users.map(function(user) {
                        return user.id
                    });
                    if (user_ids.includes(this.state.user.id)) {
                        btn = <div>You are following this issue.</div>
                    } else {
                        btn = <button onClick={this.handleFollowIssue}>Follow</button>
                    }
                }
            }

            return (
                <div key={index}>
                    {btn}
                    <div>{issue.category}</div>
                    <div>{issue.neighborhood}</div>
                    <div>{issue.image}</div>
                    <div>{issue.lat}</div>
                    <div>{issue.lng}</div>
                    <div>{issue.description}</div>
                    <div>{issue.status}</div>
                </div>
            );
        }.bind(this));

        return(
            <div>{issues}</div>
        )
    }
}

export default Issues;
