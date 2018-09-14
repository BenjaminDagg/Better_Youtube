import React, { Component } from 'react';
import "./VideoPlayer.css";

/*
This component is the 'Job Board' logo on the top of
the page. When clicked returns to home page
 */
export class VideoPlayer extends Component {
    render() {

        const baseUrl = "https://www.youtube.com/embed/";

        var style={
            'width' : this.props.width,
            'height' : this.props.height
        };

        return (
            <div class="video-player" style={style}>
                <iframe src={baseUrl + this.props.id +"?autoplay=1"} className="player" id={this.props.id} type="text/html" width="100%" height="100%"/>
            </div>
        );
    }
}

