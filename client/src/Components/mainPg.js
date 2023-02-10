import { useEffect, useState, useContext, useCallback, useRef } from 'react';
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
    // Current Page Number
    const [pgNum, setPgNum] = useState(1);
    //Ref for Search Bar 
    const searchInputRef = useRef(null);
    //Ref for query parameter
    const query = useRef('game');


    //FETCHING DATA - TWITCH TV API
    const fetchData = useCallback(async queryParams => {
        try {
            console.log(`Print accessToken from mainPg, ${JSON.stringify(cursor)}`);
            // const params = Object.assign({ query: 'game', first: LIMIT }, queryParams);
            const params = {
                query: 'game',
                first: LIMIT,
                ...queryParams,
            }
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
    useEffect(() => {
        if (accessToken) {
            fetchData();
        }
    }, [accessToken]);

    const handlePagination = useCallback(async paginate => {
        if (paginate === 'back') {
            //load previous pg
            console.log('Back Pg...');
            await fetchData({ before: cursor });
            setPgNum(prevPg => prevPg - 1);
        } else {
            // load next pg
            console.log('Next Pg...');
            await fetchData({ after: cursor });
            setPgNum(prevPg => prevPg + 1);
        }
    },
        [fetchData, cursor]);

    const onNext = useCallback(() => {
        console.log('Next Pg Button Pressed');
        handlePagination();
    }, [handlePagination]);

    const onBack = useCallback(() => {
        console.log('Back Pg Button Pressed');
        if (pgNum > 1) {
            handlePagination('back');
        }
    }, [handlePagination, pgNum]);

    const handleSearch = useCallback(async () => {
        console.log('handleSearch: ', searchInputRef.current?.value);
        const value = searchInputRef.current?.value;
        if(value){
            query.current=value;
            await fetchData()
        }else{
            console.log('Please enter a valid search query.')
        }
    }, [fetchData]);

    return (
        <div className='mainpg-div'>
            <div className='searchbar-div'>
                <input className='search-bar' placeholder='Search Streams...' ref ={searchInputRef}></input>
                <button onClick={handleSearch}>Search</button>
            </div>

            <div>
                <BtnPg onBack={onBack} onNext={onNext} currentPg={pgNum} />
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