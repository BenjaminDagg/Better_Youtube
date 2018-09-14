import React, { Component } from 'react';
import "./VideoContainer.css";
import { config } from "../../models/config";
import axios from "axios";
import { LikeBar } from "../LikeBar/LikeBar";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

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
        this.onClick = this.onClick.bind(this);
        this.getDate = this.getDate.bind(this);
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



    onClick() {

        this.props.onClick(this.props.video.id);
    }


    getDate(iso) {
        var date = iso.substring(5,7) + "/" + iso.substring(8,10) + "/" + iso.substring(0,4);

        var hourInt = parseInt(iso.substring(11,13));
        if (hourInt > 12) {
            hourInt = 24 - hourInt;
        }
        if (hourInt < 1) {
            hourInt = 12;
        }



        var minInt = parseInt(iso.substring(14,16));
        if (minInt < 10) {
            minInt = "0" + minInt;
        }

        var tod = hourInt < 12 ? 'AM' : 'PM';

        date += " " + hourInt + ":" + minInt + " " + tod;

        return date;
    }


    //<iframe src={this.props.url} className="player" id={this.props.video.id.videoId} type="text/html" width="200" height="200"/>

    render() {

        return (
            <div class="video-container">
                <Link to={"/video/" + this.props.video.id} onClick={this.onClick} >
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
                        <span> Published {this.getDate(this.props.video.snippet.publishedAt)}</span>
                        <br />
                        <span class="likes">	&#x1f44d; {this.parseNumbers(this.props.video.statistics.likeCount)} </span>
                        <span
                            className="likes">	&#x1f44e; {this.parseNumbers(this.props.video.statistics.dislikeCount)} </span>
                        <br/>
                        <div style={{'height': '10px', "width" : '125px'}}>
                            <LikeBar likes={this.props.video.statistics.likeCount} dislikes={this.props.video.statistics.dislikeCount}/>
                        </div>
                    </p>
                </Link>
            </div>
        );
    }
}

