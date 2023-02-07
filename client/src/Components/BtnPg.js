import React from 'react';
import './btnPg.css';


function BtnPg({onNext, onBack}) {
    const backPg = () => {
        console.log('Back Pg Button Pressed');
        onBack();
    };

    const nextPg = () => {
        console.log('Next Pg Button Pressed');
        onNext();
    };

    return (
        <div className='btnPg-div'>
            <button onClick={backPg}>Back</button>
            <button onClick={nextPg}>Next</button>
        </div>
    )
}

export default BtnPg;