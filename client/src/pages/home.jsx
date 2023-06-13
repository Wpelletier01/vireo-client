import React, {useEffect,useState} from "react";
import TopBar from "../components/topbar";
import VideoBox from "../components/videobox";

import ErrCode from "./error";
import Footer from "../components/footer";

import "../style/videos-list.css";
import "../style/videobox.css";


function Home() {

    const [errorCode, setErrorCode] = useState(0);
    const [videos,setVideos] = useState([]);
    
    const init = async () => {

        const r = await fetch("/videos/all");

        if (!r.ok) {

            setErrorCode(r.status)
            
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
            {(errorCode === 0) 

                ?   <div>
                        <TopBar/>
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
                        <Footer/>
                    </div>
              
                :   <ErrCode code={errorCode}/>
            }


        </div>



    );


    



}


export default Home;