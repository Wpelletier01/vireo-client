import Login from "./pages/login";
import Index from "./pages/index";
import Nopage from "./pages/nopage";
import React from 'react';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
  
  
function App() {
  
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
         
         
      
        
         
    </div>

  );
}
    

export default App;

