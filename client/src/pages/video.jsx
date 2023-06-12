import React, {useEffect,useState} from "react";

import TopBar from "../components/topbar";
import ErrorPage from "./error";
import NoPage from "./nopage";
import Footer from "../components/footer";

import "../style/video.css"

function Video() {

    const video  = window.location.pathname.replace("/video/","");

    const [errorCode, setErrorCode] = useState(0);
    const [dontExist,setDontExist] = useState(false);
    const [title,setTitle] = useState("");
    const [channel,setChannel] = useState("");
    const [description,setDescription] = useState("");
    

    useEffect(() => {

       
        (async () => {
            
            
            const resp = await fetch(`/v/${video}`);
                
            if (!resp.ok) {
                    
                    if (resp.status === 404 ) {
                        setDontExist(true);
                    } else {
                        setErrorCode(resp.status);
                    }
                    


            } else {

                const data = await resp.json();
                
                setTitle(data['response']['title']);
                setChannel(data['response']['channel']);
                setDescription(data['response']['description']);
                   

            }

                


            }
            
        )();
        

    },[]);

        const renderVideoPage = () => {

        if (dontExist) {

            return ( <NoPage/>);

        }



        return (
    
                <div className="pvideo">
                    <TopBar/>
                    <div className="video-player">
                        <video id="test" width="100%" controls autoPlay>
                            <source src={`/video/d/${video}`} type="video/mp4"/>
                        </video>
                    </div>
                    <div className="bottom-page">
                        <div class="textbox">
                            <p className="title">{title}</p>
                            <p className="channel">{channel}</p>
                            <p className="desc-title">Description:</p>
                            <p className="desc-content">{description}</p>

                        </div>
                    </div>
                    
                    <Footer/>
                </div>
         
           
        )

    }
 
    
    return (


        <div>
            
            {(errorCode !== 0) 

                ? <ErrorPage code={errorCode} />
                : renderVideoPage()

            }

                
        </div>  
           



    );

}





export default Video