import React, { Component } from 'react';
import axios from "axios";
import {config} from "../../models/config";
import "./ChannelHome.css";
import {VideoPlayer} from "../VideoPlayer/VideoPlayer";
import {VideoInfo} from "../VideoInfo/VideoInfo";


/*
This component is the 'Job Board' logo on the top of
the page. When clicked returns to home page
 */
export class ChannelHome extends Component {


    constructor(props) {
        super(props);

        this.getLikedVideos = this.getLikedVideos.bind(this);
    }


    componentDidMount() {
        this.getLikedVideos();
    }


    getLikedVideos() {
        if (!this.props.likePlaylist) {
            return;
        }

        var baseUrl = "https://www.googleapis.com/youtube/v3/playlistItems?";

        axios.get(baseUrl +
            "part=snippet" +
            "&maxResults=50" +
            "&playlistId=" + this.props.likePlaylist +
            "&key=" + config.apiKey )


            .then(response => {
                console.log(response);


            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div id="channel-home-container">
                <h3 id="latest-vid-header">Latest Video</h3>
                <div id="home-video">
                    {this.props.latestVideo &&
                        <div id="video">
                            <VideoPlayer style={{'float' : 'left', 'position': 'relative'}}  height={'400px'} width={'100%'} id={this.props.latestVideo.id}/>
                        </div>
                    }
                    {this.props.latestVideo &&
                        <div id="videoinfo">
                            <VideoInfo video={this.props.latestVideo}/>
                        </div>
                    }


                </div>

            </div>
        );
    }
}

