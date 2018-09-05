import React, { Component } from 'react';
import "./NavBar.css";

/*
This component is the 'Job Board' logo on the top of
the page. When clicked returns to home page
 */
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

