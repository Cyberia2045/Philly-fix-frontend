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
            department: "",
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
        this.updateDepartment = this.updateDepartment.bind(this);
    }

    render() {
        // ----------Sign Up Modal Styling----------

        let signUpModalStyle = {
            width: "80%",
            maxWidth: "600px",
            height: "100%",
            maxHeight: "300px",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "9999",
            background: "rgba(0,0,0,0.7)",
            borderRadius: "10px"
        };

        let modalContainer = {
            width: "50%",
            height: "100%",
            maxHeight: "300px",
            margin: "0 auto",
            marginTop: "10px",
            marginBottom: "10px"
        };

        let modalInput = {
            backgroundColor: "rgba(255,255,255,0.8)",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "10px",
            marginTop: "5px"
        };

        let dispatcherTextContainer = {
            width: "260px",
            margin: "0 auto",
            marginTop: "5px"
        };

        let dispatcherText = {
            color: "white",
            padding: "5px",
            textAlign: "center"
        };

        let dispatcherToggle = {
            width: "15px",
            margin: "0 auto"
        };

        let buttonContainer = {
            width: "60px",
            margin: "0 auto",
            marginBottom: "5px"
        };

        let modalButton = {
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "10px"
        };

        // ----------End Styling----------

        return (
            <div style={signUpModalStyle}>
                <div style={modalContainer}>
                    <div> {this.state.errorMsg} </div>
                    <input
                        style={modalInput}
                        type="text"
                        onChange={this.updateFirstName}
                        placeholder="First Name"
                        value={this.state.first_name}
                        required
                    />
                    <input
                        style={modalInput}
                        type="text"
                        onChange={this.updateLastName}
                        placeholder="Last Name"
                        value={this.state.last_name}
                        required
                    />
                    <input
                        style={modalInput}
                        type="text"
                        onChange={this.updateEmail}
                        placeholder="Email"
                        value={this.state.email}
                        required
                    />
                    <input
                        style={modalInput}
                        type="text"
                        onChange={this.updatePassword}
                        placeholder="Password"
                        value={this.state.password}
                        required
                    />
                    <input
                        style={modalInput}
                        type="text"
                        onChange={this.updateSecondPassword}
                        placeholder="Repeat Password"
                        value={this.state.second_password}
                        required
                    />
                    <input
                        style={modalInput}
                        type="text"
                        onChange={this.updateAddress}
                        placeholder="Address"
                        value={this.state.address}
                        required
                    />
                    <br />
                    <div style={dispatcherTextContainer}>
                        <label style={dispatcherText}>
                            If you are a dispatcher, check this box:
                        </label>
                    </div>
                    <div style={dispatcherToggle}>
                        <input
                            type="checkbox"
                            onChange={this.toggleDispatcher}
                        />
                    </div>
                    <br />
                    <DispatcherVerification
                        dispatcher={this.state.dispatcher}
                        updateDispatcherVerification={
                            this.updateDispatcherVerification
                        }
                        updateDepartment={this.updateDepartment}
                    />
                    <div style={buttonContainer}>
                        {" "}
                        <button style={modalButton} onClick={this.handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                </div>
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
                address: this.state.address,
                dispatcher_verification: this.state.dispatcherVerification,
                department: this.state.department,
                dispatcher: this.state.dispatcher
            });
            this.setState({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                second_password: "",
                address: "",
                department: "",
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
    updateDepartment(props) {
        this.setState({ department: props.department });
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
