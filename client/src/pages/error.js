import React from "react";




function ErrorPage({code,reason}) {


    return (

        <div>
            <h1>{"Error code: " + code }</h1>
            <h2>{reason}</h2>
        </div>

    );


}

export default ErrorPage;
