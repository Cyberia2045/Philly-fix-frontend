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

      let signInContainer = {
        position: "absolute",
        top: "0",
        right: "10",
        width: "40%",
        maxWidth: "300px",
        height: "100%"
      }

      let inputStyle = {
        position: "relative",
        zIndex: "10",
        backgroundColor: "rgba(255,255,255,0.5)",
        color: "white",
        border: "2px solid white",
        margin: "1px",
        width: "100%",
        maxWidth: "250px",
        borderRadius: "10px",
        right: "0"
      }

      let dispatcherTextContainer = {
        position: "relative",
        zIndex: "10"
      }

      let dispatcherText = {
        color: "white"
      }

      let checkboxContainer = {
        position: "relative",
        zIndex: "10",
        left: "40%"
      }

      let signInButton = {
        background: "rgba(255, 255, 255, 0.5)",
        color: "white",
        borderRadius: "10px"
      }

      let buttonContainer = {
        position: "relative",
        zIndex: "10",
        left: "34%",
        top: "0",
      }

        return (
            <div style={signInContainer}>
              <input
                style={inputStyle}  
                type="text"
                onChange={this.updateEmail}
                placeholder="Email"
                required
              />

              <input
                style={inputStyle}
                type="text"
                onChange={this.updatePassword}
                placeholder="Password"
                required
              />

              <div style={dispatcherTextContainer}><label style={dispatcherText}>If you are a dispatcher, check this box:</label></div>

              <div style={checkboxContainer}><input type="checkbox" onChange={this.toggleDispatcher} /></div>

              <div style={buttonContainer}><button style={signInButton} onClick={this.handleSignIn}>Sign In</button></div>
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
