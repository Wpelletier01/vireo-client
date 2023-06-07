import React, { Component, useState,ChangeEvent} from "react";
import { Navigate } from "react-router-dom";
import moment from 'moment';



function Upload() {

    //TODO: implement when token expired 
    const [file, setFile]   = useState(null);
    const [title, setTitle]   = useState("");
    const [description,setDescription]   = useState("");
    const [redirect, setRedirect ]   = useState(false);
    const [uploaded, setUploaded ]   = useState(false);
    const [bufferId, setBufferId ]   = useState(0);

    const handleUpload = (event) => {
        
        setFile(event.target.files[0]);

    };

    const handleTitle = (event) => {

        setTitle(event.target.value);

    }

    const handleDescription = (event) => {

        setDescription(event.target.value);
    }

    const sendVideo = () => {



        fetch("/upload/video", {
           
            method: 'POST',
            
            body: file,

            headers: {
                'Content-Type': file.type,
                'Content-Length': `${file.size}`
            }
            


        }).then(response => {

            if (response.ok) {

                return response.json();
            }

        }).then( data => {
            
            
            setBufferId(Promise.resolve(data["buffer_id"]));
            

            
        });

       

    }

    const sendInfo = () => {

        console.log("welcome")
        //TODO: implement handling when its null
        if (bufferId != null ) {

           
            var body = {
                uploader:   localStorage.getItem("user"), // TODO: tmp until token system setup
                title:      title,
                description: description,
                date:       moment().format("YYYY-MM-DD"),
                buffer_id:  bufferId
            };

            fetch("/upload/videoinfo", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)

                }
            ).then( response => {

                if (response.ok) {

                    setUploaded(true)

                }


            });

        }

    }

    
    
    const submit = async () => {

        await sendVideo();
        await console.log("buffer_id: " + bufferId)
        setTimeout(()=> {},1000);
        await sendInfo();


    } 


    return ( 

        <div>
            {uploaded && 
                <div>
                    <p>video uploaded succefully</p>
                    <button onClick={() => setRedirect(true)}>Ok</button>
                </div>
            }

            {redirect && 
                <div>
                    <Navigate to="/channel" />
                </div>
            }
            {(!redirect && !uploaded) && 
                <div>
                    <p>This is upload</p>
                    <input accept="*" type="file" onChange={e => handleUpload(e)}/>

                    <div>
                        <div> 
                            <label>Title:</label>
                            <input type="text" onChange={handleTitle}/>

                        </div>
                    </div>
                    <div> 
                        <label>Description:</label>
                        <input type="text" onChange={handleDescription}/>     
                    </div> 

                    <button onClick={submit}>Upload</button> 
                </div>
        
            }

        </div>
            
    );

}


export default Upload;


