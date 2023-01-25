import { useState } from 'react';


function MainPg() {
    const [streams, setStreams] = useState([]);
    const [searchStreams, setSearchStreams] = useState([]);

    //FILTER FUNCTION - SEARCH BAR
    const filterStreams = event => {
        const value = event.target.value.toLowerCase();
        const filteredStreams = searchStations.filter(
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

            </div>

            <div>
                Stream Info Div
            </div>
        </div>
    )
}

export default MainPg;