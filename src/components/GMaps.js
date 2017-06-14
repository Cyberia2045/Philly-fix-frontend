import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const MarkerComponent = ({ text }) => (
    <div
        style={{
            position: "relative",
            color: "white",
            background: "red",
            height: 5,
            width: 5,
            top: -2.5,
            left: -2.5
        }}
    >
        {text}
    </div>
);

class GMap extends Component {
    constructor(props) {
        super(props);
        this.center = { lat: 39.9524, lng: -75.1636 };
        this.zoom = 12;
        this.styles = {
            position: "absolute",
            width: "53vw",
            height: "43vh",
            top: "140px"
        };
        this.state = {
            issues: props.issues
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ issues: nextProps.issues });
    }

    render() {
        let issues = this.state.issues.map(function(issue, key) {
            return <MarkerComponent lat={issue.lat} lng={issue.lng} />;
        });

        return (
            <GoogleMapReact
                style={this.styles}
                bootstrapURLKeys={{
                    key: "AIzaSyCFrQcAO1Xbv9gTVT9KLDFZnMZznSvhMg4"
                }}
                defaultCenter={this.center}
                defaultZoom={this.zoom}
            >

                {issues}

            </GoogleMapReact>
        );
    }
}

export default GMap;
