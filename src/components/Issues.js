import React from "react";

function Issues(props) {
    let issues = props.issues.map(function(issue) {
        return (
            <div>
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

    return (
        <div>
            <div>{issues}</div>
        </div>
    );
}

export default Issues;
