import { useState } from 'react'

function PageBtn() {
    //User's current page
    const [currentPg, setCurrentPg] = useState();
    //Streams displayed per page
    const [streamsPerPg] = useState(6)
    //1st & Last Stream of current pg
    const indexofLastStream = currentPg * streamsPerPg;
    const indexOfFirstStream = indexofLastStream - streamsPerPg;
    //Streams to be displayed on current pg
    const currentStreams = data.slice(indexOfFirstStream, indexofLastStream);
    //Number of pages
    //Math.ceil() rounds up
    const totalPgs = Math.ceil(data.length/streamsPerPg);
    return (
        <div>
            <button>Back</button>
            <p>Current Page</p>
            <button>Next</button>
        </div>
    )
}

export default PageBtn