import React from 'react';
import './btnPg.css';


function BtnPg({ currentPg, onBack, onNext }) {

    return (
        <div className='btnPg-div'>
            <button onClick={onBack} disabled={currentPg >= 1}>Back</button>
            <p>Page {currentPg} </p>
            <button onClick={onNext}>Next</button>
        </div>
    )
};

export default BtnPg;