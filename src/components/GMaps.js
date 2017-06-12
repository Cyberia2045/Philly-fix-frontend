import React, { Component } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";

class GMap extends Component {

	// const MY_API_KEY = "AIzaSyCFrQcAO1Xbv9gTVT9KLDFZnMZznSvhMg4";

	constructor(props) {
		super(props);
		this.center={lat: 39.9524, lng: -75.1636}
		this.zoom=8
	};

	render() {

		return(
				<GoogleMapReact	
					bootstrapURLKeys={{key: "AIzaSyCFrQcAO1Xbv9gTVT9KLDFZnMZznSvhMg4"}}
					defaultCenter={this.center}
					defaultZoom={this.zoom}
				>

				</GoogleMapReact>

			);
	}
}

export default GMap;