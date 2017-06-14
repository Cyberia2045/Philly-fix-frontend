import React, { Component } from "react";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            dispatcher: false
        };
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.toggleDispatcher = this.toggleDispatcher.bind(this);
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    onChange={this.updateEmail}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    onChange={this.updatePassword}
                    placeholder="Password"
                    required
                />
                <br />
                <label>If you are a dispatcher, check this box:</label>
                <input type="checkbox" onChange={this.toggleDispatcher} />
                <button onClick={this.handleSignIn}>Sign In</button>
            </div>
        );
    }

    handleSignIn() {
        this.props.signIn({
            email: this.state.email,
            password: this.state.password,
            dispatcher: this.state.dispatcher
        });
    }
    toggleDispatcher() {
        this.setState({ dispatcher: !this.state.dispatcher });
    }

    updateEmail(event) {
        this.setState({ email: event.target.value });
    }
    updatePassword(event) {
        this.setState({ password: event.target.value });
    }
}

export default SignIn;
