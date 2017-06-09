import React, { Component } from "react";
import axios from "axios";
import "../css/App.css";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            resident_signed_in: false,
            dispatcher_signed_in: false
        };

        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    render() {
        console.log(this.state);
        return (
            <div className="App">
                <SignIn signIn={this.signIn} />
                <SignUp signUp={this.signUp} />
            </div>
        );
    }
    signIn() {
        axios.get("/users").then(
            function(response) {
                console.log(response);
                this.setState({
                    resident_signed_in: true
                });
            }.bind(this)
        );
    }
    signUp(user) {
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

export default App;
