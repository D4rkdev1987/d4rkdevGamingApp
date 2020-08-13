import React, { Component } from 'react';
import moment from "moment";

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <div>
          {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </div>
        <h1>D4rkdev Gaming</h1>
        <h2>Coding Tutorials and Gaming</h2>
      </div>
    );
  }
}
