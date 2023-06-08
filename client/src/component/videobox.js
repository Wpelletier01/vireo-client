

import React, {useState} from "react";
import "../style/videobox.css";
import nothumb from "../assets/thumbnail.png";

const MAX_LENGTH_TITLE = 23;

function VideoBox({thumbnail,title,channel,vhash}) {

    
    const [videohash,setVideoHash] = useState(vhash);

    var ctitle = "";

    if (title.length >= MAX_LENGTH_TITLE) {

        ctitle = title.substring(0,MAX_LENGTH_TITLE + 1) + "...";
    } else {

        ctitle = title;
    }

    return (
        <a href={`/video/${vhash}`} className="box">
        
            <img className="thumbnail" src={thumbnail} alt="video thumbnail"/>
            <p href="/home" className="title">{ctitle}</p>
            <p href={`/channel/${channel}`} className="channel">{channel}</p>
                    
        </a>

    );


}


export default VideoBox;