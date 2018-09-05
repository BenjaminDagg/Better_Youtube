import React, { Component } from 'react';
import "./VideoContainer.css";
import { config } from "../../models/config";
import axios from "axios";
import { LikeBar } from "../LikeBar/LikeBar";

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

        this.parseNumbers = this.parseNumbers.bind(this);


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


    //converts a string of numbers into an easier
    //to read format
    /*
    num (string) => string
     */
    parseNumbers(n) {
        var n = ('' + n).split('.');
        var num = n[0];
        var dec = n[1];
        var r, s, t;

        if (num.length > 3) {
            s = num.length % 3;

            if (s) {
                t = num.substring(0,s);
                num = t + num.substring(s).replace(/(\d{3})/g, ",$1");
            } else {
                num = num.substring(s).replace(/(\d{3})/g, ",$1").substring(1);
            }
        }

        if (dec && dec.length > 3) {
            dec = dec.replace(/(\d{3})/g, "$1 ");
        }

        return num + (dec? '.' + dec : '');
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
                        <br/>
                        <span>{this.parseNumbers(this.props.video.statistics.viewCount) + " views"}</span>
                        <br/>
                        <span class="likes">	&#x1f44d; {this.parseNumbers(this.props.video.statistics.likeCount)} </span>
                        <span
                            className="likes">	&#x1f44e; {this.parseNumbers(this.props.video.statistics.dislikeCount)} </span>
                        <br/>
                        <div style={{'height': '10px', "width" : '50%'}}>
                            <LikeBar likes={this.props.video.statistics.likeCount} dislikes={this.parseNumbers(this.props.video.statistics.dislikeCount)}/>
                        </div>
                    </p>
                </a>
            </div>
        );
    }
}

