import React, { useState, useEffect } from "react";


import TopBar from "../component/topbar";
import VideoBox from "../component/videobox";
import "../style/videobox.css";
import "../style/videos-list.css";


function Channel() {

    const username = window.location.pathname.replace("/channel/","");

    const  [videos,setVideos] = useState([]);
   
    const init = async () => {


        if (username != null){

            const request = await fetch("/channel/videos/" + username);
            
            const data = await request.json();

            data["videos"].forEach(video => {

                video.img = "http://localhost:3000/thumbnail/" + video["thumbnail"];

            });

            setVideos(data["videos"]);
            
        }
        
        


    };

    useEffect(() => {

        (async () => {
            await init();
    

            
        })();


    },[]);


    return (

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
    

    );



}












export default Channel;