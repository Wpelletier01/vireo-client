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
                   
                        <img className="video-thumbnail" src={`http://localhost:3000/thumbnails/${isrc}`} alt="thumbnail or channel"/>
                        <div className="search-info">
                            <a href={`/video/${isrc}`} className="search-title">{title}</a>
                            <br/>
                            <a href={`/channel/${channel}`} className="search-channel">{channel}</a>
                        </div>
                    
                    <div className="far-left">

                        <p className="duration">1:00</p>

                    </div> 
                </div>
        
            )}

            {(type === "channel" && 
                <div className="row">
                    
                        {(isrc != null) && <img className="channel-thumbnail" src={`http://localhost:3000/thumbnail/${isrc}`} alt="thumbnail or channel"/>}
                        {(isrc == null) && <img className="channel-thumbnail" src={dChannelImg} alt="thumbnail or channel"/>}
                    
                    <div className="search-cinfo">
                        <a href={`/channel/${channel}`} className="search-title">{channel}</a>
                    
                    </div>
                   
                    
                </div>
        
            )}


        </div>

    );

}

export default SearchRow;