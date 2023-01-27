import { useEffect, useState, useContext } from 'react';
import SingleStream from './singleStream';
import { APIContext } from './api';

function MainPg() {
    const {accessToken} = useContext(APIContext);
    const [streams, setStreams] = useState([]);
    const [searchStreams, setSearchStreams] = useState([]);
    console.log(accessToken);
    // console.log(CLIENT_ID)
    // console.log(CLIENT_SECRET)
    //FETCHING DATA - TWITCH TV API
    // const fetchStreams = () => {
    //     fetch('https://api.twitch.tv/helix/search/channels')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setSearchStreams(data);
    //             setStreams(data);
    //         });
    // };

    // useEffect(fetchStreams, []);

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
                <SingleStream />
            </div>
        </div>
    )
}

export default MainPg;

/*
NOTES:
Need to use useEffect to get accessToken and will need to use await because it's an async function.
Will need to set a useState value, useEffect will reflect the useState value of true
Line 45, Will have the new state value instead of []; necessary in order to run to get accessToken before you seaech for streams.
*/