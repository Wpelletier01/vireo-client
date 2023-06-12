

import React, {useState} from "react";
import "../style/videobox.css";
import nothumb from "../assets/thumbnail.png";

const MAX_LENGTH_TITLE = 23;

function VideoBox({thumbnail,title,channel,upload,vhash,sh_channel}) {

    
    const [videohash,setVideoHash] = useState(vhash);


    var ctitle = "";

    if (title.length >= MAX_LENGTH_TITLE) {

        ctitle = title.substring(0,MAX_LENGTH_TITLE + 1) + "...";
    } else {

        ctitle = title;
    }

    return (
        <div className="box">
            <a className="thumbnail" href={`/video/${vhash}`}>
        
                <img src={thumbnail} alt="video thumbnail"/>
            </a>
            <a href={`/video/${vhash}`} className="title">{ctitle}</a>
            { sh_channel && <a href={`/channel/${channel}`} className="channel">{channel}</a>}
            { (upload != null) && <p className="channel">{"upload at " + upload}</p> }       
        </div>

    );


}


export default VideoBox;