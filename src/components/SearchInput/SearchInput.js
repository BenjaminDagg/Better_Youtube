import React, { Component } from 'react';
import "./SearchInput.css";

/*
This component is the search inputs for job
title and location at the top of the page
 */
export class SearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }



    //event when search button is clicked
    handleSearch() {
        if (this.state.text === "") {
            return;
        }
        else {
            this.props.onSearchChanged(this.state.text);
        }
    }


    //event triggered when search bar text changes
    onTextChange(event) {
        this.setState({text: event.target.value});
    }


    render() {
        return (
            <div id="search-input">
                <div id="job-input" class="job-search-container">
                    <span class="search-input-top-text"></span>
                    <input onChange={this.onTextChange} value={this.state.text} id="searchInput" placeholder="Search videos" class="search-input"/>
                    <span class="search-input-btm-text">Search for videos or channels</span>
                </div>

                <button onClick={this.handleSearch} id="search-btn">Search</button>
            </div>


        );
    }
}

