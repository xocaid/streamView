import React from 'react'
import './btnPg.css';


function BtnPg() {
    const backPg = () => {
        console.log('Back Pg Button Pressed')
    }

    const nextPg = () => {
        console.log('Next Pg Button Pressed')
    }

    return (
        <div className='btnPg-div'>
            <button onClick={backPg}>Back</button>
            <button onClick={nextPg}>Next</button>
        </div>
    )
}

export default BtnPg;