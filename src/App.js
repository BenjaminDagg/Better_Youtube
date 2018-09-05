import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from "./components/NavBar/NavBar.js";
import { JobBoard } from "./components/JobBoard/JobBoard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
          <JobBoard/>
      </div>
    );
  }
}

export default App;
