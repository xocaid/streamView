import React from 'react';
import './btnPg.css';


function BtnPg({ onBack, onNext }) {
    const backPg = () => {
        console.log('Back Pg Button Pressed');
        onBack('back');
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