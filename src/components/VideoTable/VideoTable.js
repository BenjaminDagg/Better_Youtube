import React, { Component } from 'react';
import { SearchInput } from "../SearchInput/SearchInput";
import "./VideoTable.css";
import { ResultList } from "../ResultBar/ResultList";
import { config } from "../../models/config";
import {VideoContainer} from "../VideoContainer/VideoContainer";
import axios from "axios";
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import { VideoSide } from "../VideoSide/VideoSide";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

/*
This component is the container for the entire application
 */
export class VideoTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
          gapiLoaded: false,
          searchText: "",
          videos: [],
          searchHistory: [],
          selectedVideo: null,
          videoPlaying: false
        };

        this.getVideos = this.getVideos.bind(this);
        this.onSearchChanged = this.onSearchChanged.bind(this);
        this.setCookie = this.setCookie.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.getRelated = this.getRelated.bind(this);
        this.onVideoClicked = this.onVideoClicked.bind(this);
        this.onVideoPlayerClose = this.onVideoPlayerClose.bind(this);
    }



    componentDidMount() {
        /*
        //load youtube js client library
        window.gapi.load("client", this.initAPI);
        */

        //load youtube js client library
        let self = this;

        //insert script tag into document
        let scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = "https://apis.google.com/js/platform.js";
        //initilze api when the script is ready
        scriptTag.addEventListener("load", () => {
            window.gapi.load("client", self.initAPI);
        });
        //add script to page
        document.head.appendChild(scriptTag);



    }



    getRelated() {
        if (!this.state.gapiLoaded || this.state.videos.length > 0) {
            return;
        }

        //update cookie with new search
        var history = this.getCookie("searches");
        //cookie alkready exists
        if (history != "") {
            console.log(history);
            history = JSON.parse(history);
            this.setState({searchHistory: history});
            var randomIndex = Math.floor(Math.random() * Math.floor(history.length));
            this.setState({searchText: history[randomIndex]}, () => {
                this.getVideos();
            });

        }

    }


    //initialize youtube api with key and credentials
    initAPI = () => {
        window.gapi.client.init({
            discoveryDocs: config.discoveryDocs,
            apiKey: config.apiKey,
            scope: config.scope
        })
            .then(() => {
                window.gapi.client.load('youtube', 'v3', () => {


                    //update child components that api is laoded
                    this.setState({gapiLoaded: true}, () => {
                        this.getRelated();
                    });
                })
            })
    }


    //callback from SearchInput class
    //updates searchText state for all component
    /*
    text (string): new text of the search bar
     */
    onSearchChanged(text) {



        this.setState({searchText: text}, () => {
            this.getVideos();

            //add search to search history
            var searchHistory = this.state.searchHistory;
            searchHistory.push(text);
            this.setState({searchHistory: searchHistory});
            var json_val = JSON.stringify(searchHistory);
            this.setCookie("searches",json_val);
        });

    }






    getVideos() {

        console.log("search text: " + this.state.searchText);

        //delete all videos
        this.setState({videos: []});

        //capture context to use in promise
        var self = this;

        //search for videos of the given query
        var query = this.state.searchText;
        var request = window.gapi.client.youtube.search.list({
            q: query,
            part: 'snippet',
            type: 'video',
            field: '*'
        });
        request.execute(function(response) {

            //foreach video fetched call api to get info on the video
            var baseUrl = "https://www.googleapis.com/youtube/v3/videos?id=";

            for (var i = 0; i < response.items.length;i++) {

                //call api to get statistics
                axios.get(baseUrl + response.items[i].id.videoId +
                    '&key=' + config.apiKey + '&part=snippet,contentDetails,statistics,status')
                    .then(video => {

                        //response
                        var newItem = video.data.items[0];
                        //get current videos and add new one
                        var videos = self.state.videos;
                        videos.push(newItem);
                        self.setState({videos:videos});

                    });
            }



        });

    }



    setCookie(name,val) {


        document.cookie = name + "=" + val + '; path=/';
    }


    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }



    //callback from VideoContainer that sets the id of the clicked video
    onVideoClicked(id) {
        this.setState({videoPlaying: true});
        this.setState({selectedVideo: id});
    }


    onVideoPlayerClose() {
        this.setState({videoPlaying: false});
        this.setState({slectedVideo: null})
    }


    render() {


        var listStyle;
        var videoStyle;
        if (this.state.videoPlaying) {
            listStyle = {
                'width' : '50%',

            };
            videoStyle = {
                'width' : '50%',
                'visibility' : 'visible'
            };
        }
        else {
            listStyle = {
                'width':'100%'
            };

            videoStyle = {
                'display' : 'none',

            };
        }

        return (
            <div id="job-board">
                <script src="https://apis.google.com/js/client.js?onload=initAPI"></script>
              <Router>
                <div>
                {this.state.gapiLoaded &&
                    <ResultList style={listStyle} onVideoClicked={this.onVideoClicked} videos={this.state.videos}/>
                }
                {this.state.gapiLoaded &&
                <SearchInput onSearchChanged={this.onSearchChanged}/>
                }

                {this.state.videos.length != 0 && this.state.gapiLoaded && this.state.videoPlaying &&

                    <Route path={"/video/:id"} render={(props) => <VideoSide  {...props} style={videoStyle} onVideoPlayerClose={this.onVideoPlayerClose} videos={this.state.videos} selectedVideo={this.state.selectedVideo}/>} />

                }
                </div>
              </Router>

            </div>
        );
    }
}

