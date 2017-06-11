import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            second_password: "",
            address: ""
        };
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateSecondPassword = this.updateSecondPassword.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    render() {
        return (
            <div>
                <div>Sign Up</div>
                <input
                    type="text"
                    onChange={this.updateFirstName}
                    placeholder="First Name"
                    value={this.state.first_name}
                    required
                />
                <input
                    type="text"
                    onChange={this.updateLastName}
                    placeholder="Last Name"
                    value={this.state.last_name}
                    required
                />
                <input
                    type="text"
                    onChange={this.updateEmail}
                    placeholder="Email"
                    value={this.state.email}
                    required
                />
                <input
                    type="text"
                    onChange={this.updatePassword}
                    placeholder="Password"
                    value={this.state.password}
                    required
                />
                <input
                    type="text"
                    onChange={this.updateSecondPassword}
                    placeholder="Repeat Password"
                    value={this.state.second_password}
                    required
                />
                <input
                    type="text"
                    onChange={this.updateAddress}
                    placeholder="Address"
                    value={this.state.address}
                    required
                />
                <button onClick={this.handleSignUp}>Sign Up</button>
            </div>
        );
    }

    handleSignUp() {
        this.props.signUp({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address
        });
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            second_password: "",
            address: ""
        });
    }

    updateFirstName(event) {
        this.setState({ first_name: event.target.value });
    }
    updateLastName(event) {
        this.setState({ last_name: event.target.value });
    }
    updateEmail(event) {
        this.setState({ email: event.target.value });
    }
    updatePassword(event) {
        this.setState({ password: event.target.value });
    }
    updateSecondPassword(event) {
        this.setState({ second_password: event.target.value });
        if (this.state.password !== this.state.second_password) {
            //change class to make message visible
        } else {
            //change class to make message disappear
        }
    }
    updateAddress(event) {
        this.setState({ address: event.target.value });
    }
}

export default SignUp;
