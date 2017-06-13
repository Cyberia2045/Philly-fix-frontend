import React, { Component } from "react";

class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: props.issues,
            user: props.user,
            dispatcher: props.dispatcher
        }
        this.handleUnresolveIssue = this.handleUnresolveIssue.bind(this);
        this.handleResolveIssue = this.handleResolveIssue.bind(this);
        this.handleFollowIssue = this.handleFollowIssue.bind(this);
        this.handleUnfollowIssue = this.handleUnfollowIssue.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            issues: newProps.issues,
            user: newProps.user,
            dispatcher: newProps.dispatcher
        });
    }

    handleUnresolveIssue(event) {
        this.props.unresolveIssue({
            dispatcher_id: this.state.user.id,
            issue_id: event.target.value
        });
    }

    handleResolveIssue(event) {
        this.props.resolveIssue({
            dispatcher_id: this.state.user.id,
            issue_id: event.target.value
        });
    }

    handleFollowIssue(event) {
        this.props.followIssue({
            user_id: this.state.user.id,
            issue_id: event.target.value
        });
    }

    handleUnfollowIssue(event) {
        this.props.unfollowIssue({
            user_id: this.state.user.id,
            issue_id: event.target.value
        });
    }

    render() {

        let issues = this.state.issues.map(function(issue, index) {
            var btn;
            var numDispatchersMsg;

            if (this.state.user) {
                if (this.state.dispatcher) {

                    let dispatcher_ids = issue.dispatchers.map(function(dispatcher) {
                        return dispatcher.id
                    });
                    if (dispatcher_ids.includes(this.state.user.id)) {
                        btn = <button value={issue.id} onClick={this.handleUnresolveIssue}>Unassign</button>
                    } else {
                        btn = <button value={issue.id} onClick={this.handleResolveIssue}>Resolve this issue</button>
                    }

                } else {
                    let user_ids = issue.users.map(function(user) {
                        return user.id
                    });
                    if (user_ids.includes(this.state.user.id)) {
                        btn = <button value={issue.id} onClick={this.handleUnfollowIssue}>Unfollow</button>
                    } else {
                        btn = <button value={issue.id} onClick={this.handleFollowIssue}>Follow</button>
                    }
                }
            }

            let numDispatchers = issue.dispatchers.length;
            if (numDispatchers === 0) {
                numDispatchersMsg = "No dispatchers have looked into this issue."
            } else if (numDispatchers === 1) {
                numDispatchersMsg = "There is " + numDispatchers + " dispatcher looking into this issue."
            } else {
                numDispatchersMsg = "There are " + numDispatchers + " dispatchers looking into this issue."
            }

            let thumbImgStyle = {
                backgroundImage: "url('" + issue.image_url + "')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100px",
                height: "100px"
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
                    <div className="issue__image-thumb" style={thumbImgStyle}></div>
                    {numDispatchersMsg}
                </div>
            );
        }.bind(this));

        return(
            <div>{issues}</div>
        )
    }
}

export default Issues;
