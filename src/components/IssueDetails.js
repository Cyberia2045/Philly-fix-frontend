import React, { Component } from "react";
import "../css/issueDetails.css";

class IssueDetails extends Component {
    constructor(props) {
        super(props);
        console.log("issuedetails.js", props);
        this.state = {
            issue: props.issueArray[0].issue,
            attnIssue: props.issueArray[1].attnIssue,
            thumbImg: props.issueArray[2].thumbImg,
            btnId: props.issueArray[3].btnId
        };
        this.handleHideViewIssueDetails = this.handleHideViewIssueDetails.bind(
            this
        );
    }
    render() {
        var btn;
        if (this.state.btnId === "Resolve") {
            btn = (
                <button
                    value={this.state.issue.id}
                    onClick={this.handleUnresolveIssue}
                >
                    Unassign
                </button>
            );
        } else if (this.state.btnId === "Unresolve") {
            btn = (
                <button
                    value={this.state.issue.id}
                    onClick={this.handleResolveIssue}
                >
                    Resolve this issue
                </button>
            );
        } else if (this.state.btnId === "Follow") {
            btn = (
                <button
                    value={this.state.issue.id}
                    onClick={this.handleUnfollowIssue}
                >
                    Unfollow
                </button>
            );
        } else if (this.state.btnId === "Unfollow") {
            btn = (
                <button
                    value={this.state.issue.id}
                    onClick={this.handleFollowIssue}
                >
                    Follow
                </button>
            );
        }
        return (
            <div style={this.state.attnIssue} className="details-issue">
                <div className="details-text flex">
                    <h4 className="details-title">
                        {this.state.issue.category}
                        {" "}
                        in
                        {" "}
                        {this.state.issue.neighborhood}
                    </h4>
                    <div className="details-description">
                        {this.state.issue.description}
                    </div>
                    <div className="details-users">
                        Users interested:{this.state.issue.users.length}
                    </div>
                    <div className="details-dispatchers">
                        Dispatchers resolving:
                        {this.state.issue.dispatchers.length}
                    </div>
                    <div className="details-follow"> {btn} </div>
                    <div
                        className="details-close"
                        onClick={this.handleHideViewIssueDetails}
                    >
                        Close Issue{" "}
                    </div>
                    <div
                        className="details-image"
                        style={this.state.thumbImg}
                    />
                </div>
            </div>
        );
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            issue: newProps.issueArray[0].issue,
            attnIssue: newProps.issueArray[1].attnIssue,
            thumbImg: newProps.issueArray[2].thumbImg
        });
    }
    handleHideViewIssueDetails() {
        this.props.hideViewIssueDetails();
    }
}

export default IssueDetails;
