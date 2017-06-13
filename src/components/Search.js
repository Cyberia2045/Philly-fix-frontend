import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            neighborhood: "",
            category: ""
        };
        this.updateCategory = this.updateCategory.bind(this);
        this.updateNeighborhood = this.updateNeighborhood.bind(this);
        this.handleRunSearch = this.handleRunSearch.bind(this);
    }

    render() {
        let neighborhoods = this.props.neighborhoods.map(function(
            neighborhood,
            index
        ) {
            return (
                <option key={index} value={neighborhood}>{neighborhood}</option>
            );
        });
        let categories = this.props.categories.map(function(category, index) {
            return <option key={index} value={category}>{category}</option>;
        });

        return (
            <div className="search-container">
                <div>
                    Filter by category and/or neighborhood:
                </div>
                <select
                    onChange={this.updateCategory}
                    value={this.state.category}
                >
                    {categories}
                </select>
                <select
                    onChange={this.updateNeighborhood}
                    value={this.state.neighborhood}
                >
                    {neighborhoods}
                </select>
                <button onClick={this.handleRunSearch}>Search</button>
            </div>
        );
    }

    handleRunSearch() {
        this.props.runSearch({
            neighborhood: this.state.neighborhood,
            category: this.state.category
        });
    }

    updateNeighborhood(event) {
        this.setState({ neighborhood: event.target.value });
    }

    updateCategory(event) {
        this.setState({ category: event.target.value });
    }
}

export default Search;
