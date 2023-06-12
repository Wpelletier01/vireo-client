import React, { Component,useEffect,useState} from "react";
import { Navigate } from "react-router-dom";
import TopBar from "../components/topbar";
import VideoBox from "../components/videobox";
import "../style/videos-list.css";
import "../style/videobox.css";
import ErrCode from "./error";


function Home() {

 
    const [redirect,setRedirect] = useState(null);
    const [videos,setVideos] = useState([]);
    
    const init = async () => {

        const r = await fetch("/videos/all");

        if (!r.ok) {

            setRedirect(r.status)
            
        } else {

            const v = await r.json();


            v["response"].forEach(video => {

                video.img = "http://localhost:3000/thumbnails/" + video["thumbnail"];
                
            }); 
        
                      
            setVideos(v["response"])


        }
        

    }

    

    useEffect(() => {
        
        (async () => {
            await init();
    

            
        })();

    },[]);

    return ( 
            
             
        <div>
            {redirect == null &&
            <div>
                <TopBar/>
                <p>We are home</p>
                <div className="videos-list">
                    { videos.map(video => (
                    <VideoBox 
                        thumbnail={video["img"]} 
                        title={video["title"]} 
                        channel={video["channel"]}
                        vhash={video["thumbnail"]}
                        upload={null}
                        sh_channel={true} 
                    
                    />))
                    }
                </div>
            </div>
              
            }

            {
                redirect != null && 
                <ErrCode 
                    code={redirect}
                />
            
            }

        </div>



    );


    



}


export default Home;