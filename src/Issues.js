import React from 'react';

function Issues(props) {

let issues = this.props.issues.map(function(issue) {
	
	return(
		<div>
			<div>{props.category}</div>
			<div>{props.neighborhood}</div>
			<div>{props.image}</div>
			<div>{props.lat}</div>
			<div>{props.lng}</div>
			<div>{props.description}</div>
			<div>{props.status}</div>
			
		</div>
		)}		
	)

	return(
		<div>
			<div>{issues}</div>
		</div>
	)
}

export default Issues;