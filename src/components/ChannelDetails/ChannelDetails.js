import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom';
import axios from "axios";
import {config} from "../../models/config";
import "./ChannelDetails.css";
import {VideoContainer} from "../VideoContainer/VideoContainer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import {ChannelHome} from "../ChannelHome/ChannelHome";
import {ResultList} from "../ResultBar/ResultList";
import {VideoTable} from "../VideoTable/VideoTable";

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});



/*
This component is the 'Job Board' logo on the top of
the page. When clicked returns to home page
 */
export class ChannelDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            channel: null,
            channelVideos: [],
            navIndex: 0
        };

        this.getChannelVideos = this.getChannelVideos.bind(this);
        this.sortVideosByDate = this.sortVideosByDate.bind(this);
        this.getChannelInfo = this.getChannelInfo.bind(this);
        this.parseNumbers = this.parseNumbers.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }


    componentDidMount() {
        var id = this.props.match.params.id;

        this.getChannelInfo(id);

        var self = this;
        this.getChannelVideos(id);

    }



    handleTabChange = (event,value) => {
        this.setState({navIndex: value});
    }


    getChannelInfo(id) {



        var baseUrl = "https://www.googleapis.com/youtube/v3/channels?id=";
        var self = this;
        axios.get(baseUrl + id +
            '&key=' + config.apiKey + '&part=snippet,contentDetails,statistics,status')
            .then(response => {
                console.log(response);
                self.setState({channel: response.data.items[0]});

            });

    }


    getChannelVideos(id) {
        var self = this;


        var url = "https://www.googleapis.com/youtube/v3/search?key=" + config.apiKey + "&channelId=" + id + "&part=snippet,id&maxResults=50";


        //get id's of all of channels videos
        axios.get(url)
            .then(response => {

                //go through each id and get info on the video
                var videoIds = response.data.items;
                var baseUrl = "https://www.googleapis.com/youtube/v3/videos?id=";
                var videos = new Array();
                for (var i = 0; i < videoIds.length; i++) {
                    axios.get(baseUrl + videoIds[i].id.videoId +
                        '&key=' + config.apiKey + '&part=snippet,contentDetails,statistics,status')
                        .then(video => {
                            videos = self.state.channelVideos;
                            //response
                            var newItem = video.data.items[0];
                            videos.push(newItem);
                            self.setState({channelVideos: videos},() => {
                                this.sortVideosByDate();
                            });

                        });

                }


            });
    }



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



    sortVideosByDate() {
        if (!this.state.channelVideos || this.state.channelVideos.length == 0) {
            return;
        }


        var videos = this.state.channelVideos;
        var sortedVideos = videos.sort(function(a,b) {
            var aDate = new Date(a.snippet.publishedAt);
            var bDate = new Date(b.snippet.publishedAt);
            return (a.snippet.publishedAt > b.snippet.publishedAt) ? -1 : ((a.snippet.publishedAt < b.snippet.publishedAt) ? 1 : 0);
        });

        this.setState({channelVideos: sortedVideos});
    }


    mostRecentVideo() {

        if(this.state.channelVideos.length == 0) {
            return;
        }

        this.sortVideosByDate();
        var video = this.state.channelVideos[0];

        return <VideoContainer   video={video} thumbnail={video.snippet.thumbnails.high.url}/>
    }


    render() {
        return (
            <div id="channel-page">
                <div id="channel-header">
                    {this.state.channel &&
                        <img id="channel-img" src={this.state.channel.snippet.thumbnails.high.url} />
                    }
                    {this.state.channel &&
                        <h2 class="channel-info">{this.state.channel.snippet.title}</h2>
                    }
                    {this.state.channel &&
                        <span class="channel-info">{this.parseNumbers(this.state.channel.statistics.subscriberCount)} Subscribers</span>

                    }
                    <AppBar position="static" id="channel-nav">
                        <Tabs value={this.state.navIndex} onChange={this.handleTabChange}>
                            <Tab label="Home"/>
                            <Tab label="Videos"/>
                        </Tabs>
                    </AppBar>
                    <div id="channel-content">
                        {this.state.navIndex == 0 && this.state.channel && this.state.channelVideos.length > 0 &&
                            <ChannelHome latestVideo={this.state.channelVideos[0]} likePlaylist={this.state.channel.contentDetails.relatedPlaylists.likes}/>
                        }
                        {this.state.navIndex == 1 && this.state.channelVideos.length > 0 &&
                           <VideoTable videos={this.state.channelVideos}/>
                        }

                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(ChannelDetails);

