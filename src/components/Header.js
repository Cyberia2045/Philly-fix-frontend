import React, { Component } from "react";

class Header extends Component {

	constructor() {
		super();
		this.state = {

		}
	}

	render() {

		let headerStyle = {
			position: "absolute",
			width: "100%",
			height: "120px",
			maxHeight: "20%",
			marginTop: "-25px",
			backgroundColor: "rgba(10,10,10,0.9)"
		}

		let headerText = {
			color: "white",
			padding: "10px"
		}

		return(
				<div style={headerStyle}>
					<h1 style={headerText}>Philly Fix</h1>
				</div>
			)

	}

}

export default Header;