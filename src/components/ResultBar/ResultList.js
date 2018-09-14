import React, { Component } from 'react';
import {VideoContainer} from "../VideoContainer/VideoContainer";
import "./ResultTable.css";
import { FilterTypes } from "../../models/FilterTypes";

/*
This component is the left side panel that contains
filtrs to filter the job results
 */
export class ResultList extends Component {

    constructor(props) {
        super(props);




        this.videoList = this.videoList.bind(this);
        this.sort = this.sort.bind(this);
    }


    sort() {





        this.props.videos.sort(function(a,b) {
            console.log(a);
            return (a.statistics.viewCount < b.statistics.viewCount) ? 1 :((b.statistics.viewCount < a.statistics.viewCount) ? -1 : 0);
        });


    }


    /*
    Takes the video array passed in as a prop and
    created an array of VideoContainer objects to display
     */
    videoList() {
        if (!this.props.videos) {
            return (<div>Loading...</div>)
        }
        else {



            var result = this.props.videos.map((video) => {


                return <VideoContainer  onClick={this.props.onVideoClicked} video={video} thumbnail={video.snippet.thumbnails.high.url}/>
            });

            return result;
        }
    }

    render() {

        var videos = this.videoList();



        return (
            <div style={this.props.style} id="result-bar">
                {videos}
            </div>
        );
    }



}

