import React, { Component } from "react";
import "../css/issues.css";

class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: props.issues,
            user: props.user,
            dispatcher: props.dispatcher
        };
        this.handleUnresolveIssue = this.handleUnresolveIssue.bind(this);
        this.handleResolveIssue = this.handleResolveIssue.bind(this);
        this.handleFollowIssue = this.handleFollowIssue.bind(this);
        this.handleUnfollowIssue = this.handleUnfollowIssue.bind(this);
        // this.handleViewIssueDetails = this.handleViewIssueDetails.bind(this);
    }

    render() {
        let issues = this.state.issues.map(
            function(issue, index) {
                var btn;
                var btnId;
                var numDispatchersMsg;

                if (this.state.user) {
                    if (this.state.dispatcher) {
                        let dispatcher_ids = issue.dispatchers.map(function(
                            dispatcher
                        ) {
                            return dispatcher.id;
                        });
                        if (dispatcher_ids.includes(this.state.user.id)) {
                            btn = (
                                <button
                                    value={issue.id}
                                    onClick={this.handleUnresolveIssue}
                                >
                                    Unassign
                                </button>
                            );
                            btnId = "Resolve";
                        } else {
                            btn = (
                                <button
                                    value={issue.id}
                                    onClick={this.handleResolveIssue}
                                >
                                    Resolve this issue
                                </button>
                            );
                            btnId = "Unresolve";
                        }
                    } else {
                        let user_ids = issue.users.map(function(user) {
                            return user.id;
                        });
                        if (user_ids.includes(this.state.user.id)) {
                            btn = (
                                <button
                                    value={issue.id}
                                    onClick={this.handleUnfollowIssue}
                                >
                                    Unfollow
                                </button>
                            );
                            btnId = "Unfollow";
                        } else {
                            btn = (
                                <button
                                    value={issue.id}
                                    onClick={this.handleFollowIssue}
                                >
                                    Follow
                                </button>
                            );
                            btnId = "Follow";
                        }
                    }
                }
                let numDispatchers = issue.dispatchers.length;
                let attnDispatcher;
                let attnIssue;
                if (numDispatchers === 0) {
                    numDispatchersMsg =
                        "No dispatchers have looked into this issue.";
                    attnDispatcher = { color: "red" };
                    attnIssue = { border: "2px solid red" };
                } else if (numDispatchers === 1) {
                    numDispatchersMsg =
                        "There is " +
                        numDispatchers +
                        " dispatcher looking into this issue.";
                } else {
                    numDispatchersMsg =
                        "There are " +
                        numDispatchers +
                        " dispatchers looking into this issue.";
                }

                let thumbImg = {
                    backgroundImage: "url('" + issue.image_url + "')"
                };
                function handleViewIssueDetails() {
                    this.props.viewIssueDetails([
                        { issue },
                        { attnIssue },
                        { thumbImg },
                        { btnId },
                        { attnDispatcher },
                        { numDispatchersMsg }
                    ]);
                }
                return (
                    <div key={index} className="issue" style={attnIssue}>
                        <div className="issue-thumbnail" style={thumbImg}>
                            <h4
                                onClick={handleViewIssueDetails.bind(this)}
                                className="title"
                            >
                                {issue.category} in {issue.neighborhood}
                            </h4>
                            <div className="follow-btn">{btn}</div>
                        </div>
                    </div>
                );
            }.bind(this)
        );

        return <div className="issues-container flex">{issues}</div>;
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
}

export default Issues;
