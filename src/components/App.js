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
import Search from "./Search";
import GMap from "./GMaps";

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
        this.followIssue = this.followIssue.bind(this);
        this.unfollowIssue = this.unfollowIssue.bind(this);
        this.resolveIssue = this.resolveIssue.bind(this);
        this.unresolveIssue = this.unresolveIssue.bind(this);
    }

    render() {
        var signOutBtn;
        var signInOutComponents;
        var issuesForm;
        var myIssues;
        console.log(this.state);
        if (this.state.user) {
            signOutBtn = <button onClick={this.signOut}>Sign Out</button>;
            issuesForm = (
                <IssuesForm
                    neighborhoods={neighborhoods}
                    categories={categories}
                    createIssue={this.createIssue}
                    user={this.state.user}
                    dispatcher={this.state.dispatcher}
                    resolveIssue={this.resolveIssue}
                    unresolveIssue={this.unresolveIssue}
                    followIssue={this.followIssue}
                    unfollowIssue={this.unfollowIssue}
                />
            );
            myIssues = (
                <div>
                    <h2>My Issues:</h2>
                    <Issues
                        issues={this.state.user_issues}
                        user={this.state.user}
                        dispatcher={this.state.dispatcher}
                        resolveIssue={this.resolveIssue}
                        unresolveIssue={this.unresolveIssue}
                        followIssue={this.followIssue}
                        unfollowIssue={this.unfollowIssue}
                    />
                </div>
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
                <Search
                    neighborhoods={neighborhoods}
                    categories={categories}
                    issues={this.state.issues}
                    user={this.state.user}
                    dispatcher={this.state.dispatcher}
                    resolveIssue={this.resolveIssue}
                    unresolveIssue={this.unresolveIssue}
                    followIssue={this.followIssue}
                    unfollowIssue={this.unfollowIssue}
                />
                <GMap />
                <br />
                <div>
                    <h2>All Issues:</h2>
                    <Issues
                        issues={this.state.issues}
                        user={this.state.user}
                        dispatcher={this.state.dispatcher}
                        resolveIssue={this.resolveIssue}
                        unresolveIssue={this.unresolveIssue}
                        followIssue={this.followIssue}
                        unfollowIssue={this.unfollowIssue}
                    />
                </div>
                {myIssues}

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
        console.log(issue);
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
                        if (response.data.department) {
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

    resolveIssue(params) {
        axios.post('/issue_dispatchers', {
            issue_dispatcher: params
        }).then(function(response) {
            this.setState({issues: response.data})
            this.loadUserIssues();
        }.bind(this));
    }

    unresolveIssue(params) {
        axios.delete('/issue_dispatchers/' + params.issue_id, {
            params: {
                dispatcher_id: params.dispatcher_id
            }
        }).then(function(response) {
            this.setState({issues: response.data});
            this.loadUserIssues();
        }.bind(this));
    }

    followIssue(params) {
        axios.post('/issue_users', {
            issue_user: params
        }).then(function(response) {
            this.setState({issues: response.data});
            this.loadUserIssues();
        }.bind(this));
    }

    unfollowIssue(params) {
        axios.delete('/issue_users/' + params.issue_id, {
            params: {
                user_id: params.user_id
            }
        }).then(function(response) {
            this.setState({ issues: response.data });
            this.loadUserIssues();
        }.bind(this));
    }
}

export default App;
