import React, { Component } from "react";
import DispatcherVerification from "./DispatcherVerification";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            second_password: "",
            address: "",
            errorMsg: "",
            dispatcher: false,
            dispatcherDepartment: "",
            dispatcherVerification: ""
        };
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateSecondPassword = this.updateSecondPassword.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.toggleDispatcher = this.toggleDispatcher.bind(this);
        this.updateDispatcherVerification = this.updateDispatcherVerification.bind(
            this
        );
        this.updateDispatcherDepartment = this.updateDispatcherDepartment.bind(
            this
        );
    }

    render() {
        return (
            <div>
                <div> {this.state.errorMsg} </div>
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
                <br />
                <label>If you are a dispatcher, check this box:</label>
                <input type="checkbox" onChange={this.toggleDispatcher} />
                <br />
                <DispatcherVerification
                    dispatcher={this.state.dispatcher}
                    updateDispatcherVerification={
                        this.updateDispatcherVerification
                    }
                    updateDispatcherDepartment={this.updateDispatcherDepartment}
                />
                <button onClick={this.handleSignUp}>Sign Up</button>
            </div>
        );
    }

    handleSignUp() {
        if (this.state.password !== this.state.second_password) {
            this.setState({
                errorMsg: "Your passwords do not match!"
            });
            return;
        } else {
            this.props.signUp({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                second_password: this.state.second_password,
                address: this.state.address,
                dispatcher: this.state.dispatcher,
                dispatcher_verification: this.state.dispatcherVerification,
                department: this.state.dispatcherDepartment
            });
            this.setState({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                second_password: "",
                address: "",
                dispatcher: false,
                dispatcherDepartment: "",
                dispatcherVerification: ""
            });
        }
    }

    toggleDispatcher() {
        this.setState({ dispatcher: !this.state.dispatcher });
    }
    updateDispatcherVerification(props) {
        this.setState({ dispatcherVerification: props.dispatcherVerification });
    }
    updateDispatcherDepartment(props) {
        this.setState({ dispatcherDepartment: props.dispatcherDepartment });
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
    }

    updateAddress(event) {
        this.setState({ address: event.target.value });
    }
}

export default SignUp;
