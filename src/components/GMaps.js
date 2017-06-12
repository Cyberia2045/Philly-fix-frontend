import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class GMap extends Component {

	constructor(props) {
		super(props);
		this.center={lat: 39.9524, lng: -75.1636}
		this.zoom=15;
		this.styles={position: "relative", width: "50vw", height: "50vh", left: "25%", top: "50px"};
	};

	render() {

		return(
				<GoogleMapReact	style={this.styles}
					bootstrapURLKeys={{key: "AIzaSyCFrQcAO1Xbv9gTVT9KLDFZnMZznSvhMg4"}}
					defaultCenter={this.center}
					defaultZoom={this.zoom}
				>

				</GoogleMapReact>

			);
	}
}

export default GMap;
