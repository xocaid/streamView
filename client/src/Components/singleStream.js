import React from 'react'

function SingleStream({ singleCardP }) {
  return (
    <div className='singleStream-div'>
      <h1>SingleStream Card</h1>
      <p>Image Box: <img src={singleCardP.thumbnail_url} alt={singleCardP.title}></img></p>
      {/* Need to convert response from boolean to string. */}
      <p>Stream Live: {(singleCardP.is_live.toString() === 'true') ? 'LIVE' : 'NOT LIVE'}</p>
      <p>Stream Title: {singleCardP.game_name}</p>
      <p>Broadcaster Name: {singleCardP.display_name}</p>
      {/* Need to do add case for empty string 
      Need to convert time */}
      <p>Last Played: {singleCardP.started_at}</p>
      <p>Language: {singleCardP.broadcaster_language.toUpperCase()}</p>
      {/* Need to split and account if array is empty or less than 0 */}
      <p>Tags:{singleCardP.tags} </p>
      <p>Stream Description</p>


    </div>
  )
}

export default SingleStream;