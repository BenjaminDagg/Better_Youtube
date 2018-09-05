import React, { Component } from 'react';
import "./SearchInput.css";

/*
This component is the search inputs for job
title and location at the top of the page
 */
export class SearchInput extends Component {
    render() {
        return (
            <div id="search-input">
                <div class="job-search-container">
                    <span class="search-input-top-text"> What</span>
                    <input placeholder="Search a job" class="search-input"/>
                    <span class="search-input-btm-text">job title, keywords or company</span>
                </div>
                <div className="job-search-container">
                    <span className="search-input-top-text"> Where</span>
                    <input placeholder="Enter location" className="search-input"/>
                    <span className="search-input-btm-text">City, state, zipcode</span>
                </div>
                <button id="search-btn">Search</button>
            </div>


        );
    }
}

