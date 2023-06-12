import SignIn from "./pages/signin";
import Nopage from "./pages/nopage";
import Example from "./pages/example";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Channel from "./pages/channel";
import SignOut from "./pages/signout";
import About from "./pages/about";
import Upload from "./pages/upload";
import Video from "./pages/video";
import Search from "./pages/search";

import "./style/global.css"

import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';




  

function App() {

  
      
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/example" element={<Example />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/channel/*" element={<Channel />} />
        <Route exact path="/signout" element={<SignOut />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/video/*" element={<Video />}/>
        <Route exact path="/search/*" element={<Search />} />
        <Route exact path="/*" element={<Nopage />} />
       
      </Routes>
    </Router> 
  );



}
    

export default App;

