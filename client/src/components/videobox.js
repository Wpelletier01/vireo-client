

import React, {useState} from "react";
import "../style/videobox.css";
import nothumb from "../assets/thumbnail.png";

const MAX_LENGTH_TITLE = 30;

function VideoBox({thumbnail,title,channel,upload,vhash,sh_channel}) {

    var ctitle = "";

    if (title.length >= MAX_LENGTH_TITLE) {

        ctitle = title.substring(0,MAX_LENGTH_TITLE + 1) + "...";
    } else {

        ctitle = title;
    }



    return (
        <div className="vbox">
            <a className="thumbnail" href={`/video/${vhash}`}>
                <img src={thumbnail} alt="video thumbnail"/>
            </a>
            <div>
            <a href={`/video/${vhash}`} className="title">{ctitle}</a>
            { sh_channel && <a href={`/channel/${channel}`} className="channel">{channel}</a>}
            { (upload != null) && <p className="channel">{"upload at " + upload}</p> }       
            </div>
            
        </div>

    );


}


export default VideoBox;