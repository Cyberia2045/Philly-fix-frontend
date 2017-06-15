import React, { Component } from "react";
import axios from "axios";
import "../css/App.css";

import IssuesForm from "./IssuesForm";
import Issues from "./Issues";
import IssueDetails from "./IssueDetails";
import neighborhoods from "../neighborhoods";
import categories from "../categories";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Search from "./Search";
import GMap from "./GMaps";
import Header from "./Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        issues: [],
        user: null,
        user_issues: [],
        searchResults: [],
        searched: false,
        searchNeighorhood: "",
        searchCategory: "",
        dispatcher: false,
        errorMsg: "",
        issuesFormOpen: false,
        viewUserIssues: false,
        viewIssueDetails: false,
        currentIssueArray: [],
        signUpFormOpen: false
      };
      this.viewUserIssues = this.viewUserIssues.bind(this);
      this.viewAllIssues = this.viewAllIssues.bind(this);
      this.resetSearch = this.resetSearch.bind(this);
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
      this.viewIssueDetails = this.viewIssueDetails.bind(this);
      this.hideViewIssueDetails = this.hideViewIssueDetails.bind(this);
    }

    render() {
      var signOutBtn;
      var signInComponent;
      var issuesForm;
      var issuesHeader;
      var issuesToList;
      var currentViewIssues;
      var issuesNav;
      var issuesToRender;
      var issueDeets;

      let backdropStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        zIndex: "9998",
        background: "rgba(0, 0, 0, 0.8)"
        };

        let newIssueButton = {
          position: "absolute",
          zIndex: "10",
          top: "30",
          right: "0"
        }

        let signUpButton = {
          position: "absolute",
          zIndex: "10",
          left: "10",
          top: "60",
          width: "100px",
          background: "rgba(255, 255, 255, 0.5)",
          color: "white",
          borderRadius: "10px"
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
                    <button style={newIssueButton} onClick={() => this.openModal()}>
                        Create New Issue
                    </button>
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
                        isOpen={this.state.issuesFormOpen}
                    />
                </div>
            );
            issuesNav = (
                <div className="issues-nav">
                    <div onClick={this.viewAllIssues}>All Issues</div>
                    <div onClick={this.viewUserIssues}>My Issues</div>
                </div>
            );
            if (this.state.viewUserIssues) {
                if (this.state.searched) {
                    issuesToList = this.state.searchResults;
                } else {
                    issuesToList = this.state.user_issues;
                }
                issuesHeader = "My Issues";
                currentViewIssues = (
                    <div>
                        <Issues
                            issues={issuesToList}
                            user={this.state.user}
                            dispatcher={this.state.dispatcher}
                            resolveIssue={this.resolveIssue}
                            unresolveIssue={this.unresolveIssue}
                            followIssue={this.followIssue}
                            unfollowIssue={this.unfollowIssue}
                            viewIssueDetails={this.viewIssueDetails}
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
                        isOpen={this.state.issuesFormOpen}
                        viewIssueDetails={this.viewIssueDetails}
                    />
                );
            }
        } else {
            signInComponent = (
                <div>
                    <SignIn signIn={this.signIn} />
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
                    viewIssueDetails={this.viewIssueDetails}
                />
            );
        }

        var signUpModal = function() {
            if (this.state.signUpFormOpen) {
                return (
                    <div>
                        <SignUp signUp={this.signUp} />
                    </div>
                );
            } else {
                return <span />;
            }
        }.bind(this)();

        var overlay = function() {
            if (this.state.issuesFormOpen) {
                return <div style={backdropStyle} />;
            } else if (this.state.signUpFormOpen) {
                return <div style={backdropStyle} />;
            } else {
                return <span />;
            }
        }.bind(this)();

        if (this.state.viewIssueDetails) {
            issueDeets = (
                <IssueDetails
                    issueArray={this.state.currentIssueArray}
                    hideViewIssueDetails={this.hideViewIssueDetails}
                />
            );
        }

        return (
          <div className="App">
              <Header />
              <div onClick={() => this.closeModal()}>{overlay}</div>
              <div className="error-msg">
                  {this.state.errorMsg}
              </div>
              <button style={signUpButton} onClick={() => this.openSignUp()}>Become A Member</button>
              {signOutBtn}
              {signInComponent}
              {issuesForm}
              {issueDeets}
              {signUpModal}

              <GMap
                  issues={this.state.issues}
                  viewIssueDetails={this.state.viewIssueDetails}
              />
              <br />
              <div className="search-issues-container">
                {issuesNav}
                  <Search
                      neighborhoods={neighborhoods}
                      categories={categories}
                      runSearch={this.runSearch}
                      resetSearch={this.resetSearch}
                      viewUserIssues={this.state.viewUserIssues}
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

    viewUserIssues() {
        this.setState({
            viewUserIssues: true
        });
        if (this.state.searched) {
            this.runSearch({
                neighborhood: this.state.searchNeighorhood,
                category: this.state.searchCategory,
                viewUserIssues: true
            });
        }
    }

    viewAllIssues() {
        this.setState({
            viewUserIssues: false
        });
        if (this.state.searched) {
            this.runSearch({
                neighborhood: this.state.searchNeighorhood,
                category: this.state.searchCategory,
                viewUserIssues: false
            });
        }
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
                    this.uploadImage();
                    this.closeModal();
                }.bind(this)
            );
    }

    uploadImage() {
        var data = new FormData();
        var imagedata = document.querySelector('input[type="file"]').files[0];

        if (imagedata === undefined) {
            this.closeModal();
            return;
        }

        data.append("data", imagedata);

        fetch("/issues/image", {
            method: "POST",
            body: data
        }).then(
            function(response) {
                this.closeModal();
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
        this.closeModal();
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
        let results;
        if (props.viewUserIssues) {
            results = this.state.user_issues;
        } else {
            results = this.state.issues;
        }

        results = results.filter(function(issue) {
            return (
                issue.neighborhood === props.neighborhood ||
                props.neighborhood === ""
            );
        });
        results = results.filter(function(issue) {
            return issue.category === props.category || props.category === "";
        });
        this.setState({
            searchResults: results,
            searched: true,
            searchNeighorhood: props.neighborhood,
            searchCategory: props.category
        });
    }

    resetSearch() {
        this.setState({ searched: false });
    }

    viewIssueDetails(props) {
        this.setState({ viewIssueDetails: true, currentIssueArray: props });
    }
    hideViewIssueDetails() {
        this.setState({ viewIssueDetails: false });
    }

    openModal() {
        this.setState({ issuesFormOpen: true });
    }

    closeModal() {
        if (this.state.issuesFormOpen) {
            this.setState({ issuesFormOpen: false });
        } else if (this.state.signUpFormOpen) {
            this.setState({ signUpFormOpen: false });
        }
    }

    openSignUp() {
        this.setState({ signUpFormOpen: true });
    }
}

export default App;
