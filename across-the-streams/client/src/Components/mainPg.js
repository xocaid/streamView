import { useEffect, useState, useContext } from 'react';
import SingleStream from './singleStream';
import { APIContext } from './api';
import axios from 'axios';


function MainPg() {
    //useContext: to read APIContext. Provider
    const { accessToken } = useContext(APIContext);
    const [streams, setStreams] = useState([]);
    const [searchStreams, setSearchStreams] = useState([]);


    //FETCHING DATA - TWITCH TV API
    const fetchData = async () => {
        console.log(`TESTTTTTT, ${JSON.stringify(accessToken)}`);
        await axios.get('https://api.twitch.tv/helix/search/channels',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken.access_token}`,
                    'Client-Id': process.env.REACT_APP_TWITCH_CLIENT_ID
                },
                params:{
                    query: 'game',
                }
            }
        )
            .then((response) => {
                console.log(response);
                setSearchStreams(response);
                setStreams(response);
            });
    };
    useEffect(() => {
        if (accessToken) {
            fetchData();
        }
    }, [accessToken]);
    if (!streams) {
        return <div>
            Loading..
        </div>;
    } else {



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
}

export default MainPg;