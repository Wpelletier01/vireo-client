import React from "react";
import TopBar from "../components/topbar";
import emo from "../assets/nothing_found.png" 
import "../style/nothing_found.css";

function NoPage() { 

    return (
        <div className="nf">
            <TopBar />
            <h1 className="nf_msg">Nothing to be found here sorry!</h1>
            <img className="nf_img" src={emo} alt="emoticon thinking" />
        </div>

    );

}

 
export default NoPage;