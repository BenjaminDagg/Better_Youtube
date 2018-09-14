import React, { Component } from 'react';
import "./LikeBar.css";

/*
This component is the 'Job Board' logo on the top of
the page. When clicked returns to home page
 */
export class LikeBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var likes = parseInt(this.props.likes);
        var dislikes = parseInt(this.props.dislikes);
        var total = likes + dislikes;

        var likeBarStyle = {
            'width' : parseInt((likes / total) * 100).toString() + "%",
            'height': '100%'

        };

        var dislikeBarStyle = {
            'width' : parseInt((dislikes / total) * 100).toString() + "%",
            'height': '100%'

        };

        return (



            <div class="likebar">
                <div style={likeBarStyle} class="likediv">

                </div>
                <div style={dislikeBarStyle} class="dislikediv">

                </div>
            </div>
        );
    }
}

