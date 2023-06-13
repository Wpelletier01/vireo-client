import React,{useState,useEffect} from "react";
import TopBar from "../components/topbar";
import SearchRow from "../components/searchRow";
import ErrCode from "./error";


function Search() {

    const [searchQuery,setSearchQuery] = useState(window.location.pathname.replace("/search/",""));

    const [rows,setRows] = useState([]);
    const [errCode,setErrCode] = useState(0);


    const getQueryResp = async () => {

        if (searchQuery != null) {

            // TODO: implement mechanism for different search type
            const response = await fetch("/search/all/" + searchQuery);
            
            if (!response.ok) {

                setErrCode(response.status);

            } else {
                const data = await response.json();
                await console.log(data);
                setRows(data["response"]);

            }

        }


    }

    useEffect(() => {


        (async () => {
            await setSearchQuery(window.location.pathname.replace("/search/",""));
            await getQueryResp();
            console.log(searchQuery);

            
        })();
        
    },[]);


    if (errCode !== 0) {

        return  <ErrCode code={errCode} />
    }

    return (

   

        <div>
            <TopBar/>
            { (searchQuery != null) && <p className="search-result-title">{"Result for: " + searchQuery}</p>}
            { (rows.length !== 0) &&
                rows.map(row => (

            <SearchRow 
                type={row["type"]}
                title={row["title"]}
                channel={row["channel"]}
                isrc={row["thumbnail"]} 
            />))
            
            }
            { (rows.length === 0) && <p className="nofound">No Result</p> }
            
        </div>
                
          

    );



}


export default Search;






