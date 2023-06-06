import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import moment from 'moment';

class Upload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null,
            title: "",
            description: "",
            exit: false,
            uploaded: false,
        };

        this.handleUpload = this.handleUpload.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleUpload(event) {
       this.setState(previous => {

            previous.file = event.target.files[0];
            return { ...previous };
            }
        );
        
    
    }

    handleTitle(event) {

        this.setState(previous => {

            previous.title = event.target.value;
            return { ...previous };
            }
        );
        
    }

    handleDescription(event) {

        this.setState(previous => {

            previous.description = event.target.value;
            return { ...previous };

            }
        );

    }

    submit() {

        fetch("/upload", {
           
            method: 'POST',
            body: {
                title:      this.state.title,
                document:   this.state.description,
                length:     this.state.file.duration,
                date:       moment().format("YYYY-MM-DD"),
                video:  this.state.file
            },
            headers: {
                'content-type': "application/json",
                Authorization: `Basic ${localStorage.getItem("token")}` 
            
            }


        }).then(response => {

            if (response.ok) {

                this.setState(previous => {

                    previous.uploaded = true;
                    return {...previous};

                });
                
            }


        });


            

     

        

  
    }

    render() {

        if(this.state.exit) {

            return <Navigate to="/signin"/>;

        }

        if(this.state.uploaded) {

            return ( 
                <div>

                    <p>video uploaded</p>

                </div>

            );

        }

        return (
            <div>
                <p>This is upload</p>
                <input accept="*" type="file" onChange={this.handleUpload}/>

                <div>
                    <div> 
                        <label>Title:</label>
                        <input type="text" onChange={this.handleTitle}/>

                    </div>
                    <div> 
                        <label>Description:</label>
                        <input type="text" onChange={this.handleDescription}/>     
                    </div> 

                    <button onClick={this.submit}>Upload</button> 
                </div>
                
            </div>
        )

    }


}



 
export default Upload;