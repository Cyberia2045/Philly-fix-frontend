import React, { Component } from "react";
import Issues from "./Issues";
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            neighborhood: "",
            category: "",
            issues: [],
            searchResults: [],
            user: null,
            dispatcher: false
        }
        this.updateCategory = this.updateCategory.bind(this);
        this.updateNeighborhood = this.updateNeighborhood.bind(this);
        this.runSearch = this.runSearch.bind(this);
        this.loadIssues = this.loadIssues.bind(this);
        this.followIssue = this.followIssue.bind(this);
        this.unfollowIssue = this.unfollowIssue.bind(this);
        this.resolveIssue = this.resolveIssue.bind(this);
        this.unresolveIssue = this.unresolveIssue.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            issues: newProps.issues,
            user: newProps.user,
            dispatcher: newProps.dispatcher
        });
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
                <Issues
                    issues={this.state.searchResults}
                    user={this.state.user}
                    dispatcher={this.state.dispatcher}
                    resolveIssue={this.resolveIssue}
                    unresolveIssue={this.unresolveIssue}
                    followIssue={this.followIssue}
                    unfollowIssue={this.unfollowIssue}
                />
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
    resolveIssue(params) {
        axios.post('/issue_dispatchers', {
            issue_dispatcher: params
        }).then(function(response) {
            this.setState({issues: response.data})
            this.loadIssues();
            this.runSearch();
        }.bind(this));
    }

    unresolveIssue(params) {
        axios.delete('/issue_dispatchers/' + params.issue_id, {
            params: {
                dispatcher_id: params.dispatcher_id
            }
        }).then(function(response) {
            this.setState({issues: response.data});
            this.loadIssues();
            this.runSearch();
        }.bind(this));
    }

    followIssue(params) {
        axios.post('/issue_users', {
            issue_user: params
        }).then(function(response) {
            this.setState({issues: response.data});
            this.loadIssues();
            this.runSearch();
        }.bind(this));
    }

    unfollowIssue(params) {
        axios.delete('/issue_users/' + params.issue_id, {
            params: {
                user_id: params.user_id
            }
        }).then(function(response) {
            this.setState({ issues: response.data });
            this.loadIssues();
        }.bind(this));
    }

    loadIssues() {
        axios.get("/issues").then(
            function(response) {
                this.setState({
                    issues: response.data
                });
                this.runSearch();
            }.bind(this)
        );
    }
}

export default Search;
