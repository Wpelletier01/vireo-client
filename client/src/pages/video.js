import React, {useEffect,useState} from "react";

import TopBar from "../component/topbar";
import ErrCode from "./error";
import NoPage from "./nopage";


function Video() {

    const [errorCode, setErrorCode] = useState(null);
    const [nexist,setnExist] = useState(false);
    const [video,setVideo] = useState(null);
    const [title,setTitle] = useState("");
    const [channel,setChannel] = useState("");
    const [description,setDescription] = useState("");

    useEffect(() => {

       
        (async () => {
            
            setVideo(window.location.pathname.replace("/video/",""));
            
            if (video != null) {
                
                const resp = await fetch(window.location.pathname);

                
                if (!resp.ok) {

                    setErrorCode(resp.status);

                } else {
                             
                    const data = await resp.json();
                    
                    setTitle(await data['response']['title']);
                    setChannel(await data['response']['channel']);
                    setDescription(await data['response']['description']);
                    setVideo(await data['response']['hpath'])

                }

                


            }
            
        })();


    });


    
    return (


        <div>
            
            { (errorCode != null) && <ErrCode code={errorCode} /> }

            { (errorCode == null) &&

                <div>
                    { !nexist &&

            
                    <div>
                        <TopBar/>
                        <video id="test" width="100%" controls autoPlay onLoadedMetadata={event => console.log(event.target.duration)}>
                            { (video != null) && <source src={`/video/d/${video}`} type="video/mp4"/>}
                        </video>
                        <p>{title}</p>
                        <p>{channel}</p>
                        <p>{description}</p>
                    </div>
            
                    }
                    { nexist && <NoPage/> }
                </div>

            }
            
           
            
        </div>


    );

}





export default Video