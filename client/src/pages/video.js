import React, {useEffect,useState} from "react";

import TopBar from "../component/topbar";



function Video() {

    const [nexist,setnExist] = useState(false);
    const [video,setVideo] = useState(null);
    const [title,setTitle] = useState("");
    const [channel,setChannel] = useState("");
    const [description,setDescription] = useState("");


    
    useEffect(() => {

       
        (async () => {
            
            setVideo(window.location.pathname.replace("/video/",""));
            
            if (video != null) {
                const resp = await fetch("/video/info/" + video);
                
                const data = await resp.json();

                if(data["status"] === "NOT FOUND") {

                    setnExist(true);

                } else {

                    setTitle(data["title"]);
                    setChannel(data["channel"]);
                    setDescription(data["description"]);


                }
                

            }
      
            

            
        })();


    });


    
    return (


        <div>
           
            
            { !nexist &&
                <div>
                    <TopBar/>
                    <video width="100%" controls>
                        { (video != null) && <source src={`http://localhost:3000/video/${video}`} type="video/mp4"/>}
                    </video>
                    <p>{title}</p>
                    <p>{channel}</p>
                    <p>{description}</p>
                </div>
        
            }
            {
                nexist && 
                <div>
                    <TopBar />
                    <p>no video exist</p>
                </div>


            }
           
            
        </div>


    );

}





export default Video