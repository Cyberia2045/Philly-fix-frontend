import React, { Component } from "react";
import axios from "axios";
import Issues from "./Issues";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            neighborhood: "",
            category: "",
            issues: [],
            searchResults: []
        }
        this.updateCategory = this.updateCategory.bind(this);
        this.updateNeighborhood = this.updateNeighborhood.bind(this);
        this.runSearch = this.runSearch.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            issues: newProps.issues
        });
        console.log(newProps);
        console.log(this.state);
    }

    render() {
		let neighborhoods = this.props.neighborhoods.map(function(neighborhood, index) {
    		return(
    			<option key={index} value={neighborhood}>{neighborhood}</option>
    		);
		});

		let categories = this.props.categories.map(function(category, index) {
			return(
				<option key={index} value={category}>{category}</option>
			);
		});

		return(
			<div className="search-container">
                <div>
                    Filter by category and/or neighborhood:                    
                </div>
				<select onChange={this.updateCategory} value={this.state.category}>
					{categories}
				</select>
				<select onChange={this.updateNeighborhood} value={this.state.neighborhood}>
					{neighborhoods}
				</select>
                <button onClick={this.runSearch}>Search</button>
                <Issues issues={this.state.searchResults} />
			</div>
		)
    }

    runSearch() {
        let neighborhood = this.state.neighborhood;
        let category = this.state.category;
        let results = this.props.issues;
        results = results.filter(function(issue) {
            return issue.neighborhood === neighborhood || neighborhood === ''
        });
        results = results.filter(function(issue) {
            return issue.category === category || category === ''
        });
        this.setState({
            searchResults: results
        });
    }

	updateNeighborhood(event) {
		this.setState({neighborhood: event.target.value});
	}

	updateCategory(event) {
		this.setState({category: event.target.value});
	}
}

export default Search;
