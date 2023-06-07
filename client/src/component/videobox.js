

import React, {useState} from "react";
import "../style/videobox.css";
import nothumb from "../assets/thumbnail.png";


function VideoBox({thumbnail,title,channel}) {

   


    return (
        <div href="/home" className="box">
        
           
            <img className="thumbnail" src={thumbnail} alt="video thumbnail"/>
            <a href="/home" className="title">{title}</a>
            <a href="/channel" className="channel">{channel}</a>
                
            
        </div>

    );


}


export default VideoBox;