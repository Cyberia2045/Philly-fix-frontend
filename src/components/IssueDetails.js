import React, { Component } from "react";
import "../css/issueDetails.css";

class IssueDetails extends Component {
    constructor(props) {
        super(props);
        console.log("issuedetails.js", props);
        this.state = {
            issue: props.issueArray[0].issue,
            attnIssue: props.issueArray[1].attnIssue,
            thumbImg: props.issueArray[2].thumbImg
        };
    }
    render() {
        console.log("component issuedetials");
        return (
            <div style={this.state.attnIssue} className="details-issue">
                <div className="details-text flex">

                    <h4 className="details-title">
                        {this.state.issue.title}
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
                    <div className="follow-btn" />
                </div>
                <div className="details-image" style={this.state.thumbImg} />
            </div>
        );
    }
}

export default IssueDetails;
