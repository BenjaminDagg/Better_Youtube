import React, { Component } from 'react';
import { SearchInput } from "../SearchInput/SearchInput";
import "./JobBoard.css";

/*
This component is the container for the entire application
 */
export class JobBoard extends Component {
    render() {
        return (
            <div id="job-board">
                <SearchInput/>
            </div>
        );
    }
}

