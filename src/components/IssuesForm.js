import React, { Component } from 'react';
import axios from 'axios';

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
		}

		this.updateNeighborhood = this.updateNeighborhood.bind(this);
		this.updateCategory = this.updateCategory.bind(this);
		this.updateAddress = this.updateAddress.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.handleCreateIssue = this.handleCreateIssue.bind(this);

	}

	render() {

		let neighborhoods = this.props.neighborhoods.map(function(neighborhood, index) {

		return(
					<option key={index} value={neighborhood}>{neighborhood}</option>
			)
		})

		let categories = this.props.categories.map(function(category, index) {

			return(
						<option key={index} value={category}>{category}</option>
				)

		})

		return(
			<div className="issues-form-container">
				<select onChange={this.updateCategory} name="category" value={this.state.categories}>
					{categories}
				</select>
				<select onChange={this.updateNeighborhood} name="neighborhoods" value={this.state.neighborhoods}>
					{neighborhoods}
				</select>
				<input type="text" onChange={this.updateAddress} placeholder="Street address" value={this.state.address}/>
				<textarea className="issues-description" rows="5" cols="50" maxLength="140" required placeholder="What Fix Does Philly Need?" onChange={this.updateDescription} value={this.state.description}></textarea>

				<form action="" encType="multipart/form-data">
					<div>Upload a photo:</div>
					<input type="file" name="picture" defaultValue="fileName"></input>
				</form>

				<div><button onClick={this.handleCreateIssue}>Add Your Issue</button></div>
				<div>{this.state.errorMsg}</div>
			</div>
		)
	}

	updateNeighborhood(event) {
		this.setState({neighborhood: event.target.value})
	}

	updateCategory(event) {
		this.setState({category: event.target.value})
	}

	updateDescription(event) {
		this.setState({description: event.target.value})
	}

	updateAddress(event) {
		this.setState({address: event.target.value})
	}

	handleCreateIssue() {
	      if(this.state.category === "") {
          this.setState({
            errorMsg: "You must choose a category."
          });
          return
          }
        if(this.state.neighborhood === "") {
          this.setState({
            errorMsg: "You must choose a neighborhood."
          });
          return
          }
		console.log(this.state);

		var encodedAddress = encodeURIComponent(this.state.address + this.state.neighborhood);
		console.log(encodedAddress);
		var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodedAddress;
		axios.get(geocodeUrl).then(function(response) {
			if (response.data.status === 'ZERO_RESULTS') {
				this.setState({errorMsg: "Address not found."});
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
			this.setState({ description: "", address: "", errorMsg: ""});
		}.bind(this));

	}

}

export default IssuesForm;
