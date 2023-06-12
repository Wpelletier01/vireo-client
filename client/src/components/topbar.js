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
    


    return (

        
        <div>
            <div className="topbar">

                <img href="/home" src={logo} alt="logo"/>
                <div className='navlink'>
                    <a href="/home">Home</a>
                    <a href="/about">About</a>
                </div>
                <div className="spacer"></div>
                <div className="searchbar" hidden>
                    <img onClick={handleSearchSubmit} src={searchIcon} alt="search icon"/>
                    <input type="text" onChange={e => setQuery(e.target.value)} placeholder={"search ..."}/>

                </div>
                <div className="spacer"></div>

                { (user == null) && 
                    
                    <div className='navlink'>    
                        <a href='/signup'>Create account</a>
                        <a href='/signin'>Login</a>
                    </div>
                       
                }

                { (user != null) && 

                    <div className='navlink'>    
                        <a href={`/channel/${user}`}>{"hello " + user}</a>
                        <a href='/signout'>sign out</a>
                    </div>
                    
                    
                }
                    

            </div>
        </div>


        );


    
}

export default TopBar;