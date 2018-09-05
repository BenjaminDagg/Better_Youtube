import React, { Component } from 'react';
import { SearchInput } from "../SearchInput/SearchInput";
import "./VideoTable.css";
import { ResultList } from "../ResultBar/ResultList";
import { config } from "../../models/config";
import {VideoContainer} from "../VideoContainer/VideoContainer";
import axios from "axios";


/*
This component is the container for the entire application
 */
export class VideoTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
          gapiLoaded: false,
          searchText: "",
          videos: []
        };

        this.getVideos = this.getVideos.bind(this);
        this.onSearchChanged = this.onSearchChanged.bind(this);

    }



    componentDidMount() {
        //load youtube js client library
        window.gapi.load("client", this.initAPI);
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
                    this.setState({gapiLoaded: true});
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
        });

    }


    getVideos() {

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




        /*
        axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'contentDetails',
                type: 'video',
                key: config.apiKey,
                q: this.state.searchText
            }
        })
            .then(response => {
                console.log(response);
            });
        */




    }



    render() {
        return (
            <div id="job-board">

                {this.state.gapiLoaded &&
                    <ResultList videos={this.state.videos}/>
                }
                {this.state.gapiLoaded &&
                <SearchInput onSearchChanged={this.onSearchChanged}/>
                }
            </div>
        );
    }
}

