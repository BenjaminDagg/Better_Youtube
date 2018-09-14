import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import {VideoContainer} from "../VideoContainer/VideoContainer";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { VideoInfo } from "../VideoInfo/VideoInfo";
import "./VideoSide.css";
/*
This component is the 'Job Board' logo on the top of
the page. When clicked returns to home page
 */
export class VideoSide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            video: null
        };

        this.close = this.close.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.getVideo = this.getVideo.bind(this);
    }


    getVideo(id) {


        //get the video object
        for (var i = 0; i < this.props.videos.length;i++) {
            if (this.props.videos[i].id == id) {
                this.setState({video: this.props.videos[i]});
                break;
            }
        }
    }


    componentDidMount() {
        var id = this.props.selectedVideo;

        this.getVideo(id);
    }


    componentWillReceiveProps(nextProps) {
        var id = nextProps.selectedVideo;

        //get the video object
        this.getVideo(id);
    }

    renderVideo() {
        if (!this.props.selectedVideo || this.props.video != null) {
            return (
                <div>Loading...</div>
            )
        }

        else {



            var url = "https://www.youtube.com/embed/" + this.state.video.id;
            return (
                <iframe src={url} className="player" id={this.state.video.id} type="text/html" width="200" height="200"/>
            )
        }
    }


    close() {
        this.props.onVideoPlayerClose();
    }

    render() {



        //var video = this.renderVideo();
        //<iframe src={"https://www.youtube.com/embed/" + this.props.selectedVideo} className="player" id={this.props.selectedVideo} type="text/html" width="200" height="200"/>
        return (
            <div style={this.props.style} id="video-bar">
                {this.state.video &&
                    <VideoPlayer  height={'400px'} width={'70%'} id={this.state.video.id}/>
                }
                {this.state.video &&
                    <VideoInfo video={this.state.video}/>
                }
                <button onClick={this.close} id="video-close">X</button>

            </div>
        );
    }
}

