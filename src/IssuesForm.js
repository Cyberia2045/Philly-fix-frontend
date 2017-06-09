import React, { Component } from 'react';
import neighborhoods from './neighborhoods';
import categories from './categories';

class IssuesForm {

	constructor(props) {
		super(props)
	}

	render() {

		let neighborhoods = neighborhoods.map(function(neighborhood, index) {

		return(
				<div>
					<option value={neighborhood}>{neighborhood}</option>
				</div>
			)
		})

		let categories = categories.map(function(category, index) {

			return(
					<div>
						<option value={category}>{category}</option>
					</div>
				)

		})
	
		return(
			<div className="issues-form-container">
				<select name="category">
					{categories}
				</select>
				<select name="neighborhoods">
					{neighborhoods}
				</select>
				<textarea rows="5" cols="50" maxlength="140" required placeholder="What Fix Does Philly Need?" />
				<div><button>Add Your Issue</button></div>
			</div>
			)

	}



}

export default IssuesForm;