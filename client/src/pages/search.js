import React,{useState,useEffect} from "react";
import TopBar from "../component/topbar";
import SearchRow from "../component/searchRow";


function Search() {

    const [searchQuery,setSearchQuery] = useState(window.location.pathname.replace("/search/",""));

    const [rows,setRows] = useState([]);

    const getQueryResp = async () => {

        if (searchQuery != null) {

            // TODO: implement mechanism for different search type
            const response = await fetch("/search/all/" + searchQuery);
            const data = await response.json();
            console.log(data["response"]);
            setRows(data["response"]);

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
            <TopBar/>
            { (searchQuery != null) && <p>{"Result for: " + searchQuery}</p>}
            { (rows.length !== 0) &&
                rows.map(row => (

                    <SearchRow 
                        type={row["type"]}
                        title={row["title"]}
                        channel={row["channel"]}

                        isrc={row["hpath"]} 
                        />

                ))
            
            }
            {
                (rows.length === 0) && <p>no row</p>

            }
            <SearchRow/>


        </div>


    );



}


export default Search;






