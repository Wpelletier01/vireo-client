import React, { useState } from "react";

import "./channel.css";
import TopBar from "../component/topbar";




function Channel() {

    const  [username,setUsername] = useState(window.location.pathname.replace("/channel/",""))

    return (

        <div>
            <TopBar/>
            <p>We are at the channel of {username}</p>
            <a href="/upload">Upload</a>

        </div>
    

    );



}












export default Channel;