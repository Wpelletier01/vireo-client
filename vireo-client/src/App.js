import React, {useState, useEffect} from "react";

function App() {

  const [data,setData] = useState([{}]);

  useEffect(() => {
    
    fetch("/test")
      .then(response => {
        if (response.ok) {

          return response.text()

        }
      })
    
  },[]);

  return (

    <div>
      
    </div>

  ) 


}

export default App;
