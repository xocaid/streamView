import { useEffect, useState, useContext } from 'react';
import SingleStream from './singleStream';
import { APIContext } from './api';


function MainPg() {
    //useContext: to read APIContext. Provider
    const { accessToken } = useContext(APIContext);
    const [streams, setStreams] = useState([]);
    const [searchStreams, setSearchStreams] = useState([]);
    console.log(accessToken);

    //FETCHING DATA - TWITCH TV API
    const fetchData = () => {
        fetch('https://api.twitch.tv/helix/search/channels',
            {
                headers: {
                    Authorization: `Bearer accessToken`,
                    'Client-Id': process.env.CLIENT_ID
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSearchStreams(data);
                setStreams(data);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
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