import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChannelDetails } from "./components/ChannelDetails/ChannelDetails";
import { NavBar } from "./components/NavBar/NavBar.js";
import { VideoTable } from "./components/VideoTable/VideoTable";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar/>
          <Router>
            <div>
              <Route exact={true} path={"/"} render={() => <VideoTable/>} />
              <Route path="/channel/:id" component={ChannelDetails} />
            </div>
          </Router>

      </div>
    );
  }
}

export default App;
