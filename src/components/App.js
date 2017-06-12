import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

import "../css/App.css";
import IssuesForm from "./IssuesForm";
import Issues from "./Issues";
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
            dispatcher: false,
            errorMsg: ""
        };
        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.createIssue = this.createIssue.bind(this);
        this.loadUserIssues = this.loadUserIssues.bind(this);
    }

    render() {
        console.log(this.state);
        var signOutBtn;
        var signInOutComponents;
        var issuesForm;
        if (this.state.user !== null) {
            signOutBtn = <button onClick={this.signOut}>Sign Out</button>;
            issuesForm = (
                <IssuesForm
                    neighborhoods={neighborhoods}
                    categories={categories}
                    createIssue={this.createIssue}
                    user={this.state.user}
                    dispatcher={this.state.dispatcher}
                />
            );
        } else {
            signInOutComponents = (
                <div>
                    <SignIn signIn={this.signIn} />
                    <SignUp signUp={this.signUp} />
                </div>
            );
        }

        return (
            <div className="App">
                <div className="error-msg">
                    {this.state.errorMsg}
                </div>
                {signOutBtn}
                {signInOutComponents}
                {issuesForm}

                <Issues issues={this.state.issues} />
                <br />
                <Issues issues={this.state.user_issues} />
            </div>
        );
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
        var url;
        if (this.state.dispatcher) {
            url = "/issue_dispatchers";
        } else {
            url = "/issue_users";
        }
        axios
            .get(url, {
                params: {
                    id: this.state.user.id
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

    createIssue(issue) {
        if (this.state.user === null) {
            this.setState({
                errorMsg: "You must be signed in to post an issue."
            });
            return;
        }
        var userType;
        if (this.state.dispatcher) {
            userType = "dispatcher";
        } else {
            userType = "user";
        }
        axios
            .post("/issues", {
                issue: issue,
                id: this.state.user.id,
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
        console.log(user);
        var url;
        if (user.dispatcher) {
            url = "/dispatchers";
        } else {
            url = "/users";
        }
        axios
            .get(url, {
                params: { email: user.email, password: user.password }
            })
            .then(
                function(response) {
                    if (response.data !== "") {
                        if (response.data.department !== null) {
                            this.setState({
                                dispatcher: true
                            });
                        }
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
                .then(
                    function(response) {
                        this.setState({
                            user: response.data,
                            dispatcher: true,
                            errorMsg: ""
                        });
                    }.bind(this)
                )
                .catch(function(error) {
                    console.log(error);
                });
        } else {
            axios
                .post("/users", { user: user })
                .then(
                    function(response) {
                        this.setState({
                            user: response.data,
                            errorMsg: ""
                        });
                    }.bind(this)
                )
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

    signOut() {
        var url;
        if (this.state.dispatcher) {
            url = "/sessions/dispatcher";
        } else {
            url = "/sessions/user";
        }
        axios.delete(url).then(
            function(response) {
                this.setState({
                    user: null,
                    dispatcher: false,
                    user_issues: []
                });
            }.bind(this)
        );
    }
}

export default App;
