import React,{useState,useEffect} from "react";
import TopBar from "../component/topbar";
import SearchRow from "../component/searchRow";
import ErrCode from "./error";


function Search() {

    const [searchQuery,setSearchQuery] = useState(window.location.pathname.replace("/search/",""));

    const [rows,setRows] = useState([]);
    const [errStat,setErrStat] = useState(null);


    const getQueryResp = async () => {

        if (searchQuery != null) {

            // TODO: implement mechanism for different search type
            const response = await fetch("/search/all/" + searchQuery);
            
            if (!response.ok) {

                setErrStat([response.status,response.statusText]);

            } else {
                const data = await response.json();
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



    return (

        <div>
            { (errStat == null) &&

                <div>
                    <TopBar/>
                    { (searchQuery != null) && <p>{"Result for: " + searchQuery}</p>}
                    { (rows.length !== 0) &&
                        rows.map(row => (

                            <SearchRow 
                                type={row["type"]}
                                title={row["title"]}
                                channel={row["channel"]}
                                isrc={row["thumbnail"]} 
                            />

                        ))
            
                    }
                    { (rows.length === 0) && <p>no row</p> }
            
                </div>
                
            } 
            { (errStat != null ) && <ErrCode code={errStat[0]} reason={errStat[1]} />}


        </div>


    );



}


export default Search;






