import { useEffect, useState } from 'react';
import SingleStream from './singleStream';
import axios from 'axios';
import qs from 'qs';

const CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;

const CLIENT_SECRET = process.env.REACT_APP_TWITCH_CLIENT_SECRET;

let accessToken;

const getAccessToken = async () => {
    try {
        const res = await axios.post(
            //Twitch TV Developers: Client Credentials Grant Flow
            //To get access token, need to send HTTP POST request to site below:
            'https://id.twitch.tv/oauth2/token',
            qs.stringify({
                //per documentation: Registered Client ID & Secret are set
                //Per documentation: grant_type is set to string and MUST be set to client_credentials
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'client_credentials',

            })
        );
        accessToken = res.data;
    } catch (error) {
        //Note: error is an object, generic, and it won't always get you the info on what's wrong
        console.log(error);
        //Note: error.message is standard practice, that will return the error message, error description that should explain what error happened
        console.log(error.message);
    }
};

function MainPg() {
    const [streams, setStreams] = useState([]);
    const [searchStreams, setSearchStreams] = useState([]);

    console.log(CLIENT_ID)
    console.log(CLIENT_SECRET)
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

    useEffect(fetchStreams, []);

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