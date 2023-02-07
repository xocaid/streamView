import { useEffect, useState, useContext, useCallback } from 'react';
import SingleStream from './singleStream';
import { APIContext } from './api';
import axios from 'axios';
import './mainPg.css';
import BtnPg from './BtnPg';

const LIMIT = 5;

function MainPg() {
    //useContext: to read APIContext. Provider
    const { accessToken } = useContext(APIContext);
    const [streams, setStreams] = useState([]);
    const [searchStreams, setSearchStreams] = useState([]);
    //Cursor value for API query parameter
    const [cursor, setCursor] = useState(null);
    console.log('This is the cursor variable: ', cursor);

    useEffect(() => {
        if (accessToken) {
            fetchData();
        }
    }, [accessToken]);

    //FETCHING DATA - TWITCH TV API
    const fetchData = useCallback(async queryParams => {
        try {
            // console.log(`Print accessToken from mainPg, ${JSON.stringify(accessToken)}`);
            const params = Object.assign({ query: 'game', first: LIMIT }, queryParams);
            const response = await axios.get(`https://api.twitch.tv/helix/search/channels?`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken.access_token}`,
                        'Client-Id': process.env.REACT_APP_TWITCH_CLIENT_ID
                    },
                    params,
                }
            );
            console.log(response.data);
            setStreams(response.data.data);
            setSearchStreams(response.data.data);
            setCursor(response.data.pagination.cursor);

        } catch (error) {
            console.error(error);
            console.log('Error cannot print page.');
        }
    },
        [accessToken]
    );

    const handlePagination = useCallback(paginate => {
        if (paginate === 'back') {
            //load previous pg

        } else {
            // load next pg

        }
    }, []);

    const onNext = useCallback(() => {
        handlePagination();
    }, [handlePagination]);

    const onBack = useCallback(() => {
        handlePagination('back');
    }, [handlePagination]);

    //FILTER FUNCTION - SEARCH BAR
    const filterStreams = event => {
        const value = event.target.value.toLowerCase();
        const filteredStreams = searchStreams.filter(
            stream => (`${stream.display_name} ${stream.game_name} ${stream.tags} ${stream.broadcaster_language}`
                .toLowerCase()
                .includes(value))
        )
        //setStreams(filteredStreams) displays filtered streams from search bar
        setStreams(filteredStreams);
    }

    return (
        <div className='mainpg-div'>
            <div className='searchbar-div'>
                <input className='search-bar' placeholder='Search Streams...' onInput={filterStreams}></input>
            </div>

            <div>
                <BtnPg />
                {streams.map((stream, index) => {
                    return (
                        <SingleStream key={index} singleCardP={stream} />

                    )
                })}
            </div>
        </div>
    )
}
export default MainPg;