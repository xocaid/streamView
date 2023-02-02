import React from 'react'

function PageBtn({ totalPgs, currentPg, setCurrentPg}) {
    //Array that holds all the page #s
    const pgNums = [...Array(totalPgs + 1).keys()].slice(1);

    const backPg = () => {
        if (currentPg !== 1)
            setCurrentPg(currentPg - 1)
    }
    const nextPg = () => {
        if (currentPg !== 1)
            setCurrentPg(currentPg + 1)
    }
    return (
        <div>
            <button className='back-btn' onClick={backPg}>Back</button>
            {pgNums.map(pgNum => (
                <li key={pgNum}>
                    <a onClick={() => setCurrentPg(pgNum)}>
                        {pgNum}
                    </a>
                </li>

            ))}
            <button className='next-btn' onClick={nextPg}>Next</button>
        </div>
    )
}

export default PageBtn;