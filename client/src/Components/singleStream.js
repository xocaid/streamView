import React from 'react';
import './singleStream.css';
import live from '../Images/live.png';
import offline from '../Images/offline.png';

function SingleStream({ singleCardP }) {
  return (
    <div className='singleStream-div'>
      <div className='singleStream-img'>
        <img src={singleCardP.thumbnail_url} alt={singleCardP.title}></img>
      </div>
      <div className='singleStream-general'>
        <div className='singleStream-isLive'>
          {(singleCardP.is_live.toString() === 'true')
            ? <img src={live} className='singleStream-live' alt='live logo'></img>
            : <img src={offline} className='singleStream-offline' alt='offline logo'></img>}
        </div>
        <div className='singleStream-title'>
          <h1>{singleCardP.game_name}</h1>
        </div>
        <div className='singleStream-user'>
          <h2>{singleCardP.display_name}</h2>
        </div>
        {/* Need to convert time */}
        <div className='singleStream-date'>
          <h4> Last Played:
            {(singleCardP.started_at !== "")
              ? singleCardP.started_at
              : ' Has Not Played'}
          </h4>
        </div>
        <div>
          <h4>
            Language: {singleCardP.broadcaster_language.toUpperCase()}
          </h4>
        </div>
        <div className='singleStream-tags'>
          <h4>  Tags:{(singleCardP.tags.length >= 1)
            ? ' ' + singleCardP.tags + ' , '.slice(0, 1)
            : ''}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default SingleStream;