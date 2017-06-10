import React, { Component } from 'react';

class IssuesForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			neighborhoods: "West Philadelphia",
			categories: "Debris",
			description: ""
		}

		this.updateNeighborhood = this.updateNeighborhood.bind(this);
		this.updateCategory = this.updateCategory.bind(this);
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
				<select onChange={this.updateCategory} name="category">
					{categories}
				</select>
				<select onChange={this.updateNeighborhood} name="neighborhoods">
					{neighborhoods}
				</select>
				<textarea className="issues-description" rows="5" cols="50" maxLength="140" required placeholder="What Fix Does Philly Need?" onChange={this.updateDescription}></textarea>
				<div><button onClick={this.handleCreateIssue}>Add Your Issue</button></div>
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

	// clearDescription(event) {
	// 	this.setState({})
	// }

	handleCreateIssue() {
	    this.props.createIssue({
		    neighborhood: this.state.neighborhood,
		    category: this.state.category,
		    description: this.state.description
	  }) 
	}

}

export default IssuesForm;