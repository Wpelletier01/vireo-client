import React, { Component } from "react";
import {Navigate }from "react-router-dom";
 

class SignOut extends Component {



    render() {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        return <Navigate to="/home"  />;

    }


}



 
export default SignOut;