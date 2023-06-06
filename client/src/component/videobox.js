

import React from "react";
import "../style/videobox.css";
import nothumb from "../assets/thumbnail.png";


function VideoBox() {




    return (
        <div>
            <a href="/home" class="box">

                <img className="thumbnail" src={nothumb} alt="video thumbnail"/>
                <a href="/home" className="title">Title</a>
                <a href="/channel" className="channel">Channel</a>
                
            </a>
        </div>

    );


}


export default VideoBox;