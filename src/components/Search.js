import React, { Component } from "react";
import "../css/search.css";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            neighborhood: "",
            category: "",
            viewUserIssues: false
        };
        this.resetSearch = this.resetSearch.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateNeighborhood = this.updateNeighborhood.bind(this);
        this.handleRunSearch = this.handleRunSearch.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({viewUserIssues: nextProps.viewUserIssues});
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
            <div className="search-container flex">
                <div>
                    Filter by category and/or neighborhood:
                </div>
                <select
                    className="search-category"
                    onChange={this.updateCategory}
                    value={this.state.category}
                >
                    {categories}
                </select>
                <select
                    className="search-neighborhood"
                    onChange={this.updateNeighborhood}
                    value={this.state.neighborhood}
                >
                    {neighborhoods}
                </select>
                <button onClick={this.handleRunSearch}>Search</button>
                <button onClick={this.resetSearch}>Reset</button>
            </div>
        );
    }

    resetSearch() {
        this.setState({
            neighborhood: "",
            category: ""
        });
        this.props.runSearch({
            neighborhood: "",
            category: ""
        });
        this.props.resetSearch();
    }

    handleRunSearch() {
        this.props.runSearch({
            neighborhood: this.state.neighborhood,
            category: this.state.category,
            viewUserIssues: this.state.viewUserIssues
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
