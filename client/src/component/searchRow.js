import React,{useEffect,useState} from "react";

import "../style/searchRow.css"
import noThumb from "../assets/thumbnail.png";
import dChannelImg from "../assets/channel.png";

function SearchRow({type,title,channel,isrc}) {

    //TODO: Add duration value

    const [searchQuery,setSearchQuery] = useState(null);


    return (

        <div>
            {(type === "video" && 
                <div className="row">
                    <img className="search-vthumbnail" src={`http://localhost:3000/thumbnail/${isrc}`} alt="thumbnail or channel"/>
                    <div className="search-info">
                        <p className="search-title">{title}</p>
                        <p className="search-channel">{channel}</p>
                    </div>
                    <div className="spacer"></div>
                    <div className="far-left">

                        <p className="duration">1:00</p>

                    </div> 
                </div>
        
            )}

            {(type === "channel" && 
                <div className="row">
                    
                    {(isrc != null) && <img className="search-cthumbnail" src={`http://localhost:3000/thumbnail/${isrc}`} alt="thumbnail or channel"/>}
                    {(isrc == null) && <img className="search-cthumbnail" src={dChannelImg} alt="thumbnail or channel"/>}
                    <div className="search-info">
                        <p className="search-title">{channel}</p>
                    
                    </div>
                    <div className="spacer"></div>
                    
                </div>
        
            )}


        </div>

    );

}

export default SearchRow;