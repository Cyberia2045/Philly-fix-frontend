import React, { Component } from "react";
import axios from "axios";

class IssuesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            neighborhood: "",
            category: "",
            address: "",
            lat: "",
            lng: "",
            description: "",
            errorMsg: ""
        };

        this.updateNeighborhood = this.updateNeighborhood.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.handleCreateIssue = this.handleCreateIssue.bind(this);
    }

    render() {
        if (this.props.isOpen === false) return null;

        let neighborhoods = this.props.neighborhoods.map(function(
            neighborhood,
            index
        ) {
            return (
                <option key={index} value={neighborhood}>{neighborhood}</option>
            );
        });

        let categories = this.props.categories.map(function(category, index) {
            return <option key={index} value={category}>{category}</option>;
        });

        let modalStyle = {
            width: "80%",
            maxWidth: "600px",
            height: "100%",
            maxHeight: "250px",
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
            maxHeight: "100%",
            margin: "0 auto",
            marginTop: "5px"
        };

        let modalSelect = {
            backgroundColor: "rgba(255,255,255,0.8)"
        };

        let modalStyleAddress = {
            backgroundColor: "rgba(255,255,255,0.8)",
            width: "80%",
            maxWidth: "400px",
            borderRadius: "10px",
            marginTop: "5px"
        };

        let selectText = {
            color: "white",
            fontFamily: "Futura"
        };

        let modalStyleTextBox = {
            maxWidth: "100%",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "10px",
            marginTop: "5px"
        };

        let modalButton = {
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "10px"
        };

        return (
            <div style={modalStyle} className="issues-form-container">
                <div style={modalContainer}>
                    <div style={selectText}>Category: </div><select
                        style={modalSelect}
                        onChange={this.updateCategory}
                        name="category"
                        value={this.state.categories}
                    >
                        {categories}
                    </select>
                    <div style={selectText}>Neighborhood: </div><select
                        style={modalSelect}
                        onChange={this.updateNeighborhood}
                        name="neighborhoods"
                        value={this.state.neighborhoods}
                    >
                        {neighborhoods}
                    </select>
                    <div>
                        <input
                            style={modalStyleAddress}
                            type="text"
                            onChange={this.updateAddress}
                            placeholder="Street address"
                            value={this.state.address}
                        />
                    </div>
                    <textarea
                        style={modalStyleTextBox}
                        rows="5"
                        cols="50"
                        maxLength="140"
                        required
                        placeholder="What Fix Does Philly Need?"
                        onChange={this.updateDescription}
                        value={this.state.description}
                    />
                    <form action="" encType="multipart/form-data">
                        <div>Upload a photo:</div>
                        <input
                            type="file"
                            name="picture"
                            defaultValue="fileName"
                        />
                    </form>
                    <div>
                        <button
                            style={modalButton}
                            onClick={this.handleCreateIssue}
                        >
                            Add Your Issue
                        </button>
                    </div>
                    <div>{this.state.errorMsg}</div>
                </div>
            </div>
        );
    }

    updateNeighborhood(event) {
        this.setState({ neighborhood: event.target.value });
    }

    updateCategory(event) {
        this.setState({ category: event.target.value });
    }

    updateDescription(event) {
        this.setState({ description: event.target.value });
    }

    updateAddress(event) {
        this.setState({ address: event.target.value });
    }

    handleCreateIssue() {
        if (this.state.category === "") {
            this.setState({
                errorMsg: "You must choose a category."
            });
            return;
        }
        if (this.state.neighborhood === "") {
            this.setState({
                errorMsg: "You must choose a neighborhood."
            });
            return;
        }
        console.log(this.state);

        var encodedAddress = encodeURIComponent(
            this.state.address + this.state.neighborhood
        );
        console.log(encodedAddress);
        var geocodeUrl =
            "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            encodedAddress;
        axios.get(geocodeUrl).then(
            function(response) {
                if (response.data.status === "ZERO_RESULTS") {
                    this.setState({ errorMsg: "Address not found." });
                    return;
                }
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;
                let address = response.data.results[0].formatted_address;
                console.log(lat, lng, address);
                this.props.createIssue({
                    neighborhood: this.state.neighborhood,
                    category: this.state.category,
                    lat: lat,
                    lng: lng,
                    address: address,
                    description: this.state.description
                });
                this.setState({ description: "", address: "", errorMsg: "" });
            }.bind(this)
        );
    }
}

export default IssuesForm;
