import React, { Component } from 'react';
import "./FilterButtons.css";
import {FilterTypes} from "../../models/FilterTypes";

/*
This component holds buttons that sort the video list by
various parameters
 */
export class FilterButtons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSort: false
        };

        this.toggleFilters = this.toggleFilters.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);

    }


    toggleFilters() {



        //filter is showing so hide it
        if (!this.state.showSort) {
            document.getElementById('sort-dropdown').style.display = "block";
            this.setState({showSort: true});
        }
        else {
            document.getElementById('sort-dropdown').style.display = "none";
            this.setState({showSort: false});
        }
    }



    onFilterClick(event) {
        //call parent callback to filter videos
        this.props.onFilterChange(event.target.value);

        //close dropdown box
        this.toggleFilters();
    }


    render() {
        return (
            <div id="filters">
                <button id="sort-btn" onClick={this.toggleFilters}>Sort By</button>
                <div id="sort-dropdown" className="dropdown">
                    <button value={FilterTypes.DATE} onClick={this.onFilterClick}>Date</button>
                    <button value={FilterTypes.VIEW_COUNT} onClick={this.onFilterClick}>Views</button>
                    <button value={FilterTypes.RATING} onClick={this.onFilterClick}>Rating</button>

                </div>
            </div>
        );
    }
}

