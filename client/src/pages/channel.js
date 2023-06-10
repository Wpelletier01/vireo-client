import React, { useState, useEffect } from "react";


import TopBar from "../component/topbar";
import VideoBox from "../component/videobox";
import ErrCode from "./error";

import "../style/videobox.css";
import "../style/videos-list.css";


function Channel() {

    const username = window.location.pathname.replace("/channel/","");
    
    const  [errStats,setErrStat] = useState(null)
    const  [videos,setVideos] = useState([]);
   
    const init = async () => {


        if (username != null){

            const request = await fetch("/videos/channel/" + username);
            
            if (!request.ok) {

                setErrStat([request.status, request.statusText]);

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


    return (

        <div>

            { (errStats != null) && <ErrCode code={errStats[0]} reason={errStats[1]}/>}
            { (errStats == null) &&
                <div>
                    <TopBar/>
                    { (username != null) && <p>{username}</p>}
                    {(localStorage.getItem("user") === username) && <a href="/upload">Upload</a> }
                    <div className="videos-list">
                    { videos.map(video => (
                        <VideoBox 
                            thumbnail={video["img"]} 
                            title={video["title"]} 
                            channel={video["channel"]}
                            vhash={video["hpath"]}
                            upload={video["date"]}
                            sh_channel={false}
                        />))
                    }
    
                    </div>
                </div>
            }
        </div>
        
 

    );



}












export default Channel;