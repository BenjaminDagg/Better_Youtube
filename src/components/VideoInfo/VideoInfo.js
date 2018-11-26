import React, { Component } from 'react';
import "./VideoInfo.css";
import {LikeBar} from "../LikeBar/LikeBar";
import axios from "axios";
import {config} from "../../models/config";

/*
This component displays information for a video on
the video side including title, rating, and description
 */
export class VideoInfo extends Component {


    constructor(props) {
        super(props);

        this.state = {
            channel: null,
            showDescription: false,
            descBtnText: "Show More " + '\u25BC'
        };

        this.parseNumbers = this.parseNumbers.bind(this);
        this.getChannelInfo = this.getChannelInfo.bind(this);
        this.getDate = this.getDate.bind(this);
        this.toggleDescription = this.toggleDescription.bind(this);
    }



    componentDidMount() {

        if (this.props.video) {
            var id = this.props.video.snippet.channelId
            this.getChannelInfo(id);

        }

    }


    componentWillReceiveProps(nextProps) {
        var id = nextProps.video.snippet.channelId;

        this.setState({channel:null}, () => {
            this.getChannelInfo(id)
        });


    }


    getChannelInfo(id) {

        if (!this.props.video) {
            return;
        }

        var baseUrl = "https://www.googleapis.com/youtube/v3/channels?id=";

        axios.get(baseUrl + id +
            '&key=' + config.apiKey + '&part=snippet,contentDetails,statistics,status')
            .then(response => {
                console.log(response);
                this.setState({channel: response.data});

            });

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



    getDate(iso) {
        var date = iso.substring(5,7) + "/" + iso.substring(8,10) + "/" + iso.substring(0,4);

        return date;
    }


    toggleDescription() {
        console.log(this.state.channel);
        var dwnArrow = '\u25BC';
        var upArrow = 	'\u25B2';
        var descriptionBtn = document.getElementById('description-btn');
        var description = document.getElementById('desc');

        if (this.state.showDescription == true) {
            description.style.display = 'none';
            descriptionBtn.text = "Show More " + dwnArrow;
            this.setState({showDescription: false});
            this.setState({descBtnText: "Show More " + dwnArrow })
        }
        else {
            console.log('in');
            description.style.display = 'block';
            descriptionBtn.text = "Show Less " + upArrow;
            this.setState({showDescription: true});
            this.setState({descBtnText: "Show Less " + upArrow })
        }
    }



    render() {
        return (
            <div class="video-info">

                <strong class="video-info-title">
                    {this.props.video.snippet.title}
                </strong>
                <br />
                <br />
                <span class="video-info-views">{this.parseNumbers(this.props.video.statistics.viewCount) + " views"}</span>
                <div class="video-info-like-container">
                    <span id="video-info-like">	&#x1f44d; {this.parseNumbers(this.props.video.statistics.likeCount)} </span>
                    <span id="video-info-dislike"
                        >	&#x1f44e; {this.parseNumbers(this.props.video.statistics.dislikeCount)} </span>
                    <br />
                    <br />
                    <div style={{'height': '10px', "width" : '100%'}}>
                        <LikeBar likes={this.props.video.statistics.likeCount} dislikes={this.props.video.statistics.dislikeCount}/>
                    </div>

                </div>

                <div id="channel-container">
                    {this.state.channel &&
                        <img src={this.state.channel.items[0].snippet.thumbnails.default.url} />
                    }
                    {this.state.channel &&


                    <a href={"/channel/" + this.state.channel.items[0].id}><strong  class="channel-link" id="channel-title">{this.state.channel.items[0].snippet.title}</strong></a>

                    }
                    <br />
                    {this.state.channel &&
                        <span class="channel-stat">Published {this.getDate(this.props.video.snippet.publishedAt)}</span>

                    }
                    <br />
                    {this.state.channel &&
                    <span class="channel-stat">{this.parseNumbers(this.state.channel.items[0].statistics.subscriberCount)} Subscribers</span>

                    }
                    <br />
                    <br />
                    {this.state.channel &&
                        <button type="button" onClick={this.toggleDescription} id="description-btn" class="description-btn">{this.state.descBtnText}</button>
                    }

                    {this.state.channel &&
                        <p id="desc" class="channel-stat">{this.props.video.snippet.description}</p>

                    }

                </div>

            </div>
        );
    }
}

