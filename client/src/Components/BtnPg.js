import React from 'react'

function BtnPg() {
    const backPg = () => {
        // if (currentPg !== 1)
        //     setCurrentPg(currentPg - 1)
            console.log('Back Pg Button Pressed')
    }

    const nextPg = () => {
        // if (currentPg !== totalPgs)
        //     setCurrentPg(currentPg + 1)
            console.log('Next Pg Button Pressed')
    }

    return (
        <div>
            <button className='back-btn' onClick={backPg}>Back</button>
            <button className='next-btn' onClick={nextPg}>Next</button>
        </div>
    )
}

export default BtnPg;