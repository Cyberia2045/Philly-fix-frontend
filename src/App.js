import React, { Component } from 'react';
import IssuesForm from './IssuesForm'
import neighborhoods from './neighborhoods';
import categories from './categories';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <IssuesForm neighborhoods={neighborhoods} categories={categories} createIssue={this.createIssue} />
      </div>
    );
  }

  createIssue(issue) {
    axios.post("/issues", {
      issue: issue
    }).then(
      function(response) {
        console.log(response);
      }
    );
  }

}

export default App;
