import React, { useState, useEffect } from "react";


import TopBar from "../components/topbar";
import VideoBox from "../components/videobox";
import ErrCode from "./error";

import "../style/channel.css";
import "../style/videobox.css";
import "../style/videos-list.css";


function Channel() {

    const username = window.location.pathname.replace("/channel/","");
    
    const  [errCode,setErrCode] = useState(0)
    const  [videos,setVideos] = useState([]);
   
    const init = async () => {


        if (username != null){

            const request = await fetch("/videos/channel/" + username);
            
            if (!request.ok) {

                setErrCode(request.status);

                console.log(
                    "adsdasda"
                )
            } else {

                const data = await request.json();

                data["response"].forEach(video => {

                    video.img = "http://localhost:3000/thumbnails/" + video["thumbnail"];

                });

                setVideos(data["response"]);


            }

        }
        
    };

    useEffect(() => {

        (async () => {
            await init();
    

            
        })();


    },[]);


    if (ErrCode !== 0)


    return (

       

            
        <div>
            <TopBar/>
                <div className="channel-info">
                    <img src={`http://localhost:3000/channel/picture/${username}`} alt="channel"/>
                    <div>
                        { (username != null) && <p className="channel-name">{username}</p>}
                        {(localStorage.getItem("user") === username) && <a href="/upload">Upload</a> }
                    </div>
                        
                </div>
    

                <div className="videos-list">
                    { videos.map(video => (
                        <VideoBox 
                            thumbnail={video["img"]} 
                            title={video["title"]} 
                            channel={video["channel"]}
                            vhash={video["thumbnail"]}
                            upload={video["date"]}
                            sh_channel={false}
                        />))
                    }
    
                </div>
            
            
        </div>
        
 

    );



}












export default Channel;