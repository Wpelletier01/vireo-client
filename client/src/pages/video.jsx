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
            <div>
                <TopBar/>
                    <video id="test" width="100%" controls autoPlay>
                        <source src={`/video/d/${video}`} type="video/mp4"/>
                    </video>
                    <p>{title}</p>
                    <p>{channel}</p>
                    <p>{description}</p>
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