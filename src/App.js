import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from "./components/NavBar/NavBar.js";
import { VideoTable } from "./components/VideoTable/VideoTable";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
          <VideoTable/>
      </div>
    );
  }
}

export default App;
