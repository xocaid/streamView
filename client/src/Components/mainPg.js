import { useEffect, useState, useContext } from 'react';
import SingleStream from './singleStream';
import { APIContext } from './api';
import axios from 'axios';
import './mainPg.css';
import PageBtn from './pageBtn';


function MainPg() {
    //useContext: to read APIContext. Provider
    const { accessToken } = useContext(APIContext);
    const [streams, setStreams] = useState([]);
    const [searchStreams, setSearchStreams] = useState([]);
    //PAGINATION
    //User's current page
    const [currentPg, setCurrentPg] = useState(1);
    //Streams displayed per page
    const [streamsPerPg] = useState(2)

    //1st & Last Stream of current pg
    const indexofLastStream = currentPg * streamsPerPg;
    const indexOfFirstStream = indexofLastStream - streamsPerPg;
    //Streams to be displayed on current pg
    const currentStreams = streams.slice(indexOfFirstStream, indexofLastStream);
    //Number of pages
    //Math.ceil() rounds up
    const totalPgs = Math.ceil(searchStreams.length / streamsPerPg);

    //FETCHING DATA - TWITCH TV API
    useEffect(() => {
        const fetchData = async () => {
            console.log(`Print accessToken from mainPg, ${JSON.stringify(accessToken)}`);
            await axios.get('https://api.twitch.tv/helix/search/channels?',
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken.access_token}`,
                        'Client-Id': process.env.REACT_APP_TWITCH_CLIENT_ID
                    },
                    params: {
                        query: 'game',
                    }
                }
            )
                .then((response) => {
                    console.log(response);
                    setSearchStreams(response.data.data);
                    setStreams(response.data.data);
                });
        };
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
                stream => (`${stream.display_name} ${stream.game_name} ${stream.tags} ${stream.broadcaster_language}`
                    .toLowerCase()
                    .includes(value))
            )
            //setStreams(filteredStreams) displays filtered streams from search bar
            setSearchStreams(filteredStreams)
        }

        return (
            <div className='mainpg-div'>MainPg Div
                <div className='searchbar-div'>
                    Search Bar Div
                    <input className='search-bar' placeholder='Search Streams...' onInput={filterStreams}></input>
                </div>

                <div>
                    <h1>Stream Info Div</h1>
                    <PageBtn totalPgs={totalPgs} currentPg={currentPg} setCurrentPg={setCurrentPg} />
                    {searchStreams.map((stream, index) => {
                        return (
                            <SingleStream key={index} singleCardP={stream} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default MainPg;