import React, { Component } from "react";
import "../style/topmenu.css"
import logo from "../assets/icon.png"; 
import searchIcon from "../assets/search.png";


class TopBar extends Component {

    render() {
        var user = localStorage.getItem("user");

        return (

           
            <div>
                <div className="topbar">

                    <img src={logo} alt="logo"/>
                    <div className='navlink'>
                        <a href="/home">Home</a>
                        <a href="/about">About</a>
                    </div>
                    <div className="spacer"></div>
                    <form className="searchbar">
                        <img src={searchIcon} alt="search icon"/>
                        <input type="text"/>

                    </form>
                    <div className="spacer"></div>

                    { (user == null) && 
                    
                        <div className='navlink'>    
                            <a href='/signup'>Create account</a>
                            <a href='/signin'>Login</a>
                        </div>
                       
                    }

                    { (user != null) && 

                        <div className='navlink'>    
                            <a href='/channel'>{"hello " + user}</a>
                            <a href='/signout'>sign out</a>
                        </div>
                    
                    
                    }
                    

                </div>
            </div>


        );


    }


}

export default TopBar;