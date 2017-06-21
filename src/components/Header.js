import React, { Component } from "react";
import "../css/header.css";

class Header extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="headerStyle">
                <h1 className="headerText">Philly Fix</h1>
            </div>
        );
    }
}

export default Header;
