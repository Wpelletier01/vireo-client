import React from "react";



function Footer() {

    const year = new Date().getFullYear();


    return <footer>{`Copyright © Vireo ${year}`}</footer>
}



export default Footer;