import React, { Component } from "react";

import "./channel.css";
import TopBar from "../component/topbar";




class Channel extends Component {

    render() {
       

        return (

            <div>
                <TopBar/>
                <p>We are at channel</p>
                <a href="/upload">Upload</a>

            </div>
        

        );


    }





}










export default Channel;