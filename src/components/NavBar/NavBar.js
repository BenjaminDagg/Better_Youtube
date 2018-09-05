import React, { Component } from 'react';
import "./NavBar.css";

export class NavBar extends Component {
    render() {
        return (
            <div id="nav-bar">
                <a class="normal-link" href="/">
                    <span id="logo">Job Board</span>
                </a>
            </div>
        );
    }
}

