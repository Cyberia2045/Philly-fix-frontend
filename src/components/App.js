import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

import "../css/App.css";
import IssuesForm from "./IssuesForm";
import neighborhoods from "../neighborhoods";
import categories from "../categories";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            user: null,
            user_issues: [],
            dispatcher: null,
            dispatcher_issues: [],
            errorMsg: ""
        };
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.createIssue = this.createIssue.bind(this);
        this.loadUserIssues = this.loadUserIssues.bind(this);
    }

    componentWillMount() {
        axios.get("/issues").then(
            function(response) {
                this.setState({
                    issues: response.data
                });
            }.bind(this)
        );
    }

    loadUserIssues() {
        if (this.state.user !== null) {
            axios
                .get("/issue_users", {
                    params: {
                        user_id: this.state.user.id
                    }
                })
                .then(
                    function(response) {
                        this.setState({
                            user_issues: response.data
                        });
                    }.bind(this)
                );
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <div className="error-msg">
                    {this.state.errorMsg}
                </div>
                <SignIn signIn={this.signIn} />
                <SignUp signUp={this.signUp} />
                <IssuesForm
                    neighborhoods={neighborhoods}
                    categories={categories}
                    createIssue={this.createIssue}
                    user={this.state.user}
                    dispatcher={this.state.dispatcher}
                />
            </div>
        );
    }

    createIssue(issue) {
        var id;
        var userType;
        if (this.state.user === null) {
            if (this.state.dispatcher === null) {
                this.setState({
                    errorMsg: "You must be signed in to post an issue."
                });
                return;
            } else {
                id = this.state.dispatcher.id;
                userType = "dispatcher";
            }
        } else {
            id = this.state.user.id;
            userType = "user";
        }
        axios
            .post("/issues", {
                issue: issue,
                id: id,
                userType: userType
            })
            .then(
                function(response) {
                    this.setState({ issues: response.data });
                    this.loadUserIssues();
                }.bind(this)
            );
    }

    signIn(user) {
        axios
            .get("/users", {
                params: { email: user.email, password: user.password }
            })
            .then(
                function(response) {
                    if (response.data !== "") {
                        this.setState({
                            user: response.data,
                            errorMsg: ""
                        });
                        this.loadUserIssues();
                    } else {
                        this.setState({
                            errorMsg: "Sign in failed."
                        });
                    }
                }.bind(this)
            );
    }
    signUp(user) {
        if (user.dispatcher) {
            axios
                .post("/dispatchers", { dispatcher: user })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        } else {
            axios
                .post("/users", { user: user })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
}

export default App;
