import Login from "./pages/login";
import Index from "./pages/index";
import Nopage from "./pages/nopage";
import React from 'react';

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
  

function App() {


      
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/*" element={<Nopage />} />
      </Routes>
    </Router> 
  );



}
    

export default App;

