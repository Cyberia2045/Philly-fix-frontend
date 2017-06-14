import React, { Component } from "react";
import axios from "axios";
// import { BrowserRouter, Route, Link } from "react-router-dom";

import "../css/issues.css";
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
            searchResults: [],
            searched: false,
            dispatcher: false,
            errorMsg: "",
            issuesFormOpen: false,
            viewUserIssues: false
        };
        this.toggleIssuesView = this.toggleIssuesView.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.createIssue = this.createIssue.bind(this);
        this.loadUserIssues = this.loadUserIssues.bind(this);
        this.runSearch = this.runSearch.bind(this);
        this.followIssue = this.followIssue.bind(this);
        this.unfollowIssue = this.unfollowIssue.bind(this);
        this.resolveIssue = this.resolveIssue.bind(this);
        this.unresolveIssue = this.unresolveIssue.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    render() {

        var signOutBtn;
        var signInOutComponents;
        var issuesForm;
        var issuesHeader;
        var issuesToList;
        var currentViewIssues;
        console.log(this.state);

        let backdropStyle = {
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0px',
          left: '0px',
          zIndex: '9998',
          background: 'rgba(0, 0, 0, 0.8)'
        }

        if (this.state.searched) {
            issuesToList = this.state.searchResults;
        } else {
            issuesToList = this.state.issues;
        }

        if (this.state.user) {
            signOutBtn = (
                <button onClick={this.signOut} className="sign-out-btn">
                    Sign Out
                </button>
            );
            issuesForm = (
              <div>
                <button onClick={() => this.openModal()}>Create New Issue</button>
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
                      isOpen ={this.state.issuesFormOpen}
                  />
              </div>
            );
            if (this.state.viewUserIssues) {
                //
                // if (this.state.searched) {
                //     issuesToList = this.state.searchResults;
                // } else {
                //     issuesToList = this.state.user_issues;
                // }
                issuesHeader = "My Issues";
                currentViewIssues = (
                    <div>
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
                issuesHeader = "All Issues";
                currentViewIssues = (
                    <Issues
                        issues={issuesToList}
                        user={this.state.user}
                        dispatcher={this.state.dispatcher}
                        resolveIssue={this.resolveIssue}
                        unresolveIssue={this.unresolveIssue}
                        followIssue={this.followIssue}
                        unfollowIssue={this.unfollowIssue}
                    />
                );
            }

        } else {
            signInOutComponents = (
                <div>
                    <SignIn signIn={this.signIn} />
                    <SignUp signUp={this.signUp} />
                </div>
            );
            issuesHeader = "All Issues";
            currentViewIssues = (
                <Issues
                    issues={issuesToList}
                    user={this.state.user}
                    dispatcher={this.state.dispatcher}
                    resolveIssue={this.resolveIssue}
                    unresolveIssue={this.unresolveIssue}
                    followIssue={this.followIssue}
                    unfollowIssue={this.unfollowIssue}
                />
            );
        }

        var overlay = function(){
          if (this.state.issuesFormOpen) {
            return  <div style={backdropStyle}></div>
          }
          else {
            return <span></span>
          }
        }.bind(this)()

        return (
            <div className="App">
              {overlay}
                <div className="error-msg">
                    {this.state.errorMsg}
                </div>
                {signOutBtn}
                {signInOutComponents}
                {issuesForm}
                {/* <GMap issues={this.state.issues} /> */}

                <div className="issues-container">
                    <div className="issues-nav">
                        <div onClick={this.toggleIssuesView}>All Issues</div>
                        <div onClick={this.toggleIssuesView}>My Issues</div>
                    </div>
                    <h2 className="issues-header">{issuesHeader}</h2>
                    <Search
                        neighborhoods={neighborhoods}
                        categories={categories}
                        runSearch={this.runSearch}
                    />
                    {currentViewIssues}
                </div>
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

    toggleIssuesView() {
        this.setState({
            viewUserIssues: !this.state.viewUserIssues
        })
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
                    this.uploadImage();
                }.bind(this)
            );
    }

    uploadImage() {
		var data = new FormData();
        var imagedata = document.querySelector('input[type="file"]').files[0];
        data.append("data", imagedata);

        fetch("/issues/image", {
          method: "POST",
          body: data
      }).then(function(response) {
            this.loadUserIssues();
        }.bind(this));
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
        axios
            .post("/issue_dispatchers", {
                issue_dispatcher: params
            })
            .then(
                function(response) {
                    this.setState({ issues: response.data });
                    this.loadUserIssues();
                }.bind(this)
            );
    }

    unresolveIssue(params) {
        axios
            .delete("/issue_dispatchers/" + params.issue_id, {
                params: {
                    dispatcher_id: params.dispatcher_id
                }
            })
            .then(
                function(response) {
                    this.setState({ issues: response.data });
                    this.loadUserIssues();
                }.bind(this)
            );
    }

    followIssue(params) {
        axios
            .post("/issue_users", {
                issue_user: params
            })
            .then(
                function(response) {
                    this.setState({ issues: response.data });
                    this.loadUserIssues();
                }.bind(this)
            );
    }

    unfollowIssue(params) {
        axios
            .delete("/issue_users/" + params.issue_id, {
                params: {
                    user_id: params.user_id
                }
            })
            .then(
                function(response) {
                    this.setState({ issues: response.data });
                    this.loadUserIssues();
                }.bind(this)
            );
    }

    runSearch(props) {
        let neighborhood = props.neighborhood;
        let category = props.category;
        let results;

        if (this.state.viewUserIssues) {
            results = this.state.user_issues;
        } else {
            results = this.state.issues;
        }

        results = results.filter(function(issue) {
            return issue.neighborhood === neighborhood || neighborhood === "";
        });
        results = results.filter(function(issue) {
            return issue.category === category || category === "";
        });
        this.setState({
            searchResults: results,
            searched: true
        });
    }

    openModal() {
      this.setState({ issuesFormOpen: true })
    }

    closeModal() {
      this.setState({ issuesFormOpen: false })
    }

}

export default App;
