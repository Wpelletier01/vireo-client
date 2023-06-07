import React, { Component,useEffect,useState} from "react";

import TopBar from "../component/topbar";
import VideoBox from "../component/videobox";
import "../style/videos-list.css";

function Home() {

    const [videoChunk,setVideoChunk] = useState(1);
    const [videos,setVideos] = useState([]);
    
    const init = async () => {

        const r = await fetch("/videos/" +  videoChunk);
        const v = await r.json();

        

        v["videos"].forEach(video => {

            video.img = "http://localhost:3000/thumbnail/" + video["thumbnail"];
            
        }); 
    
            


      
    
 
      
        setVideos(v["videos"])
        

    }

    

    useEffect(() => {
        
        (async () => {
            await init();
    

            
        })();

    },[]);

    return ( 
            
             
        <div>
            <TopBar/>
            <p>We are home</p>
            <div className="videos-list">
            { videos.map(video => (
                <VideoBox 
                    thumbnail={video["img"]} 
                    title={video["title"]} 
                    channel={video["channel"]}
                />))
            }

            </div>
      
        </div>



    );


    



}


export default Home;