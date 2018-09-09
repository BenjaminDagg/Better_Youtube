import React, { Component } from 'react';
import {VideoContainer} from "../VideoContainer/VideoContainer";
import "./ResultTable.css";
/*
This component is the left side panel that contains
filtrs to filter the job results
 */
export class ResultList extends Component {

    constructor(props) {
        super(props);


        this.videoList = this.videoList.bind(this);

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
            var videos = this.props.videos.map((video) => {
                console.log(video);

                return <VideoContainer  onClick={this.props.onVideoClicked} video={video} thumbnail={video.snippet.thumbnails.high.url}/>
            })

            return videos;
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

