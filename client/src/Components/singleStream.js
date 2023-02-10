import React from 'react';
import './singleStream.css';
import live from '../Images/live.png';
import offline from '../Images/offline.png';

function SingleStream({ singleCardP }) {
  return (
    <div className='singleStream-div'>
      <div className='singleStreamImg-div'>
        <img src={singleCardP.thumbnail_url} alt={singleCardP.title} className='singleStream-img'></img>
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
          <p><b>{singleCardP.display_name}</b></p>
        </div>
        {/* Need to convert time */}
        <div className='singleStream-date'>
          <p> <b>Last Played:</b>
            {(singleCardP.started_at !== "")
              ? singleCardP.started_at.toLocaleString()
              : ' Has Not Played'}
          </p>
        </div>
        <div>
          <p>
            <b>Language: </b>{singleCardP.broadcaster_language.toUpperCase()}
          </p>
        </div>
        <div className='singleStream-tags'>
          <p>  <b>Tags:</b>{(singleCardP.tags.length >= 1)
            ? ' ' + singleCardP.tags + ' , '.slice(0, 1)
            : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleStream;