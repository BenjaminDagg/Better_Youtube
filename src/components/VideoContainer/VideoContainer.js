import React, { Component } from 'react';
import "./VideoContainer.css";
import { config } from "../../models/config";
import axios from "axios";

/*
This component is the 'Job Board' logo on the top of
the page. When clicked returns to home page
 */
export class VideoContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            video: null

        };


    }



    drawVideo() {
        if (!this.state.video || !this.props.video) {
            return (<div>Loading...</div>)
        }
        else {
            return (
                <a >
                    <img src={this.props.thumbnail} />
                    <p>
                        <strong>
                            {this.props.video.snippet.title}
                        </strong>
                        <br />
                        <span>{this.props.video.snippet.channelTitle}</span>
                        <br/>

                    </p>
                </a>
            );
        }
    }

    //<iframe src={this.props.url} className="player" id={this.props.video.id.videoId} type="text/html" width="200" height="200"/>

    render() {
        return (
            <div class="video-container">
                <a >
                    <img src={this.props.thumbnail} />
                    <p>
                        <strong>
                            {this.props.video.snippet.title}
                        </strong>
                        <br />
                        <span>{this.props.video.snippet.channelTitle}</span>
                    </p>
                </a>
            </div>
        );
    }
}

