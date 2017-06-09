import React, { Component } from "react";
import axios from "axios";
import "../css/App.css";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

class App extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    render() {
        return (
            <div className="App">
                <SignIn signIn={this.signIn} />
                <SignUp signUp={this.signUp} />
            </div>
        );
    }
    signIn() {
        axios.get("/users").then(function(response) {
            console.log(response);
        });
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
