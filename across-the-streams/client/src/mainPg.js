import { useState } from 'react';


function MainPg() {
    const [streams, setStreams] = useState([]);
    const [searchStreams, setSearchStreams] = useState([]);

    //FETCHING DATA - TWITCH TV API
    const fetchStreams = () => {
        fetch('https://api.twitch.tv/helix/search/channels')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSearchStreams(data);
                setStreams(data);
            });
    };

    //FILTER FUNCTION - SEARCH BAR
    const filterStreams = event => {
        const value = event.target.value.toLowerCase();
        const filteredStreams = searchStreams.filter(
            stream => (`${stream.name} ${stream.extra.address}`
                .toLowerCase()
                .includes(value))
        )
        //setStreams(filteredStreams) displays filtered streams from search bar
        setStreams(filteredStreams)
    }


    return (
        <div>MainPg Div
            <div>
                Search Bar Div
                <input className='search-bar' placeholder='Search Streams...' onInput={filterStreams}></input>
            </div>

            <div>
                Stream Info Div
            </div>
        </div>
    )
}

export default MainPg;