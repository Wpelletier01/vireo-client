import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import "../style/topmenu.css"
import logo from "../assets/icon.png"; 
import searchIcon from "../assets/search.png";


function TopBar() {

    const navigate = useNavigate();
    

    // TODO: validate that the user is actually login with the token sys   
    var user = localStorage.getItem("user");

    const [query,setQuery] = useState(null);

    const handleSearchSubmit = event => {

        //TODO: make sure that the value is not null

        event.preventDefault();

        navigate("/search/" + query);
        window.location.reload();


    }

    const handleLogout = (event) => {

        event.preventDefault();

        localStorage.clear();

        window.location.reload();

    }
    


    return (

        <div className="topbar">
                
            <img href="/home" src={logo} alt="logo"/>
            <div className="searchbar" hidden>
                <img onClick={handleSearchSubmit} src={searchIcon} alt="search icon"/>
                <input type="text" onChange={e => setQuery(e.target.value)} placeholder={"search ..."}/>

            </div>
            <div className='navlink'>
                <a href="/home">Home</a>
                <a href="/about">About</a>
                {(user == null )
                    ? (<><a href='/signup'>Create account</a><a href='/signin'>Login</a></>)
                    : (<><a href={`/channel/${user}`}>My channel</a><a href="#" onClick={handleLogout}>Logout</a></>)
                }

                  
             
                
            </div>
                
         

        </div>
    );


    
}

export default TopBar;