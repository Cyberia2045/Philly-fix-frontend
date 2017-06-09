import React, { Component } from "react";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    render() {
        return (
            <div>
                <div>Sign In</div>
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
                <button onClick={this.handleSignIn}>Sign In</button>
            </div>
        );
    }

    handleSignIn() {
        this.props.signIn({
            email: this.state.email,
            password: this.state.password
        });
    }

    updateEmail(event) {
        this.setState({ email: event.target.value });
    }
    updatePassword(event) {
        this.setState({ password: event.target.value });
    }
}

export default SignIn;
